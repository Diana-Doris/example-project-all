// 合并filterBytext、filterBysex
function combineFilterFunc(config){
    // Ao  = config
    return function(data){
        var lastArr =  data;
        for(var prop in config){
            //prop  =  text  sex
            //config[prop] filterBytext  filterBysex
            // lastArr = config[prop](state[prop], lastArr);
            lastArr = config[prop](Store.getState(prop), lastArr)
        }
        return lastArr;
    }
}
var lasrFilter = combineFilterFunc({text: filterBytext, sex: filterBysex});
// , age: filterByage