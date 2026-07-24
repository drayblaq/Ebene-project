'use client';
import { useEffect, useRef, useState } from 'react';
import { useApp } from '@/context/AppContext';

/*
 * Timing (total = 5 s from first visible frame):
 *   0.0 – 0.8 s  icon scales 0.85→1 + fades in (spring ease)
 *   0.8 – 4.55 s hold
 *   4.55 – 5.0 s outer div fades to opacity 0 (0.45 s ease-out)
 *
 * Tap at any point triggers fade immediately.
 *
 * Blank-flash fix: visible starts TRUE so the black overlay is present
 * on the very first paint. useEffect then hides it immediately for
 * returning visitors (sessionStorage key already set).
 */

export default function SplashScreen() {
  // Start visible so the black overlay is present on the very first client paint —
  // avoids the white flash that happens when useState(false) defers the overlay
  // until after useEffect.
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dismissedRef = useRef(false);
  const { startMusic } = useApp();

  useEffect(() => {
    // Returning visitor: hide before any animation plays
    if (sessionStorage.getItem('ebene-splash')) {
      setVisible(false);
      return;
    }
    sessionStorage.setItem('ebene-splash', '1');

    // 4 550 ms hold → then 450 ms fade → total 5 000 ms
    timerRef.current = setTimeout(() => triggerDismiss(false), 4550);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function triggerDismiss(byUserGesture: boolean) {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
    setFading(true);
    startMusic(byUserGesture);
    setTimeout(() => setVisible(false), 450);
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
        onClick={() => triggerDismiss(true)}
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
          transition: fading ? 'opacity 0.45s ease-out' : 'none',
          pointerEvents: fading ? 'none' : 'auto',
          willChange: 'opacity',
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
