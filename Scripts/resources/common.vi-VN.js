(function (resources) {
    resources.common = {
        dateRangePicker: {
            applyLabel: 'Áp dụng',
            cancelLabel: 'Hủy',
            fromLabel: 'Từ',
            toLabel: 'Đến',
            weekLabel: 'T',
            customRangeLabel: 'Tùy chọn'
        },
        defaultFormat: {
            date: 'L',
            dateTime: 'L HH:mm',
            dateTimeWithSecond: 'L HH:mm:ss',
            dateAndMonth: 'DD/MM',
            time: 'HH:mm',
            number: 'N',
            currency: 'C',
            dateAllFormat: ['DD/MM/YYYY', 'DD/MM/YYYY HH:mm', 'DD/MM/YYYY HH:mm:ss', 'DD/MM/YYYY hh:mm a', 'DD/MM/YYYY hh:mm:ss a', 'D/M/YYYY', 'D/M/YYYY HH:mm', 'D/M/YYYY HH:mm:ss', 'D/M/YYYY hh:mm a', 'D/M/YYYY hh:mm:ss a', 'D/M/YYYY H:m', 'D/M/YYYY H:m:s', 'D/M/YYYY h:m a', 'D/M/YYYY h:m:s a', 'DD/MM/YYYY H:m', 'DD/MM/YYYY H:m:s', 'DD/MM/YYYY h:m a', 'DD/MM/YYYY h:m:s a'],
            dateTimeAllFormat: ['D/M/YYYY h:m', 'DD/MM/YYYY hh:mm', 'D/M/YYYY hh:mm', 'DD/MM/YYYY h:m', 'DD/MM/YYYY H:m', 'D/M/YYYY H:m']
        },
        mask: {
            numeric: {
                prefix: '',
                suffix: ' đ',
                groupSeparator: ',',
                radixPoint: '.'
            },
            dateTime: {
                date: 'dd/mm/yyyy',
                dateTime: 'datetimevi'
            }
        },
        pager: {
            noRecord: 'Chưa có {0}',
            description: 'Hiển thị từ {0} đến {1} của {2} {3}'
        },
        message: {
            confirmDelete: 'Bạn có chắc muốn xóa {0} này không?',
            addNewSuccess: 'Thêm mới {0} thành công!',
            updateSuccess: 'Cập nhật {0} thành công!',
            deleteSuccess: 'Xóa {0} thành công!',
            loginSuccess: 'Đăng nhập thành công!',
            loginFail: 'Bạn nhập sai tên đăng nhập hoặc mật khẩu!',
            notExist: '{0} không tồn tại hoặc đã bị xóa!',
            alreadyExist: '{0} đã tồn tại!',
            notEnough: 'Không đủ {0}'
        },
        allMonth: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        allQuarter: ['Quý 1', 'Quý 2', 'Quý 3', 'Quý 4'],
        selectpicker: {
            noneSelectedText: 'Không có dữ liệu',
            noneResultsText: 'Không tìm thấy',
            selectAllText: 'Chọn tất cả',
            deselectAllText: 'Bỏ chọn tất cả'
        },
        button: {
            ok: 'Đồng ý',
            cancel: 'Hủy bỏ',
            upload: 'Tải tệp lên',
            loadMore: 'Tải thêm'
        },
        title: {
            add: "Thêm mới {0}",
            edit: "Chỉnh sửa {0}",
        }
    };
})(window.resources = window.resources || {});