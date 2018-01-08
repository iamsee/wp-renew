/**
 * Created by ql-qf on 2018/1/3.
 */
start()
function start() {
    (function animate(time) {
        requestAnimationFrame(animate);
        TWEEN.update(time);
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
        //
        var nav_length = $('.gemsky-nav').length
        for(var i=1;i<nav_length;i++){
            $($('.gemsky-nav')[i]).remove()
        }

    }
}
function listen() {

    window.onresize = function () {
        setTopMenuBg()
    }

    $(window).on('popstate', function (event) {
        event.preventDefault()
        window.location.href = window.location.href

    });


    $('.mobile-bar').on('click', function () {
        console.log('click',$(this).children().hasClass('active'))
        // $(this).children().toggleClass('active')/*切换页面后无法添加类*/
        if($(this).children().hasClass('active')){
            $(this).children().removeClass('active')
        }
        else{
            $(this).children().addClass('active')

        }

    })
    $("#topMenu>li *").unbind('click').bind('click', function () {

        if (this.tagName == 'LI') {
            $("#topMenu>li *").removeClass('active')
            $(this).addClass('active').siblings().removeClass('active')
            $(this).parent().prev().addClass('active')
        }
        else if (this.tagName == 'A') {
            $("#topMenu>li *").removeClass('active')
            $(this).addClass('active')
        }


    })
    $("#topMenu>li").on('mouseover', function () {

        var submenu = $(this).children('.sub-menu').children()
        $.each(submenu, function (k, v) {
            iamseeJSUtil.Tween.listHeightShow(k, v, 40)
        })
        /*调整背景滑块位置*/
        var offsetLeft = this.offsetLeft
        var parentOffsetLeft = this.parentNode.offsetLeft
        $('#topMenuBg').css('left', parentOffsetLeft + offsetLeft)
    })
    $("#topMenu>li").on('mouseleave', function () {

        var submenu = $(this).children('.sub-menu').children()
        $.each(submenu, function (k, v) {
            iamseeJSUtil.Tween.listHeightHide(k, v, 40)
        })
    })

    $('a').unbind('click').bind('click', function (event) {
        event.preventDefault()
        start_loading()
        var do_scale = "scale(0.5,0.5)"
        var do_scale_origin = "50% 20%"
        var do_scale_origin = ""
        var url = $(this).attr('href')
        var iframe = document.createElement('iframe')
        console.log('$("#gemsky-content")',$("#gemsky-content"))
        if($("#gemsky-content")[0] != undefined){
            $("#gemsky-content")[0].style.transform = do_scale
            // $("#gemsky-content")[0].style.transformOrigin = do_scale_origin

        }
        iframe.style.display = 'none'
        iframe.src = url
        iframe.id = 'tmpIframe'
        iframe.onload = function () {
            // $(iframe).contents().find('#gemsky-content')[0].style.transform = do_scale
            // $(iframe).contents().find('#gemsky-content')[0].style.transformOrigin = do_scale_origin

            $('#gemsky-content').empty().append($(iframe).contents().find('#gemsky-content').children())
            $(iframe).contents().find('#gemsky-content').insertAfter($('#gemsky-content'))
            // $(".gemsky-content")[1].style.position = 'relative'
            // $(".gemsky-content")[1].style.transform = "translateX(100%) "+do_scale
            // $(".gemsky-content")[1].style.transformOrigin = do_scale_origin
            // $(".gemsky-content")[0].style.transform = "translateX(-100%) "+do_scale
            // $(".gemsky-content")[0].style.transformOrigin = do_scale_origin
            setTimeout(function () {
                // $($(".gemsky-content")[0]).remove()
                // $(".gemsky-content")[0].style.transform = do_scale
                // $(".gemsky-content")[0].style.transformOrigin = do_scale_origin
                setTimeout(function () {
                    $(".gemsky-content")[0].style.transform = ''
                    // $(".gemsky-content")[0].style.transformOrigin = ''
                },500)
                $('#tmpIframe').remove()
                history.pushState({}, '新页面', url)
                end_loading()
                start()
            },500)



        }
        document.body.appendChild(iframe)
    })


}


function setTopMenuBg() {
    var currectDom
    if ($('#topMenu>li>ul>li.active').length != 0) {
        $('#topMenu>li>ul>li.active').parent().prev().addClass('active')
    }
    if ($('#topMenu>li>a.active').length == 0) {
        currectDom = $('#topMenu>li:first-child>a')[0]
    }
    else {
        currectDom = $('#topMenu>li>a.active')[0]
    }
    if(currectDom != undefined){
        var offsetLeft = currectDom.parentNode.offsetLeft
        var parentOffsetLeft = currectDom.parentNode.parentNode.offsetLeft
    }
    else{
        offsetLeft = parentOffsetLeft = 0
    }


    $('#topMenuBg').css('left', parentOffsetLeft + offsetLeft)
}

window.start_loading = function(){
    $('html,body').animate({scrollTop: '0px'}, 800);
    document.body.style.overflowY  = 'hidden'
    setTopMenuBg()
    // var menubgleft = $('.topMenuBg').css('left')
    // console.log('menubgleft',menubgleft)

    // $('.topMenuBg').css('left',menubgleft+8+'px')
    // console.log('left',$('#topMenuBg').css('left'))
    document.getElementById('loading').style.zIndex = 1000
    var opacity_from = {x:0}
    var tween = new TWEEN.Tween( opacity_from )
        .to( { x: 0.8 }, 300 )
        .easing( TWEEN.Easing.Linear.None )
        .onUpdate( function () {

            document.getElementById('loading').style.opacity = this.x
        } )
        .start();
}
window.end_loading = function(){

    var opacity_from = {x:0.8}
    // var menubgleft = $('.topMenuBg').css('left')
    // console.log('menubgleft',menubgleft)
    // $('.topMenuBg').css('left',menubgleft-8+'px')
    var tween = new TWEEN.Tween( opacity_from )

        .to( { x: 0 }, 300 )
        .easing( TWEEN.Easing.Linear.None )
        .onUpdate( function () {

            document.getElementById('loading').style.opacity = this.x
            if(this.x == 0){
                document.body.style.overflowY  = 'scroll'
                document.body.style.overflowX  = 'hidden'
                document.getElementById('loading').style.zIndex = -1
                setTopMenuBg()

            }
        } )
        .start();
}

window.returnTop = function(){
    var sdelay=0;
    window.scrollBy(0,-100);//Only for y vertical-axis
    if(document.body.scrollTop>0) {
        sdelay= setTimeout('returnTop()',50);
    }
}