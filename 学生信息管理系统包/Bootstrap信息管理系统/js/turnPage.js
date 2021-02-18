/*
 * @Author: your name
 * @Date: 2020-11-14 22:41:17
 * @LastEditTime: 2020-11-15 18:10:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fu学生管理系统jquery\js\turnPage.js
 */
/* 
在jq上面进行扩展，步骤如下：
    1. 存储信息（信息比较多，最好存在对象当中，对象的创建一种方式是：通过变量声明；另一种方式是通过构造函数进行创建；
    我们传进去的信息是固定的，所以通过构造函数去创建 turnPage(options) )
    2. 创建结构，初始化，在原型链上写(如果你写在构造函数当中的话，是可以的，但是会有很多内容重复的空间，在京东首屏轮播图插件的时候有提到。我们用到的时候就到原型链上找就可以)
    在原型链上创建翻页的结构函数，
    组件和插件的区别：区别不是特别的大，
        组件：在页面当中，它是一个独立的区域，和别的地方没有必然的联系，这样的一个独立的功能就可以称为组件；
        插件：外挂；是可以独立的拿出来的，组件是在一个页面当中，是页面的一部分，插件是可以单独出来的一部分（可以单独在一个页面显示，）；  
        组件使用直接用一个标签就可以使用了（用html、css直接写的，页面的一小部分），插件使用，我们是需要引入一些js文件的，通过js直接插入的。
        组件和插件的主要用途：优化页面，简化页面开发，便于维护。
    3. 翻页结构，这个结构是不断变化的所以我们不能写死，只能一个元素一个元素往页面当中去插入，首先创建包裹层，然后创建结构(根据当前页的不同，显示的结构是不一样的。
        所以进行当前页的判断，然后一个一个插入)；
    4. 插入上一页的判断、前面的省略号的插入、中间五页的插入、后面省略号的插入，最后一页的插入
    5. 我们结构创建好之后，要插入到我们的调用函数对象所在的区域内。我们需要将调用的对象作为一个数据存储一下。
    6. 绑定事件的处理bindEvent():点击上一页和下一页的btn，切换当前页；点击有页面的页面，把当前页改变为点击的页面;
    这时候有一个问题：结构发生了变化，所以再次点击相应绑定的按钮的时候，就没有作用了。所以，我们就需要再次调用一次我们创建结构的函数；
    这时候就用init()函数里面就有，就可以调用它。
    7。插入到指定区域之后，要进行翻页，也是在我们插件中完成的。当我们翻页的行为触发之后，要反馈到需要渲染的页面函数获得的数据中。
    这时候我们就需要一个回调函数，在插件js中我们切换页面的时候，可以返回。
    就可以作用上。
*/

// 原型上存储数据
function storeData(options, odom) {
    this.currentpage = options.currentpage === undefined ? 1 : options.currentpage;
    this.totalpage = options.totalpage === undefined ? 10 : options.totalpage;
    this.callPageDom = odom;
    // 与外部进行联系
    this.change = options.change || function(){};
}
// 创建dom结构
storeData.prototype.createDom = function () {
    // console.log(this.currentpage,this.totalpage)

    var oul = $(`<ul class="turnpage-ul"></ul>`)

    if (this.currentpage > 1) {
        $(`<li class="prepage">上一页</li>`).appendTo(oul);
      }
      // 插入第一页
      $(`<li class="linum">1</li>`).appendTo(oul).addClass(this.currentpage == 1 ? 'active': '');
      // 插入前面的省略号  （当前页向前两页 和第一页之间是否含有页码  如果有则添加省略号好）
      if (this.currentpage - 2 - 1 > 1) {
        $("<span>...</span>").appendTo(oul);
      }
      // 插入中间五页的结构
      for (var i = this.currentpage - 2; i <= this.currentpage + 2; i++) {
        if (i > 1 && i < this.totalpage) {
            $(`<li class="linum">1</li>`).text(i).appendTo(oul).addClass(this.currentpage == i ? 'active': '');;
        }
      }
  
      // 添加后面的省略号
      if (this.totalpage - (this.currentpage + 2) > 1) {
        $("<span>...</span>").appendTo(oul);
      }
      // 插入最后一页
      this.totalpage > 1 && $('<li class="linum"></li>').text(this.totalpage).appendTo(oul).addClass(this.currentpage == this.totalpage ? 'active': '');
      // 插入下一页
      if (this.currentpage < this.totalpage) {
        $('<li class="nextpage">下一页</li>').appendTo(oul);
      }
      
    // this.callPageDom.html(oul)
    this.callPageDom.empty().append(oul);
    
}

//绑定点击事件 
storeData.prototype.bindEvent = function () {
    var self = this;
    $('.turnpage-ul').on('click', 'li', function (e) {
        // 点击的是上一页
        if ($(e.target).hasClass('prepage')) {
            self.currentpage --;
            // console.log(self.currentpage)
        }
        // 点击的是下一页
        if ($(e.target).hasClass('nextpage')) {
            self.currentpage ++;
        }
        
        // 点击相应的li
        if($(e.target).hasClass('linum')){
            self.currentpage = parseInt($(e.target).text());
            // console.log($(e.target).text())
        }
        self.initFn();
        self.change(self.currentpage)
    })
}

// 初始化方法
storeData.prototype.initFn = function () {
    this.createDom();
    this.bindEvent();
}
// jquery创建实例方法
$.fn.extend({
    turnPage: function (options) {
        var obj = new storeData(options, this);
        obj.initFn();
    }
})