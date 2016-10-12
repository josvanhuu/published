define(["require", "exports", "jquery", "knockout", "toastr", "sweetalert", "../../common/common", "../../models/rolesettings/rolesettings-model", "jqueryPager", "resourceCommon"], function (require, exports, $, ko, toastr, swal, common_1, rolesettings_model_1) {
    "use strict";
    //declare var listdeparments;
    var RolesSettingViewModel = (function () {
        function RolesSettingViewModel() {
            var _this = this;
            this.totalPage = 0;
            this.currentPage = 1;
            this.recordPerPage = window.pageSize;
            this.keyword = ko.observable("");
            this.isSearching = ko.observable(false);
            this.isShowAddOrEdit = ko.observable(false);
            this.listRolesSetting = ko.observableArray([]);
            this.eid = ko.observable("");
            this.code = ko.observable("");
            this.name = ko.observable("");
            this.description = ko.observable("");
            this.status = ko.observable(true);
            this.isFocusName = ko.observable(false);
            this.isSending = ko.observable(false);
            this.isAdd = ko.observable(false);
            this.title = " 'Quyền truy cập' "; // window.resources.admin.salon.title.name;
            this.closeAddOrEdit = function () {
                _this.isShowAddOrEdit(false);
            };
            this.showEdit = function (item, updateCallback) {
                _this.isAdd(false);
                _this.eid(item.EID);
                _this.code(item.Code);
                _this.name(item.Name);
                _this.description(item.Des);
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
                        _this.common.blockUI({ target: "#list", animate: true });
                        _this.model.delete(item.id, window.token, function (data) {
                            if (data === -1) {
                                toastr.warning(_this.common.stringFormat(window.resources.common.message.notExist, _this.title));
                                return;
                            }
                            if (data > 0) {
                                toastr.success(_this.common.stringFormat(window.resources.common.message.deleteSuccess, _this.title));
                            }
                        });
                    }
                });
            };
            this.model = new rolesettings_model_1.RolesSettingModel();
            this.common = new common_1.Common();
            $(function () {
                //this.common.renderPage(this.title, 1, this.recordPerPage, listSalons.totalRecord, this.pageClickSearch);
                _this.search(1);
            });
        }
        RolesSettingViewModel.prototype.formSearch = function () {
            this.search(1);
        };
        RolesSettingViewModel.prototype.search = function (page) {
            var _this = this;
            this.currentPage = page;
            this.isSearching(true);
            this.model.load(function (data) {
                _this.isSearching(false);
                _this.listRolesSetting(data);
                //this.common.renderPage(this.title, page, this.recordPerPage, data.totalRecord, this.pageClickSearch);
            });
        };
        RolesSettingViewModel.prototype.save = function () {
            var _this = this;
            if (!$("#addOrEditForm form").valid()) {
                return;
            }
            this.isSending(true);
            this.model.update({
                eid: this.eid(), code: this.code(), name: this.name(), description: this.description(), status: this.status()
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
        RolesSettingViewModel.prototype.pageClickSearch = function (pageclickednumber) {
            this.search(pageclickednumber);
        };
        RolesSettingViewModel.prototype.showAdd = function (updateCallback) {
            this.isAdd(true);
            this.resetForm();
            this.updateCallback = updateCallback;
            $("#addOrEditForm").modal('show');
        };
        RolesSettingViewModel.prototype.resetForm = function () {
            this.eid("");
            this.code("");
            this.name("");
            this.description("");
            //setTimeout(() => { this.isFocusName(true); }, 100);
        };
        return RolesSettingViewModel;
    }());
    window.viewModel = new RolesSettingViewModel();
    ko.applyBindings(window.viewModel, document.getElementById("page-content"));
});
//# sourceMappingURL=rolesettings-viewmodel.js.map