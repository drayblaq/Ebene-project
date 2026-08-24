'use client';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Product, getCatLabel, formatFCFA } from '@/lib/products';
import { Lang, tr } from '@/lib/translations';

interface Props { product: Product; lang: Lang; onAdd: (p: Product) => void; offsetTop?: number; }

export default function ProductCard({ product: p, lang, onAdd, offsetTop = 0 }: Props) {
  const T = tr[lang];
  const d = p.dark, isSO = p.badge === 'SOLD OUT';
  const bg = d ? '#000000' : '#FFFFFF', fg = d ? '#FFFFFF' : '#000000';
  const mu = d ? '#FFFFFF' : '#000000';
  const bbg = d ? '#FFFFFF' : '#000000', bfg = d ? '#000000' : '#FFFFFF';
  const bmu = d ? '#000000' : '#FFFFFF';
  const name = lang==='fr'?p.name:p.nameEn, mat = lang==='fr'?p.mat:p.matEn;
  const desc = lang==='fr'?p.desc:p.descEn;
  const badge = lang === 'fr' ? p.badge : (p.badgeEn ?? p.badge);
  const badgeBg = p.badge==='NEW'?'#000000':p.badge==='SOLD OUT'?'#666':'#814D2D';
  const [imgErr, setImgErr] = useState(false);
  const showFallback = !p.image || imgErr;
  const router = useRouter();
  const didDragRef = useRef(false);

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
    const onDown = (e: MouseEvent) => { dragging=true; lastX=e.clientX; didDragRef.current=false; sc.style.cursor='grabbing'; e.preventDefault(); };
    const onGlobalMove = (e: MouseEvent) => { if(!dragging) return; const dx=e.clientX-lastX; if(Math.abs(dx)>4) didDragRef.current=true; rotY+=dx*0.9; lastX=e.clientX; card.style.transition='none'; card.style.transform=`rotateY(${rotY}deg)`; };
    const onUp = () => { if(!dragging) return; dragging=false; sc.style.cursor='grab'; rotY=Math.round(rotY/180)*180; card.style.transition='transform 0.5s cubic-bezier(0.23,1,0.32,1)'; card.style.transform=`rotateY(${rotY}deg)`; };
    // Touch support for mobile flip
    const onTouchStart = (e: TouchEvent) => { dragging=true; lastX=e.touches[0].clientX; didDragRef.current=false; };
    const onTouchMove = (e: TouchEvent) => {
      if (!dragging) return;
      const dx = e.touches[0].clientX - lastX;
      if (Math.abs(dx) > 4) didDragRef.current = true;
      rotY += dx * 0.9; lastX = e.touches[0].clientX;
      card.style.transition = 'none';
      card.style.transform = `rotateY(${rotY}deg)`;
      e.preventDefault();
    };
    const onTouchEnd = () => { if(!dragging) return; dragging=false; rotY=Math.round(rotY/180)*180; card.style.transition='transform 0.5s cubic-bezier(0.23,1,0.32,1)'; card.style.transform=`rotateY(${rotY}deg)`; };

    sc.addEventListener('mousemove',onMove);
    sc.addEventListener('mouseleave',onLeave);
    sc.addEventListener('mousedown',onDown);
    document.addEventListener('mousemove',onGlobalMove);
    document.addEventListener('mouseup',onUp);
    sc.addEventListener('touchstart',onTouchStart,{passive:true});
    sc.addEventListener('touchmove',onTouchMove,{passive:false});
    sc.addEventListener('touchend',onTouchEnd);
    return () => { sc.removeEventListener('mousemove',onMove); sc.removeEventListener('mouseleave',onLeave); sc.removeEventListener('mousedown',onDown); document.removeEventListener('mousemove',onGlobalMove); document.removeEventListener('mouseup',onUp); sc.removeEventListener('touchstart',onTouchStart); sc.removeEventListener('touchmove',onTouchMove); sc.removeEventListener('touchend',onTouchEnd); };
  }, []);

  function handleCardClick() {
    if (!didDragRef.current) router.push(`/product/${p.id}`);
  }

  return (
    <div ref={scRef} className="card-scene" onClick={handleCardClick} style={{marginTop:offsetTop,flexShrink:0,cursor:'grab'}}>
      <div ref={cardRef} className="card-3d">
        {/* FRONT */}
        <div className="card-face" style={{background:bg,boxShadow:d?'4px 8px 40px rgba(0,0,0,0.3)':'4px 8px 28px rgba(0,0,0,0.08)',display:'flex',flexDirection:'column'}}>
          <div style={{padding:16,display:'flex',flexDirection:'column',alignItems:'center',borderBottom:`1px solid ${d?'rgba(255,255,255,0.07)':'rgba(0,0,0,0.06)'}`}}>
            <div style={{width:13,height:13,borderRadius:'50%',border:`1.5px solid ${d?'rgba(255,255,255,0.15)':'rgba(0,0,0,0.15)'}`,marginBottom:12,background:d?'rgba(255,255,255,0.04)':'rgba(0,0,0,0.03)'}} />
            <span style={{fontSize:10,letterSpacing:4,textTransform:'uppercase',color:mu,fontWeight:700,fontFamily:"'Aoboshi One',sans-serif"}}>
              {lang==='fr'
                ? <>Collection <span style={{color:'#814D2D'}}>N'naho</span></>
                : <><span style={{color:'#814D2D'}}>N'naho</span> Collection</>}
            </span>
          </div>
          <div style={{height:300,background:p.bg,display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden',position:'relative'}}>
            {showFallback ? (
              <div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',padding:'0 16px',opacity:isSO?0.3:1}}>
                <span style={{fontFamily:"'Joti One',cursive",fontSize:15,textAlign:'center',lineHeight:1.3,color:d?'rgba(255,255,255,0.5)':'rgba(0,0,0,0.25)',fontStyle:'italic'}}>{name}</span>
              </div>
            ) : (
              <div style={{position:'relative',width:'100%',height:'100%'}}>
                <Image src={p.image} alt={name} fill onError={()=>setImgErr(true)} style={{objectFit:'contain',objectPosition:'center center',opacity:isSO?0.3:1,filter:isSO?'grayscale(100%)':'none'}} />
              </div>
            )}
          </div>
          {badge && (
            <div style={{display:'flex',justifyContent:'center',marginTop:10}}>
              <span style={{background:badgeBg,color:'#FFFFFF',fontSize:9,letterSpacing:2,padding:'4px 14px',borderRadius:20,textTransform:'uppercase',fontWeight:600,whiteSpace:'nowrap'}}>{badge}</span>
            </div>
          )}
          <div style={{padding:'16px 20px 20px',marginTop:'auto'}}>
            <h3 style={{fontFamily:"'Joti One',cursive",fontSize:21,margin:'0 0 4px',lineHeight:1.2,color:fg,fontWeight:400}}>{name}</h3>
            <p style={{fontSize:11,color:mu,letterSpacing:2,textTransform:'uppercase',margin:'0 0 12px',fontWeight:700,fontFamily:"'Aoboshi One',sans-serif"}}>{mat}</p>
            <div style={{display:'flex',gap:5,marginBottom:14,flexWrap:'wrap'}}>
              {p.sizes.map(s=><span key={s} style={{fontSize:10,border:`1px solid ${d?'rgba(255,255,255,0.2)':'rgba(0,0,0,0.2)'}`,color:fg,padding:'4px 8px',letterSpacing:1,fontWeight:700,fontFamily:"'Aoboshi One',sans-serif"}}>{s}</span>)}
            </div>
            <span style={{fontFamily:"'Joti One',cursive",fontSize:18,color:isSO?mu:fg,display:'block'}}>{formatFCFA(p.price)}</span>
          </div>
        </div>
        {/* BACK */}
        <div className="card-face card-back" style={{background:bbg,display:'flex',flexDirection:'column',justifyContent:'space-between',padding:24,gap:10}}>
          <div>
            <h3 style={{fontFamily:"'Joti One',cursive",fontSize:22,color:bfg,margin:'0 0 8px',lineHeight:1.1,fontWeight:400}}>{name}</h3>
            <p style={{fontSize:13,color:bmu,lineHeight:1.75,margin:0,fontWeight:400,fontFamily:"'Aoboshi One',sans-serif"}}>{desc}</p>
          </div>
          <div>
            <p style={{fontSize:10,letterSpacing:3,textTransform:'uppercase',color:bmu,margin:0,fontWeight:700,fontFamily:"'Aoboshi One',sans-serif"}}>{T.material}</p>
            <p style={{fontSize:14,color:bfg,margin:'4px 0 0',fontWeight:500,fontFamily:"'Aoboshi One',sans-serif"}}>{mat}</p>
          </div>
          <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>
            {p.sizes.map(s=><span key={s} style={{fontSize:10,border:`1px solid ${d?'rgba(0,0,0,0.2)':'rgba(255,255,255,0.2)'}`,color:bfg,padding:'4px 8px',letterSpacing:1,fontWeight:700,fontFamily:"'Aoboshi One',sans-serif"}}>{s}</span>)}
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            <button onClick={e=>{e.stopPropagation();onAdd(p);}} style={{display:'block',width:'100%',background:d?'#000000':'#814D2D',color:'#FFFFFF',border:'none',padding:12,fontSize:11,letterSpacing:3,textTransform:'uppercase',fontFamily:"'Aoboshi One',sans-serif",cursor:'pointer',fontWeight:600}}>{T.addToCart}</button>
            <a href="https://www.instagram.com/_xwe.ebene" onClick={e=>e.stopPropagation()} target="_blank" rel="noreferrer" style={{display:'block',textAlign:'center',fontSize:10,letterSpacing:2,color:bmu,textTransform:'uppercase',fontWeight:700,fontFamily:"'Aoboshi One',sans-serif",textDecoration:'none'}}>Instagram →</a>
          </div>
        </div>
      </div>
    </div>
  );
}
