$('.div10 li').click(function () {
    $('.div10 li').removeClass('active1');
    $('.div10 li a').removeClass('active1');
    $('.div11>div').removeClass('active');
    $(this).addClass('active1');
    $('.div11>div').eq($(this).index()).addClass('active');
    $('.div10 li a').eq($(this).index()).addClass('active1');

});

function myorder(){
    $.ajax({
        url:'/myorder',
        type:'POST',
        data:{
            user_id:UserInfo.info[0].name
        },
        success:function (res) {
            if(res.error){
                console.log('数据库出错')
            }else {
                var arr=res.data;
                $('.div11 .active>ul').html(' ');
                $.each(arr,function (i,v) {
                    var oLi=document.createElement('li');
                    var money=(v.price)*(v.yhjPre);
                    var money1=(v.price)-money;
                    oLi.innerHTML=`
                        <div class="div12"><span class="s6">订单编号：${v.code}</span><span class="s7">订单${v.order_sta}</span></div>
                            <div class="div13">
                                <div class="div14">
                                    <a href="">
                                        <img src="..${v.headerimg}" alt="" class="img3"><p class="p3">聊一聊</p>
                                    </a>
                                </div>
                                <div class="div-left">
                                    <dl>
                                        <dt>${v.name}🍥下单秒接</dt>
                                        <dd>品类：<span class="s8">${v.service_name}</span></dd>
                                        <dd>备注：<span class="s8">${v.textintroduction}</span></dd>
                                    </dl>
                                </div>
                                <div class="div-right">
                                    <dl>
                                        <dt>预约时间： <span> ${v.date}</span></dt>
                                        <dd>实际支付：<span class="s9">${money}Y币</span></dd>
                                        <dd><span class="s9">已优惠${money1}Y币</span></dd>
                                    </dl>
                                </div>
                            </div>
        `;
                    $('.div11 .active>ul').append(oLi);
                });
                if($('.div11 .active>ul li').length>3){
                    var iNow=$('.div11 .all_dingdan>ul li').length+2;
                    var oH=iNow*200-20;
                    $('#content').css('height',`${oH}`);
                }
            }
        }
    });
};
//myorder
//post
//content:用户id
//date{error：0；data}
myorder();
//所有订单
$('.div10').on('click','.li_all',function () {
    myorder();
});
//待付款
$('.div10').on('click','.li_dai',function () {
    $.ajax({
        url:'/daiorder',
        type:'POST',
        data:{
            user_id:1
        },
        success:function (res) {
            if(res.error){
                console.log('数据库出错')
            }else {
                var arr=res.data;
                $('.div11 .active>ul').html(' ');
                $.each(arr,function (i,v) {
                    var oLi=document.createElement('li');
                    var money=(v.price)*(v.yhjPre);
                    var money1=(v.price)-money;
                    oLi.innerHTML=`
                        <div class="div12"><span class="s6">订单编号：${v.code}</span><span class="s7">订单${v.order_sta}</span></div>
                            <div class="div13">
                                <div class="div14">
                                    <a href="">
                                        <img src="..${v.headerimg}" alt="" class="img3"><p class="p3">聊一聊</p>
                                    </a>
                                </div>
                                <div class="div-left">
                                    <dl>
                                        <dt>${v.name}🍥下单秒接</dt>
                                        <dd>品类：<span class="s8">${v.service_name}</span></dd>
                                        <dd>备注：<span class="s8">${v.textintroduction}</span></dd>
                                    </dl>
                                </div>
                                <div class="div-right">
                                    <dl>
                                        <dt>预约时间： <span> ${v.date}</span></dt>
                                        <dd>实际支付：<span class="s9">${money}Y币</span></dd>
                                        <dd><span class="s9">已优惠${money1}Y币</span></dd>
                                    </dl>
                                </div>
                            </div>
        `;
                    $('.div11 .active>ul').append(oLi);
                });
                if($('.div11 .active>ul li').length>=3){
                    var iNow=$('.div11 .dai_dingdan>ul li').length+2;
                    var oH=iNow*200-20;
                    $('#content').css('height',`${oH}`);
                }else {
                    $('#content').css('height','680px');
                }
            }
        }
    });
});
//进行中
$('.div10').on('click','.li_jing',function () {
    $.ajax({
        url:'/jingorder',
        type:'POST',
        data:{
            user_id:1
        },
        success:function (res) {
            if(res.error){
                console.log('数据库出错')
            }else {
                var arr=res.data;
                $('.div11 .active>ul').html(' ');
                $.each(arr,function (i,v) {
                    var oLi=document.createElement('li');
                    var money=(v.price)*(v.yhjPre);
                    var money1=(v.price)-money;
                    oLi.innerHTML=`
                        <div class="div12"><span class="s6">订单编号：${v.code}</span><span class="s7">订单${v.order_sta}</span></div>
                            <div class="div13">
                                <div class="div14">
                                    <a href="">
                                        <img src="..${v.headerimg}" alt="" class="img3"><p class="p3">聊一聊</p>
                                    </a>
                                </div>
                                <div class="div-left">
                                    <dl>
                                        <dt>${v.name}🍥下单秒接</dt>
                                        <dd>品类：<span class="s8">${v.service_name}</span></dd>
                                        <dd>备注：<span class="s8">${v.textintroduction}</span></dd>
                                    </dl>
                                </div>
                                <div class="div-right">
                                    <dl>
                                        <dt>预约时间： <span> ${v.date}</span></dt>
                                        <dd>实际支付：<span class="s9">${money}Y币</span></dd>
                                        <dd><span class="s9">已优惠${money1}Y币</span></dd>
                                    </dl>
                                </div>
                            </div>
        `;
                    $('.div11 .active>ul').append(oLi);
                });
                if($('.div11 .active>ul li').length>3){
                    var iNow=$('.div11 .jing_fukuan>ul li').length+2;
                    var oH=iNow*200-20;
                    $('#content').css('height',`${oH}`);
                }else {
                    $('#content').css('height','680px');
                }
            }
        }
    });
});
//已完成
$('.div10').on('click','.li_yi',function () {
    $.ajax({
        url:'/yiorder',
        type:'POST',
        data:{
            user_id:1
        },
        success:function (res) {
            if(res.error){
                console.log('数据库出错')
            }else {
                var arr=res.data;
                $('.div11 .active>ul').html(' ');
                $.each(arr,function (i,v) {
                    var oLi=document.createElement('li');
                    var money=(v.price)*(v.yhjPre);
                    var money1=(v.price)-money;
                    oLi.innerHTML=`
                        <div class="div12"><span class="s6">订单编号：${v.code}</span><span class="s7">订单${v.order_sta}</span></div>
                            <div class="div13">
                                <div class="div14">
                                    <a href="">
                                        <img src="..${v.headerimg}" alt="" class="img3"><p class="p3">聊一聊</p>
                                    </a>
                                </div>
                                <div class="div-left">
                                    <dl>
                                        <dt>${v.name}🍥下单秒接</dt>
                                        <dd>品类：<span class="s8">${v.service_name}</span></dd>
                                        <dd>备注：<span class="s8">${v.textintroduction}</span></dd>
                                    </dl>
                                </div>
                                <div class="div-right">
                                    <dl>
                                        <dt>预约时间： <span> ${v.date}</span></dt>
                                        <dd>实际支付：<span class="s9">${money}Y币</span></dd>
                                        <dd><span class="s9">已优惠${money1}Y币</span></dd>
                                    </dl>
                                </div>
                            </div>
        `;
                    $('.div11 .active>ul').append(oLi);
                });
                if($('.div11 .active>ul li').length>3){
                    var iNow=$('.div11 .wancheng_fukuan>ul li').length+2;
                    var oH=iNow*200-20;
                    $('#content').css('height',`${oH}`);
                }else {
                    $('#content').css('height','680px');
                }
            }
        }
    });
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