const nodemailer = require("nodemailer"); //邮件模块
const { default: Axios } = require("axios"); //Axios接口请求模块
const schedule = require("node-schedule"); //定时任务模块
// 发送邮件函数
async function sendMail(content) {
    let count = 0;
    let user = "xxx@qq.com";//自己的邮箱
    let pass = "xxx"; //qq邮箱授权码
    let to = "xxxx";//对方的邮箱
    let transporter = nodemailer.createTransport({
        host: "smtp.qq.com",
        port: 587,
        secure: false,
        auth: {
            user: user, // 用户账号
            pass: pass, //授权码,通过QQ获取
        },
    });
    let info = await transporter.sendMail({
        from: `邮件标题<${user}>`,
        to: `To<${to}>`,
        subject: "邮件副标题",
        text: content
    });
    console.log("发送成功");
}
//每定时任务
const scheduleCronstyle = () => {
    /**
     * 每分钟的第30秒触发： '30 * * * * *'
     * 每小时的1分30秒触发 ：'30 1 * * * *'
     * 每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'
     * 每月的1日1点1分30秒触发 ：'30 1 1 1 * *'
     * 2016年的1月1日1点1分30秒触发 ：'30 1 1 1 2016 *'
     * 每周1的1点1分30秒触发 ：'30 1 1 * * 1'
     */
    schedule.scheduleJob('0-59 * * * * *', () => {
        console.log('scheduleCronstyle:' + new Date());
        const url = 'https://chp.shadiao.app/api.php'
        Axios.get(url).then(res => {
            console.log(res.data)
            sendMail(res.data)
        })
    });
}

scheduleCronstyle()