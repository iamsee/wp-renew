<?php
/**
 * WordPress基础配置文件。
 *
 * 这个文件被安装程序用于自动生成wp-config.php配置文件，
 * 您可以不使用网站，您需要手动复制这个文件，
 * 并重命名为“wp-config.php”，然后填入相关信息。
 *
 * 本文件包含以下配置选项：
 *
 * * MySQL设置
 * * 密钥
 * * 数据库表名前缀
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/zh-cn:%E7%BC%96%E8%BE%91_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL 设置 - 具体信息来自您正在使用的主机 ** //
/** WordPress数据库的名称 */
define('DB_NAME', 'wordpress');

/** MySQL数据库用户名 */
define('DB_USER', 'root');

/** MySQL数据库密码 */
define('DB_PASSWORD', 'zhuotong');

/** MySQL主机 */
define('DB_HOST', '192.168.2.1');

/** 创建数据表时默认的文字编码 */
define('DB_CHARSET', 'utf8mb4');

/** 数据库整理类型。如不确定请勿更改 */
define('DB_COLLATE', '');

/**#@+
 * 身份认证密钥与盐。
 *
 * 修改为任意独一无二的字串！
 * 或者直接访问{@link https://api.wordpress.org/secret-key/1.1/salt/
 * WordPress.org密钥生成服务}
 * 任何修改都会导致所有cookies失效，所有用户将必须重新登录。
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'TYQe?nqm,[j/IKpu0;8}cau`D*G0ldn@H{6gBcW7T}jJog*W6c${L,Q K<2s6lZ.');
define('SECURE_AUTH_KEY',  'f>oMLM#It}ufmC5 5SYmG6rI~DInp&Rygzuvc>QD}{8dQ.E)B5qoI>beXTeNG^kb');
define('LOGGED_IN_KEY',    '7^K_jalBZ86+Z;J^=Zwr8|<XD%9n_K}PvKE9iup0=z^,i%M6*ym0di=xA~67x+xK');
define('NONCE_KEY',        'N%K`>0cya<K@U70W7Viw{]D+_c!stl8yB>c61Em39~_ualt=6T/RhHct5VNpwP,X');
define('AUTH_SALT',        'o}rX2nEw@P>J,ck}|Q=k_{jJV&iaHroj=B0NrFr?R7He2(l?er#vT(D<jn`^m~8D');
define('SECURE_AUTH_SALT', ' Yz]v|]|7!N=tnL~Ba5M]uMf0u,+$r!)o5>Ef`cL}_!OjchtrX8LKjz7M8+]hpZW');
define('LOGGED_IN_SALT',   'mEf(N7*9#TY_{X7EDSAX(!n&oR^V8c<G,&Fim{ZLy}LTkkoks:cWz-I_sOpI{D3M');
define('NONCE_SALT',       'NLUX2 ,HZ!]=:<h5B#i`K)&XM0[xh_ /Gn;#ms5FgO4kc%lVbqUbegqly-Rz)@;p');

/**#@-*/

/**
 * WordPress数据表前缀。
 *
 * 如果您有在同一数据库内安装多个WordPress的需求，请为每个WordPress设置
 * 不同的数据表前缀。前缀名只能为数字、字母加下划线。
 */
$table_prefix  = 'wp_';

/**
 * 开发者专用：WordPress调试模式。
 *
 * 将这个值改为true，WordPress将显示所有用于开发的提示。
 * 强烈建议插件开发者在开发环境中启用WP_DEBUG。
 *
 * 要获取其他能用于调试的信息，请访问Codex。
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/**
 * zh_CN本地化设置：启用ICP备案号显示
 *
 * 可在设置→常规中修改。
 * 如需禁用，请移除或注释掉本行。
 */
define('WP_ZH_CN_ICP_NUM', true);

/* 好了！请不要再继续编辑。请保存本文件。使用愉快！ */

/** WordPress目录的绝对路径。 */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** 设置WordPress变量和包含文件。 */
require_once(ABSPATH . 'wp-settings.php');
