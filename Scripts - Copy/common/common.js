define(["require", "exports", "jquery", "jqueryBlockUI", "resourceCommon"], function (require, exports, $) {
    "use strict";
    var Common = (function () {
        function Common() {
            this.strips = ["áàảãạăắằẳẵặâấầẩẫậ", "ÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬ", "đ", "Đ", "éèẻẽẹêếềểễệ", "ÉÈẺẼẸÊẾỀỂỄỆ", "íìỉĩị", "ÍÌỈĨỊ", "óòỏõọơớờởỡợôốồổỗộ", "ÓÒỎÕỌƠỚỜỞỠỢÔỐỒỔỖỘ", "ưứừửữựúùủũụ", "ƯỨỪỬỮỰÚÙỦŨỤ", "ýỳỷỹỵ", "ÝỲỶỸỴ"];
            this.replacements = ["a", "A", "d", "D", "e", "E", "i", "I", "o", "O", "u", "U", "y", "Y"];
            this.regex = new RegExp("^[a-zA-Z][\\w\\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\\w\\.-]*[a-zA-Z0-9]\\.[a-zA-Z][a-zA-Z\\.]*[a-zA-Z]$");
        }
        Common.prototype.stringFormat = function (str) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            for (var i = 0; i < args.length; i++) {
                var reg = new RegExp("\\{" + i + "\\}", "gm");
                str = str.replace(reg, args[i]);
            }
            return str;
        };
        Common.prototype.resetFormValidate = function (selector) {
            var form = $(selector);
            form.validate().resetForm();
            form.find("[data-val]").removeClass("input-validation-error").addClass("valid");
            form.find("[data-valmsg-replace]").removeClass("field-validation-error").addClass("field-validation-valid").empty();
            return form;
        };
        Common.prototype.stripVietnameseChars = function (input) {
            var stringBuilder = [];
            for (var k = 0; k < input.length; k++) {
                stringBuilder.push(input.charAt(k));
            }
            for (var i = 0; i < stringBuilder.length; i++) {
                for (var j = 0; j < this.strips.length; j++) {
                    if (this.strips[j].indexOf(stringBuilder[i]) > -1) {
                        stringBuilder[i] = this.replacements[j];
                    }
                }
            }
            return stringBuilder.join("");
        };
        Common.prototype.checkEmailFormat = function (email) {
            return this.regex.test($.trim(email));
        };
        Common.prototype.escapeRegExp = function (str) {
            return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
        };
        Common.prototype.replaceAll = function (str, find, replace) {
            if (str == null || str === "")
                return "";
            return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
        };
        Common.prototype.romanize = function (num) {
            if (!+num)
                return "";
            var digits = String(+num).split("");
            var key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
                "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
                "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
            var roman = "";
            var i = 3;
            while (i--)
                roman = (key[+digits.pop() + (i * 10)] || "") + roman;
            return Array(+digits.join("") + 1).join("M") + roman;
        };
        Common.prototype.blockUI = function (options) {
            options = $.extend(true, {}, options);
            var html = '';
            if (options.animate) {
                html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '">' + '<div class="block-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>' + '</div>';
            }
            else if (options.iconOnly) {
                html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '"><i class="fa fa-spinner fa-pulse fa-2x" />< /div>';
            }
            else if (options.textOnly) {
                html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '"><span>&nbsp;&nbsp;' + (options.message ? options.message : 'LOADING...') + '</span></div>';
            }
            else {
                html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '"><i class="fa fa-spinner fa-pulse fa-2x" /><span>&nbsp;&nbsp;' + (options.message ? options.message : 'LOADING...') + '</span></div>';
            }
            if (options.target) {
                var el = $(options.target);
                if (el.height() <= ($(window).height())) {
                    options.cenrerY = true;
                }
                el.block({
                    message: html,
                    baseZ: options.zIndex ? options.zIndex : 1000,
                    centerY: options.cenrerY !== undefined ? options.cenrerY : false,
                    css: {
                        top: '10%',
                        border: '0',
                        padding: '0',
                        backgroundColor: 'none'
                    },
                    overlayCSS: {
                        backgroundColor: options.overlayColor ? options.overlayColor : 'none',
                        opacity: options.boxed ? 0.05 : 0.1,
                        cursor: 'wait'
                    }
                });
            }
            else {
                $.blockUI({
                    message: html,
                    baseZ: options.zIndex ? options.zIndex : 1000,
                    css: {
                        border: '0',
                        padding: '0',
                        backgroundColor: 'none'
                    },
                    overlayCSS: {
                        backgroundColor: options.overlayColor ? options.overlayColor : '#555',
                        opacity: options.boxed ? 0.05 : 0.1,
                        cursor: 'wait'
                    }
                });
            }
        };
        Common.prototype.unblockUI = function (target) {
            if (target) {
                $(target).unblock({
                    onUnblock: function () {
                        $(target).css('position', '');
                        $(target).css('zoom', '');
                    }
                });
            }
            else {
                $.unblockUI();
            }
        };
        Common.prototype.renderPage = function (title, page, recordPerPage, totalRecord, pageClickCallback, selectorSumary, selectorPage) {
            var totalPage = Math.ceil(totalRecord / recordPerPage);
            var from = (page - 1) * recordPerPage + 1;
            var to = (page * recordPerPage < totalRecord ? page * recordPerPage : totalRecord);
            $(selectorSumary ? selectorSumary : "#sumarypager").html(totalRecord === 0 ? this.stringFormat(window.resources.common.pager.noRecord, title) : this.stringFormat(window.resources.common.pager.description, from, to, totalRecord, title));
            $(selectorPage ? selectorPage : "#pager").pager({ pagenumber: page, pagecount: totalPage, totalrecords: totalRecord, buttonClickCallback: pageClickCallback });
        };
        return Common;
    }());
    exports.Common = Common;
});
//# sourceMappingURL=common.js.map