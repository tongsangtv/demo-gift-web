export type RelationshipCategory = 'all' | 'lover' | 'bestfriend' | 'family' | 'coworker';

export type PersonalityTrait = 
  | 'extrovert'    // Hướng ngoại
  | 'introvert'    // Hướng nội
  | 'creative'     // Sáng tạo
  | 'practical'    // Thực tế
  | 'adventurous'  // Phiêu lưu
  | 'homebody';    // Thích ở nhà

export type SpecificRecipient = 
  | 'boyfriend' 
  | 'girlfriend' 
  | 'husband' 
  | 'wife' 
  | 'bestfriend_f' 
  | 'bestfriend_m' 
  | 'parents'
  | 'siblings'
  | 'coworker_peer'
  | 'coworker_boss'
  | 'long_distance';

export type OccasionType = 
  | 'anniversary_love'    // Kỷ niệm ngày yêu
  | 'wedding_anniversary' // Kỷ niệm ngày cưới
  | 'birthday'            // Sinh nhật
  | 'valentine'           // Lễ tình nhân 14/2 & 14/3
  | 'christmas_newyear'   // Giáng sinh & Năm mới
  | 'graduation_job'      // Tốt nghiệp / Thăng chức / Tân gia
  | 'friendship_day'      // Ngày bạn thân / Tình bạn
  | 'parents_day'         // Vu Lan / Ngày của Mẹ & Cha / Báo hiếu
  | 'just_because';       // Không vì dịp gì / Bất ngờ ngọt ngào

export type HobbyCategory = 
  | 'fashion'      // Thời trang & Trang sức
  | 'art_diy'      // Nghệ thuật & Handmade
  | 'experience'   // Trải nghiệm & Hẹn hò
  | 'wellness'     // Chăm sóc bản thân & Thư giãn
  | 'tech'         // Công nghệ & Tiện ích
  | 'gourmet'      // Ẩm thực & Cà phê
  | 'books_chill'  // Sách & Boardgame
  | 'sports';      // Thể thao & Hoạt động

export interface GiftItem {
  id: string;
  title: string;
  relationships: RelationshipCategory[];
  relationshipFit: Partial<Record<RelationshipCategory, string>>;
  personalities: PersonalityTrait[];
  personalityFitAdvice?: Partial<Record<PersonalityTrait, string>>;
  subRecipients: SpecificRecipient[];
  category: HobbyCategory;
  categoryName: string;
  occasions: OccasionType[];
  price: number; // in VND
  image: string;
  badge?: string;
  rating: number;
  reviewsCount: number;
  shortDesc: string;
  whyItFits: string;
  presentationTip: string;
  shoppingAdvice: string;
  tags: string[];
}

export interface GiftCollection {
  id: string;
  name: string;
  description?: string;
  color?: string;
  giftIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface FilterState {
  relationship: RelationshipCategory;
  personalities: PersonalityTrait[];
  occasion: OccasionType | 'all';
  hobbies: HobbyCategory[];
  minPrice: number;
  maxPrice: number;
  searchQuery: string;
  sortBy: 'recommended' | 'price_asc' | 'price_desc' | 'rating';
}

export interface AIRecommendation {
  title: string;
  category: string;
  estimatedPrice: string;
  whyItFits: string;
  presentationIdea: string;
  actionTip: string;
}

export interface AICardMessage {
  style: string;
  message: string;
}

export interface AnniversaryEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  relationship: RelationshipCategory;
  targetPerson: string;
  plannedBudget?: number;
  notes?: string;
}
