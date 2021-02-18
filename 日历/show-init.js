//初始化
var $NowTime = document.getElementById('nowTime'),
    $NextTime = document.getElementById('nextTime'),
    oDate  = new Date(),
    oNowMonth = oDate.getMonth() + 1,
    oNowDay = oDate.getDate();

function init(){
    var oDate = new Date();
    var dateDate = {};
    dateDate.oDateObj = oDate;
    dateDate.year = oDate.getFullYear();
    dateDate.month = oDate.getMonth() + 1;

    //生成左侧日历
    showDate($NowTime, dateDate);

    //生成右侧日历
    if(dateDate.month === 12){
        dateDate.year += 1;
        dateDate.month = 1;
        showDate($NextTime, dateDate);
    }else{
        dateDate.month += 1;
        showDate($NextTime, dateDate);
    }

    
}
init();