import React, { useState, useEffect, useMemo } from 'react';
import {
  GiftItem,
  FilterState,
  RelationshipCategory,
  PersonalityTrait,
  GiftCollection,
  AnniversaryEvent,
} from './types/gift';
import {
  GIFTS_DATABASE,
  DEFAULT_COLLECTIONS,
  RELATIONSHIPS,
  PERSONALITY_TRAITS,
} from './data/gifts';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RelationshipSelector } from './components/RelationshipSelector';
import { PersonalityFilter } from './components/PersonalityFilter';
import { FilterBar } from './components/FilterBar';
import { GiftCard } from './components/GiftCard';
import { GiftDetailModal } from './components/GiftDetailModal';
import { AddToCollectionModal } from './components/AddToCollectionModal';
import { CollectionsManagerModal } from './components/CollectionsManagerModal';
import { AIAssistantModal } from './components/AIAssistantModal';
import { GiftQuizModal } from './components/GiftQuizModal';
import { AnniversaryTrackerModal } from './components/AnniversaryTrackerModal';
import { Footer } from './components/Footer';
import { RotateCcw, Sparkles, Filter, Bookmark, Heart } from 'lucide-react';

const INITIAL_FILTER: FilterState = {
  relationship: 'all',
  personalities: [],
  occasion: 'all',
  hobbies: [],
  minPrice: 0,
  maxPrice: 10000000,
  searchQuery: '',
  sortBy: 'recommended',
};

const DEFAULT_ANNIVERSARY_EVENTS: AnniversaryEvent[] = [
  {
    id: 'ev-1',
    title: 'Kỷ niệm 1 năm ngày chính thức yêu nhau',
    date: '2026-11-14',
    relationship: 'lover',
    targetPerson: 'Người yêu',
    plannedBudget: 1800000,
    notes: 'Đặt nhà hàng trước 1 tuần và viết thiệp tay lãng mạn',
  },
  {
    id: 'ev-2',
    title: 'Sinh nhật mẹ yêu tròn 52 tuổi',
    date: '2026-12-05',
    relationship: 'family',
    targetPerson: 'Mẹ',
    plannedBudget: 1500000,
    notes: 'Tặng trà thảo mộc dưỡng sinh và hoa tươi',
  },
];

