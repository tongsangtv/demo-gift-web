import { CardExportData, CardThemeConfig, CardThemeId } from '../types/cardExport';

export const CARD_THEMES: Record<CardThemeId, CardThemeConfig> = {
  ivory_blossom: {
    id: 'ivory_blossom',
    name: 'Hoa & Thảo Mộc',
    description: 'Tone kem trang nhã, viền vàng kim cổ điển và hoa văn tinh tế',
    bgGradient: ['#FFFDF9', '#F4ECE1'],
    borderColor: '#C2A379',
    innerBorderColor: '#DECBB1',
    accentColor: '#9C6949',
    textColor: '#292524',
    subTextColor: '#78716C',
    quoteColor: '#B45309',
    sealColor: '#991B1B',
    badgeBg: '#F5EBE1',
    badgeText: '#78350F',
    previewColor: '#F5EBE1',
  },
  vintage_kraft: {
    id: 'vintage_kraft',
    name: 'Giấy Kraft Cổ Điển',
    description: 'Phong cách thiệp bưu chính hoài niệm, màu giấy mộc ấm áp',
    bgGradient: ['#EFE3D3', '#E0CEB7'],
    borderColor: '#6B4423',
    innerBorderColor: '#9E7755',
    accentColor: '#78350F',
    textColor: '#321D12',
    subTextColor: '#573D2C',
    quoteColor: '#854D0E',
    sealColor: '#7C2D12',
    badgeBg: '#DCC3A7',
    badgeText: '#431407',
    previewColor: '#DFCEB7',
  },
  midnight_elegance: {
    id: 'midnight_elegance',
    name: 'Dạ Nguyệt Tinh Tế',
    description: 'Sắc xanh đêm huyền bí, họa tiết ánh sao và viền ánh kim lấp lánh',
    bgGradient: ['#090E1D', '#111C38'],
    borderColor: '#F59E0B',
    innerBorderColor: '#D97706',
    accentColor: '#FBBF24',
    textColor: '#F8FAFC',
    subTextColor: '#94A3B8',
    quoteColor: '#FCD34D',
    sealColor: '#D97706',
    badgeBg: '#1E293B',
    badgeText: '#FDE68A',
    previewColor: '#0F172A',
  },
  sage_botanical: {
    id: 'sage_botanical',
    name: 'Thảo Mộc Bình Yên',
    description: 'Sắc xanh xô thơm tự nhiên, dịu mắt, cành lá nhẹ nhàng',
    bgGradient: ['#F3F7F2', '#DFE9DE'],
    borderColor: '#4A6B53',
    innerBorderColor: '#8CAE95',
    accentColor: '#2D6A4F',
    textColor: '#1A2E20',
    subTextColor: '#4B6353',
    quoteColor: '#166534',
    sealColor: '#14532D',
    badgeBg: '#D1E0D1',
    badgeText: '#14532D',
    previewColor: '#D9E6D8',
  },
  pastel_romance: {
    id: 'pastel_romance',
    name: 'Lãng Mạn Ngọt Ngào',
    description: 'Tone hồng pastel phớt ấm, hoa văn trái tim và viền vàng hồng',
    bgGradient: ['#FFF1F3', '#FCE7EB'],
    borderColor: '#E11D48',
    innerBorderColor: '#FDA4AF',
    accentColor: '#BE123C',
    textColor: '#4C0519',
    subTextColor: '#881337',
    quoteColor: '#E11D48',
    sealColor: '#9F1239',
    badgeBg: '#FFE4E6',
    badgeText: '#9F1239',
    previewColor: '#FCE7EB',
  },
};

/**
 * Get canvas dimensions according to aspect ratio
 */
