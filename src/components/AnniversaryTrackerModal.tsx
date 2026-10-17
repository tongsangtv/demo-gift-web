import React, { useState } from 'react';
import { AnniversaryEvent, RelationshipCategory } from '../types/gift';
import { RELATIONSHIPS, formatVND } from '../data/gifts';
import { X, Calendar, Plus, Trash2, Clock, Sparkles, CheckCircle2 } from 'lucide-react';

interface AnniversaryTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: AnniversaryEvent[];
  onAddEvent: (event: Omit<AnniversaryEvent, 'id'>) => void;
  onDeleteEvent: (id: string) => void;
}

export const AnniversaryTrackerModal: React.FC<AnniversaryTrackerModalProps> = ({
  isOpen,
  onClose,
  events,
  onAddEvent,
  onDeleteEvent,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [relationship, setRelationship] = useState<RelationshipCategory>('lover');
  const [targetPerson, setTargetPerson] = useState('');
  const [plannedBudget, setPlannedBudget] = useState('1000000');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date) return;

    onAddEvent({
      title: title.trim(),
      date,
      relationship,
      targetPerson: targetPerson.trim() || 'Người thân yêu',
      plannedBudget: Number(plannedBudget) || undefined,
      notes: notes.trim(),
    });

    setTitle('');
    setDate('');
    setNotes('');
    setIsAdding(false);
  };

  const getDaysRemaining = (targetDateStr: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(targetDateStr);
    target.setHours(0, 0, 0, 0);

    const diffMs = target.getTime() - today.getTime();
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl border border-stone-200 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-rose-600" />
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
                Góc Kỷ Niệm & Đếm Ngược Ngày Đặc Biệt
              </h2>
              <p className="text-xs text-stone-500">
                Nhắc nhở thời gian chuẩn bị quà chu đáo, không còn cảnh sát giờ mới vội vã
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
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Top Control Bar */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Sự kiện sắp tới ({events.length})
            </span>
            {!isAdding && (
              <button
                onClick={() => setIsAdding(true)}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm ngày kỷ niệm</span>
              </button>
            )}
          </div>

          {/* Add Form */}
          {isAdding && (
            <form onSubmit={handleSubmit} className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-3">
              <h3 className="text-xs font-bold text-stone-900">Lên lịch ngày kỷ niệm mới</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Tên sự kiện / Dịp
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Kỷ niệm 1 năm yêu nhau, Sinh nhật mẹ..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Ngày diễn ra
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Mối quan hệ
                  </label>
                  <select
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value as RelationshipCategory)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-md"
                  >
                    {RELATIONSHIPS.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Người nhận quà
                  </label>
                  <input
                    type="text"
                    placeholder="VD: Bé Thảo, Mẹ, Bạn Nam..."
                    value={targetPerson}
                    onChange={(e) => setTargetPerson(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Dự trù ngân sách (VNĐ)
                  </label>
                  <input
                    type="number"
                    step="50000"
                    value={plannedBudget}
                    onChange={(e) => setPlannedBudget(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Ghi chú thêm
                  </label>
                  <input
                    type="text"
                    placeholder="VD: Nhớ đặt nhà hàng trước 1 tuần..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-md"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-stone-900 rounded-md hover:bg-stone-800 cursor-pointer"
                >
                  Lưu sự kiện
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-3 py-1.5 text-xs text-stone-600 hover:bg-stone-200 rounded-md cursor-pointer"
                >
                  Hủy
                </button>
              </div>
            </form>
          )}

          {/* List of Events */}
          {events.length === 0 ? (
            <div className="text-center py-12 px-4 border border-dashed border-stone-300 rounded-xl bg-stone-50/50">
              <Calendar className="w-8 h-8 text-stone-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-stone-700">
                Chưa có ngày kỷ niệm nào được lưu
              </p>
              <p className="text-xs text-stone-500 mt-1">
                Thêm ngày sinh nhật của người thương, bạn thân hoặc ngày cưới của bố mẹ để Tâm Ý nhắc nhở bạn!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {events.map((ev) => {
                const days = getDaysRemaining(ev.date);
                const isPast = days < 0;
                const isToday = days === 0;

                return (
                  <div
                    key={ev.id}
                    className="p-4 bg-white border border-stone-200 rounded-xl shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-medium px-2 py-0.5 bg-stone-100 rounded text-stone-700">
                          {RELATIONSHIPS.find((r) => r.id === ev.relationship)?.label}
                        </span>
                        <span className="text-xs text-stone-400">Dành cho {ev.targetPerson}</span>
                      </div>
                      <h4 className="font-serif text-base font-bold text-stone-900">
                        {ev.title}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-stone-500 mt-1">
                        <span>Ngày: {ev.date}</span>
                        {ev.plannedBudget && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>Ngân sách: {formatVND(ev.plannedBudget)}</span>
                          </>
                        )}
                      </div>
                      {ev.notes && (
                        <p className="text-[11px] text-stone-600 mt-1 italic">
                          "{ev.notes}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                      <div className="text-right">
                        {isToday ? (
                          <span className="text-sm font-bold text-rose-600">
                            🎉 Hôm nay!
                          </span>
                        ) : isPast ? (
                          <span className="text-xs text-stone-400">Đã qua ({Math.abs(days)} ngày trước)</span>
                        ) : (
                          <div>
                            <span className="text-xs text-stone-500">Còn lại: </span>
                            <span className="text-base font-bold text-amber-700 tabular-nums">
                              {days} ngày
                            </span>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => onDeleteEvent(ev.id)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 rounded-md hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Xóa sự kiện"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Planning Advice Strip */}
          <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-stone-500" />
              <span>Gợi ý mốc chuẩn bị quà lý tưởng:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-stone-600">
              <div className="p-2.5 bg-white rounded-lg border border-stone-200">
                <strong className="block text-stone-900 mb-0.5">Trước 14 - 20 ngày:</strong>
                Thời điểm vàng để đặt các món quà khắc tên riêng, nhẫn đôi hoặc vẽ tranh thủ công.
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-stone-200">
                <strong className="block text-stone-900 mb-0.5">Trước 5 - 7 ngày:</strong>
                Chốt món quà, đặt hàng giao hỏa tốc hoặc liên hệ đặt lịch trước cho các buổi workshop/du thuyền.
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-stone-200">
                <strong className="block text-stone-900 mb-0.5">Trước 1 - 2 ngày:</strong>
                Tự tay nắn nót viết thiệp chúc mừng và chuẩn bị kịch bản tạo bất ngờ khi trao quà.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
