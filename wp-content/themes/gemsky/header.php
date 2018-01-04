<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html, charset=<?php bloginfo('charset'); ?>"/>
    <meta name="description" content="<?php bloginfo('description'); ?>"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <script>
		<?php $_SERVER['proxy'] = get_template_directory_uri(); ?>
        window.proxy = '<?php echo $_SERVER['proxy'];?>'

    </script>
    <link href="<?php echo $_SERVER['proxy']; ?>/static/common/logo/琳琅天上icon.png" rel="shortcut icon">

    <title><?php bloginfo('name'); ?></title>

    <link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" type="text/css"/>

    <?php wp_head(); ?>
</head>


<body>

<script src="<?php echo get_template_directory_uri();?>/init.js"></script>
<!---->
<!--<div class="c">-->
<!--<div id="header">-->
<!--    <div id="headerimg">-->
<!--        <h1><a href="--><?php //echo get_option('home'); ?><!--">--><?php //bloginfo('name'); ?><!--</a></h1>-->
<!--        <div class="description">--><?php //bloginfo('descriptioin'); ?><!--</div>-->
<!--        <p>-->
<!--            访问量：-->
<!--            --><?php
//
//            $view_history = empty(get_option('view_history')) ? '0' : get_option('view_history');
//
//            update_option('view_history', ++$view_history);
//            echo $view_history;
//            ?>
<!--        </p>-->
<!--    </div>-->
<!--</div>-->
<!--</div>-->
<nav id="nav" class="ui inverted menu">
    <div class="header item" id="pc-bar">琳琅天上</div>
    <div class="header item" id="mobile-bar">
        <span></span>
        <span></span>
    </div>
    <div class="right menu">
        <a class="item" href="/">首页</a>
        <a class="item">作品集</a>
        <div class="item">
            <div class="ui transparent inverted icon input">
                <i class="search icon"></i>
                <input type="text" placeholder="Search">
            </div>
        </div>
        <a class="item">Link</a>
    </div>
</nav>

