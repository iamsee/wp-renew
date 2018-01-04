/**
 * Created by ql-qf on 2018/1/3.
 */
window.onload = function () {
    $('#mobile-bar').on('click',function () {
        $(this).children().toggleClass('active')
    })
    $('#nav').visibility({
        type: 'fixed'
    });
    $('.ui.dropdown')
        .dropdown()
    ;
};

