<?php
/**
 * Created by PhpStorm.
 * User: ql-qf
 * Date: 2018/1/5
 * Time: 9:12
 */

function gemsky_static()
{
	$current_options = get_option('wallstreet_pro_options');
	wp_enqueue_style('gemsky-style', get_stylesheet_uri() );
	wp_enqueue_style('semanticCss',$_SERVER['proxy'] . '/static/semantic-ui/semantic.min.css' );

	wp_deregister_script(
		'jquery'
	);
	wp_register_script('jquery', $_SERVER['proxy'] . '/static/common/js/jquery.min.js');
	wp_enqueue_script(
		'jquery'
	);


	wp_enqueue_script('tweenjs', $_SERVER['proxy'] . '/static/tweenjs/Tween.js');
	wp_enqueue_script('iamseeJSUtil',$_SERVER['proxy'] . '/static/common/js/iamseeJSUtil.js',array('jquery'));
	wp_enqueue_script('semantic', $_SERVER['proxy'] . '/static/semantic-ui/semantic.min.js',array('jquery'));
	wp_enqueue_script('initjs', $_SERVER['proxy'] . '/init.js',array('jquery'),1.0,false);
	wp_enqueue_script('lodash', $_SERVER['proxy'] . '/static/lodash/lodash.min.js',array('jquery'),1.0,true);
	wp_enqueue_script('functionjs', $_SERVER['proxy'] . '/function.js' ,array('jquery'),1.0,true);


}
add_action( 'wp_enqueue_scripts', 'gemsky_static' );



/* WordPress界登陆面Logo修改开始 */
function custom_login_logo() { ?>
	<style>
		.login h1 a {
			background-image:url(<?php echo $_SERVER["proxy"] . "/static/common/logo/琳琅天上icon.png" ?>) !important;
			width: 140px;
			height: 120px;
		}

		#login .submit input{
			border: none;
			background-color: black;
			padding:8px 25px;
            line-height: 16px;
		}

	</style>

	<?php
}
add_action(login_head, custom_login_logo);
/* WordPress登陆界面Logo修改结束 */
/* WordPress登陆界面Logo链接修改开始 */
function custom_loginlogo_url($url) {
	return get_bloginfo(url);
}
add_filter( login_headerurl, custom_loginlogo_url );
/* WordPress登陆界面Logo链接修改結束 */