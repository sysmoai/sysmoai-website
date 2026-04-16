import React from 'react';

// SYSmoAI® Official Wordmark — Brand Identity v2.0
// SYS: weight 700, -0.02em tracking
// mo:  weight 400, -0.04em tracking, 65% opacity
// AI:  weight 700, +0.02em tracking

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
        fontFamily: "'Inter', 'SF Pro Display', -apple-system, system-ui, sans-serif",
        fontFeatureSettings: '"kern" 1, "liga" 1, "calt" 1',
        color,
        display: 'inline-flex',
        alignItems: 'baseline',
        whiteSpace: 'nowrap',
      }}
      data-testid="wordmark-sysmoai"
    >
      <span style={{ fontWeight: 700, letterSpacing: '-0.02em' }}>SYS</span>
      <span style={{ fontWeight: 400, letterSpacing: '-0.04em', opacity: 0.65 }}>mo</span>
      <span style={{ fontWeight: 700, letterSpacing: '0.02em' }}>AI</span>
    </span>
  );
}
