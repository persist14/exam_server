const cron = require('node-cron');
const moment = require('moment');

const _ = require('lodash');
const { CronJob } = require('../db/model');
const { pole, robot, meeting } = require('../third');
const { distributionTask } = require('../services/app/outdoor');
const { setOutdoorRobotServiceArea, setOutdoorRobotSiteList, setOutdoorRobotDockList, setOutdoorRobotDeliveryCarList, setOutdoorRobotCarportList } = require('../db/function/outdoorRobot');
const {cronEnvMonitorData} = require('../services/ioc/the-park-situational');
// 海康
const hk = require('../hikivision');
// 绿米iot
const iotLvMi = require('../../lib/third/meeting');
// 人员
const personApp = require('../../lib/third/isoftstone/person');
// 车辆
const vehicleApp = require('../../lib/third/isoftstone/vehicle');
const {smartDeviceTest, supermarketRevenueAnalysis, smartDeviceAnalysis } = require('../../lib/third/isoftstone/ioc/intelligence-service/smart-life');
const { offlineEquipmentAnalyse} = require('../../lib/third/isoftstone/ioc/intelligent-security/safety-equipment');
const { carOrPersonTraffic} = require('../../lib/third/isoftstone/ioc/the-park-situational');
const { carBlackCount} = require('../../lib/third/isoftstone/ioc/traffic-management/black-white-list');
const { trafficOverview, personTrafficRecords, personOrCarAnalysis, trafficDevice, trafficDeviceSecond} = require('../../lib/third/isoftstone/ioc/traffic-management/one-car-traffic');
const { visitorBookingRank, visitorBookingList} = require('../../lib/third/isoftstone/ioc/traffic-management/visitor-manage');
const {getSecurityDeviceList} = require('../../lib/third/isoftstone/api.js');
const {cronTask} = require('../socket/emit');
const {syncToThird} = require('../services/app/meal-ticket');
const {backupDB} = require('../services/admin');
// 园区态势
const situation = require('../../lib/third/isoftstone/situation');
// 考勤数据
const attendance = require('../../lib/services/ioc/attendance-management/attendance-management.js');
// 访客
const {sendMessageToFyb, sendMessageToAudit} = require('../services/app/visitor');
// 超市
const superMarket = require('../../lib/services/app/market');
const {lightLog} = require('../../config/log');

const inter = {};
const outer = {};

// 定时任务配置
const options = {
    scheduled: true,
    timezone: 'Asia/Shanghai',
};

