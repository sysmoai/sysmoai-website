import { Router as WouterRouter } from 'wouter';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import PublicReview from '@/pages/PublicReview';

/**
 * Temporary fail-closed public application while seller, price, legal, proof
 * and production authority remain unverified. The legacy site remains in Git
 * history, not in the shipped application bundle. This is NOT production approval.
 */
export default function App() {
  return (
    <ErrorBoundary>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <PublicReview />
      </WouterRouter>
    </ErrorBoundary>
  );
}
