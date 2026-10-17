import React, { useState } from 'react';
import { GiftItem, RelationshipCategory, PersonalityTrait, OccasionType } from '../types/gift';
import { RELATIONSHIPS, PERSONALITY_TRAITS, OCCASIONS, BUDGET_PRESETS, formatVND } from '../data/gifts';
import { X, Check, Compass, ArrowRight, RotateCcw, Plus, Sparkles } from 'lucide-react';

interface GiftQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  allGifts: GiftItem[];
  onOpenGiftDetail: (gift: GiftItem) => void;
  onOpenAddToCollection: (gift: GiftItem) => void;
}

export const GiftQuizModal: React.FC<GiftQuizModalProps> = ({
  isOpen,
  onClose,
  allGifts,
  onOpenGiftDetail,
  onOpenAddToCollection,
}) => {
  const [step, setStep] = useState(1);
  const [selectedRel, setSelectedRel] = useState<RelationshipCategory>('lover');
  const [selectedPersonality, setSelectedPersonality] = useState<PersonalityTrait>('creative');
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionType>('anniversary_love');
  const [selectedBudgetIndex, setSelectedBudgetIndex] = useState(1); // 300k - 700k

  if (!isOpen) return null;

  const currentBudget = BUDGET_PRESETS[selectedBudgetIndex];

  // Calculate matching gifts
  const matchedGifts = allGifts
    .map((gift) => {
      let score = 0;
      if (gift.relationships.includes(selectedRel)) score += 40;
      if (gift.personalities.includes(selectedPersonality)) score += 30;
      if (gift.occasions.includes(selectedOccasion)) score += 20;
      if (gift.price >= currentBudget.min && gift.price <= currentBudget.max) score += 10;
      return { gift, matchPercentage: Math.min(score, 99) };
    })
    .sort((a, b) => b.matchPercentage - a.matchPercentage)
    .slice(0, 3);

  const resetQuiz = () => {
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-stone-200 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-600" />
            <div>
              <h2 className="font-serif text-lg font-bold text-stone-900">
                Trắc nghiệm tìm quà tâm lý (30 giây)
              </h2>
              <p className="text-xs text-stone-500">
                {step <= 4 ? `Bước ${step} / 4: Chọn phương án phù hợp nhất` : 'Kết quả gợi ý tối ưu'}
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

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[75vh]">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-serif text-base sm:text-lg font-semibold text-stone-900">
                1. Bạn đang chuẩn bị quà tặng cho ai?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {RELATIONSHIPS.map((rel) => (
                  <button
                    key={rel.id}
                    onClick={() => setSelectedRel(rel.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedRel === rel.id
                        ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                        : 'bg-white text-stone-800 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <span className="font-bold text-sm block mb-1">{rel.label}</span>
                    <span
                      className={`text-xs ${
                        selectedRel === rel.id ? 'text-stone-300' : 'text-stone-500'
                      }`}
                    >
                      {rel.shortDesc}
                    </span>
                  </button>
                ))}
              </div>
              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Tiếp tục</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-serif text-base sm:text-lg font-semibold text-stone-900">
                2. Nét tính cách nổi bật nhất của người nhận?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PERSONALITY_TRAITS.map((trait) => (
                  <button
                    key={trait.id}
                    onClick={() => setSelectedPersonality(trait.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedPersonality === trait.id
                        ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                        : 'bg-white text-stone-800 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <span className="font-bold text-sm block mb-0.5">{trait.label}</span>
                    <span
                      className={`text-xs block mb-1 font-medium ${
                        selectedPersonality === trait.id ? 'text-amber-200' : 'text-amber-800'
                      }`}
                    >
                      {trait.tagline}
                    </span>
                    <span
                      className={`text-[11px] line-clamp-2 ${
                        selectedPersonality === trait.id ? 'text-stone-300' : 'text-stone-500'
                      }`}
                    >
                      {trait.description}
                    </span>
                  </button>
                ))}
              </div>
              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl cursor-pointer"
                >
                  Quay lại
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Tiếp tục</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-serif text-base sm:text-lg font-semibold text-stone-900">
                3. Dịp kỷ niệm hoặc mục đích tặng quà là gì?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {OCCASIONS.map((occ) => (
                  <button
                    key={occ.id}
                    onClick={() => setSelectedOccasion(occ.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer text-xs font-medium ${
                      selectedOccasion === occ.id
                        ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    {occ.label}
                  </button>
                ))}
              </div>
              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl cursor-pointer"
                >
                  Quay lại
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Tiếp tục</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="font-serif text-base sm:text-lg font-semibold text-stone-900">
                4. Mức ngân sách bạn muốn dành cho món quà này?
              </h3>
              <div className="space-y-2.5">
                {BUDGET_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedBudgetIndex(idx)}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      selectedBudgetIndex === idx
                        ? 'bg-stone-900 text-white border-stone-900 shadow-xs font-bold'
                        : 'bg-white text-stone-800 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <span className="text-sm">{preset.label}</span>
                    <span
                      className={`text-xs tabular-nums ${
                        selectedBudgetIndex === idx ? 'text-stone-300' : 'text-stone-500'
                      }`}
                    >
                      {formatVND(preset.min)} – {formatVND(preset.max)}
                    </span>
                  </button>
                ))}
              </div>
              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStep(3)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl cursor-pointer"
                >
                  Quay lại
                </button>
                <button
                  onClick={() => setStep(5)}
                  className="px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Xem kết quả đối sánh</span>
                </button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-950">
                Đã phân tích hồ sơ: <strong>{RELATIONSHIPS.find((r) => r.id === selectedRel)?.label}</strong>, tính cách{' '}
                <strong>{PERSONALITY_TRAITS.find((p) => p.id === selectedPersonality)?.label}</strong>, ngân sách{' '}
                <strong>{currentBudget.label}</strong>. Dưới đây là 3 lựa chọn có độ tương thích cao nhất:
              </div>

              <div className="space-y-3">
                {matchedGifts.map(({ gift, matchPercentage }) => (
                  <div
                    key={gift.id}
                    className="p-3.5 bg-white border border-stone-200 rounded-xl flex items-center justify-between gap-4 hover:border-stone-300 transition-all shadow-2xs"
                  >
                    <div
                      onClick={() => {
                        onClose();
                        onOpenGiftDetail(gift);
                      }}
                      className="flex items-center gap-3.5 min-w-0 flex-1 cursor-pointer"
                    >
                      <img
                        src={gift.image}
                        alt={gift.title}
                        className="w-16 h-16 rounded-lg object-cover border border-stone-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                            {matchPercentage}% phù hợp
                          </span>
                          <span className="text-xs text-stone-500">{gift.categoryName}</span>
                        </div>
                        <h4 className="font-serif text-sm font-bold text-stone-900 truncate">
                          {gift.title}
                        </h4>
                        <span className="text-xs font-bold text-stone-900 tabular-nums">
                          {formatVND(gift.price)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => onOpenAddToCollection(gift)}
                        className="px-2.5 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Bộ sưu tập</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-4 border-t border-stone-100">
                <button
                  onClick={resetQuiz}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl inline-flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Làm lại trắc nghiệm</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl cursor-pointer"
                >
                  Duyệt toàn bộ danh mục
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
