'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { tr } from '@/lib/translations';

export default function Footer() {
  const { lang } = useApp();
  const T = tr[lang];
  return (
    <footer className="footer-root" style={{background:'#000000',padding:'56px 80px',borderTop:'1px solid rgba(255,255,255,0.05)'}}>
      <div className="footer-top" style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:52,flexWrap:'wrap',gap:24}}>
        <Link href="/" style={{display:'flex',alignItems:'center'}}>
          <Image src="/images/logo+text1.png" alt="Ébène" width={130} height={38} style={{height:38,width:'auto',objectFit:'contain'}} />
        </Link>
        <div style={{display:'flex',gap:36}}>
          {['Instagram','TikTok'].map(s=>(
            <a key={s} href="#" className="nav-lnk" style={{fontSize:11,letterSpacing:3,textTransform:'uppercase',color:'#FFFFFF',fontWeight:700}}>{s}</a>
          ))}
        </div>
      </div>
      <div className="footer-bottom" style={{paddingTop:28,borderTop:'1px solid rgba(255,255,255,0.05)',textAlign:'center'}}>
        <p style={{fontSize:11,color:'#FFFFFF',fontWeight:600,margin:0,letterSpacing:1}}>© 2026 Ébène · Cotonou, République du Bénin</p>
      </div>
    </footer>
  );
}
