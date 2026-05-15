"use client";
import Image from "next/image";
import { motion } from "framer-motion";

// ===== CHAPTER DATA =====
const chapters = [
  {
    id: 1, title: "Chuyến Phiêu Lưu Bắt Đầu!",
    color: "from-cyan-400 to-blue-500",
    bgGrad: "from-[#0c4a6e]/80 to-[#0f172a]",
    emoji: "🌊",
    image: "/assets/comic-strip.jpg", // Restored original image for Chapter 1
    imageCaption: "Toàn cảnh biển lớn — Chuyến phiêu lưu khám phá Bí Ẩn Muối Ăn bắt đầu!",
    naText: "Chào các bạn! Tớ là Na⁺, hiệp sĩ dũng cảm đến từ nhóm kim loại kiềm! Hôm nay chúng ta sẽ bắt đầu một cuộc phiêu lưu tuyệt vời!",
    clText: "Còn tớ là Cl⁻! Một cô công chúa thông minh đến từ nhóm Halogen. Cùng khám phá bí mật đại dương nào!",
    narration: "Tại bờ biển xanh thẳm, nơi sóng vỗ rì rào, hai nhân vật nhỏ bé bắt đầu cuộc hành trình vĩ đại. Đại dương chứa hàng tỷ tấn muối hòa tan — và câu chuyện kỳ diệu của chúng bắt đầu từ đây...",
    fact: "Đại dương chứa khoảng 50 triệu tỷ tấn muối. Nếu lấy hết muối ra, nó có thể phủ kín toàn bộ mặt đất dày tới 150 mét!",
  },
  {
    id: 2, title: "Na⁺ Gặp Cl⁻",
    color: "from-blue-400 to-purple-500",
    bgGrad: "from-[#1e1b4b]/80 to-[#0f172a]",
    emoji: "💕",
    image: "/assets/story/ch2_meeting_1778771934124.png",
    imageCaption: "Khoảnh khắc định mệnh khi Hiệp sĩ Na⁺ gặp Công chúa Cl⁻",
    naText: "Xin chào! Tớ là Na⁺! Tớ có dư 1 electron trên lớp vỏ ngoài cùng, và tớ rất muốn trao nó cho ai đó xứng đáng!",
    clText: "Còn tớ là Cl⁻! Tớ thiếu đúng 1 electron. Có lẽ chúng ta sinh ra là dành cho nhau rồi!",
    narration: "Hiệp sĩ Na⁺ mặc áo giáp xanh lấp lánh, tay cầm kiếm và khiên, dũng mãnh nhưng nóng tính. Công chúa Cl⁻ xinh đẹp trong bộ váy tím huyền bí. Họ gặp nhau trên bãi biển và nhận ra rằng mỗi người đều có thứ mà người kia cần...",
    fact: "Natri (Na) thuộc nhóm IA, có 1 electron lớp ngoài cùng. Clo (Cl) thuộc nhóm VIIA, có 7 electron lớp ngoài cùng (cần thêm 1e).",
  },
  {
    id: 3, title: "Hợp Lực — Liên Kết Ion!",
    color: "from-yellow-400 to-orange-500",
    bgGrad: "from-[#78350f]/80 to-[#0f172a]",
    emoji: "⚡",
    image: "/assets/story/ch3_bond_1778771950013.png",
    imageCaption: "Cú chạm ma thuật — Electron được trao đổi tạo ra liên kết Ion bền vững",
    naText: "Nhận lấy electron của ta! Đây chính là sứ mệnh của ta — trao đi để cả hai cùng ổn định!",
    clText: "Hợp lực nhé! Khi Na nhường 1e cho Cl, Na trở thành Na⁺, Cl trở thành Cl⁻. Lực hút tĩnh điện giữa hai ion trái dấu tạo nên LIÊN KẾT ION!",
    narration: "Khoảnh khắc lịch sử! Na trao electron duy nhất cho Cl. Một vụ nổ ánh sáng rực rỡ xảy ra! Na⁺ và Cl⁻ hút nhau mãnh liệt bằng lực tĩnh điện Coulomb, tạo nên liên kết ion — một trong những liên kết bền vững nhất trong hóa học!",
    fact: "Liên kết ion: Na → Na⁺ + 1e⁻ và Cl + 1e⁻ → Cl⁻. Lực hút tĩnh điện giữa Na⁺ và Cl⁻ tạo nên hợp chất NaCl bền vững.",
  },
  {
    id: 4, title: "Nổ Sáng! Tôi Là Muối Ăn!",
    color: "from-amber-400 to-yellow-300",
    bgGrad: "from-[#451a03]/80 to-[#0f172a]",
    emoji: "✨",
    image: "/assets/story/ch4_salt_mascot_1778771968354.png",
    imageCaption: "Mascot Muối Ăn xuất hiện rực rỡ!",
    naText: "Na⁺ + Cl⁻ → NaCl! Chúng ta đã trở thành MỘT! Đây chính là muối ăn — NaCl!",
    clText: "Tớ là muối ăn! Một tinh thể lập phương hoàn hảo, trắng tinh, vị mặn đặc trưng!",
    narration: "Từ hai nguyên tử đơn lẻ, NaCl ra đời — mascot muối ăn đáng yêu hình lập phương trắng muốt. Cậu ta vui vẻ giới thiệu mình với thế giới: công thức NaCl, tinh thể rắn, màu trắng, vị mặn, tan tốt trong nước!",
    fact: "NaCl: M = 58.44 g/mol, tinh thể lập phương, nhiệt độ nóng chảy 801°C, độ hòa tan ~360g/L (20°C). Trắng, vị mặn, dẫn điện khi nóng chảy/hòa tan.",
  },
  {
    id: 5, title: "Ruộng Muối Ven Biển",
    color: "from-orange-400 to-red-400",
    bgGrad: "from-[#7c2d12]/80 to-[#0f172a]",
    emoji: "☀️",
    image: "/assets/story/ch5_salt_pond_1778772001004.png",
    imageCaption: "Quá trình kết tinh muối từ nước biển dưới ánh nắng mặt trời",
    naText: "Mặt trời ơi, hãy giúp chúng tớ! Khi nước biển bốc hơi, muối sẽ kết tinh lại!",
    clText: "Đây là phương pháp cổ xưa nhất — phơi nước biển! Giọt nước hoạt hình dễ thương bốc hơi bay lên trời!",
    narration: "Dưới ánh nắng chói chang, nước biển được dẫn vào ruộng muối. Mặt trời tươi cười chiếu nắng, giọt nước nhỏ nhắn từ từ bay hơi lên trời. Những hạt muối trắng lấp lánh dần hiện ra trên mặt ruộng...",
    fact: "Phơi nước biển (solar evaporation) là phương pháp khai thác muối truyền thống. Ngoài ra còn có khai thác mỏ muối (halite) từ lòng đất.",
  },
  {
    id: 6, title: "Bác Sĩ Muối Giảng Bài",
    color: "from-emerald-400 to-teal-500",
    bgGrad: "from-[#064e3b]/80 to-[#0f172a]",
    emoji: "👨‍⚕️",
    image: "/assets/story/ch6_doctor_salt_1778772020610.png",
    imageCaption: "Bác sĩ Muối giải thích các tính chất hóa học quan trọng",
    naText: "Bác sĩ Muối thông thái cầm bảng kiến thức! Hãy lắng nghe ông ấy nhé!",
    clText: "Tính chất vật lý: NaCl là tinh thể rắn, màu trắng, vị mặn, tan tốt trong nước. Đơn giản nhưng rất quan trọng!",
    narration: "Bác sĩ Muối — nhân vật thông thái with bộ râu trắng và áo blouse — đứng trước bảng viết. Ông giải thích chi tiết về tính chất hóa học, vật lý của NaCl cho Hiệp sĩ Na và Công chúa Cl nghe...",
    fact: "Tính chất hóa học NaCl: tham gia phản ứng trao đổi, điện phân dung dịch NaCl tạo NaOH, Cl₂, H₂. 2NaCl + 2H₂O → 2NaOH + Cl₂↑ + H₂↑",
  },
  {
    id: 7, title: "Muối Trong Cuộc Sống",
    color: "from-pink-400 to-rose-500",
    bgGrad: "from-[#500724]/80 to-[#0f172a]",
    emoji: "🍳",
    image: "/assets/story/ch7_salt_life_1778772051072.png",
    imageCaption: "Những ứng dụng không thể thiếu của muối trong đời sống",
    naText: "Muối xuất hiện trong BỮA ĂN, BẢO QUẢN THỰC PHẨM, BỆNH VIỆN và NHÀ MÁY!",
    clText: "4 ứng dụng chính: (1) Gia vị nêm nếm, (2) Muối cá/dưa muối, (3) Nước muối sinh lý 0.9%, (4) Nguyên liệu công nghiệp!",
    narration: "Muối ăn — người bạn thầm lặng không thể thiếu! Từ bát canh nóng hổi, đến lọ dưa muối giòn rụm, từ chai nước muối sinh lý cứu người trong bệnh viện, đến nhà máy sản xuất NaOH và Cl₂...",
    fact: "Ứng dụng NaCl: gia vị (nêm nếm), bảo quản (ướp cá, dưa muối), y tế (NaCl 0.9%), công nghiệp (điện phân sản xuất NaOH, Cl₂, Na), xử lý nước, làm tan băng trên đường.",
  },
  {
    id: 8, title: "Quái Vật Huyết Áp Cao Xuất Hiện!",
    color: "from-red-500 to-orange-500",
    bgGrad: "from-[#7f1d1d]/80 to-[#0f172a]",
    emoji: "👹",
    image: "/assets/story/ch8_blood_pressure_monster_1778772066807.png",
    imageCaption: "Hiệp sĩ và Công chúa chiến đấu chống lại Quái vật Huyết Áp Cao",
    naText: "Ăn quá nhiều muối sẽ rất nguy hiểm! Quái vật Huyết Áp Cao sẽ tấn công!",
    clText: "Hãy dùng muối hợp lý nhé! WHO khuyến cáo: dưới 5g muối mỗi ngày, tương đương khoảng 1 thìa cà phê!",
    narration: "Quái vật Huyết Áp Cao — một con quỷ đỏ hung tợn — xuất hiện khi ai đó ăn quá nhiều muối! Nhưng đừng lo, Hiệp sĩ Na và Công chúa Cl đã đứng ra bảo vệ mọi người bằng thông điệp: HÃY DÙNG MUỐI HỢP LÝ!",
    fact: "Người Việt tiêu thụ trung bình 9.4g muối/ngày — gần GẤP ĐÔI khuyến cáo của WHO (5g/ngày). Thừa muối gây: tăng huyết áp, bệnh tim mạch, suy thận, đột quỵ.",
  },
];

