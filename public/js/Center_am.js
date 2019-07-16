//插入收入和余额
function userBal() {
    $.ajax({
        url:'/userBal',
        type:'post',
        data:{
            user_id:1
        },
        success:function (res) {
            if (res.error){
                console.log('数据库出错')
            }else {
                $('.div12').html(' ');
                var oDiv=document.createElement('div')
                $(oDiv).html(`
                            <div class="div13">
                                <span></span>
                                <span>我的余额</span>
                                <span><strong>${res.data[0].userBalm}</strong><b>Y</b></span>
                            </div>
                            <div class="div13">
                                <span></span>
                                <span>我的收入</span>
                                <span><strong>${res.data[0].userIncm}</strong><b>Y</b></span>
                            </div>
                            <div class="div13">
                                <button class="btn2">转入余额</button>
                                <button class="btn3">充值</button>
                            </div>
                    `);
                $('.div12').html(oDiv)
            }
        }
    });

};
userBal();

//交易信息
function tran(){
    $.ajax({
        url:'/tranDet',
        type:'post',
        data:{
            user_id:1
        },
        success:function (res) {
            if(res.error){
                console.log('数据库出错')
            }else {
                $('tbody').html(' ')
                var arr=res.data;
                $.each(arr,function (i,v) {
                    var money;
                    var oDate;
                    if (arr[i].rechargeNum){
                        money=arr[i].rechargeNum
                        oDate=arr[i].rechargeDate;
                    };
                    if(arr[i].yhjPre){
                        money=(arr[i].price)*arr[i].yhjPre
                        oDate=arr[i].date
                    };
                    if(arr[i].giftId){
                        money=arr[i].price
                        oDate=arr[i].sendTime
                    }
                    var oTr=document.createElement('tr')
                    $(oTr).html(`
                            <td class="td1">${v.code}</td>
                            <td>${v.moneyClass}</td>
                            <td class="col-write"></td>
                            <td>${v.moneyDes}</td>
                            <td>${oDate}</td>`)
                    if($(oTr).children().eq(1).html()=="进账"){
                        $(oTr).children().eq(2).addClass('col-red')
                        $(oTr).children().eq(2).html(`+${money}`)
                    }else {
                        $(oTr).children().eq(2).addClass('col-skyblue')
                        $(oTr).children().eq(2).html(`-${money}`)
                    }
                    $('tbody').append(oTr)

                });
                var iNow=arr.length;
                var oH=iNow*62;
                if (oH>300) {
                    var oH2=oH+120;
                    var oHC=oH+400;
                    $('.div11 .am1 .div14').css("height",oH2);
                    $('#content').css("height",oHC)
                }
            }
        }
    });
};
tran();

$('.div10').on('click','.js_am',function () {
    userBal();
    tran();
});
$('.div11').on('click','.btn3',function () {
    $('.js_am').removeClass('active1');
    $('.js_am a').removeClass('active1');
    $('.am1').removeClass('active');
    $('.js_rec').addClass('active1');
    $('.js_rec a').addClass('active1');
    $('.Rec').addClass('active');
});
//扫描二维码
$('.Rec_box').on('click','.Rec_img',function () {
    var money=($('.Rec_money').html())/1+($('.active3>span').html())/1;
    var des=$('.Rec_payc').html()
    $.ajax({
        url:'/recMoney',
        type:'post',
        data:{
            user_id:1,
            money:money,
            moneydes:des
        },
        success:function (res) {
            if(res.error){
                alert('充值失败')
            }else {
                alert('充值成功')
                $('.Rec_box').css('display','none')
            }

        }
    })
})


$('.div10').on('click','.js_rec',function () {
    $('#content').css('height','980')
});
$('.div10 li').click(function () {
    $('.div10 li').removeClass('active1');
    $('.div10 li a').removeClass('active1');
    $('.div11>div').removeClass('active');

    $(this).addClass('active1');
    $('.div11>div').eq($(this).index()).addClass('active');
    $('.div10 li a').eq($(this).index()).addClass('active1');
});

//充值方式
$('.pame>div').click(function () {
    $('.pame div').removeClass('active4');
    $('.pame>div div').removeClass('ritop')
    $(this).addClass('active4');
    /*$('.pame>div div').eq($(this).index()).addClass('ritop');*/
    $(this).children().eq(0).addClass('ritop')
});

//充值须知
$('.Rec_xuzi input').click(function () {
    if ($(this.checked).length) {
        $('.Rec .Rec_foot button').addClass('btn4')
    }else {
        $('.Rec .Rec_foot button').removeClass('btn4')
    }
});

//点击充值
$('.Rec_foot').on('click','.btn4',function () {
    $('.Rec_money').html(' ')
    $('.Rec_box').css('display','block');
    var oMun=$('.Rec_foot span').html();
    $('.Rec_money').html(oMun);
    var oStr=$('.active4').children().eq(2).html();
    $('.Rec_payc').html(oStr);
    if (oStr=='微信'){
        $('.Rec_img').attr('src','../images/pay_img1.png');
    }else {
        $('.Rec_img').attr('src','../images/pay_img2.png');
    }
});
$('.Rec_s2').click(function () {
    $('.Rec_box').css('display','none')
});

$('.div18').click(function () {
    $('.div18 .num').removeClass('active2');
    $('.div18 .give-fee').removeClass('active3');
    $('.div18 .num').eq($(this).index()).addClass('active2');
    $('.div18 .give-fee').eq($(this).index()).addClass('active3');
    var num=$(this).children().children().html();
    $('.Rec_foot span').html(num)

})
$('.div19 input').on("input",function () {
    var num=$(this).val()
    if (num>100000){
        alert('你输入的金额过大，一次充值最多为10万元')
        return
    } else if(num<0){
        alert('金额不能为负')
        return
    }
    $('.Rec_foot span').html(num)
});
$('.div7 a').click(function () {
    $('.div7 b').removeClass('active-show');
    $('.div7 .s5').removeClass('active-color');
    $(this).children(0).children(0).addClass('active-show');
    $(this).children(1).addClass('active-color');
});
$('.div7 a').mouseover(function () {
    $('.div7 b').removeClass('active-show1');
    $('.div7 .s5').removeClass('active-color1');
    $(this).children(0).children(0).addClass('active-show1');
    $(this).children(1).addClass('active-color1');
});
$('.div7 a').mouseleave(function () {
    $('.div7 b').removeClass('active-show1');
    $('.div7 .s5').removeClass('active-color1');
});