var Oul = document.getElementsByClassName('Oul')[0];
var data = [
    {
        imgdata: './img/q1.jpg',
        title:'陈佳欣很漂亮',
        des:'#于正编辑记录# #于正#发文质疑TFBOYS黑色羽毛造型抄袭，并且对微博进行再次编辑，表示“看来这个网络世界还是流量为王啊”，还趁机宣传了一波女艺人，'
    },
    {
        imgdata: './img/q2.jpg',
        title:'陈佳欣太帅了',
        des:'#于正编辑记录# #于正#发文质疑TFBOYS黑色羽毛造型抄袭，并且对微博进行再次编辑，表示“看来这个网络世界还是流量为王啊”，还趁机宣传了一波女艺人，'
    },
    {
        imgdata: './img/q3.jpg',
        title:'陈佳欣太好了',
        des:'#于正编辑记录# #于正#发文质疑TFBOYS黑色羽毛造型抄袭，并且对微博进行再次编辑，表示“看来这个网络世界还是流量为王啊”，还趁机宣传了一波女艺人，'
    },
    {
        imgdata: './img/q4.jpg',
        title:'陈佳欣哇喔~~',
        des:'#于正编辑记录# #于正#发文质疑TFBOYS黑色羽毛造型抄袭，并且对微博进行再次编辑，表示“看来这个网络世界还是流量为王啊”，还趁机宣传了一波女艺人，'
    },
    {
        imgdata: './img/q5.jpg',
        title:'陈佳欣玩世不恭',
        des:'#于正编辑记录# #于正#发文质疑TFBOYS黑色羽毛造型抄袭，并且对微博进行再次编辑，表示“看来这个网络世界还是流量为王啊”，还趁机宣传了一波女艺人，'
    }
];

function li(personArr){
    var str = '';
    personArr.forEach(ele => {
        str += '<li class="web_list">\
        <div class="pic">\
            <a href="#"><img src=' + ele.imgdata + ' alt=""></a>\
        </div>\
\
        <div class="des">\
            <h3 class="des_title">' + ele.title + '</h3>\
            <div class="des_text">' + ele.des + '</div>\
        </div>\
    </li>'
    });
    Oul.innerHTML = str;
}
li(data);