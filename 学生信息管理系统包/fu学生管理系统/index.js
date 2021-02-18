var allData = [];
//切换函数
function changeStyle(bro, self, classname){
    for(var i = 0; i < bro.length; i++){
        bro[i].classList.remove(classname)
    }
    self.classList.add(classname)
}
//获取除了自身之外的的兄弟节点
function getBro(self){
    var children = self.parentNode.children;
    var arr = [];
    for(var i = 0; i < children.length; i ++){
        if(self != children[i]){
            arr.push(children[i]);
        }
    }
    return arr;
}
//获取表单数据
function getFromData(form){
    return {
        name: form.name.value,
        sex: form.sex.value,
        email: form.email.value,
        sNo: form.sNo.value,
        birth: form.birth.value,
        phone: form.phone.value,
        address: form.address.value
    };
}
//判断获取到的数据是否都符合规格
function isValidForm(data){
    var errorObj = {
        name: ["请填写学生姓名","不能填写数字"],
        sNo: ["请填写学生学号", "学号由4-16位的数字组成"],
        birth: ["请填写出生年份", "您的岁数超出接受范围"],
        email: ["请填写邮箱", "邮箱格式不正确"],
        sex: [],
        phone: ["请填写手机号"],
        address: ["请填写住址"]
    };

    for(var prop in errorObj){
        if(errorObj.hasOwnProperty(prop)){
            if(!data[prop]){
                alert(errorObj[prop][0]);
                return false;
            }
            //判断名字
            if(typeof data.name != 'string'){
                alert(errorObj.sNo[1])
                return false;
            }
            // 判断学号
            var regsno = /^\d{4,16}$/;
            if(!regsno.test(data.sNo)){
                alert(errorObj.sNo[1])
                return false;
            }
            //判断生日
            if(new Date().getFullYear - data.birth > 50){
                alert(errorObj.birth[1]);
                return false;
            }
            //判断邮箱格式
            if(typeof data.email != 'string'){
                alert(errorObj.email[1]);
                return false;
            }
        }
    }
    return true;
}

// 渲染页面显示信息
function renderPage(res){
    // console.log(res)
    var str = "";
    res.forEach(function(ele, index) {
        // console.log(ele)
        str += `<tr>
                    <th>${ele.sNo}</th>
                    <th>${ele.name}</th>
                    <th>${ele.sex == 0 ? '男' : '女'}</th>
                    <th>${ele.email}</th>
                    <th>${new Date().getFullYear() - ele.birth}</th>
                    <th>${ele.phone}</th>
                    <th>${ele.address}</th>
                    <th>
                        <button class="edit" data-index="${index}">编辑</button>
                        <button class="del" data-index="${index}">删除</button>
                    </th>
                </tr>`
    });
    // console.log(str)
    var studentbody = document.querySelector('.studnettablebody');
    
    studentbody.innerHTML = str;
}

//获取后端数据
function getBackEndData(){
    ajax('GET','http://open.duyiedu.com/api/student/findAll', 'appkey=zhanglei5_1602549016175', function(res){
        // console.log(res)
        if(res.status === 'success'){
            // console.log(res.data)
            allData = res.data;
            renderPage(Object.values(res.data))
        }
    }, true)
}

//编辑表单函数回填
function editTable(trdata){    
    console.log(trdata)
    var form = document.getElementById('editmsg');
    // console.log(form)
    for(var prop in trdata){
        if(form[prop]){
            // console.log(form[prop])            
            form[prop].value = trdata[prop];
        }
    }
}
// 优化函数
function combineFunc(form){
        var Data = getFromData(form);
        var isvalid = isValidForm(Data)
        if(!isvalid){
            return false;
        }
        var datastr = '';
        for(var prop in Data){
            if(Data.hasOwnProperty(prop)){
                datastr += prop + "=" + Data[prop] + "&";
            }
        }
        return datastr;
}

