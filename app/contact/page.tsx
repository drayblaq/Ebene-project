'use client';
import { useApp } from '@/context/AppContext';
import { tr } from '@/lib/translations';

export default function Contact() {
  const { lang } = useApp();
  const T = tr[lang];

  return (
    <section className="sec-contact" style={{minHeight:'100vh',background:'#F7F3EE',padding:'140px 80px 80px'}}>
      <div className="contact-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:100}}>
        <div>
          <p style={{fontSize:12,letterSpacing:5,textTransform:'uppercase',color:'#C4763A',margin:'0 0 24px',fontWeight:700}}>{T.contactLabel}</p>
          <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:'clamp(44px,5vw,80px)',margin:'0 0 60px',lineHeight:1.05}}>{T.contactTitle}</h1>
          <div style={{display:'flex',flexDirection:'column',gap:36}}>
            {[
              {label:T.addressLabel, val:'Cotonou, Bénin\nRépublique du Bénin'},
              {label:'WhatsApp', val:'+229 00 00 00 00'},
              {label:'Email', val:'hello@ebene-brand.com'},
            ].map(({label,val})=>(
              <div key={label}>
                <p style={{fontSize:12,letterSpacing:3,textTransform:'uppercase',color:'#C4763A',margin:'0 0 10px',fontWeight:700}}>{label}</p>
                <p style={{fontSize:17,fontWeight:400,margin:0,lineHeight:1.7,color:'#0E0B08',whiteSpace:'pre-line'}}>{val}</p>
              </div>
            ))}
            <div>
              <p style={{fontSize:12,letterSpacing:3,textTransform:'uppercase',color:'#C4763A',margin:'0 0 14px',fontWeight:700}}>{T.social}</p>
              <div style={{display:'flex',gap:24}}>
                {['Instagram','TikTok','Pinterest'].map(s=><a key={s} href="#" className="nav-lnk" style={{fontSize:12,letterSpacing:2,textTransform:'uppercase',fontWeight:500}}>{s}</a>)}
              </div>
            </div>
          </div>
        </div>
        <div>
          <form style={{display:'flex',flexDirection:'column',gap:28}} onSubmit={e=>e.preventDefault()}>
            {[{label:T.nameLabel,type:'text'},{label:'Email',type:'email'}].map(({label,type})=>(
              <div key={label}>
                <label style={{fontSize:12,letterSpacing:3,textTransform:'uppercase',display:'block',marginBottom:10,color:'#0E0B08',fontWeight:700}}>{label}</label>
                <input type={type} style={{width:'100%',border:'none',borderBottom:'1.5px solid #e0dbd5',padding:'12px 0',fontSize:16,fontWeight:400,background:'transparent',color:'#0E0B08',fontFamily:"'Jost',sans-serif"}} />
              </div>
            ))}
            <div>
              <label style={{fontSize:12,letterSpacing:3,textTransform:'uppercase',display:'block',marginBottom:10,color:'#0E0B08',fontWeight:700}}>{T.messageLabel}</label>
              <textarea rows={5} style={{width:'100%',border:'none',borderBottom:'1.5px solid #e0dbd5',padding:'12px 0',fontSize:16,fontWeight:400,background:'transparent',color:'#0E0B08',resize:'none',fontFamily:"'Jost',sans-serif"}} />
            </div>
            <button type="submit" className="btn-ol btn-ol-lt" style={{alignSelf:'flex-start',marginTop:8}}>{T.send} →</button>
          </form>
        </div>
      </div>
    </section>
  );
}
