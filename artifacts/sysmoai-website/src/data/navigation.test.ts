import { describe, it, expect } from 'vitest';
import {
  SERVICES_GROUPS, WHO_WE_HELP_GROUPS, BANGLADESH_GROUPS,
  HEADER_LINKS, FOOTER_SERVICES, FOOTER_WHO_WE_HELP, FOOTER_RESOURCES, FOOTER_LEGAL,
} from './navigation';

describe('SERVICES_GROUPS', () => {
  it('has at least 3 groups', () => {
    expect(SERVICES_GROUPS.length).toBeGreaterThanOrEqual(3);
  });

  it('Lead Rescue appears in at least one group', () => {
    const allItems = SERVICES_GROUPS.flatMap((g) => g.items);
    expect(allItems.some((i) => i.href === '/lead-rescue')).toBe(true);
  });

  it('every item has href starting with /', () => {
    const allItems = SERVICES_GROUPS.flatMap((g) => g.items);
    for (const item of allItems) {
      expect(item.href).toMatch(/^\//);
    }
  });

  it('no duplicate hrefs across groups', () => {
    const allItems = SERVICES_GROUPS.flatMap((g) => g.items);
    const hrefs = allItems.map((i) => i.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});

describe('WHO_WE_HELP_GROUPS', () => {
  it('has at least 3 groups', () => {
    expect(WHO_WE_HELP_GROUPS.length).toBeGreaterThanOrEqual(3);
  });

  it('every item has href starting with /for/', () => {
    const allItems = WHO_WE_HELP_GROUPS.flatMap((g) => g.items);
    for (const item of allItems) {
      expect(item.href).toMatch(/^\/for\//);
    }
  });
});

describe('BANGLADESH_GROUPS', () => {
  it('has at least 2 groups', () => {
    expect(BANGLADESH_GROUPS.length).toBeGreaterThanOrEqual(2);
  });

  it('includes /bn link', () => {
    const allItems = BANGLADESH_GROUPS.flatMap((g) => g.items);
    expect(allItems.some((i) => i.href === '/bn')).toBe(true);
  });

  it('includes /bangladesh link', () => {
    const allItems = BANGLADESH_GROUPS.flatMap((g) => g.items);
    expect(allItems.some((i) => i.href === '/bangladesh')).toBe(true);
  });
});

describe('HEADER_LINKS', () => {
  it('has at least 3 links', () => {
    expect(HEADER_LINKS.length).toBeGreaterThanOrEqual(3);
  });

  it('includes /pricing', () => {
    expect(HEADER_LINKS.some((l) => l.href === '/pricing')).toBe(true);
  });
});

describe('FOOTER', () => {
  it('lead rescue in footer services', () => {
    expect(FOOTER_SERVICES.some((l) => l.href === '/lead-rescue')).toBe(true);
  });

  it('bangladesh and bn in footer resources', () => {
    expect(FOOTER_RESOURCES.some((l) => l.href === '/bangladesh')).toBe(true);
    expect(FOOTER_RESOURCES.some((l) => l.href === '/bn')).toBe(true);
  });

  it('legal links are complete', () => {
    expect(FOOTER_LEGAL.length).toBeGreaterThanOrEqual(3);
  });
});
