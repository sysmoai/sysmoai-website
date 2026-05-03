// UTM capture + persistence for attribution.
//
// Strategy:
// - On every page load, read utm_* + ref params from the URL.
// - If any are present, persist them to sessionStorage (keyed by SESSION_KEY)
//   so they survive in-tab navigation across the funnel (post → /free-ai-audit
//   → form submission).
// - When the audit form submits, read the latest snapshot back out.
// - Also fall back to document.referrer when no UTM is present, so external
//   traffic still gets a coarse source.
//
// We intentionally use sessionStorage (not localStorage) so that a returning
// visitor who lands organically a week later isn't credited to the original
// campaign. Also it means private-browsing leakage is naturally bounded.

export interface UtmSnapshot {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmTerm: string | null;
  referrer: string | null;
}

const SESSION_KEY = "sysmoai-utm-v1";

const EMPTY: UtmSnapshot = {
  utmSource: null,
  utmMedium: null,
  utmCampaign: null,
  utmContent: null,
  utmTerm: null,
  referrer: null,
};

function safeSession(): Storage | null {
  try {
    if (typeof window === "undefined") return null;
    return window.sessionStorage;
  } catch {
    return null;
  }
}

function trimOrNull(v: string | null | undefined): string | null {
  if (v === null || v === undefined) return null;
  const t = v.trim();
  if (!t) return null;
  // Reject obviously bogus values up front so we don't pollute the DB.
  if (t.length > 200) return t.slice(0, 200);
  return t;
}

export function captureUtmFromLocation(): UtmSnapshot {
  if (typeof window === "undefined") return EMPTY;
  let urlParams: URLSearchParams;
  try {
    urlParams = new URLSearchParams(window.location.search);
  } catch {
    return readUtmSnapshot();
  }
  const fromUrl: UtmSnapshot = {
    utmSource: trimOrNull(urlParams.get("utm_source")),
    utmMedium: trimOrNull(urlParams.get("utm_medium")),
    utmCampaign: trimOrNull(urlParams.get("utm_campaign")),
    utmContent: trimOrNull(urlParams.get("utm_content")),
    utmTerm: trimOrNull(urlParams.get("utm_term")),
    referrer: trimOrNull(
      typeof document !== "undefined" ? document.referrer : null,
    ),
  };
  // Only persist when at least one campaign signal was on the URL — we do not
  // want to clobber an existing real attribution with an empty fallback when
  // the user navigates internally.
  const hasAny =
    fromUrl.utmSource ||
    fromUrl.utmMedium ||
    fromUrl.utmCampaign ||
    fromUrl.utmContent ||
    fromUrl.utmTerm;
  if (hasAny) {
    const store = safeSession();
    if (store) {
      try {
        store.setItem(SESSION_KEY, JSON.stringify(fromUrl));
      } catch {
        // sessionStorage full / disabled — fine, we still return the snapshot
      }
    }
    return fromUrl;
  }
  // No UTM on URL → fall back to whatever we previously persisted.
  return readUtmSnapshot();
}

export function readUtmSnapshot(): UtmSnapshot {
  const store = safeSession();
  if (!store) return EMPTY;
  try {
    const raw = store.getItem(SESSION_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<UtmSnapshot>;
    return {
      utmSource: trimOrNull(parsed.utmSource ?? null),
      utmMedium: trimOrNull(parsed.utmMedium ?? null),
      utmCampaign: trimOrNull(parsed.utmCampaign ?? null),
      utmContent: trimOrNull(parsed.utmContent ?? null),
      utmTerm: trimOrNull(parsed.utmTerm ?? null),
      referrer: trimOrNull(parsed.referrer ?? null),
    };
  } catch {
    return EMPTY;
  }
}
