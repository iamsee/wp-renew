<?php get_header(); ?>
    <!--    <div class="c">-->
    <!--        <div id="left-box">-->
    <!--            <div id="home-loop">-->
    <!--                --><?php
//                if (have_posts()) {
//                    while (have_posts()) {
//                        the_post();
//                        ?>
    <!--                        <div class="post-item">-->
    <!--                            <div class="post-title"><a href="--><?php //the_permalink(); ?><!--">--><?php //the_title(); ?><!--</a></div>-->
    <!--                            <div class="post-content">--><?php //the_content(); ?><!--</div>-->
    <!--                            <div class="post-meta">-->
    <!--                                --><?php //_e('category', 'gemsky');
//                                echo " : ";
//                                the_category('、'); ?>
    <!--                                --><?php //_e('author', 'gemsky');
//                                echo " : ";
//                                the_author(); ?>
    <!--                                --><?php //_e('time', 'gemsky');
//                                echo " : ";
//                                the_time('Y-m-d'); ?><!--<span>|</span>-->
    <!--                                阅读量：--><?php //echo ( empty(get_post_meta( $post->ID, '_zan', true ))?0: get_post_meta( $post->ID, '_zan', true ) ); ?>
    <!--                                --><?php //edit_post_link(__('edit', 'gemsky'), ' <span>|</span> ', ''); ?>
    <!--                            </div>-->
    <!--                        </div>-->
    <!--                        --><?php
//                    }
//                } else {
//                    echo '没有日志';
//                }
//                ?>
    <!--            </div>-->
    <!--            <div class="posts_new_link">-->
    <!--                --><?php //posts_nav_link(); ?>
    <!--            </div>-->
    <!--        </div>-->
    <!--        <div id="right-box">-->
    <!--            --><?php //get_sidebar(); ?>
    <!--        </div>-->
    <!---->
    <!--    </div>-->
    <div id="pre-view" class="content-view"></div>
    <div id="index" class="content-view">

        <div class="ui two column stackable grid ">

            <div class="ten wide column">
                <div class="ui segment">
                    <?php
                    if (have_posts()) {
                        while (have_posts()) {
                            the_post();
                            ?>

                            <div class="ui segment post-item">
                                <div class="post-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                </div>
                                <div class="post-content"><?php the_content(); ?></div>
                                <div class="post-meta">
                                    <?php _e('category', 'gemsky');
                                    echo " : ";
                                    the_category('、'); ?>
                                    <?php _e('author', 'gemsky');
                                    echo " : ";
                                    the_author(); ?>
                                    <?php _e('time', 'gemsky');
                                    echo " : ";
                                    the_time('Y-m-d'); ?><span>|</span>
                                    阅读量：<?php echo(empty(get_post_meta($post->ID, '_zan', true)) ? 0 : get_post_meta($post->ID, '_zan', true)); ?>
                                    <?php edit_post_link(__('edit', 'gemsky'), ' <span>|</span> ', ''); ?>
                                </div>
                            </div>
                            <?php
                        }
                    } else {
                        echo '没有日志';
                    }
                    ?>
                </div>
            </div>

            <div class="six wide column">
                <div class="ui segment">Content</div>
            </div>
        </div>

    </div>
<?php get_footer(); ?>