let data={
    data:[
        {
            type:'游戏咨询',
            title:'《篮球计划》正式在暑期上线，再度解锁新人物！',
            tag:'篮球',
            dateTime:'2019-6-24 13:45:23',
            click:'6',
            discuss:'2',
            prevTitle:'YAY交友公平运营处理公告-2019年6月20日',
            nextTitle:'《篮球计划》正式在暑期上线，再度解锁新人物！',
            userImg:'https://static.yay.com.cn/avatar/2bgv478m65hr.jpg'
        }
    ]
}
let discuss={
    data:[
        {
            src:'https://static.yay.com.cn/avatar/2bgv478m65hr.jpg',
            dateTime:'2019-4-23 14:23:53',
            good:'1',
            name:'JeFF',
            msg:'我觉得不行！'
        },
        {
            src:'https://static.yay.com.cn/avatar/2bgv478m65hr.jpg',
            dateTime:'2019-4-23 14:23:10',
            good:'0',
            name:'JeFF',
            msg:'我觉得行！'
        },
        {
            src:'https://static.yay.com.cn/avatar/2bgv478m65hr.jpg',
            dateTime:'2019-4-23 9:23:10',
            good:'0',
            name:'哈哈哈',
            msg:'我想杀人！'
        }
    ]
}
$.each(discuss.data,function(i,v){
    let oLi=document.createElement('li');
    $(oLi).html(`
    <div class="msg">
        <span>
            <img src="${v.src}" alt="">
        </span>
        <div>
            <div style="width: 680px"><span>${v.name}</span> &nbsp;&nbsp;<span style="font-size: 14px;color: #a2a2a2">2019-5-23 14:13:12</span><div style="float: right"><span>👍 ${v.good}</span></div></div>
            <div style="margin-top: 8px"><span>${v.msg}</span></div>
        </div>
    </div>
    `);
    $('.msgList').append(oLi);
});
$('window').ready(function(){
    $('title').html(data.data[0].title);
})