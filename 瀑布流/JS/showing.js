// 获得最短li的高度和索引值
function getMinLi(lis){
    var minindex = 0;
    var minheight = lis[0].offsetHeight;

    for(var i =0; i < lis.length; i++){
        if(lis[i].offsetHeight < minheight){
            minheight = lis[i].offsetHeight;
            minindex = i;
        }
    }
    return {
        mindex: minindex,
        minheight: minheight
    }
}
// //创建图片构建
function createPic(data){
    var odiv = document.createElement('div');
    var img = new Image();
    img.src = data.img;
    img.height = imgwidth * data.height / data.width;
    odiv.appendChild(img)
    return odiv;
}
// //渲染页面
var oli = document.getElementsByTagName('li');
var imgwidth = oli[0].offsetWidth - 40;//li的宽度
// var imgwidth = 
function renderPage(data){
    data.forEach(function(ele){
        var odiv = createPic(ele);
        var index = getMinLi(oli).mindex;
        oli[index].appendChild(odiv)
    })
}
//获取数据
function getData(){
    Ajax({
        method: 'get',
        url: '../JS/data.json',
        data: '',
        isAnsy: true,
        success: function(data){
            console.log(data);
            renderPage(data)
            
        }
    })
}
getData()

//创建加载动画
function createloading(){
    var odiv = document.createElement('div');
    // odiv.style.margin = 
    
    for(var i = 0; i < 4; i++){
        var span = document.createElement('span');
        odiv.appendChild(span);
    }
    return odiv;
    
}
//懒加载
var time = null;
window.onscroll = function (){
    var scrollYheight = window.scrollY;//鼠标滑动距离
    var liMInheight = getMinLi(oli).minheight;
    var screenHeight = window.innerHeight;
    // console.log(scrollYheight, liMInheight, screenHeight)
    clearTimeout(time);
    if(scrollYheight + screenHeight > liMInheight){
        time = setTimeout(() => {
            // alert('正在加载... ...')
            console.log(createloading());

            getData();
        }, 1000);
    }
}

