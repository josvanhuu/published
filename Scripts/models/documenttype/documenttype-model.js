define(["require", "exports", "amplify"], function (require, exports, amplify) {
    "use strict";
    amplify.request.define("Load", "ajax", {
        url: "/Admin/DocumentType/Load",
        dataType: "json",
        type: "POST"
    });
    amplify.request.define("Insert", "ajax", {
        url: "/Admin/DocumentType/Insert",
        dataType: "json",
        type: "POST"
    });
    amplify.request.define("Update", "ajax", {
        url: "/Admin/DocumentType/Update",
        dataType: "json",
        type: "POST"
    });
    amplify.request.define("Delete", "ajax", {
        url: "/Admin/DocumentType/Delete",
        dataType: "json",
        type: "POST"
    });
    var DocumentTypeModel = (function () {
        function DocumentTypeModel() {
        }
        DocumentTypeModel.prototype.load = function (pageIndex, callback) {
            amplify.request("Load", { pageIndex: pageIndex }, function (result) {
                callback(result);
            });
        };
        DocumentTypeModel.prototype.insert = function (model, callback) {
            amplify.request("Insert", model, function (result) {
                callback(result);
            });
        };
        DocumentTypeModel.prototype.update = function (model, callback) {
            amplify.request("Update", model, function (result) {
                callback(result);
            });
        };
        DocumentTypeModel.prototype.delete = function (id, token, callback) {
            amplify.request("Delete", { id: id, __RequestVerificationToken: token }, function (result) {
                callback(result);
            });
        };
        return DocumentTypeModel;
    }());
    exports.DocumentTypeModel = DocumentTypeModel;
});
//# sourceMappingURL=documenttype-model.js.map