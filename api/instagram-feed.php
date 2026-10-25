<?php
declare(strict_types=1);

/**
 * Public, read-only Instagram feed endpoint.
 *
 * Configure INSTAGRAM_ACCESS_TOKEN on the server (never in JavaScript or Git).
 * Token must belong to the salon's Instagram Business/Creator account and have
 * instagram_business_basic permission via Instagram Login.
 */
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=300, stale-while-revalidate=600');
header('X-Content-Type-Options: nosniff');

const FEED_LIMIT = 30;
const CACHE_TTL = 1800;

function feed_response(array $data, int $status = 200): never {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

$token = trim((string) (getenv('INSTAGRAM_ACCESS_TOKEN') ?: ''));
if ($token === '') {
    feed_response(['configured' => false, 'items' => [], 'message' => 'Instagram feed is not connected yet.']);
}
if (!function_exists('curl_init')) {
    feed_response(['configured' => true, 'items' => [], 'message' => 'Instagram feed service is temporarily unavailable.'], 503);
}

$version = trim((string) (getenv('INSTAGRAM_API_VERSION') ?: 'v26.0'));
if (!preg_match('/^v[0-9]+\\.[0-9]+$/', $version)) {
    $version = 'v26.0';
}

$cacheFile = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR)
    . DIRECTORY_SEPARATOR . 'vogue-instagram-' . hash('sha256', $token) . '.json';

if (is_file($cacheFile) && (time() - (int) filemtime($cacheFile)) < CACHE_TTL) {
    $cached = file_get_contents($cacheFile);
    if (is_string($cached)) {
        $decoded = json_decode($cached, true);
        if (is_array($decoded) && isset($decoded['items']) && is_array($decoded['items'])) {
            feed_response(['configured' => true, 'cached' => true, 'items' => $decoded['items']]);
        }
    }
}

function instagram_get(string $url, string $token): ?array {
    $separator = str_contains($url, '?') ? '&' : '?';
    $url .= $separator . http_build_query(['access_token' => $token]);
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_TIMEOUT => 12,
        CURLOPT_FOLLOWLOCATION => false,
        CURLOPT_HTTPHEADER => ['Accept: application/json'],
        CURLOPT_USERAGENT => 'VogueSalonWebsite/1.0',
    ]);
    $body = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    curl_close($ch);
    if (!is_string($body) || $status < 200 || $status >= 300) return null;
    $json = json_decode($body, true);
    return is_array($json) ? $json : null;
}

$fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,children{media_type,media_url,thumbnail_url,permalink}';
$url = 'https://graph.instagram.com/' . $version . '/me/media?' . http_build_query([
    'fields' => $fields,
    'limit' => FEED_LIMIT,
]);
$payload = instagram_get($url, $token);
if (!$payload || !isset($payload['data']) || !is_array($payload['data'])) {
    // Keep the previous cache available if Instagram is temporarily unavailable.
    if (is_file($cacheFile)) {
        $cached = file_get_contents($cacheFile);
        $decoded = is_string($cached) ? json_decode($cached, true) : null;
        if (is_array($decoded) && isset($decoded['items']) && is_array($decoded['items'])) {
            feed_response(['configured' => true, 'cached' => true, 'stale' => true, 'items' => $decoded['items']]);
        }
    }
    feed_response(['configured' => true, 'items' => [], 'message' => 'Instagram could not be reached. Please try again later.'], 503);
}

$items = [];
foreach ($payload['data'] as $post) {
    if (!is_array($post)) continue;
    $type = strtoupper((string) ($post['media_type'] ?? ''));
    $permalink = (string) ($post['permalink'] ?? '');
    if (!preg_match('~^https://www\\.instagram\\.com/(?:p|reel|tv)/[A-Za-z0-9_-]+/?(?:\\?.*)?$~', $permalink)) continue;

    if ($type === 'CAROUSEL_ALBUM' && !empty($post['children']['data']) && is_array($post['children']['data'])) {
        foreach ($post['children']['data'] as $child) {
            if (!is_array($child)) continue;
            $childType = strtoupper((string) ($child['media_type'] ?? ''));
            $src = (string) (($childType === 'VIDEO' ? ($child['media_url'] ?? '') : ($child['media_url'] ?? '')));
            $poster = (string) ($child['thumbnail_url'] ?? $src);
            if (!filter_var($src, FILTER_VALIDATE_URL) || !in_array((string) parse_url($src, PHP_URL_SCHEME), ['https'], true)) continue;
            $items[] = [
                'type' => $childType === 'VIDEO' ? 'video' : 'image',
                'src' => $src,
                'poster' => $poster,
                'href' => $permalink,
                'label' => $childType === 'VIDEO' ? 'REEL' : 'FROM INSTAGRAM',
                'title' => trim((string) ($post['caption'] ?? '')) ?: 'Vogue Salon moment',
                'timestamp' => (string) ($post['timestamp'] ?? ''),
            ];
        }
        continue;
    }

    $src = (string) ($post['media_url'] ?? '');
    if ($type === 'VIDEO') $src = (string) ($post['media_url'] ?? '');
    if (!filter_var($src, FILTER_VALIDATE_URL) || parse_url($src, PHP_URL_SCHEME) !== 'https') continue;
    $poster = (string) ($post['thumbnail_url'] ?? $src);
    $caption = trim((string) ($post['caption'] ?? ''));
    $title = $caption !== '' ? preg_replace('/\\s+/u', ' ', $caption) : 'Vogue Salon moment';
    if (is_string($title) && mb_strlen($title, 'UTF-8') > 100) $title = mb_substr($title, 0, 97, 'UTF-8') . '…';
    $items[] = [
        'type' => $type === 'VIDEO' ? 'video' : 'image',
        'src' => $src,
        'poster' => $poster,
        'href' => $permalink,
        'label' => $type === 'VIDEO' ? 'REEL' : 'FROM INSTAGRAM',
        'title' => $title ?: 'Vogue Salon moment',
        'timestamp' => (string) ($post['timestamp'] ?? ''),
    ];
}

$result = ['items' => array_slice($items, 0, FEED_LIMIT)];
@file_put_contents($cacheFile, json_encode($result, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE), LOCK_EX);
feed_response(['configured' => true, 'cached' => false, 'items' => $result['items']]);
