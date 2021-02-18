//用面向对象的方式
//1.关于方块的构造函数
var sw = 20,//一个方块的宽度 
    sh = 20,//一个方块的高度
    tr = 30,//行数
    td = 30;//列数

var snake = null,//蛇的实例
    food = null,//食物的实例
    game = null;//游戏的实例

//               坐标   样式  方块构造函数
function Square(x, y, classname){//获取dom对象
    // 0  0     0, 0
    //20  0     1, 0
    //40  0     2，0
    this.x = x * sw;
    this.y = y * sh;
    this.class = classname;

    //添加属性viewcontent  方块用div表示  每一个小方块对应的dom元素
    this.viewContent = document.createElement('div');//方块对应的dom元素
    this.viewContent.className = this.class;
    //添加到父级中  获取父级
    this.parent = document.getElementById('snakeWrap');//方块父级
}

//添加方块样式方法      名字
Square.prototype.create = function(){//创建方块dom  并添加到页面当中
    this.viewContent.style.position = 'absolute';
    this.viewContent.style.width = sw + 'px';
    this.viewContent.style.height = sh + 'px';
    this.viewContent.style.left = this.x + 'px';
    this.viewContent.style.top = this.y + 'px';

    this.parent.appendChild(this.viewContent);
}

//去掉方块样式
Square.prototype.remove = function(){
    this.parent.removeChild(this.viewContent);
}


//创建蛇构造函数  只移动了蛇头和蛇尾
function Snake(){//蛇的父级  蛇具有的属性
    this.head = null;//存一下蛇头信息
    this.tail = null;//存一下蛇尾信息
    this.pos = [];//存一下每一个方块(蛇身上的每一个位置)的位置  二维数组  [1,0] [0,2]
    this.directionNum = {//存储蛇走的方向
        left:{
            x: -1,//对应的style中的left值时  所以是负数
            y: 0,
            rotate: 180//蛇头在不同方向进行旋转，要不始终是向右  角度顺时针为正 逆时针为负  创建新蛇头时候旋转
        },
        right:{
            x: 1,
            y: 0,
            rotate: 0
        },
        up:{
            x: 0,//对应的style中的top值时  所以是负数
            y: -1,
            rotate: -90
        },
        down:{
            x: 0,
            y: 1,
            rotate: 90
        }
    }
}
//在Snake函数中添加init方法  init：初始化
Snake.prototype.init = function(){
    //创建蛇头  蛇头就是一个方块  需要dom元素在页面中显示出来 create
    var snakeHead = new Square(2, 0, 'snakeHead');
    // console.log(1);
    snakeHead.create();
    //在全局中声明变量 snake
    this.head = snakeHead;//存储蛇头信息 其实就是更新
    this.pos.push([2, 0]);//把蛇头位置存起来

    //创建蛇身体 (两个小方块)
    //身体1
    var snakeBody1 = new Square(1, 0, 'snakeBody');
    snakeBody1.create();
    this.pos.push([1, 0]);//把蛇身1位置存一下

    var snakeBody2 = new Square(0, 0, 'snakeBody');
    snakeBody2.create();
    this.tail = snakeBody2;//把蛇尾信息存储 
    this.pos.push([0, 0]);//把蛇身2位置存一下

    //蛇move时，作为一个整体走动 
    //方法一：left  top +- 1 效率不好 把每一个蛇身的那些小方块都存到一个数组中 动的时候 循环数组 每个数组都会变化
    //方法二：把蛇作为一个整体 移动时候 仅仅移动蛇头和蛇尾  它们之间有相互联系  就是形成链表
    //如何把它们变成一个整体 -- 形成链表关系  添加属性 next  last 
    //          null     蛇身    蛇身    蛇头      null
    //                           next             lsat
    //                   next            lsat
    //          next             lsat
    //形成链表关系  为了以后更新方便
    snakeHead.last = null;
    snakeHead.next = snakeBody1;
    //第一节身体
    snakeBody1.last = snakeHead;
    snakeBody1.next = snakeBody2;
    //第二节身体
    snakeBody2.last = snakeBody1;
    snakeBody2.next = null;

    //添加一条属性 来表示蛇走的方向
    this.direction = this.directionNum.right;//默认让蛇往右边走
};

