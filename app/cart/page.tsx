'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { tr } from '@/lib/translations';

export default function Cart() {
  const { lang, cart, removeFromCart } = useApp();
  const T = tr[lang];
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const waItems = cart.map(i=>`${lang==='fr'?i.name:i.nameEn} x${i.qty}`).join(', ');
  const waLink = `https://wa.me/22900000000?text=${encodeURIComponent(`Bonjour Ébène! Je commande: ${waItems}. Total: ${total}€. Cotonou.`)}`;

  return (
    <section style={{minHeight:'100vh',background:'#F7F3EE',padding:'140px 80px 80px'}}>
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
          <div style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:60,alignItems:'start'}}>
            <div>
              {cart.map(item=>(
                <div key={item.id} style={{display:'flex',gap:24,padding:'28px 0',borderBottom:'1px solid #eee',alignItems:'center'}}>
                  <div style={{width:90,height:90,background:'#F2EEE9',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,overflow:'hidden'}}>
                    <Image src={item.image} alt="" width={85} height={85} style={{objectFit:'contain',mixBlendMode:'multiply'}} />
                  </div>
                  <div style={{flex:1}}>
                    <h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:22,margin:'0 0 4px',fontWeight:400}}>{lang==='fr'?item.name:item.nameEn}</h3>
                    <p style={{fontSize:11,color:'#bbb',letterSpacing:2,textTransform:'uppercase',margin:'0 0 6px',fontWeight:300}}>{lang==='fr'?item.mat:item.matEn}</p>
                    <p style={{fontSize:13,color:'#888',margin:0,fontWeight:400}}>{T.size}: {item.size}</p>
                  </div>
                  <div style={{textAlign:'right',display:'flex',flexDirection:'column',alignItems:'flex-end',gap:10}}>
                    <p style={{fontFamily:"'DM Serif Display',serif",fontSize:24,margin:0}}>{item.price}€</p>
                    <button onClick={()=>removeFromCart(item.id)} style={{fontSize:9,letterSpacing:2,color:'#bbb',background:'none',border:'none',cursor:'pointer',fontFamily:"'Jost',sans-serif",textTransform:'uppercase',fontWeight:400,padding:0}}>{T.remove}</button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{background:'#0E0B08',padding:40,position:'sticky',top:120}}>
              <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:28,color:'#F7F3EE',margin:'0 0 32px',fontWeight:400}}>{T.orderSummary}</h2>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:20,alignItems:'baseline'}}>
                <span style={{fontSize:11,color:'rgba(247,243,238,0.4)',letterSpacing:2,textTransform:'uppercase',fontWeight:400}}>{T.subtotal}</span>
                <span style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:'#F7F3EE'}}>{total}€</span>
              </div>
              <div style={{borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:20,marginBottom:32,display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
                <span style={{fontSize:13,color:'#F7F3EE',fontWeight:500,letterSpacing:1}}>Total</span>
                <span style={{fontFamily:"'Kablammo',system-ui",fontSize:32,color:'#C4763A'}}>{total}€</span>
              </div>
              <a href={waLink} target="_blank" rel="noreferrer" style={{display:'block',background:'#C4763A',color:'#F7F3EE',textAlign:'center',padding:16,fontSize:11,letterSpacing:3,textTransform:'uppercase',fontFamily:"'Jost',sans-serif",fontWeight:500,marginBottom:12}}>{T.orderWhatsApp} →</a>
              <p style={{fontSize:10,color:'rgba(247,243,238,0.25)',textAlign:'center',margin:0,fontWeight:300,letterSpacing:1}}>{T.orPayOnline}</p>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