// 定时任务
outer.cronJob = async () => {

    // cron 顺序重整
    // 1.一次性任务 初始化
    // 2.定时任务 每天固定时间
    // 3.定时任务 从小到大


    // 只执行一次
    inter.once();


    // 每分钟执行
    cron.schedule('* * * * *', async () => {
        console.log(`[cron] minute ${moment().format('YYYY-MM-DD HH:mm:ss')}`);

        distributionTask(); // 室外配送任务
        meeting.cronIotMinute();


        // 访客消息通知
        // 向防疫办发送消息
        sendMessageToFyb().then(() => console.log('[cron] [App 访客消息] 向防疫办发送消息 成功'));
        // 向审批人发送消息
        sendMessageToAudit().then(() => console.log('[cron] [App 访客消息] 向审批人发送消息 成功'));

        hk.cronRedisMin()
            .then(() => console.log('[cron] 测速仪 今日通行情况 redis 缓存 成功'))
            .catch(e => console.log( '[cron] 测速仪 今日通行情况 redis 缓存 异常 出错原因', e.message));


        // 智慧服务-智慧管理-照明设置
        // 获取现在时间
        let now = new Date();
        // 获取小时
        let hour = now.getHours();
        // 获取分钟
        let minute = now.getMinutes();
        // 从MongoDB中获取照明设置 type为pole 的数据
        let jobs = await CronJob.findOne({'cron_type': 'pole', 'cron_hour': hour, 'cron_minute': minute});
        console.log('---------------------------------------------');
        console.log(jobs ? '存在灯杆定时任务' : '没有灯杆定时任务');
        lightLog.info('灯杆定时开关灯监测', moment().format('YYYY-MM-DD HH:mm:ss'), jobs ? '存在灯杆定时任务' : '没有灯杆定时任务');
        // 如果数据库里的是当前的小时和分钟
        // 就执行操作
        if (!_.isEmpty(jobs)) {
            // 控制灯杆
            // 开或关
            // TODO !需要暂时注释掉下面这行
            pole.poleOpenClosecontrol(jobs.cron_operate);
            // console.log('注释掉了实际控制灯杆的代码');
            // 返回数据,以定时任务状态为准,因为灯杆指令下发有时延
            let time = await CronJob.find({'cron_type': 'pole'});
            // 查询库中 有2个 一个是 定时开灯 一个是 定时关灯
            let start_time = '', end_time = '';
            for (let o of time){
                // 遍历2个
                if (o.cron_operate === 'open') start_time = `${o.cron_hour}:${o.cron_minute}`;
                if (o.cron_operate === 'close') end_time = `${o.cron_hour}:${o.cron_minute}`;
            }
            // 发送socket
            // 为true 是开灯 为false 是关灯
            // TODO
            console.log('[cron] [App 照明设置] 定时开关灯 ');
            console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
            console.log(jobs.cron_operate );
            console.log(start_time);
            console.log(end_time);
            console.log('为true 是开灯 为false 是关灯');
            console.log(jobs.cron_operate === 'open');
            cronTask('poleState', {'switch': jobs.cron_operate === 'open', 'start_time': start_time, 'end_time': end_time });
            lightLog.info('灯杆定时开关灯  时间：', moment().format('YYYY-MM-DD HH:mm:ss'), '操作：', jobs.cron_operate === 'open' ? '开灯' : '关灯');
        }

    }, options);

    // 每15分钟执行
    cron.schedule('*/15 * * * *', async () => {
        console.log(`[cron] 15min --------------- ${moment().format('YYYY-MM-DD HH:mm:ss')}`);

        carOrPersonTraffic.cronRedisHour()
            .then(() => console.log('[cron] 园区态势-人员同行分析/车辆通行分析 redis 缓存 每15分钟一次'))
            .catch(e => console.log('[cron] 园区态势-人员同行分析/车辆通行分析 redis 缓存 每15分钟一次失败 出错原因', e.message));


        carOrPersonTraffic.cronRedisHour()
            .then(() => console.log('[cron] 园区态势-人员同行分析/车辆通行分析 redis 缓存 每15分钟一次'))
            .catch(e => console.log('[cron] 园区态势-人员同行分析/车辆通行分析 redis 缓存 每15分钟一次失败 出错原因', e.message));
    });

    // 每05分钟执行
    cron.schedule('*/5 * * * *', async () => {
        console.log(`[cron] 05min --------------- ${moment().format('YYYY-MM-DD HH:mm:ss')}`);

        // App 车辆管理 redis缓存
        vehicleApp.cronRedisHour()
            .then(() => console.log('[cron] [App 车辆管理] 更新redis缓存 成功'))
            .catch(e => console.log('[cron] [App 车辆管理] App 车辆管理 redis缓存出错', e.message));

        // App 人员管理 redis缓存
        personApp.cronRedisHour()
            .then(() => console.log('[cron] [App 人员管理] 更新redis缓存 成功'))
            .catch(e => console.log('[cron] [App 人员管理] App 人员管理 redis缓存出错', e.message));

    });

    // 每小时执行
    cron.schedule('0 * * * *', async () => {
        console.log(`[cron] hour  --------------- ${moment().format('YYYY-MM-DD HH:mm:ss')}`);
        await getSecurityDeviceList(); // 获取安防设备(摄像头,门禁)
        await cronEnvMonitorData(); // 获取环境监测数据
        robot.cronListInfo(); // 室内配送机器人楼宇,点位基础信息

        trafficDevice.cronRedisHour()
            .then(() => console.log('[cron] [通行管理-人车通行-通行设备] 更新redis缓存 成功'))
            .catch(e => console.log('[cron] [通行管理-人车通行-通行设备] redis缓存出错', e.message));

        trafficDeviceSecond.cronRedisHour()
            .then(() => console.log('[cron] [通行管理-人车通行-通行设备二级面板] 更新redis缓存 成功'))
            .catch(e => console.log('[cron] [通行管理-人车通行-通行设备二级面板] redis缓存出错', e.message));


        supermarketRevenueAnalysis.cronRedisDay()
            .then(() => console.log('[cron] 智慧服务-智慧生活-超市收益分析 redis 缓存 每天1点一次'))
            .catch(e => console.log( '[cron] 超市收益情况更新 数据库为内网数据库 出错会导致无法查询收益情况 本地运行报错不用处理 服务器报错需要处理 出错原因', e.message));

        smartDeviceAnalysis.cronRedisHour()
            .then(() => console.log('[cron] 智慧生活-智能家居设备统计分析 redis 缓存 成功'))
            .catch(e => console.log( '[cron] 智慧生活-智能家居设备统计分析 redis 缓存 异常 出错原因', e.message));


        smartDeviceTest.cronRedisHour()
            .then(() => console.log('[cron] 智慧生活-智能家居设备检测 redis 缓存 成功'))
            .catch(e => console.log( '[cron] 智慧生活-智能家居设备检测 redis 缓存 异常 出错原因', e.message));

        situation.cronRedisHour()
            .then(() => console.log('[cron] 园区态势-智能设备概况 redis 缓存 成功'))
            .catch(e => console.log( '[cron] 园区态势-智能设备概况 redis 缓存 异常 出错原因', e.message));

        hk.cronRedisHour()
            .then(() => console.log('[cron] ue4 监控 测速仪 redis 缓存 成功'))
            .catch(e => console.log( '[cron] ue4 监控 测速仪 redis 缓存 异常 出错原因', e.message));

        meeting.cronIotHour()
            .then(() => console.log('[cron] 更新mongodb 数据表（设备信息，位置信息）成功'))
            .catch(e => console.log( '[cron] 更新mongodb 数据表（设备信息，位置信息）出错,可能导致iot相关接口数据异常 出错原因', e.message));

        // 室外配送-获取基础数据
        inter.getOutDoorDataList()
            .then(() => console.log('[cron] 执行获取基础数据'))
            .catch(e => console.log('[cron] 执行获取基础数据失败 出错原因', e.message));


        trafficOverview.cronRedisHour()
            .then(() => console.log('[cron] 人车通行-通行概况-人车百分比 redis 缓存 每小时一次'))
            .catch(e => console.log('[cron] 人车通行-通行概况-人车百分比 redis 缓存 每小时一次失败 出错原因', e.message));


        visitorBookingRank.cronRedisHour()
            .then(() => console.log('[cron] 访客管理-访客预约排名 redis 缓存 每小时一次'))
            .catch(e => console.log('[cron] 访客管理-访客预约排名 redis 缓存 每小时一次失败 出错原因', e.message));

        carOrPersonTraffic.cronRedisHour()
            .then(() => console.log('[cron] 园区态势-人员同行分析/车辆通行分析 redis 缓存 每小时一次'))
            .catch(e => console.log('[cron] 园区态势-人员同行分析/车辆通行分析 redis 缓存 每小时一次失败 出错原因', e.message));


        visitorBookingList.cronRedisHour()
            .then(() => console.log('[cron] 访客管理-访客预约列表 / 访客追踪 redis 缓存 每小时一次'))
            .catch(e => console.log('[cron] 访客管理-访客预约列表 / 访客追踪 redis 缓存 每小时一次失败 出错原因', e.message));


        personTrafficRecords.cronRedisHour()
            .then(() => console.log('[cron] 人车通行-人车通行记录 redis 缓存 每小时一次'))
            .catch(e => console.log('[cron] 人车通行-人车通行记录 redis 缓存 每小时一次失败 出错原因', e.message));


        personOrCarAnalysis.cronRedisHour()
            .then(() => console.log('[cron] 通行管理-人车通行-人员入园分析 / 人员出园分析 / 车辆入园分析 / 车辆出园分析 redis 缓存 每小时一次'))
            .catch(e => console.log('[cron] 通行管理-人车通行-人员入园分析 / 人员出园分析 / 车辆入园分析 / 车辆出园分析 redis 缓存 每小时一次失败 出错原因', e.message));


        carBlackCount.cronRedisHour()
            .then(() => console.log('[cron] 通行管理-黑白名单-车辆黑白名单统计 已改名为 车辆黑名单统计 redis 缓存 每小时一次'))
            .catch(e => console.log('[cron] 通行管理-黑白名单-车辆黑白名单统计 已改名为 车辆黑名单统计 redis 缓存 每小时一次失败 出错原因', e.message));


        // App 车辆管理 redis缓存
        vehicleApp.cronRedisHour()
            .then(() => console.log('[cron] [App 车辆管理] 更新redis缓存 成功'))
            .catch(e => console.log('[cron] [App 车辆管理] App 车辆管理 redis缓存出错', e.message));

        // App 人员管理 redis缓存
        personApp.cronRedisHour()
            .then(() => console.log('[cron] [App 人员管理] 更新redis缓存 成功'))
            .catch(e => console.log('[cron] [App 人员管理] App 人员管理 redis缓存出错', e.message));

    }, options);

    // 每天十三点执行
    cron.schedule('00 13 * * *', async () => {
        console.log(`[cron] day 13:00  --------------- ${moment().format('YYYY-MM-DD HH:mm:ss')}`);

        console.log('无人超市补货通知');

        // 无人超市补货通知  13点进行补货通知
        superMarket.cronMarketInventory()
            .then(() => console.log('[cron] 无人超市补货通知 成功 每天13点一次'))
            .catch(e => console.log( '[cron] 无人超市补货通知 失败', e.message));

    }, options);


    // 每天零点执行
    cron.schedule('10 0 * * *', async () => {
        console.log(`[cron] day 00:10 --------------- ${moment().format('YYYY-MM-DD HH:mm:ss')}`);

        syncToThird()
            .then(() => console.log('[cron] 同步数据到第三方成功'))
            .catch(e => console.log('[cron] 同步数据到第三方失败 出错原因', e.message));

    }, options);

    // 每天4点执行
    cron.schedule('0 4 * * *', async () => {
        console.log(`[cron] day --------------- ${moment().format('YYYY-MM-DD HH:mm:ss')}`);

        // 4点考勤数据更新
        await attendance.cornAttendanceDay(`${moment().format('YYYY-MM-DD HH')}`, `${moment().format('YYYY-MM-DD HH')}`)
            .then(() => console.log('[cron] 考勤数据更新 每天4点执行'))
            .catch(e => console.log('[cron] 考勤数据更新失败 出错原因', e.message));

    }, options);

    // 更新iot token 每天中午12点执行
    cron.schedule('0 12 * * *', async () => {
        console.log(`[cron] day 12:00 --------------- ${moment().format('YYYY-MM-DD HH:mm:ss')}`);
        // iot绿米刷新token
        await meeting.cronIotDay()
            .then(() => console.log('[cron] iot绿米每日更新token成功'))
            .catch(e => console.log('[cron] iot绿米每日更新token失败 原因可能是别处更新了token 或者token7天没有更新自然失效 出错原因', e.message));

    }, options);

    // 每天一点执行
    cron.schedule('0 1 * * *', async () => {
        console.log(`[cron] day 01:00  --------------- ${moment().format('YYYY-MM-DD HH:mm:ss')}`);

        await backupDB()
            .then(() => console.log('[cron] 数据备份 每天1点执行'))
            .catch((e) => console.log('数据备份错误,出错原因', e.message));

        // 智慧服务-智慧生活-超市收益分析 redis缓存
        supermarketRevenueAnalysis.cronRedisDay()
            .then(() => console.log('[cron] 智慧服务-智慧生活-超市收益分析 redis 缓存 每天1点一次'))
            .catch(e => console.log( '[cron] 超市收益情况更新 数据库为内网数据库 出错会导致无法查询收益情况 本地运行报错不用处理 服务器报错需要处理 出错原因', e.message));

    }, options);


    // 每天23点执行

    cron.schedule('0 22 * * *', async () => {
        console.log(`[cron] day 23:00 --------------- ${moment().format('YYYY-MM-DD HH:mm:ss')}`);
        // 更新考勤数据
        await attendance.cornAttendanceDay(moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'))
            .then(() => console.log('[cron] [考勤数据]考勤数据更新，每天22点执行'))
            .catch(e => console.log('[cron] [考勤数据]考勤数据更新出错 出错原因', e.message));


    }, options);

    cron.schedule('30 18 * * *', async () => {
        console.log(`[cron] day 18:30 --------------- ${moment().format('YYYY-MM-DD HH:mm:ss')}`);

        // 更新mongodb 数据表（IOT电量信息，IOT设备离线信息）
        await smartDeviceTest.cronUpdateIotInfoEveryDay()
            .then(() => console.log('[cron] IOT更新电量 更新在线离线 存入mongodb 每天23点执行'))
            .catch(e => console.log('[cron] IOT更新电量更新在线离线出错  出错原因', e.message));


        // 更新mongodb 数据表（安防设备离线信息）
        await offlineEquipmentAnalyse.cronRedisDay()
            .then(() => console.log('[cron] 安防设备离线 每个离线加一条 存入mongodb 每天23点执行'))
            .catch(e => console.log('[cron] 安防设备离线信息更新出错 出错原因', e.message));


    }, options);

};

// 只执行一次
inter.once = async () => {

    // 仅仅执行一次 当看见时请注释掉 ↓  开始
    // 更新mongodb 数据表（集合）
    // 报错 请查看有没有绿米的token 位置在本地mongo 的iottokens 过期时间为7天
    await iotLvMi.updateLocalCollection()
        .then(() => console.log('[cron] [初始化] 更新mongodb 数据表 成功'))
        .catch(e => console.log( '[cron] [初始化] 更新mongodb 数据表出错,可能导致iot相关接口数据异常 需要检查本地token是否更新 出错原因', e.message));
    // 对于cameralists 扎堆点位监控 更新该表排序的字段 要不然调用的接口还是返回无法排序的数据
    // ruanTong.getSecurityDeviceList();
    // 这个方法只用执行一次 用于创建中间表IotDeviceModel 非常耗时！ 如果报错可能是调用三方接口次数过多
    // smartDeviceTest.updateIotTable();
    // 仅仅执行一次 当看见时请注释掉 ↑  结束

    // ue4 监控 测速仪
    // ! 会占用长时间  原因：缓存量大，要缓存10页*7天
    // hk.cronRedisHour()
    //     .then(() => console.log('[cron] ue4 监控 测速仪 redis 缓存 成功'))
    //     .catch(e => console.log( '[cron] ue4 监控 测速仪 redis 缓存 异常 出错原因', e.message));

    await cronEnvMonitorData();
    await getSecurityDeviceList(); // 获取安防设备(摄像头,门禁)
    inter.getOutDoorDataList();// 初始化的时候调用一次室外配送数据获取
    distributionTask(); // 室外配送任务轮询，初始化的时候查询一次

    // 通行管理-人车通行-通行设备 redis缓存
    trafficDevice.cronRedisHour()
        .then(() => console.log('[cron] [通行管理-人车通行-通行设备] 更新redis缓存 成功'))
        .catch(e => console.log('[cron] [通行管理-人车通行-通行设备] redis缓存出错', e.message));

    // 通行管理-人车通行-通行设备二级面板 redis缓存
    trafficDeviceSecond.cronRedisHour()
        .then(() => console.log('[cron] [通行管理-人车通行-通行设备二级面板] 更新redis缓存 成功'))
        .catch(e => console.log('[cron] [通行管理-人车通行-通行设备二级面板] redis缓存出错', e.message));

    // 测速仪 今日通行情况
    hk.cronRedisMin()
        .then(() => console.log('[cron] 测速仪 今日通行情况 redis 缓存 成功'))
        .catch(e => console.log( '[cron] 测速仪 今日通行情况 redis 缓存 异常 出错原因', e.message));

    // 通行管理-人车通行-通行概况 redis缓存
    trafficOverview.cronRedisHour()
        .then(() => console.log('[cron] [通行管理-人车通行-通行概况] 更新redis缓存 成功'))
        .catch(e => console.log('[cron] [通行管理-人车通行-通行概况] 通行概况redis缓存出错', e.message));

    // 通行管理-访客管理-访客预约排名 redis缓存
    visitorBookingRank.cronRedisHour()
        .then(() => console.log('[cron] [通行管理-访客管理-访客预约排名] 更新redis缓存 成功'))
        .catch(e => console.log('[cron] [通行管理-访客管理-访客预约排名] 访客预约排名redis缓存出错', e.message));

    // 园区态势-园区态势-人员同行分析/车辆通行分析 redis缓存
    carOrPersonTraffic.cronRedisHour()
        .then(() => console.log('[cron] [园区态势-园区态势-人员同行分析/车辆通行分析] 更新redis缓存 成功'))
        .catch(e => console.log('[cron] [园区态势-园区态势-人员同行分析/车辆通行分析] 人员同行分析/车辆通行分析redis缓存出错', e.message));

    // 通行管理-访客管理-访客预约列表 / 访客追踪 redis缓存
    visitorBookingList.cronRedisHour()
        .then(() => console.log('[cron] [通行管理-访客管理-访客预约列表 / 访客追踪] 更新redis缓存 成功'))
        .catch(e => console.log('[cron] [通行管理-访客管理-访客预约列表 / 访客追踪] 访客预约列表/访客追踪redis缓存出错', e.message));

    // 通行管理-人车通行-人车通行记录 redis缓存
    personTrafficRecords.cronRedisHour()
        .then(() => console.log('[cron] [通行管理-人车通行-人车通行记录] 更新redis缓存 成功'))
        .catch(e => console.log('[cron] [通行管理-人车通行-人车通行记录] 人车通行记录redis缓存出错', e.message));

    // 通行管理-人车通行-人员入园分析 / 人员出园分析 / 车辆入园分析 / 车辆出园分析 redis缓存
    personOrCarAnalysis.cronRedisHour()
        .then(() => console.log('[cron] [通行管理-人车通行-人员入园分析 / 人员出园分析 / 车辆入园分析 / 车辆出园分析] 更新redis缓存 成功'))
        .catch(e => console.log('[cron] [通行管理-人车通行-人员入园分析 / 人员出园分析 / 车辆入园分析 / 车辆出园分析] 人员入园分析/人员出园分析/车辆入园分析/车辆出园分析redis缓存出错', e.message));

    // 通行管理-黑白名单-车辆黑白名单统计 已改名为 车辆黑名单统计 redis缓存
    carBlackCount.cronRedisHour()
        .then(() => console.log('[cron] [通行管理-黑白名单-车辆黑白名单统计] 更新redis缓存 成功'))
        .catch(e => console.log('[cron] [通行管理-黑白名单-车辆黑白名单统计] 车辆黑白名单统计redis缓存出错', e.message));

    // 园区态势-智能设备概况 redis缓存
    situation.cronRedisHour()
        .then(() => console.log('[cron] [园区态势-智能设备概况] 更新redis缓存 成功'))
        .catch(e => console.log('[cron] [园区态势-智能设备概况] 智能设备概况redis缓存出错', e.message));

    // 智慧生活-智能家居设备检测 redis缓存
    smartDeviceTest.cronRedisHour()
        .then(() => console.log('[cron] [智慧生活-智能家居设备检测] 更新redis缓存 成功'))
        .catch(e => console.log('[cron] [智慧生活-智能家居设备检测] 智能家居设备检测redis缓存出错', e.message));

    // 智慧生活-智能家居设备统计分析
    smartDeviceAnalysis.cronRedisHour()
        .then(() => console.log('[cron] [智慧生活-智能家居设备统计分析] 更新redis缓存 成功'))
        .catch(e => console.log('[cron] [智慧生活-智能家居设备统计分析] 智能家居设备统计分析redis缓存出错', e.message));

    // 智慧服务-智慧生活-超市收益分析 redis缓存
    supermarketRevenueAnalysis.cronRedisDay()
        .then(() => console.log('[cron] [初始化] 超市收益情况更新 成功'))
        .catch(e => console.log( '[cron] [初始化] 超市收益情况更新 数据库为内网数据库 出错会导致无法查询收益情况 本地运行报错不用处理 服务器报错需要处理 出错原因', e.message));

    // App 车辆管理 redis缓存
    vehicleApp.cronRedisHour()
        .then(() => console.log('[cron] [App 车辆管理] 更新redis缓存 成功'))
        .catch(e => console.log('[cron] [App 车辆管理] App 车辆管理 redis缓存出错', e.message));

    // App 人员管理 redis缓存
    personApp.cronRedisHour()
        .then(() => console.log('[cron] [App 人员管理] 更新redis缓存 成功'))
        .catch(e => console.log('[cron] [App 人员管理] App 人员管理 redis缓存出错', e.message));

    // ue4 监控 测速仪
    // hk.cronRedisHour()
    //     .then(() => console.log('[cron] ue4 监控 测速仪 redis 缓存 成功'))
    //     .catch(e => console.log( '[cron] ue4 监控 测速仪 redis 缓存 异常 出错原因', e.message));

};

inter.getOutDoorDataList = async () => {
    // 室外配送-获取基础数据
    // 获取服务片区列表
    const serviceList = await setOutdoorRobotServiceArea();
    // 获取站点列表
    const siteList = await setOutdoorRobotSiteList(serviceList);
    // 获取停靠点列表
    await setOutdoorRobotDockList(siteList);
    // 获取配送车列表
    await setOutdoorRobotDeliveryCarList();

    // 获取车辆格口列表
    await setOutdoorRobotCarportList();
};


module.exports = outer;