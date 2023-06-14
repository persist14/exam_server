// 审批流程

// 车辆审批流程
const vehicleApplyAuditProcess = [
    {'leader': '部门负责人', 'order': '1'},
    {'leader': '车辆主管', 'order': '2'},
];

// 住房审批流程
// 更多套间数
const houseApplyAuditProcessSuiteLess = [
    {'leader': '公寓主管', 'order': '1'},
    {'leader': '后勤经理', 'order': '2'},
];
// 更多套间数
const houseApplyAuditProcessSuiteMore = [
    {'leader': '公寓主管', 'order': '1'},
    {'leader': '后勤经理', 'order': '2'},
    {'leader': '分管领导', 'order': '3'},
];

module.exports = {
    vehicleApplyAuditProcess,
    houseApplyAuditProcessSuiteLess,
    houseApplyAuditProcessSuiteMore,
};
