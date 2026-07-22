'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { Lang } from '@/lib/translations';
import { Product } from '@/lib/products';

export type CartItem = Product & { qty: number; size: string };

type AppCtx = {
  lang: Lang;
  toggleLang: () => void;
  cart: CartItem[];
  addToCart: (p: Product) => void;
  removeFromCart: (id: number) => void;
};

const Ctx = createContext<AppCtx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('fr');
  const [cart, setCart] = useState<CartItem[]>([]);

  const toggleLang = () => setLang(l => l === 'fr' ? 'en' : 'fr');

  const addToCart = (p: Product) => {
    if (p.badge === 'SOLD OUT') return;
    setCart(c => {
      const i = c.findIndex(x => x.id === p.id);
      if (i >= 0) { const n=[...c]; n[i]={...n[i],qty:n[i].qty+1}; return n; }
      return [...c, { ...p, qty: 1, size: p.sizes[0] }];
    });
  };

  const removeFromCart = (id: number) => setCart(c => c.filter(x => x.id !== id));

  return <Ctx.Provider value={{ lang, toggleLang, cart, addToCart, removeFromCart }}>{children}</Ctx.Provider>;
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
