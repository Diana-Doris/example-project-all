//减年龄， 只显示男， 只显示女， 显示全部功能

//初始化
function renderPageByArr(personArr){
    var htmlAllStr = '';
    personArr.forEach(ele => {        
        htmlAllStr += '<li>' + 'name:' + ele.name + ' age:' + ele.age + ' sex:' + ele.sex + ' tel:' + ele.tel + '</li>';
    });
    oUl.innerHTML = htmlAllStr;   
}

//搜索符合条件的值
// filter函数，过滤通过条件的元素组成一个新数组，原数组不变
function filterPersonArr(personArr, filterText){
    return personArr.filter(function(ele){
        return ele.name.indexOf(filterText) != -1;
    })
}

//搜索正在显示的值,年龄减减
// map函数，遍历数组每个元素，并调回操作，需要返回值，
// 返回值组成新的数组，原数组不变
function mapMinusAgeArr(personArr){
    return personArr.map(function(ele){
        ele.age --;
        return ele;
    })
}

//根据性别过滤
function filterSexArr(personArr, sexFilterText){
    return personArr.filter(function(ele){
        if(sexFilterText === 'all'){
            return true;
        }else{
            return ele.sex === sexFilterText;
        }
        //sexFilterText === 'all' ? true : ele.sex === sexFilterText;
    })
}