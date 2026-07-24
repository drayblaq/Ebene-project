'use client';
interface MarqueeItem { text?: string; accent?: boolean; image?: string; invert?: boolean; }
interface MarqueeProps { items: MarqueeItem[]; reverse?: boolean; bg?: string; }

/*
 * Icon PNG (420×594): emblem content at x=106-315, y=125-443 (209×318px).
 * To show emblem at ~32px tall: scale = 32/318 = 0.1006 → img = 42×60px.
 * We render the full PNG at that size; transparent frame means only the emblem shows.
 */
export default function Marquee({ items, reverse, bg='#000000' }: MarqueeProps) {
  const doubled = [...items,...items];
  const isBrown = bg === '#814D2D';
  return (
    <div style={{background:bg,overflow:'hidden',padding:'18px 0',borderTop:!isBrown?'1px solid rgba(129,77,45,0.15)':'none'}}>
      <div className={reverse?'animate-marquee-rev':'animate-marquee'} style={{display:'flex',whiteSpace:'nowrap',width:'max-content',alignItems:'center'}}>
        {doubled.map((item,i)=>(
          item.image ? (
            <span key={i} style={{padding:'0 32px',display:'inline-flex',alignItems:'center'}}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt="" style={{height:60,width:'auto',display:'block',filter:item.invert?'invert(1)':undefined}} />
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
