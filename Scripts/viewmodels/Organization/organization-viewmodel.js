define(["require", "exports", "jquery", "knockout", "toastr", "sweetalert", "../../common/common", "../../models/organization/organization-model", "jqueryPager", "resourceCommon"], function (require, exports, $, ko, toastr, swal, common_1, organization_model_1) {
    "use strict";
    function OrganizationViewModel() {
        var _this = this;
        _this.totalPage = 0;
        _this.currentPage = 1;
        _this.recordPerPage = 10; //window.pageSize;
        _this.keyword = ko.observable("");
        _this.isSearching = ko.observable(false);
        _this.isShowAddOrEdit = ko.observable(false);
        _this.listOrganization = ko.observableArray([]);
        _this.eid = ko.observable("");

        _this.code = ko.observable("");
        _this.name = ko.observable("");
        _this.des = ko.observable("");

        _this.isFocusName = ko.observable(false);
        _this.isSending = ko.observable(false);
        _this.isAdd = ko.observable(false);
        _this.title = " 'Cơ quan ban hành' "; // window.resources.admin.salon.title.name;
        _this.closeAddOrEdit = function () {
            _this.isShowAddOrEdit(false);
        };
        _this.showEdit = function (item, updateCallback) {
            _this.isAdd(false);
            _this.eid(item.EID);
            _this.code(item.Code);
            _this.name(item.Name);
            _this.des(item.Des);
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
        //var self = this;
        _this.model = new organization_model_1.OrganizationModel();
        _this.common = new common_1.Common();
        $(function () {
            _this.listOrganization(listOrganizations);
            _this.totalPage = Math.ceil(_this.listOrganization().length / _this.recordPerPage);
            $("#pager").pager({ pagenumber: 1, pagecount: _this.totalPage, totalrecords: _this.listOrganization().length, buttonClickCallback: _this.pageClickSearch });
        });

        _this.formSearch = function () {
            _this.search(1);
        };
        _this.save = function () {
            var _this = this;
            if (!$("#addOrEditForm form").valid()) {
                return;
            }
            this.isSending(true);
            this.model.update({
                eid: this.eid(), code: this.code(), name: this.name(), des: this.des(),command: "insert"
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
                    _this.search(_this.currentPage);
                }
            });
            return;
        };
        _this.pageClickSearch = function (pageclickednumber) {
            _this.search(pageclickednumber);
        };
        ;
        _this.showAdd = function (updateCallback) {
            this.isAdd(true);
            this.resetForm();
            this.updateCallback = updateCallback;
            $("#addOrEditForm").modal('show');
        };
        _this.resetForm = function () {
            _this.eid("");
            _this.code("");
            _this.name("");
            _this.des("");
            //setTimeout(() => { this.isFocusName(true); }, 100);
        };
        _this.search = function (page) {
            _this.currentPage = page;
            //this.isSearching(true);
            _this.model.load(_this.currentPage, function (data) {
                //_this.isSearching(false);
                _this.listOrganization(data.listOrganizations);
                _this.totalPage = Math.ceil(data.totalRecord / _this.recordPerPage);
                $("#pager").pager({ pagenumber: _this.currentPage, pagecount: _this.totalPage, totalrecords: data.totalRecord, buttonClickCallback: _this.pageClickSearch });
            });
        };
    }
    window.viewModel = new OrganizationViewModel();
    ko.applyBindings(window.viewModel, document.getElementById("page-content"));
});