define(["require", "exports", "jquery", "knockout", "toastr", "sweetalert", "../../models/document/document-model", "lodash", "moment", "jqueryPager", "resourceCommon"], function (require, exports, $, ko, toastr, swal, document_model_1, lodash, moment) {
    "use strict";
    function DocumentSeachViewModel() {
        var _this = this;
        _this.totalPage = 0;
        _this.currentPage = 1;
        _this.recordPerPage = window.pageSize;
        _this.title = ko.observable("Document");
        _this.keyword = ko.observable("");
        _this.isSearching = ko.observable(false);
        _this.isShowAddOrEdit = ko.observable(false);

        _this.listDocumentType = ko.observableArray(listdocumenttype);
        _this.listDepartment = ko.observableArray(listdepartment);
        _this.listDocumentSearch = ko.observableArray([]);
        //_this.listUser = ko.observableArray(listuser);
        _this.listOrganization = ko.observableArray(listorganization);

        
        _this.eid = ko.observable("");
        //Document Field
        _this.documentcode = ko.observable("");
        _this.documentname = ko.observable("");
        _this.documentdes = ko.observable("");
        _this.documentdate = ko.observable("");
        _this.documentdateaction = ko.observable("");
        _this.documenttype = ko.observable("");
        _this.documentdepartment = ko.observable("");
        //File Field
        _this.name = ko.observable("");
        _this.filename = ko.observable("");
        _this.filedescription = ko.observable("");
        _this.filepath = ko.observable("");
        _this.filetype = ko.observable("");
        _this.filedirect = ko.observable("");
        _this.filedatecreated = ko.observable("");
        _this.isFocusName = ko.observable(false);
        _this.isSending = ko.observable(false);
        _this.isAdd = ko.observable(false);
        _this.closeAddOrEdit = function () {
            _this.isShowAddOrEdit(false);
        };
        _this.showEdit = function (item, updateCallback) {
            _this.isAdd(false);
            _this.eid(item.EID);
            _this.name(item.Name);
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
        _this.model = new document_model_1.DocumentModel();
        $(function () {
            _this.listDocumentSearch(listdocument);

            _this.totalPage = Math.ceil(_this.listDocumentSearch().length / _this.recordPerPage);
            $("#pager").pager({ pagenumber: 1, pagecount: _this.totalPage, totalrecords: _this.listDocumentSearch().length, buttonClickCallback: _this.pageClickSearch });

            //_this.search(1);
        });
        _this.model = new document_model_1.DocumentModel();        

        _this.formSearch = function () {
            this.search(1);
        };
        _this.search = function (page) {
            _this.currentPage = page;
            _this.isSearching(true);
            _this.model.load(this.currentPage, function (data) {
                _this.isSearching(false);
                _this.listDocumentSearch(data);

                _this.totalPage = Math.ceil(_this.listDocumentSearch().length / _this.recordPerPage);
                $("#pager").pager({ pagenumber: _this.currentPage, pagecount: _this.totalPage, totalrecords: _this.listDocumentSearch().length, buttonClickCallback: _this.pageClickSearch });

                //this.common.renderPage(this.title, page, this.recordPerPage, data.totalRecord, this.pageClickSearch);
            });
        };
        _this.save = function () {
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
        _this.pageClickSearch = function (pageclickednumber) {
            this.search(pageclickednumber);
        };

        _this.showAdd = function (updateCallback) {
            this.isAdd(true);
            this.resetForm();
            this.updateCallback = updateCallback;
            $("#addOrEditForm").modal('show');
        };

        _this.resetForm = function () {
            this.eid("");
            this.name("");
            //setTimeout(() => { this.isFocusName(true); }, 100);
        };

        _this.formatDate = function (date) {
            //return moment(date).format(window.resources.common.defaultFormat.date);
            return moment(date).format("DD/MM/YYYY");
        };

        _this.getDocumentType = function (documenttype) {
            return _.find(_this.listDocumentType(), ['id', documenttype]).name;
        };

        _this.getDocumentOrganization = function (documentorganization) {
            return _.find(_this.listOrganization(), ['id', documentorganization]).name;
        };

        _this.getDocumentDepartment = function (documentdepartment) {
            return _.find(_this.listDepartment(), ['id', documentdepartment]).name;
        };

    }
    window.viewModel = new DocumentSeachViewModel();
    ko.applyBindings(window.viewModel, document.getElementById("page-content"));
});