let player={
    data:[
        {
            url:'https://static.yay.com.cn//avatar/5c67c2ae6b523.jpg',
            loc:'哈尔滨市',
            name:'颜💖下单秒接人皮话多',
            target:''
        },
        {
            url:'https://static.yay.com.cn//avatar/5d0b7110c6843.gif',
            loc:'重庆市',
            name:'葵兮兮',
            target:''
        },
        {
            url:'https://static.yay.com.cn//avatar/5cd8634ca8537.jpg',
            loc:'东莞市',
            name:'蓝桃ღ下单秒接单',
            target:''
        }
    ]
};
let hotNews={
    data:[
        {
            url:'https://static.yay.com.cn//article/5d0c9209c4db7.jpg',
            title:'《刀塔霸业》开启全面开放测试，各大主流平台上线',
            con:'《刀塔霸业》于6月21日正式开启了全面公测，现已登陆Steam和iOS/Android(Google Play)平台。'
        },
        {
            url:'https://static.yay.com.cn//article/5d0b5043a44e1.jpg',
            title:'《轩辕剑:苍之曜》七月正式上线，再现动画战斗！',
            con:'《《轩辕剑苍之曜》宣布即将於七月展开封闭删档测试。'
        },
        {
            url:'https://static.yay.com.cn//article/5d0aeeffae9a7.jpg',
            title:'YAY交友公平运营处理公告-2019年6月20日',
            con:'YAY交友严查大神走私单，邀请用户走私单等行为，一经查实，立即封号封技能，账户清零，绝不收手软。'
        },
        {
            url:'https://static.yay.com.cn//article/5d0a000063ba0.jpg',
            title:'《守望先锋》最新主题活动 快来领取自己的专属奖励！',
            con:'《守望先锋》又推出新的主题活动，巴蒂斯特的大挑战，用户只要在游戏中获胜即可解锁头像、喷漆和战地医生巴蒂斯特的皮肤。'
        },
        {
            url:'https://static.yay.com.cn//article/5cf0bfe79fc82.jpg',
            title:'《英雄联盟》K/DA主题曲《POP/STARS》还爆《节奏空间》',
            con:'《POP/STARS》已经加入了《节奏空间》，同时官方放出了一段实机演示视频，短短的几十秒也是爆点满满，瞬间调动起玩家情绪，沉浸感十足。'
        }
    ]
};
$('window').ready(function(){
    $.each(player.data,function(i,v){
        let oDiv=document.createElement('div');
        $(oDiv).addClass('playerImg');
        $(oDiv).html(`
            <a href="${v.target}">
                <img src="${v.url}">
                <p>[${v.loc}]${v.name}</p>
            </a>
        `);
        $('#playerBox').append(oDiv);
    });
    $.each(hotNews.data,function(i,v){
        let oDiv=document.createElement('div');
        $(oDiv).addClass('newsList');
        $(oDiv).html(`
            <a href="#">
            <div class="hotNewsImg">
                <div><img src="${v.url}" alt=""></div>
            </div>
            <div class="hotNewsCon">
                <h4>${v.title}</h4>
                <div>
                    <p>${v.con}</p>
                </div>
            </div>
            </a>
        `);
        $('#hotNewsBox').append(oDiv);
    })
})