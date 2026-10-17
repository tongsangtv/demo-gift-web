import React, { useState, useEffect, useRef } from 'react';
import {
  CardExportData,
  CardThemeId,
  CardAspectRatio,
  CardFontStyle,
} from '../types/cardExport';
import {
  CARD_THEMES,
  renderCardToCanvas,
  downloadCardAsPNG,
  copyCardToClipboard,
  shareCardImage,
  getCanvasDimensions,
} from '../utils/cardCanvasRenderer';
import {
  X,
  Download,
  Copy,
  Check,
  Share2,
  Sparkles,
  Smartphone,
  CreditCard,
  Square,
  Type,
  Palette,
  Eye,
  Gift,
  Feather,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';

interface CardExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMessage: string;
  recipientName: string;
  occasion: string;
  giftTitle?: string;
  styleName?: string;
}

export const CardExportModal: React.FC<CardExportModalProps> = ({
  isOpen,
  onClose,
  initialMessage,
  recipientName,
  occasion,
  giftTitle,
  styleName,
}) => {
  // Current date formatted in Vietnamese
  const getTodayVietnamese = () => {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    return `Ngày ${day}/${month}/${year}`;
  };

  // State
  const [theme, setTheme] = useState<CardThemeId>(() => {
    if (styleName?.includes('Hài hước')) return 'vintage_kraft';
    if (styleName?.includes('Tinh tế') || styleName?.includes('Trang trọng')) return 'midnight_elegance';
    if (styleName?.includes('Lãng mạn')) return 'pastel_romance';
    return 'ivory_blossom';
  });

  const [aspectRatio, setAspectRatio] = useState<CardAspectRatio>('story');
  const [fontStyle, setFontStyle] = useState<CardFontStyle>('serif');
  const [recipient, setRecipient] = useState(recipientName || 'Người thương');
  const [sender, setSender] = useState('Từ người thương');
  const [occ, setOcc] = useState(occasion || 'Kỷ niệm đặc biệt');
  const [message, setMessage] = useState(initialMessage || '');
  const [gift, setGift] = useState(giftTitle || '');
  const [showGiftBadge, setShowGiftBadge] = useState(Boolean(giftTitle));
  const [showWaxSeal, setShowWaxSeal] = useState(true);
  const [dateString, setDateString] = useState(getTodayVietnamese());

  const [isRendering, setIsRendering] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sync props when modal opens
  useEffect(() => {
    if (isOpen) {
      setMessage(initialMessage || '');
      setRecipient(recipientName || 'Người thương');
      setOcc(occasion || 'Kỷ niệm đặc biệt');
      setGift(giftTitle || '');
      setShowGiftBadge(Boolean(giftTitle));
      setDateString(getTodayVietnamese());

      if (styleName?.includes('Hài hước')) setTheme('vintage_kraft');
      else if (styleName?.includes('Tinh tế') || styleName?.includes('Trang trọng')) setTheme('midnight_elegance');
      else if (styleName?.includes('Lãng mạn')) setTheme('pastel_romance');
      else setTheme('ivory_blossom');
    }
  }, [isOpen, initialMessage, recipientName, occasion, giftTitle, styleName]);

  // Re-render canvas whenever export data changes
  useEffect(() => {
    if (!isOpen) return;

    let isSubscribed = true;
    setIsRendering(true);

    const exportData: CardExportData = {
      recipientName: recipient,
      senderName: sender,
      occasion: occ,
      message,
      giftTitle: gift,
      dateString,
      theme,
      aspectRatio,
      fontStyle,
      showWaxSeal,
      showGiftBadge,
      showWatermark: true,
    };

    // Ensure custom fonts are loaded before painting canvas
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (!isSubscribed) return;
        if (canvasRef.current) {
          renderCardToCanvas(canvasRef.current, exportData).then(() => {
            if (isSubscribed) setIsRendering(false);
          });
        }
      });
    } else {
      if (canvasRef.current) {
        renderCardToCanvas(canvasRef.current, exportData).then(() => {
          if (isSubscribed) setIsRendering(false);
        });
      }
    }

    return () => {
      isSubscribed = false;
    };
  }, [
    isOpen,
    recipient,
    sender,
    occ,
    message,
    gift,
    dateString,
    theme,
    aspectRatio,
    fontStyle,
    showWaxSeal,
    showGiftBadge,
  ]);

  if (!isOpen) return null;

  // Sanitize filename for download
  const generateFilename = () => {
    const cleanRec = recipient.replace(/[^a-zA-Z0-9\u00C0-\u024F\u1EA0-\u1EF9]/g, '_').slice(0, 20);
    const cleanOcc = occ.replace(/[^a-zA-Z0-9\u00C0-\u024F\u1EA0-\u1EF9]/g, '_').slice(0, 20);
    return `Thiep_${cleanRec}_${cleanOcc}.png`;
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    setIsDownloading(true);
    const filename = generateFilename();
    downloadCardAsPNG(canvasRef.current, filename);
    setTimeout(() => setIsDownloading(false), 800);
  };

  const handleCopy = async () => {
    if (!canvasRef.current) return;
    setCopyFeedback(null);
    const success = await copyCardToClipboard(canvasRef.current);
    if (success) {
      setIsCopied(true);
      setCopyFeedback('Đã sao chép ảnh thiệp! Bạn có thể dán (Ctrl+V) trực tiếp vào ô chat Zalo / Messenger.');
      setTimeout(() => {
        setIsCopied(false);
        setCopyFeedback(null);
      }, 4000);
    } else {
      // Fallback: download instead if clipboard permission is denied
      handleDownload();
      setCopyFeedback('Trình duyệt không hỗ trợ dán ảnh trực tiếp. Thiệp PNG đã được tải tự động về máy của bạn!');
      setTimeout(() => setCopyFeedback(null), 5000);
    }
  };

  const handleShare = async () => {
    if (!canvasRef.current) return;
    const filename = generateFilename();
    const success = await shareCardImage(canvasRef.current, filename, `Thiệp gửi ${recipient} - ${occ}`);
    if (success) {
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 3000);
    } else {
      // Fallback to clipboard or download
      handleCopy();
    }
  };

  const canShare = typeof navigator !== 'undefined' && typeof navigator.canShare === 'function';

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-2 sm:p-4 bg-stone-950/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-5xl max-h-[94vh] bg-white rounded-2xl border border-stone-200 shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-stone-200 bg-stone-50 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
                <span>Xuất Thiệp Chúc Mừng Thành Ảnh (PNG)</span>
                <span className="text-[11px] font-sans font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Chuẩn gửi tin nhắn
                </span>
              </h2>
              <p className="text-xs text-stone-500">
                Tải ảnh chất lượng cao hoặc sao chép để gửi ngay qua Zalo, Messenger, Instagram Story
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

        {/* Modal Body: 2 Columns */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 min-h-0">
          {/* Left Column: Visual Card Preview */}
          <div className="lg:col-span-7 bg-stone-900/5 p-4 sm:p-6 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-stone-200 overflow-y-auto">
            <div className="w-full flex items-center justify-between mb-3 text-xs text-stone-600 font-medium">
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-stone-500" />
                <span>Xem trước thiệp thực tế ({CARD_THEMES[theme]?.name})</span>
              </span>
              <span className="text-[11px] text-stone-500 font-mono">
                {aspectRatio === 'story'
                  ? 'Khổ dọc 9:14 (Tin nhắn/Story)'
                  : aspectRatio === 'postcard'
                  ? 'Bưu thiếp 4:3'
                  : 'Khổ vuông 1:1'}
              </span>
            </div>

            {/* Canvas Container with Shadow and Aspect Ratio */}
            <div className="relative w-full flex items-center justify-center p-2">
              <div
                className={`relative transition-all duration-200 rounded-xl overflow-hidden shadow-xl ring-1 ring-black/10 bg-white ${
                  aspectRatio === 'story'
                    ? 'max-w-[340px] sm:max-w-[380px] aspect-[9/13.5]'
                    : aspectRatio === 'postcard'
                    ? 'max-w-[460px] aspect-[4/3]'
                    : 'max-w-[380px] aspect-square'
                }`}
              >
                <canvas
                  ref={canvasRef}
                  className="w-full h-full object-contain block"
                />

                {isRendering && (
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-2xs flex items-center justify-center">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-stone-900 text-white rounded-full text-xs shadow-md">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-300" />
                      <span>Đang vẽ thiệp...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <p className="mt-3 text-[11px] text-stone-500 text-center">
              💡 Ảnh PNG xuất ra đạt độ phân giải siêu nét (Retina 2x), sẵn sàng lưu về điện thoại hoặc gửi bạn bè.
            </p>
          </div>

          {/* Right Column: Customization Controls */}
          <div className="lg:col-span-5 p-5 sm:p-6 space-y-5 overflow-y-auto bg-white">
            {/* 1. Theme Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2.5 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-amber-600" />
                <span>1. Chọn phong cách thiệp:</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(Object.keys(CARD_THEMES) as CardThemeId[]).map((tId) => {
                  const t = CARD_THEMES[tId];
                  const isSelected = theme === tId;
                  return (
                    <button
                      key={tId}
                      type="button"
                      onClick={() => setTheme(tId)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                        isSelected
                          ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                          : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800'
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full shrink-0 border border-white/30 shadow-2xs"
                        style={{ backgroundColor: t.previewColor }}
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-semibold truncate">{t.name}</div>
                        <div
                          className={`text-[10px] truncate ${
                            isSelected ? 'text-stone-300' : 'text-stone-500'
                          }`}
                        >
                          {tId === 'ivory_blossom' && 'Trang nhã & Cổ điển'}
                          {tId === 'vintage_kraft' && 'Ấm áp hoài niệm'}
                          {tId === 'midnight_elegance' && 'Sang trọng huyền bí'}
                          {tId === 'sage_botanical' && 'Tự nhiên thanh mát'}
                          {tId === 'pastel_romance' && 'Ngọt ngào lãng mạn'}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Format / Aspect Ratio */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2 flex items-center gap-1.5">
                <span>2. Khổ thiệp xuất ảnh:</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setAspectRatio('story')}
                  className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                    aspectRatio === 'story'
                      ? 'border-stone-900 bg-stone-900 text-white font-semibold shadow-xs'
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span className="text-[11px]">Dọc tin nhắn</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAspectRatio('postcard')}
                  className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                    aspectRatio === 'postcard'
                      ? 'border-stone-900 bg-stone-900 text-white font-semibold shadow-xs'
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span className="text-[11px]">Bưu thiếp 4:3</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAspectRatio('square')}
                  className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                    aspectRatio === 'square'
                      ? 'border-stone-900 bg-stone-900 text-white font-semibold shadow-xs'
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                  }`}
                >
                  <Square className="w-4 h-4" />
                  <span className="text-[11px]">Khổ vuông 1:1</span>
                </button>
              </div>
            </div>

            {/* 3. Typography Font Style */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2 flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5 text-stone-500" />
                <span>3. Kiểu phông chữ:</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFontStyle('serif')}
                  className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                    fontStyle === 'serif'
                      ? 'border-stone-900 bg-stone-900 text-white font-semibold'
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                  }`}
                >
                  <span className="font-serif italic text-xs block">Serif Cổ Điển</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFontStyle('handwriting')}
                  className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                    fontStyle === 'handwriting'
                      ? 'border-stone-900 bg-stone-900 text-white font-semibold'
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                  }`}
                >
                  <span className="font-serif text-xs block">Viết tay mềm mại</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFontStyle('modern')}
                  className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                    fontStyle === 'modern'
                      ? 'border-stone-900 bg-stone-900 text-white font-semibold'
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                  }`}
                >
                  <span className="text-xs block">Hiện đại tối giản</span>
                </button>
              </div>
            </div>

            {/* 4. Recipient & Sender & Occasion Fields */}
            <div className="space-y-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Gửi đến (Người nhận)
                  </label>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-stone-900"
                    placeholder="Tên người nhận"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Ký tên (Người gửi)
                  </label>
                  <input
                    type="text"
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-stone-900"
                    placeholder="Tên người gửi"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                  Dịp kỷ niệm hiển thị trên đầu thiệp
                </label>
                <input
                  type="text"
                  value={occ}
                  onChange={(e) => setOcc(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-stone-900"
                  placeholder="Dịp kỷ niệm..."
                />
              </div>

              {/* Gift & Wax Seal Toggles */}
              <div className="flex flex-wrap items-center gap-4 pt-1 border-t border-stone-200/60 text-xs">
                <label className="flex items-center gap-1.5 cursor-pointer text-stone-700">
                  <input
                    type="checkbox"
                    checked={showGiftBadge}
                    onChange={(e) => setShowGiftBadge(e.target.checked)}
                    className="rounded border-stone-300 text-stone-900 focus:ring-stone-900"
                  />
                  <span>Hiện món quà gửi kèm</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer text-stone-700">
                  <input
                    type="checkbox"
                    checked={showWaxSeal}
                    onChange={(e) => setShowWaxSeal(e.target.checked)}
                    className="rounded border-stone-300 text-stone-900 focus:ring-stone-900"
                  />
                  <span>Con dấu sáp "Tâm Ý"</span>
                </label>
              </div>

              {showGiftBadge && (
                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Tên món quà
                  </label>
                  <input
                    type="text"
                    value={gift}
                    onChange={(e) => setGift(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-stone-900"
                    placeholder="VD: Nhẫn Bạc Đôi Khắc Tên"
                  />
                </div>
              )}
            </div>

            {/* 5. Message Content Live Editor */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Feather className="w-3.5 h-3.5 text-amber-600" />
                  <span>Nội dung lời chúc (Chỉnh sửa trực tiếp):</span>
                </span>
                <span className="text-[10px] text-stone-400 font-normal lowercase">
                  tự động canh dòng
                </span>
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2.5 text-xs sm:text-sm bg-white border border-stone-300 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-stone-900 leading-relaxed font-serif"
                placeholder="Nhập nội dung lời chúc..."
              />
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="p-4 sm:px-6 border-t border-stone-200 bg-stone-50 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-stone-500 w-full sm:w-auto text-center sm:text-left">
            {copyFeedback ? (
              <span className="text-emerald-700 font-medium inline-flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{copyFeedback}</span>
              </span>
            ) : (
              <span>File xuất: <strong className="text-stone-800">{generateFilename()}</strong></span>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            {/* Share via Mobile / Chat picker if available */}
            {canShare && (
              <button
                type="button"
                onClick={handleShare}
                className="py-2.5 px-3.5 text-xs font-semibold text-stone-700 bg-white hover:bg-stone-100 border border-stone-300 rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-2xs"
              >
                {shareSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Đã gửi!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-stone-600" />
                    <span>Gửi tin nhắn</span>
                  </>
                )}
              </button>
            )}

            {/* Copy image to clipboard */}
            <button
              type="button"
              onClick={handleCopy}
              className="py-2.5 px-4 text-xs font-semibold text-stone-800 bg-white hover:bg-stone-100 border border-stone-300 rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-2xs"
            >
              {isCopied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Đã chép ảnh!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-stone-600" />
                  <span>Sao chép ảnh (Ctrl+V)</span>
                </>
              )}
            </button>

            {/* Primary Download Button */}
            <button
              type="button"
              onClick={handleDownload}
              disabled={isDownloading}
              className="py-2.5 px-5 text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 disabled:opacity-50 rounded-xl transition-all cursor-pointer inline-flex items-center gap-2 shadow-xs"
            >
              {isDownloading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                  <span>Đang tải xuống...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-amber-300" />
                  <span>Tải ảnh PNG</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
