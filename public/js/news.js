$.ajax({
    url: '/getNewsCon/' + location.search,
    type: 'get',
    success: function (res) {
        if (res.error) {
            alert(res.error)
        } else {
            $('.prevA').attr('href',`news.html?id=${res.data[0].id}`);
            $('.nextA').attr('href',`news.html?id=${res.data[2].id}`);
            let data = res.data[1];
            $('.newsTitle').html(data.title);
            $('.firInfo').html(data.time);
            $('.secInfo').html(`👁‍ <span>${data.click}</span>&nbsp; 🗨 <span> ${data.num}</span>`);
            $('.tag>li').html(data.tag);
            $('.newsText').html(data.content);
            $('.prevTitle').html(res.data[0].title);
            $('.nextTitle').html(res.data[2].title);
            $('title').html(data.title);
            $('.newsType').html(data.type);
        }
    }
});
$('window').ready(function () {
    $.ajax({
        url: '/getDiscussInfo' + location.search,
        type: 'get',
        success: function (res) {
            if (res.error) {
                alert(res.error)
            } else {
                if (!res.data.length) {
                    $('.msgList').html(
                        '<li class="msg" style="text-align:center;font-size:20px;color:#ababab;display:inline-block;width:760px">暂时没有网友评论!</li>'
                    )
                } else {
                    $.each(res.data, function (i, v) {
                        const oLi = document.createElement('li');
                        $(oLi).html(`
                                    <div class="msg">
                                    <span>
                                        <img src="${v.headerimg}" alt="${v.name}">
                                    </span>
                                    <div>
                                        <div style="width: 680px;"><span>${v.name}</span> &nbsp;&nbsp;<span style="font-size: 14px;color: #a2a2a2">${v.time}</span><div style="float: right"><span>👍 0</span></div></div>
                                        <div style="margin-top: 8px"><span>${v.text}</span></div>
                                    </div>
                                    </div>
                                  `);
                        $('.msgList').append(oLi);
                    });
                    
                }
            }
        }
    }
    )
});