export default function App() {
  // Collections persistent state
  const [collections, setCollections] = useState<GiftCollection[]>(() => {
    try {
      const saved = localStorage.getItem('tamy_collections');
      return saved ? JSON.parse(saved) : DEFAULT_COLLECTIONS;
    } catch {
      return DEFAULT_COLLECTIONS;
    }
  });

  // Wishlist persistent state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tamy_wishlist');
      return saved ? JSON.parse(saved) : ['gift-1', 'gift-2'];
    } catch {
      return ['gift-1', 'gift-2'];
    }
  });

  // Anniversary events persistent state
  const [events, setEvents] = useState<AnniversaryEvent[]>(() => {
    try {
      const saved = localStorage.getItem('tamy_anniversaries');
      return saved ? JSON.parse(saved) : DEFAULT_ANNIVERSARY_EVENTS;
    } catch {
      return DEFAULT_ANNIVERSARY_EVENTS;
    }
  });

  // Filters state
  const [filter, setFilter] = useState<FilterState>(INITIAL_FILTER);

  // Modals state
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isAnniversaryOpen, setIsAnniversaryOpen] = useState(false);
  const [detailGift, setDetailGift] = useState<GiftItem | null>(null);
  const [addToColGift, setAddToColGift] = useState<GiftItem | null>(null);
  const [aiCardGift, setAiCardGift] = useState<GiftItem | null>(null);

  // Save collections to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tamy_collections', JSON.stringify(collections));
    } catch (e) {
      console.error(e);
    }
  }, [collections]);

  // Save wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tamy_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Save anniversaries to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tamy_anniversaries', JSON.stringify(events));
    } catch (e) {
      console.error(e);
    }
  }, [events]);

  // Wishlist toggle
  const toggleWishlist = (giftId: string) => {
    setWishlist((prev) =>
      prev.includes(giftId) ? prev.filter((id) => id !== giftId) : [...prev, giftId]
    );
  };

  // Collection management handlers
  const handleCreateCollection = (name: string, description?: string): string => {
    const newCol: GiftCollection = {
      id: `col-${Date.now()}`,
      name,
      description,
      giftIds: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setCollections((prev) => [newCol, ...prev]);
    return newCol.id;
  };

  const handleDeleteCollection = (id: string) => {
    setCollections((prev) => prev.filter((c) => c.id !== id));
  };

  const handleUpdateCollection = (id: string, updates: Partial<GiftCollection>) => {
    setCollections((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
      )
    );
  };

  const handleToggleGiftInCollection = (collectionId: string, giftId: string) => {
    setCollections((prev) =>
      prev.map((col) => {
        if (col.id === collectionId) {
          const exists = col.giftIds.includes(giftId);
          const nextGiftIds = exists
            ? col.giftIds.filter((id) => id !== giftId)
            : [...col.giftIds, giftId];
          return { ...col, giftIds: nextGiftIds, updatedAt: new Date().toISOString() };
        }
        return col;
      })
    );
  };

  const handleRemoveGiftFromCollection = (collectionId: string, giftId: string) => {
    setCollections((prev) =>
      prev.map((col) => {
        if (col.id === collectionId) {
          return {
            ...col,
            giftIds: col.giftIds.filter((id) => id !== giftId),
            updatedAt: new Date().toISOString(),
          };
        }
        return col;
      })
    );
  };

  // Anniversary handlers
  const handleAddEvent = (newEvent: Omit<AnniversaryEvent, 'id'>) => {
    const item: AnniversaryEvent = {
      ...newEvent,
      id: `ev-${Date.now()}`,
    };
    setEvents((prev) => [item, ...prev]);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  // Filter updates
  const updateFilter = (updates: Partial<FilterState>) => {
    setFilter((prev) => ({ ...prev, ...updates }));
  };

  const resetFilter = () => {
    setFilter(INITIAL_FILTER);
  };

  const togglePersonality = (trait: PersonalityTrait) => {
    setFilter((prev) => {
      const exists = prev.personalities.includes(trait);
      return {
        ...prev,
        personalities: exists
          ? prev.personalities.filter((p) => p !== trait)
          : [...prev.personalities, trait],
      };
    });
  };

  const clearPersonalities = () => {
    setFilter((prev) => ({ ...prev, personalities: [] }));
  };

  // Calculate gift counts per relationship category for the navigation badges
  const countByRelationship = useMemo(() => {
    const counts: Record<string, number> = {
      all: GIFTS_DATABASE.length,
      lover: 0,
      bestfriend: 0,
      family: 0,
      coworker: 0,
    };
    GIFTS_DATABASE.forEach((gift) => {
      gift.relationships.forEach((rel) => {
        if (counts[rel] !== undefined) counts[rel]++;
      });
    });
    return counts;
  }, []);

  // Filtered and Sorted Gifts
  const filteredGifts = useMemo(() => {
    return GIFTS_DATABASE.filter((gift) => {
      // Relationship filter
      if (
        filter.relationship !== 'all' &&
        !gift.relationships.includes(filter.relationship)
      ) {
        return false;
      }

      // Personality traits filter (match if gift matches ANY selected personality)
      if (filter.personalities.length > 0) {
        const matchesPersonality = gift.personalities.some((p) =>
          filter.personalities.includes(p)
        );
        if (!matchesPersonality) return false;
      }

      // Occasion filter
      if (
        filter.occasion !== 'all' &&
        !gift.occasions.includes(filter.occasion)
      ) {
        return false;
      }

      // Hobbies filter
      if (
        filter.hobbies.length > 0 &&
        !filter.hobbies.includes(gift.category)
      ) {
        return false;
      }

      // Budget filter
      if (gift.price < filter.minPrice || gift.price > filter.maxPrice) {
        return false;
      }

      // Search query
      if (filter.searchQuery.trim()) {
        const q = filter.searchQuery.toLowerCase().trim();
        const inTitle = gift.title.toLowerCase().includes(q);
        const inDesc = gift.shortDesc.toLowerCase().includes(q);
        const inCat = gift.categoryName.toLowerCase().includes(q);
        const inTags = gift.tags.some((t) => t.toLowerCase().includes(q));
        const inWhy = gift.whyItFits.toLowerCase().includes(q);
        if (!inTitle && !inDesc && !inCat && !inTags && !inWhy) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filter.sortBy === 'price_asc') return a.price - b.price;
      if (filter.sortBy === 'price_desc') return b.price - a.price;
      if (filter.sortBy === 'rating') return b.rating - a.rating;
      return 0; // recommended preserves curated order
    });
  }, [filter]);

  // Total unique saved gifts across all collections
  const totalSavedInCollections = useMemo(() => {
    const idSet = new Set<string>();
    collections.forEach((c) => c.giftIds.forEach((id) => idSet.add(id)));
    return idSet.size;
  }, [collections]);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-amber-100 selection:text-amber-900">
      {/* Top Bar Navigation */}
      <Navbar
        onOpenCollections={() => setIsCollectionsOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenAI={() => setIsAIOpen(true)}
        onOpenAnniversary={() => setIsAnniversaryOpen(true)}
        collectionsCount={collections.length}
        totalSavedGifts={totalSavedInCollections}
      />

      {/* Hero Section */}
      <Hero
        onSelectRelationship={(rel) => updateFilter({ relationship: rel })}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenAI={() => setIsAIOpen(true)}
      />

      {/* Main Catalog View */}
      <main id="catalog" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Section Heading & Overview */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
              <span>Danh mục quà tặng tâm lý</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums font-bold text-stone-900">
                {filteredGifts.length} lựa chọn phù hợp
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Đề Xuất Quà Tuyển Chọn
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsQuizOpen(true)}
              className="px-3.5 py-1.5 text-xs font-medium text-stone-700 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-2xs"
            >
              <span>Chưa biết chọn gì? Làm trắc nghiệm 30s</span>
            </button>
          </div>
        </div>

        {/* 1. Relationship Classification Selector */}
        <RelationshipSelector
          selectedRelationship={filter.relationship}
          onSelect={(rel) => updateFilter({ relationship: rel })}
          countByRelationship={countByRelationship}
        />

        {/* 2. Personality Traits Multi-Select Filter */}
        <PersonalityFilter
          selectedPersonalities={filter.personalities}
          onTogglePersonality={togglePersonality}
          onClearPersonalities={clearPersonalities}
        />

        {/* 3. Deep Filters (Occasions, Hobbies, Budget, Search) */}
        <FilterBar
          filter={filter}
          onChangeFilter={updateFilter}
          onResetFilter={resetFilter}
          totalFilteredCount={filteredGifts.length}
        />

        {/* 4. Products Grid */}
        {filteredGifts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredGifts.map((gift) => {
              const isInAnyCollection = collections.some((col) =>
                col.giftIds.includes(gift.id)
              );

              return (
                <GiftCard
                  key={gift.id}
                  gift={gift}
                  isWishlisted={wishlist.includes(gift.id)}
                  onToggleWishlist={() => toggleWishlist(gift.id)}
                  onOpenDetail={() => setDetailGift(gift)}
                  onOpenAddToCollection={() => setAddToColGift(gift)}
                  onOpenAICard={() => {
                    setAiCardGift(gift);
                    setIsAIOpen(true);
                  }}
                  currentRelationship={filter.relationship}
                  isInAnyCollection={isInAnyCollection}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-white border border-stone-200 rounded-2xl shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 mx-auto flex items-center justify-center">
              <Filter className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Không tìm thấy món quà phù hợp với bộ lọc hiện tại
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-md mx-auto">
                Hãy thử mở rộng khoảng ngân sách, bỏ bớt một vài sở thích hoặc chuyển về xem tất cả các mối quan hệ.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={resetFilter}
                className="px-4 py-2 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Đặt lại bộ lọc</span>
              </button>
              <button
                onClick={() => setIsAIOpen(true)}
                className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Nhờ AI gợi ý riêng theo câu chuyện</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onSelectRelationship={(rel) => updateFilter({ relationship: rel })} />

      {/* Modals */}
      <GiftDetailModal
        gift={detailGift}
        isOpen={Boolean(detailGift)}
        onClose={() => setDetailGift(null)}
        isWishlisted={detailGift ? wishlist.includes(detailGift.id) : false}
        onToggleWishlist={() => detailGift && toggleWishlist(detailGift.id)}
        onOpenAddToCollection={() => {
          if (detailGift) {
            setAddToColGift(detailGift);
          }
        }}
        onOpenAICard={(gift) => {
          setDetailGift(null);
          setAiCardGift(gift);
          setIsAIOpen(true);
        }}
        isInAnyCollection={
          detailGift
            ? collections.some((col) => col.giftIds.includes(detailGift.id))
            : false
        }
      />

      <AddToCollectionModal
        gift={addToColGift}
        isOpen={Boolean(addToColGift)}
        onClose={() => setAddToColGift(null)}
        collections={collections}
        onToggleGiftInCollection={handleToggleGiftInCollection}
        onCreateCollection={handleCreateCollection}
      />

      <CollectionsManagerModal
        isOpen={isCollectionsOpen}
        onClose={() => setIsCollectionsOpen(false)}
        collections={collections}
        allGifts={GIFTS_DATABASE}
        onCreateCollection={handleCreateCollection}
        onDeleteCollection={handleDeleteCollection}
        onUpdateCollection={handleUpdateCollection}
        onRemoveGiftFromCollection={handleRemoveGiftFromCollection}
        onOpenGiftDetail={(g) => {
          setIsCollectionsOpen(false);
          setDetailGift(g);
        }}
      />

      <AIAssistantModal
        isOpen={isAIOpen}
        onClose={() => {
          setIsAIOpen(false);
          setAiCardGift(null);
        }}
        defaultRelationship={filter.relationship !== 'all' ? filter.relationship : 'lover'}
        initialGift={aiCardGift}
        allGifts={GIFTS_DATABASE}
      />

      <GiftQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        allGifts={GIFTS_DATABASE}
        onOpenGiftDetail={(g) => setDetailGift(g)}
        onOpenAddToCollection={(g) => setAddToColGift(g)}
      />

      <AnniversaryTrackerModal
        isOpen={isAnniversaryOpen}
        onClose={() => setIsAnniversaryOpen(false)}
        events={events}
        onAddEvent={handleAddEvent}
        onDeleteEvent={handleDeleteEvent}
      />
    </div>
  );
}
