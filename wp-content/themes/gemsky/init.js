/**
 * Created by ql-qf on 2018/1/3.
 */
// window.proxy = 'https://dist-static.oss-cn-beijing.aliyuncs.com'

// window.proxy = <?php echo get_template_directory_uri();?>
//
// console.log('proxy',proxy)
// var jsLoader = [
//     proxy + '/static/tweenjs/Tween.js',
//     proxy + '/static/common/js/iamseeJSUtil.js',
//     proxy + '/static/semantic-ui/semantic.min.js',
//     proxy + '/function.js',
// ]
// var cssLoader = [
//     proxy + '/static/semantic-ui/semantic.min.css',
// ]
// function doLoadCss() {
//     console.log('doLoadCss')
//     $.each(cssLoader, function (k, v) {
//         var cssDom = document.createElement('link');
//         cssDom.name = v.substr(v.lastIndexOf('/') + 1).replace(/\./, "");
//         if($('[name="'+cssDom.name+'"]').length == 0){
//             cssDom.setAttribute('rel', 'stylesheet');
//             cssDom.setAttribute('type', 'text/css');
//             cssDom.setAttribute('href', v);
//             _head.appendChild(cssDom);
//         }
//     })
// }
// function doLoadJS() {
//     console.log('doLoadJS')
//     $.each(jsLoader, function (k, v) {
//         var jsDom = document.createElement('script');
//         jsDom.name = v.substr(v.lastIndexOf('/') + 1).replace(/\./, "");
//         if($('[name="'+jsDom.name+'"]').length == 0){
//             jsDom.setAttribute('type', 'text/javascript');
//             jsDom.setAttribute('src', v);
//             _head.appendChild(jsDom);
//         }
//
//     })
// }
//
// var jsDom = document.createElement('script');
// var _head = document.getElementsByTagName('head')[0];
// jsDom.setAttribute('type', 'text/javascript');
// jsDom.setAttribute('src', proxy + '/static/common/js/jquery.min.js');
// _head.appendChild(jsDom);
// jsDom.onload = function (ev) {
//     doLoadCss()
//     doLoadJS()
// }
//
//

window.setDomHeight = function ($dom,height) {
    // var documentWidth = document.body.offsetWidth
    $dom.css('height',height + 'px')
}