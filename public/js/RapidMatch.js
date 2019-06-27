/* $.ajax({
    url:'game.cdp',
    type:'GET',
    success(data){//接收到游戏的图片，游戏名，当前用户的优惠券信息 若未登录则不展示优惠券信息 
        //数据渲染 
    }
})  */
window.onload = function () {
    function unableDate() {
        let now=new Date();
        let arr=now.toLocaleDateString().split('/'); 
        arr.forEach((item, index) => {
            if (item.length < 2) {
                arr[index] = "0" + item;
            }
        })
        now.setDate(now.getDate()+30);
        let arr2=now.toLocaleDateString().split('/'); 
        arr2.forEach((item, index) => {
            if (item.length < 2) {
                arr2[index] = "0"+ item;
            }
        })
        console.log(arr2.join('-')+' '+23+':'+59+':'+60);
        return {
            minDate:arr.join('-')+' '+00+':'+00+':'+60,
            maxDate:arr2.join('-')+' '+23+':'+59+':'+60
        };
    }
    let {maxDate,minDate}=unableDate()
    jeDate("#choseDate", {
        format: "YYYY-MM-DD hh:mm:ss",
        isShow: true,
        multiPane: true,
        theme: {
            bgcolor: "#FFBA06",
            pnColor: "#cccccc"
        },
        minDate, //最小日期
        maxDate //最大日期

    });
}
$(function () {
    let arrK = [];
    /* ajax接收数据  */
    var palyType = 'LOL'; //判断陪玩类型
    items = [{
            src: '../images/cdplol.png',
            name: 'LOL',
            type: '0',
            hot: '1'
        },
        {
            src: '../images/jdqs.png',
            name: '绝地求生',
            type: '0',
            hot: '1'
        },
        {
            src: '../images/apex.png',
            name: 'APEX英雄',
            type: '0',
            hot: '0'
        },
        {
            src: '../images/qjcj.png',
            name: '全军出击',
            type: '0',
            hot: '0'
        },
        {
            src: '../images/dtzzq.png',
            name: '刀塔自走棋',
            type: '1',
            hot: '0'
        },
        {
            src: '../images/hpjy.png',
            name: '和平精英',
            type: '1',
            hot: '0'
        },
        {
            src: '../images/wzry.png',
            name: '王者荣耀',
            type: '1',
            hot: '1'
        },
        {
            src: '../images/wxfz.png',
            name: '无限法则',
            type: '1',
            hot: '0'
        }

    ];
    var yhq = [{
            name: ['9.5', '折', '最高减10'],
            information: '新用户全品9.5折优惠',
            time: '2019-06-29 15:22:42',
            limit: '全品'
        },
        {
            name: ['9', '折', '最高减10'],
            information: 'LOL9折优惠',
            time: '2019-07-23 15:22:42',
            limit: 'LOL'
        },
        {
            name: ['9', '折', '最高减10'],
            information: 'LOL9折优惠',
            time: '2019-07-23 15:22:42',
            limit: 'LOL'
        },
        {
            name: ['9', '折', '最高减20'],
            information: 'LOL9折优惠',
            time: '2019-07-23 15:22:42',
            limit: 'LOL'
        },
        {
            name: ['6', '折', '最高减10'],
            information: 'LOL6折优惠',
            time: '2019-06-29 15:22:42',
            limit: 'LOL'
        },
        {
            name: ['9', '折', '最高减10'],
            information: '王者荣耀9折优惠',
            time: '2019-07-23 15:22:42',
            limit: '王者荣耀'
        },
        {
            name: ['9', '折', '最高减10'],
            information: '新用户全品9折优惠',
            time: '2019-07-23 15:22:42',
            limit: 'LOL'
        },
        {
            name: ['8', '折', '最高减10'],
            information: '新用户全品8折优惠',
            time: '2019-06-23 15:22:42',
            limit: 'LOL'
        },
        {
            name: ['8', '折', '最高减10'],
            information: '绝地求生8折优惠',
            time: '2019-06-23 15:22:42',
            limit: '绝地求生'
        }

    ]
    getList(items);

    function getList(data) {
        var flag = lookUpCheap();
        var {
            bestCheap,
            bestGoods,
            ableYhq,
            unableYhq
        } = flag;
        new Vue({
            el: "#root",
            data: {
                items: data,
                hot: false,
                bestCheap,
                bestGoods,
                flag,
                cur0: 'cur',
                cur1: '',
                flagX: true,
                yhqSel: true,
                countNum: 1,
                playerGame: name,
                ableYhq: ableYhq || [],
                yhq,
                unableYhq: unableYhq || yhq
            },
            created() {
                this.yhqSelHandler();


            },
            methods: {
                submit() {
                    if (true) {
                        /* 登录状态 */
                        console.log($('[type=datetime-local]').val());
                        console.log($('choseCount').val());
                    }

                },
                myChoseYhq(i) {
                    this.yhqSel = true;
                    this.bestCheap = ableYhq[i].info;
                    this.bestGoods = ableYhq[i];
                    $('.price').text(this.countNum * 32 - this.bestCheap);
                },
                lookMore() {
                    var time = setTimeout(function () {
                        $('.modal-backdrop').appendTo($('#root'));
                        clearTimeout(time);
                    }, 300)
                },
                toggle(type) {
                    document.querySelectorAll('.gameList>li').forEach(item => {
                        item.style.display = item.dataset.type == type ? 'block' : 'none'
                    })
                    this.cur0 = '';
                    this.cur1 = '';
                    this['cur' + type] = 'cur';


                },
                changeYhq() {
                    this.flag = lookUpCheap();
                    this.bestCheap = this.flag.bestCheap;
                    this.unableYhq = this.flag.unableYhq;
                    this.ableYhq = this.flag.ableYhq;
                    this.bestGoods = this.flag.bestGoods;
                },
                listClassOn(index, name) {
                    $('#uk4').removeClass('hide');
                    $('#uk3').removeClass('hide');
                    $('#uk2').removeClass('hide');
                    arrK.length = 0;
                    $('#dropdownMenu1').html(`<i>全部等级分类</i>
                                        <span class="caret"></span>`)
                    $('#dropdownMenu2').html(`
                     <i>全部区服</i>
                     <span class="caret"></span>
                     `)
                    $('#dropdownMenu3').html(`
                     <i>全部游戏水平</i>
                                        <span class="caret"></span>
                     `)
                    $('#dropdownMenu4').html(`
                     <i>Ta的个性标签</i>
                     `).removeClass('on');
                    document.querySelectorAll('.gameList>li').forEach((item, i) => {
                        if (i == index) {
                            item.classList.add('on');
                            palyType = name;
                            this.playerGame = name;
                            if (!item.querySelector('div')) return;

                            item.querySelector('div').style.display = 'none'


                        } else {
                            item.classList.remove('on');
                            if (!item.querySelector('div')) return;
                            item.querySelector('div').style.display = 'block';
                        }
                    })
                    this.changeYhq();
                    if (name.toLocaleLowerCase() == 'lol' || name == '王者荣耀') {
                        $('#uk4').removeClass('hide');
                        $('#uk3').removeClass('hide');
                        $('#uk2').removeClass('hide');
                        $('#uk4 .dropdown-menu').html(`
                        <li><a href="javascript:" class="on">风骚走位</a></li>
                        <li><a href="javascript:">无敌打野</a></li>
                        <li><a href="javascript:">带飞</a></li>
                        <li><a href="javascript:">细心教学</a></li>
                        <li><a href="javascript:">暖心辅助</a></li>
                        <li><a href="javascript:">中单法王</a></li>
                        <li><a href="javascript:">会喊666</a></li>
                        <li><a href="javascript:">战士边路</a></li>
                        <li><a href="javascript:">坦克</a></li>`)
                        if (name.toLocaleLowerCase() == 'lol') {
                            $('#uk3 .dropdown-menu').html(`
                            <li><a href="javascript:" class="on">全部等级分类</a></li>
                            <li><a href="javascript:">黑铁</a></li>
                            <li><a href="javascript:">青铜</a></li>
                            <li><a href="javascript:">白银</a></li>
                            <li><a href="javascript:">黄金</a></li>
                            <li><a href="javascript:">铂金</a></li>
                            <li><a href="javascript:">砖石</a></li>
                            <li><a href="javascript:">大师</a></li>
                            <li><a href="javascript:">王者</a></li>
                            `)
                            $('#uk2 .dropdown-menu').html(`
                            <li><a href="javascript:" class="on">全部区服</a></li>
                            <li><a href="javascript:">艾欧尼亚</a></li>
                            <li><a href="javascript:">祖安</a></li>
                            <li><a href="javascript:">洛克萨斯</a></li>
                            <li><a href="javascript:">黑色玫瑰</a></li>
                            <li><a href="javascript:">钢铁烈阳</a></li>
                            <li><a href="javascript:">均衡教派</a></li>
                            <li><a href="javascript:">守望先锋</a></li>
                            <li><a href="javascript:">守望先锋</a></li>
                            <li><a href="javascript:">守望先锋</a></li>
                            <li><a href="javascript:">守望先锋</a></li>
                            `)
                        } else {
                            console.log(name);

                            $('#uk3 .dropdown-menu').html(`

                            <li><a href="javascript:" class="on">全部等级分类</a></li>
                            <li><a href="javascript:">青铜</a></li>
                            <li><a href="javascript:">白银</a></li>
                            <li><a href="javascript:">黄金</a></li>
                            <li><a href="javascript:">铂金</a></li>
                            <li><a href="javascript:">砖石</a></li>
                            <li><a href="javascript:">星耀</a></li>
                            <li><a href="javascript:">王者</a></li>
                            <li><a href="javascript:">荣耀王者</a></li>
                            `)
                            $('#uk2 .dropdown-menu').html(`
                            <li><a href="javascript:" class="on">全部区服</a></li>
                            <li><a href="javascript:">手q安卓</a></li>
                            <li><a href="javascript:">手q苹果</a></li>
                            <li><a href="javascript:">微信安卓</a></li>
                            <li><a href="javascript:">微信苹果</a></li>
                            `)
                        }
                    } else {
                        $('#uk4 .dropdown-menu').html('');
                        $('#uk3 .dropdown-menu').html('');
                        $('#uk4').addClass('hide');
                        $('#uk3').addClass('hide');

                        if (name == "和平精英" || name == "全军出击" || name == "无限法则") {
                            $('#uk2 .dropdown-menu').html(`
                            <li><a href="javascript:" class="on">全部区服</a></li>
                            <li><a href="javascript:">手q安卓</a></li>
                            <li><a href="javascript:">手q苹果</a></li>
                            <li><a href="javascript:">微信安卓</a></li>
                            <li><a href="javascript:">微信苹果</a></li>
                            `)
                        } else {
                            $('#uk2 .dropdown-menu').html(``);
                            $('#uk2').addClass('hide');
                        }
                    }
                    console.log(this.flag);
                    var dd = $('.dropdown');
                    $('.otherMainBox').height(dd[dd.length - 1].offsetHeight + dd[dd.length - 1].offsetTop + 50);
                },
                isHot(flag) {
                    return flag == '1' ? true : false;
                },
                spreadclick() {
                    if (this.flagX) {
                        $('.spread span').addClass('on');
                        var dd = $('.dropdown');
                        let count = 0;
                        dd.show(300, function () {
                            count++;
                            if (count == dd.length) {

                                $('.otherMainBox').height(dd[dd.length - 1].offsetHeight + dd[dd.length - 1].offsetTop + 50);

                            }
                        });
                    } else {
                        $('.spread span').removeClass('on');
                        var dd = $('.dropdown');
                        let count = 0;
                        dd.hide(300, function () {
                            count++;
                            if (count == dd.length) {
                                $('.otherMainBox').height(0)
                            }


                        })
                    }
                    this.flagX = !this.flagX;

                },
                dropdownMenuclick(evt) {
                    if (evt.target.nodeName == "A") {
                        var that = $(evt.target).parent();
                        var sel = '#' + $(that).parent()[0].getAttribute('aria-labelledby');
                        if ($(that).parent().parent().children('h5').text() == '标签') {
                            if ($(sel).children('i').length > 2) {
                                return;

                            }
                            if ($(sel).children('i').text() == 'Ta的个性标签') {
                                $(sel).children('i').html(`${$(that).text()}<div class="del">X</div>`);
                                $(sel).addClass('on');

                            } else {
                                $(sel).append(`<i>${$(that).text()}<div class="del">X</div><i>`)
                            }
                            arrK.push($(that))
                            $(that).hide();
                            $(that).children('a').addClass('on').parent().siblings().children('a').removeClass('on');
                            return;
                        }
                        $(that).children('a').addClass('on').parent().siblings().children('a').removeClass('on');
                        $(sel + '>i').text($(that).text());
                    }

                },
                yhqSelHandler() {
                    let str = this.countNum;
                    let num = parseInt(str);
                    if (num <= 0 || !str) {
                        this.countNum = 1;
                        $('.price').text(32);
                        this.yhqSel = false;
                    }
                    if (num < 1 || !num) {
                        this.countNum = 1;
                        num = 1;
                    }
                    if (!this.yhqSel) {
                        $('.price').text(num * 32 - this.bestCheap);
                    } else {
                        $('.price').text(num * 32);
                    }
                    this.yhqSel = !this.yhqSel;
                },
                isNumber(val) {

                    let str = val.trim();
                    /*  记录之前的值*/
                    let bindYhqSel = this.yhqSel;
                    $('.price').text(0);
                    this.yhqSel = false;
                    let num = parseInt(str);
                    if (str && num > 0) {
                        /* 满足条件会检索 */
                        this.countNum = num;
                        this.changeYhq();
                        if (bindYhqSel) {
                            $('.price').text(num * 32 - this.bestCheap);
                        } else {
                            $('.price').text(num * 32);
                        }
                        this.yhqSel = bindYhqSel;
                    }
                },
                conutBlur(val) {
                    let str = (val + "").trim();
                    let num = parseInt(str);
                    if (num <= 0 || !str) {
                        this.countNum = 1;
                        this.changeYhq();
                        $('.price').text(32);
                        this.yhqSel = false;
                    }
                }
            }
        })
    }
    /* 选择男神女神 */
    $('#chooseSex>span').click(function () {
        $('#chooseSex>.on').removeClass('on');
        $(this).addClass('on');
    });

    function maxGood(discount, maxCheap) {
        discount = Number(discount);
        maxCheap = Number(maxCheap);
        /* 总金额 */
        let num = $('#choseCount').val() == 0 ? 1 : $('#choseCount').val();
        var allMoney = num * 32;
        var cheap = (10 - discount) * allMoney / 10; //便宜的金额;
        if (cheap > maxCheap) return maxCheap;
        return cheap;
    }
    /* 查阅优惠券 */
    function lookUpCheap() {
        /* 拿到所有优惠券中对本次优惠力度最大的 */
        var ableYhq = [];
        var unableYhq = [];
        yhq.forEach(item => {
            /* 搜索关键词 */
            if (item.limit.toLocaleLowerCase() == palyType.toLocaleLowerCase() || item.limit == '全品') {
                ableYhq.push(item);

                return;
                //goodList.push([item.name[0],item.name[2].substring(3)])
            }
            unableYhq.push(item);
        })
        if (!ableYhq.length) {
            /* 没有优惠 */
            return false
        }
        /* 从能使用的优惠的选择出来 */
        let bestCheap = 0;
        let bestGoods = null;
        ableYhq.forEach((item) => {
            let good = maxGood(item.name[0], item.name[2].substring(3));
            item.info = good;
            if (good > bestCheap) {
                bestCheap = good;
                bestGoods = item;
            }
        })
        return {
            bestCheap,
            bestGoods,
            ableYhq,
            unableYhq
        }
    }
    $('.dropdown').on('click', '#dropdownMenu4.on>i>div', function () {
        if ($(this).parent().parent().children('i').length == 1) {
            $(this).parent().parent().append('<i>Ta的个性标签<i>').removeClass('on');
        }
        $(this).parent().remove();
        arrK[$(this).index()].show();
        arrK.splice($(this).index(), 1);
        return false;
    })
})