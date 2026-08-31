<?php
/**
 * Plugin Name: Vogue Salon — Divi 5 Migrator
 * Description: Creates the Vogue Salon & Academy pages and Divi 5 Theme Builder header/footer from the Vogue design system.
 * Version: 1.0.0
 */
defined('ABSPATH') || exit;

function vogue_divi5_markup($slug, $title, $tag) {
    $image = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1600&q=85';
    $image2 = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1400&q=85';
    $html = '<div class="vogue-page vogue-page-' . esc_attr($slug) . '">';
    $html .= '<div class="vogue-wrap vogue-hero"><div><div class="vogue-eyebrow">VOGUE / ' . esc_html(strtoupper($title)) . '</div><h1>' . esc_html($title) . '<br><em>' . esc_html($tag) . '</em></h1><p class="vogue-lead">Vogue Salon &amp; Academy in Tarn Taran — thoughtful beauty, precise technique and a modern editorial point of view.</p><div class="vogue-actions"><a class="vogue-button" href="' . esc_url(home_url('/booking/')) . '">Book an appointment</a><span class="vogue-scroll">Scroll to explore</span></div></div><div class="vogue-visual"><img src="' . esc_url($image) . '" alt="Vogue Salon &amp; Academy"><div class="vogue-tag"><span class="vogue-eyebrow">VOGUE / TARN TARAN</span><strong>Beauty, with attitude.</strong></div></div></div>';
    $html .= '<div class="vogue-wrap vogue-statement"><div class="vogue-eyebrow">THE VOGUE WAY</div><h2>Beauty should feel <em>personal.</em></h2><p>We combine strong technique with a relaxed, human experience. Every service is shaped around you, your style and the finish you want to leave with.</p></div>';
    $html .= '<div class="vogue-wrap vogue-section"><div class="vogue-eyebrow">01 / EDIT</div><h2>' . esc_html($title) . '<br><em>your way.</em></h2><div class="vogue-grid"><article class="vogue-card"><div class="vogue-label">01 / CRAFT</div><h3>Thoughtful technique</h3><p>Clean work, considered detail and a finish that feels effortless.</p></article><article class="vogue-card"><div class="vogue-label">02 / STYLE</div><h3>A clear point of view</h3><p>Modern beauty without losing the personality that makes it yours.</p></article><article class="vogue-card"><div class="vogue-label">03 / EXPERIENCE</div><h3>Made around you</h3><p>Good consultation, honest guidance and a calm salon experience.</p></article></div></div>';
    $html .= '<div class="vogue-wrap vogue-feature"><img src="' . esc_url($image2) . '" alt="Vogue beauty experience"><div><div class="vogue-eyebrow">THE EXPERIENCE</div><h2>Good work.<br><em>Good energy.</em></h2><p>From the first consultation to the final detail, Vogue is designed to make beauty feel considered rather than complicated.</p><div class="vogue-meta"><div><b>01</b><span>Consultation</span></div><div><b>02</b><span>Personalised service</span></div><div><b>03</b><span>Finish &amp; aftercare</span></div></div></div></div>';
    $html .= '<div class="vogue-wrap vogue-quote"><p>Come for the service. Leave with a little more <em>you.</em></p></div>';
    $html .= '<div class="vogue-final"><div class="vogue-wrap vogue-final-inner"><div><div class="vogue-eyebrow">READY WHEN YOU ARE</div><h2>Step into<br><em>Vogue.</em></h2></div><a class="vogue-button" href="' . esc_url(home_url('/booking/')) . '">Book your visit</a></div></div>';
    $html .= '</div>';

    return '<!-- wp:divi/placeholder -->\n<!-- wp:divi/section {"builderVersion":"5.9.0"} -->\n<!-- wp:divi/row {"module":{"advanced":{"type":{"desktop":{"value":"1_1"}}}},"builderVersion":"5.9.0"} -->\n<!-- wp:divi/column {"module":{"advanced":{"type":{"desktop":{"value":"1_1"}}}},"builderVersion":"5.9.0"} -->\n<!-- wp:divi/text ' . wp_json_encode(['content'=>['innerContent'=>['desktop'=>['value'=>$html]]],'builderVersion'=>'5.9.0']) . ' /-->\n<!-- /wp:divi/column -->\n<!-- /wp:divi/row -->\n<!-- /wp:divi/section -->\n<!-- /wp:divi/placeholder -->';
}

