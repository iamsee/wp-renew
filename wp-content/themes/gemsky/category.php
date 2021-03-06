<?php get_header(); ?>
<div id="category" class="content-view">
    <div class="ui two column stackable grid ">

        <div class="ten wide column">

            <div class="ui segment">
                <div>
                【<?php single_cat_title(); ?>】分类下的文章：
                </div>
				<?php
				if ( have_posts() ) {
					while ( have_posts() ) {
						the_post();
						?>

                        <div class="ui segment post-item">
                            <div class="post-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                            </div>
                            <div class="post-content">
		                        <?php
		                        $array_image_url = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), array(
			                        100,
			                        60
		                        ) );
		                        if ( ! empty( $array_image_url[0] ) ) {


			                        ?>
                                    <div class="post-img">

                                        <a href="<?php the_permalink(); ?>" style="background-image: url(<?php echo $array_image_url[0] ?>);background-repeat: no-repeat;display: block;
                                                width: 100px;
                                                height: 60px;
                                                margin: 0 auto;"></a>
<!--                                        <img src="--><?php //echo $array_image_url[0] ?><!--"-->
<!--                                             style="width: 100px;height: 60px"/>-->


                                    </div>
		                        <?php } ?>
                                <div class="post-output">

			                        <?php the_content(); ?>

                                </div>
                            </div>
                            <div class="post-meta">
								<?php _e( 'category', 'gemsky' );
								echo " : ";
								the_category( '、' ); ?>
								<?php _e( 'author', 'gemsky' );
								echo " : ";
								the_author(); ?>
								<?php _e( 'time', 'gemsky' );
								echo " : ";
								the_time( 'Y-m-d' ); ?><span>|</span>
                                阅读量：<?php echo( empty( get_post_meta( $post->ID, '_zan', true ) ) ? 0 : get_post_meta( $post->ID, '_zan', true ) ); ?>
								<?php edit_post_link( __( 'edit', 'gemsky' ), ' <span>|</span> ', '' ); ?>
                            </div>
                        </div>
						<?php
					}
				} else {
					echo '分类下没有日志';
				}
				?>
                <div class="posts_new_link">
					<?php posts_nav_link(); ?>
                </div>
            </div>
        </div>

        <div class="six wide column">
            <div class="ui segment">
				<?php get_sidebar(); ?>
            </div>
        </div>
    </div>
</div>
<?php get_footer(); ?>