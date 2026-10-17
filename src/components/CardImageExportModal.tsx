import React, { useRef, useState, useEffect } from 'react';
import { AICardMessage } from '../types/gift';
import {
  X,
  Download,
  Copy,
  Check,
  Sparkles,
  Palette,
  Type,
  Share2
} from 'lucide-react';

interface CardImageExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: AICardMessage | null;
  recipientName: string;
  occasion: string;
  giftDetails?: string;
}

type CardTheme = 'cream' | 'rose' | 'sage' | 'navy';

interface ThemeConfig {
  id: CardTheme;
  name: string;
  bgGradient: [string, string];
  innerBorder: string;
  accentBorder: string;
  primaryText: string;
  secondaryText: string;
  accentColor: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  swatchBg: string;
}

const THEMES: ThemeConfig[] = [
  {
    id: 'cream',
    name: 'Giấy Mộc Cổ Điển',
    bgGradient: ['#FAF6F0', '#F3ECE1'],
    innerBorder: '#D9C8B4',
    accentBorder: '#B89772',
    primaryText: '#2B241F',
    secondaryText: '#7A6B5D',
    accentColor: '#9C6F44',
    badgeBg: '#EFE6D8',
    badgeBorder: '#D4C0A8',
    badgeText: '#634931',
    swatchBg: '#F3ECE1',
  },
  {
    id: 'rose',
    name: 'Hồng Pastel Lãng Mạn',
    bgGradient: ['#FFF6F7', '#FCEBED'],
    innerBorder: '#F2CAD1',
    accentBorder: '#D98293',
    primaryText: '#3B2228',
    secondaryText: '#825963',
    accentColor: '#C44D66',
    badgeBg: '#FCE1E6',
    badgeBorder: '#F2BAC5',
    badgeText: '#7A2C3D',
    swatchBg: '#FCEBED',
  },
  {
    id: 'sage',
    name: 'Xanh Xô Thơm Bình Yên',
    bgGradient: ['#F5F8F5', '#E9F0E9'],
    innerBorder: '#C8D9C8',
    accentBorder: '#789978',
    primaryText: '#1F2E22',
    secondaryText: '#59705E',
    accentColor: '#4E7D56',
    badgeBg: '#DFEADE',
    badgeBorder: '#BDD2BC',
    badgeText: '#36533C',
    swatchBg: '#E9F0E9',
  },
  {
    id: 'navy',
    name: 'Đêm Trăng Hoàng Gia',
    bgGradient: ['#0F172A', '#1E293B'],
    innerBorder: '#334155',
    accentBorder: '#F59E0B',
    primaryText: '#F8FAFC',
    secondaryText: '#94A3B8',
    accentColor: '#FBBF24',
    badgeBg: '#1E293B',
    badgeBorder: '#475569',
    badgeText: '#FDE68A',
    swatchBg: '#0F172A',
  },
];

