//加载我的资料

let {showimg1,showimg2,showimg3,showimg4}={
 
}=UserInfo.info[0];
let showimgarr=[showimg1,showimg2,showimg3,showimg4];
$.each(showimgarr, function (i, v) {
    if(v=='null'||v=='NULL'||v){
        return ;
    }
    var oImg = document.createElement('img')
    $(oImg).attr('src', `..${v.user_backimg}`)
    $('.minf_backp').append(oImg)
})
var oImg = document.createElement('img');
$(oImg).attr('src', `..${UserInfo.info[0].headerimg}`);
$('.user_img').append(oImg)
//资料
var oDiv = document.createElement('div');
$(oDiv).addClass('minf_body');
$(oDiv).html(`
                           <div><span>昵称：</span><p>${UserInfo.info[0].nickname||'暂无信息'}</p></div>
                            <div><span>性别：</span><p>${UserInfo.info[0].sex||'暂无信息'}</p></div>
                            <div><span>所在地：</span><p>${UserInfo.info[0].field||'暂无信息'}</p></div>
                            <div><span>年龄：</span><p>${UserInfo.info[0].age||'暂无信息'}</p></div>
                            <div><span>兴趣爱好：</span><p>${UserInfo.info[0].like||'暂无信息'}</p></div>
                            <div><span>签名：</span><p>${UserInfo.info[0].aut||'暂无信息'}</p></div>
                            <div><span>背景墙：</span><p class="minf_backp"></p></div>
                            <span class="minf_edit">编辑</span>
                    `)
$('.minf_bodycon').append(oDiv)
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
});
//编辑按钮
function minf_edit() {
    $('.minf_edit').click(function () {
        $('.minf_body').css('display', 'none');
        $('form').css('display', 'block');
        $('form').html(`
                <div class="form_box">
                    <div class="form_lf"><span>*</span>昵称：</div>
                    <div class="form_rg"><input type="text" name="" placeholder="${user.data[0].user_nickname}"></div>
                </div>
                <div class="form_box">
                    <div class="form_lf"><span>*</span>性别：</div>
                    <div class="form_rg sexbox">
                        <div class="sexkong">
                            <div class="sexbai"></div>
                            <div class="sexcon">
                                <p class="sexman"><input type="radio"  class="sex">&nbsp男</p>
                                <p class="sexwom"><input type="radio"  class="sex">&nbsp女</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form_box">
                    <div class="form_lf"><span>*</span>年龄：</div>
                    <div class="form_rg">
                        <input type="text" placeholder="${user.data[0].user_age}">
                    </div>
                </div>
                <div class="form_box">
                    <div class="form_lf"><span></span>所在地：</div>
                    <div class="form_rg">
                        <input type="text" placeholder="${user.data[0].user_addr}">
                    </div>
                </div>
                <div class="form_box">
                    <div class="form_lf"><span></span>兴趣爱好：</div>
                    <div class="form_rg">
                        <input type="text" placeholder="${user.data[0].user_like}">
                    </div>
                </div>
                <div class="form_box textcon">
                    <div class="form_lf"><span></span>签名：</div>
                    <div class="form_rg ">
                        <textarea>${user.data[0].user_aut}</textarea>
                    </div>
                </div>
                <div class="form_box beijing">
                    <div class="form_lf beijing_top"><span>*</span>背景墙：</div>
                    <div class="form_rg ">
                        <div class="beijing1">
                            <div class="back_box"></div>
                            <div class="form_shang"><p>上传</p></div>
                        </div>
                    </div>
                </div>
                <div class="form_box">
                    <div class="form_rg ">
                        <button class="btn2">确定</button>
                        <button class="btn3">取消</button>
                    </div>
                </div>
        `);
        $.each(minf_backImg.data, function (i, v) {
            var oDiv2 = document.createElement('div');
            $(oDiv2).addClass('back');
            $(oDiv2).html(`
                <div class="bac_mask"><div class="box_mask"><span class="back_move">删除</span><span class="back_preview">预览</span></div></div>
                <img src="..${v.user_backimg}" alt="">
            `)
            $('.back_box').append(oDiv2)
        })
    });
};
minf_edit();
$('body').on('mouseenter', '.bac_mask', function () {
    $('.bac_mask').removeClass('mask_col')
    $(this).addClass('mask_col')
    $('.box_mask').css('display', 'none')
    $(this).children().css('display', 'block')
});
$('body').on('mouseleave', '.bac_mask', function () {
    $(this).removeClass('mask_col');
    $('.box_mask').css('display', 'none')
});
//删除背景墙图片
$('form').on('click', '.back_move', function () {
    var oSrc = $(this).parent().parent().next().attr('src');
    var oSrc1 = oSrc.slice(2);
    console.log(oSrc1);
    var oDiv = $(this).parent().parent().parent();
    $(oDiv).remove()
    /* minf_edit();*/
    /*$.each(minf_backImg.data,function (i,v) {
        if(oSrc1==v.user_backimg){
            console.log(i,v)
            minf_backImg.data.splice(i,1)
            console.log(minf_backImg.data)
            return
        }
    })*/
});
//预览
$('form').on('click', '.back_preview', function () {
    var oSrc = $(this).parent().parent().next().attr('src')
    var oDiv = document.createElement('div');
    $(oDiv).addClass('pre_box');
    $(oDiv).html(`
                <div class="pre_box">
                    <div class="pre_mask"></div>
                    <div class="pre_con">
                        <span class="pre_s2">×</span>
                        <img class="pre_img" src='${oSrc}' alt="">
                    </div>
                </div>
        `);
    $('.pre_body').append(oDiv)
});
//关闭预览
$('.pre_body').on('click', '.pre_s2', function () {
    $('.pre_box').remove('.pre_box');
});
//点击上传
$('form').on('click', '.form_shang', function () {
    var oDiv2 = document.createElement('div');
    $(oDiv2).addClass('back');
    $(oDiv2).html(`
                <div class="bac_mask"><div class="box_mask"><span class="back_move">删除</span><span class="back_preview">预览</span></div></div>
                <img src="..${minf_backImg.data[0].user_backimg}" alt="">
            `)
    $('.back_box').append(oDiv2)
})