define(["require", "exports", "amplify"], function (require, exports, amplify) {
    "use strict";
    //amplify.request.define("Search", "ajax", {
    //    url: "/Admin/Departments/Search",
    //    dataType: "json",
    //    type: "GET"
    //});
    amplify.request.define("Load", "ajax", {
        url: "/Admin/RolesSetting/Load",
        dataType: "json",
        type: "POST"
    });
    amplify.request.define("Insert", "ajax", {
        url: "/Admin/RolesSetting/Insert",
        dataType: "json",
        type: "POST"
    });
    amplify.request.define("Update", "ajax", {
        url: "/Admin/RolesSetting/Update",
        dataType: "json",
        type: "POST"
    });
    amplify.request.define("Delete", "ajax", {
        url: "/Admin/RolesSetting/Delete",
        dataType: "json",
        type: "POST"
    });
    var RolesSettingModel = (function () {
        function RolesSettingModel() {
        }
        RolesSettingModel.prototype.search = function (name, page, pageSize, callback) {
            amplify.request("Search", { name: name, page: page, pageSize: pageSize }, function (result) {
                callback(result);
            });
        };
        RolesSettingModel.prototype.load = function (callback) {
            amplify.request("Load", {}, function (result) {
                callback(result);
            });
        };
        RolesSettingModel.prototype.insert = function (model, callback) {
            amplify.request("Insert", model, function (result) {
                callback(result);
            });
        };
        RolesSettingModel.prototype.update = function (model, callback) {
            amplify.request("Update", model, function (result) {
                callback(result);
            });
        };
        RolesSettingModel.prototype.delete = function (id, token, callback) {
            amplify.request("Delete", { id: id, __RequestVerificationToken: token }, function (result) {
                callback(result);
            });
        };
        return RolesSettingModel;
    }());
    exports.RolesSettingModel = RolesSettingModel;
});
//# sourceMappingURL=rolesettings-model.js.map