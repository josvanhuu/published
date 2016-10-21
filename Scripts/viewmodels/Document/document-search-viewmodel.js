define(["require", "exports", "jquery", "knockout", "toastr", "sweetalert", "../../models/document/document-model", "lodash", "moment", "jqueryPager", "resourceCommon"], function (require, exports, $, ko, toastr, swal, document_model_1, lodash, moment) {
    "use strict";
    function DocumentSeachViewModel() {
        var _this = this;
        _this.totalPage = 0;
        _this.currentPage = 1;
        _this.recordPerPage = window.pageSize;
        _this.title = ko.observable("Document");
        
        _this.isSearching = ko.observable(false);
        _this.isShowAddOrEdit = ko.observable(false);

        _this.listDocumentType = ko.observableArray(listdocumenttype);
        _this.listDepartment = ko.observableArray(listdepartment);
        _this.listDocumentSearch = ko.observableArray([]);
        //_this.listUser = ko.observableArray(listuser);
        _this.listOrganization = ko.observableArray(listorganization);
        
        _this.eid = ko.observable("");
        //Document Field
        //_this.documentcode = ko.observable("");
        //_this.documentname = ko.observable("");
        //_this.documentdes = ko.observable("");
        //_this.documentdate = ko.observable("");
        //_this.documentdateaction = ko.observable("");
        

        //Field For Search
        _this.code = ko.observable("");
        _this.keyword = ko.observable("");
        _this.department = ko.observable("");

        _this.documenttype = ko.observable("");
        _this.documentdepartment = ko.observable("");

        _this.type = ko.observable(0);
        //_this.organization = ko.observable("");

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

        _this.FormSearch = function () {
            _this.search(1);
        };

        _this.search = function (page) {
            _this.currentPage = page;
            _this.isSearching(true);
            _this.model.searchload(_this.code(), _this.keyword(), _this.documentdepartment(), _this.documenttype(), 0, "", this.currentPage, function (data) {
                _this.isSearching(false);
                _this.listDocumentSearch(data);

                _this.totalPage = Math.ceil(_this.listDocumentSearch().length / _this.recordPerPage);
                $("#pager").pager({ pagenumber: _this.currentPage, pagecount: _this.totalPage, totalrecords: _this.listDocumentSearch().length, buttonClickCallback: _this.pageClickSearch });

                //this.common.renderPage(this.title, page, this.recordPerPage, data.totalRecord, this.pageClickSearch);
            });
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
            return moment(date).format(window.resources.common.defaultFormat.date);
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