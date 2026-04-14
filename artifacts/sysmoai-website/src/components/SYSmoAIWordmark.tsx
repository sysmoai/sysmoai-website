import React from 'react';

interface Props {
  darkMode?: boolean;
  size?: number;
}

export function SYSmoAIWordmark({ darkMode = true, size = 20 }: Props) {
  const color = darkMode ? '#FFFFFF' : '#0A0B0F';
  return (
    <span
      style={{
        fontSize: size,
        lineHeight: 1,
        fontFamily: "'Space Grotesk', 'Inter', -apple-system, system-ui, sans-serif",
        color,
        display: 'inline-flex',
        alignItems: 'baseline',
        whiteSpace: 'nowrap',
        letterSpacing: `${-size * 0.015}px`,
      }}
      data-testid="wordmark-sysmoai"
    >
      <span style={{ fontWeight: 700, letterSpacing: '-0.02em' }}>SYS</span>
      <span style={{ fontWeight: 400, letterSpacing: '-0.04em', opacity: 0.65 }}>mo</span>
      <span style={{ fontWeight: 700, letterSpacing: '0.02em' }}>AI</span>
    </span>
  );
}
