function turnPage(event){
    var oNowSpan = document.getElementsByClassName('title')[0].getElementsByTagName('span'),
        oNextSpan = document.getElementsByClassName('title')[1].getElementsByTagName('span'),
        oDate = new Date();
        dateDate = {},
        dateDate.oDateObj = oDate;

        $NowTime.innerHTML = '';
        $NextTime.innerHTML = '';

        //判断日历
        //左侧日历
        if(event.target.className === 'left'){
            var Month = parseInt(oNowSpan[0].innerHTML);
            var Year = parseInt(oNowSpan[1].innerHTML);
            dateDate.month = Month;

            if(Month === 12){
                dateDate.year = Year - 1;
                dateDate.month = Month;
                showDate($NowTime, dateDate);

                dateDate.year = Year;
                dateDate.month = Mont1h;
                showDate($NextTime, dateDate);
            }else{
                dateDate.year = Year;
                dateDate.month = Month;
                showDate($NowTime, dateDate);

                dateDate.year = Year;
                dateDate.month = Month + 1;
                showDate($NextTime, dateDate);
            }
            //右侧日历
        }else{
            var Month = parseInt(oNextSpan[0].innerHTML);
            var Year = parseInt(oNextSpan[1].innerHTML);
            dateDate.month = Month;
            if(Month === 1){
                dateDate.year = Year;
                dateDate.month = 12;
                showDate($NowTime, dateDate);

                dateDate.year = Year + 1;
                dateDate.month = Month;
                showDate($NextTime, dateDate);
            }else{
                dateDate.year = Year;
                dateDate.month = Month - 1;
                showDate($NowTime, dateDate);

                dateDate.month = Month;
                showDate($NextTime, dateDate);
            }
        }
}