var allData = {};
//获取数据js/shoppingData.json'
ajax('js/shoppingData.json', function (data) {
    console.log(data);
    goodsRender(data);

})
//渲染购物车内容
function goodsRender(data) {
    var str = '';
    data.forEach((ele, index) => {
        var color = '';
        ele.list.forEach(obj => {
            color += `<span data-id="${obj.id}">${obj.color}</span>`
        });

        str += ` <tr>
        <td><img src="./images/${index}-${index + 1}.jpg" alt="图一"></td>
        <td class="deferdog">
            <p>${ele.name}</p>
            <div>${color}</div>
        </td>
        <td class="money">${ele.list[0].price}.00元</td>
        <td class="addnum">
            <span>-</span>
            <strong>0</strong>
            <span>+</span>
        </td>
        <td class="shoppingcart"><button>加入购物车</button></td>
    </tr>`
    });
    // console.log(str);
    var tbody = document.querySelector('#selectedgoods tbody');
    tbody.innerHTML = str;
}
//删除功能
function del(){
    var delbtn  = document.querySelectorAll('#addgoods tbody button');
    var tbody = document.querySelector('#addgoods tbody');
    for(var i = 0; i < delbtn.length; i++){
        delbtn[i].onclick = function(){
            delete allData[this.dataset.id];
            localStorage.setItem('shoppingcart', JSON.stringify(allData));

            tbody.removeChild(this.parentNode.parentNode);

            var totalPrice = document.querySelector('#addgoods thead th strong');
            totalPrice.innerHTML = parseFloat(totalPrice.innerHTML) - parseFloat(this.parentNode.parentNode.children[3].innerHTML) + '.00元';
        }
    }
}
function addgoodsRender(){
    var tbody = document.querySelector('#addgoods tbody');
    var totalPrice = document.querySelector('#addgoods th strong');
    console.log(allData);

    var str = '';
    var total = 0;
    var goods = Object.values(allData);

    goods.sort(function(g1, g2){
        return g2.time - g1.time;
    })
    tbody.innerHTML = '';
    for(var i = 0; i < goods.length; i++){
        console.log(goods[i])
        str += `<tr>
                    <td><img src="${goods[i].img}" alt="图片"></td>
                    <td class="name">${goods[i].name}</td>
                    <td class="name">${goods[i].color}</td>
                    <td class="name">${goods[i].price * goods[i].num}.00元</td>
                    <td>×${goods[i].num}</td>
                    <td><button data-id="${goods[i].id}">删除</button></td>
                </tr>`
        total += goods[i].price * goods[i].num;
    }
    tbody.innerHTML = str;
    totalPrice.innerHTML = total + '.00元';
    //删除功能
    del();
}

//切换
function actions(trs, n) {
    var spans = trs.children[1].querySelectorAll('span');

    var img = trs.children[0].querySelector('img');
    var imgsrc = img.getAttribute('src');
    var last = null;

    var colorValue = '',
        colorId = '';
    for (var i = 0; i < spans.length; i++) {
        spans[i].index = i;
        spans[i].onclick = function () {
            last && last != this && (last.className = '');
            this.className = this.className ? '' : 'active';

            colorValue = this.className ? this.innerHTML : '';
            colorId = this.className ? this.dataset.id : '';

            imgsrc = this.className ? 'images/' + n + '-' + (this.index + 1) + '.jpg' : 'images/' + n + '-1.jpg';
            img.src = imgsrc;          

            last = this;
        }

    }

    //加减号功能
    var spanbtns = trs.children[3].querySelectorAll('span');
    var strong = trs.children[3].querySelector('strong');
    var num = 0;
    // console.log(spanbtns, num)
    spanbtns[0].onclick = function () {
        num--;
        if (num < 0) {
            num = 0;
        }
        strong.innerHTML = num;
    }
    spanbtns[1].onclick = function () {
        num++
        strong.innerHTML = num;
    }

    //加入购物车的功能
    var joinBtn = trs.children[4].querySelector('button');
    joinBtn.onclick = function () {
        if (!colorValue) {
            alert('请选择颜色！');
            return;
        }
        if (!num) {
            alert('请选择数量！');
            return;
        }

        var name = trs.children[1].querySelector('p').innerHTML;
        console.log(name,colorValue)
        var price = parseFloat(trs.children[2].innerHTML);
        allData[colorId] = {
            "id": colorId,
            "name": name,
            "color": colorValue,
            "price": price,
            "num": num,
            "img": imgsrc,
            "time": new Date().getTime(),
        }
        console.log(allData);

        localStorage.setItem('shoppingcart', JSON.stringify(allData));

        //加入购物车后内容还原
        img.src = '/images/' + n + '-' + '1.jpg';
        last.className = '';
        strong.innerHTML = num = 0;   
        //渲染下方的内容
        addgoodsRender()
    }

    
}
//初始化功能
function init(){
    allData = JSON.parse(localStorage.getItem('shoppingcart')) || {}
    addgoodsRender();
}
init();
// 添加功能
function bindEvent() {
    var trs = document.querySelectorAll('#selectedgoods tr');
    for (var i = 0; i < trs.length; i++) {
        //切换图片
        actions(trs[i], i)
    }
}


bindEvent();
window.addEventListener('storage',function(ev){
	console.log('我在04页面修改了购物车，这个log会在05的页面打印出来；或者我在05的页面修改了购物车，这个log会在04的页面打印出来！');

	console.log(ev.key);	//修改的是哪一个localstorage（名字key）
	console.log(ev.newValue);	//修改后的数据
	console.log(ev.oldValue);	//修改前的数据
	console.log(ev.storageArea);	//storage对象
	console.log(ev.url);	//返回操作的那个页面的url

	init();
});