// ===== SPEECH BUBBLE =====
function SpeechBubble({ text, side, color }: { text: string; side: "left" | "right"; color: string }) {
  const bgColor = color === "blue" ? "bg-blue-50 border-blue-200" : "bg-purple-50 border-purple-200";
  const textColor = color === "blue" ? "text-blue-900" : "text-purple-900";
  return (
    <div className={`relative max-w-md p-4 rounded-2xl text-sm font-[var(--font-comic)] font-bold shadow-md border-2 ${bgColor} ${textColor} ${side === "right" ? "ml-auto" : ""}`}
      style={{ lineHeight: "1.9" }}>
      {text}
      <div className={`absolute bottom-[-10px] ${side === "left" ? "left-6" : "right-6"} w-5 h-5 rotate-45 border-b-2 border-r-2 ${bgColor}`} />
    </div>
  );
}

// ===== CHARACTER BALL =====
function CharBall({ label, gradient }: { label: string; gradient: string }) {
  return (
    <div className={`w-14 h-14 shrink-0 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-extrabold text-sm shadow-lg border-2 border-white/40`}
      style={{ animation: "float 3s ease-in-out infinite" }}>
      {label}
    </div>
  );
}

// ===== CHAPTER CARD =====
function ChapterCard({ ch, idx }: { ch: typeof chapters[0]; idx: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: idx * 0.1 }}
    >
      <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${ch.bgGrad} border border-white/10 shadow-2xl backdrop-blur-sm`}>
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            <span className="text-4xl">{ch.emoji}</span>
            <div>
              <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">Chương {ch.id}</span>
              <h2 className={`font-[var(--font-display)] text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${ch.color}`}>
                {ch.title}
              </h2>
            </div>
          </div>

          {/* Comic strip image */}
          {ch.image && (
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="mb-6 rounded-2xl overflow-hidden border-4 border-white/20 shadow-xl cursor-pointer"
            >
              <Image src={ch.image} alt={ch.imageCaption || ""} width={1200} height={600}
                className="w-full h-auto object-cover max-h-[400px] md:max-h-[500px]" priority={ch.id <= 2} />
              {ch.imageCaption && (
                <div className="bg-black/80 backdrop-blur-sm px-4 py-3 text-center">
                  <p className="text-sm text-gray-300 font-[var(--font-comic)] italic">{ch.imageCaption}</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Narration */}
          <p className="text-gray-300 mb-6 max-w-2xl" style={{ lineHeight: "2.1" }}>{ch.narration}</p>

          {/* Characters talking */}
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex items-start gap-3">
              <CharBall label="Na⁺" gradient="from-blue-400 to-blue-600" />
              <SpeechBubble text={ch.naText} side="left" color="blue" />
            </div>
            <div className="flex items-start gap-3 flex-row-reverse">
              <CharBall label="Cl⁻" gradient="from-purple-400 to-purple-600" />
              <SpeechBubble text={ch.clText} side="right" color="purple" />
            </div>
          </div>

          {/* Science fact */}
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur rounded-xl p-4 border border-amber-500/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔬</span>
              <span className="text-xs font-bold text-[#F59E0B] tracking-wider uppercase">Kiến Thức Hóa Học</span>
            </div>
            <p className="text-sm text-gray-200" style={{ lineHeight: "2" }}>{ch.fact}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function StorySection({}: { soundOn: boolean }) {
  return (
    <section className="relative z-10 max-w-4xl mx-auto px-6 py-20 flex flex-col gap-14">
      <div className="text-center mb-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, filter: "blur(5px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
          className="inline-block"
        >
          <span className="text-sm font-bold text-[#F59E0B] tracking-widest uppercase">Câu Chuyện Bắt Đầu</span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 30, scale: 0.9, filter: "blur(10px)", rotateX: 20 }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)", rotateX: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, type: "spring", bounce: 0.4, delay: 0.2 }}
          className="font-[var(--font-display)] text-3xl md:text-5xl font-extrabold mt-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
        >
          8 Chương · 1 Hành Trình Kỳ Diệu
        </motion.h2>
      </div>

      {chapters.map((ch, i) => (
        <ChapterCard key={ch.id} ch={ch} idx={i} />
      ))}
    </section>
  );
}
