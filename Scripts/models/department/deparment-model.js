define(["require", "exports", "amplify"], function (require, exports, amplify) {
    "use strict";
    amplify.request.define("Search", "ajax", {
        url: "/Admin/Departments/Search",
        dataType: "json",
        type: "GET"
    });
    amplify.request.define("Load", "ajax", {
        url: "/Admin/Departments/Load",
        dataType: "json",
        type: "POST"
    });
    amplify.request.define("Insert", "ajax", {
        url: "/Admin/Departments/Insert",
        dataType: "json",
        type: "POST"
    });
    amplify.request.define("Update", "ajax", {
        url: "/Admin/Departments/Update",
        dataType: "json",
        type: "POST"
    });
    amplify.request.define("Delete", "ajax", {
        url: "/Admin/Departments/Delete",
        dataType: "json",
        type: "POST"
    });
    var DeparmentModel = (function () {
        function DeparmentModel() {
        }
        DeparmentModel.prototype.search = function (name, page, pageSize, callback) {
            amplify.request("Search", { name: name, page: page, pageSize: pageSize }, function (result) {
                callback(result);
            });
        };
        DeparmentModel.prototype.load = function (pageIndex, callback) {
            amplify.request("Load", { pageIndex: pageIndex }, function (result) {
                callback(result);
            });
        };
        DeparmentModel.prototype.insert = function (model, callback) {
            amplify.request("Insert", model, function (result) {
                callback(result);
            });
        };
        DeparmentModel.prototype.update = function (model, callback) {
            amplify.request("Update", model, function (result) {
                callback(result);
            });
        };
        DeparmentModel.prototype.delete = function (id, token, callback) {
            amplify.request("Delete", { id: id, __RequestVerificationToken: token }, function (result) {
                callback(result);
            });
        };
        return DeparmentModel;
    }());
    exports.DeparmentModel = DeparmentModel;
});
//# sourceMappingURL=deparment-model.js.map