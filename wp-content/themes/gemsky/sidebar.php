<div id="sidebar">
<?php if( is_dynamic_sidebar() ){ dynamic_sidebar(); }else{ ?>
        <div class="sbox">
            <h4>分类</h4>
            <ul>
                <?php wp_list_cats(); ?>
            </ul>
        </div>
        <div class="sbox">
            <h4>页面列表</h4>
            <ul>
                <?php wp_list_pages(); ?>
            </ul>
        </div>
        <div class="sbox">
            <h4>友情链接</h4>
            <ul>
                <?php get_links(); ?>
            </ul>
        </div>
        <div class="sbox">
            <h4>功能</h4>
            <ul>
                <?php wp_register(); ?>
                <?php wp_loginout(); ?>
            </ul>
        </div>
    <?php } ?>
</div>