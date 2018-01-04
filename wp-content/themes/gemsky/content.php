<?php
$zan = get_post_meta( $post->ID, '_zan', true );
update_post_meta( $post->ID, '_zan', $zan + 1 );
//                delete_post_meta( $post->ID , 'download' );
?>
<div class="post-item">
    <div class="post-title"><h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a><h2></div>
    <div class="post-meta">
        <?php _e( 'category', 'gemsky' ); ?>：<?php the_category(','); ?><span>|</span>
        <?php _e( 'author', 'gemsky' ); ?>：<?php the_author(); ?><span>|</span>

        <?php echo __( 'time', 'gemsky' ); ?>：<?php the_time( 'Y-m-d' ); ?><span>|</span>
        阅读量：<?php echo get_post_meta( $post->ID, '_zan', true ); ?>
        <?php edit_post_link( __( 'edit','gemsky' ), ' <span>|</span> ', '' ); ?>
    </div>
    <div class="post-content"><?php the_content(); ?></div>

    <?php
    $downloads = get_post_meta( $post->ID, 'download' , false );
    if( !$downloads )
    {
        add_post_meta( $post->ID, 'download', 'http://hcsem.com/000.rar' );
    }
    ?>


    <div class="post-download ui segment">
        文件下载：<br />
        <?php
        foreach( $downloads as $download ){
            echo $download . "<br />";
        }
        ?>
    </div>

</div>
