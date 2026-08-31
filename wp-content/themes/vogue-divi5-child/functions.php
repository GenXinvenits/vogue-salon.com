<?php
/** Vogue Salon — Divi 5 child theme bootstrap. */
defined('ABSPATH') || exit;

function vogue_divi5_child_assets() {
    wp_enqueue_style('vogue-google-fonts', 'https://fonts.googleapis.com/css2?family=DM+Mono&family=DM+Sans:wght@400;500;600&family=Playfair+Display:ital,wght@0,500;0,600;1,500&display=swap', [], null);
    wp_enqueue_style('vogue-divi-child', get_stylesheet_directory_uri() . '/style.css', ['divi-style'], '1.0.0');
    wp_enqueue_style('vogue-divi-design', get_stylesheet_directory_uri() . '/assets/vogue-divi.css', ['vogue-divi-child'], '1.0.0');
    wp_enqueue_script('vogue-divi-motion', get_stylesheet_directory_uri() . '/assets/vogue-divi.js', [], '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'vogue_divi5_child_assets', 20);

function vogue_divi5_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
}
add_action('after_setup_theme', 'vogue_divi5_theme_setup');
