/*
 * @Author: your name
 * @Date: 2020-11-06 13:15:47
 * @LastEditTime: 2020-11-11 14:59:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \京东\slide\slide.js
 */
// 小知识：end() 方法结束当前链条中的最近的筛选操作，并将匹配元素集还原为之前的状态。
//        jq中没有加上像素，都会默认给你加上
//        定时器里面的this指的是全局对象
//        hover() 方法规定当鼠标指针悬停在被选元素上时要运行的两个函数，方法触发 mouseenter 和 mouseleave 事件
//        index() 方法返回指定元素相对于其他指定元素的 index 位置。
/* 封装插件之前要明白插件怎么用？ */
/* 
轮播图需求分析：
    1.位置不同(将位置传入插件中 ||  通过jq选择器选中这个位置)
    2.内容不同（一个结构div/dom列表）
    3.大小不同
    4.动画方式不同(type:fade || animate)
    5.是否自动轮播
    6.是否有下方小圆点
    7.左右按钮显示形态(一直显示为always，鼠标移入时显示hover，不显示为hidden)
    8.切换时间间隔

思考：
    1.每次调用都要存储信息，需要声明函数用来存储信息 Swiper(options, wrap)
    2.创建轮播图结构（div.my-swiper）
    3.切换样式不同，然后导致宽度的变化，在原型链上添加一个方法用来设置样式（initStyle）
    功能实现：
        1.样式大小没有设置
        2.淡入淡出 fadein || fadeout，当这个页面不在这个区域当中，display：none;
        3.行为功能：
            a.fade:左右按钮绑定事件（索引值的改变，this指向要注意）和小圆点的索引值也要跟着改变: change函数来进行fade切换效果实现
            b.animate:初始化的时候要设置left值为0；然后在change函数里面用animate自定义特效进行操作，在索引值变化的时候进行判断，
                      然后确定索引值，从而进行画面切换和小圆点的切换
            c.自动轮播 setTimeout({ trigger手动触发click}，time)，
            d.小圆点添加事件，鼠标点击小圆点的时候，让当前的索引值==点击的小圆点的索引值，然后让自动轮播的索引值不影响小圆点的变化
            e.左右按钮的显示状态
            f.小圆点是否显示状态
    4.在我们封装插件的时候 || 模块化写代码，我们想要做到的就是当前的模块不给外界造成一定的影响(也就是当前模块的变量不想让外界拿到)，
    这时候我们就需要做到私有化变量，封闭作用域，就可以在外面套上一层立即执行函数就可以了。
    然而我们封装的时候是封装在jquery原型链上的，所以说，我们用的时候就可以通过jQuery方式直接调用。  
 */
