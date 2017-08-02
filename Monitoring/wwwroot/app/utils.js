Utils = window.Utils || {};
(function () {
    var util = {
        numberWithSpaces: function (x) {
            var parts = Number((x).toFixed(2)).toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            return parts.join(".");
        },
        numberWithSpacesInt: function (x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        },
        numberWithSpacesPercent: function (x) {
            var parts = Number((x * 100).toFixed(2)).toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            return parts.join(".") + '%';
        },
        sendStorageRequest: function (key, datatype, type, data) {
            var deferred = new $.Deferred;
            var storageRequestSettings = {
                url: '/api/Settings/' + key,
                type: type,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    deferred.resolve(data);
                },
                fail: function (jqXHR, textStatus, errorThrown) {
                    deferred.reject();
                }
            };
            if (data) {
                data.value = JSON.stringify(data.value);
                storageRequestSettings.data = JSON.stringify(data);
            }
            $.ajax(storageRequestSettings);
            return deferred.promise();
        },
        
        sendStorageRequestNew: function (key, datatype, type, data) {
        var deferred = new $.Deferred;
        var save = function () {
            var storageRequestSettings = {
                url: '/api/Settings/' + key,
                type: type,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    deferred.resolve(data);
                },
                fail: function (jqXHR, textStatus, errorThrown) {
                    deferred.reject();
                }
            };
            if (data) {
                data.value = JSON.stringify(data.value);
                storageRequestSettings.data = JSON.stringify(data);
            }
            $.ajax(storageRequestSettings);
            return deferred.promise();
        };
        var cancel = function () {
            return "Cancel";
        };
        var customDialog = DevExpress.ui.dialog.custom({
            title: "Настройки",
            message: "Сохранить настройки?",
            buttons: [
                { text: "Сохранить", onClick: save },
                { text: "Отмена", onClick: cancel }
            ]
        });
        customDialog.show().done(function (dialogResult) {
            return dialogResult;
        });

    },
        pivotSettings:{
        texts: {
        collapseAll: 'Свернуть все',
        grandTotal: 'Общие итоги',
    noData: 'Нет данных',
    removeAllSorting: 'Убрать сортировку',
    showFieldChooser: 'Настройки',
    total: '{0} Итого'
},
    fieldChooser: {
        enabled: true,
        title: 'Настройки',
        texts: {
            allFields: 'Все поля',
            columnFields: 'Столбцы',
            dataFields: 'Строки',
            filterFields: 'Фильтр',
            rowFields: 'Строки'
        }
    }, fieldPanel: {
            showRowFields: true,
            showColumnFields: true,
            showDataFields: false,
            texts: {
            columnFieldArea: 'Перетащите поля колонок сюда',
            filterFieldArea: 'Перетащите поля фильтра сюда',
            rowFieldArea: 'Перетащите поля строк сюда',
            dataFieldArea: 'Перетащите поля данных сюда'
            },
        allowFieldDragging: true,
        allowFiltering: true,
        allowSorting: true,
        visible: true
    },
    loadPanel: {
            text: "Загружается"
    },
    allowExpandAll: true,
        allowFiltering: true,
    allowSorting: true,
    allowSortingBySummary: true,
    showColumnGrandTotals: false,
    showColumnTotals: false,
    },
    getStateStoring: function (key) {
        return {
            enabled: true,
            type: 'custom',
            customLoad: function () {
                var d = new $.Deferred();
                $.getJSON('/api/Settings/', { key: key }, function (data) {
                    console.log($.parseJSON(data.value));
                    d.resolve($.parseJSON(data.value));
                });

                return d.promise();
            },
            customSave:
                function (gridState) {
                    return util.sendStorageRequest(key, 'json', 'POST', { key: key, value: gridState });
                }
        }
    }
    };

    $.extend(Utils, util);
})();