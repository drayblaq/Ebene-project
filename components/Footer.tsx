'use client';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { tr } from '@/lib/translations';

export default function Footer() {
  const { lang } = useApp();
  const T = tr[lang];
  return (
    <footer className="footer-root" style={{background:'#0E0B08',padding:'56px 80px',borderTop:'1px solid rgba(255,255,255,0.05)'}}>
      <div className="footer-top" style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:52,flexWrap:'wrap',gap:24}}>
        <Link href="/" style={{fontFamily:"'Kablammo',system-ui",fontSize:34,color:'#F7F3EE'}}>Ébène</Link>
        <div style={{display:'flex',gap:36}}>
          {['Instagram','TikTok'].map(s=>(
            <a key={s} href="#" className="nav-lnk" style={{fontSize:11,letterSpacing:3,textTransform:'uppercase',color:'#F7F3EE',fontWeight:700}}>{s}</a>
          ))}
        </div>
      </div>
      <div className="footer-bottom" style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:28,borderTop:'1px solid rgba(255,255,255,0.05)',flexWrap:'wrap',gap:16}}>
        <p style={{fontSize:11,color:'#F7F3EE',fontWeight:600,margin:0,letterSpacing:1}}>© 2026 Ébène · Cotonou, République du Bénin</p>
        <div style={{display:'flex',gap:28}}>
          <a href="#" className="nav-lnk" style={{fontSize:11,color:'#F7F3EE',fontWeight:600,letterSpacing:1}}>{T.legal}</a>
          <a href="#" className="nav-lnk" style={{fontSize:11,color:'#F7F3EE',fontWeight:600,letterSpacing:1}}>{T.privacy}</a>
        </div>
      </div>
    </footer>
  );
}
