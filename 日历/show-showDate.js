//函数isLeapYear 判断是否为平年
function isLeapYear(month){
    if(month % 4 === 0 && month % 100 !== 0){
        return true;
    }else{
        if(month % 400 === 0){
            return true;
        }else{
            return false; 
        }
    }
}
//创建日期函数
//                     空几个格 一个月的天数 oTd包含所有歌
function createDay(oTd, index, datNum, nowMonth){
    for(var i = 0; i < datNum; i++){
        oTd[i + index].innerHTML = i + 1;

        if((i + 1) === oNowDay && nowMonth === oNowMonth){
            oTd[i + index].className = 'red';
            
        }else if((i + 1) > oNowDay && nowMonth === oNowMonth){
            oTd[i + index].className = 'blue';
        }
    }
}

//生成数据数据函数
function showDate(dom, oDate){
    var $Title = document.createElement('div');
    $Title.className = 'title';
    var strDate = '';
    if( dom.className === 'nowTime'){
        //生成左侧区域
        //oDate.month 实时的月份 如果是1月份 那么左侧区域左上角为12月份
        strDate = '<div id="left"  class="left">\
                        <span>' + ( (oDate.month - 1) === 0 ? 12 : oDate.month - 1 ) + '</span>月\
                    </div>\
                    <div class="c">\
                        <span>' + oDate.year + '</span>年\
                        <span>' + oDate.month + '</span>月\
                    </div>' 
    }else{
        //生成右侧区域
        //oDate.month 实时的月份加一 如果是12月份 那么右侧区域右上角为1月份
        strDate ='<div id="right" class="right">\
                    <span>'+ ( (oDate.month + 1) === 13 ? 1 : oDate.month + 1 ) + '</span>月\
                </div>\
                <div class="c">\
                    <span>' + oDate.year + '</span>年\
                    <span>'+ oDate.month + '</span>月\
                </div>';
    }
    $Title.innerHTML = strDate;
    dom.appendChild($Title);
    // console.log(strDate);

    //绑定点击事件
    bindEvent();

    var $Table = document.createElement('table'),
        $Thead = document.createElement('thead'),
        $Tr = document.createElement('tr'),
        arrWeek = ['周一', '周二', '周三', '周四', '周五', '周六', '周天']; 

    for(var i = 0; i < 7; i++){
        var $Th = document.createElement('th');
        $Th.innerHTML = arrWeek[i];
        if(i === 5 || i === 6){
            $Th.className = 'red';
        }
        $Tr.appendChild($Th);
    }
    $Thead.appendChild($Tr);
    $Table.appendChild($Thead);

    //生成tbody
    var $Tbody = document.createElement('tbody');
    for(var i = 0; i < 6; i++){
        var $Tr = document.createElement('tr');
        for(var j = 0; j < 7; j++){
            var $Td = document.createElement('td');
            $Tr.appendChild($Td);
        }
        $Tbody.appendChild($Tr)
    }
    $Table.appendChild($Tbody);
    dom.appendChild($Table);

    var dayNum;//判断一个月多少天
    if(oDate.month === 1 || oDate.month === 3 || oDate.month === 5 || oDate.month ||7 || oDate.month === 8 || oDate.month === 10 || oDate.month === 12){
        dayNum = 31;
    }else if(oDate.month === 4 || oDate.month === 6 || oDate.month === 9 || oDate.month === 11){
        dayNum = 30;
    }else if(oDate.month === 2 && isLeapYear(oDate.month)){
        dayNum = 29;
    }else{
        dayNum = 28;
    }

    var $TdCollection = dom.getElementsByTagName('td');
    var nowMonth = oDate.month;
    oDate.oDateObj.setFullYear(oDate.year);
    oDate.oDateObj.setMonth(oDate.month - 1);
    oDate.oDateObj.setDate(1);

    switch (oDate.oDateObj.getDay() ) {   //获取当前月份第一天是星期几  前面空几个格
        case 0:
                createDay($TdCollection, 6, dayNum, nowMonth);
            break;
        case 1:
                createDay($TdCollection, 0, dayNum, nowMonth);
            break;
        case 2:
                createDay($TdCollection, 1, dayNum, nowMonth);
            break;
        case 3:
                createDay($TdCollection, 2, dayNum, nowMonth);
            break;
        case 4:
                createDay($TdCollection, 3, dayNum, nowMonth);
            break;
        case 5:
                createDay($TdCollection, 4, dayNum, nowMonth);
            break;
        case 6:
                createDay($TdCollection, 5, dayNum, nowMonth);
            break;
    } 
}