// 小小知识
// $('form').serializeArray();获取 表单数据

var Alldata = null;
var tableData = [];
var totalcount = 1;
var currentindex = 1;
var pageSize = 5;
function getData(){
    $.ajax({
        type: "get",
        url:'http://open.duyiedu.com/api/student/findByPage',
        dataType:'json',
        data:{
            appkey:'Diana_1602512479606',
            page: currentindex,
            size: pageSize
        },
        success: function (res) { 
            // console.log(res)           
            Alldata = res.data.findByPage;
            // console.log(res.data)
            totalcount = Math.ceil(res.data.cont / pageSize);
            // console.log(totalcount)
            renderContent1(res.data.findByPage);            
        }
    });
    // $.ajax({
    //     url:'http://open.duyiedu.com/api/student/findByPage',
    //     dataType:'json',
    //     data:{
    //         appkey:'Diana_1602512479606',
    //         page:1,
    //         size:5
    //     },
    //     success:function(res){
    //         console.log(res);
    //     }
    // })
}
//渲染页面
function renderContent1(data){
    // console.log(data)
    var str = null;
    data.forEach(function(ele){
        str += `<tr>
        <th>${ele.sNo}</th>
        <th>${ele.name}</th>
        <th>${ele.sex == '0' ? 'female' : 'male'}</th>
        <th>${ele.email}</th>
        <th>${new Date().getFullYear() - ele.birth}</th>
        <th>${ele.phone}</th>
        <th>${ele.address}</th>
        <th>
            <button class="activebtn edit">编辑</button>
            <button class="activebtn del">删除</button>
        </th>
    </tr>`
    })   
    $('.studnettablebody').html(str);

    $('.transferpage').turnPage({
        currentpage:currentindex,
        totalpage: totalcount,
        change: function(oindex){
            console.log(oindex)
            currentindex = oindex;
            getData()
        }
    })
    // var str = data.reduce(function (prev, item) {
    //     return prev + `<tr>
    //     <th>${item.sNo}</th>
    //     <th>${item.name}</th>
    //     <th>${item.sex == '0' ? 'female' : 'male'}</th>
    //     <th>${item.email}</th>
    //     <th>${new Date().getFullYear() - item.birth}</th>
    //     <th>${item.phone}</th>
    //     <th>${item.address}</th>
    //     <th>
    //         <button class="activebtn edit">编辑</button>
    //         <button class="activebtn del">删除</button>
    //     </th>
    // </tr>`;
    // }, '');
    // $('.studnettablebody').html(str);
    bindEvent();
}

// 绑定事件
function bindEvent(){
    // 点击 编辑 || 删除按钮
    $('.studnettablebody').on('click','.activebtn', function(){
        // 点击的数据索引值
        var oindex = $(this).parents('tr').index();
        console.log(Alldata, oindex)
        var trMsg = Alldata[oindex];   
        console.log(trMsg)
        // 让form表单中填充相对应的数据
        for(var prop in trMsg){
            if(trMsg.hasOwnProperty(prop)){
                $(`#editmsg input[name=${prop}]`).val(trMsg[prop])
                
            }
        }     
        // 点击编辑按钮
        if($(this).hasClass('edit')){
            // 点击form表单之外的区域  弹框消失
            $('.alert').fadeIn().click(function(e){
                if(e.target.className === 'alert'){
                    $(this).fadeOut()
                }
            })
        
            // 点击alertForm的提交按钮
            $('#submit').click(function(e){
                e.preventDefault();
                //判断数据是否合法
                var changeData = changeDataType('#editmsg', 'Diana_1602512479606')
              if(isValid(changeData).msg === '校验成功'){        
                $.ajax({
                    url:'http://open.duyiedu.com/api/student/updateStudent',
                    dataType:'json',
                    data:changeData,
                    success:function(){
                        $('.alert').trigger('click');
                        getData();
                    }
                })
              }
            })            
        }
        // 点击删除按钮
        if($(this).hasClass('del')){
            console.log(trMsg.sNo);
            var comfirmS = confirm('你要删除' + trMsg.sNo + trMsg.name + '的同学吗？')
            
            if(comfirmS){
                $.ajax({
                    type: "get",
                    url: "http://open.duyiedu.com/api/student/delBySno",
                    data: {
                        appkey:'Diana_1602512479606',
                        sNo:trMsg.sNo
                    },
                    dataType: "json",
                    success: function () {  
                        alert('删除成功');
                        getData();       
                    }
                })
            }
        }
    })

    // 新增学生
    $('#assmsgbtn').click(function(e){
        var truelyData = changeDataType('#addmsg', 'Diana_1602512479606')
        if( isValid(truelyData).msg === '校验成功'){

            $.ajax({
                url:'http://open.duyiedu.com/api/student/addStudent',
                dataType:'json',
                data:truelyData,
                success:function(res){
                    if(res.status === 'fail'){
                        alert(res.msg);
                        return false;
                    }
                    $('.nav dd[data-id=no1]').trigger('click');
                    getData();
                    $('#addmsg')[0].reset();
                }
            })
        }
    })
}

