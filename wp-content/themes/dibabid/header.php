<?php
/**
 * The Header template for our theme
 *
 * Displays all of the <head> section and everything up till <div id="main">
 *
 * @package WordPress
 * @subpackage Twenty_Twelve
 * @since Twenty Twelve 1.0
 */
?><!DOCTYPE html>
<!--[if IE 7]>
<html class="ie ie7" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 8]>
<html class="ie ie8" <?php language_attributes(); ?>>
<![endif]-->
<!--[if !(IE 7) & !(IE 8)]><!-->
<html <?php language_attributes(); ?>>
<!--<![endif]-->
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<meta name="viewport" content="width=device-width" />
<title><?php wp_title( '|', true, 'right' ); ?></title>
<link rel="profile" href="http://gmpg.org/xfn/11" />
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
<?php // Loads HTML5 JavaScript file to add support for HTML5 elements in older IE versions. ?>
<!--[if lt IE 9]>
<script src="<?php echo get_template_directory_uri(); ?>/js/html5.js" type="text/javascript"></script>
<![endif]-->
<link rel="stylesheet" href="http://<?php echo $_SERVER['SERVER_NAME'];?>/auctions/styles/main.css" />
<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" />
<?php wp_head(); ?>
<script type="text/javascript">
var $=jQuery.noConflict();
//<![CDATA[
/*$(function(){
	 $.get("http://<?php echo $_SERVER['SERVER_NAME'];?>/auctions/",function(data,status){
	  $('#masthead').html($(data).filter('.navbar-fixed-top').clone());
	  $('#footer-col').html($(data).filter('#footerwrap').clone());
  });
});*/
//]]>

</script>
<?php

$tmp=explode('https',get_template_directory_uri());

 $protocol =(count($tmp)== 2) ? 'https://' : 'http://';?>
<script src="<?php echo $protocol.$_SERVER['HTTP_HOST'];?>/auctions/components/jquery/jquery.min.js"></script>
<script src="<?php echo $protocol.$_SERVER['HTTP_HOST'];?>/auctions/components/angular/angular.js"></script>
<script src="<?php echo $protocol.$_SERVER['HTTP_HOST'];?>/auctions/components/ng-file-upload/angular-file-upload-shim.min.js"></script>
<script src="<?php echo $protocol.$_SERVER['HTTP_HOST'];?>/auctions/components/angular-resource/angular-resource.js"></script>
<script src="<?php echo $protocol.$_SERVER['HTTP_HOST'];?>/auctions/components/angular-cookie/angular-cookie.js"></script>
	<script src="<?php echo $protocol.$_SERVER['HTTP_HOST'];?>/auctions/components/angular-bootstrap/ui-bootstrap-tpls.js"></script>
<!--<script src="http://<?php echo $protocol.$_SERVER['HTTP_HOST'];?>/auctions/components/components/angular-sanitize/angular-sanitize1.js"></script>-->
<script src="<?php echo $protocol.$_SERVER['HTTP_HOST'];?>/auctions/components/ng-file-upload/angular-file-upload.min.js"></script>
<script src="<?php echo $protocol.$_SERVER['HTTP_HOST'];?>/auctions/components/angular-route/angular-route.js"></script>
 <script src="<?php echo $protocol.$_SERVER['HTTP_HOST'];?>/auctions/components/ng-idle/angular-idle.min.js"></script>
<script type="text/javascript">
angular.module('FasbidClient',['ngRoute', 'ui.bootstrap','angularFileUpload','ipCookie','ngIdle']).run();
</script>
	<script src="<?php echo $protocol.$_SERVER['HTTP_HOST'];?>/auctions/scripts/services/dataService.js"></script>
	<script src="<?php echo $protocol.$_SERVER['HTTP_HOST'];?>/auctions/scripts/services/afns.js"></script>
	<script src="<?php echo $protocol.$_SERVER['HTTP_HOST'];?>/auctions/scripts/services/sandf.js"></script>
<!--<script src="http://<?php echo $_SERVER['HTTP_HOST'];?>/auctions/scripts/config.js"></script>
<script src="http://<?php echo $_SERVER['HTTP_HOST'];?>/auctions/scripts/app.js"></script>-->
<script src="<?php echo get_template_directory_uri(); ?>/js/fbheader.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/fbfooter.js"></script>
</head>

<body <?php body_class(); ?> ng-app="FasbidClient">
<?php echo get_template_directory_uri();
echo count($tmp);
?>
<div id="page" class="hfeed site" >
<div fbheader></div>
<?php /*	<header id="masthead" class="site-header" role="banner">
		<hgroup>
			<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
			<h2 class="site-description"><?php bloginfo( 'description' ); ?></h2>
		</hgroup>

		<nav id="site-navigation" class="main-navigation" role="navigation">
			<button class="menu-toggle"><?php _e( 'Menu', 'twentytwelve' ); ?></button>
			<a class="assistive-text" href="#content" title="<?php esc_attr_e( 'Skip to content', 'twentytwelve' ); ?>"><?php _e( 'Skip to content', 'twentytwelve' ); ?></a>
			<?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_class' => 'nav-menu' ) ); ?>
		</nav><!-- #site-navigation -->

		<?php if ( get_header_image() ) : ?>
		<a href="<?php echo esc_url( home_url( '/' ) ); ?>"><img src="<?php header_image(); ?>" class="header-image" width="<?php echo get_custom_header()->width; ?>" height="<?php echo get_custom_header()->height; ?>" alt="" /></a>
		<?php endif; ?>
	</header> */?><!-- #masthead -->

	<div id="main" class="wrapper">