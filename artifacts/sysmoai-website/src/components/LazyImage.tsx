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
      { rootMargin: '200px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [priority, inView]);

  const tinyBlur = `${src.split('?')[0]}?w=20&q=10&blur=5`;

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height, ...style }}
    >
      {/* Blur-up placeholder */}
      <img
        src={tinyBlur}
        aria-hidden
        alt=""
        className="absolute inset-0 w-full h-full transition-opacity duration-500"
        style={{
          objectFit,
          filter: 'blur(12px) saturate(1.1)',
          transform: 'scale(1.05)',
          opacity: loaded ? 0 : 1,
        }}
      />
      {/* Main image */}
      {inView && (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          className="absolute inset-0 w-full h-full transition-opacity duration-700"
          style={{
            objectFit,
            opacity: loaded ? 1 : 0,
          }}
        />
      )}
    </div>
  );
}
