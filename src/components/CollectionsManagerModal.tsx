import React, { useState } from 'react';
import { GiftCollection, GiftItem } from '../types/gift';
import { formatVND } from '../data/gifts';
import {
  X,
  Plus,
  Trash2,
  Bookmark,
  Share2,
  Check,
  FolderPlus,
  ExternalLink,
  Edit2,
  Sparkles
} from 'lucide-react';

interface CollectionsManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  collections: GiftCollection[];
  allGifts: GiftItem[];
  onCreateCollection: (name: string, description?: string) => string;
  onDeleteCollection: (id: string) => void;
  onUpdateCollection: (id: string, updates: Partial<GiftCollection>) => void;
  onRemoveGiftFromCollection: (collectionId: string, giftId: string) => void;
  onOpenGiftDetail: (gift: GiftItem) => void;
}

export const CollectionsManagerModal: React.FC<CollectionsManagerModalProps> = ({
  isOpen,
  onClose,
  collections,
  allGifts,
  onCreateCollection,
  onDeleteCollection,
  onUpdateCollection,
  onRemoveGiftFromCollection,
  onOpenGiftDetail,
}) => {
  const [selectedCollectionId, setSelectedCollectionId] = useState<string>(
    collections[0]?.id || ''
  );
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [copiedShare, setCopiedShare] = useState(false);

  if (!isOpen) return null;

  // Active collection
  const activeCollection =
    collections.find((c) => c.id === selectedCollectionId) || collections[0];

  // Resolve gifts in this collection
  const collectionGifts = activeCollection
    ? activeCollection.giftIds
        .map((id) => allGifts.find((g) => g.id === id))
        .filter((g): g is GiftItem => Boolean(g))
    : [];

  const totalBudget = collectionGifts.reduce((sum, item) => sum + item.price, 0);

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const newId = onCreateCollection(newName.trim(), newDesc.trim());
    setSelectedCollectionId(newId);
    setNewName('');
    setNewDesc('');
    setIsCreating(false);
  };

  const handleApplyPreset = (presetName: string, presetDesc: string) => {
    const newId = onCreateCollection(presetName, presetDesc);
    setSelectedCollectionId(newId);
  };

  const startEdit = () => {
    if (!activeCollection) return;
    setEditName(activeCollection.name);
    setEditDesc(activeCollection.description || '');
    setIsEditing(true);
  };

  const saveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCollection || !editName.trim()) return;
    onUpdateCollection(activeCollection.id, {
      name: editName.trim(),
      description: editDesc.trim(),
    });
    setIsEditing(false);
  };

  const copyShareableList = () => {
    if (!activeCollection) return;
    const listLines = collectionGifts
      .map((g, idx) => `${idx + 1}. ${g.title} - ${formatVND(g.price)}`)
      .join('\n');

    const shareText = `🎁 Bộ sưu tập: ${activeCollection.name}\n${
      activeCollection.description ? `Ghi chú: ${activeCollection.description}\n` : ''
    }\nDanh sách quà đề xuất:\n${listLines || '(Chưa có món quà nào)'}\n\nTổng ngân sách dự tính: ${formatVND(
      totalBudget
    )}\n(Lập từ Tâm Ý - Trợ lý quà tặng)`;

    navigator.clipboard.writeText(shareText);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl border border-stone-200 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2.5">
            <Bookmark className="w-5 h-5 text-amber-700" />
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
                Bộ sưu tập quà tặng cá nhân
              </h2>
              <p className="text-xs text-stone-500">
                Tổ chức, lên kế hoạch ngân sách và chuẩn bị quà tặng cho từng dịp
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: 2-column layout */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 min-h-0 overflow-hidden">
          {/* Left Sidebar: Collections list */}
          <div className="md:col-span-4 border-r border-stone-200 p-4 flex flex-col bg-stone-50/50 overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Danh sách ({collections.length})
              </span>
              <button
                onClick={() => setIsCreating(true)}
                className="text-xs font-semibold text-stone-900 hover:text-amber-800 inline-flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tạo mới</span>
              </button>
            </div>

            {/* Quick Presets if few collections */}
            {collections.length < 5 && (
              <div className="mb-3 p-2.5 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs">
                <span className="block font-semibold text-amber-900 mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Gợi ý tên bộ sưu tập:</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() =>
                      handleApplyPreset(
                        'Quà sinh nhật mẹ',
                        'Dành tặng mẹ yêu những món quà sức khỏe và yêu thương'
                      )
                    }
                    className="text-[11px] px-2 py-0.5 bg-white border border-amber-200 rounded text-amber-800 hover:bg-amber-100/60 cursor-pointer"
                  >
                    + Quà sinh nhật mẹ
                  </button>
                  <button
                    onClick={() =>
                      handleApplyPreset(
                        'Ý tưởng quà Giáng sinh',
                        'Danh sách quà bốc thăm và ấm áp cho mùa lễ hội'
                      )
                    }
                    className="text-[11px] px-2 py-0.5 bg-white border border-amber-200 rounded text-amber-800 hover:bg-amber-100/60 cursor-pointer"
                  >
                    + Ý tưởng Giáng sinh
                  </button>
                  <button
                    onClick={() =>
                      handleApplyPreset(
                        'Kỷ niệm 1 năm yêu nhau',
                        'Kế hoạch tạo bất ngờ lãng mạn 365 ngày'
                      )
                    }
                    className="text-[11px] px-2 py-0.5 bg-white border border-amber-200 rounded text-amber-800 hover:bg-amber-100/60 cursor-pointer"
                  >
                    + Kỷ niệm 1 năm yêu
                  </button>
                </div>
              </div>
            )}

            {/* List */}
            <div className="space-y-1.5 flex-1">
              {collections.map((col) => {
                const isSelected = activeCollection?.id === col.id;
                return (
                  <button
                    key={col.id}
                    onClick={() => {
                      setSelectedCollectionId(col.id);
                      setIsEditing(false);
                      setIsCreating(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white border-stone-400 shadow-xs'
                        : 'bg-transparent border-transparent hover:bg-stone-100/80 text-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-semibold text-xs sm:text-sm text-stone-900 truncate">
                        {col.name}
                      </span>
                      <span className="text-[11px] text-stone-400 tabular-nums">
                        {col.giftIds.length} món
                      </span>
                    </div>
                    {col.description && (
                      <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                        {col.description}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Create Form inline if isCreating */}
            {isCreating && (
              <form onSubmit={handleCreateNew} className="mt-3 p-3 bg-white border border-stone-300 rounded-xl space-y-2">
                <span className="text-xs font-bold text-stone-800 block">Tạo bộ sưu tập mới</span>
                <input
                  type="text"
                  autoFocus
                  placeholder="Tên bộ sưu tập..."
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-stone-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-stone-900"
                />
                <input
                  type="text"
                  placeholder="Mô tả hoặc ghi chú ngắn (tùy chọn)..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-stone-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-stone-900"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={!newName.trim()}
                    className="flex-1 py-1 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 disabled:opacity-50 rounded cursor-pointer"
                  >
                    Tạo
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="px-2 py-1 text-xs text-stone-600 hover:bg-stone-100 rounded cursor-pointer"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Main Area: Selected Collection Details */}
          <div className="md:col-span-8 p-6 flex flex-col overflow-y-auto">
            {activeCollection ? (
              <div className="space-y-6">
                {/* Header of Active Collection */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
                  {!isEditing ? (
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif text-xl font-bold text-stone-900">
                          {activeCollection.name}
                        </h3>
                        <button
                          onClick={startEdit}
                          title="Sửa tên / mô tả"
                          className="p-1 text-stone-400 hover:text-stone-700 rounded transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {activeCollection.description && (
                        <p className="text-xs text-stone-600 mt-1">
                          {activeCollection.description}
                        </p>
                      )}
                    </div>
                  ) : (
                    <form onSubmit={saveEdit} className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-sm font-semibold border border-stone-300 rounded-md"
                      />
                      <input
                        type="text"
                        value={editDesc}
                        onChange={(e) => setEditDesc(e.target.value)}
                        placeholder="Mô tả..."
                        className="w-full px-2.5 py-1 text-xs border border-stone-300 rounded-md"
                      />
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="px-3 py-1 text-xs font-semibold bg-stone-900 text-white rounded cursor-pointer"
                        >
                          Lưu
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="px-2 py-1 text-xs text-stone-500 rounded cursor-pointer"
                        >
                          Hủy
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Actions & Budget Pill */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={copyShareableList}
                      className="px-3 py-1.5 text-xs font-medium bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      {copiedShare ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Đã sao chép!</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3.5 h-3.5 text-stone-500" />
                          <span>Sao chép danh sách</span>
                        </>
                      )}
                    </button>

                    {collections.length > 1 && (
                      <button
                        onClick={() => {
                          if (
                            confirm(`Bạn có chắc chắn muốn xóa bộ sưu tập "${activeCollection.name}"?`)
                          ) {
                            onDeleteCollection(activeCollection.id);
                          }
                        }}
                        title="Xóa bộ sưu tập"
                        className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* KPI Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 bg-stone-50 border border-stone-200 rounded-xl">
                  <div>
                    <span className="block text-[11px] text-stone-500">Số lượng món quà</span>
                    <span className="text-base font-bold text-stone-900 tabular-nums">
                      {collectionGifts.length} món
                    </span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-stone-500">Tổng ngân sách dự tính</span>
                    <span className="text-base font-bold text-stone-900 tabular-nums">
                      {formatVND(totalBudget)}
                    </span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="block text-[11px] text-stone-500">Mức giá trung bình</span>
                    <span className="text-base font-bold text-stone-900 tabular-nums">
                      {collectionGifts.length > 0
                        ? formatVND(Math.round(totalBudget / collectionGifts.length))
                        : '0 ₫'}
                    </span>
                  </div>
                </div>

                {/* Gifts in collection */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">
                    Các món quà đã chọn:
                  </h4>

                  {collectionGifts.length === 0 ? (
                    <div className="text-center py-12 px-4 border border-dashed border-stone-300 rounded-xl bg-stone-50/50">
                      <Bookmark className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-stone-700">
                        Chưa có món quà nào trong bộ sưu tập này
                      </p>
                      <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                        Hãy duyệt danh mục quà tặng bên ngoài và nhấn nút "+ Bộ sưu tập" trên từng món để đưa vào đây.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {collectionGifts.map((gift) => (
                        <div
                          key={gift.id}
                          className="flex items-center justify-between gap-4 p-3.5 bg-white border border-stone-200 rounded-xl hover:border-stone-300 transition-all shadow-2xs"
                        >
                          <div
                            onClick={() => onOpenGiftDetail(gift)}
                            className="flex items-center gap-3.5 min-w-0 cursor-pointer flex-1"
                          >
                            <img
                              src={gift.image}
                              alt={gift.title}
                              className="w-14 h-14 rounded-lg object-cover border border-stone-200 shrink-0"
                            />
                            <div className="min-w-0">
                              <h5 className="text-sm font-semibold text-stone-900 hover:text-stone-700 truncate">
                                {gift.title}
                              </h5>
                              <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                                <span>{gift.categoryName}</span>
                                <span aria-hidden="true">·</span>
                                <span className="font-bold text-stone-900 tabular-nums">
                                  {formatVND(gift.price)}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Item actions */}
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => onOpenGiftDetail(gift)}
                              className="p-1.5 text-stone-500 hover:text-stone-900 rounded-md hover:bg-stone-100 transition-colors cursor-pointer"
                              title="Xem chi tiết & Mẹo tặng"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                onRemoveGiftFromCollection(activeCollection.id, gift.id)
                              }
                              className="p-1.5 text-stone-400 hover:text-rose-600 rounded-md hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Xóa khỏi bộ sưu tập này"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-stone-500 text-sm">
                Hãy chọn hoặc tạo một bộ sưu tập từ cột bên trái.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
