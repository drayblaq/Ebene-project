'use client';
import Image from 'next/image';
interface MarqueeItem { text?: string; accent?: boolean; image?: string; }
interface MarqueeProps { items: MarqueeItem[]; reverse?: boolean; bg?: string; }
export default function Marquee({ items, reverse, bg='#000000' }: MarqueeProps) {
  const doubled = [...items,...items];
  const isBrown = bg === '#814D2D';
  return (
    <div style={{background:bg,overflow:'hidden',padding:'18px 0',borderTop:!isBrown?'1px solid rgba(129,77,45,0.15)':'none'}}>
      <div className={reverse?'animate-marquee-rev':'animate-marquee'} style={{display:'flex',whiteSpace:'nowrap',width:'max-content',alignItems:'center'}}>
        {doubled.map((item,i)=>(
          item.image ? (
            <span key={i} style={{padding:'0 40px',display:'inline-flex',alignItems:'center'}}>
              <Image src={item.image} alt="" width={28} height={28} style={{objectFit:'contain',height:28,width:'auto'}} />
            </span>
          ) : item.accent ? (
            <span key={i} style={{fontSize:10,letterSpacing:6,color:isBrown?'rgba(255,255,255,0.8)':'#814D2D',textTransform:'uppercase',padding:'0 32px',display:'inline-flex',alignItems:'center',fontWeight:500}}>
              {item.text}
            </span>
          ) : (
            <span key={i} style={isBrown
              ?{fontFamily:"'Joti One',cursive",fontSize:22,fontStyle:'italic',color:'#FFFFFF',padding:'0 48px',opacity:0.7}
              :{fontFamily:"'Joti One',cursive",fontSize:30,color:'#FFFFFF',padding:'0 48px'}
            }>{item.text}</span>
          )
        ))}
      </div>
    </div>
  );
}
