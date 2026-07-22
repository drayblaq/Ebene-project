'use client';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { Product, getCatLabel } from '@/lib/products';
import { Lang, tr } from '@/lib/translations';

interface Props { product: Product; lang: Lang; onAdd: (p: Product) => void; offsetTop?: number; }

export default function ProductCard({ product: p, lang, onAdd, offsetTop = 0 }: Props) {
  const T = tr[lang];
  const d = p.dark, isSO = p.badge === 'SOLD OUT';
  const bg = d ? '#0E0B08' : '#fff', fg = d ? '#F7F3EE' : '#0E0B08';
  const mu = d ? 'rgba(247,243,238,0.3)' : '#bbb';
  const bbg = d ? '#F7F3EE' : '#0E0B08', bfg = d ? '#0E0B08' : '#F7F3EE';
  const bmu = d ? 'rgba(14,11,8,0.45)' : 'rgba(247,243,238,0.45)';
  const name = lang==='fr'?p.name:p.nameEn, mat = lang==='fr'?p.mat:p.matEn;
  const desc = lang==='fr'?p.desc:p.descEn;
  const waText = encodeURIComponent(`Bonjour Ébène! Je veux commander: ${name} (${p.price}€) - Cotonou, Bénin`);
  const badgeBg = p.badge==='NEW'?'#0E0B08':p.badge==='SOLD OUT'?'#888':'#C4763A';

  const scRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sc = scRef.current, card = cardRef.current;
    if (!sc || !card) return;
    let rotY = 0, dragging = false, lastX = 0;
    const onMove = (e: MouseEvent) => {
      if (dragging) return;
      const r = sc.getBoundingClientRect();
      const cx = (e.clientX-r.left)/r.width-0.5, cy = (e.clientY-r.top)/r.height-0.5;
      card.style.transition = 'transform 0.12s ease';
      card.style.transform = `rotateX(${-cy*10}deg) rotateY(${rotY+cx*18}deg)`;
    };
    const onLeave = () => { if(dragging) return; card.style.transition='transform 0.7s cubic-bezier(0.23,1,0.32,1)'; card.style.transform=`rotateY(${rotY}deg)`; };
    const onDown = (e: MouseEvent) => { dragging=true; lastX=e.clientX; sc.style.cursor='grabbing'; e.preventDefault(); };
    const onGlobalMove = (e: MouseEvent) => { if(!dragging) return; rotY+=(e.clientX-lastX)*0.9; lastX=e.clientX; card.style.transition='none'; card.style.transform=`rotateY(${rotY}deg)`; };
    const onUp = () => { if(!dragging) return; dragging=false; sc.style.cursor='grab'; rotY=Math.round(rotY/180)*180; card.style.transition='transform 0.5s cubic-bezier(0.23,1,0.32,1)'; card.style.transform=`rotateY(${rotY}deg)`; };
    sc.addEventListener('mousemove',onMove);
    sc.addEventListener('mouseleave',onLeave);
    sc.addEventListener('mousedown',onDown);
    document.addEventListener('mousemove',onGlobalMove);
    document.addEventListener('mouseup',onUp);
    return () => { sc.removeEventListener('mousemove',onMove); sc.removeEventListener('mouseleave',onLeave); sc.removeEventListener('mousedown',onDown); document.removeEventListener('mousemove',onGlobalMove); document.removeEventListener('mouseup',onUp); };
  }, []);

  return (
    <div ref={scRef} className="card-scene" style={{marginTop:offsetTop,width:250,flexShrink:0}}>
      <div style={{display:'flex',justifyContent:'center'}}>
        <div style={{width:1.5,height:60,background:`linear-gradient(to bottom,transparent,${d?'#555':'#bbb'})`}} />
      </div>
      <div ref={cardRef} className="card-3d">
        {/* FRONT */}
        <div className="card-face" style={{background:bg,boxShadow:d?'4px 8px 40px rgba(0,0,0,0.2)':'4px 8px 28px rgba(0,0,0,0.07)'}}>
          <div style={{padding:16,display:'flex',flexDirection:'column',alignItems:'center',borderBottom:`1px solid ${d?'rgba(255,255,255,0.07)':'#f0ece8'}`}}>
            <div style={{width:13,height:13,borderRadius:'50%',border:`1.5px solid ${d?'rgba(255,255,255,0.15)':'#ddd'}`,marginBottom:12,background:d?'rgba(255,255,255,0.04)':'#f5f5f5'}} />
            <span style={{fontSize:8,letterSpacing:4,textTransform:'uppercase',color:mu,fontWeight:300}}>{T.nouvelleCollection.toUpperCase()}</span>
          </div>
          <div style={{height:195,background:p.bg,display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden',position:'relative'}}>
            <Image src={p.image} alt={name} width={185} height={185} style={{objectFit:'contain',mixBlendMode:d?'normal':'multiply',opacity:isSO?0.3:1,filter:isSO?'grayscale(100%)':'none'}} />
            {p.badge && <div style={{position:'absolute',bottom:10,right:10,background:badgeBg,color:'#F7F3EE',fontSize:8,letterSpacing:2,padding:'4px 10px',borderRadius:20,textTransform:'uppercase',fontWeight:500}}>{p.badge}</div>}
          </div>
          <div style={{padding:'16px 20px 20px'}}>
            <h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:21,margin:'0 0 4px',lineHeight:1.2,color:fg,fontWeight:400}}>{name}</h3>
            <p style={{fontSize:10,color:mu,letterSpacing:2,textTransform:'uppercase',margin:'0 0 12px',fontWeight:300}}>{mat}</p>
            <div style={{display:'flex',gap:5,marginBottom:14,flexWrap:'wrap'}}>
              {p.sizes.map(s=><span key={s} style={{fontSize:9,border:`1px solid ${d?'rgba(255,255,255,0.2)':'#ddd'}`,color:fg,padding:'4px 8px',letterSpacing:1,fontWeight:400}}>{s}</span>)}
            </div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <span style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:isSO?mu:fg}}>{p.price}€</span>
              <button onClick={()=>onAdd(p)} disabled={isSO} style={{width:40,height:40,background:isSO?'#ccc':d?'#C4763A':'#0E0B08',border:'none',borderRadius:'50%',color:'#F7F3EE',display:'flex',alignItems:'center',justifyContent:'center',cursor:isSO?'not-allowed':'pointer',flexShrink:0}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
            </div>
          </div>
        </div>
        {/* BACK */}
        <div className="card-face card-back" style={{background:bbg,display:'flex',flexDirection:'column',justifyContent:'space-between',padding:24,gap:10}}>
          <div>
            <p style={{fontSize:8,letterSpacing:4,textTransform:'uppercase',color:bmu,margin:0,fontWeight:300}}>{getCatLabel(p.cat,lang)}</p>
            <h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:bfg,margin:'4px 0 8px',lineHeight:1.1,fontWeight:400}}>{name}</h3>
            <p style={{fontSize:13,color:bmu,lineHeight:1.75,margin:0,fontWeight:300}}>{desc}</p>
          </div>
          <div>
            <p style={{fontSize:8,letterSpacing:3,textTransform:'uppercase',color:bmu,margin:0,fontWeight:300}}>{T.material}</p>
            <p style={{fontSize:14,color:bfg,margin:'4px 0 0',fontWeight:500}}>{mat}</p>
          </div>
          <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>
            {p.sizes.map(s=><span key={s} style={{fontSize:9,border:`1px solid ${d?'rgba(14,11,8,0.2)':'rgba(247,243,238,0.2)'}`,color:bfg,padding:'4px 8px',letterSpacing:1,fontWeight:400}}>{s}</span>)}
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            <button onClick={()=>onAdd(p)} style={{display:'block',width:'100%',background:d?'#0E0B08':'#C4763A',color:'#F7F3EE',border:'none',padding:12,fontSize:10,letterSpacing:3,textTransform:'uppercase',fontFamily:"'Jost',sans-serif",cursor:'pointer',fontWeight:500}}>{T.addToCart} +</button>
            <a href={`https://wa.me/22900000000?text=${waText}`} target="_blank" rel="noreferrer" style={{display:'block',textAlign:'center',fontSize:10,letterSpacing:2,color:bmu,textTransform:'uppercase',fontWeight:300}}>WhatsApp →</a>
          </div>
        </div>
      </div>
    </div>
  );
}
