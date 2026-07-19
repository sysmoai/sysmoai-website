import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * Redirect /bn to the English Bangladesh overview page.
 * Previously this was a Bangla-language hub.
 */
export default function BanglaHubRedirect() {
  const [, setLocation] = useLocation();
  useEffect(() => {
    setLocation('/bangladesh', { replace: true });
  }, [setLocation]);
  return null;
}
