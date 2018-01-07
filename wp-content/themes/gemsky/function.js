/**
 * Created by ql-qf on 2018/1/3.
 */
start()
function start() {
    (function animate( time ) {
        requestAnimationFrame( animate );
        TWEEN.update( time );
    })()

    init()
    listen()
}

function init() {
    init_semantic()
    init_style()

    function init_semantic() {
        $('.ui.dropdown').dropdown();
    }
    function init_style() {
        setTopMenuBg()
        $('#nav').visibility({
            type: 'fixed'
        });

    }
}
function listen() {

    window.onresize = function(){
        setTopMenuBg()
    }
    $('#mobile-bar').on('click',function () {
        $(this).children().toggleClass('active')

    })
    $("#topMenu>li *").on('click',function () {

        if(this.tagName == 'LI'){
            $("#topMenu>li *").removeClass('active')
            $(this).addClass('active').siblings().removeClass('active')
            $(this).parent().prev().addClass('active')
        }
        else if(this.tagName == 'A'){
            $("#topMenu>li *").removeClass('active')
            $(this).addClass('active')
        }


    })
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
    $('a').unbind('click').bind('click',function (event) {
        event.preventDefault()
        var url = $(this).attr('href')
        var iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        iframe.src = url
        iframe.id= 'tmpIframe'
        iframe.onload = function () {
            console.log($(iframe).contents().find('#gemsky-content').children())
            $('#gemsky-content').empty().append($(iframe).contents().find('#gemsky-content').children())

            $('#tmpIframe').remove()
            history.pushState({},'新页面',url)
            start()

        }
        document.body.appendChild(iframe)
        console.log(url)
    })



}


function  setTopMenuBg() {
    var currectDom
    if($('#topMenu>li>ul>li.active').length != 0){
        $('#topMenu>li>ul>li.active').parent().prev().addClass('active')
    }
    if($('#topMenu>li>a.active').length == 0){
        currectDom = $('#topMenu>li:first-child>a')[0]
    }
    else{
        currectDom = $('#topMenu>li>a.active')[0]
    }
    console.log('currectDom',currectDom,$('#topMenu>li>ul>li.active').length,$('#topMenu>li>a.active').length,$('#topMenu>li:first-child>a'))
    var offsetLeft = currectDom.parentNode.offsetLeft
    var parentOffsetLeft = currectDom.parentNode.parentNode.offsetLeft
    console.log(currectDom,offsetLeft,parentOffsetLeft)
    $('#topMenuBg').css('left',parentOffsetLeft+offsetLeft)
}