define(["require", "exports", "amplify"], function (require, exports, amplify) {
    "use strict";
    //amplify.request.define("Search", "ajax", {
    //    url: "/Admin/Departments/Search",
    //    dataType: "json",
    //    type: "GET"
    //});
    amplify.request.define("Load", "ajax", {
        url: "/Admin/Document/Load",
        dataType: "json",
        type: "POST"
    });
    amplify.request.define("Insert", "ajax", {
        url: "/Admin/Document/Insert",
        dataType: "json",
        type: "POST"
    });
    amplify.request.define("Update", "ajax", {
        url: "/Admin/Document/Update",
        dataType: "json",
        type: "POST"
    });
    amplify.request.define("Delete", "ajax", {
        url: "/Admin/Document/Delete",
        dataType: "json",
        type: "POST"
    });
    var DocumentModel = (function () {
        function DocumentModel() {
        }
        DocumentModel.prototype.search = function (name, page, pageSize, callback) {
            amplify.request("Search", { name: name, page: page, pageSize: pageSize }, function (result) {
                callback(result);
            });
        };
        DocumentModel.prototype.load = function (pageIndex, callback) {
            amplify.request("Load", { pageIndex: pageIndex }, function (result) {
                callback(result);
            });
        };
        DocumentModel.prototype.insert = function (model, callback) {
            amplify.request("Insert", model, function (result) {
                callback(result);
            });
        };
        DocumentModel.prototype.update = function (model, callback) {
            amplify.request("Update", model, function (result) {
                callback(result);
            });
        };
        DocumentModel.prototype.delete = function (id, token, callback) {
            amplify.request("Delete", { id: id, __RequestVerificationToken: token }, function (result) {
                callback(result);
            });
        };
        return DocumentModel;
    }());
    exports.DocumentModel = DocumentModel;
});
//# sourceMappingURL=document-model.js.map