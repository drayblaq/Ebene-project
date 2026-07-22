'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { tr } from '@/lib/translations';

export default function Navbar() {
  const { lang, toggleLang, cart } = useApp();
  const T = tr[lang];
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const handler = () => {
      const scrolled = window.scrollY > 70;
      nav.style.background = scrolled ? 'rgba(247,243,238,0.94)' : 'transparent';
      nav.style.backdropFilter = scrolled ? 'blur(14px)' : 'none';
      nav.style.boxShadow = scrolled ? '0 1px 0 rgba(14,11,8,0.07)' : 'none';
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav ref={navRef} style={{position:'fixed',top:0,left:0,right:0,zIndex:200,padding:'26px 56px',display:'flex',alignItems:'center',justifyContent:'space-between',transition:'background 0.4s,box-shadow 0.4s'}}>
      <div style={{display:'flex',gap:36}}>
        <Link href="/collection" className="nav-lnk" style={{fontSize:10,letterSpacing:4,textTransform:'uppercase',fontWeight:500}}>{T.collection}</Link>
        <Link href="/" className="nav-lnk" style={{fontSize:10,letterSpacing:4,textTransform:'uppercase',fontWeight:500}}>{T.histoire}</Link>
      </div>
      <Link href="/" style={{fontFamily:"'Kablammo',system-ui",fontSize:26,fontWeight:400}}>Ébène</Link>
      <div style={{display:'flex',gap:28,alignItems:'center'}}>
        <Link href="/contact" className="nav-lnk" style={{fontSize:10,letterSpacing:4,textTransform:'uppercase',fontWeight:500}}>{T.contact}</Link>
        <button onClick={toggleLang} style={{fontSize:10,letterSpacing:4,textTransform:'uppercase',fontWeight:600,border:'1.5px solid rgba(14,11,8,0.3)',padding:'6px 12px',background:'none',cursor:'pointer',fontFamily:"'Jost',sans-serif"}}>
          {lang === 'fr' ? 'EN' : 'FR'}
        </button>
        <Link href="/cart" className="nav-lnk" style={{fontSize:10,letterSpacing:4,textTransform:'uppercase',fontWeight:500,display:'flex',alignItems:'center',gap:8}}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          {T.panier} ({cart.length})
        </Link>
      </div>
    </nav>
  );
}
