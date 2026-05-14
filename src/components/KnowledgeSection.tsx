"use client";
import { useRef, useState, useEffect } from "react";

const topics = [
  {
    title: "Nguồn Gốc & Khai Thác",
    emoji: "🌊",
    color: "from-cyan-500 to-blue-500",
    items: [
      "Muối ăn (NaCl) có mặt trong nước biển với nồng độ trung bình 3.5%",
      "Phương pháp phơi nước biển: dẫn nước vào ruộng muối, để mặt trời bốc hơi nước",
      "Khai thác mỏ muối (halite) từ các lớp trầm tích dưới lòng đất",
      "Các mỏ muối nổi tiếng: Wieliczka (Ba Lan), Khewra (Pakistan)",
    ],
  },
  {
    title: "Hồ Sơ Hóa Học",
    emoji: "⚗️",
    color: "from-purple-500 to-pink-500",
    items: [
      "Công thức phân tử: NaCl",
      "Liên kết: Ion (Na nhường 1e cho Cl)",
      "Na → Na⁺ + 1e⁻  |  Cl + 1e⁻ → Cl⁻",
      "Lực hút tĩnh điện Coulomb giữa Na⁺ và Cl⁻",
      "Phân tử khối: 58.44 g/mol",
    ],
  },
  {
    title: "Tính Chất Vật Lý",
    emoji: "💎",
    color: "from-emerald-500 to-teal-500",
    items: [
      "Trạng thái: Rắn, tinh thể lập phương",
      "Màu sắc: Trắng hoặc không màu",
      "Vị: Mặn đặc trưng",
      "Nhiệt độ nóng chảy: 801°C",
      "Nhiệt độ sôi: 1.413°C",
      "Độ hòa tan trong nước: ~360g/L (ở 20°C)",
      "Dẫn điện khi nóng chảy hoặc hòa tan trong nước",
    ],
  },
  {
    title: "Ứng Dụng Trong Đời Sống",
    emoji: "🍳",
    color: "from-amber-500 to-orange-500",
    items: [
      "🥘 Gia vị nêm nếm trong ẩm thực",
      "🐟 Bảo quản thực phẩm: ướp cá, dưa muối",
      "💉 Y tế: Nước muối sinh lý NaCl 0.9%",
      "🏭 Công nghiệp: Nguyên liệu sản xuất NaOH, Cl₂, Na",
      "❄️ Làm tan băng trên đường trong mùa đông",
      "🧪 Xử lý nước, sản xuất xà phòng",
    ],
  },
  {
    title: "Cảnh Báo Sức Khỏe",
    emoji: "⚠️",
    color: "from-red-500 to-rose-500",
    items: [
      "WHO khuyến cáo: dưới 5g muối/ngày (~1 thìa cà phê)",
      "Người Việt tiêu thụ trung bình: 9.4g/ngày (GẦN GẤP ĐÔI!)",
      "Thừa muối gây: tăng huyết áp, bệnh tim mạch",
      "Suy thận, đột quỵ, ung thư dạ dày",
      "Thiếu muối cũng nguy hiểm: hạ natri máu, co giật",
    ],
  },
  {
    title: "Phản Ứng Hóa Học Quan Trọng",
    emoji: "🧪",
    color: "from-indigo-500 to-violet-500",
    items: [
      "Điện phân dung dịch NaCl:",
      "2NaCl + 2H₂O → 2NaOH + Cl₂↑ + H₂↑",
      "Phản ứng với AgNO₃ (nhận biết ion Cl⁻):",
      "NaCl + AgNO₃ → AgCl↓ (trắng) + NaNO₃",
      "NaCl + H₂SO₄ đặc → NaHSO₄ + HCl↑",
    ],
  },
];

function TopicCard({ topic, idx }: { topic: typeof topics[0]; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`transition-all duration-600 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ transitionDelay: `${idx * 80}ms` }}>
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/8 hover:-translate-y-1 transition-all duration-300 h-full">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{topic.emoji}</span>
          <h3 className={`font-[var(--font-display)] text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${topic.color}`}>
            {topic.title}
          </h3>
        </div>
        <ul className="space-y-2">
          {topic.items.map((item, i) => (
            <li key={i} className="text-sm text-gray-300 flex items-start gap-2" style={{ lineHeight: "1.9" }}>
              <span className="text-[#F59E0B] mt-1 shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function KnowledgeSection() {
  return (
    <section className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-20">
      <div className="text-center mb-12">
        <span className="text-sm font-bold text-[#F59E0B] tracking-widest uppercase">Kiến Thức Chuyên Sâu</span>
        <h2 className="font-[var(--font-display)] text-3xl md:text-4xl font-extrabold mt-2 text-white">
          🔬 Tổng Hợp Kiến Thức NaCl
        </h2>
        <p className="text-gray-400 mt-3 max-w-lg mx-auto" style={{ lineHeight: "1.9" }}>
          Bài 22: Hydrogen halide — Muối halide
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topics.map((t, i) => (
          <TopicCard key={i} topic={t} idx={i} />
        ))}
      </div>
    </section>
  );
}
