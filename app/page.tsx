'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { tr } from '@/lib/translations';
import { products } from '@/lib/products';
import Marquee from '@/components/Marquee';
import ProductCard from '@/components/ProductCard';


export default function Home() {
  const { lang, addToCart } = useApp();
  const T = tr[lang];
  const router = useRouter();
  const offsets = [0, 36, 18, 52];

  // Countdown to August 24 2026
  const LAUNCH = new Date('2026-08-24T00:00:00');
  const [timeLeft, setTimeLeft] = useState({ d:0, h:0, m:0, s:0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, LAUNCH.getTime() - Date.now());
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.08 });
    document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="sec-hero" style={{height:'100vh',background:'#FFFFFF',display:'grid',gridTemplateColumns:'1fr 1fr',position:'relative',overflow:'hidden'}}>
        <div className="sec-hero-text" style={{display:'flex',flexDirection:'column',justifyContent:'center',padding:'90px 56px 60px 80px',position:'relative',zIndex:2}}>
          <p style={{fontSize:11,letterSpacing:6,textTransform:'uppercase',color:'#814D2D',margin:'0 0 28px',fontWeight:700,fontFamily:"'Aoboshi One',sans-serif"}}>{T.heroSub}</p>
          {/* Wordmark: precise clip based on PNG bounding box x=100-313, y=263-340 in 420×594 */}
          <div className="hero-wm-clip">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/wordmark-black-v2.png" alt="Ébène" className="hero-wm-img" />
          </div>
          <div style={{display:'flex',gap:20,alignItems:'center',flexWrap:'wrap'}}>
            <button onClick={()=>router.push('/collection')} className="btn-ol btn-ol-lt">{T.heroCta} →</button>
            <button onClick={()=>document.getElementById('story')?.scrollIntoView({behavior:'smooth'})} style={{fontSize:11,letterSpacing:3,textTransform:'uppercase',color:'#000000',fontWeight:700,cursor:'pointer',background:'none',border:'none',padding:0,fontFamily:"'Aoboshi One',sans-serif"}}>{T.heroStory}</button>
          </div>
        </div>
        <div className="sec-hero-img" style={{position:'relative',overflow:'hidden'}}>
          <Image src="/images/8.png" alt="Ébène" fill className="animate-float" style={{objectFit:'cover',objectPosition:'center top'}} priority />
          <div style={{position:'absolute',inset:0,background:'linear-gradient(to right,rgba(255,255,255,0.12),transparent)',pointerEvents:'none',zIndex:1}}/>
          <div style={{position:'absolute',bottom:40,right:40,width:88,height:88,zIndex:2}} className="animate-spin-text">
            <svg viewBox="0 0 100 100" width="88" height="88">
              <defs><path id="cp" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"/></defs>
              <text style={{fontSize:9,fontFamily:"'Aoboshi One',sans-serif",letterSpacing:2.5,fill:'#FFFFFF',fontWeight:400}}><textPath href="#cp">ÉBÈNE · COTONOU BÉNIN · 2026 · </textPath></text>
            </svg>
          </div>
        </div>
        <div className="sec-hero-scroll" style={{position:'absolute',bottom:28,left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:8,zIndex:10}}>
          <span style={{fontSize:10,letterSpacing:5,textTransform:'uppercase',color:'#000000',fontWeight:700,fontFamily:"'Aoboshi One',sans-serif"}}>{T.scroll}</span>
          <div style={{width:1,height:36,background:'linear-gradient(to bottom,#bbb,transparent)'}}/>
        </div>
      </section>

      {/* MARQUEE 1 */}
      <Marquee items={[
        {image:'/images/icon-black-v2.png',invert:true},{text:'Ébène'},{text:T.nouvelleCollection,accent:true},
        {image:'/images/icon-black-v2.png',invert:true},{text:'Ébène'},{text:'Cotonou, Bénin',accent:true},
        {image:'/images/icon-black-v2.png',invert:true},{text:'Ébène'},{text:T.faitAvecAme,accent:true},
      ]} />

      {/* FEATURED PRODUCTS */}
      <section className="sec-feat" style={{padding:'130px 80px 80px',background:'#FFFFFF'}}>
        <div className="fade-in" style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:16}}>
          <div>
            <p style={{fontSize:12,letterSpacing:5,textTransform:'uppercase',color:'#814D2D',margin:'0 0 18px',fontWeight:700,fontFamily:"'Aoboshi One',sans-serif"}}>{T.sectionFeatured}</p>
            <h2 style={{fontFamily:"'Joti One',cursive",fontSize:'clamp(38px,4.5vw,68px)',margin:0,lineHeight:1.05}}>{T.featuredTitle}</h2>
          </div>
          <button onClick={()=>router.push('/collection')} className="btn-ol btn-ol-lt">{T.seeAll} →</button>
        </div>
        <div className="feat-scroll" style={{display:'flex',gap:36,overflowX:'auto',paddingBottom:24,alignItems:'flex-start',scrollbarWidth:'none',WebkitOverflowScrolling:'touch'} as React.CSSProperties}>
          {products.slice(0,4).map((p,i)=>(
            <ProductCard key={p.id} product={p} lang={lang} onAdd={addToCart} offsetTop={offsets[i%4]} />
          ))}
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="sec-story" style={{background:'#000000',padding:'140px 80px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:100,alignItems:'center'}}>
        <div className="fade-in">
          <p style={{fontSize:12,letterSpacing:5,textTransform:'uppercase',color:'#814D2D',margin:'0 0 32px',fontWeight:700,fontFamily:"'Aoboshi One',sans-serif"}}>{T.storySection}</p>
          <h2 style={{fontFamily:"'Joti One',cursive",fontSize:'clamp(38px,3.8vw,60px)',color:'#FFFFFF',margin:'0 0 36px',lineHeight:1.1}}>{T.storyTitleLine1}<br/><em>{T.storyTitleLine2}</em></h2>
          <p style={{color:'#FFFFFF',fontSize:16,lineHeight:1.95,fontWeight:400,margin:'0 0 22px',maxWidth:440,textWrap:'pretty',fontFamily:"'Aoboshi One',sans-serif"} as React.CSSProperties}>{T.storyP1}</p>
          <p style={{color:'#FFFFFF',fontSize:16,lineHeight:1.95,fontWeight:400,margin:'0 0 0',maxWidth:440,textWrap:'pretty',fontFamily:"'Aoboshi One',sans-serif"} as React.CSSProperties}>{T.storyP2}</p>
          {/* Mobile-only countdown — desktop version lives in sec-story-img */}
          <div className="story-countdown-mob" style={{display:'none'}}>
            <div style={{marginTop:48,paddingTop:32,borderTop:'1px solid rgba(255,255,255,0.08)'}}>
              <p style={{fontSize:10,letterSpacing:5,textTransform:'uppercase',color:'#814D2D',margin:'0 0 20px',fontWeight:700,textAlign:'center',fontFamily:"'Aoboshi One',sans-serif"}}>
                {lang==='fr'?'Disponible dans':'Available in'}
              </p>
              <div style={{display:'flex',gap:0,justifyContent:'center'}}>
                {[
                  {n:String(timeLeft.d).padStart(2,'0'), l:lang==='fr'?'Jours':'Days'},
                  {n:String(timeLeft.h).padStart(2,'0'), l:lang==='fr'?'Heures':'Hours'},
                  {n:String(timeLeft.m).padStart(2,'0'), l:lang==='fr'?'Min':'Min'},
                  {n:String(timeLeft.s).padStart(2,'0'), l:lang==='fr'?'Sec':'Sec'},
                ].map((u,i)=>(
                  <div key={u.l} style={{display:'flex',alignItems:'stretch'}}>
                    <div style={{textAlign:'center',padding:'0 14px'}}>
                      <p style={{fontFamily:"'Joti One',cursive",fontSize:40,color:'#814D2D',margin:0,lineHeight:1,minWidth:44}}>{u.n}</p>
                      <p style={{fontSize:10,letterSpacing:3,textTransform:'uppercase',color:'#FFFFFF',margin:'8px 0 0',fontWeight:700,fontFamily:"'Aoboshi One',sans-serif"}}>{u.l}</p>
                    </div>
                    {i<3 && <span style={{fontFamily:"'Joti One',cursive",fontSize:36,color:'#814D2D',alignSelf:'flex-start',paddingTop:2,opacity:0.6}}>:</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="fade-in d2 sec-story-img" style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
          <div className="story-cloth-img" style={{position:'relative',width:'100%',display:'flex',justifyContent:'center',paddingBottom:60}}>
            <Image src="/images/cloth1.png" alt="" width={240} height={320} style={{width:'55%',maxWidth:240,filter:'drop-shadow(0 24px 64px rgba(0,0,0,0.6))',zIndex:2,position:'relative',objectFit:'contain'}} />
            <Image src="/images/tag.png" alt="" width={165} height={220} className="animate-tag-swing" style={{width:'38%',maxWidth:165,position:'absolute',bottom:-30,right:'8%',filter:'drop-shadow(0 16px 40px rgba(0,0,0,0.5)) invert(1)',transform:'rotate(10deg)',zIndex:1,objectFit:'contain'}} />
          </div>
          {/* Countdown to launch */}
          <div style={{width:'100%',paddingTop:32,borderTop:'1px solid rgba(255,255,255,0.08)'}}>
            <p style={{fontSize:10,letterSpacing:5,textTransform:'uppercase',color:'#814D2D',margin:'0 0 20px',fontWeight:700,textAlign:'center',fontFamily:"'Aoboshi One',sans-serif"}}>
              {lang==='fr'?'Disponible dans':'Available in'}
            </p>
            <div style={{display:'flex',gap:0,justifyContent:'center'}}>
              {[
                {n:String(timeLeft.d).padStart(2,'0'), l:lang==='fr'?'Jours':'Days'},
                {n:String(timeLeft.h).padStart(2,'0'), l:lang==='fr'?'Heures':'Hours'},
                {n:String(timeLeft.m).padStart(2,'0'), l:lang==='fr'?'Min':'Min'},
                {n:String(timeLeft.s).padStart(2,'0'), l:lang==='fr'?'Sec':'Sec'},
              ].map((u,i)=>(
                <div key={u.l} style={{display:'flex',alignItems:'stretch'}}>
                  <div style={{textAlign:'center',padding:'0 20px'}}>
                    <p style={{fontFamily:"'Joti One',cursive",fontSize:'clamp(32px,4vw,52px)',color:'#814D2D',margin:0,lineHeight:1,minWidth:60}}>{u.n}</p>
                    <p style={{fontSize:10,letterSpacing:3,textTransform:'uppercase',color:'#FFFFFF',margin:'8px 0 0',fontWeight:700,fontFamily:"'Aoboshi One',sans-serif"}}>{u.l}</p>
                  </div>
                  {i<3 && <span style={{fontFamily:"'Joti One',cursive",fontSize:'clamp(28px,3.5vw,44px)',color:'#814D2D',alignSelf:'flex-start',paddingTop:2,opacity:0.6}}>:</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE 2 */}
      <Marquee reverse bg="#814D2D" items={[
        {text:T.word1},{text:'·',accent:true},{text:T.word2},{text:'·',accent:true},
        {text:T.word3},{text:'·',accent:true},{text:T.word4},{text:'·',accent:true},
      ]} />

      {/* NEWSLETTER */}
      <section className="sec-newsletter" style={{background:'#000000',padding:'130px 80px',textAlign:'center'}}>
        <div className="fade-in">
          <p style={{fontSize:12,letterSpacing:5,textTransform:'uppercase',color:'#814D2D',margin:'0 0 24px',fontWeight:700,fontFamily:"'Aoboshi One',sans-serif"}}>{T.stayConnected}</p>
          <h2 style={{fontFamily:"'Joti One',cursive",fontSize:'clamp(34px,3.8vw,58px)',color:'#FFFFFF',margin:'0 0 20px',lineHeight:1.1}}>{T.newsletterTitle}</h2>
          <p style={{color:'#FFFFFF',fontSize:15,fontWeight:400,maxWidth:360,margin:'0 auto 52px',lineHeight:1.8,fontFamily:"'Aoboshi One',sans-serif"}}>{T.newsletterDesc}</p>
          <div className="newsletter-form">
            <input type="email" placeholder={T.emailPlaceholder} style={{flex:1,border:'1.5px solid rgba(255,255,255,0.15)',background:'transparent',color:'#FFFFFF',padding:'16px 22px',fontSize:13,fontWeight:400,letterSpacing:1,borderRight:'none',fontFamily:"'Aoboshi One',sans-serif"}} />
            <button className="btn-ol btn-ol-ac" style={{whiteSpace:'nowrap',borderLeft:'none'}}>{T.subscribe} →</button>
          </div>
        </div>
      </section>
    </>
  );
}
