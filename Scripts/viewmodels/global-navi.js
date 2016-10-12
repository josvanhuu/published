//declare var naviactive: string;
var NavigationViewModel = (function () {
    function NavigationViewModel() {
        //naviactive: KnockoutObservable<string>;
        this.naviactive = ko.observable("document");
        this.selected = ko.observable(this.naviactive());
    }
    return NavigationViewModel;
}());
window.viewModel = new NavigationViewModel();
ko.applyBindings(window.viewModel, document.getElementById("navigation-main"));
//# sourceMappingURL=global-navi.js.map