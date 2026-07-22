'use client';
import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { tr } from '@/lib/translations';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

const CATS = ['all','shirts','trousers','caps','dresses','jackets'] as const;

export default function Collection() {
  const { lang, addToCart } = useApp();
  const T = tr[lang];
  const [filter, setFilter] = useState<string>('all');
  const offsets = [0,36,18,52];

  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.08 });
    document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const catLabel: Record<string,string> = { all:T.all, shirts:T.shirts, trousers:T.trousers, caps:T.caps, dresses:T.dresses, jackets:T.jackets };
  const filtered = filter === 'all' ? products : products.filter(p => p.cat === filter);

  return (
    <section className="sec-collection" style={{minHeight:'100vh',background:'#F7F3EE',padding:'140px 80px 100px'}}>
      <div className="fade-in collection-header" style={{marginBottom:60}}>
        <p style={{fontSize:10,letterSpacing:5,textTransform:'uppercase',color:'#C4763A',margin:'0 0 18px',fontWeight:500}}>{T.sectionFeatured}</p>
        <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:'clamp(44px,5vw,80px)',margin:'0 0 48px',lineHeight:1.05}}>{T.collectionTitle}</h1>
        <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
          {CATS.map(cat=>(
            <button key={cat} onClick={()=>setFilter(cat)} style={{padding:'10px 22px',fontSize:10,letterSpacing:3,textTransform:'uppercase',fontFamily:"'Jost',sans-serif",fontWeight:500,cursor:'pointer',border:`1.5px solid ${cat===filter?'#0E0B08':'#ddd'}`,background:cat===filter?'#0E0B08':'transparent',color:cat===filter?'#F7F3EE':'#0E0B08',transition:'all 0.2s'}}>
              {catLabel[cat]}
            </button>
          ))}
        </div>
      </div>
      <p style={{fontSize:9,letterSpacing:3,textTransform:'uppercase',color:'#bbb',fontWeight:300,textAlign:'center',marginBottom:48}}>{T.rotateHint}</p>
      <div className="collection-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:'80px 32px',alignItems:'start'}}>
        {filtered.map((p,i)=>(
          <div key={p.id} style={{justifySelf:'center'}}>
            <ProductCard product={p} lang={lang} onAdd={addToCart} offsetTop={offsets[i%4]} />
          </div>
        ))}
      </div>
    </section>
  );
}
