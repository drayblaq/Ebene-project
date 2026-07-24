'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { tr } from '@/lib/translations';

export default function Navbar() {
  const { lang, toggleLang, cart } = useApp();
  const T = tr[lang];
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const handler = () => {
      const scrolled = window.scrollY > 70;
      nav.style.background = scrolled ? 'rgba(255,255,255,0.94)' : 'transparent';
      nav.style.backdropFilter = scrolled ? 'blur(14px)' : 'none';
      nav.style.boxShadow = scrolled ? '0 1px 0 rgba(0,0,0,0.07)' : 'none';
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const lnk: React.CSSProperties = { fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', fontWeight: 500, fontFamily: "'Aoboshi One', sans-serif" };

  return (
    <>
      <nav ref={navRef} className="nav-root" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, padding: '26px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'background 0.4s,box-shadow 0.4s' }}>

        {/* Desktop left links */}
        <div className="nav-side-links" style={{ display: 'flex', gap: 36 }}>
          <Link href="/collection" className="nav-lnk" style={lnk}>{T.collection}</Link>
          <Link href="/" className="nav-lnk" style={lnk}>{T.histoire}</Link>
        </div>

        {/* Mobile left: hamburger */}
        <button className="nav-mobile-only" onClick={() => setMenuOpen(o => !o)} aria-label="Menu" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'none' }}>
          {menuOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.8"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.8"><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></svg>
          )}
        </button>

        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Image src="/images/icon-black-v2.png" alt="Ébène" width={34} height={48} style={{ height: 48, width: 'auto', objectFit: 'contain', display: 'block' }} priority />
        </Link>

        {/* Desktop right links */}
        <div className="nav-right-links" style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          <Link href="/contact" className="nav-lnk" style={lnk}>{T.contact}</Link>
          <button onClick={toggleLang} style={{ fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', fontWeight: 600, border: '1.5px solid rgba(0,0,0,0.3)', padding: '6px 12px', background: 'none', cursor: 'pointer', fontFamily: "'Aoboshi One', sans-serif" }}>
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
          <Link href="/cart" className="nav-lnk" style={{ ...lnk, display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            {T.panier} ({cart.length})
          </Link>
        </div>

        {/* Mobile right: lang + cart */}
        <div className="nav-mobile-only" style={{ display: 'none', gap: 16, alignItems: 'center' }}>
          <button onClick={toggleLang} style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600, border: '1.5px solid rgba(0,0,0,0.3)', padding: '5px 10px', background: 'none', cursor: 'pointer', fontFamily: "'Aoboshi One', sans-serif" }}>
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
          <Link href="/cart" onClick={() => setMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 500 }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            {cart.length > 0 && <span style={{ fontSize: 10, fontWeight: 700 }}>{cart.length}</span>}
          </Link>
        </div>
      </nav>

      {/* Mobile full-screen overlay menu */}
      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, background: '#FFFFFF', zIndex: 190, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 44 }}>
          {[
            { label: T.collection, href: '/collection' },
            { label: T.histoire, href: '/' },
            { label: T.contact, href: '/contact' },
            { label: T.panier + (cart.length ? ` (${cart.length})` : ''), href: '/cart' },
          ].map(({ label, href }) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)} style={{ fontFamily: "'Joti One', cursive", fontSize: 36, fontWeight: 400, color: '#000000', letterSpacing: 1 }}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