(function(){
/**
 * @description: 存储信息
 * @param {object} options
                 content:$('.item'),轮播图内容
                 width:500 轮播图内容的宽度
                 height:400 轮播图内容的高度
                 type:'fade' 动画方式
                 isAuto:true 是否自动轮播
                 showSpots:true,是否有小圆点
                 showChangeBtn:'always' ，左右按钮显示形态
                 autoChangeTime: 3000切换时间
                 spotsPosition:小圆点位置
 * @param {jq element} wrap  插入轮播图的区域
 * @return {*}
 */
function Swiper(options, wrap) {
    this.content = options.content || [];
    this.len = this.content.length;
    this.width = options.width;
    this.height = options.height;
    this.type = options.type || 'fade';
    this.showChangeBtn = options.showChangeBtn === undefined ? '' : options.showChangeBtn;
    this.isAuto = options.isAuto === undefined ? true : options.isAuto;
    this.showSpots = options.showSpots === undefined ? true : options.showSpots;
    this.autoChangeTime = options.autoChangeTime || '5000';
    this.spotsPosition = options.spotsPosition || 'center';
    this.wrap = wrap; //用来指向谁调用的
    this.Index = 0; //当前的索引值
    this.timer = null; //自动轮播
    this.lock = true;//表示当前的动画已将完成
}

// 创建结构
Swiper.prototype.createDom = function () {
    var odiv = $('<div class="my-swiper"></div>');
    var oul = $('<ul class ="my-content"></ul>')
    var rbtn = $('<div class="btn rBtn">&#xe61e;</div>');
    var lbtn = $('<div class="btn lBtn">&#xe62c;</div>');
    var circles = $('<div class="circles"></div>');
    for (var i = 0; i < this.len; i++) {
        $('<li></li>').html(this.content[i]).appendTo(oul);
        $('<span class="spot"></span>').appendTo(circles);
    }
    if (this.type === 'animate') {
        $('<li></li>').html($(this.content[0]).clone(true)).appendTo(oul);
    }

    $(odiv).append(oul).append(rbtn).append(lbtn).append(circles).append(circles).appendTo(this.wrap).addClass('my-' + this.type);

}

//设置样式
Swiper.prototype.initStyle = function () {
    //初始化设置宽高    
    $(this.wrap).find('.my-swiper').css({
        width: this.width,
        height: this.height
    })
    //设置宽度
    if (this.type === 'animate') {
        $(this.wrap).find('.my-swiper .my-content').css({
            width: (this.len + 1) * this.width,
            left: 0
        })
    } else {
        //设置fade状态的时候的初始值
        $(this.wrap).find('.my-content li').hide().eq(this.Index).show();
    }

    //设置小圆点位置
    $(this.wrap).find('.circles').css({
        textAlign: this.spotsPosition
    }).end().find('.circles .spot').eq(this.Index).addClass('spot-active')

    //左右按钮的样式实现
    if(this.showChangeBtn === 'always'){
        $(this.wrap).find('.btn').show();
    }else if(this.showChangeBtn === 'hide'){
        $(this.wrap).find('.btn').hide();
    }else{
        // console.log('a');
        $(this.wrap).find('.btn').hide();
        $(this.wrap).hover(function(){
            $(this).find('.btn').fadeIn();
        }, function(){
            $(this).find('.btn').fadeOut();
        })
    }
    //小圆点是否显示
    // console.log(this.showSpots);
    if(!this.showSpots){
        $(this.wrap).find('.circles').hide();
    }
}

// 左右按钮绑定事件
Swiper.prototype.bindEvent = function () {
    var self = this;
    $(this.wrap).find('.lBtn').click(function () {
        if(!self.lock){
            return false;
        }
        self.lock = false;
        if(self.type === 'fade' && self.Index === 0){
            self.Index = self.len - 1;
        }else if(self.type === 'animate' && self.Index === 0){         
            self.Index = self.len - 1;
            $(self.wrap).find('.my-content').css({
                left: -self.width * (self.len - 1) 
            })
        }else{
            self.Index --;
        }
        self.changeAffect();
            
    }).end().find('.rBtn').click(function(){
        if(!self.lock){
            return false;
        }
        self.lock = false;
        if(self.type === 'fade' && self.Index === self.len -1){
            self.Index = 0;
        }else if(self.type === 'animate' && self.Index === self.len){
            $(self.wrap).find('.my-content').css({
                left: 0 
            })
            self.Index = 1;
        }else{            
            self.Index ++;
        }
        self.changeAffect();
    }).end().find('.circles span').mouseenter(function(){
        clearInterval(self.timer)
        self.Index = $(this).index();
        self.changeAffect()
        clearInterval(this.timer);
    }).mouseleave(function(){
        if(self.isAuto){
            self.autoChange()
        }
    })

}

//切换效果的实现
Swiper.prototype.changeAffect = function(){
    var self = this;
    // 画面切换
    if(this.type === 'fade'){
        $(this.wrap).find('.my-content li').fadeOut().eq(this.Index).fadeIn(function(){
            self.lock = true;
        });
    }else{
        $(this.wrap).find('.my-content').animate({
            left: -this.Index * this.width
        },function(){
            self.lock = true;
        })
    }
    // 小圆点切换
    $(this.wrap).find('.circles .spot').removeClass('spot-active').eq(this.Index % this.len).addClass('spot-active')
}
//自动轮播
Swiper.prototype.autoChange = function(){
    var self = this
    this.timer = setInterval(function(){
        $(self.wrap).find('.rBtn').trigger('click');
    }, this.autoChangeTime);    
}
$.fn.extend({
    swiper: function (options) {
        var obj = new Swiper(options, this);
        obj.createDom();
        obj.initStyle();
        obj.bindEvent();
        if(options.isAuto){
            obj.autoChange();
        }
    }
})
})()