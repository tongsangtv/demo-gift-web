import { FilterState, GiftItem } from '../types/gift';
import { GIFT_TAGS } from '../data/giftTags';

export function scoreGiftRecommendation(gift: GiftItem, filter: FilterState): number {
  let score = 0;

  if (gift.tags.includes(GIFT_TAGS.practical)) score += 2;
  if (gift.tags.includes(GIFT_TAGS.giftBox) || gift.tags.includes(GIFT_TAGS.giftWrapping)) {
    score += 1;
  }
  if (
    filter.maxPrice <= 150_000 &&
    filter.occasion !== 'all' &&
    (gift.tags.includes(GIFT_TAGS.decor) || gift.tags.includes(GIFT_TAGS.experience))
  ) {
    score += 3;
  }

  const matchingPersonalities = gift.personalities.filter((trait) =>
    filter.personalities.includes(trait)
  ).length;
  score += matchingPersonalities * 3;

  const query = filter.searchQuery.trim().toLocaleLowerCase('vi');
  if (query && gift.tags.some((tag) => tag.toLocaleLowerCase('vi') === query)) {
    score += 100;
  }

  return score;
}

export function rankGiftRecommendations(gifts: GiftItem[], filter: FilterState): GiftItem[] {
  return [...gifts].sort((a, b) => {
    const scoreDifference =
      scoreGiftRecommendation(b, filter) - scoreGiftRecommendation(a, filter);
    if (scoreDifference !== 0) return scoreDifference;
    return a.price - b.price;
  });
}
