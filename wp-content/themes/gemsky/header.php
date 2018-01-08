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

    <!--    <link rel="stylesheet" href="--><?php //bloginfo( 'stylesheet_url' ); ?><!--" type="text/css"/>-->

	<?php wp_head(); ?>

</head>


<body>

<!--<script src="--><?php //echo get_template_directory_uri(); ?><!--/init.js"></script>-->
<div id="loading">
    <!--    <script src="--><?php //echo $_SERVER['proxy']; ?><!--/function.js"></script>-->
    <div class='circle-wrapper'>
        <div class='circle'>
            <div class='inner'></div>
        </div>
        <div class='circle'>
            <div class='inner'></div>
        </div>
        <div class='circle'>
            <div class='inner'></div>
        </div>
        <div class="circle-content">

        </div>

    </div>
</div>
<div id="gemsky-content" class="gemsky-content">
    <nav id="nav" class="ui inverted menu gemskyv-nav">
            <div class="header item" id="pc-bar">琳琅天上</div>
            <div class="header item" id="mobile-bar">
                <span></span>
                <span></span>
            </div>
            <div class="right menu">
                <div id="topMenuBg" class="topMenuBg"></div>
                <?php
                $defaults = array(
                    'theme_location'  => 'top_menu',//用于在调用导航菜单时指定注册过的某一个导航菜单位置，如果没有指定，则显示第一个。
                    //如：主菜单primary，次要(左侧)菜单secondary，
                    //具体可通过firebug 查看菜单位置的select标签的name属性。
                    'menu'            => '',//使用导航菜单的名称调用菜单，可以是 id, slug, name (按顺序匹配的) 。
                    'container'       => 'div',//ul 父节点（这里指导航菜单的容器）的标签类型，只支持div 和 nav 标签,
                    //如果是其它值, ul 父节点的标签将不会被显示。
                    //也可以用false（container => false）去掉ul父节点标签。
                    'container_class' => 'menu-{menu slug}-container',//ul 父节点的 class 属性值。
                    'container_id'    => '',//ul 父节点的 id 属性值。
                    'menu_class'      => 'ui right floated  item',//ul 节点的 class 属性值。
                    'menu_id'         => 'topMenu',//默认值: menu slug, 自增长的。ul 节点的 id 属性值。
                    'echo'            => true,//确定直接显示导航菜单还是返回 HTML 片段，
                    //如果想将导航的代码作为赋值使用，可设置为false。
    //			'fallback_cb'     => 'wp_page_menu',// 用于没有在后台设置导航时调的回调函数。
                    'before'          => '',//显示在每个菜单链接前的文本。
                    'after'           => '',//显示在每个菜单链接后的文本。
                    'link_before'     => '',//显示在每个菜单链接文本前的文本。
                    'link_after'      => '',//显示在每个菜单链接文本后的文本。
    //			'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',//使用字符串替换修改ul的class。
                    'depth'           => 2, //显示菜单的深度, 当数值为 0 时显示所有深度的菜单。
                    'walker'          => new wp_menu_walker() //自定义的遍历对象，调用一个对象定义显示导航菜单。
                    //若无参数这调用 Walker_Nav_Menu类的walker,
                    //若自定义只需模仿Walker_Nav_Menu继承Walker
                );
                //		$default = array(
                //            'theme_location' => '',
                //            'container'  => 'nav-collapse collapse navbar-inverse-collapse',
                //            'menu_class' => 'nav navbar-nav navbar-right',
                ////					'fallback_cb' => 'webriti_fallback_page_menu',
                //            'walker' => new wp_menu_walker()
                //        );
                wp_nav_menu( $defaults );

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

