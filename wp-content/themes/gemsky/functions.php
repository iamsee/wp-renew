<?php
/**
 * Created by PhpStorm.
 * User: ql-qf
 * Date: 2017/12/29
 * Time: 16:35
 */






add_action('after_setup_theme','load_gemsky_translate');
function load_gemsky_translate(){
    load_theme_textdomain('gemsky', get_template_directory() . '/languages');
}

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
