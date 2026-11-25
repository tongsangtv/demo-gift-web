import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { GIFTS_DATABASE } from './src/data/gifts';
import { GiftItem, RelationshipCategory } from './src/types/gift';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Clean markdown code blocks if model output contains ```json
function cleanJsonOutput(raw: string): any {
  let cleaned = raw.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }
  return JSON.parse(cleaned);
}

// Fallback generator for Heartfelt Cards incorporating occasion AND gift details
function generateFallbackCards(
  recipientName: string,
  recipientType: string,
  occasion: string,
  memories: string,
  giftDetails: string
) {
  const name = recipientName?.trim() || 'Người thương';
  const occ = occasion?.trim() || 'Kỷ niệm đặc biệt';
  const mem = memories?.trim() || 'những khoảnh khắc gắn bó bên nhau';
  const gift = giftDetails?.trim() || 'món quà nhỏ này';

  if (recipientType === 'lover') {
    return [
      {
        style: 'Lãng mạn & Ngọt ngào',
        message: `Gửi ${name} yêu dấu, nhân dịp ${occ}, anh/em muốn gửi trọn vẹn trái tim mình đến người thương cùng món quà ${gift} này. Mong rằng mỗi khi sử dụng hay nhìn thấy nó, ${name} sẽ luôn cảm nhận được hơi ấm và tình yêu chân thành của anh/em. Vẫn nhớ nhất là lúc ${mem}, càng đi cùng nhau, anh/em càng nhận ra em là điều ngọt ngào nhất mà cuộc đời ban tặng. Cảm ơn vì đã luôn ở đây, dịu dàng và ấm áp. Yêu ${name} rất nhiều!`
      },
      {
        style: 'Hài hước & Đáng yêu',
        message: `Chúc mừng ${occ} người yêu khó chiều nhưng đáng yêu nhất quả đất! Món quà ${gift} này đã được anh/em 'thẩm định' kỹ lưỡng, hy vọng sẽ làm dịu bớt tính khí thất thường của ${name}! Nhớ hồi ${mem} mà vẫn còn buồn cười. Mong ${name} tiếp tục bao dung, nhường nhịn và yêu thương anh/em thêm thật nhiều năm tháng nữa nhé!`
      },
      {
        style: 'Tinh tế & Sâu lắng',
        message: `Thân gửi ${name}, chặng đường đi qua có những ngày nắng rực rỡ và cả những ngày mưa giông, nhưng điều kỳ diệu nhất là chúng ta luôn chọn đồng hành cùng nhau. Món quà ${gift} trao tay hôm nay thay cho lời hứa sẽ luôn chở che và trân trọng ${name} qua từng khoảnh khắc. Mỗi khi nhớ lại ${mem}, anh/em lại càng biết ơn vì có em kề bên. Chúc cho tình cảm của chúng mình mãi an yên và bền chặt.`
      }
    ];
  }

  if (recipientType === 'bestfriend') {
    return [
      {
        style: 'Tri kỷ & Chân thành',
        message: `Gửi ${name} tri kỷ, nhân dịp ${occ}, tao gửi tặng mày ${gift} như một lời cảm ơn vì đã luôn là chỗ dựa tinh thần số một của tao. Nhớ nhất là lần ${mem}, ở cạnh mày tao luôn được là chính mình thoải mái nhất. Chúc cho tình bạn của tụi mình mãi bền chặt, luôn sát cánh bên nhau qua mọi sóng gió cuộc đời!`
      },
      {
        style: 'Hài hước & Lầy lội',
        message: `Mừng ${occ} của đứa bạn thân nhất trần đời! Cầm lấy ${gift} này và đừng có xúc động phát khóc nhé. Nhớ vụ ${mem} huyền thoại mà tao vẫn còn cười xỉu mỗi khi nhắc lại. Năm nay chúc mày mau giàu, bớt cà khịa tao lại và luôn nhớ bao tao ăn ngon nhé!`
      },
      {
        style: 'Ấm áp & Trưởng thành',
        message: `Thân gửi ${name}, lớn lên rồi mới thấy tìm được một người bạn hiểu từng suy nghĩ của mình là điều vô giá. Món quà ${gift} này hy vọng sẽ mang lại niềm vui nho nhỏ cho mày mỗi ngày. Mỗi khi nghĩ về ${mem}, tao luôn thấy may mắn vì chặng đường trưởng thành có mày song hành. Chúc mày luôn kiên định, bình an và gặt hái mọi điều xứng đáng.`
      }
    ];
  }

  if (recipientType === 'family') {
    return [
      {
        style: 'Hiếu kính & Ấm áp',
        message: `Kính gửi ${name}, nhân dịp ${occ}, con/cháu xin gửi trao ${gift} cùng lời chúc sức khỏe dồi dào, niềm vui và bình an đến ${name}. Nhớ những lúc ${mem}, con luôn cảm nhận được tình thương bao la của gia đình. Mong món quà này sẽ mang lại sự ấm áp và nâng niu sức khỏe cho ${name} mỗi ngày.`
      },
      {
        style: 'Gần gũi & Yêu thương',
        message: `Chúc mừng ${name} nhân dịp ${occ}! Cả nhà lúc nào cũng tự hào và biết ơn vì có ${name}. Con gửi tặng ${name} ${gift}, hy vọng ${name} sẽ thật thích và luôn vui vẻ, bớt lo toan để tận hưởng cuộc sống bình yên bên gia đình. Nhớ mãi kỷ niệm ${mem} ấm áp của chúng mình!`
      },
      {
        style: 'Sâu sắc & Trân trọng',
        message: `Gửi ${name} kính yêu, gia đình là điều thiêng liêng nhất, và ${name} chính là ngọn lửa sưởi ấm cho tất cả chúng con. Nhân ngày ${occ}, con xin kính tặng ${name} ${gift} với tất cả lòng biết ơn và kính trọng. Nguyện chúc ${name} luôn an yên trong tâm hồn và trường thọ cùng con cháu.`
      }
    ];
  }

  // Coworker
  return [
    {
      style: 'Lịch thiệp & Tinh tế',
      message: `Thân gửi ${name}, nhân dịp ${occ}, xin gửi tặng bạn món quà ${gift} này cùng lời chúc luôn tràn đầy năng lượng, nhiệt huyết và gặt hái thêm nhiều thành tựu rực rỡ trong sự nghiệp. Rất trân trọng cơ hội được làm việc cùng bạn, nhất là trong những giai đoạn ${mem}.`
    },
    {
      style: 'Gắn kết & Vui vẻ',
      message: `Chúc mừng ${occ} của người đồng nghiệp tuyệt vời! Món quà ${gift} này hy vọng sẽ là người bạn đồng hành đắc lực cho ${name} tại nơi làm việc. Cảm ơn vì luôn mang lại tiếng cười và sự hỗ trợ nhiệt tình cho team, đặc biệt là kỷ niệm ${mem}!`
    },
    {
      style: 'Chuyên nghiệp & Chân thành',
      message: `Gửi ${name}, sự đồng hành và tâm huyết của bạn trong công việc luôn truyền cảm hứng rất lớn cho mọi người xung quanh. Nhân dịp ${occ}, xin gửi tặng bạn ${gift} như một lời tri ân chân thành. Chúc bạn tiếp tục chinh phục những cột mốc mới với bản lĩnh và sự tự tin vốn có.`
    }
  ];
}

// Fallback generator for Gift Recommendations
function generateLegacyFallbackGifts(
  recipientType: string,
  relationshipDetail: string,
  hobbies: any,
  budgetVND: string,
  occasion: string,
  specialNotes: string
) {
  const budgetNum = Number(budgetVND) || 800000;
  const hobStr = Array.isArray(hobbies) ? hobbies.join(', ') : hobbies || 'thư giãn, trải nghiệm';
  const occ = occasion || 'Kỷ niệm đặc biệt';

  const formatPrice = (p: number) => new Intl.NumberFormat('vi-VN').format(p) + 'đ';

  if (recipientType === 'lover') {
    return {
      recommendations: [
        {
          title: 'Hộp Quà Ký Ức Đôi: Vòng Tay Khắc Tọa Độ & Nến Thơm Sáp Đậu Nành',
          category: 'Thời trang & Thư giãn',
          estimatedPrice: formatPrice(Math.round(budgetNum * 0.9)),
          whyItFits: `Rất phù hợp cho người yêu nhân dịp ${occ}: Chiếc vòng tay khắc tọa độ ngày kỷ niệm tạo sự kết nối bí mật giữa hai người, kết hợp hương nến thơm gỗ ấm giúp kích hoạt cảm giác thư thái và hoài niệm mỗi khi ở cạnh nhau.`,
          presentationIdea: 'Giấu chiếc vòng tay bên dưới lớp hoa khô trong hộp quà, kèm thiệp viết tay kể lại ngày đầu hai bạn gặp nhau.',
          actionTip: 'Đặt làm tại các tiệm bạc thiết kế khắc laser riêng, nến thơm tự nhiên thủ công có thời gian chuẩn bị 2-3 ngày.'
        },
        {
          title: 'Vé Trải Nghiệm Workshop Nặn Gốm / Làm Nước Hoa Signature 2 Người',
          category: 'Trải nghiệm & Hẹn hò',
          estimatedPrice: formatPrice(Math.round(budgetNum * 1.05)),
          whyItFits: `Đáp ứng hoàn hảo sở thích (${hobStr}) và tạo ra kỷ niệm chung vô giá. Theo tâm lý học, những buổi hẹn hò cùng làm một điều mới lạ tạo ra lượng dopamine kết nối cao gấp 3 lần tặng vật phẩm thông thường.`,
          presentationIdea: 'In voucher thành một chiếc vé máy bay/vé xem phim giả lập để trong cuốn sách người ấy yêu thích.',
          actionTip: 'Đặt lịch trước 3 ngày tại các xưởng gốm hoặc studio nước hoa nghệ nhân tại Hà Nội/TP.HCM.'
        },
        {
          title: 'Album Ảnh Scrapbook Bìa Da Khung Gỗ 365 Ngày & Bút Nhũ Vàng',
          category: 'Handmade & Kỷ niệm',
          estimatedPrice: formatPrice(Math.round(budgetNum * 0.6)),
          whyItFits: `Chạm thẳng vào trái tim người nhận với chi tiết (${specialNotes || 'chặng đường bên nhau'}). Món quà thể hiện thời gian và tâm sức bạn đầu tư chứ không đơn thuần là chi tiêu tiền bạc.`,
          presentationTip: 'Chừa sẵn 5 trang cuối cùng còn trống và dán giấy nhớ: "Dành cho những chuyến đi tiếp theo của chúng mình".',
          actionTip: 'In ảnh polaroid chất lượng cao và mua set sổ kraft thủ công kèm phụ kiện trang trí.'
        }
      ],
      consultantAdvice: `Khi tặng quà cho người yêu nhân dịp ${occ}, hãy chọn không gian riêng tư, ấm cúng và trao quà bằng ánh mắt chân thành. Quan trọng nhất là lời nhắn gửi đi kèm sẽ quyết định 80% cảm xúc của người nhận.`
    };
  }

  if (recipientType === 'bestfriend') {
    return {
      recommendations: [
        {
          title: 'Hộp Quà Tri Kỷ: Đèn Ngủ Mặt Trăng Cảm Ứng & Hũ Trà Thảo Mộc',
          category: 'Chăm sóc bản thân & Thư giãn',
          estimatedPrice: formatPrice(Math.round(budgetNum * 0.8)),
          whyItFits: `Thể hiện sự chăm sóc sức khỏe tinh thần cho bạn thân, đúng gu (${hobStr}). Vừa là vật dụng decor xinh xắn vừa nhắc nhở bạn thân ngủ sớm và thư giãn sau giờ làm căng thẳng.`,
          presentationIdea: 'Kẹp vào nắp hộp 3 tấm ảnh dìm hàng đáng yêu nhất từ những chuyến đi chung.',
          actionTip: 'Dễ dàng đặt mua tại các tiệm decor tối giản hoặc cửa hàng thảo mộc an thần.'
        },
        {
          title: 'Boardgame Hội Bạn "Tâm Sự Đêm Khuya" & Gói Snack Khổng Lồ',
          category: 'Sách & Boardgame',
          estimatedPrice: formatPrice(Math.round(budgetNum * 0.5)),
          whyItFits: `Món quà hoàn hảo để kích hoạt những tràng cười sảng khoái và khui ra những bí mật lầy lội trong những buổi ngủ lang qua đêm (sleepover).`,
          presentationIdea: 'Mang theo trong buổi tụ tập cuối tuần và mở hộp quà ngay giữa bữa tiệc.',
          actionTip: 'Các bộ bài phiên bản Việt hóa giới trẻ trên Shopee Mall chính hãng.'
        },
        {
          title: 'Bình Giữ Nhiệt Thép 316 Khắc Tên Riêng & Voucher Workshop',
          category: 'Tiện ích & Thể thao',
          estimatedPrice: formatPrice(Math.round(budgetNum * 0.95)),
          whyItFits: `Độ thực tế cao, đồng hành cùng bạn thân mỗi ngày tại văn phòng hoặc phòng tập, nhắc nhở uống đủ nước và giữ gìn sức khỏe.`,
          presentationIdea: 'Pha sẵn một bình trà đào mát lạnh vào bên trong trước khi đưa cho bạn thân.',
          actionTip: 'Chọn dòng bình Lock&Lock hoặc Stanley có dịch vụ khắc tên laser.'
        }
      ],
      consultantAdvice: 'Với bạn thân, sự tự nhiên và thấu hiểu là chìa khóa. Hãy gửi kèm một tấm thiệp với giọng văn dí dỏm trêu đùa nhưng vẫn ấm áp tình bạn.'
    };
  }

  // Family / Coworker generic
  return {
    recommendations: [
      {
        title: 'Hộp Trà Dưỡng Sinh Thảo Mộc Thượng Hạng & Cốc Gốm Nghệ Nhân',
        category: 'Sức khỏe & Bình an',
        estimatedPrice: formatPrice(Math.round(budgetNum * 0.9)),
        whyItFits: `Món quà hiếu kính và trang nhã, thể hiện sự quan tâm chu đáo đến sức khỏe và giấc ngủ ngon mỗi tối, phù hợp với dịp ${occ}.`,
        presentationIdea: 'Tự tay đun ấm nước sôi và mời chén trà nóng đầu tiên khi trao hộp quà.',
        actionTip: 'Chọn trà hoa cúc hoàng gia, táo đỏ kỷ tử tại các tiệm thảo mộc hữu cơ uy tín.'
      },
      {
        title: 'Máy Massage Cổ Vai Gáy Chườm Nóng Công Thái Học',
        category: 'Chăm sóc sức khỏe',
        estimatedPrice: formatPrice(Math.round(budgetNum * 1.1)),
        whyItFits: `Vô cùng thiết thực, xoa dịu các cơn đau mỏi xương khớp hay mỏi vai gáy sau một ngày làm việc mệt mỏi.`,
        presentationIdea: 'Bóc hộp và hướng dẫn người nhận cách bấm nút dùng thử ngay tại chỗ.',
        actionTip: 'Các dòng máy Philips, Breo hoặc Jeeback bảo hành chính hãng 12 tháng.'
      },
      {
        title: 'Sổ Bìa Da Khóa Đồng Doanh Nhân & Bút Ký Khắc Laser Tên',
        category: 'Công sở & Phong cách',
        estimatedPrice: formatPrice(Math.round(budgetNum * 0.7)),
        whyItFits: `Lịch thiệp, trang nhã, nâng tầm phong thái làm việc và ghi chép kế hoạch trong công việc hàng ngày.`,
        presentationIdea: 'Kẹp tấm thiệp chúc mừng thành công và may mắn vào trang bìa đầu tiên.',
        actionTip: 'Đặt xưởng da thủ công dập tên hoặc khắc laser chữ lồng kim loại.'
      }
    ],
    consultantAdvice: `Hãy chuẩn bị hộp quà thật chỉn chu, thắt nơ trang nhã và trao bằng hai tay cùng lời chúc bình an, sức khỏe.`
  };
}

function getAffordableGifts(recipientType: string, budget: number): GiftItem[] {
  const targetPrice = budget * 0.8;
  return GIFTS_DATABASE.filter((gift) => gift.price <= budget)
    .sort((a, b) => {
      const aMatchesRecipient = a.relationships.some((relationship) => relationship === recipientType);
      const bMatchesRecipient = b.relationships.some((relationship) => relationship === recipientType);
      return (
        Number(bMatchesRecipient) - Number(aMatchesRecipient) ||
        Math.abs(targetPrice - a.price) - Math.abs(targetPrice - b.price)
      );
    })
}

function generateFallbackGifts(
  recipientType: string,
  budget: number,
  gifts: GiftItem[]
) {
  return {
    recommendations: gifts.slice(0, 3).map((gift) => ({
      title: gift.title,
      category: gift.categoryName,
      estimatedPrice: new Intl.NumberFormat('vi-VN').format(gift.price) + 'đ',
      whyItFits:
        gift.relationshipFit[recipientType as RelationshipCategory] || gift.whyItFits,
      presentationIdea: gift.presentationTip,
      actionTip: 'Kiểm tra giá hiện tại, phí giao hàng và độ uy tín của nơi bán trước khi mua.',
    })),
    consultantAdvice: `Các gợi ý đều có giá không vượt ngân sách ${new Intl.NumberFormat('vi-VN').format(budget)}đ. Hãy xác nhận lại giá bán hiện tại trước khi đặt mua.`,
  };
}

// Endpoint for AI Gift Recommendations
app.post('/api/gemini/suggest', async (req, res) => {
  const { recipientType, relationshipDetail, hobbies, budgetVND, occasion, specialNotes } = req.body;
  const budget = Number(budgetVND);
  if (!Number.isFinite(budget) || budget <= 0) {
    return res.status(400).json({ error: 'Vui lòng nhập ngân sách hợp lệ lớn hơn 0.' });
  }

  const affordableGifts = getAffordableGifts(recipientType, budget);
  if (affordableGifts.length === 0) {
    return res.json({
      error: 'Danh mục hiện chưa có món quà nào trong mức ngân sách này. Hãy thử tăng ngân sách.',
    });
  }

  // Try calling Gemini model with fallback cascade
  if (ai) {
    const prompt = `Bạn là chuyên gia tư vấn quà tặng tâm lý cao cấp tại Việt Nam.
