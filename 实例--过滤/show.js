//渲染页面li
function renderPage(data){
    var htmlstr ='';
    data.forEach(function(ele){
        htmlstr += '<li>\
                       <span>Name:' + ele.name + '</span>\
                       <span>Age:' + ele.age + '</span>\
                       <span>Sex:' + ele.sex + '</span>\
                       <span>Emaill:' + ele.email + '</span>\
                   </li>'
    })
    ul.innerHTML = htmlstr;
}
//搜索对应的名字
function filterBytext(otext,arr){
   
   if(!filterBytext){
       return arr;
   }else{
       return arr.filter(function(ele){
           return ele.name.indexOf(otext) != -1;
       })
   }

}
//切换颜色
function change(index){   
    for(var i = 0; i < ospan.length; i++){ 
            for(var i = 0; i < ospan.length; i++){                
                ospan[i].className = '';
            }
            ospan[index].className = 'active';          
    }    
}
//搜索对应的性别
function filterBysex(Sex, arr){
    if(Sex == 'all'){
        return arr;
    }else{
        return arr.filter(function(ele){
            return ele.sex == Sex;
        })
    }
}
//年龄减减

function filterByage(arr){
    return arr.map(function (ele, index) {
        ele.age--;
        return ele;
    });
}



// function mapMinusAgeArr (personArr) {
//     return personArr.map(function (ele, index) {
//         ele.age--;
//         return ele;
//     });
// }