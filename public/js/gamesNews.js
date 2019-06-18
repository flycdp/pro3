$('.head').click(function () {
    $('.head').removeClass('active');
    $('.head').parent().removeClass('active1');
    $(this).addClass('active');
    $(this).parent().addClass('active1');
});