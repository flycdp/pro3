var iNow;
var vip=[50,100,400,1200,3000,6000,12000,24000,48000,96000];
var xxx;
//会员加载
function mem(){
    $.ajax({
        url:'/mem',
        type:'post',
        data:{
            user_id:UserInfo.info[0].name
        },
        success:function (res) {
            if(res.error){
                console.log('数据库出错')
            }else {
                function run(){
                    for(var i=0;i<vip.length;i++){
                        if (vip[i]>res.data[0].recTotal){
                            return i
                        }
                    }
                };
                xxx=res.data[0].recTotal
                iNow=run();
                var x=iNow*70;
                var x1=(iNow+1)*70;
                var oDiv=document.createElement('div');
                var num=vip[iNow]-res.data[0].recTotal;
                var per=((res.data[0].recTotal/vip[iNow]*100))+'%';

                $(oDiv).addClass('mem_hedcon');
                $(oDiv).html(`
                            <div class="mem_leve">VIP等级</div>
                            <div class="mem_levezhong"></div>
                            <div class="mem_vipbox">
                                <div class="vip_alert">

                                </div>
                                <div class="men_vipmask"></div>
                                <div class="mem_prob"></div>
                            </div>
                            <div class="mem_levemo"></div>
                            <p class="mem_levecon">距离升级&nbspVIP${iNow+1}&nbsp还差：<span>${num}</span>经验</p>
                    `)
                $('.mem_header').append(oDiv);
                $('.mem_levezhong').css({'background-position-x':`-${x}px`,'background-position-y':'0px'});
                $('.mem_levemo').css({'background-position-x':`-${x1}px`,'background-position-y':'0px'});
                $('.men_vipmask').css('width',`${per}`)
                //移入vip经验条
                $('.div11').on('mouseenter','.mem_vipbox',function () {
                    var oDiv=document.createElement('div');
                    $(oDiv).addClass('alerbody');
                    $(oDiv).html(`
                                 <div class="alertbox"><span>经验:${res.data[0].recTotal}</span></div>
                                 <div class="alertdown"></div>
                        `);
                    $('.vip_alert').append(oDiv);
                });
            }
        }
    });
};
mem();

$('.div11').on('mouseleave','.mem_vipbox',function () {
    $('.alerbody').remove();
});

$('.div10 li').click(function () {
    $('.div10 li').removeClass('active1');
    $('.div10 li a').removeClass('active1');
    $(this).addClass('active1');
    $('.div10 li a').eq($(this).index()).addClass('active1');
})
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