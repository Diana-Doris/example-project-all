//圣杯模式
function inherit(target, origin) {
  function F() {}
  F.prototype = origin.prototype;
  origin.prototype = new F();
  target.prototype.constructor = target.prototype;
  target.prototype.uber = origin.prototype;
}

//深度克隆
function deepClone(target, origin) {
  var target = target || {};
  var str = Object.prototype.toString,
    arr = '[object Array]';
  for (var prop in origin) {
    if (origin.hasOwnProperty(origin[prop])) {
      if (origin[prop] != 'null' && typeof origin[prop] == 'object') {
        if (str.call(origin[prop] == arr)) {
          target[prop] = [];
        } else {
          target[prop] = {};
        }
        deepClone(target[prop], origin[prop]);
      } else {
        target[prop] = origin[prop];
      }
    }
  }
  return target;
}

//type 类型判断
function type(target) {
  var template = {
    '[object Array]': 'array',
    '[object Object]': 'object',
    '[object String]': 'string - object',
    '[object Nember]': 'number - object',
    '[object Boolean]': 'boolean - object',
  };
  if (target == null) {
    return 'null';
  } else if (typeof target == 'object') {
    return template[Object.prototype.call(target)];
  } else {
    return typeof target;
  }
}

//查看滚动条距离
function getScrollOffset() {
  if (window.pageXOffset) {
    return {
      x: window.pageXOffset,
      y: window.pageYOffset,
    };
  } else {
    return {
      x: document.documentElement.scrollLeft + document.body.scrollLeft,
      y: document.documentElement.scrollTop + document.body.scrollTop,
    };
  }
}

//查看大屏幕尺寸
function getViewprotOffset() {
  if (window.innerWidth) {
    return {
      Width: window.innerWidth,
      Height: window.innerHeight,
    };
  }
  if (window.compatMode == 'CSS1Compat') {
    return {
      Width: document.documentElement.clientWidth,
      Height: document.documentElement.clientHeight,
    };
  } else if (window.compatMode == 'BackCompat') {
    return {
      Width: document.body.clientWidth,
      Height: document.body.clientHeight,
    };
  }
}

//获取dom样式
function getStyle(elem, style) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(elem, null)[style];
  } else {
    return elem.currentStyle[style];
  }
}

//绑定事件
function addEvent(elem, type, handle) {
  if (elem.addEventListener) {
    elem.addEventListener(type, handle, false);
  } else if (elem.attachEvent) {
    elem.attach(type, function () {
      handle.call(this);
    });
  } else {
    elem['on' + type] = handle;
  }
}

//解绑事件
function removeEvent(elem, type, handle) {
  if (elem.removeEventListener) {
    elem.removeEventListener(type, handle, false);
  } else if (elem.datachEvent) {
    elem.datachEvent('on' + type, handle);
  } else {
    elem['on' + type] = false;
  }
}

//取消冒泡
function stopBubble(e) {
  var event = e || window.event;
  if (e.stopProgation) {
    e.stopProgation();
  } else {
    e.cancelBubble();
  }
}

//拖拽函数
function drag(elem) {
  elem.onmousedown = function (e) {
    var event = e || window.event,
      elemX = event.offsetX,
      elemY = event.offsetY;
    document.onmousemove = function (e) {
      var event = e || window.event;
      elem.style.top = e.clientY - elemY + 'px';
      elem.style.left = e.clientX - elemX + 'px';
    };
  };
  document.onmouseup = function (e) {
    var event = e || window.event;
    document.onmousemove = false;
  };
}

//多物体多值链式变动框架
function move(obj, data, func) {
  clearInterval(obj.timer);
  var iSpeed, iCur, name;
  obj.timer = setInterval(function () {
    var bStop = true;
    for (var attr in data) {
      if (attr === 'opacity') {
        name = attr;
        iCur = parseFloat(getStyle(obj, attr)) * 100;
      } else {
        iCur = parseInt(getStyle(obj, attr));
      }

      iSpeed = (data[attr] - iCur) / 8;
      if (iSpeed > 0) {
        iSpeed = Math.ceil(iSpeed);
      } else {
        iSpeed = Math.floor(iSpeed);
      }

      if (attr === 'opacity') {
        obj.style.opacity = (iCur + iSpeed) / 100;
      } else {
        obj.style[attr] = iCur + iSpeed + 'px';
      }

      if (Math.floor(Math.abs(data[attr] - iCur)) != 0) {
        bStop = false;
      }
    }

    if (bStop) {
      clearInterval(obj.timer);
      if (name === 'opacity') {
        obj.style.opacity = data[name] / 100;
      }
      func();
    }
  }, 30);
}

