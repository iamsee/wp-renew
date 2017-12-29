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

<div id="home-loop">
    <?php
    if (have_posts()) {
        while (have_posts()) {
            the_post();
            ?>
            <div class="post-item">
                <div class="post-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></div>
                <div class="post-content"><?php the_content(); ?></div>
                <div class="post-meta">
                    <?php _e('category','gemsky');echo " : "; the_category('、'); ?>
                    <?php _e('author','gemsky');echo " : "; the_author(); ?>
                    <?php _e('time','gemsky');echo " : "; the_time('Y-m-d'); ?>
                    <?php edit_post_link( __( 'edit','gemsky' ), ' <span>|</span> ', '' ); ?>
                </div>
            </div>
            <?php
        }
    } else {
        echo '没有日志';
    }
    ?>
</div>
<?php wp_footer(); ?>
</body>
</html>