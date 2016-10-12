define(["require", "exports", "amplify"], function (require, exports, amplify) {
    "use strict";
    //amplify.request.define("Search", "ajax", {
    //    url: "/Admin/Departments/Search",
    //    dataType: "json",
    //    type: "GET"
    //});
    amplify.request.define("Load", "ajax", {
        url: "/Admin/Users/Load",
        dataType: "json",
        type: "POST"
    });
    amplify.request.define("Update", "ajax", {
        url: "/Admin/Users/Update",
        dataType: "json",
        type: "POST"
    });
    amplify.request.define("Delete", "ajax", {
        url: "/Admin/Users/Delete",
        dataType: "json",
        type: "POST"
    });
    amplify.request.define("Logout", "ajax", {
        url: "/Admin/Users/Logout",
        //dataType: "json",
        type: "POST"
    });
    amplify.request.define("Login", "ajax", {
        url: "/Admin/Login",
        type: "GET"
    });
    var UserModel = (function () {
        function UserModel() {
        }
        //search(name: string, page: number, pageSize: number, callback: (data: IListWithTotalRecord<IUser>) => void) {
        //    amplify.request("Search", { name: name, page: page, pageSize: pageSize },
        //        (result) => {
        //            callback(result);
        //        });
        //}
        UserModel.prototype.load = function (pageIndex, callback) {
            amplify.request("Load", { pageIndex: pageIndex }, function (result) {
                callback(result);
            });
        };
        UserModel.prototype.insert = function (model, callback) {
            amplify.request("Insert", model, function (result) {
                callback(result);
            });
        };
        UserModel.prototype.update = function (model, callback) {
            amplify.request("Update", model, function (result) {
                callback(result);
            });
        };
        UserModel.prototype.delete = function (id, token, callback) {
            amplify.request("Delete", { id: id, __RequestVerificationToken: token }, function (result) {
                callback(result);
            });
        };
        UserModel.prototype.logout = function () { amplify.request("Logout"); };
        ;
        return UserModel;
    }());
    exports.UserModel = UserModel;
});
//# sourceMappingURL=user-model.js.map