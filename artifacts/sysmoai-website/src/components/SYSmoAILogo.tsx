import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
  animated?: boolean;
  withBg?: boolean;
}

export function SYSmoAILogo({ size = 40, className = '', animated = false, withBg = true }: LogoProps) {
  const sw = size <= 28 ? 3 : size <= 52 ? 2.5 : 2;
  const id = `glow-${Math.round(size)}`;

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
      <defs>
        <filter id={id} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id={`bg-${id}`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#1a2f6e" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#0A0B0F" stopOpacity="1" />
        </radialGradient>
      </defs>

      {/* Dark rounded-square background — always present (matches official logo) */}
      {withBg && (
        <rect width="100" height="100" rx="20" fill={`url(#bg-${id})`} />
      )}
      {withBg && (
        <rect width="100" height="100" rx="20" fill="none"
          stroke="#2563EB" strokeOpacity="0.18" strokeWidth="1.5" />
      )}

      {/* Back hexagon — dark navy, blue border, fills upper portion */}
      <path
        d="M50 17 L78 33 L78 59 L50 75 L22 59 L22 33 Z"
        fill="#0D1B52"
        fillOpacity="0.95"
        stroke="#2563EB"
        strokeOpacity="0.75"
        strokeWidth={sw}
        strokeLinejoin="round"
      />

      {/* Front hexagon — solid bright blue, positioned lower to create 3D depth */}
      <path
        d="M50 43 L69 54 L69 75 L50 86 L31 75 L31 54 Z"
        fill="#2563EB"
        fillOpacity="0.95"
        stroke="#60A5FA"
        strokeOpacity="0.55"
        strokeWidth={sw * 0.85}
        strokeLinejoin="round"
      />

      {/* Inner highlight on front hexagon — subtle shine */}
      <path
        d="M50 43 L69 54 L50 65 L31 54 Z"
        fill="#3B82F6"
        fillOpacity="0.45"
      />

      {/* Glowing dot — top-right corner accent (matches official logo) */}
      <circle cx="82" cy="17" r="4.5" fill="#60A5FA" filter={`url(#${id})`} />
      <circle cx="82" cy="17" r="2.5" fill="#BFDBFE" />
    </svg>
  );
}
