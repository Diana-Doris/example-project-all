var allPersonArr = [
    {name: 'chen1', age: 10, sex: 'female', tel: '123'},
    {name: 'chen2', age: 20, sex: 'female', tel: '345'},
    {name: 'chen3', age: 30, sex: 'male', tel: '456'},
    {name: 'chen5', age: 40, sex: 'male', tel: '333'},
    {name: 'chen6', age: 22, sex: 'female', tel: '4555'},
    {name: 'chen7', age: 88, sex: 'male', tel:'666'},
    {name: 'chen8', age: 33, sex: 'female', tel:'3399'},
    {name: 'chen9', age: 55, sex: 'male', tel: '8888'}
];
var currentPersonArr = allPersonArr;
var lastFilterSex = 'all';

//初始化
renderPageByArr(allPersonArr);

//函数bindEventByAction
function bindEventByAction(actionArray){
    actionArray.forEach(ele => {
        var actor = ele.btn;
        switch(ele.type){
            case 'INPUT':
                actor.oninput = function(){
                    renderPageByArr(
                        currentPersonArr = filterPersonArr(allPersonArr, this.value)
                    )
                }
                break;
            case 'MINUS':
                actor.onclick = function(){
                    renderPageByArr(
                        mapMinusAgeArr(
                            filterSexArr(currentPersonArr, lastFilterSex)
                        )
                    )
                }
                break;
            case 'SEX':
                actor.onclick = function(){
                    renderPageByArr(
                        filterSexArr(currentPersonArr, lastFilterSex = ele.prama)
                    )
                }
                break;
        } 
    });
}
bindEventByAction(actionArr);