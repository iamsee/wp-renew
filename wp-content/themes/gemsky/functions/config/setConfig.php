<?php
/**
 * Created by PhpStorm.
 * User: ql-qf
 * Date: 2018/1/5
 * Time: 9:32
 */

add_action( 'after_setup_theme', 'gemsky_setup' );
function gemsky_setup() {
	add_theme_support( 'post-thumbnails' ); //supports featured image
	$args = array( 'default-color' => '000000', );
	add_theme_support( 'custom-background', $args );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'title-tag' );
}