import React from 'react';
import { RELATIONSHIPS } from '../data/gifts';
import { RelationshipCategory } from '../types/gift';
import { Heart, Users, Home, Briefcase, Sparkles } from 'lucide-react';

interface RelationshipSelectorProps {
  selectedRelationship: RelationshipCategory;
  onSelect: (rel: RelationshipCategory) => void;
  countByRelationship: Record<string, number>;
}

export const RelationshipSelector: React.FC<RelationshipSelectorProps> = ({
  selectedRelationship,
  onSelect,
  countByRelationship,
}) => {
  const getIcon = (id: RelationshipCategory) => {
    switch (id) {
      case 'lover':
        return <Heart className="w-4 h-4 text-rose-500" />;
      case 'bestfriend':
        return <Users className="w-4 h-4 text-amber-500" />;
      case 'family':
        return <Home className="w-4 h-4 text-emerald-600" />;
      case 'coworker':
        return <Briefcase className="w-4 h-4 text-indigo-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-stone-500" />;
    }
  };

  const currentOption = RELATIONSHIPS.find((r) => r.id === selectedRelationship);

  return (
    <div className="w-full">
      {/* Category selector row */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-stone-200/70 rounded-xl border border-stone-300/80">
        <button
          onClick={() => onSelect('all')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
            selectedRelationship === 'all'
              ? 'bg-white text-stone-900 shadow-xs font-semibold'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/50'
          }`}
        >
          {getIcon('all')}
          <span>Tất cả mối quan hệ</span>
          <span className="text-xs text-stone-400 tabular-nums">({countByRelationship['all'] || 0})</span>
        </button>

        {RELATIONSHIPS.map((rel) => {
          const isSelected = selectedRelationship === rel.id;
          const count = countByRelationship[rel.id] || 0;

          return (
            <button
              key={rel.id}
              onClick={() => onSelect(rel.id)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                isSelected
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/50'
              }`}
            >
              {getIcon(rel.id)}
              <span>{rel.label}</span>
              <span className="text-xs text-stone-400 tabular-nums">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Relationship context banner */}
      {currentOption && (
        <div className="mt-3 p-4 bg-white border border-stone-200 rounded-xl shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-2 mb-2">
            <div className="flex items-center gap-2">
              {getIcon(currentOption.id)}
              <h3 className="text-sm font-semibold text-stone-900">
                {currentOption.label} · {currentOption.focusTone}
              </h3>
            </div>
            <span className="text-xs text-stone-500 italic">
              Đặc điểm tâm lý cần lưu ý khi tặng
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            {currentOption.shortDesc}{' '}
            <span className="text-stone-500 font-normal">
              {currentOption.detailAdvice}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};
