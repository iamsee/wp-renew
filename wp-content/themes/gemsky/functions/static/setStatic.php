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
//	wp_enqueue_script('functionjs', $_SERVER['proxy'] . '/function.js',array('jquery'));

}
add_action( 'wp_enqueue_scripts', 'gemsky_static' );