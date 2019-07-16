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