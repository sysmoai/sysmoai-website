import React, { useState, useRef, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
}

export function LazyImage({
  src,
  alt,
  className = '',
  width,
  height,
  style,
  priority = false,
  objectFit = 'cover',
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(priority);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority || inView) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { rootMargin: '300px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [priority, inView]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height, ...style }}
    >
      {/* Skeleton shimmer shown before image loads */}
      {!loaded && (
        <div
          aria-hidden
          className="absolute inset-0 animate-shimmer"
          style={{ background: 'rgba(255,255,255,0.03)' }}
        />
      )}
      {/* Main image */}
      {inView && (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setLoaded(true)}
          className="absolute inset-0 w-full h-full transition-opacity duration-700"
          style={{ objectFit, opacity: loaded ? 1 : 0 }}
        />
      )}
    </div>
  );
}
