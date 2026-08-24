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
      <span style={{fontFamily:"'Joti One',cursive",fontSize:12,textAlign:'center',lineHeight:1.3,color:'rgba(0,0,0,0.3)',fontStyle:'italic'}}>{name}</span>
    </div>
  );
  return <Image src={item.image} alt="" width={85} height={85} onError={()=>setErr(true)} style={{objectFit:'contain',mixBlendMode:'multiply'}} />;
}

export default function Cart() {
  const { lang, cart, removeFromCart, updateQty, clearCart } = useApp();
  const T = tr[lang];
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const IG_DM = 'https://ig.me/m/_xwe.ebene';
  const [copied, setCopied] = useState(false);

  const orderText = cart.map(i=>`• ${lang==='fr'?i.name:i.nameEn} Taille ${i.size} x${i.qty}`).join('\n');
  const fullMessage = lang==='fr'
    ? `Bonjour Ébène ! Je voudrais précommander :\n${orderText}\n\nMerci`
    : `Hello Ébène! I'd like to pre-order:\n${orderText}\n\nThank you`;

  function handleCopy() {
    try { navigator.clipboard.writeText(fullMessage); } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  function handleOrder() {
    try { navigator.clipboard.writeText(fullMessage); } catch {}
    window.open(IG_DM, '_blank');
    clearCart();
  }

  return (
    <section className="sec-cart" style={{minHeight:'100vh',background:'#FFFFFF',padding:'140px 80px 80px'}}>
      {cart.length === 0 ? (
        <div style={{textAlign:'center',padding:'80px 0',display:'flex',flexDirection:'column',alignItems:'center',gap:24}}>
          <h2 style={{fontFamily:"'Joti One',cursive",fontSize:'clamp(36px,6vw,52px)',margin:0}}>{T.cartEmpty}</h2>
          <p style={{color:'#000000',fontWeight:400,fontSize:16,margin:0,fontFamily:"'Aoboshi One',sans-serif"}}>{T.cartEmptyDesc}</p>
          <Link href="/collection" className="btn-ol btn-ol-lt" style={{marginTop:12}}>{T.shopNow} →</Link>
        </div>
      ) : (
        <>
          <h1 style={{fontFamily:"'Joti One',cursive",fontSize:'clamp(40px,5vw,72px)',margin:'0 0 60px',lineHeight:1.05}}>{T.cartTitle}</h1>
          <div className="cart-grid" style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:60,alignItems:'start'}}>
            <div>
              {cart.map(item=>(
                <div key={item.id} className="cart-item-row" style={{display:'flex',gap:20,padding:'28px 0',borderBottom:'1px solid rgba(0,0,0,0.08)',alignItems:'center',flexWrap:'wrap'}}>
                  <div style={{width:90,height:90,background:'#F5F5F5',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,overflow:'hidden'}}>
                    <CartItemImage item={item} lang={lang} />
                  </div>
                  <div style={{flex:1}}>
                    <h3 style={{fontFamily:"'Joti One',cursive",fontSize:22,margin:'0 0 4px',fontWeight:400}}>{lang==='fr'?item.name:item.nameEn}</h3>
                    <p style={{fontSize:12,color:'#000000',letterSpacing:2,textTransform:'uppercase',margin:'0 0 6px',fontWeight:700,fontFamily:"'Aoboshi One',sans-serif"}}>{lang==='fr'?item.mat:item.matEn}</p>
                    <p style={{fontSize:13,color:'#000000',margin:0,fontWeight:700,fontFamily:"'Aoboshi One',sans-serif"}}>{T.size}: {item.size}</p>
                  </div>
                  <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:12}}>
                    <p style={{fontFamily:"'Joti One',cursive",fontSize:18,margin:0}}>{formatFCFA(item.price * item.qty)}</p>
                    <div style={{display:'flex',alignItems:'center',gap:0,border:'1.5px solid #000000'}}>
                      <button onClick={()=>updateQty(item.id,item.size,-1)} style={{width:32,height:32,background:'none',border:'none',cursor:'pointer',fontSize:18,fontWeight:700,color:'#000000',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Aoboshi One',sans-serif"}}>−</button>
                      <span style={{minWidth:28,textAlign:'center',fontSize:13,fontWeight:700,fontFamily:"'Aoboshi One',sans-serif",color:'#000000'}}>{item.qty}</span>
                      <button onClick={()=>updateQty(item.id,item.size,+1)} style={{width:32,height:32,background:'none',border:'none',cursor:'pointer',fontSize:18,fontWeight:700,color:'#000000',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Aoboshi One',sans-serif"}}>+</button>
                    </div>
                    <button onClick={()=>removeFromCart(item.id)} style={{fontSize:11,letterSpacing:2,color:'#000000',background:'none',border:'none',cursor:'pointer',fontFamily:"'Aoboshi One',sans-serif",textTransform:'uppercase',fontWeight:700,padding:0}}>{T.remove}</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary" style={{background:'#000000',padding:40,position:'sticky',top:120}}>
              <h2 style={{fontFamily:"'Joti One',cursive",fontSize:28,color:'#FFFFFF',margin:'0 0 32px',fontWeight:400}}>{T.orderSummary}</h2>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:20,alignItems:'baseline'}}>
                <span style={{fontSize:12,color:'#FFFFFF',letterSpacing:2,textTransform:'uppercase',fontWeight:700,fontFamily:"'Aoboshi One',sans-serif"}}>{T.subtotal}</span>
                <span style={{fontFamily:"'Joti One',cursive",fontSize:20,color:'#FFFFFF'}}>{formatFCFA(total)}</span>
              </div>
              <div style={{borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:20,marginBottom:32,display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
                <span style={{fontSize:13,color:'#FFFFFF',fontWeight:700,letterSpacing:1,fontFamily:"'Aoboshi One',sans-serif"}}>Total</span>
                <span style={{fontFamily:"'Joti One',cursive",fontSize:28,color:'#814D2D'}}>{formatFCFA(total)}</span>
              </div>
              {/* Order message preview */}
              <div style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',padding:'16px 18px',marginBottom:16}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
                  <span style={{fontSize:10,letterSpacing:3,textTransform:'uppercase',color:'#814D2D',fontWeight:700,fontFamily:"'Aoboshi One',sans-serif"}}>
                    {lang==='fr'?'Message à copier':'Message to copy'}
                  </span>
                  <button onClick={handleCopy} style={{fontSize:10,letterSpacing:2,textTransform:'uppercase',color:copied?'#4caf50':'#FFFFFF',background:'none',border:'none',cursor:'pointer',fontWeight:700,fontFamily:"'Aoboshi One',sans-serif",padding:0}}>
                    {copied?(lang==='fr'?'Copié ✓':'Copied ✓'):(lang==='fr'?'Copier':'Copy')}
                  </button>
                </div>
                <pre style={{fontSize:12,color:'#FFFFFF',margin:0,whiteSpace:'pre-wrap',wordBreak:'break-word',lineHeight:1.7,fontFamily:"'Aoboshi One',sans-serif",fontWeight:400}}>
                  {fullMessage}
                </pre>
              </div>
              <button onClick={handleOrder} style={{display:'block',width:'100%',background:'#814D2D',color:'#FFFFFF',textAlign:'center',padding:16,fontSize:12,letterSpacing:3,textTransform:'uppercase',fontFamily:"'Aoboshi One',sans-serif",fontWeight:700,marginBottom:10,border:'none',cursor:'pointer'}}>{T.orderInstagram} →</button>
              <p style={{fontSize:11,color:'#FFFFFF',textAlign:'center',margin:0,fontWeight:400,letterSpacing:0.5,fontFamily:"'Aoboshi One',sans-serif",lineHeight:1.6}}>
                {lang==='fr'?'Copiez le message ci-dessus, puis collez-le dans le chat Instagram.':'Copy the message above, then paste it into the Instagram chat.'}
              </p>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
