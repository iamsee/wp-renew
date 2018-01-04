<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html, charset=<?php bloginfo( 'charset' ); ?>"/>
    <meta name="description" content="<?php bloginfo( 'description' ); ?>"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <script>
		<?php $_SERVER['proxy'] = get_template_directory_uri(); ?>
        window.proxy = '<?php echo $_SERVER['proxy'];?>'

    </script>
    <link href="<?php echo $_SERVER['proxy']; ?>/static/common/logo/琳琅天上icon.png" rel="shortcut icon">

    <title><?php bloginfo( 'name' ); ?></title>

    <link rel="stylesheet" href="<?php bloginfo( 'stylesheet_url' ); ?>" type="text/css"/>

	<?php wp_head(); ?>
</head>


<body>

<script src="<?php echo get_template_directory_uri(); ?>/init.js"></script>

<nav id="nav" class="ui inverted menu">
    <div class="header item" id="pc-bar">琳琅天上</div>
    <div class="header item" id="mobile-bar">
        <span></span>
        <span></span>
    </div>
    <div class="right menu">
		<?php
		$default = array(
			'theme_location'  => '',//指定显示的导航名，如果没有设置，则显示第一个
			'menu'            => 'header-menu',
			'container'       => 'div', //最外层容器标签名
			'container_class' => 'menu', //最外层容器class名
			'container_id'    => 'menu',//最外层容器id值
			'menu_class'      => '', //ul标签class
			'menu_id'         => 'menu-ul',//ul标签id
			'echo'            => true,//是否打印，默认是true，如果想将导航的代码作为赋值使用，可设置为false
			'fallback_cb'     => 'gemsky_menu',//备用的导航菜单函数，用于没有在后台设置导航时调用
			'before'          => '[',//显示在导航a标签之前
			'after'           => ']',//显示在导航a标签之后
			'link_before'     => '',//显示在导航链接名之后
			'link_after'      => '',//显示在导航链接名之前
			'items_wrap'      => '<ul id="%1$s">%3$s</ul>',
			'depth'           => 0,////显示的菜单层数，默认0，0是显示所有层
			'walker'         => new wp_menu_walker() //调用一个对象定义显示导航菜单 ));
		);
//		$default = array(
//            'theme_location' => '',
//            'container'  => 'nav-collapse collapse navbar-inverse-collapse',
//            'menu_class' => 'nav navbar-nav navbar-right',
////					'fallback_cb' => 'webriti_fallback_page_menu',
//            'walker' => new wp_menu_walker()
//        );
        wp_nav_menu($default);

	    ?>
        <!--        <a class="item" href="/">首页</a>-->
        <!--        <a class="item">作品集</a>-->
        <div class="item">
            <div class="ui transparent inverted icon input">
                <i class="search icon"></i>
                <input type="text" placeholder="Search">
            </div>
        </div>
        <a class="item">Link</a>
    </div>
</nav>