//在蛇move时  要做什么事情？
//遇到墙、身体某一部分、食物、什么都没有
//添加一个getNextPos方法  获取蛇头的下一个位置对应元素，要根据对应元素做不同的事情
Snake.prototype.getNextPos = function(){
    //获取下一个位置要知道 蛇头当前坐标、哪一个方向要+1 或者 -1
    var nextPos = [//蛇头要走的下一个点的坐标
        //需要了解方向  this.directionNum 
        //做项目时需要考虑前瞻性(蛇根据方向键改变this.directionNum)  在初始化时 给蛇添加默认方向
        // right:{
        //    x: 1,
        //    y: 0
        //}
        this.head.x/sw + this.direction.x,
        this.head.y/sh + this.direction.y
    ]
    // console.log(nextPos);


    //下个点是 自己(撞到了自己) GAME over(拿坐标和自己坐标做对比,从pos数组里面找是否有一样的)
    var selfCollied = false;//是否撞倒了自己
    this.pos.forEach(function(value){
        // var a = [1,2]        
        // var b = [1,2]        
        // a == b    // false
        //比较对象的时候 不仅比较的是值  也比较的对象在内存当中的引用地址

        if(value[0] == nextPos[0] && value[1] == nextPos[1]){
            //如果数组两个数据都相等就说明下一个点在蛇身体里面能够找到
            selfCollied = true;
        }
    });
    if(selfCollied){
        console.log('撞到自己了！');
        // this.strategies.die();//这时单纯用this.strategie.die()  这里this 指向 this.stargies   所以就用call改变this指向
        this.strategies.die.call(this);
        return;//加一个return 就是只判断是否满足自己条件 满足就直接返回 不需要再看其他的
    }    //return 也有返回值的通 如果什么都没有的时候就直接返回undefined  也有跳出循环的作用


    //下个点是 围墙            Game over
    //条件判断left：[-1, 0]
    //   左边出界          上边出界           右边出界             下边出界
    if(nextPos[0] < 0 || nextPos[1] < 0 || nextPos[0] > td -1 || nextPos[1] > tr -1){
        console.log('出界了');
        this.strategies.die.call(this);
        return;
    }


    //下个点是 食物               吃  //吃到食物时候胡要的分数  分数要放在game上面
        //判断下一个是不是食物的那个点
    // this.strategies.eat();
    if(food &&food.pos[0] == nextPos[0] && food.pos[1] == nextPos[1]){
        //如果这个条件成立 说明蛇头走的下一个点是食物的那个点
        //动作吃
        console.log('你吃到食物了！！');
        this.strategies.eat.call(this);
        return;//让食物随机重新出现一个点  然后 在eat中createFood();  但是 没有消失之前的food  因为没有删除
    }
    
    
    //下个点什么都不是            走
    //（排除法）if else 
    this.strategies.move.call(this);
    
}

// snake = new Snake();
// snake.init();
// snake.getNextPos();

//碰撞后要做的事情 （三件事情）  都是方法
Snake.prototype.strategies = {
    move:function(format){//这个参数决定要不要删除最后一个方块（蛇尾）

        // console.log('move');
        // console.log(this);// 在没有加call之前 改变了this指向 打印出die eat move
        //考虑如何走？ -- 走的原理：动的时候就是蛇头和蛇尾 （障眼法）  new蛇头 去掉蛇尾 
        // 创建一个新的身体（在旧蛇头位置）  
        var newBody = new Square(this.head.x/sw, this.head.y/sh, 'snakeBody');
        //更新链表的关系  (不能直接写snakeBody1 因为snakeBody1没有在这个函数作用域下 )-- 通过其它元素找到它 用链表
        //现在this.head 还没有被移除 通过它找到snakeBody1
    //          null     蛇身    蛇身    蛇头     null
    //                           next             lsat
    //                   next            lsat
    //          next             lsat
        
        newBody.next = this.head.next;//this.head.next 就是snakeBody1
        newBody.next.last = newBody;
        newBody.last = null;

        this.head.remove();//把旧蛇头在原来位置删除
        newBody.create();//把新身体添加原来旧蛇头样式
        // console.log(newBody);
        // console.log(this.head)

        //创建新的蛇头(蛇头下一个点可以在nextpos里面)
        var newHead = new Square(this.head.x/sw + this.direction.x, this.head.y/sh + this.direction.y, 'snakeHead');
        newHead.next = newBody;
        newHead.last = null;
        newBody.last = newHead;//在此时更新newBody
        //设置样式时候不能直接用newHead.style  它是一个对象不是一个dom对象  transform 用来旋转dom
        newHead.viewContent.style.transform = 'rotate('+ this.direction.rotate +'deg)';
        newHead.create();
        //蛇身上每一个坐标 也要更新（pos值）                        
        //pos值里面[snakehead，snakebody1， snakebody2]-->[newHead，newBody(和snakehead位置一样), snakebody1， snakebody2]
        //pos值变化过程其实就是添加了一个newhead
        // splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。返回值是Array
        // arrayObject.splice(index,howmany,item1,.....,itemX)
                // index	必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
                // howmany	必需。要删除的项目数量。如果设置为 0，则不会删除项目。
                // item1, ..., itemX	可选。向数组添加的新项目。

        this.pos.splice(0, 0, [this.head.x/sw + this.direction.x, this.head.y/sh + this.direction.y]);
        this.head = newHead;//把this.head 信息更新一下

        //蛇尾变化（两种情况：1. 碰到食物 不删 2.没有食物时，去掉蛇尾）‘删不删’ 由 ‘吃不吃’决定 给函数move添加format参数
        if(!format){//如果format为false 表示用户需要删除蛇尾（除了吃之外的操作）
                    // 如果move函数不传参，则表示要做吃的动作  如果move函数不传参 那就意味着format就是undefined !format=true就是不吃
                    
            this.tail.remove();
            this.tail = this.tail.last;

            // pop() 方法将删除 arrayObject 的最后一个元素，把数组长度减 1，并且返回它删除的元素的值。
            // 如果数组已经为空，则 pop() 不改变数组，并返回 undefined 值。
            this.pos.pop();
        }
    },
    eat: function(){
        // console.log('eat');
        this.strategies.move.call(this, true);//这么调用move函数 不会改变this指向 给一个format参数（true） 这时需要做一个食物函数了
        createFood();
        game.score ++;
    },
    die: function(){
        console.log('die');
        game.over();
    }
}

