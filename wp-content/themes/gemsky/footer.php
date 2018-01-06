</div>
<div id="footer">

    <div class="ui two column grid container">
        <div class="column">
            <span class="footer-line-start footer-line"></span>
        </div>
        <div class="column">
            <span class="footer-line-end footer-line"></span>
        </div>
    </div>
    <div class="ui two column stackable grid">

        <div class="seven wide column">

            <embed src="<?php echo $_SERVER['proxy']; ?>/static/common/logo/琳琅天上logo黑.svg" width="200" height="50"
                   type="image/svg+xml"
                   pluginspage="http://www.adobe.com/svg/viewer/install/" />
        </div>
        <div class="two wide column" id="vertical-line">
            <div class="ui vertical divider"> <i class="theme icon"></i> </div>
        </div>
        <div class="seven wide column">

        </div>

    </div>
    <div id="copyright">
        访问量：
	    <?php

	    $view_history = empty(get_option('view_history')) ? '0' : get_option('view_history');

	    update_option('view_history', ++$view_history);
	    echo $view_history;
	    ?>&nbsp;&nbsp;<i class="paint brush icon"></i>
      版权所有 <a href="<?php bloginfo('url'); ?>"><?php bloginfo('name'); ?><i class="copyright icon"></i>2017</a>

    </div>
</div>


<?php wp_footer(); ?>
</body>
</html>