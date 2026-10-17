import React from 'react';
import { CATEGORIES, OCCASIONS, BUDGET_PRESETS, formatVND } from '../data/gifts';
import { FilterState, HobbyCategory, OccasionType } from '../types/gift';
import { Search, RotateCcw, Filter, SlidersHorizontal } from 'lucide-react';

interface FilterBarProps {
  filter: FilterState;
  onChangeFilter: (updates: Partial<FilterState>) => void;
  onResetFilter: () => void;
  totalFilteredCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  onChangeFilter,
  onResetFilter,
  totalFilteredCount,
}) => {
  const toggleHobby = (hobby: HobbyCategory) => {
    if (filter.hobbies.includes(hobby)) {
      onChangeFilter({ hobbies: filter.hobbies.filter((h) => h !== hobby) });
    } else {
      onChangeFilter({ hobbies: [...filter.hobbies, hobby] });
    }
  };

  const isFilterActive =
    filter.occasion !== 'all' ||
    filter.hobbies.length > 0 ||
    filter.minPrice > 0 ||
    filter.maxPrice < 10000000 ||
    filter.searchQuery.trim().length > 0;

  return (
    <div className="w-full bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-5">
      {/* Search and Sort row */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo tên quà, sở thích, chất liệu (VD: bạc 925, gốm, nến thơm, cafe...)"
            value={filter.searchQuery}
            onChange={(e) => onChangeFilter({ searchQuery: e.target.value })}
            className="w-full pl-10 pr-4 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-stone-900 focus:bg-white transition-all text-stone-900 placeholder:text-stone-400"
          />
        </div>

        {/* Occasion Dropdown */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
          <div className="w-full sm:w-auto">
            <select
              value={filter.occasion}
              onChange={(e) => onChangeFilter({ occasion: e.target.value as OccasionType | 'all' })}
              className="w-full sm:w-56 px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-800 focus:outline-hidden focus:ring-1 focus:ring-stone-900 cursor-pointer"
            >
              <option value="all">Tất cả các dịp kỷ niệm</option>
              {OCCASIONS.map((occ) => (
                <option key={occ.id} value={occ.id}>
                  {occ.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="w-full sm:w-auto">
            <select
              value={filter.sortBy}
              onChange={(e) => onChangeFilter({ sortBy: e.target.value as FilterState['sortBy'] })}
              className="w-full sm:w-44 px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-800 focus:outline-hidden focus:ring-1 focus:ring-stone-900 cursor-pointer"
            >
              <option value="recommended">Gợi ý nổi bật</option>
              <option value="price_asc">Giá: Thấp đến cao</option>
              <option value="price_desc">Giá: Cao đến thấp</option>
              <option value="rating">Đánh giá cao nhất</option>
            </select>
          </div>

          {isFilterActive && (
            <button
              onClick={onResetFilter}
              title="Đặt lại toàn bộ lọc"
              className="px-3 py-2 text-xs text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Đặt lại</span>
            </button>
          )}
        </div>
      </div>

      {/* Hobbies / Categories */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-stone-600 uppercase tracking-wider">
            Sở thích & Phong cách sống:
          </span>
          {filter.hobbies.length > 0 && (
            <button
              onClick={() => onChangeFilter({ hobbies: [] })}
              className="text-xs text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              Bỏ chọn ({filter.hobbies.length})
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const isSelected = filter.hobbies.includes(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => toggleHobby(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-stone-900 text-white border-stone-900 shadow-2xs'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Budget Filter */}
      <div className="pt-2 border-t border-stone-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
          <span className="text-xs font-semibold text-stone-600 uppercase tracking-wider">
            Mức ngân sách dự kiến:
          </span>
          <span className="text-xs text-stone-800 font-medium tabular-nums">
            Khoảng: {formatVND(filter.minPrice)} – {filter.maxPrice >= 10000000 ? 'Không giới hạn' : formatVND(filter.maxPrice)}
          </span>
        </div>

        {/* Budget preset quick buttons */}
        <div className="flex flex-wrap gap-2 items-center">
          {BUDGET_PRESETS.map((preset, idx) => {
            const isMatch = filter.minPrice === preset.min && filter.maxPrice === preset.max;
            return (
              <button
                key={idx}
                onClick={() => {
                  if (isMatch) {
                    onChangeFilter({ minPrice: 0, maxPrice: 10000000 });
                  } else {
                    onChangeFilter({ minPrice: preset.min, maxPrice: preset.max });
                  }
                }}
                className={`px-3 py-1 text-xs font-medium rounded-md border transition-all cursor-pointer whitespace-nowrap ${
                  isMatch
                    ? 'bg-amber-100 text-amber-900 border-amber-300 font-semibold shadow-2xs'
                    : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
          {(filter.minPrice > 0 || filter.maxPrice < 10000000) && (
            <button
              onClick={() => onChangeFilter({ minPrice: 0, maxPrice: 10000000 })}
              className="text-xs text-stone-400 hover:text-stone-700 px-2 py-1 cursor-pointer"
            >
              Mặc định
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
