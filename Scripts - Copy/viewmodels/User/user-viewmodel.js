define(["require", "exports", "jquery", "knockout", "toastr", "sweetalert", "lodash", "../../common/common", "../../models/user/user-model", "jqueryPager", "resourceCommon"], function (require, exports, $, ko, toastr, swal, lodash, common_1, user_model_1) {
    "use strict";
    var DepartmentViewModel = (function () {
        function DepartmentViewModel() {
            var _this = this;
            this.totalPage = 0;
            this.currentPage = 1;
            this.recordPerPage = window.pageSize;
            this.keyword = ko.observable("");
            this.isSearching = ko.observable(false);
            this.isShowAddOrEdit = ko.observable(false);
            this.listdeparments = ko.observableArray([]);
            this.listUsers = ko.observableArray([]);
            this.listDeparments = ko.observableArray([]);
            this.title = " 'Người Dùng' ";
            this.eid = ko.observable("");
            this.username = ko.observable("");
            this.password = ko.observable("");
            this.fullname = ko.observable("");
            this.email = ko.observable("");
            this.department = ko.observable("");
            this.membercode = ko.observable("");
            this.address = ko.observable("");
            this.position = ko.observable("");
            this.image = ko.observable("");
            this.phone = ko.observable("");
            this.isFocusName = ko.observable(false);
            this.isSending = ko.observable(false);
            this.isAdd = ko.observable(false);
            this.closeAddOrEdit = function () {
                _this.isShowAddOrEdit(false);
            };
            this.showEdit = function (item, updateCallback) {
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
            this.model = new user_model_1.UserModel();
            this.common = new common_1.Common();
            this.listDeparments(listdeparments);
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
        DepartmentViewModel.prototype.formSearch = function () {
            this.search(1);
        };
        DepartmentViewModel.prototype.search = function (page) {
            var _this = this;
            this.currentPage = page;
            this.isSearching(true);
            this.model.load(this.currentPage, function (data) {
                _this.isSearching(false);
                _this.listUsers(data.listUsers);
                //this.common.renderPage(this.title, page, this.recordPerPage, data.totalRecord, this.pageClickSearch);
            });
        };
        DepartmentViewModel.prototype.RentDepartment = function (DepartmentId) {
            //console.log(DepartmentId);
            //_.find(users, ['active', false]);
            //_.find(users, { 'age': 1, 'active': true });
            //console.log(lodash.find(this.listDeparments(), { 'id': DepartmentId }).name); // function (x) { return x.EID: DepartmentId; }).name);
            return lodash.find(this.listDeparments(), { 'id': DepartmentId }).name;
        };
        DepartmentViewModel.prototype.save = function () {
            var _this = this;
            if (!$("#addOrEditForm form").valid()) {
                return;
            }
            this.isSending(true);
            this.model.update({
                eid: this.eid(), username: this.username(), password: this.password(), fullname: this.fullname(),
                email: this.email(), department: this.department(), membercode: this.membercode(), address: this.address(),
                position: this.position(), image: this.image(), phone: this.phone()
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
        DepartmentViewModel.prototype.pageClickSearch = function (pageclickednumber) {
            this.search(pageclickednumber);
        };
        DepartmentViewModel.prototype.showAdd = function (updateCallback) {
            this.isAdd(true);
            this.resetForm();
            this.updateCallback = updateCallback;
            $("#addOrEditForm").modal('show');
        };
        DepartmentViewModel.prototype.resetForm = function () {
            this.eid("");
            this.email("");
            this.phone("");
            this.address("");
            this.username("");
            this.password("");
            this.fullname("");
            this.email("");
            this.department("");
            this.membercode("");
            this.address("");
            this.position("");
            this.image("");
            this.phone("");
            //setTimeout(() => { this.isFocusName(true); }, 100);
        };
        return DepartmentViewModel;
    }());
    window.viewModel = new DepartmentViewModel();
    ko.applyBindings(window.viewModel, document.getElementById("page-content"));
});
//# sourceMappingURL=user-viewmodel.js.map