define(["require", "exports", "amplify"], function (require, exports, amplify) {
    "use strict";
    amplify.request.define("Search", "ajax", {
        url: "/Admin/Organizations/Search",
        dataType: "json",
        type: "GET"
    });
    amplify.request.define("Load", "ajax", {
        url: "/Admin/Organizations/Load",
        dataType: "json",
        type: "POST"
    });
    amplify.request.define("Insert", "ajax", {
        url: "/Admin/Organizations/Insert",
        dataType: "json",
        type: "POST"
    });
    amplify.request.define("Update", "ajax", {
        url: "/Admin/Organizations/Update",
        dataType: "json",
        type: "POST"
    });
    amplify.request.define("Delete", "ajax", {
        url: "/Admin/Organizations/Delete",
        dataType: "json",
        type: "POST"
    });
    var OrganizationModel = (function () {
        function OrganizationModel() {
        }
        OrganizationModel.prototype.search = function (name, page, pageSize, callback) {
            amplify.request("Search", { name: name, page: page, pageSize: pageSize }, function (result) {
                callback(result);
            });
        };
        OrganizationModel.prototype.load = function (pageIndex, callback) {
            amplify.request("Load", { pageIndex: pageIndex }, function (result) {
                callback(result);
            });
        };
        OrganizationModel.prototype.insert = function (model, callback) {
            amplify.request("Insert", model, function (result) {
                callback(result);
            });
        };
        OrganizationModel.prototype.update = function (model, callback) {
            amplify.request("Update", model, function (result) {
                callback(result);
            });
        };
        OrganizationModel.prototype.delete = function (id, token, callback) {
            amplify.request("Delete", { id: id, __RequestVerificationToken: token }, function (result) {
                callback(result);
            });
        };
        return OrganizationModel;
    }());
    exports.OrganizationModel = OrganizationModel;
});