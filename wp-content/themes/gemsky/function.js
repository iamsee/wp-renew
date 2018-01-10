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
    $('.ui.accordion')
        .accordion()
    ;
    function init_style() {
        setTopMenuBg()


        $('.gemsky-nav').visibility({
            type: 'fixed',
            offset : 0 // give some space from top of screen

        });

        // $('.content-view>div>div:last-child').visibility({
        //     type: 'fixed',
        //     offset : 40 // give some space from top of screen
        //
        // });

        var nav_length = $('.gemsky-nav').length
        console.log('nav_length',nav_length)
        for(var i=1;i<nav_length;i++){
            console.log('nav_length .gemsky-nav '+i+' removed')
            $($('.gemsky-nav')[i]).remove()
        }



    }
}
function listen(mobileclick = true) {

    window.onresize = function () {
        setTopMenuBg()
    }

    $(window).on('popstate', function (event) {
        event.preventDefault()
        window.location.href = window.location.href

    });

    if(mobileclick){
        $('.mobile-bar')[0].addEventListener('click',function () {
            console.log('click')
            if($('.mobile-bar').children().hasClass('active')){
                $('.mobile-bar').children().removeClass('active')
                $('#mobileMenu').css('transform','translateY(calc(-100% - 40px))')
                setTimeout(function () {
                    $('#mobileMenu').css('opacity','0')
                },300)

            }
            else{
                $('.mobile-bar').children().addClass('active')
                $('#mobileMenu').css('opacity','1')

                $('#mobileMenu').css('transform','translateY(calc(0%))')

            }


        })
        $('#close-mobile-menu')[0].addEventListener('click',function () {
            $('.mobile-bar').click()
        })

    }

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
        var url = $(this).attr('href')
        var myUrl = iamseeJSUtil.parseURL(url)

        if(myUrl.file == '' &&  _.includes(['part-category','archives'],myUrl.segments[0])){
            event.preventDefault()
            start_loading()
            var do_scale = "scale(0.5,0.5)"
            var do_scale_origin = "50% 10%"

            var iframe = document.createElement('iframe')
            console.log('$("#gemsky-content")',$("#gemsky-content"))
            if($("#gemsky-content")[0] != undefined){
                $("#gemsky-content")[0].style.transform = do_scale
                $("#gemsky-content")[0].style.transformOrigin = do_scale_origin

            }
            iframe.style.display = 'none'
            iframe.src = url
            iframe.id = 'tmpIframe'
            iframe.onload = function () {
                $(iframe).contents().find('#gemsky-content')[0].style.transform = do_scale
                $(iframe).contents().find('#gemsky-content')[0].style.transformOrigin = do_scale_origin

                // $('#gemsky-content').empty().append($(iframe).contents().find('#gemsky-content').children())
                $(iframe).contents().find('#gemsky-content').insertAfter($('#gemsky-content'))
                // $(".gemsky-content")[1].style.position = 'relative'
                $(".gemsky-content")[1].style.transform = "translateX(100%) "+do_scale
                $(".gemsky-content")[1].style.transformOrigin = do_scale_origin
                $(".gemsky-content")[0].style.transform = "translateX(-100%) "+do_scale
                $(".gemsky-content")[0].style.transformOrigin = do_scale_origin
                setTimeout(function () {
                    $($(".gemsky-content")[0]).remove()
                    $(".gemsky-content")[0].style.transform = do_scale
                    $(".gemsky-content")[0].style.transformOrigin = do_scale_origin
                    setTimeout(function () {
                        $(".gemsky-content")[0].style.transform = ''

                        $(".gemsky-content")[0].style.transformOrigin = ''

                    },500)
                    $('#tmpIframe').remove()
                    history.pushState({}, '新页面', url)
                    end_loading()
                    // start()
                },500)



            }
            document.body.appendChild(iframe)
        }

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
                setTimeout(function () {
                    init()
                    listen()
                },1300)


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
