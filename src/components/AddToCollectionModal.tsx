import React, { useState } from 'react';
import { GiftItem, GiftCollection } from '../types/gift';
import { X, Plus, Check, Bookmark, FolderPlus } from 'lucide-react';

interface AddToCollectionModalProps {
  gift: GiftItem | null;
  isOpen: boolean;
  onClose: () => void;
  collections: GiftCollection[];
  onToggleGiftInCollection: (collectionId: string, giftId: string) => void;
  onCreateCollection: (name: string, description?: string) => string;
}

export const AddToCollectionModal: React.FC<AddToCollectionModalProps> = ({
  gift,
  isOpen,
  onClose,
  collections,
  onToggleGiftInCollection,
  onCreateCollection,
}) => {
  const [newCollectionName, setNewCollectionName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  if (!isOpen || !gift) return null;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollectionName.trim()) return;
    const newId = onCreateCollection(newCollectionName.trim());
    onToggleGiftInCollection(newId, gift.id);
    setNewCollectionName('');
    setIsCreating(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-2xl border border-stone-200 shadow-xl overflow-hidden p-6 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-600" />
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Thêm vào bộ sưu tập
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gift Preview */}
        <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl mb-4 border border-stone-100">
          <img
            src={gift.image}
            alt={gift.title}
            className="w-12 h-12 rounded-lg object-cover border border-stone-200"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-semibold text-stone-900 truncate">
              {gift.title}
            </h4>
            <p className="text-[11px] text-stone-500">{gift.categoryName}</p>
          </div>
        </div>

        {/* Collections List */}
        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {collections.length === 0 ? (
            <p className="text-xs text-stone-500 text-center py-4">
              Bạn chưa có bộ sưu tập nào. Hãy tạo bộ sưu tập đầu tiên bên dưới!
            </p>
          ) : (
            collections.map((col) => {
              const isIncluded = col.giftIds.includes(gift.id);

              return (
                <button
                  key={col.id}
                  onClick={() => onToggleGiftInCollection(col.id, gift.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isIncluded
                      ? 'bg-amber-50/80 border-amber-300 text-amber-950 font-medium'
                      : 'bg-white border-stone-200 hover:border-stone-300 text-stone-700'
                  }`}
                >
                  <div>
                    <span className="text-sm font-semibold">{col.name}</span>
                    <span className="block text-[11px] text-stone-500">
                      {col.giftIds.length} món quà
                    </span>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                      isIncluded
                        ? 'bg-amber-600 border-amber-600 text-white'
                        : 'border-stone-300 bg-white'
                    }`}
                  >
                    {isIncluded && <Check className="w-3.5 h-3.5" />}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Create new collection trigger / form */}
        <div className="mt-4 pt-4 border-t border-stone-100">
          {!isCreating ? (
            <button
              onClick={() => setIsCreating(true)}
              className="w-full py-2.5 px-3 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <FolderPlus className="w-4 h-4 text-stone-600" />
              <span>Tạo bộ sưu tập mới</span>
            </button>
          ) : (
            <form onSubmit={handleCreate} className="space-y-2">
              <input
                type="text"
                autoFocus
                placeholder="VD: Quà sinh nhật mẹ, Kỷ niệm 1 năm..."
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-stone-900"
              />
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={!newCollectionName.trim()}
                  className="flex-1 py-1.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 disabled:opacity-50 rounded-lg cursor-pointer"
                >
                  Tạo & Thêm ngay
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-3 py-1.5 text-xs text-stone-600 hover:bg-stone-100 rounded-lg cursor-pointer"
                >
                  Hủy
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Done Button */}
        <div className="mt-4">
          <button
            onClick={onClose}
            className="w-full py-2 text-xs font-semibold text-stone-900 bg-stone-200 hover:bg-stone-300 rounded-xl transition-colors cursor-pointer"
          >
            Xong
          </button>
        </div>
      </div>
    </div>
  );
};
