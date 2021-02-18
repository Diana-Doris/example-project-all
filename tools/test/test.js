ajax({
  url: 'https://open.duyiedu.com./api/meituan/header/search.json',
  method: 'get',
  data: {
    appkey: 'Diana_1602512479606',
  },
  success(res) {
    console.log(res);
  },
  isAsync: false,
});
function ajax(options) {
  let xhr = null;
  let { url, method, data, success, isAsync } = options;

  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
  } else {
    alert('当前浏览器不支持 XMLHTTPRequest');
  }

  let dataStr = '';
  if (typeof data) {
    for (let prop in data) {
      if (data.hasOwnProperty(prop)) {
        dataStr += prop + '=' + data[prop] + '&';
      }
    }
  } else {
    dataStr = data.toString();
  }
  // console.log(xhr);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        success(JSON.parse(xhr.responseText));
      }
    }
  };

  method = method.toUpperCase();
  if (method === 'GET') {
    xhr.open(method, url + '?' + dataStr, isAsync);
    xhr.send();
  } else if (method === 'POST') {
    xhr.open(method, url, isAsync);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(dataStr);
  }
}
