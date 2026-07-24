'use client';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';

export default function MusicToggle() {
  const { musicPlaying, toggleMusic, musicNeedsGesture } = useApp();
  const [hovered, setHovered] = useState(false);

  const bg = hovered ? '#814D2D' : musicNeedsGesture ? '#814D2D' : '#000000';

  return (
    <>
      {musicNeedsGesture && (
        <style>{`
          @keyframes music-pulse {
            0%, 100% { box-shadow: 0 4px 20px rgba(0,0,0,0.25), 0 0 0 0 rgba(129,77,45,0.7); }
            50%       { box-shadow: 0 4px 20px rgba(0,0,0,0.25), 0 0 0 10px rgba(129,77,45,0); }
          }
        `}</style>
      )}
      <button
        onClick={toggleMusic}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={musicPlaying ? 'Pause music' : 'Play music'}
        style={{
          position: 'fixed',
          bottom: 'calc(28px + env(safe-area-inset-bottom))',
          right: 28,
          zIndex: 9000,
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: bg,
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s ease, transform 0.15s ease',
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
          animation: musicNeedsGesture ? 'music-pulse 1.6s ease-in-out infinite' : 'none',
          willChange: 'transform',
        }}
      >
        {musicPlaying ? <IconSpeakerOn /> : <IconSpeakerOff />}
      </button>
    </>
  );
}

function IconSpeakerOn() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

function IconSpeakerOff() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}