// form表单中的数据  数组 --->  对象
/**
 * @description: 
 * @param {string} selector
 * @param {string} appkeyvalue
 * @return {obj}
 */
function changeDataType(selector, appkeyvalue){
    var res = $(selector).serializeArray();
    var allarr = {};
    res.forEach(function(ele){
        allarr[ele.name] = ele.value
    })
    allarr.appkey = appkeyvalue;
    return allarr;
}

// 判断数据是否合法
function isValid(data){
    // console.log(data);
    var result = {
        msg:'校验成功',
        status:'success',
        data: data
    }
    // 邮箱是否合法
    var emailreg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g
    if(!emailreg.test(data.email)){
        result.msg = '邮箱不符合格式';
        alert(result.msg);
        return false;
    }

    // 学号
    var sNoreg = /\d/g;
    if(!sNoreg.test(data.sNo)){
        result.msg = '学号不符合格式'
        alert(result.msg);
        return false;
    }
    // Alldata.forEach(function(ele){
    //     if(ele.sNo === data.sNo){
    //         result.msg = '该学号已存在，请更换学号'
    //         alert(result.msg);
    //         return false;
    //     }
    // })
    

    // 出生年份
    var birthreg = /^[\d]{4}$/g;
    if(!birthreg.test(data.birth)){
        result.msg = '出生年份不符合格式'
        alert(result.msg);
        return false;
    }
    // 手机号
    var phonereg = /^1[3-9]\d{9}$/g;
    if(!phonereg.test(data.phone)){
        result.msg = '手机号不符合格式'
        alert(result.msg);
        return false;
    }

    // 住址
    var addressreg = new RegExp('[\u4e00-\u9fa5]')
    if(!addressreg.test(data.address)){
        result.msg = '住址不符合格式'
        alert(result.msg);
        return false;
    }

    return result;
}
getData()
// 点击nav，切换content区域
$('.nav').on('click', 'dd', function(e){
    let hashValue = $(this).attr('data-id');
    location.hash = hashValue;
    $(e.target).addClass('active').siblings().removeClass('active');
    $('#' + hashValue).addClass('show').siblings().removeClass('show');
})

// 哈希值改变触发页面变化事件
$(window).on('hashchange', function () {
        let hash = location.hash;
        $('dd').removeClass('active');
        $('.' + hash.slice(1)).addClass('active');
        $(hash).addClass('show').siblings().removeClass('show');
});

// 用户登录状态校验
// var userData = sessionStorage.getItem('studentMsg');
// console.log(userData)
// $.ajax({
//     url: 'http://open.duyiedu.com/api/student/stuLogin',
//     type: 'POST',
//     data: userData,
//     dataType: 'json',
//     success:function(res) {
//         if (res.status === 'fail') {
//             // 如果用户信息校验不正确不显示系统
//             location.href = './enterpage.html'
//             alert('请先登录')
//         } else {
//             getData();
//         }
//     }
// })


