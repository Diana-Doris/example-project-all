
/**
 * @description: 数据交互
 * @param {Object}  optains{
                        method:get\post
                        url:
                        data:
                        success:函数
                        isAnsy: 是否异步  true\false
                    }
 * @return {func()}  success(data)
 */
function Ajax(options){
    var method = options.method,
        url = options.url,
        data = options.data,
        success = options.success,
        isAnsy = options.isAnsy;

    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHttp');
    }

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){         
            success(JSON.parse(xhr.responseText));
        }
    }
    
    method = method.toUpperCase();
    var datastr = '';
    if(typeof data === 'object'){
        for(var prop in data){
            if(data.hasOwnProperty(prop)){
                datastr += prop + '=' + data[prop] + '&';
            }
        }
    }else{
        datastr = data.toString();
    }
    
    if(method === 'GET'){
        xhr.open(method, url + '?' + datastr, isAnsy);
        xhr.send();
    }else{
        xhr.open(method, url, isAnsy);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(datastr)
    }

}
