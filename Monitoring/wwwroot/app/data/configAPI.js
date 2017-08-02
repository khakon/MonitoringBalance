Debts.configAPI = window.Debts.configAPI || {};
(function () {
    var config = {
        entities: function (entity) {
            var urls = {
                deps: '/api/deps',
                agents: 'api/agents',
                customers: 'api/customers'
            }
            return urls[entity];
        }
    };
    $.extend(Debts.configAPI, config);
})();