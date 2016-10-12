define(["require", "exports", "jquery", "moment", "jqueryValidate", "jqueryValidateUnobtrusive", "globalize", "resourceCommon"], function (require, exports, $, moment) {
    "use strict";
    $.validator.methods["date"] = function (value, element) {
        //var format = ['DD/MM/YYYY', 'DD/MM/YYYY HH:mm', 'DD/MM/YYYY HH:mm:ss', 'DD/MM/YYYY hh:mm a', 'DD/MM/YYYY hh:mm:ss a', 'D/M/YYYY', 'D/M/YYYY HH:mm', 'D/M/YYYY HH:mm:ss', 'D/M/YYYY hh:mm a', 'D/M/YYYY hh:mm:ss a', 'D/M/YYYY H:m', 'D/M/YYYY H:m:s', 'D/M/YYYY h:m a', 'D/M/YYYY h:m:s a', 'DD/MM/YYYY H:m', 'DD/MM/YYYY H:m:s', 'DD/MM/YYYY h:m a', 'DD/MM/YYYY h:m:s a'];
        var format = [window.resources.common.defaultFormat.date, window.resources.common.defaultFormat.dateTime, window.resources.common.defaultFormat.dateTimeWithSecond];
        return this.optional(element) || moment(value, format, true).isValid();
    };
    $.validator.methods["number"] = function (value, element) {
        return this.optional(element) || !isNaN(Globalize.parseFloat(value));
    };
    $.validator.methods["range"] = function (value, element, param) {
        return this.optional(element) || (Globalize.parseFloat(value) >= param[0] && Globalize.parseFloat(value) <= param[1]);
    };
});
//# sourceMappingURL=validate.js.map