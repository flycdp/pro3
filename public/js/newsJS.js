const getHotPlayer = function () {
    $.ajax({
        url: '/getHotPlayer',
        type: 'get',
        success: function (res) {
            if (res.error) {
                alert(res.error)
            } else {
                $.each(res.data, function (i, v) {
                    let oDiv = document.createElement('div');
                    $(oDiv).addClass('playerImg');
                    $(oDiv).html(`
                        <a href="#">
                            <img src="${v.showimg1}" alt="${v.name}">
                            <p>[${v.field}]${v.name}</p>
                        </a>
                    `);
                    $('#playerBox').append(oDiv);
                });

            }
        }
    })
}
const getHotNews = function () {
    $.ajax({
        url: '/getHotNews',
        type: 'get',
        success: function (res) {
            if(res.error){
                alert(res.error)
            }else{
                console.log(res.data);
                $.each(res.data,function(i,v){  
                    let oDiv=document.createElement('div');
                    $(oDiv).addClass('newsList');
                    $(oDiv).html(`
                        <a href="#">
                        <div class="hotNewsImg">
                            <div><img src="${v.url}" alt="${v.title}"></div>
                        </div>
                        <div class="hotNewsCon">
                            <h4>${v.title}</h4>
                            <div>
                                <p>${v.prevCon}</p>
                            </div>
                        </div>
                        </a>
                    `);
                    $('#hotNewsBox').append(oDiv);
                })
            }
        }
    })
}
$('window').ready(function () {
    getHotPlayer();
    getHotNews();
})
