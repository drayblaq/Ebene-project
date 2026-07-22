export type Product = {
  id: number;
  name: string;
  nameEn: string;
  mat: string;
  matEn: string;
  desc: string;
  descEn: string;
  cat: 'shirts' | 'trousers' | 'caps' | 'dresses' | 'jackets';
  price: number;
  badge: string;
  sizes: string[];
  dark: boolean;
  bg: string;
  image: string;
};

export const products: Product[] = [
  { id:1,  name:'Chemise Ivoire',   nameEn:'Ivory Shirt',      mat:'Coton 100%',     matEn:'100% Cotton',      desc:'Coupe oversize, col classique, finitions soignées.',          descEn:'Oversized cut, classic collar, fine finishing.',          cat:'shirts',   price:62300,  badge:'NEW',      sizes:['S','M','L','XL'],      dark:false, bg:'#F9F6F2', image:'' },
  { id:2,  name:'Pantalon Teck',    nameEn:'Teak Trousers',    mat:'Lin naturel',    matEn:'Natural Linen',    desc:'Taille haute, jambes larges, deux poches plaquées.',           descEn:'High waist, wide legs, patch pockets.',                   cat:'trousers', price:95100,  badge:'',         sizes:['S','M','L','XL','XXL'],dark:true,  bg:'#1A1410', image:'' },
  { id:3,  name:'Casquette Ébène',  nameEn:'Ébène Cap',        mat:'Coton brossé',   matEn:'Brushed Cotton',   desc:'Logo Ébène brodé, réglable, unisexe.',                         descEn:'Embroidered Ébène logo, adjustable, unisex.',             cat:'caps',     price:36100,  badge:'BEST',     sizes:['Unique'],               dark:false, bg:'#F7F3EE', image:'' },
  { id:4,  name:'Robe Sable',       nameEn:'Sand Dress',       mat:'Lin naturel',    matEn:'Natural Linen',    desc:'Robe midi fluide, col V, bretelles réglables.',                descEn:'Fluid midi dress, V-neck, adjustable straps.',            cat:'dresses',  price:144300, badge:'BEST',     sizes:['S','M','L','XL'],      dark:true,  bg:'#1A1410', image:'' },
  { id:5,  name:'Top Corail',       nameEn:'Coral Top',        mat:'Soie naturelle', matEn:'Natural Silk',     desc:'Top ajusté à bretelles fines, drapé élégant.',                 descEn:'Fitted top with thin straps, elegant drape.',             cat:'shirts',   price:52500,  badge:'-15%',     sizes:['XS','S','M'],           dark:false, bg:'#FEF3EA', image:'' },
  { id:6,  name:'Veste Crème',      nameEn:'Cream Jacket',     mat:'Coton lourd',    matEn:'Heavy Cotton',     desc:'Veste oversize, col tailleur, deux boutons.',                  descEn:'Oversized jacket, tailor collar, two buttons.',           cat:'jackets',  price:118100, badge:'',         sizes:['S','M','L','XL'],      dark:false, bg:'#F9F6F2', image:'' },
  { id:7,  name:'Pantalon Ivoire',  nameEn:'Ivory Trousers',   mat:'Lin mélangé',    matEn:'Blended Linen',    desc:'Pantalon droit classique, taille élastiquée.',                 descEn:'Classic straight cut, elasticated waist.',                cat:'trousers', price:88600,  badge:'NEW',      sizes:['S','M','L'],            dark:false, bg:'#F9F6F2', image:'' },
  { id:8,  name:'Chemise Terre',    nameEn:'Earth Shirt',      mat:'Coton sergé',    matEn:'Twill Cotton',     desc:'Chemise longue, col mao, poignets boutonnés.',                 descEn:'Long shirt, mao collar, button cuffs.',                   cat:'shirts',   price:57700,  badge:'',         sizes:['S','M','L','XL'],      dark:true,  bg:'#1A1410', image:'' },
  { id:9,  name:'Manteau Ébène',    nameEn:'Ébène Coat',       mat:'Laine mélangée', matEn:'Blended Wool',     desc:'Manteau long ceinturé, intérieur satiné.',                     descEn:'Belted long coat, satin interior.',                       cat:'jackets',  price:223000, badge:'SOLD OUT',  sizes:['S','M','L'],            dark:false, bg:'#EEECE9', image:'' },
  { id:10, name:'Casquette Sahel',  nameEn:'Sahel Cap',        mat:'Raphia naturel', matEn:'Natural Raffia',   desc:'Casquette artisanale en raphia, bord structuré.',              descEn:'Handcrafted raffia cap, structured brim.',                cat:'caps',     price:31500,  badge:'',         sizes:['Unique'],               dark:false, bg:'#F0EBE3', image:'' },
  { id:11, name:'Robe Ébène',       nameEn:'Ébène Dress',      mat:'Jersey lourd',   matEn:'Heavy Jersey',     desc:'Robe longue structurée, col bateau, manches 3/4.',             descEn:'Structured long dress, boat neck, 3/4 sleeves.',          cat:'dresses',  price:173800, badge:'NEW',      sizes:['XS','S','M','L'],      dark:true,  bg:'#0E0B08', image:'' },
  { id:12, name:'Short Crème',      nameEn:'Cream Shorts',     mat:'Lin léger',      matEn:'Light Linen',      desc:'Short taille haute, pinces, coupe soignée.',                   descEn:'High-waist shorts, darts, tailored cut.',                 cat:'shirts',   price:49200,  badge:'',         sizes:['S','M','L','XL'],      dark:false, bg:'#FEF3EA', image:'' },
];

export function formatFCFA(price: number): string {
  return price.toLocaleString('fr-FR') + ' FCFA';
}

export function getCatLabel(cat: string, lang: 'fr' | 'en'): string {
  const m: Record<string, {fr:string,en:string}> = {
    shirts:{fr:'Chemises',en:'Shirts'}, trousers:{fr:'Pantalons',en:'Trousers'},
    caps:{fr:'Casquettes',en:'Caps'}, dresses:{fr:'Robes',en:'Dresses'}, jackets:{fr:'Vestes',en:'Jackets'}
  };
  return m[cat]?.[lang] ?? cat;
}
