"use client";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  soundOn: boolean;
  setSoundOn: () => void;
}

const tabs = [
  { id: "story", label: "📖 Truyện Tranh", gradient: "from-[#4F46E5] to-[#8B5CF6]", shadow: "shadow-purple-500/30" },
  { id: "knowledge", label: "🔬 Kiến Thức", gradient: "from-[#F59E0B] to-[#EF4444]", shadow: "shadow-amber-500/30" },
  { id: "video", label: "🎬 Video", gradient: "from-[#EC4899] to-[#8B5CF6]", shadow: "shadow-pink-500/30" },
  { id: "games", label: "🎮 Trò Chơi", gradient: "from-[#06B6D4] to-[#10B981]", shadow: "shadow-cyan-500/30" },
];

export default function Navbar({ activeTab, setActiveTab, soundOn, setSoundOn }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0a0a1a]/80 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-2xl">🧂</span>
          <span className="font-[var(--font-display)] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] text-lg hidden sm:inline">
            NaCl Universe
          </span>
        </div>

        <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 overflow-x-auto scrollbar-hide">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 whitespace-nowrap ${
                activeTab === t.id
                  ? `bg-gradient-to-r ${t.gradient} text-white shadow-lg ${t.shadow}`
                  : "text-gray-400 hover:text-white"
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        <button onClick={setSoundOn}
          className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-base hover:bg-white/10 transition-colors shrink-0"
          aria-label="Toggle sound">
          {soundOn ? "🔊" : "🔇"}
        </button>
      </div>
    </nav>
  );
}
