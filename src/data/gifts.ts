import { GiftItem, RelationshipCategory, PersonalityTrait, OccasionType, HobbyCategory, GiftCollection } from '../types/gift';

export const HERO_IMAGE = '/src/assets/images/hero_gift_unboxing_1792160969722.jpg';

export interface RelationshipOption {
  id: RelationshipCategory;
  label: string;
  shortDesc: string;
  detailAdvice: string;
  focusTone: string;
}

export const RELATIONSHIPS: RelationshipOption[] = [
  {
    id: 'lover',
    label: 'Quà cho người yêu',
    shortDesc: 'Lãng mạn, mang tính kỷ niệm và gắn kết cảm xúc sâu sắc giữa hai trái tim.',
    detailAdvice: 'Nên ưu tiên các món đồ cá nhân hóa (khắc tên/tọa độ), hương thơm kích hoạt cảm xúc, hoặc trải nghiệm hẹn hò riêng tư.',
    focusTone: 'Lãng mạn & Gắn kết'
  },
  {
    id: 'bestfriend',
    label: 'Quà cho bạn thân',
    shortDesc: 'Vui vẻ, thấu hiểu cá tính, thiết thực và chứa đựng những kỷ niệm "lầy lội" đáng nhớ.',
    detailAdvice: 'Không cần quá cầu kỳ hình thức; hãy chọn thứ đúng gu sở thích, chăm sóc tinh thần hoặc những món quà để tụ tập quẩy cùng nhau.',
    focusTone: 'Tri kỷ & Thấu hiểu'
  },
  {
    id: 'family',
    label: 'Quà cho gia đình',
    shortDesc: 'Chăm sóc sức khỏe, ấm cúng, thể hiện lòng hiếu kính và sự quan tâm bền vững.',
    detailAdvice: 'Đối với bố mẹ và người thân, giá trị tinh thần và sự nâng niu sức khỏe luôn là ưu tiên hàng đầu, đi kèm sự sum vầy.',
    focusTone: 'Hiếu kính & Ấm áp'
  },
  {
    id: 'coworker',
    label: 'Quà cho đồng nghiệp',
    shortDesc: 'Lịch sự, tinh tế, hữu ích cho không gian công sở và nâng tầm hiệu suất làm việc.',
    detailAdvice: 'Chọn món quà trang nhã, công năng thiết thực tại bàn làm việc hoặc hỗ trợ thư giãn sau giờ làm mà không gây cảm giác áp lực.',
    focusTone: 'Lịch thiệp & Chuyên nghiệp'
  }
];

export interface PersonalityOption {
  id: PersonalityTrait;
  label: string;
  tagline: string;
  description: string;
  recommendedTypes: string;
}

export const PERSONALITY_TRAITS: PersonalityOption[] = [
  {
    id: 'extrovert',
    label: 'Hướng ngoại',
    tagline: 'Năng động, thích kết nối & chia sẻ năng lượng',
    description: 'Người tràn đầy năng lượng khi ở giữa đám đông, thích tham gia các sự kiện, chụp ảnh kỷ niệm và trải nghiệm sôi nổi cùng bạn bè.',
    recommendedTypes: 'Workshop đông người, boardgame hội nhóm, loa bluetooth nghe nhạc tiệc tùng, phụ kiện nổi bật.'
  },
  {
    id: 'introvert',
    label: 'Hướng nội',
    tagline: 'Sâu lắng, trân trọng không gian bình yên',
    description: 'Người nạp năng lượng trong sự tĩnh lặng, yêu thích góc nhỏ riêng tư, đọc sách, nghe nhạc acoustic và các cuộc trò chuyện 1-1 sâu sắc.',
    recommendedTypes: 'Nến thơm tự nhiên, đèn ngủ êm dịu, set pha trà/cà phê tại nhà, sách tản văn ý nghĩa.'
  },
  {
    id: 'creative',
    label: 'Sáng tạo',
    tagline: 'Mơ mộng, yêu nghệ thuật & tính độc bản',
    description: 'Người có tâm hồn nghệ sĩ, trân trọng cái đẹp, thích tự tay sáng tạo, ghi chép ký ức và sở hữu những vật phẩm có phong cách riêng biệt.',
    recommendedTypes: 'Sổ scrapbook handmade, làm gốm thủ công, nước hoa cá nhân hóa, tranh ảnh nghệ thuật.'
  },
  {
    id: 'practical',
    label: 'Thực tế',
    tagline: 'Thực tế, coi trọng công năng & giá trị sử dụng',
    description: 'Người thích những món đồ có thể sử dụng hàng ngày, giải quyết các vấn đề thiết thực và có độ bền cao thay vì những thứ hoa mỹ ngắn hạn.',
    recommendedTypes: 'Máy massage cổ vai gáy, bình giữ nhiệt cao cấp, đồ da thật, đồng hồ chống nước bền bỉ.'
  },
  {
    id: 'adventurous',
    label: 'Phiêu lưu',
    tagline: 'Thích khám phá, di chuyển & trải nghiệm mới',
    description: 'Người có tinh thần xê dịch, không ngại thử thách những điều chưa từng làm, thích các hoạt động ngoài trời và lưu giữ khoảnh khắc trên mọi nẻo đường.',
    recommendedTypes: 'Máy in ảnh du lịch, chuyến du thuyền ngắm hoàng hôn, bình nước thể thao dã ngoại, quà gọn nhẹ đa năng.'
  },
  {
    id: 'homebody',
    label: 'Thích ở nhà',
    tagline: 'Yêu tổ ấm, thích chăm sóc không gian sống',
    description: 'Người tìm thấy niềm vui lớn nhất khi cuộn mình trong chăn ấm, biến phòng riêng thành thánh đường thư giãn tuyệt đối sau ngày dài.',
    recommendedTypes: 'Bộ chăn ga lụa êm ái, máy pha cà phê pour-over, tinh dầu khuếch tán, đèn decor ấm cúng.'
  }
];

