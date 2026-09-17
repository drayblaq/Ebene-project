'use client';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { tr } from '@/lib/translations';
import DevContactLinks from '@/components/DevContactLinks';

export default function Contact() {
  const { lang } = useApp();
  const T = tr[lang];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return;
    setStatus('loading');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? '',
          subject: `New Ébène contact message from ${name.trim()}`,
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });
      const data = await res.json();
      setStatus(data.success ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  const successMsg = T.contactSuccess;
  const errorMsg = T.contactError;

  return (
    <section className="sec-contact" style={{minHeight:'100vh',background:'#FFFFFF',padding:'140px 80px 80px'}}>
      <div className="contact-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:100}}>
        <div>
          <p style={{fontSize:12,letterSpacing:5,textTransform:'uppercase',color:'#814D2D',margin:'0 0 24px',fontWeight:700,fontFamily:"'Aoboshi One',sans-serif"}}>{T.contactLabel}</p>
          <h1 style={{fontFamily:"'Joti One',cursive",fontSize:'clamp(44px,5vw,80px)',margin:'0 0 60px',lineHeight:1.05}}>{T.contactTitle}</h1>
          <div style={{display:'flex',flexDirection:'column',gap:36}}>
            {[
              {label:T.addressLabel, val:'Cotonou, Bénin\nRépublique du Bénin'},
              {label:'Email', val:'wearebene29@gmail.com'},
            ].map(({label,val})=>(
              <div key={label}>
                <p style={{fontSize:12,letterSpacing:3,textTransform:'uppercase',color:'#814D2D',margin:'0 0 10px',fontWeight:700,fontFamily:"'Aoboshi One',sans-serif"}}>{label}</p>
                <p style={{fontSize:17,fontWeight:400,margin:0,lineHeight:1.7,color:'#000000',whiteSpace:'pre-line',fontFamily:"'Aoboshi One',sans-serif"}}>{val}</p>
              </div>
            ))}
            <div>
              <p style={{fontSize:12,letterSpacing:3,textTransform:'uppercase',color:'#814D2D',margin:'0 0 14px',fontWeight:700,fontFamily:"'Aoboshi One',sans-serif"}}>{T.social}</p>
              <div style={{display:'flex',gap:24}}>
                <a href="https://www.instagram.com/_xwe.ebene" target="_blank" rel="noreferrer" className="nav-lnk" style={{fontSize:12,letterSpacing:2,textTransform:'uppercase',fontWeight:700,fontFamily:"'Aoboshi One',sans-serif"}}>Instagram</a>
              </div>
            </div>
            <div style={{marginTop:8,paddingTop:24,borderTop:'1px solid rgba(0,0,0,0.1)'}}>
              <p style={{fontSize:11,letterSpacing:3,textTransform:'uppercase',color:'#814D2D',margin:'0 0 12px',fontWeight:700,fontFamily:"'Aoboshi One',sans-serif"}}>{T.devSection}</p>
              <div style={{display:'flex',gap:8,marginLeft:-8}}>
                <DevContactLinks variant="label" color="#000000" />
              </div>
            </div>
          </div>
        </div>
        <div>
          {status === 'success' ? (
            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',height:'100%',minHeight:260}}>
              <p style={{fontSize:12,letterSpacing:4,textTransform:'uppercase',color:'#814D2D',fontWeight:700,fontFamily:"'Aoboshi One',sans-serif",margin:'0 0 16px'}}>✓</p>
              <p style={{fontFamily:"'Joti One',cursive",fontSize:'clamp(22px,2.5vw,34px)',color:'#000000',margin:0,lineHeight:1.2}}>{successMsg}</p>
            </div>
          ) : (
            <form style={{display:'flex',flexDirection:'column',gap:28}} onSubmit={handleSubmit} noValidate>
              <div>
                <label style={{fontSize:12,letterSpacing:3,textTransform:'uppercase',display:'block',marginBottom:10,color:'#000000',fontWeight:700,fontFamily:"'Aoboshi One',sans-serif"}}>{T.nameLabel}</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  disabled={status === 'loading'}
                  required
                  style={{width:'100%',border:'none',borderBottom:`1.5px solid ${!name.trim()&&status==='error'?'#cc4444':'rgba(0,0,0,0.15)'}`,padding:'12px 0',fontSize:16,fontWeight:400,background:'transparent',color:'#000000',fontFamily:"'Aoboshi One',sans-serif"}}
                />
              </div>
              <div>
                <label style={{fontSize:12,letterSpacing:3,textTransform:'uppercase',display:'block',marginBottom:10,color:'#000000',fontWeight:700,fontFamily:"'Aoboshi One',sans-serif"}}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                  required
                  style={{width:'100%',border:'none',borderBottom:`1.5px solid ${!email.trim()&&status==='error'?'#cc4444':'rgba(0,0,0,0.15)'}`,padding:'12px 0',fontSize:16,fontWeight:400,background:'transparent',color:'#000000',fontFamily:"'Aoboshi One',sans-serif"}}
                />
              </div>
              <div>
                <label style={{fontSize:12,letterSpacing:3,textTransform:'uppercase',display:'block',marginBottom:10,color:'#000000',fontWeight:700,fontFamily:"'Aoboshi One',sans-serif"}}>{T.messageLabel}</label>
                <textarea
                  rows={5}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  disabled={status === 'loading'}
                  required
                  style={{width:'100%',border:'none',borderBottom:`1.5px solid ${!message.trim()&&status==='error'?'#cc4444':'rgba(0,0,0,0.15)'}`,padding:'12px 0',fontSize:16,fontWeight:400,background:'transparent',color:'#000000',resize:'none',fontFamily:"'Aoboshi One',sans-serif"}}
                />
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:10,alignItems:'flex-start'}}>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-ol btn-ol-lt"
                  style={{marginTop:8,opacity:status==='loading'?0.6:1}}
                >
                  {status === 'loading' ? '…' : `${T.send} →`}
                </button>
                {status === 'error' && (
                  <p style={{fontSize:12,color:'#cc4444',fontWeight:700,letterSpacing:1,fontFamily:"'Aoboshi One',sans-serif",margin:0}}>{errorMsg}</p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
