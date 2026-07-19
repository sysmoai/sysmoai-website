import { describe, it, expect } from 'vitest';
import { blogPostsMeta } from './blogMeta';
import { SERVICES, AUDIENCES, BRAND, CONTACT } from './content';

// ─── Blog Metadata Tests ──────────────────────────────────────────

describe('blogPostsMeta', () => {
  it('should have 50 entries', () => {
    expect(blogPostsMeta.length).toBe(50);
  });

  it('every entry should have required fields', () => {
    for (const entry of blogPostsMeta) {
      expect(entry.slug).toBeTruthy();
      expect(entry.title).toBeTruthy();
      expect(entry.metaDescription).toBeTruthy();
      expect(entry.publishDate).toBeTruthy();
      expect(entry.author).toBeTruthy();
    }
  });

  it('no duplicate slugs', () => {
    const slugs = blogPostsMeta.map((e) => e.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('no duplicate titles', () => {
    const titles = blogPostsMeta.map((e) => e.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it('no truncated meta descriptions', () => {
    const badEntries: string[] = [];
    for (const entry of blogPostsMeta) {
      const desc = entry.metaDescription;
      if (desc.length < 60) {
        badEntries.push(`${entry.slug}: too short (${desc.length})`);
      }
      const lastChar = desc.trim().slice(-1);
      // Must not end with a letter (would indicate truncation mid-word)
      if (/[a-zA-Z]$/.test(lastChar)) {
        badEntries.push(`${entry.slug}: ends mid-word with "${lastChar}": ...${desc.trim().slice(-40)}`);
      }
    }
    expect(badEntries).toEqual([]);
  });
});

// ─── Content Data Tests ───────────────────────────────────────────

describe('BRAND', () => {
  it('should have required fields', () => {
    expect(BRAND.name).toBe('SYSmoAI');
    expect(BRAND.tagline).toBeTruthy();
    expect(BRAND.founded).toBeGreaterThan(2020);
    expect(BRAND.country).toBe('Bangladesh');
  });
});

describe('CONTACT', () => {
  it('should have valid contact info', () => {
    expect(CONTACT.email).toContain('@');
    expect(CONTACT.whatsapp.number).toMatch(/^\+?\d+$/);
    expect(CONTACT.founder).toBeTruthy();
  });
});

describe('SERVICES', () => {
  it('should have services defined', () => {
    expect(SERVICES.length).toBeGreaterThanOrEqual(9);
  });

  it('every service should have required fields', () => {
    for (const service of SERVICES) {
      expect(service.id).toBeTruthy();
      expect(service.title).toBeTruthy();
      expect(service.bdPrice).toBeTruthy();
      expect(service.href).toContain('/');
      expect(service.features.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('every service href should be unique', () => {
    const hrefs = SERVICES.map((s) => s.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});

describe('AUDIENCES', () => {
  it('should have audience segments', () => {
    expect(AUDIENCES.length).toBeGreaterThanOrEqual(5);
  });

  it('every audience should have required fields', () => {
    for (const audience of AUDIENCES) {
      expect(audience.id).toBeTruthy();
      expect(audience.title).toBeTruthy();
      expect(audience.href).toContain('/for/');
    }
  });
});
