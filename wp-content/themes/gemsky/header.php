<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html, charset=<?php bloginfo('charset'); ?>"/>
    <meta name="description" content="<?php bloginfo('description'); ?>"/>
    <title><?php bloginfo('name'); ?></title>

    <link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" type="text/css"/>

    <?php wp_head(); ?>
</head>


<body>
<div class="c">
<div id="header">
    <div id="headerimg">
        <h1><a href="<?php echo get_option('home'); ?>"><?php bloginfo('name'); ?></a></h1>
        <div class="description"><?php bloginfo('descriptioin'); ?></div>
        <p>
            访问量：
            <?php

            $view_history = empty(get_option('view_history')) ? '0' : get_option('view_history');

            update_option('view_history', ++$view_history);
            echo $view_history;
            ?>
        </p>
    </div>
</div>
</div>