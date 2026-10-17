import React, { useState } from 'react';
import { GiftItem, RelationshipCategory } from '../types/gift';
import { formatVND, PERSONALITY_TRAITS } from '../data/gifts';
import { Heart, Plus, BookmarkCheck, ArrowUpRight, Sparkles } from 'lucide-react';

interface GiftCardProps {
  gift: GiftItem;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  onOpenDetail: () => void;
  onOpenAddToCollection: () => void;
  onOpenAICard?: () => void;
  currentRelationship: RelationshipCategory;
  isInAnyCollection: boolean;
}

export const GiftCard: React.FC<GiftCardProps> = ({
  gift,
  isWishlisted,
  onToggleWishlist,
  onOpenDetail,
  onOpenAddToCollection,
  onOpenAICard,
  currentRelationship,
  isInAnyCollection,
}) => {
  const [imageError, setImageError] = useState(false);

  // Get specific relationship fit text for the currently selected relationship or first available
  const activeRelKey =
    currentRelationship !== 'all' && gift.relationshipFit[currentRelationship]
      ? currentRelationship
      : gift.relationships[0];

  const relFitDescription = gift.relationshipFit[activeRelKey];

  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-stone-200 hover:border-stone-300 shadow-2xs hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Product Image Area */}
      <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden cursor-pointer" onClick={onOpenDetail}>
        {!imageError ? (
          <img
            src={gift.image}
            alt={gift.title}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-stone-100 text-stone-400">
            <Sparkles className="w-8 h-8 mb-2 text-stone-300" />
            <span className="text-xs font-medium text-stone-500 text-center">{gift.title}</span>
          </div>
        )}

        {/* Subtle single tag if present */}
        {gift.badge && (
          <div className="absolute top-3 left-3">
            <span className="text-[11px] font-medium tracking-wide bg-stone-900/80 text-white backdrop-blur-xs px-2.5 py-1 rounded-md">
              {gift.badge}
            </span>
          </div>
        )}

        {/* Top-Right Quick Actions */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          {onOpenAICard && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenAICard();
              }}
              title="Viết thiệp mừng AI cho món quà này"
              className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-amber-700 shadow-xs flex items-center justify-center transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
            </button>
          )}

          {/* Wishlist button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist();
            }}
            title={isWishlisted ? 'Đã lưu yêu thích' : 'Lưu vào danh sách'}
            className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-stone-700 shadow-xs flex items-center justify-center transition-colors cursor-pointer"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-stone-600'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Clean Unboxed Metadata with Typographic Separators */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
            <span>{gift.categoryName}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums font-medium text-stone-700">★ {gift.rating.toFixed(1)}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums text-stone-400">({gift.reviewsCount} lời khen)</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={onOpenDetail}
            className="font-serif text-base sm:text-lg font-semibold text-stone-900 group-hover:text-stone-700 transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {gift.title}
          </h3>

          {/* Price baseline in tabular numbers */}
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-base font-bold text-stone-900 tabular-nums">
              {formatVND(gift.price)}
            </span>
            <span className="text-xs text-stone-400">giá ước tính</span>
          </div>

          {/* Short description */}
          <p className="mt-2 text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {gift.shortDesc}
          </p>

          {/* Relationship Fit Highlight */}
          {relFitDescription && (
            <div className="mt-3 p-2.5 bg-stone-50 border border-stone-200/80 rounded-lg text-[11px] text-stone-700 leading-relaxed">
              <span className="font-semibold text-stone-900">Điểm phù hợp: </span>
              <span>{relFitDescription}</span>
            </div>
          )}

          {/* Personality tags */}
          <div className="mt-3 flex flex-wrap gap-1 items-center">
            <span className="text-[11px] text-stone-400 mr-1">Hợp tính cách:</span>
            {gift.personalities.map((traitId) => {
              const trait = PERSONALITY_TRAITS.find((p) => p.id === traitId);
              return (
                <span
                  key={traitId}
                  className="text-[11px] font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded-sm"
                >
                  {trait?.label || traitId}
                </span>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
          {/* Add to collection button */}
          <button
            onClick={onOpenAddToCollection}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
              isInAnyCollection
                ? 'bg-amber-50 text-amber-900 border-amber-300'
                : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300 hover:bg-stone-50'
            }`}
          >
            {isInAnyCollection ? (
              <>
                <BookmarkCheck className="w-3.5 h-3.5 text-amber-700" />
                <span>Trong bộ sưu tập</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 text-stone-500" />
                <span>+ Bộ sưu tập</span>
              </>
            )}
          </button>

          {/* View detail trigger */}
          <button
            onClick={onOpenDetail}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-stone-900 hover:text-stone-700 transition-colors cursor-pointer"
          >
            <span>Chi tiết & Mẹo tặng</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
