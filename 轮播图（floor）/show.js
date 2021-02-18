var count = 0,
    oPicUl = document.getElementsByTagName('ul')[0],
    moveWidth = oPicUl.children[0].offsetWidth;
var oI = document.getElementsByTagName('i'),
    oIlen = oI.length;

var oBtnLeft = document.getElementsByClassName('btn-left')[0],
    oBtnRight = document.getElementsByClassName('btn-right')[0],
    oBox = document.getElementsByTagName('div')[0];

var boolen = true,
    realPicNum = oPicUl.children.length - 1,
    timer = window.setInterval(autoMove, 3000);

function changeCir(demo){
    for(var i = 0; i < oIlen; i++){
        oI[i].className = '';
    }
    oI[demo].className = 'cir-change';
}

function autoMove(demo){
    if(boolen){
        boolen = false;
        if(demo == 1 || !demo){
            count ++;
            if(count == 6){
                count = 0;
            }
            changeCir(count);
            move(oPicUl, {left: oPicUl.offsetLeft - moveWidth},function(){
                if(count == 0){
                    oPicUl.style.left = '0px';
                }
                boolen = true;
            })
        }else if(demo == -1){
                if(oPicUl.offsetLeft == 0){
                    oPicUl.style.left = -moveWidth * realPicNum + 'px';
                    count = realPicNum;
                }
                count --;
                changeCir(count);
                move(oPicUl, {left: oPicUl.offsetLeft + moveWidth}, function(){
                    boolen = true;
                })
            }            
        
    }
}

oBtnLeft.onclick = function(){
    autoMove(-1);
}
oBtnRight.onclick = function(){
    autoMove(1);
}
oBox.onmouseover = function(){
    clearInterval(timer);
}
oBox.onmouseout = function(){
    timer = window.setInterval(autoMove, 3000)
}

for(var i = 0; i < oIlen; i++){
    oI[i].onclick =(function(){
        return function(){
            count = i;
            changeCir(count);
            move(oPicUl,{left: - moveWidth * i}, function(){
                boolen = true;
            })
        }
    })(i);
}