function vogue_divi5_header_markup() {
    $html = '<header class="vogue-wp-header"><div class="vogue-wrap"><a class="vogue-wp-logo" href="' . esc_url(home_url('/')) . '">VOGUE</a><nav><a href="' . esc_url(home_url('/services/')) . '">Services</a><a href="' . esc_url(home_url('/hair/')) . '">Hair</a><a href="' . esc_url(home_url('/bridal/')) . '">Bridal</a><a href="' . esc_url(home_url('/academy/')) . '">Academy</a><a href="' . esc_url(home_url('/about/')) . '">About</a></nav><a class="vogue-button" href="' . esc_url(home_url('/booking/')) . '">Book</a></div></header>';
    return vogue_divi5_text_layout($html, 'Vogue Global Header', 'et_header_layout');
}
function vogue_divi5_footer_markup() {
    $html = '<footer class="vogue-wp-footer"><div class="vogue-wrap"><div><a class="vogue-wp-logo" href="' . esc_url(home_url('/')) . '">VOGUE</a><p>Salon &amp; Academy<br>Tarn Taran, Punjab</p></div><div><b>Explore</b><a href="' . esc_url(home_url('/services/')) . '">Services</a><a href="' . esc_url(home_url('/hair/')) . '">Hair</a><a href="' . esc_url(home_url('/bridal/')) . '">Bridal</a><a href="' . esc_url(home_url('/academy/')) . '">Academy</a></div><div><b>Visit</b><p>Tarn Taran, Punjab<br>India</p></div><div><b>Follow</b><a href="https://www.instagram.com/voguesalon_tarntaran/">Instagram</a><a href="' . esc_url(home_url('/booking/')) . '">Book online</a></div></div><div class="vogue-wrap vogue-footer-bottom">© Vogue Salon &amp; Academy <span>Beauty, with attitude.</span></div></footer>';
    return vogue_divi5_text_layout($html, 'Vogue Global Footer', 'et_footer_layout');
}
function vogue_divi5_text_layout($html, $title, $post_type) {
    return ['post_type'=>$post_type,'post_status'=>'publish','post_title'=>$title,'post_content'=>'<!-- wp:divi/placeholder -->\n<!-- wp:divi/section {"builderVersion":"5.9.0"} -->\n<!-- wp:divi/row {"builderVersion":"5.9.0"} -->\n<!-- wp:divi/column {"builderVersion":"5.9.0"} -->\n<!-- wp:divi/text '.wp_json_encode(['content'=>['innerContent'=>['desktop'=>['value'=>$html]]],'builderVersion'=>'5.9.0']).' /-->\n<!-- /wp:divi/column -->\n<!-- /wp:divi/row -->\n<!-- /wp:divi/section -->\n<!-- /wp:divi/placeholder -->'];
}

function vogue_divi5_run_import() {
    if (!current_user_can('manage_options')) wp_die('Permission denied.');
    check_admin_referer('vogue_divi5_import');
    if (!defined('ET_BUILDER_VERSION') && !function_exists('et_theme_builder_get_theme_builder_post_id')) {
        wp_die('Divi 5 must be installed and active before importing the Vogue site.');
    }
    $pages = [
        ['services','Services','Beauty, edited to you.'],['hair','Hair','Cut. Colour. Character.'],['makeup','Makeup','Makeup with a point of view.'],['mens','Men\'s Grooming','Sharp, considered grooming.'],['nails','Nails','Small details. Big finish.'],['bridal','Bridal','Your day. Your look.'],['academy','Academy','Learn. Create. Lead.'],['about','The Vogue House','Beauty, made local.'],['booking','Book Your Visit','Make time for you.']
    ];
    $created=[];
    foreach($pages as $p){
        $existing=get_page_by_path($p[0]);
        $args=['post_title'=>$p[1],'post_name'=>$p[0],'post_status'=>'publish','post_type'=>'page','post_content'=>vogue_divi5_markup($p[0],$p[1],$p[2])];
        $id=$existing ? wp_update_post(array_merge($args,['ID'=>$existing->ID]),true) : wp_insert_post($args,true);
        if(!is_wp_error($id)) $created[]=$id;
    }
    $home=get_page_by_path('');
    $home_id=get_page_by_path('home');
    if($home_id) update_option('show_on_front','page');
    $header_id=$footer_id=0;
    if(function_exists('et_theme_builder_insert_layout')){
        $h=et_theme_builder_insert_layout(vogue_divi5_header_markup());
        $f=et_theme_builder_insert_layout(vogue_divi5_footer_markup());
        $header_id=is_wp_error($h)?0:$h; $footer_id=is_wp_error($f)?0:$f;
    }
    update_option('vogue_divi5_imported',current_time('mysql'));
    wp_safe_redirect(admin_url('admin.php?page=vogue-divi5-migrator&imported=1&pages='.count($created).'&header='.intval($header_id).'&footer='.intval($footer_id)); exit;
}
add_action('admin_post_vogue_divi5_import','vogue_divi5_run_import');

function vogue_divi5_admin_page(){
    if(!current_user_can('manage_options')) return;
    echo '<div class="wrap"><h1>Vogue Salon — Divi 5</h1><p>This importer creates the Vogue pages using Divi 5 block markup and, when the Divi Theme Builder API is available, creates the global header/footer layouts.</p><p><strong>Existing pages with the same slugs are updated.</strong> The importer does not delete unrelated WordPress content.</p><form method="post" action="'.esc_url(admin_url('admin-post.php')).'"><input type="hidden" name="action" value="vogue_divi5_import">'.wp_nonce_field('vogue_divi5_import','_wpnonce',true,false).'<p><button class="button button-primary button-hero">Import Vogue Divi 5 Site</button></p></form></div>';
}
add_action('admin_menu',function(){add_management_page('Vogue Divi 5','Vogue Divi 5','manage_options','vogue-divi5-migrator','vogue_divi5_admin_page');});
