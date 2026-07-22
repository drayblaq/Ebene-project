'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { tr } from '@/lib/translations';
import { formatFCFA } from '@/lib/products';
import type { CartItem } from '@/context/AppContext';

function CartItemImage({ item, lang }: { item: CartItem; lang: 'fr' | 'en' }) {
  const [err, setErr] = useState(false);
  const name = lang === 'fr' ? item.name : item.nameEn;
  if (!item.image || err) return (
    <div style={{width:85,height:85,display:'flex',alignItems:'center',justifyContent:'center',padding:'0 8px'}}>
      <span style={{fontFamily:"'DM Serif Display',serif",fontSize:12,textAlign:'center',lineHeight:1.3,color:'rgba(14,11,8,0.3)',fontStyle:'italic'}}>{name}</span>
    </div>
  );
  return <Image src={item.image} alt="" width={85} height={85} onError={()=>setErr(true)} style={{objectFit:'contain',mixBlendMode:'multiply'}} />;
}

export default function Cart() {
  const { lang, cart, removeFromCart } = useApp();
  const T = tr[lang];
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const waItems = cart.map(i=>`${lang==='fr'?i.name:i.nameEn} x${i.qty}`).join(', ');
  const waLink = `https://wa.me/22900000000?text=${encodeURIComponent(`Bonjour Ébène! Je commande: ${waItems}. Total: ${formatFCFA(total)}. Cotonou.`)}`;

  return (
    <section className="sec-cart" style={{minHeight:'100vh',background:'#F7F3EE',padding:'140px 80px 80px'}}>
      {cart.length === 0 ? (
        <div style={{textAlign:'center',padding:'80px 0',display:'flex',flexDirection:'column',alignItems:'center',gap:24}}>
          <Image src="/images/ebene.png" alt="" width={140} height={140} style={{opacity:0.3,mixBlendMode:'multiply',objectFit:'contain'}} />
          <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:52,margin:0}}>{T.cartEmpty}</h2>
          <p style={{color:'#888',fontWeight:300,fontSize:16,margin:0}}>{T.cartEmptyDesc}</p>
          <Link href="/collection" className="btn-ol btn-ol-lt" style={{marginTop:12}}>{T.shopNow} →</Link>
        </div>
      ) : (
        <>
          <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:'clamp(40px,5vw,72px)',margin:'0 0 60px',lineHeight:1.05}}>{T.cartTitle}</h1>
          <div className="cart-grid" style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:60,alignItems:'start'}}>
            <div>
              {cart.map(item=>(
                <div key={item.id} style={{display:'flex',gap:24,padding:'28px 0',borderBottom:'1px solid #eee',alignItems:'center'}}>
                  <div style={{width:90,height:90,background:'#F2EEE9',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,overflow:'hidden'}}>
                    <CartItemImage item={item} lang={lang} />
                  </div>
                  <div style={{flex:1}}>
                    <h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:22,margin:'0 0 4px',fontWeight:400}}>{lang==='fr'?item.name:item.nameEn}</h3>
                    <p style={{fontSize:12,color:'#0E0B08',letterSpacing:2,textTransform:'uppercase',margin:'0 0 6px',fontWeight:700}}>{lang==='fr'?item.mat:item.matEn}</p>
                    <p style={{fontSize:13,color:'#0E0B08',margin:0,fontWeight:700}}>{T.size}: {item.size}</p>
                  </div>
                  <div style={{textAlign:'right',display:'flex',flexDirection:'column',alignItems:'flex-end',gap:10}}>
                    <p style={{fontFamily:"'DM Serif Display',serif",fontSize:18,margin:0}}>{formatFCFA(item.price)}</p>
                    <button onClick={()=>removeFromCart(item.id)} style={{fontSize:11,letterSpacing:2,color:'#0E0B08',background:'none',border:'none',cursor:'pointer',fontFamily:"'Jost',sans-serif",textTransform:'uppercase',fontWeight:700,padding:0}}>{T.remove}</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary" style={{background:'#0E0B08',padding:40,position:'sticky',top:120}}>
              <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:28,color:'#F7F3EE',margin:'0 0 32px',fontWeight:400}}>{T.orderSummary}</h2>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:20,alignItems:'baseline'}}>
                <span style={{fontSize:12,color:'#F7F3EE',letterSpacing:2,textTransform:'uppercase',fontWeight:700}}>{T.subtotal}</span>
                <span style={{fontFamily:"'DM Serif Display',serif",fontSize:20,color:'#F7F3EE'}}>{formatFCFA(total)}</span>
              </div>
              <div style={{borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:20,marginBottom:32,display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
                <span style={{fontSize:13,color:'#F7F3EE',fontWeight:500,letterSpacing:1}}>Total</span>
                <span style={{fontFamily:"'Kablammo',system-ui",fontSize:28,color:'#C4763A'}}>{formatFCFA(total)}</span>
              </div>
              <a href={waLink} target="_blank" rel="noreferrer" style={{display:'block',background:'#C4763A',color:'#F7F3EE',textAlign:'center',padding:16,fontSize:12,letterSpacing:3,textTransform:'uppercase',fontFamily:"'Jost',sans-serif",fontWeight:600,marginBottom:12}}>{T.orderWhatsApp} →</a>
              <p style={{fontSize:11,color:'#F7F3EE',textAlign:'center',margin:0,fontWeight:500,letterSpacing:1}}>{T.orPayOnline}</p>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
