    $(function () {
        var x = prompt('请输入自己的名字');
        let myName=`bigLeg${x}`;
        var user = JSON.parse(localStorage.getItem(myName))||[];
       var vm= new Vue({
            el: '#root',
            data: {
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
                message: {
                    text: '',
                    name: {
                        myName: x,
                        otherName: ''
                    }
                },
                socket: io('http://localhost:80', {
                    'reconnect': true
                }),
                msgIsNull: false,
            },
            created() {
                this.socket.emit('connection', this.message.name.myName);
                this.socket.on('con', (msg) => {
                    console.log(msg + '加入了聊天');
                });
                this.socket.on(this.message.name.myName, function (msg) {
                    alert('我接受到了' + msg.name.otherName + ':' + msg.text);
                    var {
                        a,b,c,d,e,f
                    } = handsTime(new Date());
                    var time = `${a}-${b}-${c} ${d}:${e}:${f}`;
                    for (var i = 0; i < user.length; i++) {
                        if (user[i].name == msg.name.otherName) {
                            user[i].content.unshift({
                                time: time,
                                text: msg.text,
                                type: "0"
                            })
                            localStorage.setItem(myName, JSON.stringify(user));
                            return;
                        }
                    }
                    console.log(msg.name.otherName);
                    user.push({
                        name: msg.name.otherName,
                        img: "http://photocdn.sohu.com/20120216/Img334903378.jpg",
                        phone: "a13333333333",
                        content: [{
                            time: time,
                            text: msg.text,
                            type: "0"
                        }]
                    });
                    localStorage.setItem(myName, JSON.stringify(user));
                });

            },
            methods: {
                sendMessage() {
                    if (!this.message.text.trim()) {
                        this.msgIsNull = true;
                        return;
                    } else {
                        this.msgIsNull = false;
                    }
                    var {
                        a,b,c,d,e,f
                    } = handsTime(new Date());
                    var time = `${a}-${b}-${c} ${d}:${e}:${f}`
                    for (var i = 0; i < user.length; i++) {
                        if (user[i].name == this.message.name.otherName) {
                            user[i].content.unshift({
                                time: time,
                                text: this.message.text,
                                type: "1"
                            });
                            localStorage.setItem(myName, JSON.stringify(user));
                            this.socket.emit('chat message', this.message);
                            this.message.text = "";
                            return;
                        }
                    }
                    
                    user.push({
                        name: this.message.name.otherName,
                        img: "http://photocdn.sohu.com/20120216/Img334903378.jpg",
                        phone: "a13333333333",
                        content: [{
                            time: time,
                            text: this.message.text,
                            type: "1"
                        }]
                    });
                    localStorage.setItem(myName, JSON.stringify(user));
                    this.message.text = "";
                }
            },
            components: {
                'my-comother': {
                    template: "#com",
                    data() {
                        return {
                            user,
                            count:'1'
                        }
                    },
                    methods: {

                    },
                    filters: {
                        timeHands(time) {
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
                                } else if ((d == 13 && e <= 30) || (d >= 14 && d < 18)) {
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
                        }
                    }
                }
            }
        })

        function handsTime(obj) {
            var a = obj.getFullYear(); /* 获取年 */
            var b = obj.getMonth() + 1 < 10 ? "0"+ (obj.getMonth() + 1)  : obj.getMonth() + 1; /* 获取月 */
            var c = obj.getDate() < 10 ? "0"+obj.getDate()  : obj.getDate(); /* 获取日 */
            var d = obj.getHours() < 10 ?"0"+obj.getHours()  : obj.getHours(); /* 获取小时 */
            var e = obj.getMinutes() < 10 ?"0"+ obj.getMinutes(): obj.getMinutes(); /* 获取分 */
            var f = obj.getSeconds() < 10 ? "0"+obj.getSeconds()  : obj.getSeconds(); /* 获取秒 */
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