export interface CategoryOption {
  id: HobbyCategory;
  label: string;
  description: string;
}

export const CATEGORIES: CategoryOption[] = [
  { id: 'fashion', label: 'Thời trang & Trang sức', description: 'Trang sức đôi, phụ kiện da thủ công, khăn choàng, đồng hồ' },
  { id: 'art_diy', label: 'Handmade & Kỷ niệm', description: 'Scrapbook ảnh, tranh vẽ chân dung, quà khắc tên riêng' },
  { id: 'experience', label: 'Trải nghiệm & Hẹn hò', description: 'Workshop làm gốm, du thuyền, lớp nến thơm, vé hòa nhạc' },
  { id: 'wellness', label: 'Chăm sóc & Thư giãn', description: 'Nến thơm soy wax, máy massage, tinh dầu, set spa thảo mộc' },
  { id: 'tech', label: 'Công nghệ & Tiện ích', description: 'Loa retro, máy in ảnh mini, đèn ngủ cảm ứng, tai nghe' },
  { id: 'gourmet', label: 'Ẩm thực & Cà phê', description: 'Set pha cafe pour-over, hộp trà hoa cao cấp, rượu vang & ly pha lê' },
  { id: 'books_chill', label: 'Sách & Boardgame', description: 'Sách hay về tình cảm, boardgame kết nối hiểu nhau, cờ gỗ' },
  { id: 'sports', label: 'Thể thao & Hoạt động', description: 'Bình giữ nhiệt cao cấp, phụ kiện chạy bộ, thảm yoga đôi' },
];

export interface OccasionOption {
  id: OccasionType;
  label: string;
  badge: string;
}

export const OCCASIONS: OccasionOption[] = [
  { id: 'anniversary_love', label: 'Kỷ niệm ngày yêu (100 ngày, 1 năm, 3 năm...)', badge: 'Kỷ niệm yêu' },
  { id: 'birthday', label: 'Sinh nhật (Người yêu, Bạn thân, Bố mẹ, Đồng nghiệp)', badge: 'Sinh nhật' },
  { id: 'valentine', label: 'Valentine 14/2 & Valentine Trắng 14/3', badge: 'Valentine' },
  { id: 'wedding_anniversary', label: 'Kỷ niệm ngày cưới (1 năm, 5 năm, 10 năm)', badge: 'Kỷ niệm cưới' },
  { id: 'parents_day', label: 'Ngày của Cha Mẹ / Báo hiếu / Mừng thọ', badge: 'Báo hiếu cha mẹ' },
  { id: 'christmas_newyear', label: 'Giáng sinh & Đón Năm Mới', badge: 'Noel & Năm mới' },
  { id: 'graduation_job', label: 'Tốt nghiệp / Thăng chức / Mở tiệc tân gia', badge: 'Chúc mừng sự nghiệp' },
  { id: 'friendship_day', label: 'Ngày tri ân bạn thân / Cảm ơn tri kỷ', badge: 'Tri ân bạn thân' },
  { id: 'just_because', label: 'Bất ngờ ngẫu hứng (Không vì dịp gì)', badge: 'Bất ngờ ngọt ngào' },
];

export const BUDGET_PRESETS = [
  { label: 'Dưới 300k', min: 0, max: 300000 },
  { label: '300k - 700k', min: 300000, max: 700000 },
  { label: '700k - 1.5 triệu', min: 700000, max: 1500000 },
  { label: '1.5 - 3 triệu', min: 1500000, max: 3000000 },
  { label: 'Trên 3 triệu', min: 3000000, max: 10000000 },
];

export const DEFAULT_COLLECTIONS: GiftCollection[] = [
  {
    id: 'col-mom-birthday',
    name: 'Quà sinh nhật mẹ',
    description: 'Những món quà chăm sóc sức khỏe, thảo mộc ấm áp và bình yên dành tặng mẹ yêu.',
    color: '#E06D53',
    giftIds: ['gift-family-1', 'gift-12', 'gift-14'],
    createdAt: '2026-10-01T08:00:00Z',
    updatedAt: '2026-10-15T10:00:00Z',
  },
  {
    id: 'col-anniversary-1yr',
    name: 'Kỷ niệm 1 năm yêu nhau',
    description: 'Kế hoạch tạo bất ngờ lãng mạn nhân dịp tròn 365 ngày chính thức bên nhau.',
    color: '#D97706',
    giftIds: ['gift-1', 'gift-5', 'gift-2'],
    createdAt: '2026-09-20T08:00:00Z',
    updatedAt: '2026-10-12T14:30:00Z',
  },
  {
    id: 'col-xmas-friends',
    name: 'Ý tưởng quà Giáng sinh & Năm mới',
    description: 'Danh sách quà ấm áp để bốc thăm và tặng hội bạn thân dịp Noel cuối năm.',
    color: '#059669',
    giftIds: ['gift-3', 'gift-16', 'gift-4'],
    createdAt: '2026-10-05T08:00:00Z',
    updatedAt: '2026-10-14T09:20:00Z',
  }
];

