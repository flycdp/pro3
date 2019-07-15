
window.onload = function () {
    //确定
    var oQ = document.getElementById('qd');
    //注册
    //手机号登陆
    var oZ = document.getElementById('zu');
    function exit() {
        if ($('.wq-banner').length) {
            oZ.style.display = "block";
            $('.loginUser').hide();
            $('.wq-nav-right').removeClass('wq-nav-right1');
            $('#tou')[0].src = '';
        }else{
            window.location.href="localhost";
        }
    }
    $('#exit').click(exit);
    function loginning(res) {
        if(!res.length){
            return ;
        }
        let nowData = new Date();
        nowData.setDate(nowData.getDate() + 1);
        document.cookie = `bigLegUser=${JSON.stringify({
        info:res
    })};path=/;expires=${nowData}`;
        $('#tou')[0].src = res[0].headerimg;
        oZ.style.display = "none";
        $('.loginUser').show();
        $('.wq-nav-right').addClass('wq-nav-right1');
    }
    var hasuser = ifHasLoginMan();
    console.log(hasuser.info)
    if (hasuser) {
        loginning(hasuser.info);
    }
    //人气玩家和土豪玩家相互切换
    var oP = document.getElementById('people');
    var oS = oP.getElementsByTagName('span');
    var oG = document.getElementById('gas');
    var oDiv = oG.getElementsByClassName('lu');
    for (var i = 0; i < oS.length; i++) {
        oS[i].onclick = function () {
            for (var i = 0; i < oS.length; i++) {
                oS[i].classList.remove('active');
                oDiv[i].classList.remove('active');
            }
            this.classList.add('active');
            oDiv[this.dataset.index].classList.add('active');
        };
    }
    //以上是人气玩家和土豪玩家相互切换
    //发送验证码
    var oYzm = document.getElementById('yzm');
    var oT = document.getElementById('t1');
    var oT2 = document.getElementById('t2');
    oYzm.onclick = function () {
        console.log(oT.value);
        $.ajax({
            url: '/yzm.do',
            data: {
                phone: oT.value

            },
            type: 'post',
            success: function (res) { //成功时候执行的函数
                //res 成功时候接受到的数据
                alert(res)
            },
            error: function (err) { //失败时候执行的函数
                //err 错误信息
            }
        });
    };

    oQ.onclick = function () {
        console.log(oT.value);
        $.ajax({
            url: '/zd.do',
            data: {
                phone: oT.value,
                code: oT2.value
            },
            type: 'post',
            success: function (res) { //成功时候执行的函数
                //res 成功时候接受到的数据
                if (!res.length) {
                    alert('该手机号未被注册，请先注册');
                    return;
                }
                if ($('.zidong').prop('checked')) {
                    loginning(res)
                } else {

                    $('#tou')[0].src = res[0].headerimg;
                    oZ.style.display = "none";
                    $('.loginUser').show();
                    $('.wq-nav-right').addClass('wq-nav-right1');
                }
                $('.close').click();
            },
            error: function (err) { //失败时候执行的函数
                //err 错误信息
            }
        });
    };
    //账号登陆
    var oLand = document.getElementById('land');
    oLand.onclick = function () {
        var user = $('#user').val();
        var pwd = $('#password').val();
        console.log(user);
        $.ajax({
            url: '/login',
            type: 'post',
            data: {
                user,
                pwd
            },
            success: function (res) {
                loginning(res);
            },
            error: function (err) {}
        })
    };



    var oT1 = document.getElementById('t1');
    var oT2 = document.getElementById('t2');
    var p1 = document.getElementById('p1');
    var p2 = document.getElementById('p2');
    var p3 = document.getElementById('p3');
    var oUser = document.getElementById('user');
    var oPassword = document.getElementById('password');
    var op11 = document.getElementById('p11');
    var op22 = document.getElementById('p22');
    var op33 = document.getElementById('p33');
    var op44 = document.getElementById('p44');

    function test() {
        var oT1 = document.getElementById('t1').value.trim();
        if (oT1.length != 0) {
            var reg = /^1[3-9]\d{9}$/;
            var r = oT1.match(reg);
            if (r == null) {
                p2.style.display = 'block';
                p1.style.display = 'none';
            } else {
                p2.style.display = 'none';
                p1.style.display = 'none';
            }
        }
        //
    }
    //账号验证
    function user() {
        var oUser = document.getElementById('user').value.trim();
        if (oUser.length != 0) {
            var reg = /^[a-zA-Z0-9_-]{6}$/;
            var r = oUser.match(reg);
            if (r == null) {
                op22.style.display = 'block';
                op11.style.display = 'none';
            } else {
                op22.style.display = 'none';
                op11.style.display = 'none';
            }
        }
    }
    //密码验证
    function password() {
        var oPassword = document.getElementById('password').value.trim();
        if (oPassword.length != 0) {
            var reg = /^[a-zA-Z0-9]{6}$/;
            var r = oPassword.match(reg);
            if (r == null) {
                op44.style.display = 'block';
                op33.style.display = 'none';
            } else {
                op44.style.display = 'none';
                op33.style.display = 'none';
            }
        }
    }

    oT1.onblur = function () {
        test();
        if (!this.value.trim()) {
            p1.style.display = 'block';
            p2.style.display = 'none';
            return false
        }
    };
    oT2.onblur = function () {
        test(this);
        if (str = oT2.value) {
            if (!str.trim()) {
                p3.style.display = 'block';
                return false
            }
        }
    };
    oUser.onblur = function () {
        user();
        if (!this.value.trim()) {
            op11.style.display = 'block';
            op22.style.display = 'none';
            return false
        }
    };
    oPassword.onblur = function () {
        password();
        if (!this.value.trim()) {
            op33.style.display = 'block';
            op44.style.display = 'none';
            return false
        }
    };

}