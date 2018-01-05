<?php
/**
 * Created by PhpStorm.
 * User: ql-qf
 * Date: 2018/1/5
 * Time: 9:10
 */
//注册一个小工具
register_sidebar(
	array(
		'name'          => '侧边栏',
		'before_widget' => '<div class="sbox">',
		'after_widget'  => '</div>',
		'before_title'  => '<h2>',
		'after_title'   => '</h2>'
	)
);
