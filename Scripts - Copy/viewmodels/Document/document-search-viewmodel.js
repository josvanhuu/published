define(["require", "exports", "jquery", "knockout", "toastr", "sweetalert", "../../models/document/document-model", "jqueryPager", "resourceCommon"], function (require, exports, $, ko, toastr, swal, document_model_1) {
    "use strict";
    var DocumentSeachViewModel = (function () {
        function DocumentSeachViewModel() {
            var _this = this;
            this.totalPage = 0;
            this.currentPage = 1;
            this.recordPerPage = window.pageSize;
            this.title = ko.observable("Document");
            this.keyword = ko.observable("");
            this.isSearching = ko.observable(false);
            this.isShowAddOrEdit = ko.observable(false);
            this.listDocumentType = ko.observableArray([]);
            this.listDepartment = ko.observableArray([]);
            this.listDocument = ko.observableArray([]);
            this.eid = ko.observable("");
            //Document Field
            this.documentcode = ko.observable("");
            this.documentname = ko.observable("");
            this.documentdes = ko.observable("");
            this.documentdate = ko.observable("");
            this.documentdateaction = ko.observable("");
            this.documenttype = ko.observable("");
            this.documentdepartment = ko.observable("");
            //File Field
            this.name = ko.observable("");
            this.filename = ko.observable("");
            this.filedescription = ko.observable("");
            this.filepath = ko.observable("");
            this.filetype = ko.observable("");
            this.filedirect = ko.observable("");
            this.filedatecreated = ko.observable("");
            this.isFocusName = ko.observable(false);
            this.isSending = ko.observable(false);
            this.isAdd = ko.observable(false);
            this.closeAddOrEdit = function () {
                _this.isShowAddOrEdit(false);
            };
            this.showEdit = function (item, updateCallback) {
                _this.isAdd(false);
                _this.eid(item.EID);
                _this.name(item.Name);
                _this.updateCallback = updateCallback;
                $("#addOrEditForm").modal('show');
            };
            this.delete = function (item) {
                swal({
                    title: _this.common.stringFormat(window.resources.common.message.confirmDelete, _this.title),
                    text: "",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonText: window.resources.common.button.ok,
                    cancelButtonText: window.resources.common.button.cancel,
                    closeOnConfirm: true,
                    closeOnCancel: true
                }, function (isConfirm) {
                    if (isConfirm) {
                        //this.common.blockUI({ target: "#list", animate: true });
                        _this.model.delete(item.id, window.token, function (data) {
                            //if (data === -1) {
                            //    toastr.warning(this.common.stringFormat(window.resources.common.message.notExist, this.title));
                            //    return;
                            //}
                            //if (data > 0) {
                            //    toastr.success(this.common.stringFormat(window.resources.common.message.deleteSuccess, this.title));
                            //}
                        });
                    }
                });
            };
            this.model = new document_model_1.DocumentModel();
            $(function () {
                //this.listDocumentType = ko.observableArray(listdocumenttype);
                //this.listDepartment = ko.observableArray(listdepartment);
                //this.common.renderPage(this.title, 1, this.recordPerPage, listSalons.totalRecord, this.pageClickSearch);
                _this.search(1);
            });
            this.model = new document_model_1.DocumentModel();
            //$(() => {
            //    this.common.renderPage(this.title, 1, this.recordPerPage, listSalons.totalRecord, this.pageClickSearch);
            //    this.listSalons(listSalons.result);
            //});
        }
        DocumentSeachViewModel.prototype.formSearch = function () {
            this.search(1);
        };
        DocumentSeachViewModel.prototype.search = function (page) {
            var _this = this;
            this.currentPage = page;
            this.isSearching(true);
            this.model.load(this.currentPage, function (data) {
                _this.isSearching(false);
                _this.listDocument(data);
                console.log(_this.listDocument());
                //this.common.renderPage(this.title, page, this.recordPerPage, data.totalRecord, this.pageClickSearch);
            });
        };
        DocumentSeachViewModel.prototype.save = function () {
            var _this = this;
            if (!$("#addOrEditForm form").valid()) {
                return;
            }
            this.isSending(true);
            this.model.update({
                eid: this.eid(), documentcode: this.documentcode(), documentname: this.documentname(), documentdes: this.documentdes(),
                documentdate: this.documentdate(), documentdateaction: this.documentdateaction(), documenttype: this.documenttype(),
                documentdepartment: this.documentdepartment(),
                name: this.name(), filename: this.filename(), filedescription: this.filedescription(), filepath: this.filepath(),
                filetype: this.filetype(), filedirect: this.filedirect(), filedatecreated: this.filedatecreated(),
                command: "insert"
            }, function (data) {
                _this.isSending(false);
                if ($.isArray(data)) {
                    toastr.error(data.join("<br>"));
                    return;
                }
                if (data === -2) {
                    toastr.warning(_this.common.stringFormat(window.resources.common.message.alreadyExist, window.resources.admin.salon.title.infoWindowTitle));
                    return;
                }
                if (data === -3) {
                    toastr.warning(_this.common.stringFormat(window.resources.common.message.notExist, window.resources.admin.salon.title.stateProvince));
                    return;
                }
                if (data > 0) {
                    toastr.success('Succefull');
                    _this.resetForm();
                    //this.updateCallback();
                    $("#addOrEditForm").modal('hide');
                    _this.search(1);
                }
            });
            return;
        };
        DocumentSeachViewModel.prototype.pageClickSearch = function (pageclickednumber) {
            this.search(pageclickednumber);
        };
        DocumentSeachViewModel.prototype.showAdd = function (updateCallback) {
            this.isAdd(true);
            this.resetForm();
            this.updateCallback = updateCallback;
            $("#addOrEditForm").modal('show');
        };
        DocumentSeachViewModel.prototype.resetForm = function () {
            this.eid("");
            this.name("");
            //setTimeout(() => { this.isFocusName(true); }, 100);
        };
        return DocumentSeachViewModel;
    }());
    window.viewModel = new DocumentSeachViewModel();
    ko.applyBindings(window.viewModel, document.getElementById("page-content"));
});
//# sourceMappingURL=document-search-viewmodel.js.map