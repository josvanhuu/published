(function (resources) {
    resources.admin = {
        salon: {
            title: {
                name: "Salon",
                infoWindowTitle: "Salon name",
                infoWindowAddress: "Address",
                stateProvince: "State/Province"
            }
        },
        role:{
            title: {
                name: "Role",
                namePage: "Page",
                rolePage:"Role Page"
            }
        },
        necessary: {
            title: {
                name: "Necessary"
            }
        },
        necessary_manager: {
            title: {
                name: "Necessary Manager",
                namenecessary: "Necessary",
                namegrantor: "Grantor Name",
                namereceiver: "Receiver Name",
                namenumber: "Number",
                namesalon:"Salon"
            }
        },
        user_necessary: {
            title: {
                name: "User Necessary",
                namenecessary: "Necessary",
                nameuser: "User Name",
                namenumber: "Number",
                namesalon:"Salon"
            }
        },
        user: {
            title: {
                name: "user",
                infoWindowTitle: "User name",
                infoWindowAddress: "Address",
            },
            option: {
                gender: [{ value: 1, text: 'Male' }, { value: 2, text: 'Female' }, { value: 3, text: 'Other' }],
                marriage: [{ value: 0, text: 'Single' }, { value: 1, text: 'Married' }]
            }
        },
        payrollFormula: {
            title: {
                add: "Add new {0}",
                edit: "Edit {0}",
                name: "Payroll Formula"
            }
        },
        service: {
            title: {
                add: "Add new {0}",
                edit: "Edit {0}",
                name: "Service"
            }
        },
        salonRoom: {
            title: {
                name: "room"
            }
        },
        adminGroupUser: {
            title: {
                name: "user group"
            }
        },
        salonRoomChair: {
            title: {
                name: "chair"
            }
        },
        salonRoomChairManager: {
            title: {
                name: "chair"
            }
        }
    };
})(window.resources = window.resources || {});