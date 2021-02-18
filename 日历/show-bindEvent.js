//blindEvent函数
function bindEvent(){
    var oSpanLeft = document.getElementById('left'),
        oSpanRight = document.getElementById('right');
    
    if(!!oSpanLeft && !oSpanLeft.flag){
        oSpanLeft.flag = true;
        oSpanLeft.onclick = turnPage;
    }else if(!!oSpanRight && !oSpanRight.flag){
        oSpanRight.flag = true;
        oSpanRight.onclick = turnPage;
    }
}