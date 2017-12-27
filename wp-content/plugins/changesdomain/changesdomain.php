<?php
/*
Plugin Name: 一键更换域名
Description: 一键更换域名，安装后，去WP后台-工具-更换域名进行相关设置
Version: 2017.2.7
*/
if ( !function_exists( 'add_action' ) ) { exit; 
}
function VelvetBluesUU_add_management_page(){
	add_management_page("更换域名", "更换域名", "manage_options", basename(__FILE__), "VelvetBluesUU_management_page");
}
function VelvetBluesUU_management_page(){
	if ( !function_exists( 'VB_update_urls' ) ) {
		function VB_update_urls($options,$oldurl,$newurl){	
			global $wpdb;
			$results = array();
			$queries = array(
			'content' =>		array("UPDATE $wpdb->posts SET post_content = replace(post_content, %s, %s)",  __('内容项目 (文章, 页面, 自定义文章类型, 修订)','velvet-blues-update-urls') ),
			'excerpts' =>		array("UPDATE $wpdb->posts SET post_excerpt = replace(post_excerpt, %s, %s)", __('摘录内容','velvet-blues-update-urls') ),
			'attachments' =>	array("UPDATE $wpdb->posts SET guid = replace(guid, %s, %s) WHERE post_type = 'attachment'",  __('附件','velvet-blues-update-urls') ),
			'links' =>			array("UPDATE $wpdb->links SET link_url = replace(link_url, %s, %s)", __('链接URL','velvet-blues-update-urls') ),
			'custom' =>			array("UPDATE $wpdb->postmeta SET meta_value = replace(meta_value, %s, %s)",  __('自定义字段内URL','velvet-blues-update-urls') ),
			'guids' =>			array("UPDATE $wpdb->posts SET guid = replace(guid, %s, %s)",  __('GUIDs','velvet-blues-update-urls') )
			);
			foreach($options as $option){
				if( $option == 'custom' ){
					$n = 0;
					$row_count = $wpdb->get_var( "SELECT COUNT(*) FROM $wpdb->postmeta" );
					$page_size = 10000;
					$pages = ceil( $row_count / $page_size );
					
					for( $page = 0; $page < $pages; $page++ ) {
						$current_row = 0;
						$start = $page * $page_size;
						$end = $start + $page_size;
						$pmquery = "SELECT * FROM $wpdb->postmeta WHERE meta_value <> ''";
						$items = $wpdb->get_results( $pmquery );
						foreach( $items as $item ){
						$value = $item->meta_value;
						if( trim($value) == '' )
							continue;
						
							$edited = VB_unserialize_replace( $oldurl, $newurl, $value );
						
							if( $edited != $value ){
								$fix = $wpdb->query("UPDATE $wpdb->postmeta SET meta_value = '".$edited."' WHERE meta_id = ".$item->meta_id );
								if( $fix )
									$n++;
							}
						}
					}
					$results[$option] = array($n, $queries[$option][1]);
				}
				else{
					$result = $wpdb->query( $wpdb->prepare( $queries[$option][0], $oldurl, $newurl) );
					$results[$option] = array($result, $queries[$option][1]);
				}
			}
			return $results;			
		}
	}
	if ( !function_exists( 'VB_unserialize_replace' ) ) {
		function VB_unserialize_replace( $from = '', $to = '', $data = '', $serialised = false ) {
			try {
				if ( false !== is_serialized( $data ) ) {
					$unserialized = unserialize( $data );
					$data = VB_unserialize_replace( $from, $to, $unserialized, true );
				}
				elseif ( is_array( $data ) ) {
					$_tmp = array( );
					foreach ( $data as $key => $value ) {
						$_tmp[ $key ] = VB_unserialize_replace( $from, $to, $value, false );
					}
					$data = $_tmp;
					unset( $_tmp );
				}
				else {
					if ( is_string( $data ) )
						$data = str_replace( $from, $to, $data );
				}
				if ( $serialised )
					return serialize( $data );
			} catch( Exception $error ) {
			}
			return $data;
		}
	}
	if ( isset( $_POST['VBUU_settings_submit'] ) && !check_admin_referer('VBUU_submit','VBUU_nonce')){
		if(isset($_POST['VBUU_oldurl']) && isset($_POST['VBUU_newurl'])){
			if(function_exists('esc_attr')){
				$vbuu_oldurl = esc_attr(trim($_POST['VBUU_oldurl']));
				$vbuu_newurl = esc_attr(trim($_POST['VBUU_newurl']));
			}else{
				$vbuu_oldurl = attribute_escape(trim($_POST['VBUU_oldurl']));
				$vbuu_newurl = attribute_escape(trim($_POST['VBUU_newurl']));
			}
		}
		echo '<div id="message" class="error fade"><p><strong>'.__('错误','velvet-blues-update-urls').' - '.__('请重试','velvet-blues-update-urls').'</strong></p></div>';
	}
	elseif( isset( $_POST['VBUU_settings_submit'] ) && !isset( $_POST['VBUU_update_links'] ) ){
		if(isset($_POST['VBUU_oldurl']) && isset($_POST['VBUU_newurl'])){
			if(function_exists('esc_attr')){
				$vbuu_oldurl = esc_attr(trim($_POST['VBUU_oldurl']));
				$vbuu_newurl = esc_attr(trim($_POST['VBUU_newurl']));
			}else{
				$vbuu_oldurl = attribute_escape(trim($_POST['VBUU_oldurl']));
				$vbuu_newurl = attribute_escape(trim($_POST['VBUU_newurl']));
			}
		}
		echo '<div id="message" class="error fade"><p><strong>'.__('错误','velvet-blues-update-urls').' - '.__('域名更新失败','velvet-blues-update-urls').'</p></strong><p>'.__('Please select at least one checkbox.','velvet-blues-update-urls').'</p></div>';
	}
	elseif( isset( $_POST['VBUU_settings_submit'] ) ){
		$vbuu_update_links = $_POST['VBUU_update_links'];
		if(isset($_POST['VBUU_oldurl']) && isset($_POST['VBUU_newurl'])){
			if(function_exists('esc_attr')){
				$vbuu_oldurl = esc_attr(trim($_POST['VBUU_oldurl']));
				$vbuu_newurl = esc_attr(trim($_POST['VBUU_newurl']));
			}else{
				$vbuu_oldurl = attribute_escape(trim($_POST['VBUU_oldurl']));
				$vbuu_newurl = attribute_escape(trim($_POST['VBUU_newurl']));
			}
		}
		if(($vbuu_oldurl && $vbuu_oldurl != 'http://www.oldurl.com' && trim($vbuu_oldurl) != '') && ($vbuu_newurl && $vbuu_newurl != 'http://www.newurl.com' && trim($vbuu_newurl) != '')){
			$results = VB_update_urls($vbuu_update_links,$vbuu_oldurl,$vbuu_newurl);
			$empty = true;
			$emptystring = '<strong>'.__('为什么更新失败?','velvet-blues-update-urls').'</strong><br/>'.__('如果URL不正确或在内容中找不到，则会发生这种情况。检查您的网址，然后再试一次。','velvet-blues-update-urls');

			$resultstring = '';
			foreach($results as $result){
				$empty = ($result[0] != 0 || $empty == false)? false : true;
				$resultstring .= '<br/><strong>'.$result[0].'</strong> '.$result[1];
			}
			
			if( $empty ):
			?>
<div id="message" class="error fade">
<table>
<tr>
	<td><p><strong>
			<?php _e('出现了错误','velvet-blues-update-urls'); ?>
			</strong><br/>
			<?php _e('域名更新失败.','velvet-blues-update-urls'); ?>
		</p>
		<?php
			else:
			?>
		<div id="message" class="updated fade">
			<table>
				<tr>
					<td><p><strong>
							<?php _e('很棒! 域名更新完成','velvet-blues-update-urls'); ?>
							</strong></p>
						<?php
			endif;
			?>
						<p><u>
							<?php _e('更新记录：','velvet-blues-update-urls'); ?>
							</u><?php echo $resultstring; ?></p>
						<?php echo ($empty)? '<p>'.$emptystring.'</p>' : ''; ?></td>
					<td width="60"></td>
					<td align="center"><?php if( !$empty ): ?>
						<?php endif; ?>
						<p style="color:red;font-weight:bold;"><?php _e('很棒，更换域名设置在这环节已经完成了90%，还有10%就是去WP后台-设置-常规里 将WordPress地址和站点地址换成您的新域名网址即可','velvet-blues-update-urls'); ?></p>
					</td>
				</tr>
			</table>
		</div>
		<?php
		}
		else{
			echo '<div id="message" class="error fade"><p><strong>'.__('错误','velvet-blues-update-urls').' - '.__('域名更新失败','velvet-blues-update-urls').'</p></strong><p>'.__('请确认你输入的域名是否正确','velvet-blues-update-urls').'</p></div>';
		}
	}
?>
		<div class="wrap">
		<h2>更换域名设置</h2>
		<form method="post" action="tools.php?page=<?php echo basename(__FILE__); ?>">
			<?php wp_nonce_field('VBUU_submit','VBUU_nonce'); ?>
			<p><?php printf(__("该操作可逆，可自由替换域名，操作方便！",'velvet-blues-update-urls'),'<strong>Update URLs</strong>'); ?></p>
			<p><strong>
				<?php _e('但是，我还是建议您先备份一下你的网站所有文件及数据库！！！','velvet-blues-update-urls'); ?>
				</strong><br/>
			</p>
			<h3 style="margin-bottom:5px;">
				<?php _e('步骤'); ?>
				1:
				<?php _e('输入旧、新域名','velvet-blues-update-urls'); ?>
			</h3>
			<table class="form-table">
				<tr valign="middle">
					<th scope="row" width="140" style="width:140px"><strong>
						<?php _e('旧域名','velvet-blues-update-urls'); ?>
						</strong><br/>
						<span class="description">
						<?php _e('开头必须加http://','velvet-blues-update-urls'); ?>
						</span></th>
					<td><input name="VBUU_oldurl" type="text" id="VBUU_oldurl" value="<?php echo (isset($vbuu_oldurl) && trim($vbuu_oldurl) != '')? $vbuu_oldurl : 'http://www.oldurl.com'; ?>" style="width:300px;font-size:20px;" onfocus="if(this.value=='http://www.oldurl.com') this.value='';" onblur="if(this.value=='') this.value='http://www.oldurl.com';" /></td>
				</tr>
				<tr valign="middle">
					<th scope="row" width="140" style="width:140px"><strong>
						<?php _e('新域名','velvet-blues-update-urls'); ?>
						</strong><br/>
						<span class="description">
						<?php _e('开头必须加http://','velvet-blues-update-urls'); ?>
						</span></th>
					<td><input name="VBUU_newurl" type="text" id="VBUU_newurl" value="<?php echo (isset($vbuu_newurl) && trim($vbuu_newurl) != '')? $vbuu_newurl : 'http://www.newurl.com'; ?>" style="width:300px;font-size:20px;" onfocus="if(this.value=='http://www.newurl.com') this.value='';" onblur="if(this.value=='') this.value='http://www.newurl.com';" /></td>
				</tr>
			</table>
			<br/>
			<h3 style="margin-bottom:5px;">
				<?php _e('步骤'); ?>
				2:
				<?php _e('选择替换项','velvet-blues-update-urls'); ?>
			</h3>
			<table class="form-table">
				<tr>
					<td><p style="line-height:20px;">
							<input name="VBUU_update_links[]" type="checkbox" id="VBUU_update_true" value="content" checked="checked" />
							<label for="VBUU_update_true"><strong>
								<?php _e('文章内网址','velvet-blues-update-urls'); ?>
								</strong> (
								<?php _e('文章, 页面, 自定义文章类型, 修订','velvet-blues-update-urls'); ?>
								)</label>
							<br/>
							<input name="VBUU_update_links[]" type="checkbox" id="VBUU_update_true1" value="excerpts" />
							<label for="VBUU_update_true1"><strong>
								<?php _e('摘录中的网址','velvet-blues-update-urls'); ?>
								</strong></label>
							<br/>
							<input name="VBUU_update_links[]" type="checkbox" id="VBUU_update_true2" value="links" />
							<label for="VBUU_update_true2"><strong>
								<?php _e('链接中的URL','velvet-blues-update-urls'); ?>
								</strong></label>
							<br/>
							<input name="VBUU_update_links[]" type="checkbox" id="VBUU_update_true3" value="attachments" />
							<label for="VBUU_update_true3"><strong>
								<?php _e('附件网址','velvet-blues-update-urls'); ?>
								</strong> (
								<?php _e('图片, 文件, 一般媒体','velvet-blues-update-urls'); ?>
								)</label>
							<br/>
							<input name="VBUU_update_links[]" type="checkbox" id="VBUU_update_true4" value="custom" />
							<label for="VBUU_update_true4"><strong>
								<?php _e('自定义字段内URL','velvet-blues-update-urls'); ?>
								</strong></label>
							<br/>
							<input name="VBUU_update_links[]" type="checkbox" id="VBUU_update_true5" value="guids" />
							<label for="VBUU_update_true5"><strong>
								<?php _e('更新所有GUIDs','velvet-blues-update-urls'); ?>
								</strong> <a href="http://codex.wordpress.org/Changing_The_Site_URL#Important_GUID_Note" target="_blank">
								<?php _e('了解什么是GUID','velvet-blues-update-urls'); ?>
								</a></label>
						</p></td>
				</tr>
			</table>
			<p>
				<input class="button-primary" name="VBUU_settings_submit" value="<?php _e('更换域名','velvet-blues-update-urls'); ?>" type="submit" />
			</p>
		</form>


			<?php if( !isset( $empty ) ): ?>
		<p>
			<?php _e('联系QQ邮箱','velvet-blues-update-urls'); ?>
			<a href="mailto:1392429292@qq.com">1392429292@qq.com</a>.
			<?php _e('开发更好用的主题插件吧！','velvet-blues-update-urls'); ?>
			<?php endif; ?>
		</p>

<?php
}
add_action('admin_menu', 'VelvetBluesUU_add_management_page');
?>