snake = new Snake();
// snake.init();
// snake.getNextPos();
// snake.strategies();

//创建食物
function createFood(){
    //食物小方块的随机坐标
    var x = null,
        y = null;
    //考虑问题？食物出现的范围~
    //食物不能出现墙上 、 不能出现蛇身上
    var include = true;//用循环跳出的条件 true表示随机生成的食物坐标在蛇身上-- 继续循环
                        //false 表示食物的坐标不在蛇的身上--不循环
    while(include){//Math.round()随机数
        x = Math.round(Math.random() * (td - 1));
        y = Math.round(Math.random() * (tr - 1));

        //需要修改include值  当食物坐标不在蛇身上
        //this.pos 这是不能用this 因为调用时用的是createFood()--在全局变量中有snake实例 他身上有坐标pos
        snake.pos.forEach(function(value){
            if(x != value[0] && y != value[1]){//条件成立说明随机出来的坐标在蛇身上并没有找到  结束循环
                include = false;
            }
        });
    }
    //生成食物 考虑：如何让它走呢？让它碰撞  创建函数Game函数
    food = new Square(x, y, 'food');
    food.pos = [x, y];//存储一下生成食物的坐标 用于跟蛇头要走的下一个点做对比
    // food.remove();//报错没有节点 不是dom节点
    //吃到食物的时候要先移除它  之后再创建---这个食物并不是原来的食物  效率不高
    //设计模式--单例模式  就是创建一个食物 永远是你第一次创建的  第二次只需要改变它的left值和top值不需要remove它  高效  
    //用判断方法
    var foodDom = document.querySelector('.food');
    if(foodDom){//获取到了
        foodDom.style.left = x * sw + 'px';
        foodDom.style.top = y * sh + 'px';
    }else{//说明页面没有food 
        food.create();
    }
    // food.create();
}
// createFood();

//控制游戏逻辑
function Game(){
    this.timer = null;//定时器
    this.score = 0;
}
Game.prototype.init = function(){
    //在这里调用
    snake.init();//初始化
    // snake.getNextPos();
    createFood();

    //给键盘事件
    document.onkeydown = function(ev){
        if(ev.which == 37 && snake.direction != snake.directionNum.right){//当用户按下左键的时候这条蛇不能是往右走
            snake.direction = snake.directionNum.left;
        }else if(ev.which == 38 && snake.direction != snake.directionNum.down){
            snake.direction = snake.directionNum.up;
        }else if(ev.which == 39 && snake.direction != snake.directionNum.left){
            snake.direction = snake.directionNum.right;
        }else if(ev.which == 40 && snake.direction != snake.directionNum.up){
            snake.direction =snake.directionNum.down;
        }
    }
    //按完之后要移动
    this.start();
}
Game.prototype.start = function(){//开始游戏  开启定时器
    this.timer = setInterval(function(){
        //动起来的第一步要获取 getNextPos下一个点
        snake.getNextPos();
    },200)
}
//方法pause 清除定时器
Game.prototype.pause = function(){
    clearInterval(this.timer);
}
//结束游戏
Game.prototype.over = function(){
    clearInterval(this.timer);
    alert('你的得分为' + this.score);
    //游戏回到最初时状态
    var snakeWrap = document.getElementById('snakeWrap');
    snakeWrap.innerHTML = '';//结构什么都没有

    snake = new Snake();
    game = new Game();
    //显示button
    var startBtnWrap = document.querySelector('.startBtn');
    startBtnWrap.style.display = 'block';
}

// 点击按钮开启游戏 开启游戏
game = new Game();
// querySelector() 方法返回文档中匹配指定 CSS 选择器的一个元素。 document.querySelector(CSS selectors)
var startBtn = document.querySelector('.startBtn button');
startBtn.onclick = function(){
    startBtn.parentNode.style.display = 'none';
    game.init();
}
// game = new Game();
// game.init();//游戏开始的时候 蛇和食物初始化

//暂停游戏  通过点击元素触发的
var snakeWrap = document.getElementById('snakeWrap');
var pauseBtn = document.querySelector('.pauseBtn button');
snakeWrap.onclick = function(){
    game.pause();
    pauseBtn.parentNode.style.display = 'block';

}
pauseBtn.onclick = function(){
    game.start();
    pauseBtn.parentNode.style.display = 'none';
}













