(function (resources) {
    resources.common = {
        dateRangePicker: {
            applyLabel: 'Apply',
            cancelLabel: 'Cancel',
            fromLabel: 'From',
            toLabel: 'To',
            weekLabel: 'W',
            customRangeLabel: 'Custom Range'
        },
        defaultFormat: {
            date: 'L',
            dateTime: 'L HH:mm',
            dateTimeWithSecond: 'L HH:mm:ss',
            dateAndMonth: 'MM/DD',
            time: 'HH:mm',
            number: 'N',
            currency: 'C',
            dateAllFormat: ['DD/MM/YYYY', 'DD/MM/YYYY HH:mm', 'DD/MM/YYYY HH:mm:ss', 'DD/MM/YYYY hh:mm a', 'DD/MM/YYYY hh:mm:ss a', 'D/M/YYYY', 'D/M/YYYY HH:mm', 'D/M/YYYY HH:mm:ss', 'D/M/YYYY hh:mm a', 'D/M/YYYY hh:mm:ss a', 'D/M/YYYY H:m', 'D/M/YYYY H:m:s', 'D/M/YYYY h:m a', 'D/M/YYYY h:m:s a', 'DD/MM/YYYY H:m', 'DD/MM/YYYY H:m:s', 'DD/MM/YYYY h:m a', 'DD/MM/YYYY h:m:s a'],
            dateTimeAllFormat: ['D/M/YYYY h:m', 'DD/MM/YYYY hh:mm', 'D/M/YYYY hh:mm', 'DD/MM/YYYY h:m', 'DD/MM/YYYY H:m']
        },
        mask: {
            numeric: {
                prefix: '$ ',
                suffix: '',
                groupSeparator: ',',
                radixPoint: '.'
            },
            dateTime: {
                date: 'mm/dd/yyyy',
                dateTime: 'datetime'
            }
        },
        pager: {
            noRecord: 'No record of {0}',
            description: 'Display {0} - {1} of {2} {3}'
        },
        message: {
            confirmDelete: 'Are you sure delete this {0}?',
            addNewSuccess: 'Add new {0} success!',
            updateSuccess: 'Update {0} success!',
            deleteSuccess: 'Delete {0} success!',
            loginSuccess: 'Login success!',
            loginFail: 'Invalid email or password',
            notExist: '{0} not exist or deleted!',
            alreadyExist: '{0} already exist!',
            notEnough: 'Not enough {0}'
        },
        allMonth: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        allQuarter: ['Q1', 'Q2', 'Q3', 'Q4'],
        selectpicker: {
            noneSelectedText: 'Nothing selected',
            noneResultsText: 'No results match',
            selectAllText: 'Select All',
            deselectAllText: 'Deselect All'
        },
        button: {
            ok: 'Ok',
            cancel: 'Cancel',
            upload: 'Upload file',
            loadMore: 'Load more'
        },
        title: {
            add: "Add new {0}",
            edit: "Edit {0}",
        }
    };
})(window.resources = window.resources || {});