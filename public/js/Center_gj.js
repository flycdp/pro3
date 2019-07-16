//可用优惠券
function Coupon(){
    $.ajax({
        url:'/Coupon',
        type:'post',
        data:{
            user_id:UserInfo.info[0].name
        },
        success:function (res) {
            if(res.error){
                console.log('数据库出错')
            }else {
                $.each(res.data,function (i,v) {
                    var num=Math.ceil((v.minReq)*(1-v.yhjPre));
                    var oDiv=document.createElement('div')
                    $(oDiv).addClass('goodJoin');
                    $(oDiv).html(`
                                <div class="joinBox">
                                    <div class="ls">
                                        <p><span>￥</span><span>${num}</span></p>
                                        <p class="p2"><b>满<span>${v.minReq}</span>可用</b></p>
                                    </div>
                                    <div class="rs">
                                        <span>${v.information}</span>
                                        <p class="p3">到期时间：<span>${v.time}</span></p>
                                    </div>
                                </div>
                                <img src="../images/yhq.png" alt="">
                        `)
                    $('.ava>.div15').append(oDiv)
                });
            }
        }
    })
};
Coupon();
$('.div10').on('click','.js_Coupon',function () {
    Coupon();
});
//不可用优惠券
function unCoupon(){
    $.ajax({
        url: '/unCoupon',
        type: 'post',
        data: {
            user_id: 1
        },
        success: function (res) {
            if (res.error) {
                console.log('数据库出错')
            } else {
                $.each(res.data,function (i,v) {
                    var num=Math.ceil((v.minReq)*(1-v.yhjPre));
                    var oDiv=document.createElement('div')
                    $(oDiv).addClass('goodJoin');
                    $(oDiv).html(`
                                <div class="joinBox">
                                    <div class="ls">
                                        <p><span>￥</span><span>${num}</span></p>
                                        <p class="p2"><b>满<span>${v.minReq}</span>可用</b></p>
                                    </div>
                                    <div class="rs">
                                        <span>${v.information}</span>
                                        <p class="p3">到期时间：<span>${v.time}</span></p>
                                    </div>
                                </div>
                                <img src="../images/yhq1.png" alt="">
                        `)
                    $('.unava>.div15').append(oDiv)
                });
            }
        }
    })
};
unCoupon();
$('.div10').on('click','.js_unCoupon',function () {
    unCoupon();
});

$('.div10 li').click(function () {
    $('.div10 li').removeClass('active1');
    $('.div10 li a').removeClass('active1');
    $('.div11>div').removeClass('active');

    $(this).addClass('active1');
    $('.div11>div').eq($(this).index()).addClass('active');
    $('.div10 li a').eq($(this).index()).addClass('active1');
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
})