﻿define(["require", "exports", "jquery", "knockout", "toastr", "lodash", "sweetalert", "../../models/document/document-model", "moment", "jqueryPager", "resourceCommon"], function (require, exports, $, ko, toastr, lodash, swal, document_model_1, moment) {
    "use strict";
    function DocumentViewModel() {
        var _this = this;

        _this.doctype = doctype;
        _this.totalPage = 0;
        _this.currentPage = 1;
        _this.recordPerPage = window.pageSize;
        _this.title = doctype == 0 ? "Công Văn Đến" : "Công Văn Đi"; //ko.observable("Document");
        _this.keyword = ko.observable("");
        _this.isSearching = ko.observable(false);
        _this.isShowAddOrEdit = ko.observable(false);
        _this.isShowView = ko.observable(0);
        _this.type = ko.observable();

        _this.listDocumentType = ko.observableArray([]);
        _this.listDepartment = ko.observableArray([]);
        _this.listUser = ko.observableArray(listuser);
        _this.listOrganization = ko.observableArray(listorganization);
        _this.arrUser = ko.observableArray([]);
        _this.isUploading = ko.observable(false);
        _this.listDocument = ko.observableArray([]);
        _this.listfiles = ko.observableArray([]);
        _this.eid = ko.observable("");
        _this.files = ko.observableArray([]);
        _this.filesview = ko.observableArray([]);
        _this.thisdocument = ko.observableArray([]);

        //Document Field
        _this.documentcode = ko.observable("");
        _this.documentname = ko.observable("");
        _this.documentdes = ko.observable("");
        _this.documentdate = ko.observable("");
        _this.documentdateaction = ko.observable("");
        _this.documenttype = ko.observable("");
        _this.documentdepartment = ko.observable("");
        _this.documentuser = ko.observable("");
        _this.documentorganization = ko.observable("");
        _this.documentdatesent = ko.observable("");
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
            _this.documentcode(item.DocumentCode);
            _this.documentname(item.DocumentName);
            _this.documentdes(item.DocumentDes);
            _this.documentdate(moment(item.DocumentDate).format("YYYY-MM-DD"));
            _this.documentdateaction(moment(item.DocumentDateAction).format("YYYY-MM-DD"));
            _this.documenttype(item.DocumentType);
            _this.documentdepartment(item.DocumentDepartment);
            _this.documentuser(item.DocumentUser);
            _this.documentorganization(item.DocumentOrganization);
            _this.documentdatesent(item.DocumentDateSent != null ? moment(item.DocumentDateSent).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD"));
            //_this.files(item.ListDocument);
            _this.filesinput = item.ListDocument;

            _this.files().length = 0;

            for (var i = 0; i < item.ListDocument.length; i++)
            {
                var theFile = item.ListDocument[i];
                _this.files.push(new FileModel(theFile.Name, theFile.VituarlPath, theFile.size, theFile.type));
            }

            $("#addOrEditForm").modal('show');
        };

        //_this.removeFiles = function() {
        //    _this.files.splice(this);
        //}

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
                        //if (data === -1) {
                        //    toastr.warning(_this.common.stringFormat(window.resources.common.message.notExist, _this.title));
                        //    return;
                        //}
                        //if (data > 0) {
                        //    toastr.success(_this.common.stringFormat(window.resources.common.message.deleteSuccess, _this.title));
                        //}
                    });
                }
            });
        };
        _this.model = new document_model_1.DocumentModel();

        $(function () {
            _this.listDocumentType(listdocumenttype);
            _this.listDepartment(listdepartment);
            _this.listUser(listuser);
            _this.listDocument(listdocument);
            //_this.listOrganization(listorganization);

            _this.totalPage = Math.ceil(_this.listDocument().length / _this.recordPerPage);
            $("#pager").pager({ pagenumber: 1, pagecount: _this.totalPage, totalrecords: _this.listDocument().length, buttonClickCallback: _this.pageClickSearch });
        });
        _this.model = new document_model_1.DocumentModel();

        _this.formSearch = function () {
            _this.search(1);
        };

        _this.search = function (page) {
            _this.currentPage = page;
            _this.isSearching(true);
            _this.model.load(_this.currentPage, _this.doctype, function (data) {
                _this.isSearching(false);
                _this.listDocument(data);

                _this.totalPage = Math.ceil(_this.listDocument().length / _this.recordPerPage);
                $("#pager").pager({ pagenumber: _this.currentPage, pagecount: _this.totalPage, totalrecords: data.length, buttonClickCallback: _this.pageClickSearch });

            });
        };
        _this.documentdepartment.subscribe(function (newValue) {
            if (newValue != undefined) {
                var listUsershort = _.find(_this.listUser(), function (o) { return o.departmentId == newValue; });
                var items = [];
                _.forEach(listUsershort, function (item) {
                    items.push(item);
                });
                _this.arrUser(listUsershort);
            }
        });

        _this.fileSelect = function (elemet, event) {
            var files = event.target.files;// FileList object
            _this.filesinput = files;
            for (var i = 0, f; f = files[i]; i++) {
                var reader = new FileReader();
                // Closure to capture the file information.
                reader.onload = (function (theFile) {
                    return function (e) {
                        _this.files.push(new FileModel(theFile.name, e.target.result, theFile.size, theFile.type));
                    };
                })(f);
                // Read in the image file as a data URL.
                reader.readAsDataURL(f);
            }
        };

        var FileModel = function (name, src, size, format) {
            var self = this;
            this.name = name;
            this.src = src;
            this.SizeString = size;
            this.format = name.split('.').pop();
        };

        _this.save = function () {
            if (!$("#addOrEditForm form").valid()) {
                return;
            }
            _this.isSending(true);

            var datainput = new FormData();
            var files = _this.filesinput;
            if (files != undefined) {
                for (var x = 0; x < files.length; x++) {
                    datainput.append("file" + x, files[x]);
                }
            }
            else {
                toastr.warning("Xin vui lòng tải file đính kèm!");
                _this.isSending(false);
                return;
            }

            $.ajax({
                type: "POST",
                url: '/Admin/Document/Update?type=' + _this.doctype + '&eid=' + _this.eid() + '&documentcode=' + _this.documentcode()
                    + '&documentname=' + _this.documentname() + '&documentdes=' + _this.documentdes()
                    + '&documentdate=' + _this.documentdate() + '&documentdateaction=' + _this.documentdateaction()
                    + '&documenttype=' + _this.documenttype() + '&documentdepartment=' + _this.documentdepartment()
                    + '&documentorganization=' + _this.documentorganization()
                    + '&documentuser=' + _this.documentuser() + '&documentdatesent=' + _this.documentdatesent()
                ,
                contentType: false,
                processData: false,
                data: datainput,
                success: function (result) {
                    _this.isSending(false);

                    toastr.success('Succefull');
                    _this.resetForm();
                    $("#addOrEditForm").modal('hide');
                    _this.search(_this.currentPage);

                    //if ($.isArray(result)) {
                    //    toastr.error(result.join("<br>"));
                    //    return;
                    //}
                    //if (result === -2) {
                    //    toastr.warning(_this.common.stringFormat(window.resources.common.message.alreadyExist, window.resources.admin.salon.title.infoWindowTitle));
                    //    return;
                    //}
                    //if (result === -3) {
                    //    toastr.warning(_this.common.stringFormat(window.resources.common.message.notExist, window.resources.admin.salon.title.stateProvince));
                    //    return;
                    //}
                    //if (result > 0) {
                    //    toastr.success('Succefull');
                    //    _this.resetForm();
                    //    //_this.updateCallback();
                    //    $("#addOrEditForm").modal('hide');
                    //    _this.search(_this.currentPage);
                    //}
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

        _this.view = function () {
            _this.filesview().length = 0;
            _this.thisdocument().length = 0;            
            _this.filesview(this.ListDocument);
            _this.thisdocument(this);            
            _this.isShowView(1);
            console.log(_this.filesview());
            $("#viewDocumentForm").modal('show');
        };

        $("#viewDocumentForm").on("hidden", function () {
            _this.filesview().length = 0;
        });

        $("#addOrEditForm").on("hidden", function () {
            _this.resetForm();
        });

        var ViewFileModel = function (name, src, size, format) {
            var self = this;
            this.name = name;
            this.src = src;
            this.SizeString = size;
            this.format = format;
        };

        _this.resetForm = function () {
            _this.isAdd(false);
            _this.eid("");
            _this.documentcode("");
            _this.documentname("");
            _this.documentdes("");
            _this.documentdate("");
            _this.documentdateaction("");
            _this.documenttype("");
            _this.documentdepartment("");
            _this.documentuser("");
            _this.documentorganization("");
            _this.documentdatesent("");
            _this.filesinput = "";
            _this.files().length = 0;
            
            //setTimeout(() => { _this.isFocusName(true); }, 100);
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

    window.viewModel = new DocumentViewModel();
    ko.applyBindings(window.viewModel, document.getElementById("page-content"));
});