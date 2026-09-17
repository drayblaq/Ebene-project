import type { CSSProperties } from 'react';

export const DEV_WHATSAPP_URL = 'https://wa.me/2290169747161';
export const DEV_EMAIL_URL = 'mailto:alabidamilare98@gmail.com';

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.85.5 3.58 1.373 5.07L2 22l5.06-1.33A9.94 9.94 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.94 7.94 0 01-4.06-1.11l-.29-.17-3.01.79.8-2.93-.19-.3A7.93 7.93 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z"/>
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2"/>
      <path d="M3 7l9 6 9-6"/>
    </svg>
  );
}

type DevContactLinksProps = {
  variant: 'icon' | 'label';
  color: string;
};

export default function DevContactLinks({ variant, color }: DevContactLinksProps) {
  const linkStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: variant === 'label' ? 6 : 0,
    minWidth: 44,
    minHeight: 44,
    padding: variant === 'label' ? '0 8px' : 0,
    color,
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontWeight: 700,
    fontFamily: "'Aoboshi One',sans-serif",
  };

  return (
    <>
      <a href={DEV_WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="nav-lnk" style={linkStyle}>
        <WhatsAppIcon />
        {variant === 'label' && 'WhatsApp'}
      </a>
      <a href={DEV_EMAIL_URL} aria-label="Email" className="nav-lnk" style={linkStyle}>
        <EmailIcon />
        {variant === 'label' && 'Email'}
      </a>
    </>
  );
}
