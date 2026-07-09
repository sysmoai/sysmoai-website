import { Link } from 'wouter';
import { SYSmoAILogo } from '@/components/SYSmoAILogo';
import { SYSmoAIWordmark } from '@/components/SYSmoAIWordmark';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] w-full flex flex-col items-center justify-center bg-[#0A0B0F] px-4 text-center">
      <div className="mb-8">
        <SYSmoAILogo size={64} />
      </div>
      <div className="flex items-center gap-3 mb-2">
        <SYSmoAIWordmark darkMode={true} />
      </div>
      <h1 className="text-8xl font-bold text-white mb-4 mt-8">404</h1>
      <p className="text-xl text-gray-400 mb-8 max-w-md">
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
