/**
 * Created by ql-qf on 2018/1/3.
 */
window.onload = function () {
    console.log('onload');
    console.log(document.getElementById('loading').name)
    if(document.getElementById('loading').name == undefined){
        document.getElementById('loading').name = 'loading'
        gemskystart()
    }
    console.log(document.getElementById('loading').name)



}
window.gemskystart = function() {
    console.log('gemskystart');
    (function animate( time ) {
        requestAnimationFrame( animate );
        TWEEN.update( time );
    })()

    init()
    listen()


};

function init() {
    init_semantic()
    init_style()

    function init_semantic() {
        $('.ui.dropdown').dropdown();
    }
    function init_style() {
        console.log('init_style')
        setTopMenuBg()
        $('#nav').visibility({
            type: 'fixed'
        });

    }
}
function listen() {
    window.onresize = function(){
        console.log('onresize')
        setTopMenuBg()
    }
    $('#mobile-bar').bind('click',function () {
        $(this).children().toggleClass('active')

    })
    // $("#topMenu>li *").bind('click',function () {
    //
    //     if(this.tagName == 'LI'){
    //         $("#topMenu>li *").removeClass('active')
    //         $(this).addClass('active').siblings().removeClass('active')
    //         $(this).parent().prev().addClass('active')
    //     }
    //     else if(this.tagName == 'A'){
    //         $("#topMenu>li *").removeClass('active')
    //         $(this).addClass('active')
    //     }
    //
    //
    // })
    $("#topMenu>li").bind('mouseover',function () {

        var submenu = $(this).children('.sub-menu').children()
        $.each(submenu,function (k,v) {
            iamseeJSUtil.Tween.listHeightShow(k,v,40)
        })
        /*调整背景滑块位置*/
        var offsetLeft = this.offsetLeft
        var parentOffsetLeft = this.parentNode.offsetLeft
        $('#topMenuBg').css('left',parentOffsetLeft+offsetLeft)
    })
    $("#topMenu>li").bind('mouseleave',function () {

        var submenu = $(this).children('.sub-menu').children()
        $.each(submenu,function (k,v) {
            iamseeJSUtil.Tween.listHeightHide(k,v,40)
        })
    })
    // $(".post-nav>div").bind('click',function (event) {
    //     $(this).children('a').click()
    // })
    $('a').unbind('click').bind('click',function (e) {
        e.preventDefault()
        var url = $(this).attr('href')
        console.log('url',url)
        // gemskystart()
        // window.location = url
        var iframeDom = document.createElement('iframe')
        iframeDom.style.display = 'none'
        // iframeDom.ready = true
        document.body.append(iframeDom)
        iframeDom.src = url
        iframeDom.onload = function(){
            console.log('iframeDom.onload')
            $('head').empty().append($(iframeDom).contents().find('head'))
            $('#gemsky-content').empty().append($(iframeDom).contents().find('#gemsky-content'))
            history.pushState({}, "页面标题", url);
            gemskystart()
        };

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

    console.log($('#topMenu>li>a.active').length,$('#topMenu>li>a'),currectDom)
    var offsetLeft = currectDom.parentNode.offsetLeft
    var parentOffsetLeft = currectDom.parentNode.parentNode.offsetLeft
    $('#topMenuBg').css('left',parentOffsetLeft+offsetLeft)
}
