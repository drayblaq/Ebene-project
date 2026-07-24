'use client';
import Image from 'next/image';

/**
 * Both PNGs are 420×594 portrait (ratio 0.707), transparent background.
 * Wordmark: "ÉBÈNE" text occupies ~30% of image height, centred vertically.
 * Container-clip technique reveals only the text band, making it appear wide.
 */

interface Props {
  iconHeight?: number;
  dark?: boolean;
  iconOnly?: boolean;
  wordmarkContainerWidth?: number; // explicit override for hero scale
}

export default function LogoLockup({
  iconHeight = 36,
  dark = false,
  iconOnly = false,
  wordmarkContainerWidth,
}: Props) {
  const filter = dark ? 'invert(1)' : undefined;
  const iconW = Math.round(iconHeight * 0.707);

  // Default wordmark container: wide enough that text fills it at readable size
  const wmarkW = wordmarkContainerWidth ?? Math.round(iconHeight * 2.8);
  // Container height: clip to the text band (~30% of scaled image height)
  // When cover fills wmarkW: scaled_h = wmarkW * (594/420) = wmarkW * 1.414
  // text_band = 30% of scaled_h → set container_h ≈ text_band + 10% breathing
  const wmarkH = Math.round(wmarkW * 1.414 * 0.32);

  const gap = Math.max(8, Math.round(iconHeight * 0.14));

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap }}>
      <Image
        src="/images/icon-black-v2.png"
        alt=""
        width={iconW}
        height={iconHeight}
        style={{ height: iconHeight, width: iconW, objectFit: 'contain', filter, display: 'block', flexShrink: 0 }}
        priority
      />
      {!iconOnly && (
        <div style={{ position: 'relative', width: wmarkW, height: wmarkH, overflow: 'hidden', flexShrink: 0 }}>
          <Image
            src="/images/wordmark-black-v2.png"
            alt="Ébène"
            fill
            style={{ objectFit: 'cover', objectPosition: '50% 50%', filter }}
            priority
          />
        </div>
      )}
    </div>
  );
}
