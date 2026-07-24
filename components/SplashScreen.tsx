'use client';
import { useEffect, useRef, useState } from 'react';

/*
 * Timing:
 *   0 – 0.8s  : icon scales 0.85→1, opacity 0→1 (spring ease)
 *   0.8 – 3.1s: hold
 *   3.1 – 3.6s: outer div fades to opacity 0  (React-driven)
 * Tap/click at any point immediately triggers the fade-out.
 */

export default function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!sessionStorage.getItem('ebene-splash')) {
      setVisible(true);
      sessionStorage.setItem('ebene-splash', '1');
      timerRef.current = setTimeout(dismiss, 3100);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  function dismiss() {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
    setFading(true);
    setTimeout(() => setVisible(false), 520);
  }

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes splash-in {
          0%   { transform: scale(0.85); opacity: 0; }
          100% { transform: scale(1);    opacity: 1; }
        }
      `}</style>
      <div
        onClick={dismiss}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: '#000000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          opacity: fading ? 0 : 1,
          transition: fading ? 'opacity 0.5s ease' : 'none',
          pointerEvents: fading ? 'none' : 'auto',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/icon-black-v2.png"
          alt="Ébène"
          style={{
            width: 'clamp(72px, 20vw, 120px)',
            height: 'auto',
            filter: 'invert(1)',
            animation: 'splash-in 0.8s cubic-bezier(0.34,1.56,0.64,1) both',
            display: 'block',
            userSelect: 'none',
            WebkitUserSelect: 'none',
          } as React.CSSProperties}
          draggable={false}
        />
      </div>
    </>
  );
}
