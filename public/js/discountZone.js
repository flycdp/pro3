$('.select>ul>li>a').click(function(){
    $('.select>ul>li>a').removeClass('onclick');
    $(this).addClass('onclick');
});
$('.select2>ul>li>a').click(function(){
    $('.select2>ul>li>a').children().removeClass('active');
    $(this).children().addClass('active');
});
$('.select3>ul>li>a').click(function(){
    $('.select3>ul>li>a').children().removeClass('active');
    $(this).children().addClass('active');
});
$('.select4>ul>li>a').click(function(){
    $('.select4>ul>li>a').children().removeClass('active');
    $(this).children().addClass('active');
});