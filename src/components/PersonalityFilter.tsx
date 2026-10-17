import React from 'react';
import { PERSONALITY_TRAITS } from '../data/gifts';
import { PersonalityTrait } from '../types/gift';
import { Check, X, UserCheck, HelpCircle } from 'lucide-react';

interface PersonalityFilterProps {
  selectedPersonalities: PersonalityTrait[];
  onTogglePersonality: (trait: PersonalityTrait) => void;
  onClearPersonalities: () => void;
}

export const PersonalityFilter: React.FC<PersonalityFilterProps> = ({
  selectedPersonalities,
  onTogglePersonality,
  onClearPersonalities,
}) => {
  // Aggregate recommended types from selected personalities
  const activeTraitObjects = PERSONALITY_TRAITS.filter((p) =>
    selectedPersonalities.includes(p.id)
  );

  return (
    <div className="w-full bg-stone-50 border border-stone-200 rounded-xl p-4">
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-stone-700" />
          <h4 className="text-xs sm:text-sm font-semibold text-stone-900">
            Lọc theo tính cách người nhận (Chọn một hoặc nhiều)
          </h4>
        </div>
        {selectedPersonalities.length > 0 && (
          <button
            onClick={onClearPersonalities}
            className="text-xs text-stone-500 hover:text-stone-900 inline-flex items-center gap-1 cursor-pointer transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span>Bỏ chọn ({selectedPersonalities.length})</span>
          </button>
        )}
      </div>

      {/* Trait selector buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {PERSONALITY_TRAITS.map((trait) => {
          const isSelected = selectedPersonalities.includes(trait.id);

          return (
            <button
              key={trait.id}
              onClick={() => onTogglePersonality(trait.id)}
              className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer relative ${
                isSelected
                  ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400 hover:bg-stone-100/60'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-xs font-semibold">{trait.label}</span>
                {isSelected ? (
                  <Check className="w-3.5 h-3.5 text-white shrink-0" />
                ) : (
                  <span className="w-3 h-3 rounded-full border border-stone-300 shrink-0" />
                )}
              </div>
              <p
                className={`text-[11px] line-clamp-1 ${
                  isSelected ? 'text-stone-300' : 'text-stone-500'
                }`}
                title={trait.tagline}
              >
                {trait.tagline}
              </p>
            </button>
          );
        })}
      </div>

      {/* Dynamic guidance based on selected personality traits */}
      {activeTraitObjects.length > 0 && (
        <div className="mt-3 pt-3 border-t border-stone-200 text-xs text-stone-600 bg-white/70 p-3 rounded-lg">
          <div className="font-semibold text-stone-900 mb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>
              Đề xuất loại quà phù hợp với nét tính cách{' '}
              {activeTraitObjects.map((t) => `"${t.label}"`).join(' & ')}:
            </span>
          </div>
          <ul className="space-y-1 list-disc list-inside text-stone-600 pl-1">
            {activeTraitObjects.map((t) => (
              <li key={t.id}>
                <strong className="text-stone-800">{t.label}:</strong> {t.recommendedTypes}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
