var Alldata = null;
//获取兄弟节点
function getBroNode(self) {
    var children = self.parentNode.children;
    var arr = [];
    for (var i = 0; i < children.length; i++) {
        if (children[i] != self) {
            arr.push(children[i]);
        }
    }
    return arr;
}
// 切换函数
function changeShow(target, classname) {
    var bro = getBroNode(target);
    for (var i = 0; i < bro.length; i++) {
        bro[i].classList.remove(classname);
    }
    target.classList.add(classname);
}
// 获取form数据
function getFormdata(form) {
    return {
        name: form.name.value,
        sex: form.sex.value,
        email: form.email.value,
        sNo: form.sNo.value,
        phone: form.phone.value,
        birth: form.birth.value,
        address: form.address.value
    }
}
//判断是否符合规格
function isValidData(data) {
    var errorObj = {
        name: ['请填写姓名'],
        sex: [''],
        email: ['请填写邮箱'],
        sNo: ['请填写学号', '请填写4-16位之间的学号'],
        phone: ['请填写手机号', ],
        birth: ['请填写出生年份', '请填写正确格式'],
        address: ['请填写住址']
    };
    for (var prop in data) {
        if (data.hasOwnProperty(prop)) {
            if (!data[prop]) {
                console.log(errorObj[prop][0])
                return false;
            }
            var reg = /^\d{4,16}$/g
            // console.log(data.sNo)
            if (!reg.test(data.sNo)) {
                console.log(errorObj.sNo[1]);
                return false;
            }

            if (!typeof data.birth == 'string') {
                console.log(errorObj.birth[1]);
                return false;
            }
        }
    }
    return true;
}
//得到后台数据渲染页面
function getBackData() {
    ajax('GET', 'http://open.duyiedu.com/api/student/findAll', '&appkey=zhao2003_1602512137289', function (res) {
        // console.log(res);
        if (res.status === 'success') {
            renderPage(res.data);
            Alldata = res.data;
        } else {
            console.log(res.msg)
        }
    }, true);
}
//渲染页面
function renderPage(data) {
    // console.log(data)
    var str = '';
    data.forEach(function (ele, index) {
        str += `<tr>
        <th>${ele.sNo}</th>
        <th>${ele.name}</th>
        <th>${ele.sex == '0' ? 'male' : 'female'}</th>
        <th>${ele.email}</th>
        <th>${new Date() - ele.birth}</th>
        <th>${ele.phone}</th>
        <th>${ele.address}</th>
        <th><button class="edit" data-index="${index}">编辑</button><button class="del" data-index="${index}">删除</button></th>
    </tr>`
    });
    var tbody = document.getElementById('studentbody');
    tbody.innerHTML = str;
}
// 获取编辑内容
function getEditdata(data) {
    var form = document.getElementById('student-edit-form');
    console.log(form)
    for (var prop in data) {
        if (data.hasOwnProperty(prop)) {
            if (form[prop]) {
                form[prop].value = data[prop]
            }
        }
    }
}


// 绑定事件
function bindEvent() {
    //切换页面
    var nav = document.querySelector('.nav');
    nav.onclick = function (e) {
        if (e.target.tagName == 'DD') {
            changeShow(e.target, 'active');
            var id = e.target.dataset.id;
            var showcontent = document.getElementById(id);
            changeShow(showcontent, 'showcontent')
        }
    }
    //点击提交按钮
    var submitBtn = document.getElementById('submitbtn');
    // console.log(submitBtn)
    submitBtn.onclick = function (e) {
        //获取form数据
        e.preventDefault();
        var form = document.getElementById('student-add-form');
        data = getFormdata(form);
        //判断数据是否符合规格
        var isvalid = isValidData(data);
        datastr = '';
        for (var i in data) {
            if (data.hasOwnProperty(i)) {
                datastr += i + '=' + data[i] + '&';
            }
        }
        datastr += 'appkey=zhao2003_1602512137289';
        console.log(datastr);
        ajax('GET', 'http://open.duyiedu.com/api/student/addStudent', datastr, function (res) {
            console.log(res);
            if (res.status === 'success') {
                alert('新增成功');
                var studentpage1 = document.getElementById('page1');
                studentpage1.click();
                getBackData();
            } else {
                console.log(res.msg)
            }
        }, true)
    }

    //编辑按钮
    var tabelBody = document.getElementById('studentbody');
    var dialog = document.querySelector('.dialog');
    tabelBody.onclick = function (e) {
        if (e.target.classList.contains('edit')) {
            var dislogshow = document.querySelector('.dialog .content-dialog');
            // console.log(dislogshow)
            dialog.classList.remove('showshow')
            dislogshow.classList.remove('showshow')

            var index = e.target.dataset.index;
            var studentdata = Alldata[index];
            getEditdata(studentdata);
        }else{
            var index = e.target.dataset.index;
            var studentdata = Alldata[index];
            
            if(confirm('确定删除学号为'+ studentdata.sNo +'的'+ studentdata.name + '学生吗')){
                ajax('GET', 'http://open.duyiedu.com/api/student/delBySno', 'appkey=zhao2003_1602512137289&sNo=' + studentdata.sNo, function (res) {
                    // console.log(res);
                    if(res.status === 'success'){
                        alert('删除成功');
                        getBackData();
                    }else{
                        console.log(res.msg)
                    }
                }, true)
            }
        }

    }
    dialog.onclick = function (e) {
        if (e.target.classList.contains('dialog')) {
            dialog.classList.add('showshow');
        }
    }

    // 修改内容
    var editForm = document.getElementById('student-edit-form');
    var editBtn = document.querySelector('.editBtn')
    editForm.onclick = function (e) {
        e.preventDefault();
        if (e.target == editBtn) {            
            var data = getFormdata(editForm);
            var editvalid = isValidData(data);
            console.log(editvalid)
            if (!editvalid) {
                return false;
            }
            var Editdata = '';
            for (var prop in data) {
                Editdata += prop + '=' + data[prop] + '&';
            }
            Editdata += 'appkey=zhao2003_1602512137289';
            
            ajax('GET', 'http://open.duyiedu.com/api/student/updateStudent', Editdata, function (res) {
                // console.log(res);
                if(res.status === 'success'){
                    alert('修改成功');
                    dialog.classList.add('showshow');
                    getBackData();
                }else{
                    console.log(res.msg)
                }
            }, true)
        }

    }

}
bindEvent()
getBackData()
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
        if (xhr.readyState == 4 && xhr.status == 200) {
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