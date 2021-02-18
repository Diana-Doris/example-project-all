function ajax(url, success){
    var xml = null;
    if(window.XMLHttpRequest){
        xml = new XMLHttpRequest();
    }else{
        xml =new ActiveXObject("Microsoft.XMLHttp");
    }

    xml.open("get", url, false);

    xml.onreadystatechange = function(){
        if(xml.readyState == 4 & xml.status == 200){
            var data = JSON.parse(xml.responseText);
            // console.log(data)
            success && success(data);
        }
    }
    xml.send();
}
