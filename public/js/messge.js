    $(function () {
        let UserInfo = ifHasLoginMan();
        console.log(UserInfo);
        if (!UserInfo) {
            alert('请先登录');
            location.href = "../index.html";
        }
        /* 添加到 */
        $('#tou').attr('src', '../' + UserInfo.info[0].headerimg)


        let myName = `bigLeg${UserInfo.info[0].name}`;
        var user = JSON.parse(localStorage.getItem(myName)) || [];

        function msgG() {
            /* 获取高度 */
            if (!$('.allMsg').length) {
                return
            }
            let all = $('.allMsg')
            let h = all[0].scrollHeight;
            let x = all[0].clientHeight;
            all[0].scrollTop = h - x;
        }
        Vue.filter('timeHands', time => {
            /* 获取当前的时间 */
            var nowTime = new Date();
            var m = handsTime(nowTime);
            var sendTime = new Date(time);
            var n = handsTime(sendTime);
            if (m.a == n.a && m.b == n.b && m.c == n.c) {
                let d = parseInt(n.d);
                let e = parseInt(n.e);
                if (d >= 0 && d < 6) {
                    return `凌晨 ${n.d}:${n.e}`
                } else if ((d >= 6 && d < 11) || (d == 11 && e < 30)) {
                    return `上午 ${n.d}:${n.e}`
                } else if ((d == 11 && e >= 30) || (d >= 12 && d < 13) || (d == 13 && e < 30)) {
                    return `中午 ${n.d}:${n.e}`
                } else if ((d == 13 && e >= 30) || (d >= 14 && d < 18)) {
                    return `下午 ${n.d}:${n.e}`
                } else {
                    return `晚上 ${n.d}:${n.e}`
                }

            } else if (m.a == n.a && m.b == n.b && m.c != n.c) {
                /* 年月等，日不等 */
                let o = m.c - n.c
                if (o == 1) {
                    return `昨天 ${n.d}:${n.e}`
                } else if (o == 2) {
                    return `前天 ${n.d}:${n.e}`
                }
            }
            return time;
        })
        var vm = new Vue({
            el: '#root',
            data: {
                loading: true,
                course: {
                    src: 'https://static.yay.com.cn/product/5c0e292eb837d.png',
                    name: '王者荣耀',
                    price: '7Y币/局',
                    info: '陪玩未申请开始,三分钟未开始默认取消,今天还可免费主动取消三次',
                    yes: '下单',
                    no: '取消'
                },
                course2: {
                    src: 'https://static.yay.com.cn/product/5c0e292eb837d.png',
                    name: '王者荣耀',
                    price: '7Y币/局',
                    info: '陪玩未申请开始,三分钟未开始默认取消,今天还可免费主动取消三次',
                    no: '取消'
                },
                message: { //发送的消息
                    text: '',
                    name: {
                        myName: UserInfo.info[0].name,
                        myNickname: UserInfo.info[0].nickname,
                        otherName: '',
                        otherNickname: ''
                    },
                    img: UserInfo.info[0].headerimg,
                    telphone: UserInfo.info[0].telphone,
                    time: ''
                },
                socket: io('http://172.17.2.251:80', {
                    'reconnect': true
                }),
                msgIsNull: false,
                curUser: user[0] ? user[0] : false
            },
            created() {
                let getfriend = setTimeout(() => {
                    user.forEach(v => {
                        $.ajax({
                            url: 'lookOther.do',
                            type: 'post',
                            data: {
                                user: v.name,
                                type: 0
                            },
                            success(res) {
                                try {
                                    v.nickname = res[0].nickname;
                                    v.img = '../' + res[0].headerimg;
                                    localStorage.setItem(myName, JSON.stringify(user));
                                } catch (err) {
                                    console.log('网络延迟');
                                }
                            }
                        })

                    })
                    this.loading = !this.loading;
                    clearTimeout(getfriend);
                }, 2000);
                user.forEach(item => {
                    item.cur = ''
                });
                if (this.curUser) {
                    user[0].cur = 'on';
                    user[0].count = 0;
                    this.message.otherName = user[0].name;
                    this.message.otherNickname = user[0].otherNickname;
                }
                this.socket.emit('connection', {
                    myName: this.message.name.myName,
                    myNickname: this.message.name.myNickname
                });
                this.socket.on('con', (msg) => {
                    console.log(msg.myNickname + ':加入了聊天');
                });
                this.socket.on(this.message.name.myName, function (msg) {
                    console.log(msg);
                    if (msg instanceof Array) {
                        user.splice(user.length - 1, 0, msg);
                        msg.forEach(v => {
                            var num = user.indexOf(v.name);
                            if (num != -1) {
                                v.content.forEach(v => {
                                    user.content.push(v);
                                })
                            } else {
                                user.unshift(v);
                            }
                        })
                    }
                    var {
                        a,
                        b,
                        c,
                        d,
                        e,
                        f
                    } = handsTime(new Date());
                    var time = `${a}-${b}-${c} ${d}:${e}:${f}`;
                    for (var i = 0; i < user.length; i++) {
                        if (user[i].name == msg.name.otherName) {
                            user[i].content.push({
                                time: time,
                                text: msg.text,
                                type: "0"
                            })
                            if (user[i].cur == 'on') {
                                user[i].count = 0;
                            } else {
                                user[i].count = !user[i].count ? 1 : (parseInt(user[i].count) + 1);
                                let go = user.splice(i, 1)[0];
                                user.unshift(go);
                            }
                            localStorage.setItem(myName, JSON.stringify(user));

                            return;
                        }
                    }

                    let jsonA = {
                        name: msg.name.otherName,
                        nickname: msg.name.otherNickname,
                        img: this.message.img,
                        phone: "a13333333333",
                        cur: user.length ? '' : 'on',
                        count: 1,
                        content: [{
                            time: time,
                            text: msg.text,
                            type: "0"
                        }]

                    }
                    user.unshift(jsonA);
                    localStorage.setItem(myName, JSON.stringify(user));
                    if (user.length == 1) {
                        user[0].cur = 'on';
                        user[0].count = 0;
                        vm.$data.curUser = user[0];
                    }
                });
            },
            mounted() {
                msgG();
            },
            updated() {
                msgG();
            },
            methods: {
                isShower(evt) {
                    let target = evt.target;
                    if (target.nodeName = 'LI') {
                        user.split(0);
                        let userBind = JSON.parse(localStorage.getItem(myName));
                        userBind.forEach(item => {
                            if (item[target.id] || target.id == 'all') {
                                user.push(target);
                            }
                        })
                        user.forEach(item => {
                            item.cur = ''
                        });
                        if (this.curUser) {
                            user[0].cur = 'on';
                            user[0].count = 0;
                        }
                    }
                },
                sendMessage() {
                    if (!this.message.text.trim()) {
                        this.msgIsNull = true;
                        return;
                    } else {
                        this.msgIsNull = false;
                    }
                    var {
                        a,
                        b,
                        c,
                        d,
                        e,
                        f
                    } = handsTime(new Date());
                    $.ajax({
                        url: 'lookOther.do',
                        type: 'post',
                        data: {
                            user: this.message.name.otherName,
                            type: 0
                        },
                        success:res=> {
                            var time = `${a}-${b}-${c} ${d}:${e}:${f}`
                            for (var i = 0; i < user.length; i++) {
                                if (user[i].name == this.message.name.otherName) {
                                    user[i].content.push({
                                        time: time,
                                        text: this.message.text,
                                        type: "1"
                                    });
                                    localStorage.setItem(myName, JSON.stringify(user));
                                    this.socket.emit('chat message', this.message);
                                    this.message.text = "";
                                    user[i].nickname = res[0].nickname;
                                    user[i].img = '../' + res[0].headerimg;
                                    localStorage.setItem(myName, JSON.stringify(user));
                                    return;
                                }
                            }
                            user.push({
                                name: this.message.name.otherName,
                                nickname: this.message.name.otherNickname,
                                img: "http://photocdn.sohu.com/20120216/Img334903378.jpg",
                                phone: "a13333333333",
                                cur: user.length ? '' : 'on',
                                count: 0,
                                content: [{
                                    time: time,
                                    text: this.message.text,
                                    type: "1"
                                }]
                            });
                            this.message.time = time;
                            this.socket.emit('chat message', this.message);
                            user[user.length - 1].nickname = res[0].nickname;
                            user[user.length - 1].img = '../' + res[0].headerimg;
                            localStorage.setItem(myName, JSON.stringify(user));
                            this.message.text = "";
                            if (user.length == 1) {
                                this.curUser = user[0];
                            }


                        }
                    })

                },

            },
            components: {
                'my-comother': {
                    template: "#com",
                    data() {
                        return {
                            user,
                            db:-1
                        }
                    },
                    methods: {
                        delMsg(i) {
                            var arr = user.splice(i, 1);
                            if (user[0]) {
                                if (arr[0].cur == 'on') {
                                    vm.$data.curUser = user[0];
                                    user[0].cur = 'on';
                                }
                            } else {
                                vm.$data.curUser = false;
                            }
                        },
                        altDel(i){
                            if(this.db==i){
                                this.db=-1;
                            }else{
                                this.db=i;
                            }
                        },
                        changeCur(name, index) {
                            vm.$data.message.name.otherName = name;
                            user.forEach(item => {
                                item.cur = ''
                            });
                            user[index].cur = 'on';
                            user[index].count = 0;
                            vm.$data.curUser = user[index];
                            $.ajax({
                                url: 'lookOther.do',
                                type: 'post',
                                data: {
                                    user: user[index].name,
                                    type: 0
                                },
                                success(res) {
                                    user[index].nickname = res[0].nickname;
                                    user[index].img = '../' + res[0].headerimg;
                                    localStorage.setItem(myName, JSON.stringify(user));
                                }
                            })
                        },
                        clearLocalMsg(i) {
                            var flag = confirm('确定删除本地记录?')
                            if (!flag) return;
                            var arr = user.splice(i, 1);
                            if (user[0]) {
                                if (arr[0].cur == 'on') {
                                    vm.$data.curUser = user[0];
                                    user[0].cur = 'on';
                                }
                            } else {
                                vm.$data.curUser = false;
                            }
                            localStorage.setItem(myName, JSON.stringify(user));
                        }
                    }
                }
            }
        })

        function handsTime(obj) {
            var a = obj.getFullYear(); /* 获取年 */
            var b = obj.getMonth() + 1 < 10 ? "0" + (obj.getMonth() + 1) : obj.getMonth() + 1; /* 获取月 */
            var c = obj.getDate() < 10 ? "0" + obj.getDate() : obj.getDate(); /* 获取日 */
            var d = obj.getHours() < 10 ? "0" + obj.getHours() : obj.getHours(); /* 获取小时 */
            var e = obj.getMinutes() < 10 ? "0" + obj.getMinutes() : obj.getMinutes(); /* 获取分 */
            var f = obj.getSeconds() < 10 ? "0" + obj.getSeconds() : obj.getSeconds(); /* 获取秒 */
            return {
                a,
                b,
                c,
                d,
                e,
                f
            }
        }
    })