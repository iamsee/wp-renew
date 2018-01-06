<?php
/**
 * Created by PhpStorm.
 * User: ql-qf
 * Date: 2018/1/5
 * Time: 9:06
 */


/**
 * Class Name: wp_bootstrap_navwalker
 * GitHub URI: https://github.com/twittem/wp-bootstrap-navwalker
 * Description: A custom WordPress nav walker class to implement the Bootstrap 3 navigation style in a custom theme using the WordPress built in menu manager.
 * Version: 2.0.4
 * Author: Edward McIntyre - @twittem
 * License: GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 */
add_action( 'init', 'register_my_menu' );
function register_my_menu() {
	register_nav_menus( array(
		'top_menu'    => '默认菜单',
		'footer_menu' => '底部菜单',
		'mobile_menu' => '手机菜单'
	) );
}


class wp_menu_walker extends Walker_Nav_Menu {


	function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
		helper::echo2console($item);
		if($depth == 0 || true){
			if($item->current){
				$output .= "<li class='menu-item  active'><a href='". $item->url ."' class='active'>". $item->title ."</a>";
			}
			else{
				$output .= "<li class='menu-item'><a href='". $item->url ."'>". $item->title ."</a>";

			}

		}
//		else{
//			$output .= "<li class='menu-item'>";
//		}

	}
	function end_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
		$output .= "</li>";
	}

	function start_lvl( &$output, $depth = 0, $args = array() ) {

		$output .= "<ul class='sub-menu'>";
	}
	function end_lvl( &$output, $depth = 0, $args = array() ) {
		parent::end_lvl( $output, $depth, $args ); // TODO: Change the autogenerated stub
	}


}

function gemsky_menu( $args = array() ) {
	$defaults = array(
		'sort_column' => 'menu_order, post_title',
		'menu_class'  => 'menu',
		'echo'        => true,
		'link_before' => '',
		'link_after'  => ''
	);
	$args     = wp_parse_args( $args, $defaults );
	$args     = apply_filters( 'wp_page_menu_args', $args );

	$menu = '';

	$list_args = $args;

	// Show Home in the menu
	if ( ! empty( $args['show_home'] ) ) {
		if ( true === $args['show_home'] || '1' === $args['show_home'] || 1 === $args['show_home'] ) {
			$text = __( 'Home', 'wallstreet' );
		} else {
			$text = $args['show_home'];
		}
		$class = '';
		if ( is_front_page() && ! is_paged() ) {
			$class = 'class="current_page_item"';
		}
		$menu .= '<li ' . $class . '><a href="' . home_url( '/' ) . '" title="' . esc_attr( $text ) . '">' . $args['link_before'] . $text . $args['link_after'] . '</a></li>';
		// If the front page is a page, add it to the exclude list
		if ( get_option( 'show_on_front' ) == 'page' ) {
			if ( ! empty( $list_args['exclude'] ) ) {
				$list_args['exclude'] .= ',';
			} else {
				$list_args['exclude'] = '';
			}
			$list_args['exclude'] .= get_option( 'page_on_front' );
		}
	}

	$list_args['echo']     = false;
	$list_args['title_li'] = '';
	$list_args['walker']   = new webriti_walker_page_menu;
	$menu                  .= str_replace( array( "\r", "\n", "\t" ), '', wp_list_pages( $list_args ) );

	if ( $menu ) {
		$menu = '<ul class="' . esc_attr( $args['menu_class'] ) . '">' . $menu . '</ul>';
	}

	$menu = '<div class="' . esc_attr( $args['container_class'] ) . '">' . $menu . "</div>\n";
	$menu = apply_filters( 'wp_page_menu', $menu, $args );
	if ( $args['echo'] ) {
		echo $menu;
	} else {
		return $menu;
	}
}