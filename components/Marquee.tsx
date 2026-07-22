'use client';
interface MarqueeProps { items: {text:string;accent?:boolean}[]; reverse?:boolean; bg?:string; }
export default function Marquee({ items, reverse, bg='#0E0B08' }: MarqueeProps) {
  const doubled = [...items,...items];
  return (
    <div style={{background:bg,overflow:'hidden',padding:'18px 0',borderTop:bg==='#0E0B08'?'1px solid rgba(196,118,58,0.15)':'none'}}>
      <div className={reverse?'animate-marquee-rev':'animate-marquee'} style={{display:'flex',whiteSpace:'nowrap',width:'max-content'}}>
        {doubled.map((item,i)=>(
          <span key={i} style={item.accent
            ?{fontSize:10,letterSpacing:6,color:bg==='#C4763A'?'rgba(247,243,238,0.8)':'#C4763A',textTransform:'uppercase',padding:'0 32px',display:'inline-flex',alignItems:'center',fontWeight:500}
            :bg==='#C4763A'
              ?{fontFamily:"'DM Serif Display',serif",fontSize:22,fontStyle:'italic',color:'#F7F3EE',padding:'0 48px',opacity:0.7}
              :{fontFamily:"'Kablammo',system-ui",fontSize:30,color:'#F7F3EE',padding:'0 48px'}
          }>{item.text}</span>
        ))}
      </div>
    </div>
  );
}
