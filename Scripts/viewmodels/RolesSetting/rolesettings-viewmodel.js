define(["require", "exports", "jquery", "knockout", "toastr", "sweetalert", "../../common/common", "../../models/rolesettings/rolesettings-model", "jqueryPager", "resourceCommon"], function (require, exports, $, ko, toastr, swal, common_1, rolesettings_model_1) {
    "use strict";
    //declare var listdeparments;
    function RolesSettingViewModel() {
        var _this = this;
        _this.totalPage = 0;
        _this.currentPage = 1;
        _this.recordPerPage = window.pageSize;
        _this.keyword = ko.observable("");
        _this.isSearching = ko.observable(false);
        _this.isShowAddOrEdit = ko.observable(false);
        _this.listRolesSetting = ko.observableArray([]);
        _this.eid = ko.observable("");
        _this.code = ko.observable("");
        _this.name = ko.observable("");
        _this.description = ko.observable("");
        _this.status = ko.observable(true);
        _this.isFocusName = ko.observable(false);
        _this.isSending = ko.observable(false);
        _this.isAdd = ko.observable(false);
        _this.title = " 'Quyền truy cập' "; // window.resources.admin.salon.title.name;
        _this.closeAddOrEdit = function () {
            _this.isShowAddOrEdit(false);
        };
        _this.showEdit = function (item, updateCallback) {
            _this.isAdd(false);
            _this.eid(item.EID);
            _this.code(item.Code);
            _this.name(item.Name);
            _this.description(item.Des);
            _this.updateCallback = updateCallback;
            $("#addOrEditForm").modal('show');
        };
        _this.delete = function (item) {
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
        _this.model = new rolesettings_model_1.RolesSettingModel();
        _this.common = new common_1.Common();
        $(function () {
            //this.common.renderPage(this.title, 1, this.recordPerPage, listSalons.totalRecord, this.pageClickSearch);
            
            _this.listRolesSetting(listRolesSetting);
            //_this.search(1);
        });
        _this.formSearch = function () {
            _this.search(1);
        };
        _this.search = function (page) {
            var _this = this;
            _this.currentPage = page;
            _this.isSearching(true);
            _this.model.load(function (data) {
                _this.isSearching(false);
                _this.listRolesSetting(data);
                //_this.common.renderPage(_this.title, page, _this.recordPerPage, data.totalRecord, _this.pageClickSearch);
            });
        };
        _this.save = function () {
            if (!$("#addOrEditForm form").valid()) {
                return;
            }
            _this.isSending(true);
            _this.model.update({
                eid: _this.eid(), code: _this.code(), name: _this.name(), description: _this.description(), status: _this.status()
            }, function (data) {
                _this.isSending(false);
                if ($.isArray(data)) {
                    toastr.error(data.join("<br>"));
                    return;
                }
                if (data === -2) {
                    //toastr.warning(_this.common.stringFormat(window.resources.common.message.alreadyExist, window.resources.admin.salon.title.infoWindowTitle));
                    return;
                }
                if (data === -3) {
                    //toastr.warning(_this.common.stringFormat(window.resources.common.message.notExist, window.resources.admin.salon.title.stateProvince));
                    return;
                }
                if (data > 0) {
                    toastr.success('Succefull');
                    _this.resetForm();
                    //_this.updateCallback();
                    $("#addOrEditForm").modal('hide');
                    _this.search(1);
                }
            });
            return;
        };
        _this.pageClickSearch = function (pageclickednumber) {
            _this.search(pageclickednumber);
        };
        _this.showAdd = function (updateCallback) {
            _this.isAdd(true);
            _this.resetForm();
            _this.updateCallback = updateCallback;
            $("#addOrEditForm").modal('show');
        };
        _this.resetForm = function () {
            _this.eid("");
            _this.code("");
            _this.name("");
            _this.description("");
            //setTimeout(() => { this.isFocusName(true); }, 100);
        };
    }

    window.viewModel = new RolesSettingViewModel();
    ko.applyBindings(window.viewModel, document.getElementById("page-content"));
});
//# sourceMappingURL=rolesettings-viewmodel.js.map