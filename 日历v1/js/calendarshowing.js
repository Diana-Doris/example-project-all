//获取实时时间
moment.locale('zh-cn');
setInterval(function(){
    $('.time1').html(moment().format('LTS'))
}, 1000);

//获取实时日期
var dateLunar = window.calendar.solar2lunar(moment().year(),moment().month() + 1,moment().date());
$('.time2').html(moment().format('LL') + '  农历' + dateLunar.IMonthCn + dateLunar.IDayCn)

//获取表格头星期数
var weekNum = moment.weekdaysMin(true);
var str = '';
function getWeekNum(date){
    weekNum.forEach(ele => {
        str += `<span>${ele}</span>`
    });
    $('.week').html(str);
}
getWeekNum()

//获取某月天数
function getMonthDays(date){
    return date.daysInMonth();
}
//获取某月初是星期几
function getMonthWeeks(date){
    return date.startOf('M').weekday()
}

//创建日历
var now = moment();
function setDate(date){
    var lastDay = getMonthDays(date.clone().subtract(1, 'M'));
    var nowDay = getMonthDays(date);
    var weekDay = getMonthWeeks(date.clone());
    var nextDay = 0;
    var str = '';

    console.log(lastDay,nowDay, weekDay);
    $('.time3').html(date.format('YYYY年MM月'))
    for(var i = 0; i < 42; i ++){
        if(i < weekDay){
            str = `<li class="color"><span>${lastDay}</span><span>${tranformDate(date.year(), date.month(), lastDay)}</span></li>` + str;
            lastDay --;        
        }else if(i >= weekDay + nowDay){
            nextDay ++;
            str += `<li class="color"><span>${nextDay}</span><span>${tranformDate(date.year(), date.month() + 2, nextDay)}</span></li>`;
        }else{
            var active = date.date() == i - weekDay + 1 ? 'active' : '';
            console.log(date.date())
            if(date.year() != moment().year() || date.month() != moment().month()){
                active = '';            
            }

            str += `<li class="${active}"><span>${i - weekDay + 1}</span><span>${tranformDate(date.year(), date.month() + 1, i - weekDay + 1)}</span></li>`
            console.log(active)
        }
        $('.date').html(str);
    }
}
setDate(now);
$('.up').click(function(){
    setDate(now.subtract(1, 'M'));
})
$('.down').click(function(){
    setDate(now.add(1, 'M'));
})

//转成农历
function tranformDate(Y, M, D){
    var dateLunar = calendar.solar2lunar(Y, M, D);
    console.log(dateLunar)
    var result = '';
    if(dateLunar.IDayCn == '初一'){
        result = dateLunar.IMonthCn;
    }else if(dateLunar.Term){
        result = dateLunar.Term;
    }else if(dateLunar.festival){
        result = dateLunar.festival;
    }else if(dateLunar.lunarFestival){
        result = dateLunar.lunarFestival;
    }else{
        result = dateLunar.IDayCn
    }
    return result;
}