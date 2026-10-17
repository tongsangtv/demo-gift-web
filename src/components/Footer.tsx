import React from 'react';
import { RELATIONSHIPS } from '../data/gifts';
import { RelationshipCategory } from '../types/gift';

interface FooterProps {
  onSelectRelationship: (rel: RelationshipCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectRelationship }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 py-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-stone-800">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-lg bg-stone-100 text-stone-900 flex items-center justify-center font-serif text-lg font-bold">
                Ý
              </span>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Tâm Ý
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Nền tảng cố vấn quà tặng thông minh, giúp bạn chọn được món quà chuẩn sở thích, phù hợp ngân sách và trao gửi trọn vẹn tình cảm trong từng dịp kỷ niệm.
            </p>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200 mb-3">
              Mối quan hệ
            </h4>
            <ul className="space-y-2 text-xs">
              {RELATIONSHIPS.map((rel) => (
                <li key={rel.id}>
                  <button
                    onClick={() => {
                      onSelectRelationship(rel.id);
                      const el = document.getElementById('catalog');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {rel.label} ({rel.focusTone})
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200 mb-3">
              Triết lý trao quà
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              "Giá trị của món quà không nằm ở con số trên hóa đơn, mà ở thời gian và sự thấu hiểu bạn dành riêng cho người nhận."
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 Tâm Ý. Mọi thông điệp và gợi ý được thiết kế với sự trân trọng cảm xúc con người.</p>
          <div className="flex items-center gap-4">
            <span>Tiếng Việt</span>
            <span aria-hidden="true">·</span>
            <span>Đơn vị tiền tệ: VNĐ</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
