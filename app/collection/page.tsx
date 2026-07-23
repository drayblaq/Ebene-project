'use client';
import { useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { tr } from '@/lib/translations';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export default function Collection() {
  const { lang, addToCart } = useApp();
  const T = tr[lang];
  const offsets = [0,36,18,52];

  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.08 });
    document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="sec-collection" style={{minHeight:'100vh',background:'#FFFFFF',padding:'140px 80px 100px'}}>
      <div className="fade-in collection-header" style={{marginBottom:60}}>
        <p style={{fontSize:10,letterSpacing:5,textTransform:'uppercase',color:'#814D2D',margin:'0 0 18px',fontWeight:700,fontFamily:"'Aoboshi One',sans-serif"}}>{T.sectionFeatured}</p>
        <h1 style={{fontFamily:"'Joti One',cursive",fontSize:'clamp(44px,5vw,80px)',margin:'0 0 48px',lineHeight:1.05}}>{T.collectionTitle}</h1>
      </div>
      <p style={{fontSize:9,letterSpacing:3,textTransform:'uppercase',color:'#000000',fontWeight:700,textAlign:'center',marginBottom:48,fontFamily:"'Aoboshi One',sans-serif"}}>{T.rotateHint}</p>
      <div className="collection-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:'80px 32px',alignItems:'start'}}>
        {products.map((p,i)=>(
          <div key={p.id} style={{justifySelf:'center'}}>
            <ProductCard product={p} lang={lang} onAdd={addToCart} offsetTop={offsets[i%4]} />
          </div>
        ))}
      </div>
    </section>
  );
}