export function getCanvasDimensions(ratio: CardExportData['aspectRatio']) {
  switch (ratio) {
    case 'story':
      // 9:14 high resolution - optimized for viewing on phones & messaging apps
      return { width: 1080, height: 1620, scale: 2 };
    case 'postcard':
      // 4:3 landscape greeting postcard
      return { width: 1200, height: 900, scale: 2 };
    case 'square':
      // 1:1 square gift card
      return { width: 1080, height: 1080, scale: 2 };
    default:
      return { width: 1080, height: 1620, scale: 2 };
  }
}

/**
 * Helper to wrap text into lines fitting within maxWidth
 */
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const paragraphs = text.split('\n');
  const allLines: string[] = [];

  for (const para of paragraphs) {
    if (para.trim() === '') {
      allLines.push('');
      continue;
    }
    const words = para.split(/\s+/);
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const testLine = currentLine + ' ' + words[i];
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth) {
        allLines.push(currentLine);
        currentLine = words[i];
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      allLines.push(currentLine);
    }
  }

  return allLines;
}

/**
 * Draw corner flourishes on canvas
 */
function drawCornerOrnaments(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string,
  theme: CardThemeId
) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 1.5;

  const size = 32;
  const corners = [
    { cx: x, cy: y, sx: 1, sy: 1 },
    { cx: x + w, cy: y, sx: -1, sy: 1 },
    { cx: x, cy: y + h, sx: 1, sy: -1 },
    { cx: x + w, cy: y + h, sx: -1, sy: -1 },
  ];

  for (const { cx, cy, sx, sy } of corners) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(sx, sy);

    if (theme === 'pastel_romance') {
      // Little heart in corner
      ctx.beginPath();
      ctx.moveTo(16, 12);
      ctx.bezierCurveTo(16, 8, 12, 6, 8, 6);
      ctx.bezierCurveTo(4, 6, 4, 11, 4, 11);
      ctx.bezierCurveTo(4, 16, 12, 22, 16, 26);
      ctx.bezierCurveTo(20, 22, 28, 16, 28, 11);
      ctx.bezierCurveTo(28, 11, 28, 6, 24, 6);
      ctx.bezierCurveTo(20, 6, 16, 8, 16, 12);
      ctx.fill();
    } else if (theme === 'sage_botanical') {
      // Botanical leaf sprig
      ctx.beginPath();
      ctx.moveTo(6, 6);
      ctx.quadraticCurveTo(24, 6, 24, 24);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(14, 10, 6, 3, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(10, 14, 6, 3, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
    } else if (theme === 'midnight_elegance') {
      // Diamond star sparkle
      ctx.beginPath();
      ctx.moveTo(14, 4);
      ctx.quadraticCurveTo(14, 14, 24, 14);
      ctx.quadraticCurveTo(14, 14, 14, 24);
      ctx.quadraticCurveTo(14, 14, 4, 14);
      ctx.quadraticCurveTo(14, 14, 14, 4);
      ctx.fill();
    } else {
      // Classic corner flourish
      ctx.beginPath();
      ctx.moveTo(4, 24);
      ctx.lineTo(4, 12);
      ctx.arcTo(4, 4, 12, 4, 8);
      ctx.lineTo(24, 4);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(8, 8, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  ctx.restore();
}

/**
 * Draw wax seal stamp
 */
function drawWaxSeal(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  sealColor: string,
  isDarkTheme: boolean
) {
  ctx.save();
  ctx.translate(cx, cy);

  // Outer scalloped wax edge
  ctx.fillStyle = sealColor;
  ctx.beginPath();
  const petals = 24;
  for (let i = 0; i < petals * 2; i++) {
    const angle = (i * Math.PI) / petals;
    const r = i % 2 === 0 ? radius : radius - 3.5;
    const px = Math.cos(angle) * r;
    const py = Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetY = 4;
  ctx.fill();
  ctx.shadowColor = 'transparent';

  // Inner ring
  ctx.strokeStyle = isDarkTheme ? '#FEF08A' : 'rgba(255, 255, 255, 0.65)';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.arc(0, 0, radius - 8, 0, Math.PI * 2);
  ctx.stroke();

  // Subtle second dotted ring
  ctx.setLineDash([2, 3]);
  ctx.beginPath();
  ctx.arc(0, 0, radius - 12, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  // Center Monogram / Heart / Seal Text
  ctx.fillStyle = isDarkTheme ? '#FEF08A' : 'rgba(255, 255, 255, 0.9)';
  ctx.font = 'bold 15px "Playfair Display", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('TÂM Ý', 0, -4);

  ctx.font = 'bold 8px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '1px';
  ctx.fillText('WITH LOVE', 0, 10);

  ctx.restore();
}

/**
 * Render complete card onto HTML5 Canvas
 */
export async function renderCardToCanvas(
  canvas: HTMLCanvasElement,
  data: CardExportData
): Promise<void> {
  const { width, height } = getCanvasDimensions(data.aspectRatio);
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const themeConfig = CARD_THEMES[data.theme] || CARD_THEMES.ivory_blossom;
  const isDark = data.theme === 'midnight_elegance';

  // 1. Draw Background Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, themeConfig.bgGradient[0]);
  bgGrad.addColorStop(1, themeConfig.bgGradient[1]);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle paper texture effect (fine stipples)
  ctx.save();
  ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.015)';
  const step = 8;
  for (let x = 0; x < width; x += step) {
    for (let y = 0; y < height; y += step) {
      if ((x + y) % (step * 3) === 0) {
        ctx.fillRect(x, y, 1.5, 1.5);
      }
    }
  }
  ctx.restore();

  // 2. Decorative Double Outer Border
  const pad = data.aspectRatio === 'postcard' ? 36 : 48;
  const bw = width - pad * 2;
  const bh = height - pad * 2;

  // Outer primary border
  ctx.save();
  ctx.strokeStyle = themeConfig.borderColor;
  ctx.lineWidth = 3;
  ctx.strokeRect(pad, pad, bw, bh);

  // Inner thin border with corner margin
  const innerPad = 12;
  ctx.strokeStyle = themeConfig.innerBorderColor;
  ctx.lineWidth = 1;
  ctx.strokeRect(pad + innerPad, pad + innerPad, bw - innerPad * 2, bh - innerPad * 2);

  // Corner Ornaments
  drawCornerOrnaments(
    ctx,
    pad + innerPad,
    pad + innerPad,
    bw - innerPad * 2,
    bh - innerPad * 2,
    themeConfig.borderColor,
    data.theme
  );
  ctx.restore();

  // 3. Top Occasion Badge / Header
  const contentPadX = pad + 40;
  const contentWidth = width - contentPadX * 2;
  let cursorY = pad + 44;

  // Small Top brand mark
  ctx.save();
  ctx.textAlign = 'center';
  ctx.font = '600 12px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = themeConfig.accentColor;
  ctx.letterSpacing = '3px';
  ctx.fillText('— TÂM Ý · TRAO GỬI CHÂN THÀNH —', width / 2, cursorY);
  ctx.restore();

  cursorY += 28;

  // Occasion Pill Badge
  if (data.occasion) {
    ctx.save();
    ctx.font = 'bold 13px "Plus Jakarta Sans", sans-serif';
    const occText = data.occasion.toUpperCase();
    const metrics = ctx.measureText(occText);
    const badgeW = metrics.width + 36;
    const badgeH = 28;
    const badgeX = (width - badgeW) / 2;
    const badgeY = cursorY;

    // Badge background
    ctx.fillStyle = themeConfig.badgeBg;
    ctx.beginPath();
    ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 14);
    ctx.fill();

    // Badge border
    ctx.strokeStyle = themeConfig.borderColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 14);
    ctx.stroke();

    // Badge text
    ctx.fillStyle = themeConfig.badgeText;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(occText, width / 2, badgeY + badgeH / 2);
    ctx.restore();

    cursorY += badgeH + 24;
  } else {
    cursorY += 16;
  }

  // 4. Salutation / Recipient Name
  const recipient = data.recipientName.trim() || 'Người thương';
  ctx.save();
  ctx.textAlign = 'left';

  if (data.fontStyle === 'handwriting') {
    ctx.font = 'bold 36px "Caveat", cursive';
  } else if (data.fontStyle === 'modern') {
    ctx.font = '700 26px "Plus Jakarta Sans", sans-serif';
  } else {
    // Serif
    ctx.font = 'italic bold 30px "Playfair Display", Georgia, serif';
  }

  ctx.fillStyle = themeConfig.textColor;
  const salutation = `Thân gửi ${recipient},`;
  ctx.fillText(salutation, contentPadX, cursorY);
  ctx.restore();

  cursorY += 28;

  // Thin decorative underline under salutation
  ctx.save();
  ctx.strokeStyle = themeConfig.innerBorderColor;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(contentPadX, cursorY);
  ctx.lineTo(contentPadX + 160, cursorY);
  ctx.stroke();
  ctx.restore();

  cursorY += 28;

  // 5. Message Body
  ctx.save();
  let bodyFontSize = 18;
  let bodyLineHeight = 32;

  if (data.aspectRatio === 'postcard') {
    bodyFontSize = 17;
    bodyLineHeight = 30;
  } else if (data.aspectRatio === 'story') {
    bodyFontSize = 20;
    bodyLineHeight = 36;
  } else {
    bodyFontSize = 18;
    bodyLineHeight = 32;
  }

  if (data.fontStyle === 'handwriting') {
    ctx.font = `600 ${bodyFontSize + 6}px "Caveat", cursive`;
    bodyLineHeight += 4;
  } else if (data.fontStyle === 'modern') {
    ctx.font = `500 ${bodyFontSize}px "Plus Jakarta Sans", sans-serif`;
  } else {
    ctx.font = `italic ${bodyFontSize}px "Playfair Display", Georgia, serif`;
  }

  ctx.fillStyle = themeConfig.textColor;
  ctx.textAlign = 'left';

  // Draw opening quotation mark accent
  ctx.save();
  ctx.font = 'bold 44px "Playfair Display", serif';
  ctx.fillStyle = themeConfig.quoteColor;
  ctx.globalAlpha = 0.45;
  ctx.fillText('“', contentPadX - 10, cursorY + 6);
  ctx.restore();

  const lines = wrapText(ctx, data.message, contentWidth);
  for (const line of lines) {
    if (line === '') {
      cursorY += bodyLineHeight * 0.6;
    } else {
      ctx.fillText(line, contentPadX, cursorY);
      cursorY += bodyLineHeight;
    }
  }

  // Closing quotation mark
  ctx.save();
  ctx.font = 'bold 44px "Playfair Display", serif';
  ctx.fillStyle = themeConfig.quoteColor;
  ctx.globalAlpha = 0.45;
  ctx.fillText('”', contentPadX + contentWidth - 20, cursorY - bodyLineHeight * 0.4);
  ctx.restore();

  ctx.restore();

  cursorY += 20;

  // 6. Gift Details Banner (Optional / Included)
  if (data.showGiftBadge && data.giftTitle) {
    ctx.save();
    const giftBoxY = cursorY;
    const giftBoxH = 46;

    ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.03)';
    ctx.beginPath();
    ctx.roundRect(contentPadX, giftBoxY, contentWidth, giftBoxH, 10);
    ctx.fill();

    ctx.strokeStyle = themeConfig.innerBorderColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(contentPadX, giftBoxY, contentWidth, giftBoxH, 10);
    ctx.stroke();

    ctx.font = 'bold 13px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = themeConfig.accentColor;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('🎁 MÓN QUÀ GỬI KÈM:', contentPadX + 16, giftBoxY + giftBoxH / 2);

    ctx.font = '500 13px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = themeConfig.textColor;
    ctx.fillText(data.giftTitle, contentPadX + 170, giftBoxY + giftBoxH / 2);

    ctx.restore();

    cursorY += giftBoxH + 28;
  } else {
    cursorY += 16;
  }

  // 7. Signature & Date Section (Anchored towards bottom)
  const bottomSectionY = Math.max(cursorY, height - pad - (data.showWaxSeal ? 140 : 100));

  ctx.save();
  ctx.textAlign = 'right';

  // "Thương mến,"
  ctx.font = 'italic 16px "Playfair Display", serif';
  ctx.fillStyle = themeConfig.subTextColor;
  ctx.fillText('Thương mến,', width - contentPadX, bottomSectionY);

  // Sender Name
  const sender = data.senderName.trim() || 'Người gửi';
  if (data.fontStyle === 'handwriting') {
    ctx.font = 'bold 32px "Caveat", cursive';
  } else if (data.fontStyle === 'modern') {
    ctx.font = '700 20px "Plus Jakarta Sans", sans-serif';
  } else {
    ctx.font = 'italic bold 22px "Playfair Display", serif';
  }
  ctx.fillStyle = themeConfig.textColor;
  ctx.fillText(sender, width - contentPadX, bottomSectionY + 28);

  // Date
  if (data.dateString) {
    ctx.font = '500 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = themeConfig.subTextColor;
    ctx.fillText(data.dateString, width - contentPadX, bottomSectionY + 52);
  }
  ctx.restore();

  // 8. Wax Seal Stamp (drawn in bottom-left or centered)
  if (data.showWaxSeal) {
    const sealX = contentPadX + 54;
    const sealY = bottomSectionY + 20;
    drawWaxSeal(ctx, sealX, sealY, 38, themeConfig.sealColor, isDark);
  }

  // 9. Watermark at bottom edge
  if (data.showWatermark) {
    ctx.save();
    ctx.textAlign = 'center';
    ctx.font = '10px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = themeConfig.subTextColor;
    ctx.globalAlpha = 0.7;
    ctx.fillText('Tâm Ý · tamy.gift', width / 2, height - pad + 6);
    ctx.restore();
  }
}

/**
 * Trigger immediate browser download of the canvas as PNG
 */
export function downloadCardAsPNG(canvas: HTMLCanvasElement, filename: string): void {
  const link = document.createElement('a');
  link.download = filename.endsWith('.png') ? filename : `${filename}.png`;
  link.href = canvas.toDataURL('image/png');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Copy card image blob to clipboard (for pasting in Zalo, Messenger, etc.)
 */
export async function copyCardToClipboard(canvas: HTMLCanvasElement): Promise<boolean> {
  return new Promise((resolve) => {
    canvas.toBlob(async (blob) => {
      if (!blob) {
        resolve(false);
        return;
      }
      try {
        if (navigator.clipboard && 'write' in navigator.clipboard && window.ClipboardItem) {
          await navigator.clipboard.write([
            new ClipboardItem({
              'image/png': blob,
            }),
          ]);
          resolve(true);
        } else {
          resolve(false);
        }
      } catch (err) {
        console.warn('Clipboard write failed:', err);
        resolve(false);
      }
    }, 'image/png');
  });
}

/**
 * Share image via Web Share API (mobile devices, Zalo, Messenger app picker)
 */
export async function shareCardImage(
  canvas: HTMLCanvasElement,
  filename: string,
  title: string
): Promise<boolean> {
  return new Promise((resolve) => {
    canvas.toBlob(async (blob) => {
      if (!blob) {
        resolve(false);
        return;
      }
      try {
        const file = new File([blob], filename, { type: 'image/png' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: title || 'Thiệp mừng Tâm Ý',
            text: 'Thiệp chúc mừng ý nghĩa từ Tâm Ý',
          });
          resolve(true);
        } else {
          resolve(false);
        }
      } catch (err) {
        console.warn('Web Share API failed:', err);
        resolve(false);
      }
    }, 'image/png');
  });
}
