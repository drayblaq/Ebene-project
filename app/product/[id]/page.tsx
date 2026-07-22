'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { products, getCatLabel, formatFCFA } from '@/lib/products';
import { tr } from '@/lib/translations';

export default function ProductDetail({ params }: { params: { id: string } }) {
  const { lang, addToCart } = useApp();
  const T = tr[lang];
  const router = useRouter();

  const product = products.find(p => p.id === Number(params.id));

  if (!product) {
    return (
      <section style={{minHeight:'100vh',background:'#F7F3EE',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{textAlign:'center'}}>
          <p style={{fontSize:12,letterSpacing:4,textTransform:'uppercase',color:'#C4763A',fontWeight:700,marginBottom:24}}>Produit introuvable</p>
          <Link href="/collection" style={{fontSize:11,letterSpacing:3,textTransform:'uppercase',fontWeight:700,color:'#0E0B08'}}>← {T.backToCollection}</Link>
        </div>
      </section>
    );
  }

  const p = product;
  const isSO = p.badge === 'SOLD OUT';
  const name = lang === 'fr' ? p.name : p.nameEn;
  const mat = lang === 'fr' ? p.mat : p.matEn;
  const desc = lang === 'fr' ? p.desc : p.descEn;
  const d = p.dark;

  const [selectedSize, setSelectedSize] = useState(p.sizes[0]);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    if (isSO) return;
    addToCart(p, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  const waText = encodeURIComponent(`Bonjour Ébène! Je veux commander: ${name} — Taille ${selectedSize} (${formatFCFA(p.price)}) - Cotonou, Bénin`);

  return (
    <section style={{minHeight:'100vh',background:'#F7F3EE',paddingTop:100}}>
      <div className="product-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',minHeight:'calc(100vh - 100px)'}}>

        {/* LEFT — image / color block */}
        <div className="product-img-col" style={{background:p.bg,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',position:'sticky',top:100,height:'calc(100vh - 100px)',overflow:'hidden'}}>
          <span style={{fontFamily:"'DM Serif Display',serif",fontSize:'clamp(22px,3vw,38px)',textAlign:'center',lineHeight:1.3,color:d?'rgba(247,243,238,0.4)':'rgba(14,11,8,0.25)',fontStyle:'italic',padding:'0 48px',userSelect:'none'}}>{name}</span>
          {p.badge && (
            <div style={{
              marginTop:32,
              background:p.badge==='NEW'?'#0E0B08':p.badge==='SOLD OUT'?'#888':'#C4763A',
              color:'#F7F3EE',fontSize:9,letterSpacing:3,padding:'6px 16px',
              textTransform:'uppercase',fontWeight:700,fontFamily:"'Jost',sans-serif"
            }}>{p.badge}</div>
          )}
        </div>

        {/* RIGHT — details */}
        <div className="product-detail-col" style={{padding:'64px 72px 80px',display:'flex',flexDirection:'column',justifyContent:'center',gap:0}}>

          {/* back link */}
          <Link href="/collection" style={{fontSize:11,letterSpacing:3,textTransform:'uppercase',fontWeight:700,color:'#C4763A',textDecoration:'none',display:'inline-block',marginBottom:40}}>
            ← {T.backToCollection}
          </Link>

          {/* category */}
          <p style={{fontSize:11,letterSpacing:4,textTransform:'uppercase',color:'#C4763A',fontWeight:700,margin:'0 0 16px'}}>
            {getCatLabel(p.cat, lang)}
          </p>

          {/* name */}
          <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:'clamp(36px,4vw,60px)',fontWeight:400,margin:'0 0 24px',lineHeight:1.05,color:'#0E0B08'}}>
            {name}
          </h1>

          {/* price */}
          <p style={{fontFamily:"'DM Serif Display',serif",fontSize:'clamp(22px,2.5vw,34px)',color:'#C4763A',margin:'0 0 32px',fontWeight:400}}>
            {formatFCFA(p.price)}
          </p>

          {/* divider */}
          <div style={{width:48,height:1.5,background:'#0E0B08',marginBottom:32}} />

          {/* material */}
          <div style={{marginBottom:24}}>
            <p style={{fontSize:11,letterSpacing:3,textTransform:'uppercase',color:'#0E0B08',fontWeight:700,margin:'0 0 6px'}}>{T.material}</p>
            <p style={{fontSize:16,fontWeight:400,color:'#0E0B08',margin:0}}>{mat}</p>
          </div>

          {/* description */}
          <div style={{marginBottom:40}}>
            <p style={{fontSize:15,fontWeight:300,color:'rgba(14,11,8,0.7)',lineHeight:1.85,margin:0,maxWidth:380}}>{desc}</p>
          </div>

          {/* size selector */}
          {!isSO && (
            <div style={{marginBottom:40}}>
              <p style={{fontSize:11,letterSpacing:3,textTransform:'uppercase',color:'#0E0B08',fontWeight:700,margin:'0 0 14px'}}>{T.selectSize}</p>
              <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
                {p.sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    style={{
                      padding:'10px 18px',
                      fontSize:11,
                      letterSpacing:2,
                      fontFamily:"'Jost',sans-serif",
                      fontWeight:700,
                      textTransform:'uppercase',
                      cursor:'pointer',
                      border:`1.5px solid ${s === selectedSize ? '#0E0B08' : '#ccc'}`,
                      background: s === selectedSize ? '#0E0B08' : 'transparent',
                      color: s === selectedSize ? '#F7F3EE' : '#0E0B08',
                      transition:'all 0.15s',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* actions */}
          <div style={{display:'flex',flexDirection:'column',gap:12,maxWidth:380}}>
            <button
              onClick={handleAdd}
              disabled={isSO}
              style={{
                width:'100%',
                padding:'18px 24px',
                background: isSO ? '#ccc' : added ? '#2a6b3c' : '#0E0B08',
                color:'#F7F3EE',
                border:'none',
                fontSize:12,
                letterSpacing:3,
                textTransform:'uppercase',
                fontFamily:"'Jost',sans-serif",
                fontWeight:700,
                cursor: isSO ? 'not-allowed' : 'pointer',
                transition:'background 0.3s',
              }}
            >
              {isSO ? T.soldOut : added ? (lang === 'fr' ? 'Ajouté ✓' : 'Added ✓') : `${T.addToCart} — ${selectedSize}`}
            </button>

            {!isSO && (
              <a
                href={`https://wa.me/22900000000?text=${waText}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  display:'block',
                  width:'100%',
                  padding:'16px 24px',
                  background:'transparent',
                  color:'#0E0B08',
                  border:'1.5px solid #0E0B08',
                  fontSize:12,
                  letterSpacing:3,
                  textTransform:'uppercase',
                  fontFamily:"'Jost',sans-serif",
                  fontWeight:700,
                  cursor:'pointer',
                  textAlign:'center',
                  textDecoration:'none',
                  boxSizing:'border-box',
                }}
              >
                WhatsApp →
              </a>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
