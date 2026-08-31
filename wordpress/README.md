# Vogue Salon & Academy — WordPress / Divi 5

This branch is a clean WordPress + Divi 5 migration of the Vogue Salon site.

## What is included

- `wp-content/themes/vogue-divi5-child/` — Vogue design system, responsive CSS, typography, light/dark/auto theme handling and motion.
- `wp-content/plugins/vogue-divi5-migrator/` — one-click importer that creates the Vogue pages as Divi 5 block content and creates the global header/footer when Divi 5's Theme Builder API is available.
- The original static HTML files remain in the repository as content/reference material; they are not used by WordPress after migration.

## Requirements

- WordPress 6.x
- Divi 5 installed and active
- PHP 8.x recommended

Divi 5 stores layouts as Gutenberg-style `wp:divi/*` blocks and its Theme Builder controls reusable header/footer templates. This migration follows that model rather than converting the old HTML into legacy Divi 4 shortcodes.

## Install

1. Install WordPress.
2. Install and activate **Divi 5**.
3. Copy `wp-content/themes/vogue-divi5-child` into `wp-content/themes/`.
4. Copy `wp-content/plugins/vogue-divi5-migrator` into `wp-content/plugins/`.
5. Activate **Vogue Salon — Divi 5 Migrator**.
6. Activate **Vogue Salon — Divi 5 Child** as the child theme of Divi.
7. Open **Tools → Vogue Divi 5**.
8. Click **Import Vogue Divi 5 Site**.

The importer creates:

- Home
- Services
- Hair
- Makeup
- Men's Grooming
- Nails
- Bridal
- Academy
- The Vogue House / About
- Book Your Visit

It also sets the Vogue home page as the WordPress front page. Existing pages with matching slugs/titles are updated; unrelated content is not deleted.

## Divi 5 structure

The page content uses the Divi 5 hierarchy:

`placeholder → section → row → column → text`

The visual/editorial layout is HTML inside Divi Text modules, while the surrounding page is native Divi 5 block markup. This keeps the design editable in the Divi Visual Builder while avoiding the legacy Divi 4 shortcode system.

Divi 5 supports Dynamic Content and Theme Builder templates, so services, prices, galleries and booking data can later be moved into reusable WordPress-managed content instead of hard-coded page copy.

## Theme system

The child theme provides:

- DM Sans
- DM Mono
- Playfair Display
- Vogue editorial typography
- Light theme
- Dark theme
- Auto browser/OS theme
- Responsive desktop/tablet/mobile layouts
- Reduced-motion support
- GSAP/ScrollTrigger-compatible reveal hooks

The static site's old CSS is not loaded by the WordPress theme.

## Theme Builder

Divi 5's Theme Builder is the correct place for the reusable global header/footer. Divi supports exporting/importing Theme Builder templates as JSON.

The migrator attempts to create those layouts using Divi's available Theme Builder PHP API. If the installed Divi build does not expose that API, the pages are still created and the header/footer layouts can be assigned manually in **Divi → Theme Builder**.
