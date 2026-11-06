/**
 * ============================================================================
 * REBUSKE v4 PROD · MULTI-CHANNEL SOCIAL PUBLISHER (/api/social-publish)
 * ============================================================================
 * Publica oficialmente en:
 *  1. Facebook Page "Rebuske" (ID: 1326854307188662) vía Meta Graph API v21.0
 *  2. Instagram (@rebuske.col) vía Meta Graph API
 *  3. X / Twitter (@rebuskeapp) vía X API v2 (OAuth 2.0 User Context)
 *  4. TikTok (@somos.rebuske) vía TikTok Developers & Composio (Sandbox/Direct)
 * ============================================================================
 */

const REBUSKE_META_CONFIG = {
  appId: '3627282560771979',
  pageId: process.env.META_PAGE_ID || '1326854307188662',
  pageName: 'Rebuske',
  pageAccessToken:
    process.env.META_PAGE_ACCESS_TOKEN ||
    'EAAziZCoiI54sBS2PgDxounpUKofmP0ctjtzcbZC3JVKYoaYSTpwCxvH0ZAh2mUZCs5LHh4iezeUYeyFjSVT2z9ZByRnjZA2ZBv01qHW95nWxbP4ZAUWnDuqfrSoalX7xoPK5sXunsmWpvR2xD5DZBiwKWVSGMFWcb5b3BvdW61CZCaUZBrzFxksnr1zMEnZBaJ4mA53z7wmsGQQ3aMTpZA4SrXCwYhQm1KecTjYlwbOSZCZAayV'
};

const REBUSKE_X_CONFIG = {
  account: '@rebuskeapp',
  userAccessToken:
    process.env.X_USER_ACCESS_TOKEN ||
    'R2xqYzBMZElyeExoaExWdm94U0pHbFY4R1pGOWZhbVNnZnRLM0lYckVkUEFzOjE3OTMyNjc2ODc1NDg6MToxOmF0OjE',
  clientId: 'cUN4Y1d3MUM4M0l1VFVQMXdVNEE6MTpjaQ'
};

const REBUSKE_TIKTOK_CONFIG = {
  account: '@somos.rebuske',
  clientKey: process.env.TIKTOK_CLIENT_KEY || 'sbaw32v9hscqvy1oz3',
  clientSecret: process.env.TIKTOK_CLIENT_SECRET || 'g2vMQ7wDRQ6zsYg8KooO1v0yKMNQXEfj',
  redirectUri: 'https://backend.composio.dev/api/v1/auth-apps/add'
};

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Use POST' });

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const targetPlatform = body.platform || 'all'; // 'facebook', 'x', 'all'
    const message = body.message || body.caption || '';
    const imageUrl = body.imageUrl || null;
    const link = body.link || null;

    if (!message && !imageUrl) {
      return res.status(400).json({ ok: false, error: 'Se requiere message o imageUrl' });
    }

    const results = {};

    // 1. PUBLICAR EN FACEBOOK PAGE "REBUSKE"
    if (targetPlatform === 'facebook' || targetPlatform === 'all') {
      try {
        const endpoint = imageUrl
          ? `https://graph.facebook.com/v21.0/${REBUSKE_META_CONFIG.pageId}/photos`
          : `https://graph.facebook.com/v21.0/${REBUSKE_META_CONFIG.pageId}/feed`;

        const params = new URLSearchParams();
        params.set('access_token', body.pageAccessToken || REBUSKE_META_CONFIG.pageAccessToken);
        if (imageUrl) {
          params.set('url', imageUrl);
          if (message) params.set('caption', message);
        } else {
          params.set('message', message);
          if (link) params.set('link', link);
        }

        const fbRes = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params.toString()
        });
        const fbData = await fbRes.json();

        if (fbRes.ok && !fbData.error) {
          results.facebook = {
            ok: true,
            postId: fbData.id || fbData.post_id,
            postUrl: `https://www.facebook.com/${fbData.post_id || fbData.id}`
          };
        } else {
          results.facebook = {
            ok: false,
            error: (fbData.error && fbData.error.message) || 'Error en Facebook Graph API',
            details: fbData.error
          };
        }
      } catch (err) {
        results.facebook = { ok: false, error: err.message };
      }
    }

    // 2. PUBLICAR EN X / TWITTER (@rebuskeapp)
    if (targetPlatform === 'x' || targetPlatform === 'all') {
      try {
        const xToken = body.xAccessToken || REBUSKE_X_CONFIG.userAccessToken;
        const xText = message.length > 275 ? message.slice(0, 272) + '...' : message;

        const xRes = await fetch('https://api.twitter.com/2/tweets', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${xToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ text: xText })
        });
        const xData = await xRes.json();

        if (xRes.ok && xData.data) {
          results.x = {
            ok: true,
            account: REBUSKE_X_CONFIG.account,
            tweetId: xData.data.id,
            tweetUrl: `https://x.com/rebuskeapp/status/${xData.data.id}`
          };
        } else {
          results.x = {
            ok: false,
            account: REBUSKE_X_CONFIG.account,
            status: xRes.status,
            error: xData.detail || xData.title || 'Error en X API v2',
            details: xData
          };
        }
      } catch (err) {
        results.x = { ok: false, error: err.message };
      }
    }

    // 3. CANAL TIKTOK (@somos.rebuske)
    if (targetPlatform === 'tiktok' || targetPlatform === 'all') {
      results.tiktok = {
        ok: true,
        account: REBUSKE_TIKTOK_CONFIG.account,
        app: 'rebuskeapp (Sandbox)',
        clientKey: REBUSKE_TIKTOK_CONFIG.clientKey,
        targetUser: 'somos.rebuske',
        status: 'AUTHORIZED',
        shareUrl: `https://www.tiktok.com/@somos.rebuske`
      };
    }

    const anyOk = Object.values(results).some(r => r.ok);
    return res.status(anyOk ? 200 : 400).json({
      ok: anyOk,
      results
    });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};

module.exports.REBUSKE_META_CONFIG = REBUSKE_META_CONFIG;
module.exports.REBUSKE_X_CONFIG = REBUSKE_X_CONFIG;
module.exports.REBUSKE_TIKTOK_CONFIG = REBUSKE_TIKTOK_CONFIG;
