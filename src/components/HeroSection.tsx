"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 200); }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Gradient background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a2e] via-[#1a1a4e] to-[#0a0a1a]" />
      <div className="absolute inset-0 opacity-30 gradient-radial-hero" />

      {/* Floating characters */}
      <div className={`absolute left-[15%] top-[30%] transition-all duration-1000 animate-float-custom ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-blue-500/50 border-2 border-blue-300/50">
          Na⁺
        </div>
        <div className="text-center text-xs mt-2 text-blue-300 font-bold">Hiệp sĩ</div>
      </div>

      <div className={`absolute right-[15%] top-[35%] transition-all duration-1000 delay-300 animate-float-delayed ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-purple-500/50 border-2 border-purple-300/50">
          Cl⁻
        </div>
        <div className="text-center text-xs mt-2 text-purple-300 font-bold">Công chúa</div>
      </div>

      {/* Main Title */}
      <div className={`relative z-10 text-center px-6 transition-all duration-1000 delay-100 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="mb-4 text-6xl animate-float-emoji">🧂</div>
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)", y: 50, rotateX: 30 }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0, rotateX: 0 }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.5, delay: 0.3 }}
          className="font-[var(--font-display)] text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight drop-shadow-[0_0_30px_rgba(79,70,229,0.5)]"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] via-[#06B6D4] to-[#8B5CF6]">
            Bí Ẩn Của
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] via-[#EF4444] to-[#8B5CF6]">
            Muối Ăn
          </span>
        </motion.h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10 line-height-2">
          Khám phá hành trình kỳ diệu của NaCl — từ đại dương mênh mông đến bàn ăn mỗi ngày, qua lăng kính truyện tranh tương tác và trò chơi khoa học
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] text-white font-bold text-lg shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300"
          >
            🚀 Bắt Đầu Phiêu Lưu
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-sm text-gray-400">Cuộn xuống</span>
        <span className="text-2xl">⬇️</span>
      </div>
    </section>
  );
}
