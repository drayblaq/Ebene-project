'use client';
import { useEffect, useState } from 'react';
import LogoLockup from '@/components/LogoLockup';

export default function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem('ebene-splash')) {
      setVisible(true);
      sessionStorage.setItem('ebene-splash', '1');
      const t = setTimeout(dismiss, 5000);
      return () => clearTimeout(t);
    }
  }, []);

  function dismiss() {
    setFading(true);
    setTimeout(() => setVisible(false), 600);
  }

  if (!visible) return null;

  return (
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
        transition: 'opacity 0.6s ease',
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      <LogoLockup iconHeight={80} dark />
    </div>
  );
}
