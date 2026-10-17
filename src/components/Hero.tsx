import React from 'react';
import { HERO_IMAGE, RELATIONSHIPS } from '../data/gifts';
import { RelationshipCategory } from '../types/gift';
import { Compass, Sparkles, HeartHandshake } from 'lucide-react';

interface HeroProps {
  onSelectRelationship: (rel: RelationshipCategory) => void;
  onOpenQuiz: () => void;
  onOpenAI: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSelectRelationship,
  onOpenQuiz,
  onOpenAI,
}) => {
  return (
    <section className="relative overflow-hidden bg-stone-100/60 border-b border-stone-200 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Typography */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs font-medium text-stone-500 mb-3 tracking-wide">
              <span>Nghệ thuật trao quà</span>
              <span aria-hidden="true">·</span>
              <span>Thấu hiểu tâm lý</span>
              <span aria-hidden="true">·</span>
              <span>Độc bản ý nghĩa</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-900 leading-[1.15] text-balance">
              Món quà đúng người, đúng dịp, vẹn tròn tâm ý.
            </h1>

            <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
              Đề xuất quà tặng được tuyển chọn theo từng mối quan hệ: người yêu, bạn thân, gia đình và đồng nghiệp — kết hợp lọc theo tính cách, sở thích và ngân sách chính xác.
            </p>

            {/* Quick Relationship Shortcut Buttons */}
            <div className="mt-6">
              <span className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                Chọn nhanh đối tượng nhận quà:
              </span>
              <div className="flex flex-wrap gap-2">
                {RELATIONSHIPS.map((rel) => (
                  <button
                    key={rel.id}
                    onClick={() => {
                      onSelectRelationship(rel.id);
                      const el = document.getElementById('catalog');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-3.5 py-1.5 text-xs font-medium bg-white hover:bg-stone-200/90 text-stone-800 border border-stone-300 rounded-lg shadow-2xs transition-colors cursor-pointer"
                  >
                    {rel.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#catalog"
                className="px-5 py-2.5 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-2 shadow-xs"
              >
                <span>Xem danh mục quà</span>
              </a>
              <button
                onClick={onOpenQuiz}
                className="px-4 py-2.5 text-sm font-semibold text-stone-800 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-2 shadow-2xs"
              >
                <Compass className="w-4 h-4 text-stone-600" />
                <span>Trắc nghiệm 30s</span>
              </button>
              <button
                onClick={onOpenAI}
                className="px-4 py-2.5 text-sm font-semibold text-stone-900 bg-amber-100 hover:bg-amber-200/80 border border-amber-300 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-2 shadow-2xs"
              >
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>Nhờ AI gợi ý riêng</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-200 shadow-sm aspect-16/10 lg:aspect-4/3">
              <img
                src={HERO_IMAGE}
                alt="Gói quà tặng tinh tế và ấm áp"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="font-serif text-lg font-semibold leading-tight">
                  "Không có món quà nào nhỏ bé khi được trao đi bằng cả tấm lòng."
                </p>
                <p className="text-xs text-stone-200 mt-1">
                  Đính kèm thiệp thư tay & mẹo tạo bất ngờ trong từng gợi ý
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
