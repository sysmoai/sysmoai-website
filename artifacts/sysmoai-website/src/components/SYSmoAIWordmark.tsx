import React from 'react';

interface Props {
  darkMode?: boolean;
  size?: number;
}

export function SYSmoAIWordmark({ darkMode = true, size = 20 }: Props) {
  const textColor = darkMode ? '#FFFFFF' : '#0A0B0F';
  return (
    <span
      style={{
        fontSize: size,
        lineHeight: 1,
        fontFamily: "'Space Grotesk', 'Inter', -apple-system, system-ui, sans-serif",
        color: textColor,
        display: 'inline-flex',
        alignItems: 'baseline',
        whiteSpace: 'nowrap',
        letterSpacing: '-0.02em',
      }}
      data-testid="wordmark-sysmoai"
    >
      <span style={{ fontWeight: 700 }}>SYS</span>
      <span style={{ fontWeight: 500, color: '#2563EB' }}>mo</span>
      <span style={{ fontWeight: 700 }}>AI</span>
    </span>
  );
}
