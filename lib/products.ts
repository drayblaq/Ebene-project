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
  badgeEn?: string;
  sizes: string[];
  dark: boolean;
  bg: string;
  image: string;
  imageBack?: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: 'Polo Ébène',
    nameEn: 'Ébène Polo',
    mat: 'Coton premium 100%',
    matEn: '100% Premium Cotton',
    desc: 'Notre première pièce signature, un polo structuré aux couleurs de la terre, orné du motif Ébène. Disponible en précommande.',
    descEn: 'Our first signature piece, a structured polo in earth tones, adorned with the Ébène motif. Available for pre-order.',
    cat: 'shirts',
    price: 0,
    badge: 'PRÉCOMMANDE',
    badgeEn: 'PRE-ORDER',
    sizes: ['S', 'M', 'L', 'XL'],
    dark: false,
    bg: '#FFFFFF',
    image: '/images/cloth1.png',
    imageBack: '/images/cloth2.png',
  },
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
