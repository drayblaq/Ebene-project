'use client';
import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rx = window.innerWidth/2, ry = window.innerHeight/2;
    let mx = rx, my = ry;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (dot.current) { dot.current.style.left = mx+'px'; dot.current.style.top = my+'px'; }
    };
    document.addEventListener('mousemove', onMove);

    let raf: number;
    const anim = () => {
      rx += (mx - rx) * 0.11; ry += (my - ry) * 0.11;
      if (ring.current) { ring.current.style.left = rx+'px'; ring.current.style.top = ry+'px'; }
      raf = requestAnimationFrame(anim);
    };
    raf = requestAnimationFrame(anim);

    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element).closest('a,button,input,textarea,.card-scene');
      if (dot.current && ring.current) {
        if (el) {
          dot.current.style.width='44px'; dot.current.style.height='44px';
          dot.current.style.background='rgba(129,77,45,0.2)';
          ring.current.style.width='4px'; ring.current.style.height='4px';
        } else {
          dot.current.style.width='10px'; dot.current.style.height='10px';
          dot.current.style.background='#814D2D';
          ring.current.style.width='32px'; ring.current.style.height='32px';
        }
      }
    };
    document.addEventListener('mouseover', onOver);
    return () => { document.removeEventListener('mousemove',onMove); document.removeEventListener('mouseover',onOver); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={dot} style={{position:'fixed',top:0,left:0,width:10,height:10,background:'#814D2D',borderRadius:'50%',pointerEvents:'none',zIndex:9999,transform:'translate(-50%,-50%)',transition:'width 0.2s,height 0.2s,background 0.2s'}} />
      <div ref={ring} style={{position:'fixed',top:0,left:0,width:32,height:32,border:'1.5px solid rgba(0,0,0,0.2)',borderRadius:'50%',pointerEvents:'none',zIndex:9998,transform:'translate(-50%,-50%)',transition:'width 0.35s,height 0.35s'}} />
    </>
  );
}
