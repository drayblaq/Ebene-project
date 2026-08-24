'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { products, getCatLabel, formatFCFA } from '@/lib/products';
import { tr } from '@/lib/translations';

export default function ProductDetail({ params }: { params: { id: string } }) {
  const { lang, addToCart } = useApp();
  const T = tr[lang];

  const product = products.find(p => p.id === Number(params.id));

  if (!product) {
    return (
      <section style={{minHeight:'100vh',background:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{textAlign:'center'}}>
          <p style={{fontSize:12,letterSpacing:4,textTransform:'uppercase',color:'#814D2D',fontWeight:700,marginBottom:24,fontFamily:"'Aoboshi One',sans-serif"}}>Produit introuvable</p>
          <Link href="/collection" style={{fontSize:11,letterSpacing:3,textTransform:'uppercase',fontWeight:700,color:'#000000',fontFamily:"'Aoboshi One',sans-serif"}}>← {T.backToCollection}</Link>
        </div>
      </section>
    );
  }

  const p = product;
  const isSO = p.badge === 'SOLD OUT';
  const name = lang === 'fr' ? p.name : p.nameEn;
  const mat = lang === 'fr' ? p.mat : p.matEn;
  const desc = lang === 'fr' ? p.desc : p.descEn;
  const badge = lang === 'fr' ? p.badge : (p.badgeEn ?? p.badge);

  const [selectedSize, setSelectedSize] = useState(p.sizes[0]);
  const [added, setAdded] = useState(false);
  const [showBack, setShowBack] = useState(false);

  function handleAdd() {
    if (isSO) return;
    addToCart(p, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  const waText = encodeURIComponent(`Bonjour Ébène! Je veux précommander: ${name}, Taille ${selectedSize}, Cotonou, Bénin`);

  return (
    <>
    <section style={{minHeight:'100vh',background:'#FFFFFF',paddingTop:100}}>
      <div className="product-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',minHeight:'calc(100vh - 100px)'}}>

        {/* LEFT — product image */}
        <div className="product-img-col" style={{background:p.bg,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',position:'sticky',top:100,height:'calc(100vh - 100px)',overflow:'hidden',gap:20}}>
          <div style={{position:'relative',width:'85%',maxWidth:460,aspectRatio:'4/5'}}>
            <Image
              src={showBack && p.imageBack ? p.imageBack : p.image}
              alt={name}
              fill
              style={{objectFit:'contain',objectPosition:'center center'}}
              priority
            />
          </div>
          {p.imageBack && (
            <div style={{display:'flex',gap:12}}>
              <button onClick={()=>setShowBack(false)} style={{fontSize:9,letterSpacing:3,textTransform:'uppercase',fontFamily:"'Aoboshi One',sans-serif",fontWeight:700,padding:'6px 14px',border:`1.5px solid ${!showBack?'#000000':'rgba(0,0,0,0.2)'}`,background:!showBack?'#000000':'transparent',color:!showBack?'#FFFFFF':'#000000',cursor:'pointer'}}>
                {lang==='fr'?'Avant':'Front'}
              </button>
              <button onClick={()=>setShowBack(true)} style={{fontSize:9,letterSpacing:3,textTransform:'uppercase',fontFamily:"'Aoboshi One',sans-serif",fontWeight:700,padding:'6px 14px',border:`1.5px solid ${showBack?'#000000':'rgba(0,0,0,0.2)'}`,background:showBack?'#000000':'transparent',color:showBack?'#FFFFFF':'#000000',cursor:'pointer'}}>
                {lang==='fr'?'Arrière':'Back'}
              </button>
            </div>
          )}
          {badge && (
            <div style={{
              background:p.badge==='NEW'?'#000000':p.badge==='SOLD OUT'?'#666':'#814D2D',
              color:'#FFFFFF',fontSize:9,letterSpacing:3,padding:'6px 16px',
              textTransform:'uppercase',fontWeight:700,fontFamily:"'Aoboshi One',sans-serif"
            }}>{badge}</div>
          )}
        </div>

        {/* RIGHT — details */}
        <div className="product-detail-col" style={{padding:'64px 72px 80px',display:'flex',flexDirection:'column',justifyContent:'center',gap:0}}>

          <Link href="/collection" style={{fontSize:11,letterSpacing:3,textTransform:'uppercase',fontWeight:700,color:'#814D2D',textDecoration:'none',display:'inline-block',marginBottom:40,fontFamily:"'Aoboshi One',sans-serif"}}>
            ← {T.backToCollection}
          </Link>

          <h1 style={{fontFamily:"'Joti One',cursive",fontSize:'clamp(36px,4vw,60px)',fontWeight:400,margin:'0 0 16px',lineHeight:1.05,color:'#000000'}}>
            {name}
          </h1>

          <p style={{fontFamily:"'Joti One',cursive",fontSize:'clamp(18px,2vw,26px)',color:'#814D2D',margin:'0 0 32px',fontWeight:400,letterSpacing:1}}>
            {lang==='fr'?'Le Polo Terracotta':'The Terracotta Polo'}
          </p>

          <div style={{width:48,height:1.5,background:'#000000',marginBottom:32}} />

          <div style={{marginBottom:40}}>
            <p style={{fontSize:15,fontWeight:400,color:'#000000',lineHeight:1.85,margin:0,maxWidth:380,fontFamily:"'Aoboshi One',sans-serif"}}>{desc}</p>
          </div>

          {!isSO && (
            <div style={{marginBottom:40}}>
              <p style={{fontSize:11,letterSpacing:3,textTransform:'uppercase',color:'#000000',fontWeight:700,margin:'0 0 14px',fontFamily:"'Aoboshi One',sans-serif"}}>{T.selectSize}</p>
              <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
                {p.sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    style={{
                      padding:'10px 18px',
                      fontSize:11,
                      letterSpacing:2,
                      fontFamily:"'Aoboshi One',sans-serif",
                      fontWeight:700,
                      textTransform:'uppercase',
                      cursor:'pointer',
                      border:`1.5px solid ${s === selectedSize ? '#000000' : 'rgba(0,0,0,0.2)'}`,
                      background: s === selectedSize ? '#000000' : 'transparent',
                      color: s === selectedSize ? '#FFFFFF' : '#000000',
                      transition:'all 0.15s',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={{display:'flex',flexDirection:'column',gap:12,maxWidth:380}}>
            <button
              onClick={handleAdd}
              disabled={isSO}
              style={{
                width:'100%',
                padding:'18px 24px',
                background: isSO ? '#aaa' : added ? '#2a6b3c' : '#000000',
                color:'#FFFFFF',
                border:'none',
                fontSize:12,
                letterSpacing:3,
                textTransform:'uppercase',
                fontFamily:"'Aoboshi One',sans-serif",
                fontWeight:700,
                cursor: isSO ? 'not-allowed' : 'pointer',
                transition:'background 0.3s',
              }}
            >
              {isSO ? T.soldOut : added ? (lang === 'fr' ? 'Ajouté ✓' : 'Added ✓') : `${T.addToCart} · ${selectedSize}`}
            </button>

          </div>

        </div>
      </div>
    </section>
    {/* LIFESTYLE GALLERY */}
    <section style={{background:'#000000'}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:3}}>
        <div style={{position:'relative',aspectRatio:'2/3',overflow:'hidden'}}>
          <Image src="/images/9.png" alt="Polo Ébène porté" fill style={{objectFit:'cover',objectPosition:'center top'}} />
        </div>
        <div style={{position:'relative',aspectRatio:'2/3',overflow:'hidden'}}>
          <Image src="/images/11.png" alt="Polo Ébène porté" fill style={{objectFit:'cover',objectPosition:'center top'}} />
        </div>
      </div>
      <div className="lifestyle-caption" style={{padding:'36px 48px',textAlign:'center'}}>
        <p style={{fontSize:10,letterSpacing:5,textTransform:'uppercase',color:'#814D2D',margin:'0 0 6px',fontWeight:700,fontFamily:"'Aoboshi One',sans-serif"}}>
          {lang==='fr'?'POLO ÉBÈNE / PORTÉ':'ÉBÈNE POLO / WORN'}
        </p>
        <p style={{fontSize:13,color:'#FFFFFF',margin:0,fontFamily:"'Aoboshi One',sans-serif",fontWeight:400,letterSpacing:1}}>
          {lang==='fr'?'Cotonou, Bénin · 2026':'Cotonou, Benin · 2026'}
        </p>
      </div>
    </section>
    </>
  );
}
