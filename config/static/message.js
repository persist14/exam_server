// 消息通知
const moment = require('moment');

// 函数调用方式

// async getDingMessage(type)
// type:调用模块的对象名
// async
module.exports = {
    // 健康小屋 - 提前一天
    'healthDayBefore12Msg': {
        'dingMsg': '距离您设定的体检日期还有1天，请留意体检须知并于约定时间进行体检。',
        'insideMsg': '距离您设定的体检日期还有1天，请留意体检须知并于约定时间进行体检。点击前往查看>',
        'jump': 'pages/health/health',
    },
    // 健康小屋 - 今天 8 点
    'healthToday8Msg': {
        'dingMsg': '您有体检项目待完成，请留意体检须知并于约定时间进行体检。',
        'insideMsg': '您有体检项目待完成，请留意体检须知并于约定时间进行体检。点击前往查看>',
        'jump': 'pages/health/health',
    },
    // 健康小屋 - 设置提醒周期,比应该体检的时间短,应该体检但是没有体检的
    'healthSetNotice': {
        'dingMsg': '已超过您设置的体检日期，请留意体检须知并于约定时间进行体检。',
        'insideMsg': '已超过您设置的体检日期，请留意体检须知并于约定时间进行体检。点击前往查看>',
        'jump': 'pages/health/health',
    },
    // 新建 访客审批
    'visitorAuditMsg': {
        'dingMsg': '您有一条新的访客预约审批，请于园区微应用内进行审批。',
        'insideMsg': '您有一条新的访客预约审批，点击前往审批>',
        'jump': 'pages/visitorsapproval/pendingapproval',
    },
    // 商品库存不足
    'inventoryMsg': {
        'dingMsg': '${name}商品库存量不足5件，请及时补货。',
        'insideMsg': '${name}商品库存量不足5件，请及时补货，点击前往查看>',
        'jump': 'pages/supermarket/inventory?goods=${name}',
    },
    // 新的餐券管理 - to 审批人
    'newMealTicketMsg': {
        'dingMsg': '您有一条新的餐券申请审批，请于园区微应用内进行审批。',
        'insideMsg': '您有一条新的餐券申请待审批，点击前往审批>',
        'jump': 'pages/mealTicket/approval/approval',
    },
    // 餐券被审批 - to 申请人
    'mealTicketAuditMsg': {
        'dingMsg': '您的餐券申请已有领导审批，请于园区微应用内进行查看。',
        'insideMsg': '您的餐券申请，已有领导审批，点击查看审批详情>',
        'jump': 'pages/mealTicket/myApply/myApply',
    },
    // 新的住房申请 - to 审批人
    'newHouseApplyMsg': {
        'dingMsg': '您有一条新的住房申请审批，请于园区微应用内进行审批。',
        'insideMsg': '您有一条新的住房申请待审批，点击前往审批>',
        'jump': 'pages/house/approval/approval',
    },
    // 住房申请被审批 - to 申请人
    'houseApplyAuditMsg': {
        'dingMsg': '您的住房申请已有领导审批，请于园区微应用内进行查看。',
        'insideMsg': '您的住房申请，已有领导审批，点击查看审批详情>',
        'jump': 'pages/house/historyApply/historyApply',
    },
    // 通知公告
    'newNoticeMsg': {
        'dingMsg': '您收到一条新的通知公告，请于园区微应用内查看。',
        'insideMsg': '(${title})点此查看>',
        'jump': 'pages/messageCenter/notice?id=${id}&title=审批详情',
    },
    // 新的用车申请 - to 审批人
    'useCarApplyMsg': {
        'dingMsg': '您有一条新的用车申请审批，请于园区微应用内进行审批。',
        'insideMsg': '您有一条新的用车申请待审批，点击前往审批>',
        'jump': 'pages/useCar/approval/approval',
    },
    // 用车申请被审批 - to 申请人
    'useCarAuditMsg': {
        'dingMsg': '您的用车申请已有领导审批，请于园区微应用内进行查看。',
        'insideMsg': '您的用车申请，已有领导审批，点击查看审批详情>',
        'jump': 'pages/useCar/myApply/myApply',
    },

    // 会议预定被审批 - to 申请人
    'meetApplyMsg': {
        'dingMsg': '您的会议申请已有领导审批，请于园区微应用内进行查看。',
        'insideMsg': '您的会议申请，已有领导审批，点击查看审批详情>',
        'jump': 'pages/conferencemanagement/reservation',
    },
    // 会议可以审批的人 - to 审批人
    'meetNeedMsg': {
        'dingMsg': '您有一条新的会议申请审批，请于园区微应用内进行审批。',
        'insideMsg': '您有一条新的会议申请待审批，点击前往审批>',
        'jump': 'pages/conferencemanagement/approval',
    },
    // 会议参与者接收会议邀请消息通知
    'meetNoticeMsg': {
        'dingMsg': '您有一条新的会议邀请，请于园区微应用内进行查看。',
        'insideMsg': '您有一条会议邀请，点击前往查看>',
        'jump': 'pages/messageCenter/meeting?msg=0&id=${id}',
    },
    // 绩效申请- to 审批人
    'performanceApplyMsg': {
        'dingMsg': '您有一条新的绩效申请审批，请于园区微应用内进行审批。',
        'insideMsg': '您有一条新的绩效申请待审批，点击前往审批>',
        'jump': 'pages/performance/approval',
    },
    // 绩效申请被审批 - to 申请人
    'performanceAuditMsg': {
        'dingMsg': '您的绩效申请已有领导审批，请于园区微应用内进行查看。',
        'insideMsg': '您的绩效申请，已有领导审批，点击查看审批详情>',
        'jump': 'pages/performance/history',
    },

};