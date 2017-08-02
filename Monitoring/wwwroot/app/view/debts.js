var Debts = window.Debts || {};
Debts.view = function () {
    var urlDeps = Debts.configAPI.entities('deps'),
        urlAgents = Debts.configAPI.entities('agents'),
        urlCustomers = Debts.configAPI.entities('customers'),
        agents = ko.observableArray([]),
        customers = ko.observableArray([]),
        isLoad = ko.observable(false),
        visiblePopupGrid = ko.observable(false),
        supers = ko.observableArray([]);
    Debts.db.api(urlDeps).get().done(function (response) {
        isLoad(true);
        if (response.success) {
            var result = response.model;
            ko.utils.arrayForEach(result, function (item) {
                item.periodStr = Globalize.format(new Date(item.period.substring(0, 10)), 'dd/MM/yy');
                item.deltaBal = Math.round((item.bal - item.deltaBal) * 100) / 100;
                item.deltaDebt = Math.round((item.debt - item.deltaDebt) * 100) / 100;
            });
            result.sort(function (l, r) { return l.deltaDebt < r.deltaDebt ? 1 : -1; });
            supers(result);
            isLoad(false);
        }
        else {
            isLoad(false);
            alert(response.message)
        };
    });
    var loadAgents = function (id) {
        isLoad(true);
        Debts.db.api(urlAgents + '/' + id).get().done(function (response) {
            if (response.success) {
                var result = response.model;
                ko.utils.arrayForEach(result, function (item) {
                    item.deltaBal = Math.round((item.bal - item.deltaBal) * 100) / 100;
                    item.deltaDebt = Math.round((item.debt - item.deltaDebt) * 100) / 100;
                });
                result.sort(function (l, r) { return l.deltaDebt < r.deltaDebt ? 1 : -1; });
                agents(result);
                isLoad(false);
            }
            else {
                isLoad(false);
                alert(response.message)
            };
        });

    },
        loadCustomers = function (agent) {
            isLoad(true);
            Debts.db.api(urlCustomers + '/' + agent).get().done(function (response) {
                if (response.success) {
                    var result = response.model;
                    ko.utils.arrayForEach(result, function (item) {
                        item.deltaBal = Math.round((item.bal - item.deltaBal) * 100) / 100;
                        item.deltaDebt = Math.round((item.debt - item.deltaDebt) * 100) / 100;
                    });
                    result.sort(function (l, r) { return l.deltaDebt < r.deltaDebt ? 1 : -1; });
                    customers(result);
                    visiblePopupGrid(true);
                    isLoad(false);
                }
                else {
                    isLoad(false);
                    alert(response.message)
                };
            });
        };
    return {
        supers: supers,
        isLoad: isLoad,
        gridSupersOptions: Debts.configView.gridSupersOptions(supers, loadAgents),
        gridAgentsOptions: Debts.configView.gridAgentsOptions(agents, loadCustomers),
        gridKontragentsOptions: Debts.configView.gridKontragentsOptions(customers),
        popupOptionsGrid: Debts.configView.popupOptionsGrid(visiblePopupGrid)
    };
}
ko.applyBindings(Debts.view());
