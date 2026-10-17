import React, { useState } from 'react';
import { GiftItem, RelationshipCategory } from '../types/gift';
import { formatVND, RELATIONSHIPS, PERSONALITY_TRAITS } from '../data/gifts';
import {
  X,
  Heart,
  Plus,
  BookmarkCheck,
  Sparkles,
  Lightbulb,
  ShoppingBag,
  Share2,
  Check,
  UserCheck
} from 'lucide-react';

interface GiftDetailModalProps {
  gift: GiftItem | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  onOpenAddToCollection: () => void;
  onOpenAICard?: (gift: GiftItem) => void;
  isInAnyCollection: boolean;
}

export const GiftDetailModal: React.FC<GiftDetailModalProps> = ({
  gift,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onOpenAddToCollection,
  onOpenAICard,
  isInAnyCollection,
}) => {
  const [copiedIdea, setCopiedIdea] = useState(false);

  if (!isOpen || !gift) return null;

  const handleCopy = () => {
    const text = `🎁 Gợi ý quà: ${gift.title}\n💰 Giá ước tính: ${formatVND(
      gift.price
    )}\n✨ Lý do tâm lý: ${gift.whyItFits}\n💡 Mẹo tặng: ${gift.presentationTip}\n📍 Điểm mua: ${
      gift.shoppingAdvice
    }`;
    navigator.clipboard.writeText(text);
    setCopiedIdea(true);
    setTimeout(() => setCopiedIdea(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-2xl border border-stone-200 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-stone-50">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span>{gift.categoryName}</span>
            <span aria-hidden="true">·</span>
            <span className="font-medium text-stone-700">★ {gift.rating.toFixed(1)}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">({gift.reviewsCount} đánh giá)</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Top Hero Layout: Image + Core Information */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
            <div className="sm:col-span-5 relative rounded-xl overflow-hidden aspect-4/3 bg-stone-100 border border-stone-200 shadow-2xs">
              <img
                src={gift.image}
                alt={gift.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {gift.badge && (
                <div className="absolute top-2.5 left-2.5">
                  <span className="text-[11px] font-medium tracking-wide bg-stone-900/80 text-white px-2 py-0.5 rounded-sm">
                    {gift.badge}
                  </span>
                </div>
              )}
            </div>

            <div className="sm:col-span-7 flex flex-col justify-between">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
                  {gift.title}
                </h2>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-stone-900 tabular-nums">
                    {formatVND(gift.price)}
                  </span>
                  <span className="text-xs text-stone-500">giá ước tính tại thị trường VN</span>
                </div>
                <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {gift.shortDesc}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-4 border-t border-stone-100 flex flex-wrap gap-2.5">
                <button
                  onClick={onOpenAddToCollection}
                  className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg border transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer ${
                    isInAnyCollection
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-stone-900 text-white border-stone-900 hover:bg-stone-800'
                  }`}
                >
                  {isInAnyCollection ? (
                    <>
                      <BookmarkCheck className="w-4 h-4 text-amber-800" />
                      <span>Đã trong bộ sưu tập</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>+ Thêm vào bộ sưu tập</span>
                    </>
                  )}
                </button>

                <button
                  onClick={onToggleWishlist}
                  className="py-2 px-3 text-xs font-medium rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-700 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-stone-500'
                    }`}
                  />
                  <span>{isWishlisted ? 'Đã lưu' : 'Lưu yêu thích'}</span>
                </button>

                <button
                  onClick={handleCopy}
                  className="py-2 px-3 text-xs font-medium rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-700 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedIdea ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">Đã chép!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4 text-stone-500" />
                      <span>Sao chép ý tưởng</span>
                    </>
                  )}
                </button>

                {onOpenAICard && (
                  <button
                    onClick={() => onOpenAICard(gift)}
                    className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-amber-100 hover:bg-amber-200/90 text-amber-950 border border-amber-300 transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Sparkles className="w-4 h-4 text-amber-700" />
                    <span>✨ AI Viết thiệp cho món quà này</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Relationship Breakdown Section */}
          <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <span>Sự phù hợp với các mối quan hệ:</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {gift.relationships.map((relKey) => {
                const relMeta = RELATIONSHIPS.find((r) => r.id === relKey);
                const fitText = gift.relationshipFit[relKey];

                return (
                  <div key={relKey} className="p-3 bg-white rounded-lg border border-stone-200/80">
                    <span className="text-xs font-bold text-stone-900 block mb-1">
                      {relMeta?.label || relKey}
                    </span>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {fitText || relMeta?.shortDesc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Personality Compatibility Section */}
          <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-stone-600" />
              <span>Phù hợp với đặc điểm tính cách:</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {gift.personalities.map((traitId) => {
                const trait = PERSONALITY_TRAITS.find((p) => p.id === traitId);
                const advice = gift.personalityFitAdvice?.[traitId];

                return (
                  <div
                    key={traitId}
                    className="p-3 bg-white rounded-lg border border-stone-200/80 flex-1 min-w-[200px]"
                  >
                    <span className="text-xs font-bold text-stone-900 block mb-1">
                      {trait?.label}: <span className="font-normal text-stone-500 text-[11px]">{trait?.tagline}</span>
                    </span>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {advice || trait?.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Psychological Reasoning: Why it fits */}
          <div className="p-4 bg-amber-50/50 border border-amber-200/80 rounded-xl space-y-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Tại sao món quà này ý nghĩa? (Góc nhìn tâm lý)</span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {gift.whyItFits}
            </p>
          </div>

          {/* Presentation & Surprise Tips */}
          <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Nghệ thuật & Mẹo tạo bất ngờ khi tặng</span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {gift.presentationTip}
            </p>
          </div>

          {/* Where to buy in Vietnam */}
          <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4 text-stone-600" />
              <span>Gợi ý chuẩn bị & Điểm mua uy tín tại Việt Nam</span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {gift.shoppingAdvice}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
