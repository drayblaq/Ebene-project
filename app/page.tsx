'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
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

  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.08 });
    document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="sec-hero" style={{minHeight:'100vh',background:'#F7F3EE',display:'grid',gridTemplateColumns:'1fr 1fr',position:'relative',overflow:'hidden'}}>
        <div className="sec-hero-text" style={{display:'flex',flexDirection:'column',justifyContent:'center',padding:'160px 64px 100px 80px',position:'relative',zIndex:2}}>
          <p style={{fontSize:12,letterSpacing:6,textTransform:'uppercase',color:'#C4763A',margin:'0 0 36px',fontWeight:700}}>{T.heroSub}</p>
          <h1 style={{fontFamily:"'Kablammo',system-ui",fontSize:'clamp(80px,9vw,152px)',lineHeight:0.95,margin:'0 0 40px',fontWeight:400,letterSpacing:-3}}>Ébène</h1>
          <p style={{fontFamily:"'DM Serif Display',serif",fontSize:'clamp(18px,1.7vw,26px)',fontStyle:'italic',color:'#7a6e65',maxWidth:340,lineHeight:1.55,margin:'0 0 52px',textWrap:'pretty'} as React.CSSProperties}>{T.heroTagline}</p>
          <div style={{display:'flex',gap:20,alignItems:'center',flexWrap:'wrap'}}>
            <button onClick={()=>router.push('/collection')} className="btn-ol btn-ol-lt">{T.heroCta} →</button>
            <span style={{fontSize:11,letterSpacing:3,textTransform:'uppercase',color:'#0E0B08',fontWeight:700,cursor:'pointer'}}>{T.heroStory}</span>
          </div>
        </div>
        <div className="sec-hero-img" style={{display:'flex',alignItems:'flex-end',justifyContent:'center',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',width:480,height:480,border:'1px solid rgba(196,118,58,0.18)',borderRadius:'50%',top:'50%',left:'50%',transform:'translate(-50%,-55%)'}}/>
          <div style={{position:'absolute',width:330,height:330,border:'1px solid rgba(196,118,58,0.1)',borderRadius:'50%',top:'50%',left:'50%',transform:'translate(-50%,-55%)'}}/>
          <Image src="/images/ebene.png" alt="Ébène" width={500} height={600} className="animate-float" style={{width:'90%',maxWidth:500,position:'relative',zIndex:2,mixBlendMode:'multiply',marginBottom:-60,objectFit:'contain'}} priority />
          <div style={{position:'absolute',bottom:100,right:48,width:96,height:96}} className="animate-spin-text">
            <svg viewBox="0 0 100 100" width="96" height="96">
              <defs><path id="cp" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"/></defs>
              <text style={{fontSize:9,fontFamily:"'Jost',sans-serif",letterSpacing:2.5,fill:'#C4763A',fontWeight:400}}><textPath href="#cp">ÉBÈNE · COTONOU BÉNIN · 2026 · </textPath></text>
            </svg>
          </div>
        </div>
        <div className="sec-hero-scroll" style={{position:'absolute',bottom:36,left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:10}}>
          <span style={{fontSize:11,letterSpacing:5,textTransform:'uppercase',color:'#0E0B08',fontWeight:700}}>{T.scroll}</span>
          <div style={{width:1,height:44,background:'linear-gradient(to bottom,#bbb,transparent)'}}/>
        </div>
      </section>

      {/* MARQUEE 1 */}
      <Marquee items={[
        {text:'Ébène'},{text:T.nouvelleCollection,accent:true},
        {text:'Ébène'},{text:'Cotonou, Bénin',accent:true},
        {text:'Ébène'},{text:T.faitAvecAme,accent:true},
      ]} />

      {/* FEATURED PRODUCTS */}
      <section className="sec-feat" style={{padding:'130px 80px 80px',background:'#F7F3EE'}}>
        <div className="fade-in" style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:16}}>
          <div>
            <p style={{fontSize:12,letterSpacing:5,textTransform:'uppercase',color:'#C4763A',margin:'0 0 18px',fontWeight:700}}>{T.sectionFeatured}</p>
            <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:'clamp(38px,4.5vw,68px)',margin:0,lineHeight:1.05}}>{T.featuredTitle}</h2>
          </div>
          <button onClick={()=>router.push('/collection')} className="btn-ol btn-ol-lt">{T.seeAll} →</button>
        </div>
        <p style={{fontSize:11,letterSpacing:3,textTransform:'uppercase',color:'#0E0B08',fontWeight:700,textAlign:'center',marginBottom:48}}>{T.rotateHint}</p>
        <div style={{display:'flex',gap:36,overflowX:'auto',paddingBottom:24,alignItems:'flex-start',scrollbarWidth:'none'}}>
          {products.slice(0,4).map((p,i)=>(
            <ProductCard key={p.id} product={p} lang={lang} onAdd={addToCart} offsetTop={offsets[i%4]} />
          ))}
        </div>
      </section>

      {/* STORY */}
      <section className="sec-story" style={{background:'#0E0B08',padding:'140px 80px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:100,alignItems:'center'}}>
        <div className="fade-in">
          <p style={{fontSize:12,letterSpacing:5,textTransform:'uppercase',color:'#C4763A',margin:'0 0 32px',fontWeight:700}}>{T.storySection}</p>
          <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:'clamp(38px,3.8vw,60px)',color:'#F7F3EE',margin:'0 0 36px',lineHeight:1.1}}>{T.storyTitleLine1}<br/><em>{T.storyTitleLine2}</em></h2>
          <p style={{color:'rgba(247,243,238,0.55)',fontSize:16,lineHeight:1.95,fontWeight:300,margin:'0 0 22px',maxWidth:440,textWrap:'pretty'} as React.CSSProperties}>{T.storyP1}</p>
          <p style={{color:'rgba(247,243,238,0.55)',fontSize:16,lineHeight:1.95,fontWeight:300,margin:'0 0 52px',maxWidth:440,textWrap:'pretty'} as React.CSSProperties}>{T.storyP2}</p>
          <button onClick={()=>router.push('/contact')} className="btn-ol btn-ol-dk">{T.meetUs} →</button>
        </div>
        <div className="fade-in d2 sec-story-img" style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
          <div style={{position:'relative',width:'100%',display:'flex',justifyContent:'center',paddingBottom:60}}>
            <Image src="/images/Tag.png" alt="" width={240} height={320} style={{width:'55%',maxWidth:240,filter:'drop-shadow(0 24px 64px rgba(0,0,0,0.6))',zIndex:2,position:'relative',objectFit:'contain'}} />
            <Image src="/images/tag.png" alt="" width={165} height={220} className="animate-tag-swing" style={{width:'38%',maxWidth:165,position:'absolute',bottom:-30,right:'8%',filter:'drop-shadow(0 16px 40px rgba(0,0,0,0.5)) invert(1)',transform:'rotate(10deg)',zIndex:1,objectFit:'contain'}} />
          </div>
          <div style={{display:'flex',gap:52,paddingTop:32,borderTop:'1px solid rgba(255,255,255,0.08)',width:'100%',justifyContent:'center'}}>
            {[{n:'24',l:T.pieces},{n:'3',l:T.matieres},{n:'1',l:T.vision}].map(s=>(
              <div key={s.n} style={{textAlign:'center'}}>
                <p style={{fontFamily:"'Kablammo',system-ui",fontSize:44,color:'#C4763A',margin:0,lineHeight:1}}>{s.n}</p>
                <p style={{fontSize:11,letterSpacing:4,textTransform:'uppercase',color:'#F7F3EE',margin:'10px 0 0',fontWeight:700}}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE 2 */}
      <Marquee reverse bg="#C4763A" items={[
        {text:T.word1},{text:'·',accent:true},{text:T.word2},{text:'·',accent:true},
        {text:T.word3},{text:'·',accent:true},{text:T.word4},{text:'·',accent:true},
      ]} />

      {/* NEWSLETTER */}
      <section className="sec-newsletter" style={{background:'#1A1410',padding:'130px 80px',textAlign:'center'}}>
        <div className="fade-in">
          <p style={{fontSize:12,letterSpacing:5,textTransform:'uppercase',color:'#C4763A',margin:'0 0 24px',fontWeight:700}}>{T.stayConnected}</p>
          <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:'clamp(34px,3.8vw,58px)',color:'#F7F3EE',margin:'0 0 20px',lineHeight:1.1}}>{T.newsletterTitle}</h2>
          <p style={{color:'rgba(247,243,238,0.6)',fontSize:15,fontWeight:300,maxWidth:360,margin:'0 auto 52px',lineHeight:1.8}}>{T.newsletterDesc}</p>
          <div className="newsletter-form">
            <input type="email" placeholder={T.emailPlaceholder} style={{flex:1,border:'1.5px solid rgba(247,243,238,0.15)',background:'transparent',color:'#F7F3EE',padding:'16px 22px',fontSize:13,fontWeight:400,letterSpacing:1,borderRight:'none',fontFamily:"'Jost',sans-serif"}} />
            <button className="btn-ol btn-ol-ac" style={{whiteSpace:'nowrap',borderLeft:'none'}}>{T.subscribe} →</button>
          </div>
        </div>
      </section>
    </>
  );
}
