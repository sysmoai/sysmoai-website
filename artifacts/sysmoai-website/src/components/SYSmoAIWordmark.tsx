import React from 'react';

interface Props {
  darkMode?: boolean;
}

export function SYSmoAIWordmark({ darkMode = false }: Props) {
  const textColor = darkMode ? 'text-white' : 'text-[#1A1A1A]';
  
  return (
    <span 
      className={`${textColor} font-sans tracking-[-0.02em]`} 
      style={{ fontFeatureSettings: '"kern", "liga", "calt"' }}
      data-testid="wordmark-sysmoai"
    >
      <span className="font-bold">SYS</span>
      <span className="font-normal opacity-65">mo</span>
      <span className="font-bold">AI</span>
    </span>
  );
}