export const CardImageExportModal: React.FC<CardImageExportModalProps> = ({
  isOpen,
  onClose,
  card,
  recipientName,
  occasion,
  giftDetails,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<CardTheme>('cream');
  const [signOff, setSignOff] = useState('Thương mến gửi trao');
  const [dateStr, setDateStr] = useState(() => {
    const now = new Date();
    return `Ngày ${now.getDate()} tháng ${now.getMonth() + 1} năm ${now.getFullYear()}`;
  });
  const [fontSizeRatio, setFontSizeRatio] = useState<'normal' | 'large' | 'compact'>('normal');
  const [previewDataUrl, setPreviewDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [isRendering, setIsRendering] = useState(false);

  // Render canvas whenever inputs change
  useEffect(() => {
    if (!isOpen || !card) return;

    setIsRendering(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Dimensions: 800 x 1050 (4:5.25 ideal portrait for phone screens & messaging)
    const width = 800;
    const height = 1050;
    canvas.width = width;
    canvas.height = height;

    const theme = THEMES.find((t) => t.id === selectedTheme) || THEMES[0];

    // 1. Draw Background Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, theme.bgGradient[0]);
    bgGrad.addColorStop(1, theme.bgGradient[1]);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Subtle grain texture simulation with soft noise
    for (let i = 0; i < 1500; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      ctx.fillStyle = selectedTheme === 'navy' ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.012)';
      ctx.fillRect(rx, ry, 2, 2);
    }

    // 2. Draw Outer Border & Inner Filigree Frame
    const outerMargin = 32;
    const innerMargin = 42;

    ctx.strokeStyle = theme.innerBorder;
    ctx.lineWidth = 1;
    ctx.strokeRect(outerMargin, outerMargin, width - outerMargin * 2, height - outerMargin * 2);

    ctx.strokeStyle = theme.accentBorder;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(innerMargin, innerMargin, width - innerMargin * 2, height - innerMargin * 2);

    // Decorative corner flourishes
    const cornerSize = 14;
    const drawCorner = (cx: number, cy: number, dx: number, dy: number) => {
      ctx.beginPath();
      ctx.moveTo(cx, cy + dy * cornerSize);
      ctx.lineTo(cx, cy);
      ctx.lineTo(cx + dx * cornerSize, cy);
      ctx.strokeStyle = theme.accentColor;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // little dot
      ctx.beginPath();
      ctx.arc(cx + dx * 6, cy + dy * 6, 2, 0, Math.PI * 2);
      ctx.fillStyle = theme.accentColor;
      ctx.fill();
    };

    drawCorner(innerMargin, innerMargin, 1, 1);
    drawCorner(width - innerMargin, innerMargin, -1, 1);
    drawCorner(innerMargin, height - innerMargin, 1, -1);
    drawCorner(width - innerMargin, height - innerMargin, -1, -1);

    // 3. Header Motif & Brand
    ctx.textAlign = 'center';
    ctx.fillStyle = theme.accentColor;
    ctx.font = '600 12px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.fillText('✦   T Â M   Ý   ✦', width / 2, 90);

    // Occasion Title
    ctx.font = '700 14px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.fillStyle = theme.secondaryText;
    const occUpper = (occasion || 'KỶ NIỆM ĐẶC BIỆT').toUpperCase();
    ctx.fillText(occUpper, width / 2, 118);

    // Hairline divider under header
    ctx.beginPath();
    ctx.moveTo(width / 2 - 80, 134);
    ctx.lineTo(width / 2 + 80, 134);
    ctx.strokeStyle = theme.innerBorder;
    ctx.lineWidth = 1;
    ctx.stroke();

    // 4. Salutation (To: ...)
    const recText = `Gửi ${recipientName || 'Người thương'},`;
    ctx.textAlign = 'left';
    ctx.font = 'italic 700 24px "Playfair Display", Georgia, serif';
    ctx.fillStyle = theme.primaryText;
    ctx.fillText(recText, 85, 185);

    // 5. Message Body
    // Determine font size based on text length and selection
    const message = card.message;
    let baseFontSize = 19;
    let lineHeight = 33;

    if (fontSizeRatio === 'large') {
      baseFontSize = 21;
      lineHeight = 36;
    } else if (fontSizeRatio === 'compact' || message.length > 400) {
      baseFontSize = 17;
      lineHeight = 29;
    }

    ctx.font = `italic 400 ${baseFontSize}px "Playfair Display", Georgia, serif`;
    ctx.fillStyle = theme.primaryText;

    // Word wrapping
    const maxWidth = width - 170; // left 85, right 85
    let startY = 230;

    const paragraphs = message.split('\n');
    for (const para of paragraphs) {
      if (!para.trim()) {
        startY += lineHeight * 0.6;
        continue;
      }
      const words = para.split(' ');
      let line = '';

      for (let n = 0; n < words.length; n++) {
        const testLine = line + (line ? ' ' : '') + words[n];
        const testWidth = ctx.measureText(testLine).width;
        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line, 85, startY);
          line = words[n];
          startY += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 85, startY);
      startY += lineHeight;
    }

    // 6. Gift Badge (if gift details provided)
    if (giftDetails && giftDetails.trim()) {
      const badgeY = Math.max(startY + 25, 750);
      const badgeH = 50;
      const badgeW = width - 170;
      const badgeX = 85;

      // Rounded rect background for gift
      ctx.fillStyle = theme.badgeBg;
      ctx.strokeStyle = theme.badgeBorder;
      ctx.lineWidth = 1;

      const r = 10;
      ctx.beginPath();
      ctx.moveTo(badgeX + r, badgeY);
      ctx.lineTo(badgeX + badgeW - r, badgeY);
      ctx.quadraticCurveTo(badgeX + badgeW, badgeY, badgeX + badgeW, badgeY + r);
      ctx.lineTo(badgeX + badgeW, badgeY + badgeH - r);
      ctx.quadraticCurveTo(badgeX + badgeW, badgeY + badgeH, badgeX + badgeW - r, badgeY + badgeH);
      ctx.lineTo(badgeX + r, badgeY + badgeH);
      ctx.quadraticCurveTo(badgeX, badgeY + badgeH, badgeX, badgeY + badgeH - r);
      ctx.lineTo(badgeX, badgeY + r);
      ctx.quadraticCurveTo(badgeX, badgeY, badgeX + r, badgeY);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Gift text
      ctx.font = '600 13px "Plus Jakarta Sans", system-ui, sans-serif';
      ctx.fillStyle = theme.badgeText;
      ctx.textAlign = 'left';

      // Truncate if too long for the badge
      let giftText = `🎁 Món quà gửi kèm: ${giftDetails.trim()}`;
      if (ctx.measureText(giftText).width > badgeW - 30) {
        while (ctx.measureText(giftText + '...').width > badgeW - 30 && giftText.length > 20) {
          giftText = giftText.slice(0, -1);
        }
        giftText += '...';
      }
      ctx.fillText(giftText, badgeX + 16, badgeY + 30);
    }

    // 7. Sign-off and Footer Seal
    const footerY = 880;

    // Right-aligned Sign-off
    ctx.textAlign = 'right';
    ctx.font = 'italic 600 18px "Playfair Display", Georgia, serif';
    ctx.fillStyle = theme.primaryText;
    ctx.fillText(signOff, width - 85, footerY);

    ctx.font = '400 12px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.fillStyle = theme.secondaryText;
    ctx.fillText(dateStr, width - 85, footerY + 24);

    // Bottom Decorative Bar
    ctx.textAlign = 'center';
    ctx.font = '500 11px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.fillStyle = theme.secondaryText;
    ctx.fillText('TÂM Ý · TRAO TRỌN TẤM LÒNG', width / 2, height - 60);

    // Update preview
    setPreviewDataUrl(canvas.toDataURL('image/png'));
    setIsRendering(false);
  }, [isOpen, card, recipientName, occasion, giftDetails, selectedTheme, signOff, dateStr, fontSizeRatio]);

  if (!isOpen || !card) return null;

  const handleDownloadPNG = () => {
    if (!previewDataUrl) return;
    const link = document.createElement('a');
    const safeName = (recipientName || 'nguoi-thuong')
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');
    link.download = `thiep-chuc-mung-${safeName}.png`;
    link.href = previewDataUrl;
    link.click();
  };

  const handleCopyImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          await navigator.clipboard.write([
            new ClipboardItem({
              'image/png': blob,
            }),
          ]);
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        } catch (e) {
          // Fallback if ClipboardItem image copy fails in some browsers
          handleDownloadPNG();
        }
      }, 'image/png');
    } catch {
      handleDownloadPNG();
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-stone-900/75 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl max-h-[95vh] bg-white rounded-2xl border border-stone-200 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50 shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <div>
              <h2 className="font-serif text-lg font-bold text-stone-900">
                Xuất Thiệp Chúc Mừng Thành Hình Ảnh (PNG)
              </h2>
              <p className="text-xs text-stone-500">
                Lưu ảnh chất lượng cao để gửi qua tin nhắn Zalo, Messenger hoặc in ra thiệp giấy
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: 2-column preview and customization */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 min-h-0 overflow-y-auto">
          {/* Left Column: Visual Preview */}
          <div className="md:col-span-7 p-6 bg-stone-100 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-stone-200 overflow-y-auto">
            <div className="w-full max-w-sm rounded-xl overflow-hidden shadow-lg border border-stone-300 bg-white">
              {previewDataUrl ? (
                <img
                  src={previewDataUrl}
                  alt="Xem trước thiệp chúc mừng"
                  className="w-full h-auto block"
                />
              ) : (
                <div className="aspect-4/5 w-full flex items-center justify-center text-xs text-stone-400">
                  Đang vẽ thiệp nghệ thuật...
                </div>
              )}
            </div>
            <p className="text-[11px] text-stone-500 mt-2 text-center">
              Định dạng PNG chất lượng cao (800 x 1050 px) · Sắc nét khi xem trên điện thoại
            </p>

            {/* Hidden canvas for drawing */}
            <canvas ref={canvasRef} className="hidden" />
          </div>

          {/* Right Column: Customization Controls */}
          <div className="md:col-span-5 p-6 flex flex-col justify-between space-y-6 overflow-y-auto bg-white">
            <div className="space-y-5">
              {/* Theme Picker */}
              <div>
                <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-stone-500" />
                  <span>Phong cách thiết kế thiệp:</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {THEMES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTheme(t.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                        selectedTheme === t.id
                          ? 'border-stone-900 bg-stone-50 shadow-xs ring-1 ring-stone-900'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <span
                        className="w-6 h-6 rounded-full border border-stone-300 shrink-0"
                        style={{ backgroundColor: t.swatchBg }}
                      />
                      <span className="text-xs font-semibold text-stone-800 line-clamp-1">
                        {t.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Size Adjustment */}
              <div>
                <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                  <Type className="w-4 h-4 text-stone-500" />
                  <span>Kích thước chữ:</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setFontSizeRatio('compact')}
                    className={`py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                      fontSizeRatio === 'compact'
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    Nhỏ gọn
                  </button>
                  <button
                    onClick={() => setFontSizeRatio('normal')}
                    className={`py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                      fontSizeRatio === 'normal'
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    Tiêu chuẩn
                  </button>
                  <button
                    onClick={() => setFontSizeRatio('large')}
                    className={`py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                      fontSizeRatio === 'large'
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    Lớn & Rõ
                  </button>
                </div>
              </div>

              {/* Custom Sign-off */}
              <div>
                <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-1">
                  Lời kết & Ký tên người gửi:
                </label>
                <input
                  type="text"
                  value={signOff}
                  onChange={(e) => setSignOff(e.target.value)}
                  placeholder="VD: Người thương của em, Bạn thân của mày, Con yêu..."
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-hidden"
                />
              </div>

              {/* Custom Date Line */}
              <div>
                <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-1">
                  Dòng ngày tháng:
                </label>
                <input
                  type="text"
                  value={dateStr}
                  onChange={(e) => setDateStr(e.target.value)}
                  placeholder="VD: Mùa đông 2026, Ngày 14 tháng 11..."
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-stone-100 space-y-2">
              <button
                onClick={handleDownloadPNG}
                disabled={isRendering || !previewDataUrl}
                className="w-full py-2.5 px-4 text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-all cursor-pointer inline-flex items-center justify-center gap-2 shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Tải ảnh thiệp PNG về máy</span>
              </button>

              <button
                onClick={handleCopyImage}
                disabled={isRendering || !previewDataUrl}
                className="w-full py-2 px-4 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-xl transition-all cursor-pointer inline-flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">Đã sao chép ảnh vào Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-stone-500" />
                    <span>Sao chép ảnh (Dán trực tiếp vào tin nhắn)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
