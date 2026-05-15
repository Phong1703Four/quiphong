"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function VideoSection() {
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
    <section className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-20">
      <div className="text-center mb-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, filter: "blur(5px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
          className="inline-block"
        >
          <span className="text-sm font-bold text-[#EC4899] tracking-widest uppercase">Video Học Tập</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 30, scale: 0.9, filter: "blur(10px)", rotateX: 20 }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)", rotateX: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, type: "spring", bounce: 0.4, delay: 0.2 }}
          className="font-[var(--font-display)] text-3xl md:text-4xl font-extrabold mt-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
        >
          🎬 Hoạt Hình Câu Chuyện Muối Ăn
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-400 mt-3 max-w-lg mx-auto" 
          style={{ lineHeight: "1.9" }}
        >
          Xem video hoạt hình tiếng Việt kể lại toàn bộ câu chuyện NaCl
        </motion.p>
      </div>

      <div ref={ref} className={`transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}>
        <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-[#1e1b4b]/80 to-[#0f172a] border border-white/10 shadow-2xl">
          {/* Main Video */}
          <div className="aspect-video bg-black">
            <video controls className="w-full h-full" poster="" preload="metadata">
              <source src="/assets/nacl-story.mp4" type="video/mp4" />
              Trình duyệt của bạn không hỗ trợ video.
            </video>
          </div>
          <div className="p-6">
            <h3 className="font-[var(--font-display)] text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-2">
              Câu Chuyện Hoạt Hình Về Muối Ăn
            </h3>
            <p className="text-sm text-gray-400" style={{ lineHeight: "1.9" }}>
              Video hoạt hình tiếng Việt kể lại hành trình kỳ diệu của NaCl — từ đại dương đến bàn ăn, 
              từ liên kết ion đến ứng dụng trong đời sống. Phù hợp cho học sinh THPT học bài 22.
            </p>
            <div className="flex gap-2 mt-4 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold">Hoạt hình</span>
              <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold">Tiếng Việt</span>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">NaCl</span>
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold">Bài 22</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
