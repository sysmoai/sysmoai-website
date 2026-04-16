import React from 'react';

// SYSmoAI® Official Logo Mark — Brand Identity v2.0
// 3 concentric hexagonal layers:
//   Layer 1 (outer):  Infrastructure foundation   #1E3A8A / #2563EB
//   Layer 2 (mid):    System orchestration         #2563EB / #3B82F6
//   Layer 3 (core):   AI intelligence engine       #3B82F6 / #60A5FA
// Geometry: viewBox 100×100, optically centered at (50,50), 0.78× scale ratio

type LogoVariant = 'brand-dark' | 'brand-light' | 'mono-white' | 'mono-black';

interface LogoProps {
  size?: number;
  variant?: LogoVariant;
  className?: string;
  animated?: boolean;
}

const PATHS = {
  layer1: 'M25 34 L50 24 L75 34 L75 54 L50 64 L25 54 Z',
  layer2: 'M30 49 L50 40 L70 49 L70 64 L50 73 L30 64 Z',
  layer3: 'M40 61 L50 56 L60 61 L60 71 L50 76 L40 71 Z',
};

const STYLES: Record<LogoVariant, {
  l1Fill: string; l1FillOp: number; l1Stroke: string; l1StrokeOp: number;
  l2Fill: string; l2FillOp: number; l2Stroke: string; l2StrokeOp: number;
  l3Fill: string; l3FillOp: number; l3Stroke: string; l3StrokeOp: number;
}> = {
  'brand-dark': {
    l1Fill: '#1E3A8A', l1FillOp: 0.30, l1Stroke: '#2563EB', l1StrokeOp: 0.60,
    l2Fill: '#2563EB', l2FillOp: 0.50, l2Stroke: '#3B82F6', l2StrokeOp: 0.80,
    l3Fill: '#3B82F6', l3FillOp: 1.00, l3Stroke: '#60A5FA', l3StrokeOp: 1.00,
  },
  'brand-light': {
    l1Fill: '#1E3A8A', l1FillOp: 0.08, l1Stroke: '#1E40AF', l1StrokeOp: 0.35,
    l2Fill: '#2563EB', l2FillOp: 0.15, l2Stroke: '#2563EB', l2StrokeOp: 0.55,
    l3Fill: '#1E3A8A', l3FillOp: 0.85, l3Stroke: '#1E3A8A', l3StrokeOp: 1.00,
  },
  'mono-white': {
    l1Fill: '#FFFFFF', l1FillOp: 0.12, l1Stroke: '#FFFFFF', l1StrokeOp: 0.50,
    l2Fill: '#FFFFFF', l2FillOp: 0.30, l2Stroke: '#FFFFFF', l2StrokeOp: 0.70,
    l3Fill: '#FFFFFF', l3FillOp: 1.00, l3Stroke: '#FFFFFF', l3StrokeOp: 1.00,
  },
  'mono-black': {
    l1Fill: '#000000', l1FillOp: 0.08, l1Stroke: '#000000', l1StrokeOp: 0.40,
    l2Fill: '#000000', l2FillOp: 0.20, l2Stroke: '#000000', l2StrokeOp: 0.60,
    l3Fill: '#000000', l3FillOp: 0.90, l3Stroke: '#000000', l3StrokeOp: 1.00,
  },
};

export function SYSmoAILogo({ size = 40, variant = 'brand-dark', className = '', animated = false }: LogoProps) {
  const s = STYLES[variant];
  const sw = size <= 32 ? 3 : size <= 64 ? 2.5 : 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${animated ? 'transition-transform duration-300 hover:scale-110' : ''} ${className}`}
      data-testid="logo-sysmoai"
    >
      <path
        d={PATHS.layer1}
        fill={s.l1Fill} fillOpacity={s.l1FillOp}
        stroke={s.l1Stroke} strokeOpacity={s.l1StrokeOp}
        strokeWidth={sw} strokeLinejoin="round"
      />
      <path
        d={PATHS.layer2}
        fill={s.l2Fill} fillOpacity={s.l2FillOp}
        stroke={s.l2Stroke} strokeOpacity={s.l2StrokeOp}
        strokeWidth={sw} strokeLinejoin="round"
      />
      <path
        d={PATHS.layer3}
        fill={s.l3Fill} fillOpacity={s.l3FillOp}
        stroke={s.l3Stroke} strokeOpacity={s.l3StrokeOp}
        strokeWidth={sw} strokeLinejoin="round"
      />
    </svg>
  );
}
