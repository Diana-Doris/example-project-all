var contentl = document.getElementsByClassName('contentl')[0];
var DivArr = [
    {
        left: '用户名',
        placeholder:'请设置用户名',
        zs:'设置后不可更改<br>中英文均可，最长14个英文或7个汉字'
    },
    {
        left: '手机号',
        placeholder:'用于登录和找回密码',
        zs:'请输入中国大陆手机号，其他用户不可见'
    },
    {
        left: '验证码',
        placeholder:'请输入验证码',
        zs:''
    },
    {
        left: '密码',
        placeholder:'请设置登录密码',
        zs:'<div id="mima">\
                <ul>\
                    <li>长度6到14个字符</li>\
                    <li>支持数字，大小写字母和标点符号</li>\
                    <li>不允许有空格</li>\
                </ul>\
            </div>'
    }
];

for(var i = 0; i < 5; i++){
    var Div = document.createElement('div');
    if(i < 4){
        Div.className = 'shuru';
        Div.innerHTML = '<span>' + DivArr[i].left +'</span>\
                        <div class= "eeq">\
                            <input placeholder="' + DivArr[i].placeholder + '" id="inp'+ i + '">\
                            <div style= "width:0px" class= "zsa"></div>\
                        </div>';
        contentl.appendChild(Div);
    }else{
        Div.innerHTML = '<div id="xieyi">\
                            <input type="checkbox">阅读并接受\
                            <spn>《百度用户协议》</spn>及\
                            <span>《百度隐私保护声明》</span>\
                        </div>';
        contentl.appendChild(Div);
    }
}

var Div = document.createElement('div');
Div.innerHTML = '<a><button>注册</button></a>';
Div.className = 'sumzc';
contentl.appendChild(Div);

//功能
//点击出来的后面弹框
var ZsaArr = document.getElementsByClassName('zsa');
var Name = ['ccc','jjj','xxx'];
for(var i = 0; i < 4; i++){
    var inp = document.getElementById('inp' + i);
    (function(index){
        inp.onfocus = function(){
            ZsaArr[index].innerHTML = DivArr[index].zs;
            ZsaArr[index].style.width = 'auto';
            ZsaArr[index].id = '';
        }
    })(i)
}

//in0 失焦 和 内容变化 ---- 用户名
var inp0 = document.getElementById('inp0');
if(!inp0.value){//不是inp的value 则使得inp0里面的属性失去意义
    inp0.onblur = function(){
        ZsaArr[0].innerHTML = '';
        ZsaArr[0].style.width = '0px';
        ZsaArr[0].id = '';
    }
}
//inp0发生变化的时候
inp0.onchange = function(){
    if(!inp0.value){
        inp0.onblur = function(){
            ZsaArr[0].innerHTML = '';
            ZsaArr[0].style.width = '0px';
            ZsaArr[0].id = '';
        }
    }else if(Name.indexOf(inp0.value) >= 0){
        inp0.onblur = function(){
            ZsaArr[0].id = 'chongfu';
            chongfu.innerHTML = '此用户名太受欢迎，请换一个！'
        }
    }else{
        inp0.onblur = function(){
            ZsaArr[0].id = 'chenggong';
            chenggong.innerHTML = '';
        }
    }
}

//inp1 ---手机号 
var inp1 = document.getElementById('inp1');
if(!inp1.value){
    inp1.onblur = function(){
        ZsaArr[1].innerHTML = '';
        ZsaArr[1].style.width = '0px';
        ZsaArr[1].id = '';
    }
}
inp1.onchange = function(){
    if(!inp1.value){
        inp1.onblur = function(){
            ZsaArr[1].innerHTML = '';
            ZsaArr[1].style.width = '0px';
            ZsaArr[1].id = '';
        }
    }else if(isNaN(inp1.value) || inp1.value < 130000000 || inp1.value > 18999999999){
        inp1.onblur = function(){
            ZsaArr[1].id = 'chongfu1';
            chongfu1.innerHTML = '手机号码格式不正确！'
        }
    }else{
        inp1.onblur = function(){
            ZsaArr[1].id = "chengong1";
            chengong1.innerHTML = '';
        }
    }
}
//inp1内容发生改变
var inp3 = document.getElementById('inp3');
if(!inp3.value){
    inp3.onblur = function(){
        ZsaArr[3].innerHTML = '';
        ZsaArr[3].style.width = '0px';
        ZsaArr.id = '';
    }
}
//inp2 --- 验证码

//inp3 --- 密码 
var inp3 = document.getElementById('inp3');
inp3.setAttribute('type',"password");


