$('.head').click(function () {
    $('.head').removeClass('active');
    $('.head').parent().removeClass('active1');
    $(this).addClass('active');
    $(this).parent().addClass('active1');
});
let banner={
    data:[
        {
            src:'https://static.yay.com.cn/banner/5be4ed3d4e457.jpg',
            target:'＃',
        },
        {
            src:'https://static.yay.com.cn/banner/5c753b73ed50a.png',
            target:'＃',
        }
    ]
}
$.each(banner.data,function(i,v){
    let oDiv=document.createElement('div');
    $(oDiv).addClass('swiper-slide');
    $(oDiv).html(`
        <a href="${v.target}">
            <img src="${v.src}">
        </a>
    `);
    $('.swiper-wrapper').append(oDiv);
});
var mySwiper = new Swiper ('.swiper-container', {
    loop: true,
    autoplay:true,
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })        
let news={
    data:[
        {
            url:'https://static.yay.com.cn//article/5d0c9209c4db7.jpg',
            tag:'《刀塔霸业》',
            title:'《刀塔霸业》开启全面开放测试，各大主流平台上线',
            dateTime:'2019-6-21 16:15:31',
            click:'9',
            discuss:'0',
            con:'《刀塔霸业》于6月21日正式开启了全面公测，现已登陆Steam和iOS/Android(Google Play)平台。'
        },
        {
            url:'https://static.yay.com.cn//article/5d0b5043a44e1.jpg',
            tag:'《轩辕剑·苍之曜》',
            title:'《轩辕剑:苍之曜》七月正式上线，再现动画战斗！',
            dateTime:'2019-6-21 13:15:31',
            click:'9',
            discuss:'0',
            con:'《《轩辕剑苍之曜》宣布即将於七月展开封闭删档测试。'
        },
        {
            url:'https://static.yay.com.cn//article/5d0aeeffae9a7.jpg',
            tag:'公告',
            title:'YAY交友公平运营处理公告-2019年6月20日',
            dateTime:'2019-6-20 13:15:31',
            click:'9',
            discuss:'0',
            con:'YAY交友严查大神走私单，邀请用户走私单等行为，一经查实，立即封号封技能，账户清零，绝不收手软。'
        },
        {
            url:'https://static.yay.com.cn//article/5d0a000063ba0.jpg',
            tag:'《守望先锋》',
            title:'《守望先锋》最新主题活动 快来领取自己的专属奖励！',
            dateTime:'2019-6-20 13:15:31',
            click:'9',
            discuss:'0',
            con:'《守望先锋》又推出新的主题活动，巴蒂斯特的大挑战，用户只要在游戏中获胜即可解锁头像、喷漆和战地医生巴蒂斯特的皮肤。'
        },
        {
            url:'https://static.yay.com.cn//article/5d034d5e70876.jpg',
            tag:'《篮球计划》，篮球格斗',
            title:'《篮球计划》正式在暑期上线，再度解锁新人物！',
            dateTime:'2019-6-20 13:15:31',
            click:'9',
            discuss:'0',
            con:'全新角色马修正式进驻《篮球计划》，从目前曝光的宣传视频来看，画面炫酷依旧，新人物也是潮爆登场，并且整体可操控性非常强。'
        },
        {
            url:'https://static.yay.com.cn//article/5d02046436cf1.png',
            tag:'《罪恶王冠》，手游',
            title:'日本超人气动漫《罪恶王冠》正版手游，将于6月20日双平台上线！',
            dateTime:'2019-6-20 13:15:31',
            click:'9',
            discuss:'0',
            con:'DeNA 6月13日公开宣布，日本Aniplex 株式会社正版授权改编的手机游戏《罪恶王冠》将于6 月20 日双平台正式上线！'
        },
        {
            url:'https://static.yay.com.cn//article/5d00ab8c50fdb.png',
            tag:'《火星漫游》、vr',
            title:'《黑暗之魂》全国上线，直至今日突破2500万份大关',
            dateTime:'2019-6-20 13:15:31',
            click:'9',
            discuss:'0',
            con:' Winking Entertainment发行商与国产开发商海豚互娱开发的新产品《火星漫游》共同宣布，将在今年的六月二十号发布于PS VR平台上。'
        },
        {
            url:'https://static.yay.com.cn//article/5cf6348243b7b.jpg',
            tag:'王者荣耀，蓝buff',
            title:'法师拿到蓝buff后技术能力翻倍，伤害力up！up！up!',
            dateTime:'2019-6-20 13:15:31',
            click:'9',
            discuss:'0',
            con:'甄姬、米莱狄、貂蝉、王昭君拿到蓝buff后伤害技能不断提成，提升游戏胜利速度！'
        },
        {
            url:'https://static.yay.com.cn//article/5cf0bfe79fc82.jpg',
            tag:'《节奏光剑》，《POP/STAR》',
            title:'《英雄联盟》K/DA主题曲《POP/STARS》还爆《节奏空间》',
            dateTime:'2019-6-20 13:15:31',
            click:'9',
            discuss:'0',
            con:'《POP/STARS》已经加入了《节奏空间》，同时官方放出了一段实机演示视频，短短的几十秒也是爆点满满，瞬间调动起玩家情绪，沉浸感十足。'
        }
    ]
};

$('window').ready(function(){
    $.each(news.data,function(i,v){
        let oDiv=document.createElement('div');
        $(oDiv).addClass('news');
        $(oDiv).html(`<a href="#">
            <div class="newsImg">
                <img src="${v.url}">
            </div>
            <div class="newsCon">
                <ul class="tag">
                    <li>${v.tag}</li>
                </ul>
                <p class="newsTitle">${v.title}</p>
                <div class="newsInfo">
                    <span class="firInfo">官方小编</span><span class="firInfo">${v.dateTime} 编辑</span><span class="secInfo">👁‍ ${v.click} 🗨 ${v.discuss}</span>
                </div>
                <p class="newsPre">${v.con}</p>
            </div>
            </a>`);
        $('.allContent').append(oDiv);
    });
});