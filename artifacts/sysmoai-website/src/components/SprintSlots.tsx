import {
  useGetSprintAvailability,
  getGetSprintAvailabilityQueryKey,
} from '@workspace/api-client-react';
import { useTheme } from '@/contexts/ThemeContext';

interface SprintSlotsProps {
  /** "pill" = inline rounded chip; "banner" = wider bar with more text. */
  variant?: 'pill' | 'banner' | 'compact';
  className?: string;
}

/**
 * Live Sprint slot availability indicator. Reads /api/sprint-availability
 * (admin-controlled). Hidden if zero slots, no month label, or fetch error
 * — we'd rather show nothing than a stale/empty pill.
 */
export function SprintSlots({ variant = 'pill', className = '' }: SprintSlotsProps) {
  const { isDark } = useTheme();
  const { data, isError } = useGetSprintAvailability({
    query: {
      queryKey: getGetSprintAvailabilityQueryKey(),
      staleTime: 60_000,
      refetchOnWindowFocus: true,
      retry: false,
    },
  });

  if (isError || !data || !data.monthLabel || data.slotsAvailable <= 0) {
    return null;
  }

  const { slotsAvailable, monthLabel, nextStartDate } = data;
  const slotWord = slotsAvailable === 1 ? 'slot' : 'slots';
  const startSuffix = nextStartDate
    ? ` — next start date: ${nextStartDate}`
    : '';
  const fullText = `Only ${slotsAvailable} Sprint ${slotWord} available in ${monthLabel}${startSuffix}`;

  const amberBg = isDark ? 'rgba(245,158,11,0.15)' : '#FEF3C7';
  const amberBorder = isDark ? 'rgba(251,191,36,0.40)' : '#F59E0B';
  const amberText = isDark ? '#FDE68A' : '#92400E';

  if (variant === 'banner') {
    return (
      <div
        className={'inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold ' + className}
        style={{ background: amberBg, borderColor: amberBorder, color: amberText }}
        data-testid="sprint-slots-banner"
      >
        <span aria-hidden>⚡</span>
        <span>{fullText}</span>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <span
        className={'inline-flex items-center gap-1 text-xs font-semibold ' + className}
        style={{ color: amberText }}
        data-testid="sprint-slots-compact"
      >
        <span aria-hidden>⚡</span>
        {slotsAvailable} {slotWord} left in {monthLabel}
      </span>
    );
  }

  return (
    <span
      className={'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ' + className}
      style={{ background: amberBg, borderColor: amberBorder, color: amberText }}
      data-testid="sprint-slots-pill"
    >
      <span aria-hidden>⚡</span>
      {fullText}
    </span>
  );
}
