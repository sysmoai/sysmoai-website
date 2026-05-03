import { Link } from 'wouter';
import { SYSmoAILogo } from '@/components/SYSmoAILogo';
import { SYSmoAIWordmark } from '@/components/SYSmoAIWordmark';
import { useTheme } from '@/contexts/ThemeContext';

export default function NotFound() {
  const { isDark } = useTheme();
  const heading = isDark ? '#F1F5F9' : '#0A0B0F';
  const body = isDark ? '#94A3B8' : '#475569';

  return (
    <div
      className="min-h-[60vh] w-full flex flex-col items-center justify-center px-4 text-center"
      style={{ background: isDark ? '#0A0B0F' : 'linear-gradient(180deg, #FFFFFF 0%, #F0F6FF 100%)' }}
    >
      <div className="mb-8">
        <SYSmoAILogo size={64} />
      </div>
      <div className="flex items-center gap-3 mb-2">
        <SYSmoAIWordmark darkMode={isDark} />
      </div>
      <h1 className="text-8xl font-bold mb-4 mt-8" style={{ color: heading }}>404</h1>
      <p className="text-xl mb-8 max-w-md" style={{ color: body }}>
        This page doesn't exist. Let's get you back on track.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-[1.02]"
        data-testid="link-404-home"
      >
        Go Home
      </Link>
    </div>
  );
}
