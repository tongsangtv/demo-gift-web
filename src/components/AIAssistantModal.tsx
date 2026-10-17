import React, { useState, useEffect } from 'react';
import {
  AIRecommendation,
  AICardMessage,
  RelationshipCategory,
  GiftItem,
  OccasionType,
} from '../types/gift';
import { RELATIONSHIPS, OCCASIONS, GIFTS_DATABASE, formatVND } from '../data/gifts';
import {
  X,
  Sparkles,
  Send,
  Copy,
  Check,
  RefreshCw,
  MessageSquare,
  Gift,
  AlertCircle,
  Package,
  Calendar,
  PenTool,
  Edit3,
  Download,
  Palette,
  Image as ImageIcon,
  Share2
} from 'lucide-react';
import { CardExportModal } from './CardExportModal';
import { CardThemeId } from '../types/cardExport';
import { renderCardToCanvas, downloadCardAsPNG } from '../utils/cardCanvasRenderer';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRelationship?: RelationshipCategory;
  initialGift?: GiftItem | null;
  initialOccasion?: string;
  allGifts?: GiftItem[];
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  defaultRelationship = 'lover',
  initialGift = null,
  initialOccasion = '',
  allGifts = GIFTS_DATABASE,
}) => {
  const [activeTab, setActiveTab] = useState<'card' | 'gifts'>('card');

  // Card Form State
  const [cardRecipientName, setCardRecipientName] = useState('Bé Miu');
  const [cardRel, setCardRel] = useState<RelationshipCategory>(defaultRelationship);
  const [cardOccasionType, setCardOccasionType] = useState<OccasionType | 'custom'>('anniversary_love');
  const [cardOccasionCustom, setCardOccasionCustom] = useState(initialOccasion || '');

  // Gift Details State in Card Generator
  const [giftMode, setGiftMode] = useState<'catalog' | 'custom'>(initialGift ? 'catalog' : 'catalog');
  const [selectedGiftId, setSelectedGiftId] = useState<string>(initialGift?.id || allGifts[0]?.id || '');
  const [customGiftDetails, setCustomGiftDetails] = useState('');
  const [cardMemories, setCardMemories] = useState('Chuyến đi Đà Lạt ngắm mưa và ăn bánh tráng nướng');
  const [cardTone, setCardTone] = useState('Lãng mạn & Ngọt ngào');

  const [loadingCards, setLoadingCards] = useState(false);
  const [cards, setCards] = useState<AICardMessage[]>([]);
  const [editingCardIdx, setEditingCardIdx] = useState<number | null>(null);
  const [editedMessages, setEditedMessages] = useState<Record<number, string>>({});

  // Gift Generator Form State
  const [giftRel, setGiftRel] = useState<RelationshipCategory>(defaultRelationship);
  const [relationshipDetail, setRelationshipDetail] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [budgetVND, setBudgetVND] = useState('800000');
  const [occasionForGift, setOccasionForGift] = useState('Kỷ niệm ngày yêu');
  const [specialNotes, setSpecialNotes] = useState('');
  const [loadingGifts, setLoadingGifts] = useState(false);
  const [giftRecommendations, setGiftRecommendations] = useState<AIRecommendation[]>([]);
  const [consultantAdvice, setConsultantAdvice] = useState<string>('');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Card Image Export Modal State
  const [exportModal, setExportModal] = useState<{
    isOpen: boolean;
    message: string;
    styleName: string;
  }>({
    isOpen: false,
    message: '',
    styleName: '',
  });
  const [quickDownloadingIdx, setQuickDownloadingIdx] = useState<number | null>(null);
  const [quickDownloadedIdx, setQuickDownloadedIdx] = useState<number | null>(null);

  // Sync initialGift when modal opens or initialGift changes
  useEffect(() => {
    if (initialGift) {
      setGiftMode('catalog');
      setSelectedGiftId(initialGift.id);
      setActiveTab('card');
      if (initialGift.relationships.length > 0 && initialGift.relationships[0] !== 'all') {
        setCardRel(initialGift.relationships[0]);
      }
    }
  }, [initialGift, isOpen]);

  if (!isOpen) return null;

  // Resolve currently selected catalog gift
  const currentCatalogGift = allGifts.find((g) => g.id === selectedGiftId) || allGifts[0];

  const getEffectiveOccasion = () => {
    if (cardOccasionType === 'custom') {
      return cardOccasionCustom.trim() || 'Kỷ niệm đặc biệt';
    }
    const found = OCCASIONS.find((o) => o.id === cardOccasionType);
    return found ? found.label : 'Kỷ niệm đặc biệt';
  };

  const getEffectiveGiftDetails = () => {
    if (giftMode === 'custom') {
      return customGiftDetails.trim() || 'Món quà tình cảm';
    }
    return currentCatalogGift
      ? `${currentCatalogGift.title} (${currentCatalogGift.categoryName})`
      : 'Món quà ý nghĩa';
  };

  const handleGenerateCards = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingCards(true);
    setErrorMessage(null);
    setCards([]);
    setEditingCardIdx(null);
    setEditedMessages({});

    const effectiveOccasion = getEffectiveOccasion();
    const effectiveGiftDetails = getEffectiveGiftDetails();

    try {
      const res = await fetch('/api/gemini/card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientName: cardRecipientName || 'Người thương',
          recipientType: cardRel,
          occasion: effectiveOccasion,
          giftDetails: effectiveGiftDetails,
          memories: cardMemories || 'những khoảnh khắc gắn bó',
          tone: cardTone,
        }),
      });

      const data = await res.json();
      if (data.cards && data.cards.length > 0) {
        setCards(data.cards);
      } else if (data.error) {
        setErrorMessage(data.error);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage('Không thể kết nối đến máy chủ. Vui lòng thử lại sau giây lát.');
    } finally {
      setLoadingCards(false);
    }
  };

  const handleGenerateGifts = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingGifts(true);
    setErrorMessage(null);
    setGiftRecommendations([]);
    setConsultantAdvice('');

    try {
      const res = await fetch('/api/gemini/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientType: giftRel,
          relationshipDetail,
          hobbies,
          budgetVND,
          occasion: occasionForGift,
          specialNotes,
        }),
      });

      const data = await res.json();
      if (data.recommendations && data.recommendations.length > 0) {
        setGiftRecommendations(data.recommendations);
        setConsultantAdvice(data.consultantAdvice || '');
      } else if (data.error) {
        setErrorMessage(data.error);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage('Không thể kết nối đến máy chủ. Hệ thống đang thử lại...');
    } finally {
      setLoadingGifts(false);
    }
  };

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Quick preset helper
  const applyCardPreset = (
    name: string,
    rel: RelationshipCategory,
    occType: OccasionType | 'custom',
    customOcc: string,
    catalogGiftIndex: number,
    mem: string
  ) => {
    setCardRecipientName(name);
    setCardRel(rel);
    setCardOccasionType(occType);
    setCardOccasionCustom(customOcc);
    setGiftMode('catalog');
    if (allGifts[catalogGiftIndex]) {
      setSelectedGiftId(allGifts[catalogGiftIndex].id);
    }
    setCardMemories(mem);
    setErrorMessage(null);
  };

  // Open customizer modal for PNG card export
  const handleOpenExportModal = (msg: string, styleName: string) => {
    setExportModal({
      isOpen: true,
      message: msg,
      styleName,
    });
  };

  // Quick 1-click download of card as PNG
  const handleQuickDownload = async (msg: string, styleName: string, idx: number) => {
    setQuickDownloadingIdx(idx);
    try {
      const canvas = document.createElement('canvas');
      let theme: CardThemeId = 'ivory_blossom';
      if (styleName.includes('Hài hước')) theme = 'vintage_kraft';
      else if (styleName.includes('Tinh tế') || styleName.includes('Trang trọng')) theme = 'midnight_elegance';
      else if (styleName.includes('Lãng mạn')) theme = 'pastel_romance';

      const today = new Date();
      const day = today.getDate().toString().padStart(2, '0');
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const year = today.getFullYear();
      const dateStr = `Ngày ${day}/${month}/${year}`;

      await renderCardToCanvas(canvas, {
        recipientName: cardRecipientName || 'Người thương',
        senderName: 'Từ người thương',
        occasion: getEffectiveOccasion(),
        message: msg,
        giftTitle: getEffectiveGiftDetails(),
        dateString: dateStr,
        theme,
        aspectRatio: 'story',
        fontStyle: 'serif',
        showWaxSeal: true,
        showGiftBadge: true,
        showWatermark: true,
      });

      const cleanRec = (cardRecipientName || 'NguoiThuong')
        .replace(/[^a-zA-Z0-9\u00C0-\u024F\u1EA0-\u1EF9]/g, '_')
        .slice(0, 20);
      downloadCardAsPNG(canvas, `Thiep_${cleanRec}.png`);
      setQuickDownloadedIdx(idx);
      setTimeout(() => setQuickDownloadedIdx(null), 3000);
    } catch (err) {
      console.error('Quick card download failed:', err);
    } finally {
      setQuickDownloadingIdx(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-2xl border border-stone-200 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
                Trợ lý AI Viết Thiệp & Gợi Ý Quà
              </h2>
              <p className="text-xs text-stone-500">
                Sáng tác lời chúc thiệp mừng cá nhân hóa theo món quà và dịp kỷ niệm cụ thể
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

        {/* Tab Switcher */}
        <div className="flex border-b border-stone-200 bg-stone-100/60 px-6 pt-2">
          <button
            onClick={() => {
              setActiveTab('card');
              setErrorMessage(null);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'card'
                ? 'border-stone-900 text-stone-900 bg-white rounded-t-lg'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-amber-600" />
            <span>AI Soạn thiệp theo quà & dịp</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('gifts');
              setErrorMessage(null);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'gifts'
                ? 'border-stone-900 text-stone-900 bg-white rounded-t-lg'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Gift className="w-4 h-4 text-stone-500" />
            <span>AI Gợi ý quà độc bản</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {activeTab === 'card' ? (
            /* Card Message Generator with Gift Details */
            <div className="space-y-6">
              {/* Presets bar */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-stone-500 font-medium">Chọn nhanh mẫu:</span>
                <button
                  type="button"
                  onClick={() =>
                    applyCardPreset(
                      'Bé Miu',
                      'lover',
                      'anniversary_love',
                      '',
                      0,
                      'Chuyến đi Đà Lạt cùng ngắm mưa và ăn bánh tráng nướng'
                    )
                  }
                  className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-md border border-stone-200 cursor-pointer"
                >
                  Nhẫn bạc + Nước hoa (Kỷ niệm 1 năm)
                </button>
                <button
                  type="button"
                  onClick={() =>
                    applyCardPreset(
                      'Mẹ yêu',
                      'family',
                      'birthday',
                      '',
                      1,
                      'Nhớ những bữa cơm nóng hổi mẹ nấu mỗi khi con đi làm xa về'
                    )
                  }
                  className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-md border border-stone-200 cursor-pointer"
                >
                  Trà thảo mộc & cốc gốm (Sinh nhật mẹ)
                </button>
                <button
                  type="button"
                  onClick={() =>
                    applyCardPreset(
                      'Tuấn Còi',
                      'bestfriend',
                      'friendship_day',
                      '',
                      3,
                      'Lần đi phượt xe máy hỏng giữa đèo cười xỉu'
                    )
                  }
                  className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-md border border-stone-200 cursor-pointer"
                >
                  Loa Bluetooth Retro (Bạn thân)
                </button>
              </div>

              <form onSubmit={handleGenerateCards} className="space-y-4 p-5 bg-stone-50 rounded-2xl border border-stone-200">
                {/* 1. Recipient Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-800 mb-1">
                      Tên / Biệt danh người nhận
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="VD: Bé Miu, Mẹ yêu, Anh Nam, Bạn Trang..."
                      value={cardRecipientName}
                      onChange={(e) => setCardRecipientName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-800 mb-1">
                      Mối quan hệ
                    </label>
                    <select
                      value={cardRel}
                      onChange={(e) => setCardRel(e.target.value as RelationshipCategory)}
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-hidden"
                    >
                      {RELATIONSHIPS.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 2. Occasion Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-stone-800 mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-stone-500" />
                      <span>Dịp kỷ niệm / Sự kiện tặng quà</span>
                    </label>
                    <select
                      value={cardOccasionType}
                      onChange={(e) => setCardOccasionType(e.target.value as OccasionType | 'custom')}
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-hidden"
                    >
                      {OCCASIONS.map((occ) => (
                        <option key={occ.id} value={occ.id}>
                          {occ.label}
                        </option>
                      ))}
                      <option value="custom">✍️ Dịp kỷ niệm tùy chỉnh khác...</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-800 mb-1">
                      Chi tiết dịp (Nếu chọn tùy chỉnh hoặc thêm chi tiết)
                    </label>
                    <input
                      type="text"
                      placeholder="VD: Kỷ niệm 100 ngày yêu, Lễ tốt nghiệp đại học..."
                      value={cardOccasionCustom}
                      onChange={(e) => {
                        setCardOccasionCustom(e.target.value);
                        if (cardOccasionType !== 'custom') setCardOccasionType('custom');
                      }}
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* 3. Gift Details Selection */}
                <div className="p-3.5 bg-white border border-stone-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                      <Package className="w-4 h-4 text-amber-600" />
                      <span>Món quà gửi kèm thiệp (Để AI lồng ghép ý nghĩa món quà)</span>
                    </label>
                    <div className="flex items-center gap-1 bg-stone-100 p-0.5 rounded-md text-[11px]">
                      <button
                        type="button"
                        onClick={() => setGiftMode('catalog')}
                        className={`px-2 py-0.5 rounded cursor-pointer ${
                          giftMode === 'catalog'
                            ? 'bg-white font-semibold text-stone-900 shadow-2xs'
                            : 'text-stone-500 hover:text-stone-800'
                        }`}
                      >
                        Từ danh mục
                      </button>
                      <button
                        type="button"
                        onClick={() => setGiftMode('custom')}
                        className={`px-2 py-0.5 rounded cursor-pointer ${
                          giftMode === 'custom'
                            ? 'bg-white font-semibold text-stone-900 shadow-2xs'
                            : 'text-stone-500 hover:text-stone-800'
                        }`}
                      >
                        Tự nhập quà
                      </button>
                    </div>
                  </div>

                  {giftMode === 'catalog' ? (
                    <div className="space-y-2">
                      <select
                        value={selectedGiftId}
                        onChange={(e) => setSelectedGiftId(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-hidden"
                      >
                        {allGifts.map((gift) => (
                          <option key={gift.id} value={gift.id}>
                            {gift.title} — {formatVND(gift.price)}
                          </option>
                        ))}
                      </select>

                      {currentCatalogGift && (
                        <div className="flex items-center gap-3 p-2.5 bg-stone-50 border border-stone-200 rounded-lg">
                          <img
                            src={currentCatalogGift.image}
                            alt={currentCatalogGift.title}
                            className="w-12 h-12 rounded-md object-cover border border-stone-200 shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <span className="text-[11px] font-bold text-stone-900 block truncate">
                              {currentCatalogGift.title}
                            </span>
                            <div className="flex items-center gap-2 text-[11px] text-stone-500">
                              <span>{currentCatalogGift.categoryName}</span>
                              <span aria-hidden="true">·</span>
                              <span className="font-semibold text-amber-800 tabular-nums">
                                {formatVND(currentCatalogGift.price)}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <input
                        type="text"
                        placeholder="VD: Chiếc đồng hồ da tối giản, Bó hoa cúc tana, Máy pha cafe pour-over..."
                        value={customGiftDetails}
                        onChange={(e) => setCustomGiftDetails(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-hidden"
                      />
                      <p className="text-[11px] text-stone-500 mt-1">
                        AI sẽ lấy ý nghĩa biểu trưng của món quà này để dệt nên lời chúc sâu sắc.
                      </p>
                    </div>
                  )}
                </div>

                {/* 4. Memories & Tone */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-8">
                    <label className="block text-xs font-semibold text-stone-800 mb-1 flex items-center gap-1.5">
                      <PenTool className="w-3.5 h-3.5 text-stone-500" />
                      <span>Kỷ niệm hoặc câu chuyện riêng muốn nhắc đến</span>
                    </label>
                    <input
                      type="text"
                      placeholder="VD: Chuyến du lịch Đà Lạt trời mưa, lần cùng thức trắng deadline, thói quen uống trà sáng..."
                      value={cardMemories}
                      onChange={(e) => setCardMemories(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-hidden"
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <label className="block text-xs font-semibold text-stone-800 mb-1">
                      Giọng văn ưu tiên
                    </label>
                    <select
                      value={cardTone}
                      onChange={(e) => setCardTone(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-hidden"
                    >
                      <option value="Lãng mạn & Ngọt ngào">Lãng mạn & Ngọt ngào</option>
                      <option value="Hài hước & Dí dỏm">Hài hước & Dí dỏm</option>
                      <option value="Tinh tế & Sâu lắng">Tinh tế & Sâu lắng</option>
                      <option value="Hiếu kính & Ấm áp">Hiếu kính & Ấm áp</option>
                      <option value="Lịch thiệp & Trang trọng">Lịch thiệp & Trang trọng</option>
                    </select>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={loadingCards}
                  className="w-full py-2.5 text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 disabled:opacity-50 rounded-xl transition-all cursor-pointer inline-flex items-center justify-center gap-2 shadow-xs"
                >
                  {loadingCards ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                      <span>Gemini AI đang sáng tác lời chúc lồng ghép món quà...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Tạo 3 lời chúc thiệp mừng cá nhân hóa</span>
                    </>
                  )}
                </button>
              </form>

              {/* Cards Results */}
              {cards.length > 0 && (
                <div className="space-y-4 pt-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-2">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800">
                        3 Lời chúc viết thiệp cho {cardRecipientName}:
                      </h3>
                      <p className="text-[11px] text-stone-500">
                        Đã lồng ghép dịp: <strong>{getEffectiveOccasion()}</strong> · Món quà: <strong>{getEffectiveGiftDetails()}</strong>
                      </p>
                    </div>
                    <span className="text-xs text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-md self-start sm:self-auto border border-emerald-200">
                      ✓ Đã tối ưu bằng AI
                    </span>
                  </div>

                  {/* Feature banner: Export Card to Image */}
                  <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-amber-200/80 text-amber-900 flex items-center justify-center shrink-0">
                        <Palette className="w-4 h-4" />
                      </div>
                      <p className="text-xs text-amber-900">
                        <strong>Xuất thiệp ảnh (PNG):</strong> Bấm nút <em>"Xuất thiệp ảnh (PNG)"</em> ở mỗi lời chúc bên dưới để tải ảnh thiệp sắc nét gửi Zalo, Messenger hoặc đăng Story.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {cards.map((c, idx) => {
                      const displayMessage = editedMessages[idx] !== undefined ? editedMessages[idx] : c.message;
                      const isEditing = editingCardIdx === idx;
                      const isDownloading = quickDownloadingIdx === idx;
                      const isDownloaded = quickDownloadedIdx === idx;

                      return (
                        <div
                          key={idx}
                          className="p-4 bg-stone-50/80 border border-stone-200 rounded-xl space-y-3 relative group transition-all hover:border-stone-300 hover:shadow-2xs"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-stone-800 bg-white px-2.5 py-1 rounded-md border border-stone-200">
                                {c.style}
                              </span>
                              <span className="text-[11px] text-stone-500 hidden sm:inline">
                                🎁 Kèm món quà
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => {
                                  if (isEditing) {
                                    setEditingCardIdx(null);
                                  } else {
                                    setEditingCardIdx(idx);
                                    if (editedMessages[idx] === undefined) {
                                      setEditedMessages((prev) => ({ ...prev, [idx]: c.message }));
                                    }
                                  }
                                }}
                                className="px-2.5 py-1 text-xs text-stone-600 hover:text-stone-900 bg-white hover:bg-stone-100 border border-stone-200 rounded-md transition-colors inline-flex items-center gap-1 cursor-pointer"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                                <span>{isEditing ? 'Đóng sửa' : 'Chỉnh sửa'}</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => copyToClipboard(displayMessage, idx)}
                                className="px-3 py-1 text-xs font-medium text-stone-800 bg-white hover:bg-stone-100 border border-stone-200 rounded-md transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
                              >
                                {copiedIndex === idx ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                    <span className="text-emerald-700 font-semibold">Đã chép text!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5 text-stone-500" />
                                    <span>Sao chép</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>

                          {isEditing ? (
                            <textarea
                              rows={4}
                              value={displayMessage}
                              onChange={(e) =>
                                setEditedMessages((prev) => ({ ...prev, [idx]: e.target.value }))
                              }
                              className="w-full p-3 text-xs sm:text-sm font-serif bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-stone-900"
                            />
                          ) : (
                            <p className="font-serif text-xs sm:text-sm text-stone-800 leading-relaxed italic bg-white p-4 rounded-lg border border-stone-100 whitespace-pre-line shadow-2xs">
                              "{displayMessage}"
                            </p>
                          )}

                          {/* Card Export Action Buttons */}
                          <div className="pt-2.5 border-t border-stone-200/70 flex flex-wrap items-center justify-between gap-2">
                            <span className="text-[11px] text-stone-500 flex items-center gap-1">
                              <ImageIcon className="w-3.5 h-3.5 text-stone-400" />
                              <span>Xuất thiệp ảnh PNG chất lượng cao:</span>
                            </span>

                            <div className="flex items-center gap-2">
                              {/* Quick 1-click download button */}
                              <button
                                type="button"
                                onClick={() => handleQuickDownload(displayMessage, c.style, idx)}
                                disabled={isDownloading}
                                className="px-2.5 py-1.5 text-xs font-medium text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-2xs disabled:opacity-50"
                                title="Tải nhanh file PNG với thiết kế mặc định"
                              >
                                {isDownloading ? (
                                  <>
                                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-600" />
                                    <span>Đang tạo ảnh...</span>
                                  </>
                                ) : isDownloaded ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                    <span className="text-emerald-700 font-semibold">Đã tải xong!</span>
                                  </>
                                ) : (
                                  <>
                                    <Download className="w-3.5 h-3.5 text-stone-500" />
                                    <span>Tải nhanh PNG</span>
                                  </>
                                )}
                              </button>

                              {/* Open Full Customizer & Export Modal */}
                              <button
                                type="button"
                                onClick={() => handleOpenExportModal(displayMessage, c.style)}
                                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                              >
                                <Palette className="w-3.5 h-3.5 text-amber-300" />
                                <span>Tùy chỉnh & Xuất thiệp ảnh (PNG)</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Gift Generation Form */
            <div className="space-y-6">
              <form onSubmit={handleGenerateGifts} className="space-y-4 p-4 bg-stone-50 rounded-xl border border-stone-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Relationship */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Mối quan hệ
                    </label>
                    <select
                      value={giftRel}
                      onChange={(e) => setGiftRel(e.target.value as RelationshipCategory)}
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-hidden"
                    >
                      {RELATIONSHIPS.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Detail */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Chi tiết mối quan hệ
                    </label>
                    <input
                      type="text"
                      placeholder="VD: Yêu xa 2 năm, Vợ chồng mới cưới, Bạn thân cấp 3..."
                      value={relationshipDetail}
                      onChange={(e) => setRelationshipDetail(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-hidden"
                    />
                  </div>

                  {/* Hobbies / Quirks */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Tính cách / Sở thích nổi bật
                    </label>
                    <input
                      type="text"
                      placeholder="VD: Thích đồ vintage, mê làm bánh, hay thức khuya, hướng nội..."
                      value={hobbies}
                      onChange={(e) => setHobbies(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-hidden"
                    />
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Ngân sách dự tính (VNĐ)
                    </label>
                    <input
                      type="number"
                      step="50000"
                      placeholder="VD: 800000"
                      value={budgetVND}
                      onChange={(e) => setBudgetVND(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Special memories */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Kỷ niệm hoặc mong muốn gửi gắm riêng (tùy chọn)
                  </label>
                  <input
                    type="text"
                    placeholder="VD: Muốn món quà gì đó có thể mang theo hàng ngày, hoặc kỷ niệm lần đầu đi du lịch cùng nhau..."
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-900 focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loadingGifts}
                  className="w-full py-2.5 text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 disabled:opacity-50 rounded-xl transition-all cursor-pointer inline-flex items-center justify-center gap-2 shadow-xs"
                >
                  {loadingGifts ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                      <span>AI đang phân tích tâm lý & tìm kiếm ý tưởng...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Khám phá 3 đề xuất quà từ AI</span>
                    </>
                  )}
                </button>
              </form>

              {/* Consultant advice note */}
              {consultantAdvice && (
                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 leading-relaxed">
                  <strong className="block font-semibold mb-1">
                    💡 Lời khuyên tâm lý từ chuyên gia:
                  </strong>
                  {consultantAdvice}
                </div>
              )}

              {/* Gift Suggestions Results */}
              {giftRecommendations.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Đề xuất quà tặng được cá nhân hóa:
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {giftRecommendations.map((rec, i) => (
                      <div
                        key={i}
                        className="p-4 bg-white border border-stone-200 rounded-xl shadow-2xs space-y-2.5"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <span className="text-[11px] font-medium text-stone-500 uppercase tracking-wider">
                              {rec.category}
                            </span>
                            <h4 className="font-serif text-base font-bold text-stone-900 mt-0.5">
                              {rec.title}
                            </h4>
                          </div>
                          <span className="text-sm font-bold text-amber-800 tabular-nums bg-amber-50 px-2.5 py-1 rounded-md shrink-0">
                            {rec.estimatedPrice}
                          </span>
                        </div>

                        <div className="text-xs text-stone-700 space-y-1.5 pt-1 border-t border-stone-100">
                          <p>
                            <strong className="text-stone-900">Tại sao phù hợp:</strong> {rec.whyItFits}
                          </p>
                          <p>
                            <strong className="text-stone-900">Mẹo trao bất ngờ:</strong> {rec.presentationIdea}
                          </p>
                          <p className="text-stone-500 text-[11px]">
                            <strong>Gợi ý tìm mua:</strong> {rec.actionTip}
                          </p>
                        </div>

                        <div className="pt-2 flex justify-end">
                          <button
                            onClick={() =>
                              copyToClipboard(
                                `${rec.title} (${rec.estimatedPrice})\n- Tại sao hợp: ${rec.whyItFits}\n- Mẹo tặng: ${rec.presentationIdea}`,
                                i
                              )
                            }
                            className="text-xs text-stone-600 hover:text-stone-900 inline-flex items-center gap-1 cursor-pointer"
                          >
                            {copiedIndex === i ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-emerald-700">Đã chép</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 text-stone-500" />
                                <span>Sao chép gợi ý</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Greeting Card PNG Image Export & Customizer Modal */}
      <CardExportModal
        isOpen={exportModal.isOpen}
        onClose={() => setExportModal((prev) => ({ ...prev, isOpen: false }))}
        initialMessage={exportModal.message}
        recipientName={cardRecipientName || 'Người thương'}
        occasion={getEffectiveOccasion()}
        giftTitle={getEffectiveGiftDetails()}
        styleName={exportModal.styleName}
      />
    </div>
  );
};
