import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface DirectAnswerProps {
  children: React.ReactNode;
  bangla?: React.ReactNode;
}

export function DirectAnswer({ children, bangla }: DirectAnswerProps) {
  const { isDark } = useTheme();

  return (
    <div
      className="border-l-4 border-blue-500 rounded-r-xl px-5 py-4 mb-8 max-w-3xl"
      style={{
        background: isDark ? 'rgba(37,99,235,0.08)' : '#EFF6FF',
        borderLeftColor: '#2563EB',
      }}
      aria-label="Direct answer"
    >
      <p
        className="text-sm font-semibold uppercase tracking-wider mb-2"
        style={{ color: '#2563EB' }}
      >
        Quick Answer
      </p>
      <p
        className="text-base leading-relaxed"
        style={{ color: isDark ? '#CBD5E1' : '#1E3A5F' }}
      >
        {children}
      </p>
      {bangla && (
        <p
          className="text-sm leading-relaxed mt-3 pt-3 border-t"
          style={{
            color: isDark ? '#94A3B8' : '#475569',
            borderTopColor: isDark ? 'rgba(255,255,255,0.08)' : '#BFDBFE',
          }}
        >
          {bangla}
        </p>
      )}
    </div>
  );
}
