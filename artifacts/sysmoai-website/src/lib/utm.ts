// UTM capture + persistence for attribution.
//
// Strategy:
// - On every page load, read utm_* + ref params from the URL.
// - If any are present, persist them to sessionStorage (keyed by SESSION_KEY)
//   so they survive in-tab navigation across the funnel (post → /free-ai-audit
//   → form submission).
// - When the audit form submits, read the latest snapshot back out.
// - When a landing has no utm_* but DOES have an external `document.referrer`
//   (i.e. the user came from another origin), persist a referrer-only
//   snapshot so we still get a coarse source. Same-origin internal
//   navigations are ignored so we don't overwrite a real campaign snapshot.
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
  const hasAnyUtm =
    fromUrl.utmSource ||
    fromUrl.utmMedium ||
    fromUrl.utmCampaign ||
    fromUrl.utmContent ||
    fromUrl.utmTerm;

  // External referrer = document.referrer set AND not from our own origin.
  // We use this to persist a coarse source for direct/organic traffic that
  // didn't come through a UTM-tagged link.
  const externalReferrer = (() => {
    if (!fromUrl.referrer) return null;
    try {
      const refOrigin = new URL(fromUrl.referrer).origin;
      if (refOrigin === window.location.origin) return null;
      return fromUrl.referrer;
    } catch {
      return fromUrl.referrer;
    }
  })();

  // Persist when we have campaign signal OR a fresh external referrer.
  // We deliberately skip persistence on plain same-origin nav so an
  // internal hop doesn't clobber an earlier real attribution.
  const existing = readUtmSnapshot();
  if (hasAnyUtm) {
    const store = safeSession();
    if (store) {
      try { store.setItem(SESSION_KEY, JSON.stringify(fromUrl)); } catch {}
    }
    return fromUrl;
  }
  if (externalReferrer && !existing.utmSource && !existing.utmCampaign) {
    // Don't overwrite a previously captured UTM snapshot with a referrer-
    // only one — campaign signal always beats coarse referrer.
    const referrerOnly: UtmSnapshot = { ...EMPTY, referrer: externalReferrer };
    const store = safeSession();
    if (store) {
      try { store.setItem(SESSION_KEY, JSON.stringify(referrerOnly)); } catch {}
    }
    return referrerOnly;
  }
  // No new signal → fall back to whatever we previously persisted.
  return existing;
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