Hãy chọn tối đa 3 món phù hợp nhất CHỈ từ danh sách sản phẩm bên dưới:
- Đối tượng: ${recipientType} (${relationshipDetail || 'Không rõ'})
- Sở thích/Phong cách sống: ${Array.isArray(hobbies) ? hobbies.join(', ') : hobbies || 'Đa dạng'}
- Ngân sách tối đa tuyệt đối: ${budget.toLocaleString('vi-VN')} VNĐ
- Dịp tặng: ${occasion || 'Kỷ niệm đặc biệt'}
- Chi tiết / Kỷ niệm riêng: ${specialNotes || 'Không có'}

Không được tạo sản phẩm mới, thay đổi giá hoặc chọn món vượt ngân sách. Mỗi đề xuất phải chứa đúng giftId từ danh sách.
Danh sách sản phẩm đủ ngân sách:
${JSON.stringify(affordableGifts.map(({ id, title, categoryName, price, shortDesc, tags }) => ({
  giftId: id,
  title,
  category: categoryName,
  price,
  description: shortDesc,
  tags,
})))}

Yêu cầu trả về đúng định dạng JSON có cấu trúc sau:
{
  "recommendations": [
    {
      "giftId": "ID phải lấy từ danh sách",
      "whyItFits": "Lý do tâm lý tại sao người nhận sẽ xúc động (2-3 câu sâu sắc)",
      "presentationIdea": "Cách gói hoặc tạo bất ngờ khi tặng",
      "actionTip": "Lời khuyên kiểm tra nơi mua, không tự bịa shop"
    }
  ],
  "consultantAdvice": "Lời khuyên tâm lý ngắn gọn từ chuyên gia về cách trao quà."
}`;

    const modelsToTry = ['gemini-3.8-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];
    for (const modelName of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        if (response.text) {
          const parsed = cleanJsonOutput(response.text);
          if (parsed && Array.isArray(parsed.recommendations)) {
            const giftsById = new Map(affordableGifts.map((gift) => [gift.id, gift]));
            const usedGiftIds = new Set<string>();
            const recommendations = parsed.recommendations.flatMap((recommendation: any) => {
              const gift = giftsById.get(recommendation?.giftId);
              if (!gift || usedGiftIds.has(gift.id) || gift.price > budget) return [];
              usedGiftIds.add(gift.id);
              return [{
                title: gift.title,
                category: gift.categoryName,
                estimatedPrice: new Intl.NumberFormat('vi-VN').format(gift.price) + 'đ',
                whyItFits:
                  typeof recommendation.whyItFits === 'string'
                    ? recommendation.whyItFits
                    : gift.whyItFits,
                presentationIdea:
                  typeof recommendation.presentationIdea === 'string'
                    ? recommendation.presentationIdea
                    : gift.presentationTip,
                actionTip:
                  typeof recommendation.actionTip === 'string'
                    ? recommendation.actionTip
                    : 'Kiểm tra giá hiện tại và độ uy tín của nơi bán trước khi mua.',
              }];
            }).slice(0, 3);

            if (recommendations.length > 0) {
              return res.json({
                recommendations,
                consultantAdvice:
                  typeof parsed.consultantAdvice === 'string' ? parsed.consultantAdvice : '',
              });
            }
          }
        }
      } catch (err: any) {
        console.warn(`Model ${modelName} unavailable (${err?.message || err}).`);
      }
    }
  }

  // Graceful fallback to guaranteed tailored synthesis
  const fallback = generateFallbackGifts(recipientType, budget, affordableGifts);
  return res.json(fallback);
});

// Endpoint for Personalized Card Message Generation
app.post('/api/gemini/card', async (req, res) => {
  const { recipientName, recipientType, occasion, memories, giftDetails, tone } = req.body;

  if (ai) {
    const prompt = `Bạn là chuyên gia viết lời chúc thiệp mừng đầy cảm xúc, tinh tế và văn phong tự nhiên tại Việt Nam.
