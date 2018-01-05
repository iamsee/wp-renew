/**
 * Created by ql-qf on 2018/1/3.
 */
window.onload = function () {
    (function animate( time ) {
        requestAnimationFrame( animate );
        TWEEN.update( time );
    })()

    $('#mobile-bar').on('click',function () {
        $(this).children().toggleClass('active')
    })
    $('#nav').visibility({
        type: 'fixed'
    });
    $("#topMenu>li").on('mouseover',function () {

        var submenu = $(this).children('.sub-menu').children()
        $.each(submenu,function (k,v) {
            iamseeJSUtil.Tween.listHeightShow(k,v,40)
        })
        /*调整背景滑块位置*/
        var offsetLeft = this.offsetLeft
        var parentOffsetLeft = this.parentNode.offsetLeft
        $('#topMenuBg').css('left',parentOffsetLeft+offsetLeft)
    })
    $("#topMenu>li").on('mouseleave',function () {

        var submenu = $(this).children('.sub-menu').children()
        $.each(submenu,function (k,v) {
            iamseeJSUtil.Tween.listHeightHide(k,v,40)
        })
    })
    $('.ui.dropdown')
        .dropdown()
    ;
};