export const GIFTS_DATABASE: GiftItem[] = [
  {
    id: 'gift-1',
    title: 'Cặp Nhẫn Bạc Tinh Giản Khắc Tọa Độ & Nước Hoa Niche',
    relationships: ['lover'],
    relationshipFit: {
      lover: 'Hoàn hảo cho người yêu: Nhẫn bạc đeo hàng ngày nhắc nhở sự hiện diện của đối phương, hương thơm gỗ ấm ghi dấu khoảnh khắc lãng mạn riêng tư.',
    },
    personalities: ['creative', 'introvert'],
    personalityFitAdvice: {
      creative: 'Yêu thích tính độc bản nhờ tọa độ địa lý bí mật chỉ hai bạn giải mã được.',
      introvert: 'Hương thơm tinh tế, kín đáo không phô trương nhưng tạo cảm giác thân thuộc mỗi khi ở gần nhau.'
    },
    subRecipients: ['boyfriend', 'girlfriend', 'husband', 'wife'],
    category: 'fashion',
    categoryName: 'Thời trang & Trang sức',
    occasions: ['anniversary_love', 'valentine', 'wedding_anniversary'],
    price: 1850000,
    image: '/src/assets/images/gift_couple_jewellery_perfume_1792160970374.jpg',
    badge: 'Được yêu thích nhất',
    rating: 4.96,
    reviewsCount: 342,
    shortDesc: 'Set nhẫn bạc 925 thủ công khắc kinh độ vĩ độ nơi hai bạn lần đầu chạm ánh mắt nhau, kèm chai nước hoa hương gỗ ấm.',
    whyItFits: 'Món quà kết hợp giữa trang sức đeo hàng ngày (nhắc nhở sự hiện diện) và hương thơm kích hoạt ký ức cảm xúc bền vững của loài người.',
    presentationTip: 'Giấu chiếc hộp nhẫn bên dưới lớp rơm thơm, viết kèm tọa độ bí ẩn lên tấm thiệp để đối phương tự tra bản đồ.',
    shoppingAdvice: 'Có thể đặt khắc tên/tọa độ tại các tiệm bạc thiết kế ở Hà Nội/Sài Gòn (mất khoảng 2-3 ngày gia công).',
    tags: ['Bạc 925', 'Khắc tên riêng', 'Nước hoa Niche', 'Lãng mạn']
  },
  {
    id: 'gift-family-1',
    title: 'Hộp Trà Thảo Mộc Thượng Hạng, Cốc Gốm & Khăn Dệt Ấm Gia Đình',
    relationships: ['family'],
    relationshipFit: {
      family: 'Tuyệt vời cho Bố Mẹ & Gia đình: Thể hiện lòng hiếu kính qua 2 chiếc cốc gốm khắc chữ Mom - Dad ấm áp, bồi bổ giấc ngủ bằng thảo mộc tự nhiên.',
    },
    personalities: ['homebody', 'practical', 'introvert'],
    personalityFitAdvice: {
      homebody: 'Tạo nên góc trà sáng an yên tại phòng khách, mang lại hơi ấm cho cả căn nhà.',
      practical: 'Vừa dùng để uống trà mỗi ngày cải thiện huyết áp, vừa có chăn len mỏng đắp ấm khi ngồi xem TV.'
    },
    subRecipients: ['parents'],
    category: 'wellness',
    categoryName: 'Chăm sóc & Thư giãn',
    occasions: ['parents_day', 'birthday', 'christmas_newyear', 'wedding_anniversary'],
    price: 1350000,
    image: '/src/assets/images/gift_family_wellness_set_1792161139594.jpg',
    badge: 'Hiếu kính & Bình an',
    rating: 4.98,
    reviewsCount: 215,
    shortDesc: 'Hộp gỗ mộc sang trọng gồm 3 hũ trà dưỡng sinh an thần, cặp cốc gốm mộc Mom & Dad thủ công và khăn choàng dệt ấm.',
    whyItFits: 'Gửi gắm lời chúc sức khỏe dồi dào và nhắc nhở bố mẹ hãy nghỉ ngơi sau bao năm tháng hy sinh vì con cái.',
    presentationTip: 'Tự tay đun nước sôi, tráng ấm và dâng ly trà nóng đầu tiên kèm hộp quà trong bữa cơm sum họp cuối tuần.',
    shoppingAdvice: 'Các thương hiệu thảo mộc organic uy tín hoặc các tiệm gốm Bát Tràng nghệ nhân.',
    tags: ['Quà tặng bố mẹ', 'Trà thảo mộc', 'Gốm Mom & Dad', 'Hiếu đạo']
  },
  {
    id: 'gift-coworker-1',
    title: 'Sổ Da Ký Hoạch Doanh Nhân Khóa Đồng & Bút Ký Kim Loại Khắc Tên',
    relationships: ['coworker'],
    relationshipFit: {
      coworker: 'Rất hợp cho Đồng nghiệp & Sếp: Món quà trang trọng, chuyên nghiệp, hỗ trợ đắc lực cho công việc mà không quá riêng tư gây ngại ngùng.',
    },
    personalities: ['practical', 'introvert', 'creative'],
    personalityFitAdvice: {
      practical: 'Vật dụng không thể thiếu trong các cuộc họp quan trọng, nâng tầm phong thái đĩnh đạc.',
      creative: 'Chất giấy chống lóa định lượng cao phù hợp cho việc phác thảo sơ đồ tư duy (mindmap) và ghi chú ý tưởng.'
    },
    subRecipients: ['coworker_peer', 'coworker_boss'],
    category: 'fashion',
    categoryName: 'Thời trang & Trang sức',
    occasions: ['graduation_job', 'birthday', 'christmas_newyear'],
    price: 790000,
    image: '/src/assets/images/gift_coworker_desk_pen_1792161140395.jpg',
    badge: 'Chuyên nghiệp & Tinh tế',
    rating: 4.94,
    reviewsCount: 189,
    shortDesc: 'Cuốn sổ da bò dập vân sang trọng có quai cài đồng thau cao cấp, kèm bút bi mực gel kim loại khắc laser tên đồng nghiệp.',
    whyItFits: 'Thể hiện sự trân trọng sự nghiệp và sự đồng hành của đồng nghiệp trong những dự án deadline cam go.',
    presentationTip: 'Kẹp tấm thiệp chúc mừng thăng tiến vào ngay trang đầu tiên của cuốn sổ.',
    shoppingAdvice: 'Các xưởng chế tác da thủ công hoặc thương hiệu sổ tay Midori / Lamy uy tín.',
    tags: ['Bút ký khắc tên', 'Sổ tay bìa da', 'Quà đồng nghiệp', 'Thăng chức']
  },
  {
    id: 'gift-2',
    title: 'Vé Trải Nghiệm Workshop Làm Gốm Thủ Công 2 Người',
    relationships: ['lover', 'bestfriend'],
    relationshipFit: {
      lover: 'Buổi hẹn hò lãng mạn kinh điển: Cùng nhau nhào nặn đất sét, tạo hình 2 chiếc cốc tình yêu để mang về dùng chung.',
      bestfriend: 'Hoạt động gắn kết xả stress tuyệt vời: Cười thả ga khi chiếc cốc bị méo và cùng nhau sáng tạo tác phẩm độc lạ.'
    },
    personalities: ['creative', 'adventurous', 'extrovert'],
    personalityFitAdvice: {
      creative: 'Thỏa sức biểu đạt gu thẩm mỹ qua các họa tiết men gốm tự phối màu.',
      adventurous: 'Hào hứng khám phá một trải nghiệm thủ công mới lạ chưa từng làm trước đây.'
    },
    subRecipients: ['boyfriend', 'girlfriend', 'bestfriend_f', 'bestfriend_m'],
    category: 'experience',
    categoryName: 'Trải nghiệm & Hẹn hò',
    occasions: ['anniversary_love', 'birthday', 'friendship_day', 'just_because'],
    price: 780000,
    image: '/src/assets/images/gift_experience_workshop_1792160971470.jpg',
    badge: 'Trải nghiệm đáng nhớ',
    rating: 4.94,
    reviewsCount: 218,
    shortDesc: 'Buổi trải nghiệm nặn và xoay gốm tại xưởng gốm nghệ thuật, tự tay tạo ra 2 chiếc cốc kỷ niệm để mang về.',
    whyItFits: 'Theo tâm lý học, những món quà mang tính "trải nghiệm chung" tạo ra dopamine và hoài niệm bền vững hơn gấp nhiều lần đồ vật vô tri.',
    presentationTip: 'In chiếc voucher dưới dạng vé xem phim phong cách retro, kẹp trong cuốn sách yêu thích của người ấy.',
    shoppingAdvice: 'Các xưởng gốm nổi tiếng như Vườn Nhà Gốm, Haru Craft, Gốm Chi thường nhận đặt chỗ trước 3-5 ngày vào cuối tuần.',
    tags: ['Workshop', 'Thủ công', 'Gắn kết', 'Kỷ niệm']
  },
  {
    id: 'gift-3',
    title: 'Hộp Quà Tri Kỷ Tự Chọn: Nến Sáp Đậu Nành & Ảnh Chụp Lấy Liền',
    relationships: ['bestfriend'],
    relationshipFit: {
      bestfriend: 'Món quà đo ni đóng giày cho bạn thân: Sự kết hợp giữa thư giãn tinh thần và những bức ảnh kỷ niệm "dìm hàng" siêu đáng yêu.',
    },
    personalities: ['homebody', 'introvert', 'creative'],
    personalityFitAdvice: {
      homebody: 'Thắp sáng căn phòng và tạo hương thơm êm dịu cho những buổi tối chill xem phim tại gia.',
      introvert: 'Không gian yên tĩnh, an toàn để vỗ về cảm xúc sau những giờ giao tiếp mệt mỏi ngoài xã hội.'
    },
    subRecipients: ['bestfriend_f', 'bestfriend_m'],
    category: 'wellness',
    categoryName: 'Chăm sóc & Thư giãn',
    occasions: ['birthday', 'friendship_day', 'graduation_job', 'christmas_newyear'],
    price: 520000,
    image: '/src/assets/images/gift_friendship_care_box_1792160971624.jpg',
    badge: 'Ấm áp & Chân thành',
    rating: 4.91,
    reviewsCount: 165,
    shortDesc: 'Hộp quà mộc mạc gồm nến thơm hổ phách thư giãn, hũ trà hoa cúc hữu cơ và 6 tấm ảnh chụp film kẹp thiệp tay.',
    whyItFits: 'Thể hiện sự quan tâm tinh tế đến giấc ngủ và sức khỏe tinh thần của người bạn thân sau những ngày làm việc áp lực.',
    presentationTip: 'Tự tay chọn những bức ảnh "dìm hàng đáng yêu" từ những chuyến đi chung để kẹp trong nắp hộp.',
    shoppingAdvice: 'Dễ dàng gom đồ từ các tiệm nến thơm thủ công nội địa Việt Nam, hoặc tự decor hộp kraft vintage.',
    tags: ['Nến thơm', 'Thư giãn', 'Quà bạn thân', 'Trà hoa']
  },
  {
    id: 'gift-4',
    title: 'Loa Bluetooth Vỏ Gỗ Retro Cổ Điển & Đèn Ngủ Ấm',
    relationships: ['lover', 'bestfriend', 'family', 'coworker'],
    relationshipFit: {
      lover: 'Tạo không gian âm nhạc lãng mạn cho những buổi hẹn hò tại gia của hai người.',
      bestfriend: 'Bật nhạc chill hoặc quẩy tưng bừng mỗi khi hội bạn tụ tập chơi game.',
      family: 'Bố mẹ có thể dễ dàng mở các bản nhạc xưa hoặc podcast truyền cảm hứng buổi sáng.',
      coworker: 'Decor bàn làm việc sang trọng và nghe nhạc thư giãn giờ nghỉ trưa.'
    },
    personalities: ['homebody', 'creative', 'introvert'],
    personalityFitAdvice: {
      homebody: 'Biến căn phòng thành quán cafe acoustic mini ngập tràn giai điệu êm dịu.',
      creative: 'Thiết kế vintage với chất liệu gỗ óc chó thật truyền cảm hứng sáng tác.'
    },
    subRecipients: ['boyfriend', 'girlfriend', 'husband', 'wife', 'bestfriend_m', 'parents'],
    category: 'tech',
    categoryName: 'Công nghệ & Tiện ích',
    occasions: ['birthday', 'anniversary_love', 'graduation_job', 'christmas_newyear'],
    price: 950000,
    image: '/src/assets/images/gift_retro_speaker_1792161049095.jpg',
    badge: 'Tinh tế không gian',
    rating: 4.88,
    reviewsCount: 290,
    shortDesc: 'Chiếc loa bluetooth hoàn thiện bằng gỗ óc chó mộc mạc với núm vặn kim loại brass, âm bass ấm áp cho góc chill.',
    whyItFits: 'Vừa là thiết bị nghe nhạc acoustic/lofi mỗi tối, vừa là món decor sang trọng làm sáng bừng góc bàn làm việc.',
    presentationTip: 'Trước khi tặng, hãy kết nối sẵn điện thoại và tạo một playlist Spotify riêng mang tên người nhận, bật sẵn khi họ mở hộp.',
    shoppingAdvice: 'Lựa chọn các dòng loa Divoom Ditoo, Muzen OTR hoặc dòng loa thủ công bọc gỗ cao cấp.',
    tags: ['Loa Bluetooth', 'Gỗ óc chó', 'Âm nhạc', 'Trang trí']
  },
  {
    id: 'gift-5',
    title: 'Sổ Scrapbook Kỷ Niệm 365 Ngày Yêu Handmade Khung Gỗ',
    relationships: ['lover'],
    relationshipFit: {
      lover: 'Món quà đong đầy cảm xúc nhất cho người yêu: Từng trang là từng kỷ niệm, dấu mốc ngọt ngào và lời thề hẹn tương lai.',
    },
    personalities: ['creative', 'introvert'],
    personalityFitAdvice: {
      creative: 'Trân trọng sự kỳ công, nét chữ viết tay và các chi tiết thủ công tỉ mỉ.',
      introvert: 'Thích thú khi được ngồi một mình lật giở từng trang và rưng rưng xúc động.'
    },
    subRecipients: ['boyfriend', 'girlfriend'],
    category: 'art_diy',
    categoryName: 'Handmade & Kỷ niệm',
    occasions: ['anniversary_love', 'valentine', 'birthday'],
    price: 380000,
    image: '/src/assets/images/gift_scrapbook_camera_1792161050191.jpg',
    badge: 'Chạm tới trái tim',
    rating: 4.98,
    reviewsCount: 420,
    shortDesc: 'Cuốn sổ thủ công bìa vải thô chứa đựng từng tấm ảnh polaroid, cuống vé xem phim đầu tiên và những dòng nhật ký tình yêu.',
    whyItFits: 'Món quà vô giá không đo bằng tiền mặt mà bằng thời gian và công sức bạn bỏ ra để lưu giữ hành trình cả hai cùng đi qua.',
    presentationTip: 'Chừa lại 5 trang cuối cùng còn trống và ghi: "Dành cho những chuyến đi tiếp theo của chúng mình".',
    shoppingAdvice: 'Mua combo sổ kraft và bút gel nhũ trên Shopee, in ảnh dạng polaroid tại các tiệm in online chỉ 2k/tấm.',
    tags: ['Scrapbook', 'Kỷ niệm 1 năm', 'Ảnh Polaroid', 'Handmade']
  },
  {
    id: 'gift-6',
    title: 'Cặp Đồng Hồ Da Tối Giản Mặt Kính Sapphire Thanh Lịch',
    relationships: ['lover', 'family'],
    relationshipFit: {
      lover: 'Biểu tượng của lời hẹn ước: "Mỗi giây phút trôi qua đều có anh/em đồng hành".',
      family: 'Món quà mừng kỷ niệm ngày cưới bạc/vàng của bố mẹ đầy trang trọng và ý nghĩa hiếu nghĩa.'
    },
    personalities: ['practical', 'introvert'],
    personalityFitAdvice: {
      practical: 'Vật dụng thiết yếu xem giờ chính xác hàng ngày với độ bền hàng chục năm.',
      introvert: 'Thiết kế tối giản, thanh thoát, không hề phô trương nhưng toát lên vẻ tri thức lịch lãm.'
    },
    subRecipients: ['boyfriend', 'girlfriend', 'husband', 'wife', 'parents'],
    category: 'fashion',
    categoryName: 'Thời trang & Trang sức',
    occasions: ['wedding_anniversary', 'anniversary_love', 'birthday'],
    price: 3200000,
    image: '/src/assets/images/gift_couple_watches_1792161049450.jpg',
    badge: 'Biểu tượng thời gian',
    rating: 4.95,
    reviewsCount: 154,
    shortDesc: 'Đồng hồ đôi thiết kế Bauhaus dây da bò Ý mềm mại, chống nước 5ATM, biểu trưng cho lời thề gắn kết cùng năm tháng.',
    whyItFits: 'Đồng hồ mang thông điệp "Từng giây từng phút của anh/em đều hướng về đối phương", cực kỳ trang trọng và giá trị lâu bền.',
    presentationTip: 'Chỉnh cả 2 mặt đồng hồ khớp đúng thời khắc kỷ niệm hoặc sinh nhật trước khi trao tay.',
    shoppingAdvice: 'Các thương hiệu đồng hồ thiết kế uy tín tại VN như Curnon, Daniel Wellington hoặc Seiko bản tối giản.',
    tags: ['Đồng hồ đôi', 'Kỷ niệm ngày cưới', 'Da bò Ý', 'Sang trọng']
  },
  {
    id: 'gift-7',
    title: 'Bộ Dụng Cụ Pha Cà Phê Pour-Over Gốm Men & Hạt Specialty',
    relationships: ['bestfriend', 'coworker', 'lover'],
    relationshipFit: {
      bestfriend: 'Tặng người bạn có gu cà phê sành sỏi để biến góc bếp thành quầy barista tại gia.',
      coworker: 'Món quà hoàn hảo cho đồng nghiệp mê cà phê, khởi đầu buổi sáng làm việc tràn đầy cảm hứng.',
      lover: 'Cùng nhau thức dậy sớm, pha cho nhau ly cà phê thơm nức đón bình minh.'
    },
    personalities: ['homebody', 'creative', 'practical'],
    personalityFitAdvice: {
      homebody: 'Tận hưởng khoảnh khắc nước sôi chảy qua phễu gốm, mùi cà phê lan tỏa khắp gian phòng ấm.',
      creative: 'Thích thử nghiệm các công thức xay thô mịn, nhiệt độ nước và thời gian chiết xuất khác nhau.'
    },
    subRecipients: ['boyfriend', 'bestfriend_m', 'bestfriend_f', 'coworker_peer'],
    category: 'gourmet',
    categoryName: 'Ẩm thực & Cà phê',
    occasions: ['birthday', 'graduation_job', 'just_because', 'christmas_newyear'],
    price: 890000,
    image: '/src/assets/images/gift_coffee_brewing_set_1792161048979.jpg',
    badge: 'Gu thưởng thức',
    rating: 4.92,
    reviewsCount: 178,
    shortDesc: 'Phễu lọc gốm V60 thủ công, bình đựng thủy tinh chịu nhiệt vân gỗ, ấm cổ ngỗng và gói cà phê hạt Arabica Cầu Đất rang mộc.',
    whyItFits: 'Tạo nên một thói quen chậm rãi mỗi sáng, người nhận sẽ luôn nhớ đến bạn mỗi khi ngửi thấy hương cà phê thơm nồng.',
    presentationTip: 'Gửi kèm một hướng dẫn công thức pha tỉ lệ vàng 1:15 viết tay trên giấy kraft.',
    shoppingAdvice: 'Các roastery specialty coffee uy tín tại Đà Lạt, Sài Gòn (Every Half, The Workshop, XLIII) hoặc Hario chính hãng.',
    tags: ['Cà phê Specialty', 'Pour Over', 'Gốm thủ công', 'Chill buổi sáng']
  },
  {
    id: 'gift-12',
    title: 'Máy Massage Cổ Vai Gáy Chườm Nóng Công Thái Học',
    relationships: ['family', 'coworker', 'bestfriend', 'lover'],
    relationshipFit: {
      family: 'Món quà vàng chăm sóc sức khỏe cha mẹ: Giảm đau nhức xương khớp và lưu thông máu não hiệu quả.',
      coworker: 'Cứu cánh của đồng nghiệp văn phòng ngồi 8 tiếng trước máy tính liên tục.',
      bestfriend: 'Chăm lo cho đứa bạn thân hay than thở mỏi lưng vì cày cuốc công việc.',
      lover: 'Thay bạn massage cho người ấy mỗi khi bạn không ở cạnh.'
    },
    personalities: ['practical', 'homebody'],
    personalityFitAdvice: {
      practical: 'Độ thiết thực 10/10, dùng được hàng ngày ngay tại bàn làm việc hoặc trên ghế sofa.',
      homebody: 'Kết hợp chế độ chườm nóng và xoa bóp chuyên sâu giúp thư giãn tuyệt đối trước giờ ngủ.'
    },
    subRecipients: ['parents', 'coworker_peer', 'bestfriend_m', 'bestfriend_f', 'husband', 'wife'],
    category: 'wellness',
    categoryName: 'Chăm sóc & Thư giãn',
    occasions: ['parents_day', 'birthday', 'graduation_job', 'just_because'],
    price: 1190000,
    image: '/src/assets/images/gift_family_wellness_set_1792161139594.jpg',
    badge: 'Cực kỳ thiết thực',
    rating: 4.9,
    reviewsCount: 450,
    shortDesc: 'Máy massage mô phỏng bàn tay người xoa bóp chuyên sâu, kết hợp đèn sưởi hồng ngoại giảm đau mỏi cơ cổ hiệu quả.',
    whyItFits: 'Đối với dân văn phòng ngồi máy tính 8 tiếng/ngày hay bố mẹ lớn tuổi, không có món quà nào chứng minh sự quan tâm sâu sắc bằng việc chữa lành cơ thể.',
    presentationTip: 'Kèm theo lời nhắn: "Những lúc con/em không ở cạnh, chiếc máy này sẽ thay con/anh xoa dịu mệt mỏi cho mẹ/bạn".',
    shoppingAdvice: 'Các thương hiệu Philips, Breo, SKG hoặc Jeeback chính hãng bảo hành 12 tháng.',
    tags: ['Massage', 'Dân văn phòng', 'Sức khỏe', 'Thiết thực']
  },
  {
    id: 'gift-16',
    title: 'Bộ Bài Bạn Bè "Tâm Sự Đêm Khuya - Hội Lầy Lội" & Hộp Snack',
    relationships: ['bestfriend'],
    relationshipFit: {
      bestfriend: 'Món quà đỉnh cao cho hội bạn thân: Khơi mào những tràng cười sảng khoái và khai quật những bí mật chưa từng kể.',
    },
    personalities: ['extrovert', 'creative', 'adventurous'],
    personalityFitAdvice: {
      extrovert: 'Tâm điểm của mọi buổi tụ tập đông vui, kết nối tất cả mọi người lại với nhau.',
      adventurous: 'Thách thức lòng dũng cảm với những câu hỏi bóc phốt và thử thách tinh nghịch.'
    },
    subRecipients: ['bestfriend_f', 'bestfriend_m'],
    category: 'books_chill',
    categoryName: 'Sách & Boardgame',
    occasions: ['friendship_day', 'birthday', 'just_because'],
    price: 250000,
    image: '/src/assets/images/gift_friendship_care_box_1792160971624.jpg',
    badge: 'Cười vỡ bụng',
    rating: 4.92,
    reviewsCount: 520,
    shortDesc: 'Bộ thẻ bài hội tụ 120 thử thách và câu hỏi bóc phốt quá khứ, những bí mật chưa từng tiết lộ giữa nhóm bạn thân.',
    whyItFits: 'Không khí những buổi tụ tập qua đêm (sleepover) sẽ trở nên bùng nổ, kéo nhóm bạn lại gần nhau hơn sau thời gian dài bận rộn.',
    presentationTip: 'Mua kèm một túi snack khổng lồ và vài lon nước ngọt để sẵn sàng cho một đêm không ngủ.',
    shoppingAdvice: 'Có sẵn trên Shopee Mall các nhà xuất bản boardgame trẻ Việt Nam.',
    tags: ['Boardgame nhóm', 'Hài hước', 'Tiệc bạn thân', 'Dưới 300k']
  },
  {
    id: 'gift-18',
    title: 'Bình Giữ Nhiệt Khắc Laser Tên Riêng Cao Cấp 24h Nóng Lạnh',
    relationships: ['coworker', 'lover', 'bestfriend'],
    relationshipFit: {
      coworker: 'Món quà văn phòng văn minh, bảo vệ môi trường, khắc tên riêng chống cầm nhầm.',
      lover: 'Nhắc nhở người yêu uống đủ nước ấm mỗi ngày dù bận rộn đến đâu.',
      bestfriend: 'Đồng hành cùng bạn thân trong các chuyến phượt dã ngoại hoặc phòng tập gym.'
    },
    personalities: ['practical', 'adventurous', 'extrovert'],
    personalityFitAdvice: {
      practical: 'Khả năng giữ đá lạnh 24 giờ và giữ ấm 12 giờ hoàn hảo cho mọi nhu cầu sinh hoạt.',
      adventurous: 'Vật dụng bất ly thân khi đi trekking leo núi hoặc phượt đường dài.'
    },
    subRecipients: ['boyfriend', 'girlfriend', 'coworker_peer', 'bestfriend_m'],
    category: 'sports',
    categoryName: 'Thể thao & Hoạt động',
    occasions: ['birthday', 'graduation_job', 'just_because'],
    price: 490000,
    image: '/src/assets/images/gift_coworker_desk_pen_1792161140395.jpg',
    badge: 'Bạn đồng hành mỗi ngày',
    rating: 4.93,
    reviewsCount: 280,
    shortDesc: 'Bình thép không gỉ 316 an toàn tuyệt đối, lớp phủ sơn tĩnh điện nhám mịn, nắp chống tràn và khắc laser tên tinh xảo.',
    whyItFits: 'Nhắc nhở người ấy uống đủ nước mỗi ngày, là vật dụng luôn đồng hành từ văn phòng đến phòng tập gym.',
    presentationTip: 'Rót sẵn một bình trà đào cam sả thơm lừng vào bên trong trước khi đưa cho người ấy.',
    shoppingAdvice: 'Các dòng Lock&Lock, Stanley hoặc Thermos với dịch vụ khắc tên laser theo yêu cầu.',
    tags: ['Bình giữ nhiệt', 'Khắc laser', 'Văn phòng', 'Chăm sóc']
  },
  {
    id: 'gift-10',
    title: 'Buổi Tiệc Tối Lãng Mạn Trên Du Thuyền Ngắm Hoàng Hôn Sông',
    relationships: ['lover'],
    relationshipFit: {
      lover: 'Trải nghiệm đỉnh cao dành cho các cặp đôi: Khung cảnh hoàng hôn tráng lệ trên sông nước, ánh nến lung linh và rượu vang sóng sánh.',
    },
    personalities: ['adventurous', 'extrovert', 'creative'],
    personalityFitAdvice: {
      adventurous: 'Cảm giác lướt đi trên mặt nước ngắm nhìn thành phố lên đèn từ góc nhìn hoàn toàn mới.',
      extrovert: 'Không gian lộng lẫy để chụp những bức hình kỷ niệm sang chảnh.'
    },
    subRecipients: ['husband', 'wife', 'girlfriend'],
    category: 'experience',
    categoryName: 'Trải nghiệm & Hẹn hò',
    occasions: ['anniversary_love', 'wedding_anniversary', 'valentine'],
    price: 2400000,
    image: '/src/assets/images/hero_gift_unboxing_1792160969722.jpg',
    badge: 'Kỷ niệm đẳng cấp',
    rating: 4.97,
    reviewsCount: 140,
    shortDesc: 'Set menu 5 món âu cao cấp kèm rượu vang thưởng thức trong không gian lộng gió trên du thuyền khi hoàng hôn buông xuống.',
    whyItFits: 'Phá vỡ không khí thường nhật, tạo nên một cột mốc đặc biệt mà đối phương sẽ luôn hào hứng kể lại với bạn bè.',
    presentationTip: 'Giữ bí mật điểm đến cho đến tận lúc xe dừng bánh tại bến du thuyền.',
    shoppingAdvice: 'Du thuyền Saigon Princess, ROS Yacht Club hoặc King Yacht tại bến Bạch Đằng.',
    tags: ['Du thuyền', 'Dinner Date', 'Hoàng hôn', 'Kỷ niệm cưới']
  },
  {
    id: 'gift-8',
    title: 'Máy In Ảnh Mini Bỏ Túi Kết Nối Không Dây Smartphone',
    relationships: ['lover', 'bestfriend'],
    relationshipFit: {
      lover: 'In ngay những tấm hình selfie ngọt ngào để kẹp ví hoặc dán ốp lưng điện thoại.',
      bestfriend: 'Lưu giữ những chuyến đi phượt và khoảnh khắc thanh xuân rực rỡ tức thì.'
    },
    personalities: ['creative', 'adventurous', 'extrovert'],
    personalityFitAdvice: {
      creative: 'Tự do trang trí ảnh bằng sticker và vẽ chữ trang trí lên từng bức hình.',
      adventurous: 'Kích thước nhỏ gọn bỏ túi mang đi cắm trại, du lịch khắp mọi nơi.'
    },
    subRecipients: ['girlfriend', 'bestfriend_f', 'long_distance'],
    category: 'tech',
    categoryName: 'Công nghệ & Tiện ích',
    occasions: ['birthday', 'anniversary_love', 'friendship_day', 'valentine'],
    price: 1650000,
    image: '/src/assets/images/gift_scrapbook_camera_1792161050191.jpg',
    badge: 'Tiện lợi & Thú vị',
    rating: 4.89,
    reviewsCount: 260,
    shortDesc: 'Máy in ảnh công nghệ in nhiệt không cần mực, in ngay những bức hình xinh xắn trong điện thoại bất cứ lúc nào.',
    whyItFits: 'Giúp chuyển đổi những bức hình kỹ thuật số vô tận thành vật phẩm thực tế có thể cầm nắm và dán ốp lưng điện thoại.',
    presentationTip: 'In sẵn 1 bức hình selfie lém lỉnh của hai bạn nhét sẵn vào khay ra ảnh của máy.',
    shoppingAdvice: 'Tham khảo dòng Xiaomi Pocket Photo Printer hoặc Canon PV-123 / Fujifilm Instax Link.',
    tags: ['Máy in ảnh', 'Chụp ảnh', 'Yêu xa', 'Kỷ niệm tức thì']
  },
  {
    id: 'gift-11',
    title: 'Hộp Trò Chơi Boardgame Tâm Lý "Càng Hiểu Càng Yêu" & Nến Thơm',
    relationships: ['lover'],
    relationshipFit: {
      lover: 'Cầu nối tâm hồn: Giúp cả hai vượt qua những rào cản ngại ngùng để lắng nghe những tâm tư sâu kín nhất.',
    },
    personalities: ['introvert', 'homebody'],
    personalityFitAdvice: {
      introvert: 'Môi trường trò chuyện 1-1 an toàn, sâu sắc, không ồn ào.',
      homebody: 'Buổi hẹn hò trọn vẹn tại nhà với ánh nến lung linh và câu chuyện tâm tình.'
    },
    subRecipients: ['boyfriend', 'girlfriend'],
    category: 'books_chill',
    categoryName: 'Sách & Boardgame',
    occasions: ['anniversary_love', 'valentine', 'just_because'],
    price: 290000,
    image: '/src/assets/images/gift_friendship_care_box_1792160971624.jpg',
    badge: 'Gắn kết chiều sâu',
    rating: 4.93,
    reviewsCount: 388,
    shortDesc: 'Bộ 100 câu hỏi tâm lý đào sâu từ tuổi thơ, ước mơ, tổn thương cho đến những tưởng tượng tương lai của hai người.',
    whyItFits: 'Giúp các cặp đôi mở lòng chia sẻ những điều khó nói hàng ngày, chuyển từ yêu bề nổi sang thấu hiểu tâm can.',
    presentationTip: 'Chuẩn bị một góc thảm êm, một ly vang ấm và giao kèo: "Đêm nay chúng mình không dùng điện thoại".',
    shoppingAdvice: 'Các bộ bài "We\'re Not Really Strangers" phiên bản Việt hóa hoặc bộ bài The Couple Game.',
    tags: ['Boardgame cặp đôi', 'Tâm lý', 'Kết nối', 'Dưới 300k']
  },
  {
    id: 'gift-14',
    title: 'Hộp Trà Hoa Tuyển Chọn & Ly Thủy Tinh Hai Lớp Chịu Nhiệt',
    relationships: ['family', 'coworker', 'bestfriend'],
    relationshipFit: {
      family: 'Món quà hiếu thuận dành cho mẹ hoặc người lớn tuổi thưởng trà thư thái.',
      coworker: 'Lịch sự, nhẹ nhàng đặt tại văn phòng làm việc thanh lọc cơ thể.',
      bestfriend: 'Món quà dịu dàng nhắc nhở bạn gái thư giãn chăm sóc nhan sắc.'
    },
    personalities: ['homebody', 'introvert'],
    personalityFitAdvice: {
      homebody: 'Góc trà ấm áp bên cửa sổ ngày mưa, ngắm nhìn những cánh hoa nở trong ly.',
      introvert: 'Thói quen chậm rãi giúp làm dịu tâm trí sau một ngày căng thẳng.'
    },
    subRecipients: ['parents', 'bestfriend_f', 'coworker_peer'],
    category: 'gourmet',
    categoryName: 'Ẩm thực & Cà phê',
    occasions: ['parents_day', 'birthday', 'friendship_day', 'graduation_job', 'just_because'],
    price: 460000,
    image: '/src/assets/images/gift_family_wellness_set_1792161139594.jpg',
    badge: 'Thanh lịch & Nhẹ nhàng',
    rating: 4.86,
    reviewsCount: 134,
    shortDesc: 'Set 6 loại trà hoa organic (hoa cúc, hoa hồng Pháp, hoa đậu biếc, táo đỏ kỷ tử) bồi bổ nhan sắc và an thần.',
    whyItFits: 'Một món quà thể hiện sự thanh lịch, không quá áp lực về mặt tiền bạc nhưng đem lại cảm giác được nâng niu.',
    presentationTip: 'Tự tay pha một bình trà ấm mời người nhận uống kèm khi trao hộp quà.',
    shoppingAdvice: 'Các tiệm thảo mộc hữu cơ uy tín tại Hà Nội và TP.HCM.',
    tags: ['Trà hoa', 'Sức khỏe', 'Đồng nghiệp', 'Dưới 500k']
  }
];

export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount);
}
