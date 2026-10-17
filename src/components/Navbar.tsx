import React from 'react';
import { Gift, Bookmark, Sparkles, Compass, Calendar, Plus } from 'lucide-react';

interface NavbarProps {
  onOpenCollections: () => void;
  onOpenQuiz: () => void;
  onOpenAI: () => void;
  onOpenAnniversary: () => void;
  collectionsCount: number;
  totalSavedGifts: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCollections,
  onOpenQuiz,
  onOpenAI,
  onOpenAnniversary,
  collectionsCount,
  totalSavedGifts,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-stone-50/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <a href="#" className="flex items-center gap-2 group whitespace-nowrap shrink-0">
            <span className="w-8 h-8 rounded-lg bg-stone-900 text-stone-100 flex items-center justify-center font-serif text-lg font-bold shadow-xs">
              Ý
            </span>
            <span className="font-serif text-2xl font-bold tracking-tight text-stone-900 group-hover:text-stone-700 transition-colors">
              Tâm Ý
            </span>
          </a>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
            <a
              href="#catalog"
              className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
            >
              Gợi ý quà tặng
            </a>
            <button
              onClick={onOpenCollections}
              className="flex items-center gap-1.5 hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Bookmark className="w-4 h-4 text-stone-500" />
              <span>Bộ sưu tập ({collectionsCount})</span>
            </button>
            <button
              onClick={onOpenQuiz}
              className="flex items-center gap-1.5 hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-stone-500" />
              <span>Trắc nghiệm 30s</span>
            </button>
            <button
              onClick={onOpenAI}
              className="flex items-center gap-1.5 hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Trợ lý AI & Thiệp</span>
            </button>
            <button
              onClick={onOpenAnniversary}
              className="flex items-center gap-1.5 hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-stone-500" />
              <span>Góc Kỷ niệm</span>
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenCollections}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-stone-900 bg-stone-200/80 hover:bg-stone-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Bộ sưu tập ({totalSavedGifts} món)</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
