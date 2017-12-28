<?php
/*
Plugin Name: hc
Plugin URI: http://hcsem.com
Description: 
Author: 黄聪
Version: 1.0
Author URI: http://hcsem.com
*/

function auto_top()
{
	echo '<a href="#"><div id="tip" style="width:40px;height:40px;line-height:40px;border:1px solid #F00;bottom:10px;right:10px;position: fixed;text-align:center;">TOP</div></a>';
}

add_action( 'wp_footer', 'auto_top' );

function add_hc( $content )
{
	return "黄聪说：" . $content;
}

//挂在 add_hc 函数到 the_content 这个过滤器上
add_filter( 'the_content', 'add_hc' );

?>