// 绑定事件函数
function bindEvent(){
    // 实现nav中的切换
    var changeDl = document.querySelector('.nav dl');
    changeDl.onclick = function(e){
        if(e.target.tagName === 'DD'){
            var ddbro = getBro(e.target);
            changeStyle(ddbro, e.target, 'active');
    
            var idname = e.target.dataset.id;
            var content = document.getElementById(idname);
            var contentbro = getBro(content);
            changeStyle(contentbro, content, 'show')
        }       
    }

    //实现提交按钮与后端连接
    var submitbtn = document.getElementById('assmsgbtn');
    // console.log(submitbtn);
    submitbtn.onclick = function(e){
        e.preventDefault();
        var Form = document.getElementById('addmsg')
        var datastr = combineFunc(Form);

        datastr += 'appkey=zhanglei5_1602549016175';
        console.log(datastr)
        ajax('GET', 'http://open.duyiedu.com/api/student/addStudent', datastr, function(res){
            console.log(res)
            if(res.status === 'success'){
                //跳转到展示学生信息的页面
                alert('新增成功！')
                var studnetNo1 = document.querySelector('.nav dl dd[data-id="no1"]');
                // console.log(studnetNo1)
                studnetNo1.click();
                getBackEndData()

            }else{
                alert(res.msg);
            }
        }, true);
    }

    
    var studentTbody = document.querySelector('.studnettablebody');
    var alertWindow = document.querySelector('.alert');
    studentTbody.onclick = function(e){
        //点击编辑按钮，开启弹窗内容--修改内容
        var index = e.target.dataset.index;//获得那一行的索引值
        var studentdata = allData[index];//获取到那一行的数据
        if(e.target.classList.contains('edit')){
            e.preventDefault();
            alertWindow.classList.add('showeditdata');
            editTable(studentdata);
        }else{
            // 点击的是删除按钮  在后端删除
            if(e.target.classList.contains('del')){
               
                var isdelete = confirm('是否要删除学号为' + studentdata.sNo + '的' + studentdata.name + '同学?');
                if(isdelete){
                    ajax('GET', 'http://open.duyiedu.com/api/student/delBySno','appkey=zhanglei5_1602549016175&sNo=' + studentdata.sNo, function(res){
                        // console.log(res)
                        if(res.status === 'success'){
                            getBackEndData();
                        }else{
                            res.msg;
                        }
                    }, true)
                }    
            }
        }
    }
    alertWindow.onclick = function(e){
        if(e.target == this){
            alertWindow.classList.remove('showeditdata')
        }
    }

    //修改弹框内容（后端）
    var editForm = document.getElementById('editmsg');
    var editFormBtn = document.getElementById('submit');
    // console.log(editFormBtn)
    editFormBtn.onclick = function(e){
        e.preventDefault();
        var datastr = combineFunc (editForm);
        datastr += 'appkey=zhanglei5_1602549016175';

        ajax('GET', 'http://open.duyiedu.com/api/student/updateStudent', datastr, function(res){
            if(res.status === 'success'){
                alert('修改成功')
                getBackEndData();
                alertWindow.classList.remove('showeditdata')
            }
        },true)
    }

    //点击空白区域弹窗消失
    alertWindow.onclick = function (e){
        if(e.target == this){
            alertWindow.classList.remove('showeditdata')
        }
    }
}
bindEvent();
getBackEndData();

/**
 * 
 * @param {String} method 请求方式  需要大写
 * @param {String} url    请求地址  协议（http）+ 域名+ 端口号 + 路径
 * @param {String} data   请求数据  key=value&key1=value1
 * @param {Function} cb     成功的回调函数
 * @param {Boolean} isAsync 是否异步 true
 */
function ajax(method, url, data, cb, isAsync) {
    // console.log(data)
    // get   url + '?' + data
    // post 
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    // xhr.readyState    1 - 4  监听是否有响应
    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4 && xhr.status == 200) {
                cb(JSON.parse(xhr.responseText));
        }
    }
    method = method.toUpperCase();
    if (method == 'GET') {
        xhr.open(method, url + '?' + data, isAsync);
        // console.log(url + '?' + data)
        xhr.send();
    } else if (method == 'POST') {
        xhr.open(method, url, isAsync);
        // key=value&key1=valu1
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }
}
