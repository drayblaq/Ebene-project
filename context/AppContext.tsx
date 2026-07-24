'use client';
import { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import { Lang } from '@/lib/translations';
import { Product } from '@/lib/products';

export type CartItem = Product & { qty: number; size: string };

type AppCtx = {
  lang: Lang;
  toggleLang: () => void;
  cart: CartItem[];
  addToCart: (p: Product, size?: string) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, size: string, delta: number) => void;
  clearCart: () => void;
  musicPlaying: boolean;
  musicNeedsGesture: boolean;
  toggleMusic: () => void;
};

const Ctx = createContext<AppCtx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('fr');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicNeedsGesture, setMusicNeedsGesture] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/audio/ebene-song.mp3');
    audio.loop = true;
    audio.volume = 0.38;
    audioRef.current = audio;

    // Muted autoplay is allowed by all browsers (no gesture required).
    // Unmute immediately after playback starts → music plays automatically.
    audio.muted = true;
    audio.play()
      .then(() => { audio.muted = false; setMusicPlaying(true); })
      .catch(() => {
        // Extremely rare fallback — wait for first interaction.
        setMusicNeedsGesture(true);
        const unlock = () => {
          audio.muted = false;
          audio.play()
            .then(() => { setMusicPlaying(true); setMusicNeedsGesture(false); })
            .catch(() => {});
        };
        document.addEventListener('click',      unlock, { once: true });
        document.addEventListener('touchstart', unlock, { once: true });
        document.addEventListener('keydown',    unlock, { once: true });
      });

    return () => { audio.pause(); audio.src = ''; };
  }, []);

  function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    setMusicNeedsGesture(false);
    if (musicPlaying) {
      audio.pause();
      setMusicPlaying(false);
    } else {
      audio.muted = false;
      audio.play().then(() => setMusicPlaying(true)).catch(() => {});
    }
  }

  const toggleLang = () => setLang(l => l === 'fr' ? 'en' : 'fr');

  const addToCart = (p: Product, size?: string) => {
    if (p.badge === 'SOLD OUT') return;
    const chosenSize = size ?? p.sizes[0];
    setCart(c => {
      const i = c.findIndex(x => x.id === p.id && x.size === chosenSize);
      if (i >= 0) { const n=[...c]; n[i]={...n[i],qty:n[i].qty+1}; return n; }
      return [...c, { ...p, qty: 1, size: chosenSize }];
    });
  };

  const removeFromCart = (id: number) => setCart(c => c.filter(x => x.id !== id));
  const updateQty = (id: number, size: string, delta: number) => setCart(c =>
    c.flatMap(x => {
      if (x.id !== id || x.size !== size) return [x];
      const next = x.qty + delta;
      return next <= 0 ? [] : [{ ...x, qty: next }];
    })
  );
  const clearCart = () => setCart([]);

  return (
    <Ctx.Provider value={{
      lang, toggleLang,
      cart, addToCart, removeFromCart, updateQty, clearCart,
      musicPlaying, musicNeedsGesture, toggleMusic,
    }}>
      {children}
    </Ctx.Provider>
  );
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
