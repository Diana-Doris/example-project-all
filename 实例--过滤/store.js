


function createStore(initialState){
    var state = initialState || {};
   var list = [];
    return {
        getState: function(type){//获得当前text  sex
            return state[type];
        },
        dispatch: function(action){//改变当前text 值 或者 sex 值
            // action.type = 'text';
            // action.value = '陈'
            state[action.type] = action.value;
            list.forEach(function(ele){//遍历改变值之后，要做的事情
                ele();
            })
        },
        subscribe: function(func){
            list.push(func);
        }
    }
}

// var Store = createStore({text:'', sex:'all'})

// Store.subscribe(function(){
//     console.log(0);
// })
// Store.dispatch(type:'text', value:'王')