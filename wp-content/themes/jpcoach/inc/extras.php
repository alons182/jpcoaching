<?php
/**
 * Custom functions that act independently of the theme templates.
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package jpcoach
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function jpcoach_body_classes( $classes ) {
	// Adds a class of group-blog to blogs with more than 1 published author.
	if ( is_multi_author() ) {
		$classes[] = 'group-blog';
	}

	return $classes;
}
add_filter( 'body_class', 'jpcoach_body_classes' );

/**
 * Trick for class to anchor menu
 * @param [type] $ulclass [description]
 */
function add_menuclass($ulclass) {
return preg_replace('/rel="anchor"/', 'class="anchor"', $ulclass, -1);
}
add_filter('wp_nav_menu','add_menuclass');
