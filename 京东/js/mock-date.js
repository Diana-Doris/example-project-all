/*
 * @Author: your name
 * @Date: 2020-11-10 08:13:53
 * @LastEditTime: 2020-11-13 19:19:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \京东\js\mock-date.js
 */
/* 
    这时候我们要看我们哪里需要请求数据，哪里需要用。
    我们想要获取模拟的数据的接口最好单独去写，等我们后面后台写好接口了，
    就可以直接修改我们自己写的配置文档就可以了
    思考：接口怎么写？我们想要通过mock模拟数据，只需要mock一个接口就可以实现了
        1.明确需要的数据结构是什么样子的，也就是通过接口会给我们返回什么样子的数据，
    
*/
Mock.mock('/data',{
    'status':'success',
    'msg':'查询成功',
    'dataSource|18' :[{
        'key|+1':1,
        'titles|2-3':[{
            'name':'@cword(2,3)',
            'href':'@url()'
        }],
        'content':{
            'tabs|2-5':[{
                'name':'@cword(2,5)',
                'href':'@url()'
            }],
            'subs|6-12':[{
                'category':'@cword(2,6)',
                'href':'@url()',
                'items|8-20':[{
                    'href':'@url()',
                    'name':'@cword(2,6)'
                }],
                'activity|1':['双十一盛典','满129减掉20元','砍搬半价','','京东11.11',''],
            // name:'@ctitle(0,2)'
            }],
            'ads':[{
                'img|1-2':"@image()"
            }],
            
        }
        
    }]
})

// Mock.Random.extend({
//     tags:function(date){
//         var arr = ['双十一盛典','满129减掉20元','砍搬半价','','京东11.11',''];
//         return this.pick(arr,2,4)
//     }
// })
Mock.mock('/dd',{
    'data|5-8':[{
        'name': '@cword(4,5)',
        'href': '@url()'
    }]
    
})
Mock.mock('/dds',{
    'name': '@ctitle()'
})
Mock.mock('/kill',{
    'data|10': [{
        'name':'@cword(2,4)'
    }]
})

Mock.mock('/area',{
    'area|35':[{
        'name': '@province()'
    }]
})
Mock.mock('/time',{
    'time':'@date("2020-11-14 HH:m:ss")'
})