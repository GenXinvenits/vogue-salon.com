# Instagram feed setup

The website now checks `/api/instagram-feed.php` for current Instagram media. When the API is connected, the home-page feed and Gallery page use recent posts/Reels from the salon account automatically. Results are cached for 30 minutes, and the existing bundled media remains as a fallback while the feed is not configured or Meta is temporarily unavailable.

## One-time Meta setup

1. The Instagram account must be a **Business or Creator** account. Personal accounts are not supported by the official Instagram Platform API.
2. Create/configure a Meta developer app and add **Instagram API with Instagram Login**.
3. Grant the account's authorization for `instagram_business_basic`.
4. Obtain a long-lived Instagram user access token for **@voguesalon_tarntaran**.
5. In the PHP hosting environment, set:
   - `INSTAGRAM_ACCESS_TOKEN` = the long-lived token
   - `INSTAGRAM_API_VERSION` = `v26.0` (optional; this is the current default in the endpoint)
6. Ensure PHP cURL is enabled and the web server can make outbound HTTPS requests to `graph.instagram.com`.
7. Open `/api/instagram-feed.php` and confirm it returns JSON with `"configured":true` and an `items` array.

**Security:** set the token in the hosting provider's environment/configuration outside the public web root. Never put it in JavaScript, a public PHP file, or Git. Do not paste it into an issue or chat. Use HTTPS for the website.

## Refresh and behavior

- Feed data is cached for 30 minutes on the server; the first request after expiry refreshes it from Meta.
- The API endpoint returns only the media list; it does not publish, edit or delete Instagram content.
- Long-lived Instagram tokens expire (typically after 60 days). Set a reminder to refresh/replace the token before expiry, or configure a secure server-side token-refresh process in the hosting environment.
- The API returns the media URLs supplied by Meta. They are not permanent public URLs, so the site fetches fresh data after the cache expires.
- If the API is not configured, the gallery falls back to the local media already committed to the website.

## Troubleshooting

- `configured:false`: the server environment variable is not visible to PHP.
- `503` / temporary unavailability: check PHP cURL, outbound HTTPS, token validity, permissions, and the Meta app's account authorization.
- If the Instagram account is personal, convert it to Business or Creator before connecting.
