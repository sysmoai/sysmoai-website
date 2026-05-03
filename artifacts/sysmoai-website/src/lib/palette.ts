export interface Palette {
  bg: string;
  bgAlt: string;
  bgDeep: string;
  surface: string;
  surfaceHover: string;
  border: string;
  borderStrong: string;
  heading: string;
  body: string;
  bodyMuted: string;
  bodyDim: string;
  accent: string;
  accentSoft: string;
  accentBorder: string;
  success: string;
  successBg: string;
  successBorder: string;
  danger: string;
  dangerBg: string;
  dangerBorder: string;
  navOnDark: string;
  navOnDarkMuted: string;
  shadow: string;
}

export function palette(isDark: boolean): Palette {
  if (isDark) {
    return {
      bg: '#0A0B0F',
      bgAlt: '#0D0F14',
      bgDeep: '#060810',
      surface: 'rgba(255,255,255,0.04)',
      surfaceHover: 'rgba(255,255,255,0.07)',
      border: 'rgba(255,255,255,0.08)',
      borderStrong: 'rgba(255,255,255,0.14)',
      heading: '#F1F5F9',
      body: '#94A3B8',
      bodyMuted: '#64748B',
      bodyDim: '#475569',
      accent: '#60A5FA',
      accentSoft: 'rgba(37,99,235,0.10)',
      accentBorder: 'rgba(37,99,235,0.25)',
      success: '#86EFAC',
      successBg: 'rgba(34,197,94,0.10)',
      successBorder: 'rgba(34,197,94,0.25)',
      danger: '#FCA5A5',
      dangerBg: 'rgba(239,68,68,0.10)',
      dangerBorder: 'rgba(239,68,68,0.25)',
      navOnDark: '#F1F5F9',
      navOnDarkMuted: '#94A3B8',
      shadow: '0 12px 40px -12px rgba(0,0,0,0.6)',
    };
  }
  return {
    bg: '#FFFFFF',
    bgAlt: '#F8FAFF',
    bgDeep: '#EFF4FB',
    surface: '#FFFFFF',
    surfaceHover: '#F8FAFC',
    border: '#E2E8F0',
    borderStrong: '#CBD5E1',
    heading: '#0A0B0F',
    body: '#475569',
    bodyMuted: '#64748B',
    bodyDim: '#94A3B8',
    accent: '#1D4ED8',
    accentSoft: '#EFF6FF',
    accentBorder: '#BFDBFE',
    success: '#15803D',
    successBg: '#F0FDF4',
    successBorder: '#BBF7D0',
    danger: '#B91C1C',
    dangerBg: '#FEF2F2',
    dangerBorder: '#FECACA',
    navOnDark: '#F1F5F9',
    navOnDarkMuted: '#94A3B8',
    shadow: '0 12px 40px -16px rgba(15,23,42,0.18)',
  };
}
