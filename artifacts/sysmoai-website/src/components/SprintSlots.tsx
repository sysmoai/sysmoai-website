interface SprintSlotsProps {
  /** "pill" = inline rounded chip; "banner" = wider bar with more text. */
  variant?: 'pill' | 'banner' | 'compact';
  className?: string;
}

/**
 * Sprint slot availability indicator.
 *
 * The live /api/sprint-availability endpoint is not deployed on the static
 * site, so this component renders nothing rather than a stale pill. When the
 * admin-controlled availability API is deployed later, rewire this component
 * to it.
 */
export function SprintSlots(_props: SprintSlotsProps) {
  return null;
}
