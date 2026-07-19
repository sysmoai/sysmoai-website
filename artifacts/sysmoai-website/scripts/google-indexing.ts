/**
 * Google Indexing API notification
 *
 * Google does not support IndexNow, so changed URLs are submitted to the
 * Google Search Console Indexing API instead. Uses a service-account JSON
 * credential provided via the GOOGLE_INDEXING_SERVICE_ACCOUNT secret.
 *
 * Setup (one-time, if the secret is not configured):
 *   1. In Google Cloud Console, create (or reuse) a project and enable the
 *      "Web Search Indexing API".
 *   2. Create a service account and download its JSON key.
 *   3. In Google Search Console, add the service account's email
 *      (client_email from the JSON) as an Owner of the sysmoai.com property.
 *   4. Store the full JSON key as the GOOGLE_INDEXING_SERVICE_ACCOUNT secret.
 *
 * Fallback when the secret is unavailable: Google discovers changes through
 * normal sitemap crawling (sitemap.xml is referenced in robots.txt). You can
 * also manually request indexing of key pages via Search Console's URL
 * Inspection tool. Google retired the sitemap "ping" endpoint in 2023, so
 * there is no unauthenticated push mechanism.
 *
 * Note: Google officially scopes the Indexing API to JobPosting/BroadcastEvent
 * pages, but it is widely used to accelerate recrawls; failures here are
 * always non-fatal.
 */

import crypto from 'crypto';

const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const SCOPE = 'https://www.googleapis.com/auth/indexing';
const PUBLISH_URL = 'https://indexing.googleapis.com/v3/urlNotifications:publish';

interface ServiceAccount {
  client_email: string;
  private_key: string;
}

function base64url(input: Buffer | string): string {
  return Buffer.from(input).toString('base64url');
}

function loadServiceAccount(): ServiceAccount | null {
  const raw = process.env.GOOGLE_INDEXING_SERVICE_ACCOUNT;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.client_email === 'string' && typeof parsed.private_key === 'string') {
      return parsed as ServiceAccount;
    }
    console.warn('⚠️ GOOGLE_INDEXING_SERVICE_ACCOUNT is set but missing client_email/private_key — skipping Google');
    return null;
  } catch {
    console.warn('⚠️ GOOGLE_INDEXING_SERVICE_ACCOUNT is not valid JSON — skipping Google');
    return null;
  }
}

async function getAccessToken(sa: ServiceAccount): Promise<string | null> {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = base64url(
    JSON.stringify({
      iss: sa.client_email,
      scope: SCOPE,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    }),
  );
  const unsigned = `${header}.${claims}`;

  let signature: string;
  try {
    const signer = crypto.createSign('RSA-SHA256');
    signer.update(unsigned);
    signature = signer.sign(sa.private_key).toString('base64url');
  } catch (err) {
    console.warn('⚠️ Failed to sign Google JWT (bad private_key?) — skipping Google:', err);
    return null;
  }

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${unsigned}.${signature}`,
    }),
  });

  if (!res.ok) {
    console.warn(`⚠️ Google token exchange failed (${res.status}): ${await res.text()}`);
    return null;
  }
  const body = (await res.json()) as { access_token?: string };
  if (!body.access_token) {
    console.warn('⚠️ Google token response missing access_token');
    return null;
  }
  return body.access_token;
}

/**
 * Submit changed URLs to the Google Indexing API. Never throws; all failures
 * are logged as warnings so the build/deploy is never broken.
 */
export async function notifyGoogle(urls: string[]): Promise<void> {
  if (urls.length === 0) return;

  const sa = loadServiceAccount();
  if (!sa) {
    console.log(
      'ℹ️ Google Indexing API skipped — GOOGLE_INDEXING_SERVICE_ACCOUNT secret not configured.\n' +
        '   Google will still pick up changes via sitemap crawling (see scripts/google-indexing.ts for setup).',
    );
    return;
  }

  try {
    const token = await getAccessToken(sa);
    if (!token) return;

    let ok = 0;
    let failed = 0;
    for (const url of urls) {
      try {
        const res = await fetch(PUBLISH_URL, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url, type: 'URL_UPDATED' }),
        });
        if (res.ok) {
          ok++;
        } else {
          failed++;
          if (failed <= 3) {
            console.warn(`⚠️ Google Indexing API rejected ${url} (${res.status}): ${await res.text()}`);
          }
        }
      } catch (err) {
        failed++;
        if (failed <= 3) console.warn(`⚠️ Google Indexing API request failed for ${url}:`, err);
      }
    }
    console.log(`✅ Google Indexing API: ${ok} submitted, ${failed} failed (non-fatal)`);
  } catch (err) {
    console.warn('⚠️ Google Indexing API notification failed (non-fatal):', err);
  }
}
