
function ajax(obj){
    var method = obj.method.toUpperCase(),
        url = obj.url,
        data = obj.data,
        success = obj.success || function(){},
        isAsync = obj.isAsync;
    
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            success(JSON.parse(xhr.responseText))
        }
    }
    
    var datastr = '';
    if(typeof data == 'object'){
        for(var prop in data){
            if(data.hasOwnProperty(prop)){
                datastr = prop + '=' + data[prop] + '&';            }
        }
    }else{
        datastr = data.toString();
    }

    if(method === 'GET'){
        xhr.open(method, url + '?' + datastr, isAsync);
        xhr.send()
    }else{
        xhr.open(method, url, isAsync);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(datastr)
    }
}