export type CardThemeId =
  | 'ivory_blossom'     // Hoa & Thảo Mộc (Ivory & Gold)
  | 'vintage_kraft'     // Giấy Kraft Cổ Điển
  | 'midnight_elegance' // Dạ Nguyệt Tinh Tế (Navy & Gold)
  | 'sage_botanical'    // Thảo Mộc Bình Yên (Sage Green)
  | 'pastel_romance';   // Lãng Mạn Ngọt Ngào (Blush Rose)

export type CardAspectRatio = 'story' | 'postcard' | 'square';
// story: 9:16 (1080 x 1920) or (1080 x 1620) optimized for mobile chat / stories
// postcard: 4:3 (1200 x 900)
// square: 1:1 (1080 x 1080)

export type CardFontStyle = 'serif' | 'handwriting' | 'modern';

export interface CardThemeConfig {
  id: CardThemeId;
  name: string;
  description: string;
  bgGradient: [string, string];
  borderColor: string;
  innerBorderColor: string;
  accentColor: string;
  textColor: string;
  subTextColor: string;
  quoteColor: string;
  sealColor: string;
  badgeBg: string;
  badgeText: string;
  previewColor: string;
}

export interface CardExportData {
  recipientName: string;
  senderName: string;
  occasion: string;
  message: string;
  giftTitle?: string;
  dateString?: string;
  theme: CardThemeId;
  aspectRatio: CardAspectRatio;
  fontStyle: CardFontStyle;
  showWaxSeal: boolean;
  showGiftBadge: boolean;
  showWatermark: boolean;
}