//弹性运动
function startMove(dom, target) {
  var iSpeed = 0,
    a = 0,
    u = 0;
  dom.timer = setInterval(() => {
    a = (target - dom.offsetLeft) / 5;
    iSpeed = 0.8 * (iSpeed + a);
    if (Math.abs(iSpeed) < 1 && dom.offsetLeft === target) {
      dom.style.left = target + 'px';
      clearInterval(dom.timer);
    }
    dom.style.left = dom.offsetLeft + iSpeed + 'px';
  }, 30);
}

//cookie操作(设置，删除，获取)
var manageCookie = {
  //设置cookie
  set: function (name, value, date) {
    //expires	date：要求用户传入的是一个时间节点（这里函数默认规定传进来的是天数）
    /* var endDate = new Date();	//过期时间点
        endDate.setDate(endDate.getDate() + date);
        document.cookie = name + '=' + value + '; expires=' + endDate; */

    document.cookie = name + '=' + value + '; max-age=' + date; //这里要求用户传入的第三个参数为过期的秒数
  },
  //移除cookie
  remove: function (name) {
    this.set(name, '', 0); //只需要把时间设置成0就可以了
  },
  //获取cookie
  get: function (name) {
    var cookies = document.cookie.split('; '); //'name=kaivon; padding=30; width=40;' => ['name=kaivon', 'padding=30', 'width=40']

    for (var i = 0; i < cookies.length; i++) {
      //[['name','kaivon'],['padding','30'],['width',40]]
      var item = cookies[i].split('='); //['name','kaivon']

      if (item[0] == name) {
        //这个条件成立说明用户传进来的那个cookie的名字找到了
        return item[1];
      }
    }
  },
};

//ajax   获取到的是对象  如果存储时候需要用json.stringify(data)
function ajax(url, success) {
  var xhr = null;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject('Microsoft.XMLHttp');
  }
  xhr.open('get', url, false);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var data = JSON.parse(xhr.responseText);
      // console.log(data)
      success && success(data);
    }
  };
  xhr.send();
}

// 封装ajax
function ajax(options) {
  // var xhr = new XMLHttpRequest();
  var xhr = null;
  var url = options.url;
  var data = options.data;
  var dataStr = '';
  var success = options.success || function () {};
  var isAsync = options.isAsync;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
  } else {
    return alert('当前浏览器不支持的XMLHTTPRequest');
  }

  // 判断传递过来的数据是否是对象类型的  如果是对象类型的转换成字符串  key=value&key1=value1
  if (typeof data === 'object') {
    for (var prop in data) {
      if (data.hasOwnProperty(prop)) {
        dataStr += prop + '=' + data[prop] + '&';
      }
    }
  } else {
    dataStr = data.toString();
  }

  xhr.onreadystatechange = function () {
    // console.log(xhr.readyState)
    if (xhr.readyState === 4) {
      // xhr.status
      if (xhr.status === 200) {
        success(JSON.parse(xhr.responseText));
      }
    }
  };
  // 将请求方式全部转换成大写
  var method = options.method.toUpperCase();
  // 判断请求方式为get类型   GET类型的特点：数据拼接在地址当中
  if (method === 'GET') {
    // 建立连接
    xhr.open(method, url + '?' + dataStr, isAsync);
    // 发送数据
    xhr.send();
  } else {
    // 请求方式为非get请求的   那么需要单独传递请求参数（数据） 就需要告诉对方你的数据编码方式（通过请求头设置）
    xhr.open(method, url, isAsync);
    // key=value&key1=value1&key2=value2.....   ContentType 代表的是编码方式
    //     "{key: value, key1: value1}"             application/json
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(dataStr);
  }
}

// 计算盒子的四个边，从哪边进来的
function getDir(ev, box) {
  /*
        getBoundingClientRect() 返回盒模型的信息
            {
                width:,
                height:,
                left:,
                top:,
                right:,
                bottom:,
            } 
     */
  var l = box.getBoundingClientRect().left;
  var t = box.getBoundingClientRect().top;

  var w = box.offsetWidth;
  var h = box.offsetHeight;

  var x = ev.clientX - l - w / 2;
  var y = ev.clientY - t - h / 2;

  var deg = Math.atan2(y, x) / (Math.PI / 180);

  var d = (Math.round((deg + 180) / 90) + 3) % 4;

  return d; //0 top,1 right,2 bottom,3 left
}
