import React, { useEffect, useRef, useState } from 'react';

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms
  direction?: 'up' | 'down' | 'none';
}

export function RevealOnScroll({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: RevealOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Se o navegador não suportar IntersectionObserver, exibe imediatamente
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    // Se o elemento já estiver visível na janela inicial, ativa sem atraso desnecessário
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const getTransformClass = () => {
    if (isVisible) return 'opacity-100 translate-y-0 scale-100';
    if (direction === 'up') return 'opacity-0 translate-y-5 scale-[0.99]';
    if (direction === 'down') return 'opacity-0 -translate-y-4';
    return 'opacity-0';
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: '650ms',
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`transition-all will-change-[opacity,transform] ${getTransformClass()} ${className}`}
    >
      {children}
    </div>
  );
}
