window.Debts.configView = window.Debts.configView || {};
(function () {
    var config = {
        gridSupersOptions: function (supers, loadAgents) {
            return {
                dataSource: supers,
                sorting: {
                    mode: "multiple"
                },
                headerFilter: {
                    visible: true
                },
                //searchPanel: {
                //    visible: true,
                //    width: 240,
                //    placeholder: "Поиск..."
                //},
                paging: {
                    pageSize: 30
                },
                columns: [{ dataField: 'periodStr', caption: "Week" },
                    { dataField: 'super', caption: "Department",width:130 },
                    { dataField: 'shippment', caption: "Ship" },
                    { dataField: 'payment', caption: "Pay" },
                    { dataField: 'bal', caption: "Receivable" },
                    { dataField: 'debt', caption: "OutReceivable" },
                    { dataField: 'deltaBal', caption: "ReceivGrowth" },
                    { dataField: 'deltaDebt', caption: "OutGrowth" }],
                selection: { mode: 'single', deferred: true },
                hoverStateEnabled: true,
                onSelectionChanged: function (selectedItems) {
                    //console.log(selectedItems.selectedRowsData[0]);
                    loadAgents(selectedItems.selectedRowsData[0].code);
                },
                onRowPrepared: function (info) {
                    //if (info.rowType != 'header' && info.data.deltaDebt > 0)
                    //    info.rowElement.addClass('debt');
                },
                onCellPrepared: function (options) {
                    var fieldData = options.value;
                    if (options.rowType == "data" && options.columnIndex > 1) options.cellElement.text(Utils.numberWithSpaces(options.value));
                    if (options.rowType == "data" && (options.columnIndex == 7 || options.columnIndex == 6)) {
                        options.cellElement.addClass((fieldData > 0) ? "inc" : "dec");
                    }
                },
                summary: {
                    totalItems: [{
                        column: 'shippment',
                        summaryType: 'sum',
                        customizeText: function (data) { return Utils.numberWithSpaces(data.value); }
                    },
                    {
                        column: 'payment',
                        summaryType: 'sum',
                        customizeText: function (data) { return Utils.numberWithSpaces(data.value); }
                    },
                    {
                        column: 'bal',
                        summaryType: 'sum',
                        customizeText: function (data) { return Utils.numberWithSpaces(data.value); }
                    },
                    {
                        column: 'debt',
                        summaryType: 'sum',
                        customizeText: function (data) { return Utils.numberWithSpaces(data.value); }
                    },
                    {
                        column: 'deltaBal',
                        summaryType: 'sum',
                        customizeText: function (data) { return Utils.numberWithSpaces(data.value); }
                    },
                    {
                        column: 'deltaDebt',
                        summaryType: 'sum',
                        customizeText: function (data) { return Utils.numberWithSpaces(data.value); }
                    }]
                }
            };
        },
        gridAgentsOptions: function (agents, customers) {
            return {
                dataSource: agents,
                sorting: {
                    mode: "multiple"
                },
                headerFilter: {
                    visible: true
                },
                //searchPanel: {
                //    visible: true,
                //    width: 240,
                //    placeholder: "Поиск..."
                //},
                paging: {
                    pageSize: 30
                },
                //columns: [{ dataField: 'agent', caption: "Агент" },
                columns: [{
                        caption: "Agent", cellTemplate: function (container, options) {
                            //console.log(container);
                            //console.log(options);
                            $('<a/>').addClass('dx-link')
                                .text(options.data.agent)
                                .on('dxclick', function () {
                                    customers(options.data.code);
                                })
                                .appendTo(container);
                        }
                    },
                    { dataField: 'shippment', caption: "Ship" },
                    { dataField: 'payment', caption: "Pay" },
                    { dataField: 'bal', caption: "Receivable" },
                    { dataField: 'debt', caption: "OutReceivable" },
                    { dataField: 'deltaBal', caption: "ReceivGrowth" },
                    { dataField: 'deltaDebt', caption: "OutGrowth" }],
                selection: { mode: 'single', deferred: true },
                hoverStateEnabled: true,
                onInitialized: function (e) {
                      config.dataGrid = e.component;
                    },
                onCellPrepared: function (options) {
                    var fieldData = options.value;
                    if (options.rowType == "data" && options.columnIndex > 0) options.cellElement.text(Utils.numberWithSpaces(options.value));
                    if (options.rowType == "data" && (options.columnIndex == 6 || options.columnIndex == 5)) {
                        options.cellElement.addClass((fieldData > 0) ? "inc" : "dec");
                    }
                },
                summary: {
                    totalItems: [{
                        column: 'shippment',
                        summaryType: 'sum',
                        customizeText: function (data) { return Utils.numberWithSpaces(data.value); }
                    },
                    {
                        column: 'payment',
                        summaryType: 'sum',
                        customizeText: function (data) { return Utils.numberWithSpaces(data.value); }
                    },
                    {
                        column: 'bal',
                        summaryType: 'sum',
                        customizeText: function (data) { return Utils.numberWithSpaces(data.value); }
                    },
                    {
                        column: 'debt',
                        summaryType: 'sum',
                        customizeText: function (data) { return Utils.numberWithSpaces(data.value); }
                    },
                    {
                        column: 'deltaBal',
                        summaryType: 'sum',
                        customizeText: function (data) { return Utils.numberWithSpaces(data.value); }
                    },
                    {
                        column: 'deltaDebt',
                        summaryType: 'sum',
                        customizeText: function (data) { return Utils.numberWithSpaces(data.value); }
                    }]
                }
            };
        },
        gridKontragentsOptions: function (customers) {
            return {
                dataSource: customers,
                sorting: {
                    mode: "multiple"
                },
                headerFilter: {
                    visible: true
                },
                searchPanel: {
                    visible: true,
                    width: 240,
                    placeholder: "Поиск..."
                },
                paging: {
                    pageSize: 15
                },
                columns: [{ dataField: 'customer', caption: "Customer", width: 250 },
                    { dataField: 'shippment', caption: "Ship" },
                    { dataField: 'payment', caption: "Pay" },
                    { dataField: 'bal', caption: "Receivable" },
                    { dataField: 'debt', caption: "OutReceivable" },
                    { dataField: 'deltaBal', caption: "ReceivGrowth" },
                    { dataField: 'deltaDebt', caption: "OutGrowth" }],
                selection: { mode: 'single', deferred: true },
                hoverStateEnabled: true,
                onCellPrepared: function (options) {
                    var fieldData = options.value;
                    if (options.rowType == "data" && options.columnIndex > 1) options.cellElement.text(Utils.numberWithSpaces(options.value));
                    if (options.rowType == "data" && (options.columnIndex == 6 || options.columnIndex == 5)) {
                        options.cellElement.addClass((fieldData > 0) ? "inc" : "dec");
                    }
                },
                summary: {
                    totalItems: [{
                        column: 'shippment',
                        summaryType: 'sum',
                        customizeText: function (data) { return Utils.numberWithSpaces(data.value); }
                    },
                    {
                        column: 'payment',
                        summaryType: 'sum',
                        customizeText: function (data) { return Utils.numberWithSpaces(data.value); }
                    },
                    {
                        column: 'bal',
                        summaryType: 'sum',
                        customizeText: function (data) { return Utils.numberWithSpaces(data.value); }
                    },
                    {
                        column: 'debt',
                        summaryType: 'sum',
                        customizeText: function (data) { return Utils.numberWithSpaces(data.value); }
                    },
                    {
                        column: 'deltaBal',
                        summaryType: 'sum',
                        customizeText: function (data) { return Utils.numberWithSpaces(data.value); }
                    },
                    {
                        column: 'deltaDebt',
                        summaryType: 'sum',
                        customizeText: function (data) { return Utils.numberWithSpaces(data.value); }
                    }]
                }
            };
        },
        popupOptionsGrid: function (visiblePopupGrid) {
            return {
                width: 1100,
                height: 800,
                contentTemplate: "customers",
                showTitle: true,
                title: "Долги по контрагентам",
                visible: visiblePopupGrid,
                closeOnOutsideClick: true,
                resizeEnabled: true,
                dragEnabled: true
            }
        }
    };
    $.extend(Debts.configView, config);
})()
