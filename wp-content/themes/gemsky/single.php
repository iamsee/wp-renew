<?php get_header(); ?>
    <div id="single">

        <div class="ui two column stackable grid ">

            <div class="ten wide column">

                <div class="ui segment">
					<?php
					the_post();

					$cat = get_the_category( get_the_ID() );

					$name = $cat[0]->slug;
					//加载 content-wpcj.php 模版文件，如果文件不存在，则调用content.php
					get_template_part( 'content', $name );
					?>
                </div>
	            <?php comments_template(); ?>
            </div>

            <div class="six wide column">
                <div class="ui segment">
					<?php get_sidebar(); ?>
                </div>
            </div>
        </div>
    </div>
<?php get_footer(); ?>