Hãy viết đúng 3 phiên bản lời chúc ngắn gọn, cá nhân hóa theo thông tin sau:
- Người nhận: ${recipientName || 'Người thương'}
- Mối quan hệ: ${recipientType || 'Người yêu'}
- Dịp kỷ niệm / Sự kiện: ${occasion || 'Kỷ niệm đặc biệt'}
- Món quà gửi kèm: ${giftDetails || 'Món quà tình cảm chân thành'}
- Kỷ niệm hoặc chi tiết đặc biệt cần nhắc đến: ${memories || 'Những khoảnh khắc gắn bó bên nhau'}
- Phong cách ưu tiên: ${tone || 'Chân thành & Cá nhân hóa'}

YÊU CẦU BẮT BUỘC:
1. Mỗi lời chúc dài 2-3 câu, viết bằng tiếng Việt tự nhiên, ấm áp, tránh sáo rỗng.
2. Nhắc đến món quà và ít nhất một chi tiết/kỷ niệm riêng một cách tự nhiên.
3. Trả về đúng JSON, không thêm nội dung ngoài JSON:
{
  "cards": [
    {
      "style": "Lãng mạn & Ngọt ngào",
      "message": "Nội dung lời chúc ngọt ngào, lồng ghép ý nghĩa của món quà trao tay..."
    },
    {
      "style": "Hài hước & Dí dỏm",
      "message": "Nội dung lời chúc đáng yêu, trêu đùa dí dỏm về món quà và kỷ niệm..."
    },
    {
      "style": "Tinh tế & Sâu lắng",
      "message": "Nội dung lời chúc sâu sắc, tôn vinh chặng đường đã qua và món quà kỷ niệm..."
    }
  ]
}`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          maxOutputTokens: 700,
          httpOptions: {
            timeout: 8000,
            retryOptions: { attempts: 1 },
          },
        },
      });

      if (response.text) {
        const parsed = cleanJsonOutput(response.text);
        const cards = Array.isArray(parsed?.cards)
          ? parsed.cards.filter(
              (card: any) =>
                typeof card?.style === 'string' &&
                typeof card?.message === 'string' &&
                card.message.trim().length > 0
            )
          : [];
        if (cards.length > 0) {
          return res.json({ cards, source: 'ai' });
        }
      }
      console.warn('Card generation returned no usable cards; using the local fallback.');
    } catch (err: any) {
      console.warn(`Card generation failed; using the local fallback (${err?.message || err}).`);
    }
  }

  const fallbackCards = generateFallbackCards(recipientName, recipientType, occasion, memories, giftDetails);
  return res.json({ cards: fallbackCards, source: 'fallback' });
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(__dirname));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

startServer();
