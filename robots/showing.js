var searchinp = document.getElementById('search');
var sendbtn = document.getElementById('sendbtn');
sendbtn.onclick = function(){
    renderDom('mine', searchinp.value)
    if(searchinp.value){
        ajax({
            method:'get',
            url:'https://developer.duyiedu.com/edu/turing/chat',
            data: {
                text: searchinp.value
            },
            isAsync:true,
            success: function(data){
                renderDom('others', data.text)
            }
        })
    }
    searchinp.value = '';
}
searchinp.onkeydown = function(e){
    if(e.keyCode === 13){
        sendbtn.click()
    }
}
//渲染dom
function renderDom(who, data){
    var odom = document.createElement('div');
    odom.className = 'clearfix';
    odom.classList.add(who);

    var content = document.querySelector('.content');
    if(who === 'mine'){
        odom.innerHTML = '<img class="right" src="./img/3.png" alt="自己头像">';
    }else{
        odom.innerHTML = '<img class="left" src="./img/dog1.jpg" alt="聊天者头像">'
    }

    var textdiv = document.createElement('div');
    textdiv.className = 'text';
    textdiv.innerText = data;
    odom.appendChild(textdiv);

    content.appendChild(odom)
    content.scrollTop = content.scrollHeight;
}