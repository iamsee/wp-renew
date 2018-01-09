<?php
/**
 * Created by PhpStorm.
 * User: ql-qf
 * Date: 2017/12/29
 * Time: 16:35
 */

define('WEBRITI_TEMPLATE_DIR_URI',get_template_directory_uri());
define('WEBRITI_TEMPLATE_DIR',get_template_directory());
define('WEBRITI_THEME_FUNCTIONS_PATH',WEBRITI_TEMPLATE_DIR.'/functions');
$_SERVER['proxy'] = get_template_directory_uri();

require_once WEBRITI_THEME_FUNCTIONS_PATH. '/helper/setHelper.php';
require_once WEBRITI_THEME_FUNCTIONS_PATH. '/static/setStatic.php';
require_once WEBRITI_THEME_FUNCTIONS_PATH. '/menu/setMenus.php';
require_once WEBRITI_THEME_FUNCTIONS_PATH. '/liteTool/setTools.php';
require_once WEBRITI_THEME_FUNCTIONS_PATH. '/i18n/setI18n.php';
require_once WEBRITI_THEME_FUNCTIONS_PATH. '/config/setConfig.php';




