<?php
/**
 * Created by PhpStorm.
 * User: ql-qf
 * Date: 2018/1/5
 * Time: 9:11
 */
add_action('after_setup_theme','load_gemsky_translate');
function load_gemsky_translate(){
	load_theme_textdomain('gemsky', get_template_directory() . '/languages');
}
