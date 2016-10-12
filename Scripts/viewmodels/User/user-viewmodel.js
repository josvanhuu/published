define(["require", "exports", "jquery", "knockout", "toastr", "sweetalert", "lodash", "../../common/common", "../../models/user/user-model", "jqueryPager", "resourceCommon"], function (require, exports, $, ko, toastr, swal, lodash, common_1, user_model_1) {
    "use strict";
    function UserViewModel() {
        var _this = this;
        _this.totalPage = 0;
        _this.currentPage = 1;
        _this.recordPerPage = window.pageSize;
        _this.keyword = ko.observable("");
        _this.isSearching = ko.observable(false);
        _this.isShowAddOrEdit = ko.observable(false);
        _this.listdeparments = ko.observableArray([]);
        _this.listUsers = ko.observableArray([]);
        _this.listDeparments = ko.observableArray([]);
        _this.title = " 'Người Dùng' ";
        _this.eid = ko.observable("");
        _this.username = ko.observable("");
        _this.password = ko.observable("");
        _this.fullname = ko.observable("");
        _this.email = ko.observable("");
        _this.department = ko.observable("");
        _this.membercode = ko.observable("");
        _this.address = ko.observable("");
        _this.position = ko.observable("");
        _this.image = ko.observable("");
        _this.phone = ko.observable("");
        _this.isFocusName = ko.observable(false);
        _this.isSending = ko.observable(false);
        _this.isAdd = ko.observable(false);
        _this.closeAddOrEdit = function () {
            _this.isShowAddOrEdit(false);
        };
        _this.showEdit = function (item, updateCallback) {
            _this.eid(item.EID);
            _this.email(item.Email);
            _this.phone(item.Phone);
            _this.address(item.Phone);
            _this.username(item.UserName);
            _this.password(item.Password);
            _this.fullname(item.FullName);
            _this.email(item.Email);
            _this.department(item.DepartmentId);
            _this.membercode(item.MemberCode);
            _this.address(item.Address);
            _this.position(item.Position);
            _this.image("");
            _this.phone(item.Phone);
            _this.isAdd(false);
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
                    //_this.common.blockUI({ target: "#list", animate: true });
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
        _this.model = new user_model_1.UserModel();
        _this.common = new common_1.Common();
        _this.listDeparments(listdeparments);
        $(function () {
            _this.listUsers(listuser);
            _this.totalPage = Math.ceil(_this.listUsers().length / _this.recordPerPage);
            $("#pager").pager({ pagenumber: 1, pagecount: _this.totalPage, totalrecords: _this.listUsers().length, buttonClickCallback: _this.pageClickSearch });
        });
        //_this.model = new DepartmentsModel();
        //$(() => {
        //    _this.common.renderPage(_this.title, 1, _this.recordPerPage, listSalons.totalRecord, _this.pageClickSearch);
        //    _this.listSalons(listSalons.result);
        //});

        _this.formSearch = function () {
            _this.search(1);
        };
        _this.search = function (page) {
            _this.currentPage = page;
            _this.isSearching(true);
            _this.model.load(_this.currentPage, function (data) {
                _this.isSearching(false);
                _this.listUsers(data.listUsers);
                //_this.common.renderPage(_this.title, page, _this.recordPerPage, data.totalRecord, _this.pageClickSearch);
            });
        };
        _this.RentDepartment = function (DepartmentId) {
            return lodash.find(_this.listDeparments(), { 'id': DepartmentId }).name;
        };
        _this.save = function () {
            if (!$("#addOrEditForm form").valid()) {
                return;
            }
            _this.isSending(true);
            _this.model.update({
                eid: _this.eid(), username: _this.username(), password: _this.password(), fullname: _this.fullname(),
                email: _this.email(), department: _this.department(), membercode: _this.membercode(), address: _this.address(),
                position: _this.position(), image: _this.image(), phone: _this.phone()
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
            _this.email("");
            _this.phone("");
            _this.address("");
            _this.username("");
            _this.password("");
            _this.fullname("");
            _this.email("");
            _this.department("");
            _this.membercode("");
            _this.address("");
            _this.position("");
            _this.image("");
            _this.phone("");
            //setTimeout(() => { _this.isFocusName(true); }, 100);
        };
    }
    
    window.viewModel = new UserViewModel();
    ko.applyBindings(window.viewModel, document.getElementById("page-content"));
});
//# sourceMappingURL=user-viewmodel.js.map