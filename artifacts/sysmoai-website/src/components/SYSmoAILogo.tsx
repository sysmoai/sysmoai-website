import React from 'react';

export function SYSmoAILogo({ size = 40, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      data-testid="logo-sysmoai"
    >
      <path d="M25 34 L50 24 L75 34 L75 54 L50 64 L25 54 Z" fill="#1E3A8A" stroke="#2563EB" strokeWidth="1" />
      <path d="M30 49 L50 40 L70 49 L70 64 L50 73 L30 64 Z" fill="#2563EB" stroke="#3B82F6" strokeWidth="1" />
      <path d="M40 61 L50 56 L60 61 L60 71 L50 76 L40 71 Z" fill="#3B82F6" stroke="#60A5FA" strokeWidth="1" />
    </svg>
  );
}