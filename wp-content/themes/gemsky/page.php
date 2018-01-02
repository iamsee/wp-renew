<?php get_header(); ?>
    <div class="c">
        <div id="page-box">
            <?php
            the_post();
            ?>
            <div class="post-item">
                <div class="post-title"><h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a><h2></div>
                <div class="post-meta">
                    <?php _e( 'author', 'gemsky' ); ?>：<?php the_author(); ?><span>|</span>
                    <?php echo __( 'time', 'gemsky' ); ?>：<?php the_time( 'Y-m-d' ); ?>
                    <?php edit_post_link( __( 'Edit','gemsky' ), ' <span>|</span> ', '' ); ?>
                </div>
                <div class="post-content"><?php the_content(); ?></div>
            </div>
        </div>
    </div>
<?php get_footer(); ?>