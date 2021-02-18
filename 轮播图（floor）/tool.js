//圣杯模式
function inherit(target,origin){
    function F(){};
    F.prototype = origin.prototype;
    origin.prototype = new F();
    target.prototype.constructor = target.prototype;
    target.prototype.uber = origin.prototype;
}
//深度克隆
function deepClone(target,origin){
    var target = target || {};
    var str = Object.prototype.toString,
        arr = "[object Array]";
    for(var prop in origin){
        if(origin.hasOwnProperty(origin[prop])){
            if(origin[prop] != 'null' && typeof origin[prop] == 'object'){
                if(str.call(origin[prop] == arr)){
                    target[prop] = [];
                }else{
                    target[prop] = {};
                }
                deepClone(target[prop],origin[prop]);
            }else{
            target[prop] = origin[prop];
            }
        }
    }
    return target;
}

//type 类型判断
function type(target){
    var template = {
        '[object Array]' : 'array',
        '[object Object]' : 'object',
        '[object String]' : 'string - object',
        '[object Nember]' : 'number - object',
        '[object Boolean]' : 'boolean - object'

    };
    if(target == null){
        return 'null';
    }else if(typeof(target) == 'object'){
        return template[Object.prototype.call(target)];
    }else{
        return typeof(target);
    }
}

//查看滚动条距离
function getScrollOffset(){
    if(window.pageXOffset){
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        }
    }else{
        return {
            x: document.documentElement.scrollLeft + document.body.scrollLeft,
            y: document.documentElement.scrollTop + document.body.scrollTop
        }
    }
}

//查看大屏幕尺寸
function getViewprotOffset(){
    if(window.innerWidth){
        return {
            Width: window.innerWidth,
            Height: window.innerHeight
        }
    }
    if(window.compatMode == 'CSS1Compat'){
        return {
            Width: document.documentElement.clientWidth,
            Height: document.documentElement.clientHeight
        }
    }else if(window.compatMode == 'BackCompat'){
        return {
            Width: document.body.clientWidth,
            Height: document.body.clientHeight
        }
    }
}

//获取dom样式
function getStyle(elem, style){
    if(window.getComputedStyle){
        return window.getComputedStyle(elem, null)[style];
    }else{
        return elem.currentStyle[style];
    }
}

//绑定事件
function addEvent(elem, type, handle){
    if(elem.addEventListener){
        elem.addEventListener(type, handle, false);
    }else if(elem.attachEvent){
        elem.attach(type,function(){
            handle.call(this);
        })
    }else{
        elem['on' + type] = handle;
    }
}

//解绑事件
function removeEvent(elem, type, handle){
    if(elem.removeEventListener){
        elem.removeEventListener(type, handle, false);
    }else if(elem.datachEvent){
        elem.datachEvent('on' + type, handle)
    }else{
        elem['on' + type] = false;
    }
}

//取消冒泡
function stopBubble(e){
    var event = e || window.event;
    if(e.stopProgation){
        e.stopProgation();
    }else{
        e.cancelBubble();
    }
}

//拖拽函数
function drag(elem){
    elem.onmousedown = function(e){
        var event = e || window.event,
            elemX = event.offsetX,
            elemY = event.offsetY;
            document.onmousemove = function(e){
                var event = e || window.event;
                elem.style.top = e.clientY - elemY + 'px';
                elem.style.left = e.clientX - elemX + 'px';
            } 
    }
    document.onmouseup = function(e){
        var event = e || window.event;
        document.onmousemove = false;
    }
}

//多物体多值链式变动框架
function move(obj, data, func){
    clearInterval(obj.timer);
    var iSpeed,iCur,name;
    obj.timer = setInterval(function(){
        var bStop = true;
        for(var attr in data){
            if(attr === 'opacity'){
                name = attr;
                iCur = parseFloat(getStyle(obj, attr)) * 100;
            }else{
                iCur = parseInt(getStyle(obj, attr));
            }

            iSpeed = (data[attr] - iCur) / 8;
            if(iSpeed > 0){
                iSpeed = Math.ceil(iSpeed);
            }else{
                iSpeed = Math.floor(iSpeed);
            }

            if(attr === 'opacity'){
                obj.style.opacity = (iCur + iSpeed) / 100;
            }else{
                obj.style[attr] = iCur + iSpeed + 'px';
            }

            if(Math.floor(Math.abs(data[attr] - iCur)) != 0){
                bStop = false;
            }
        }

        if(bStop){
            clearInterval(obj.timer);
            if(name === 'opacity'){
                obj.style.opacity = data[name] / 100; 
            }
            func();
        }
    }, 30)
}
//弹性运动
function startMove(dom, target){
    var iSpeed = 0,
        a = 0,
        u = 0;
        dom.timer = setInterval(() => {
            a = (target - dom.offsetLeft) / 5;
            iSpeed = 0.8 * (iSpeed + a);
            if(Math.abs(iSpeed) < 1 && dom.offsetLeft === target){
                dom.style.left = target + 'px';
                clearInterval(dom.timer);
            }
            dom.style.left = dom.offsetLeft + iSpeed + 'px';
        }, 30);
}