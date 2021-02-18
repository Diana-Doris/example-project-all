var sideNav = document.getElementsByClassName('sideNav'),
    li = document.getElementsByTagName('li'),
    len = li.length;


var content_diaplay = document.getElementsByClassName('content_display'),
    content = document.getElementsByClassName('content');

for(var i =0; i < len; i++){
    li[i].index = i;
    li[i].onmouseenter = function(){
        for(var i = 0; i < len; i++){
            content[i].style.display = "none";
        }
        content[this.index].style.display = "block";
    }

    for(var j = 1; j < len; j ++){
        content[j].style.display = "none";
    }
}
//onmouseover和onmouseenter都是鼠标移入该元素的时候触发的事件，
//但是，不一样的地方是，如果打开页面的时候鼠标刚好在该元素上面，
//onmouseenter就没有被触发，而onmouseover会被触发，
//因为onmouseenter只有在鼠标进入该元素的瞬间才会被触发

//onmouseleave和onmouseout的区别也是如此，只要鼠标不在该元素身上，
//onmouseout就会触发，而onmouseleavr只有在鼠标从该元素身上离开的时候才会触发