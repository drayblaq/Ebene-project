'use client';
import { useApp } from '@/context/AppContext';
import { tr } from '@/lib/translations';

export default function Contact() {
  const { lang } = useApp();
  const T = tr[lang];

  return (
    <section className="sec-contact" style={{minHeight:'100vh',background:'#FFFFFF',padding:'140px 80px 80px'}}>
      <div className="contact-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:100}}>
        <div>
          <p style={{fontSize:12,letterSpacing:5,textTransform:'uppercase',color:'#814D2D',margin:'0 0 24px',fontWeight:700,fontFamily:"'Aoboshi One',sans-serif"}}>{T.contactLabel}</p>
          <h1 style={{fontFamily:"'Joti One',cursive",fontSize:'clamp(44px,5vw,80px)',margin:'0 0 60px',lineHeight:1.05}}>{T.contactTitle}</h1>
          <div style={{display:'flex',flexDirection:'column',gap:36}}>
            {[
              {label:T.addressLabel, val:'Cotonou, Bénin\nRépublique du Bénin'},
              {label:'WhatsApp', val:'+229 00 00 00 00'},
              {label:'Email', val:'hello@ebene-brand.com'},
            ].map(({label,val})=>(
              <div key={label}>
                <p style={{fontSize:12,letterSpacing:3,textTransform:'uppercase',color:'#814D2D',margin:'0 0 10px',fontWeight:700,fontFamily:"'Aoboshi One',sans-serif"}}>{label}</p>
                <p style={{fontSize:17,fontWeight:400,margin:0,lineHeight:1.7,color:'#000000',whiteSpace:'pre-line',fontFamily:"'Aoboshi One',sans-serif"}}>{val}</p>
              </div>
            ))}
            <div>
              <p style={{fontSize:12,letterSpacing:3,textTransform:'uppercase',color:'#814D2D',margin:'0 0 14px',fontWeight:700,fontFamily:"'Aoboshi One',sans-serif"}}>{T.social}</p>
              <div style={{display:'flex',gap:24}}>
                {['Instagram','TikTok'].map(s=><a key={s} href="#" className="nav-lnk" style={{fontSize:12,letterSpacing:2,textTransform:'uppercase',fontWeight:700,fontFamily:"'Aoboshi One',sans-serif"}}>{s}</a>)}
              </div>
            </div>
          </div>
        </div>
        <div>
          <form style={{display:'flex',flexDirection:'column',gap:28}} onSubmit={e=>e.preventDefault()}>
            {[{label:T.nameLabel,type:'text'},{label:'Email',type:'email'}].map(({label,type})=>(
              <div key={label}>
                <label style={{fontSize:12,letterSpacing:3,textTransform:'uppercase',display:'block',marginBottom:10,color:'#000000',fontWeight:700,fontFamily:"'Aoboshi One',sans-serif"}}>{label}</label>
                <input type={type} style={{width:'100%',border:'none',borderBottom:'1.5px solid rgba(0,0,0,0.15)',padding:'12px 0',fontSize:16,fontWeight:400,background:'transparent',color:'#000000',fontFamily:"'Aoboshi One',sans-serif"}} />
              </div>
            ))}
            <div>
              <label style={{fontSize:12,letterSpacing:3,textTransform:'uppercase',display:'block',marginBottom:10,color:'#000000',fontWeight:700,fontFamily:"'Aoboshi One',sans-serif"}}>{T.messageLabel}</label>
              <textarea rows={5} style={{width:'100%',border:'none',borderBottom:'1.5px solid rgba(0,0,0,0.15)',padding:'12px 0',fontSize:16,fontWeight:400,background:'transparent',color:'#000000',resize:'none',fontFamily:"'Aoboshi One',sans-serif"}} />
            </div>
            <button type="submit" className="btn-ol btn-ol-lt" style={{alignSelf:'flex-start',marginTop:8}}>{T.send} →</button>
          </form>
        </div>
      </div>
    </section>
  );
}
