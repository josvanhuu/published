define(["require", "exports", "jquery", "knockout", "toastr", "sweetalert", "../../models/documenttype/documenttype-model"], function (require, exports, $, ko, toastr, swal, documenttype_model_1) {
    "use strict";
    var DocumenttypeViewModel = (function () {
        function DocumenttypeViewModel() {
            var _this = this;
            this.totalPage = 0;
            this.currentPage = 1;
            this.recordPerPage = window.pageSize;
            this.keyword = ko.observable("");
            this.isSearching = ko.observable(false);
            this.isShowAddOrEdit = ko.observable(false);
            this.listDocumentType = ko.observableArray([]);
            this.eid = ko.observable("");
            this.code = ko.observable("");
            this.name = ko.observable("");
            this.des = ko.observable("");
            this.isFocusName = ko.observable(false);
            this.isSending = ko.observable(false);
            this.isAdd = ko.observable(false);
            this.closeAddOrEdit = function () {
                _this.isShowAddOrEdit(false);
            };
            this.showEdit = function (item, updateCallback) {
                _this.isAdd(false);
                _this.eid(item.EID);
                _this.code(item.Code);
                _this.name(item.Name);
                _this.des(item.Des);
                _this.updateCallback = updateCallback;
                $("#addOrEditForm").modal('show');
            };
            this.delete = function (item) {
                swal({
                    title: "Delete item",
                    text: item.name,
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Đồng ý",
                    cancelButtonText: "Hủy",
                    closeOnConfirm: true,
                    closeOnCancel: true
                }, function (isConfirm) {
                    if (isConfirm) {
                        //this.common.blockUI({ target: "#list", animate: true });
                        _this.model.delete(item.id, window.token, function (data) {
                            if (data === -1) {
                                toastr.warning('Không thể xóa!');
                                return;
                            }
                            if (data > 0) {
                                toastr.success('Xóa thành công!');
                            }
                        });
                    }
                });
            };
            this.model = new documenttype_model_1.DocumentTypeModel();
            //this.listDocumentType(listdeparments);
            $(function () {
                //this.common.renderPage(this.title, 1, this.recordPerPage, listSalons.totalRecord, this.pageClickSearch);
                _this.search(1);
            });
            //this.model = new DepartmentsModel();
            //$(() => {
            //    this.common.renderPage(this.title, 1, this.recordPerPage, listSalons.totalRecord, this.pageClickSearch);
            //    this.listSalons(listSalons.result);
            //});
        }
        DocumenttypeViewModel.prototype.formSearch = function () {
            this.search(1);
        };
        DocumenttypeViewModel.prototype.search = function (page) {
            var _this = this;
            this.currentPage = page;
            this.isSearching(true);
            this.model.load(1, function (data) {
                //console.log(data);
                _this.isSearching(false);
                _this.listDocumentType(data);
                //console.log(this.listDocumentType());
                //this.common.renderPage(this.title, page, this.recordPerPage, data.totalRecord, this.pageClickSearch);
            });
        };
        DocumenttypeViewModel.prototype.save = function () {
            var _this = this;
            if (!$("#addOrEditForm form").valid()) {
                return;
            }
            this.isSending(true);
            this.model.update({
                eid: this.eid(), code: this.code(), name: this.name(), des: this.des()
            }, function (data) {
                _this.isSending(false);
                if ($.isArray(data)) {
                    toastr.error(data.join("<br>"));
                    return;
                }
                if (data === -2) {
                    //toastr.warning(this.common.stringFormat(window.resources.common.message.alreadyExist, window.resources.admin.salon.title.infoWindowTitle));
                    return;
                }
                if (data === -3) {
                    //toastr.warning(this.common.stringFormat(window.resources.common.message.notExist, window.resources.admin.salon.title.stateProvince));
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
        DocumenttypeViewModel.prototype.pageClickSearch = function (pageclickednumber) {
            this.search(pageclickednumber);
        };
        DocumenttypeViewModel.prototype.showAdd = function (updateCallback) {
            this.isAdd(true);
            this.resetForm();
            this.updateCallback = updateCallback;
            $("#addOrEditForm").modal('show');
        };
        DocumenttypeViewModel.prototype.resetForm = function () {
            this.eid("");
            this.code("");
            this.name("");
            this.des("");
            //setTimeout(() => { this.isFocusName(true); }, 100);
        };
        return DocumenttypeViewModel;
    }());
    window.viewModel = new DocumenttypeViewModel();
    ko.applyBindings(window.viewModel, document.getElementById("page-content"));
});
//# sourceMappingURL=documenttype-viewmodel.js.map