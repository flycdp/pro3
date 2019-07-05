
let banner = {
    data: [
        {
            src: 'https://static.yay.com.cn/banner/5be4ed3d4e457.jpg',
            target: '＃',
        },
        {
            src: 'https://static.yay.com.cn/banner/5c753b73ed50a.png',
            target: '＃',
        }
    ]
}
$.each(banner.data, function (i, v) {
    let oDiv = document.createElement('div');
    $(oDiv).addClass('swiper-slide');
    $(oDiv).html(`
        <a href="${v.target}">
            <img src="${v.src}">
        </a>
    `);
    $('.swiper-wrapper').append(oDiv);
});
var mySwiper = new Swiper('.swiper-container', {
    loop: true,
    autoplay: true,
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
const getNews = function (target) {
    $.ajax({
        url: '/getNews'+ target,
        type: 'get',
        success: function (res) {
            $('.allContent').html('');
            if (res.error) {
                alert('没有新闻！');
            } else {
                $.each(res.data, function (i, v) {
                    let oDiv = document.createElement('div');
                    $(oDiv).addClass('news');
                    $(oDiv).html(`<a class="newsId" href="news.html?id=${v.id}"">
                        <div class="newsImg">
                            <img src="${v.url}" alt="${v.title}">
                        </div>
                        <div class="newsCon">
                            <ul class="tag">
                                <li>${v.tag}</li>
                            </ul>
                            <p class="newsTitle">${v.title}</p>
                            <div class="newsInfo">
                                <span class="firInfo">官方小编</span><span class="firInfo">${v.time} 编辑</span><span class="secInfo">👁‍ ${v.click} 🗨 ${v.num}</span>
                            </div>
                            <p class="newsPre">${v.preCon}</p>
                        </div>
                        </a>
                        <span style="display:none">${v.id}</span>
                        `);
                    $('.allContent').append(oDiv);
                });
            }
        }
    })
}
$('.head').click(function () {
    $('.head').removeClass('active').parent().removeClass('active1');
    $(this).addClass('active').parent().addClass('active1');
    let oV = $(this).text();
    getNews('?category='+oV)
});
$('window').ready(function () {
    getNews('');
});