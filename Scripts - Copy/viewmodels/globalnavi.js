define(["require", "exports", "jquery", "knockout"], function (require, exports, $, ko) {
    "use strict";
    var NavigationViewModel = (function () {
        function NavigationViewModel() {
            this.naviactive = ko.observable(naviactive);
            $("#" + this.naviactive()).addClass(" active");
        }
        return NavigationViewModel;
    }());
    window.viewModel = new NavigationViewModel();
    ko.applyBindings(window.viewModel, document.getElementById("navigation-main"));
});
//# sourceMappingURL=globalnavi.js.map