<div id="comment">
	<h3>评论</h3>
	<ol class="commentlist">
		<?php if ( !comments_open() ) { ?>
			<li class="tip-box"><p>评论功能已经关闭!</p></li>
		<?php } else if ( post_password_required() ) { ?>
			<li class="tip-box"><p>请输入密码再查看评论内容!</p></li>
		<?php } else if ( !have_comments() ) { ?>
			<li class="tip-box"><p><a href="#respond">还没有任何评论，你来说两句吧</a></p></li>
		<?php } else { wp_list_comments(); } ?>
	</ol>
	<div class="clr"></div>
	<div class="clr"></div>
	<?php if ( get_option('comment_registration') && !is_user_logged_in() ) { ?>
		<p>你必须 <a href="<?php echo wp_login_url( get_permalink() ); ?>">登录</a> 才能发表评论.</p>
	<?php } else if( comments_open() ){ comment_form(); } ?>
</div>