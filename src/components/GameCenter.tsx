"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ========== DATA ==========
const quizzes = [
  { q: "Liên kết trong NaCl thuộc loại nào?", opts: ["Cộng hóa trị", "Ion", "Kim loại", "Van der Waals"], ans: 1, exp: "NaCl là liên kết ion vì Na⁺ và Cl⁻ hút nhau bằng lực tĩnh điện Coulomb. Na nhường electron cho Cl tạo thành hai ion với điện tích trái dấu." },
  { q: "Nồng độ muối trung bình trong nước biển?", opts: ["1.5%", "3.5%", "7%", "15%"], ans: 1, exp: "Nước biển có nồng độ NaCl khoảng 3.5%, chứa khoảng 35g muối/1L nước biển. Đây là giá trị trung bình trên toàn thế giới." },
  { q: "Cấu trúc tinh thể NaCl có dạng?", opts: ["Hình cầu", "Lục giác", "Lập phương", "Tam giác"], ans: 2, exp: "NaCl hình thành tinh thể lập phương trong đó Na⁺ và Cl⁻ xếp xen kẽ, tạo thành hình lập phương đều đặn. Đó là vì sao muối ăn có dạng những hạt vuông nhỏ." },
  { q: "WHO khuyến cáo ăn tối đa bao nhiêu g muối/ngày?", opts: ["10g", "8g", "5g", "15g"], ans: 2, exp: "WHO khuyến cáo không nên vượt quá 5g muối/ngày (tương đương 2g natri). Ăn quá nhiều muối gây tăng huyết áp, bệnh tim mạch, suy thận." },
  { q: "Chuỗi phân rã của NaCl?", opts: ["Na+ + Cl-", "Na2+ + Cl2-", "2Na + Cl2", "NaCl2"], ans: 0, exp: "Khi NaCl phân rã, nó tạo thành Na⁺ (natri dương 1 lần) và Cl⁻ (clo âm 1 lần). Công thức: NaCl → Na⁺ + Cl⁻" },
  { q: "Nhiệt độ nóng chảy của NaCl là bao nhiêu?", opts: ["298°C", "598°C", "801°C", "1100°C"], ans: 2, exp: "NaCl có nhiệt độ nóng chảy là 801°C - rất cao vì liên kết ion rất bền. Ở trạng thái nóng chảy, NaCl trở nên dẫn điện được." },
];

const sortItems = [
  { id: 1, name: "HCl", category: "acid", hint: "Clohydric", exp: "HCl là axit mạnh, tan tốt trong nước tạo H⁺ - đặc trưng của axit." },
  { id: 2, name: "NaOH", category: "base", hint: "Natrium hydroxid", exp: "NaOH là kiềm mạnh, tạo OH⁻ trong nước - đặc trưng của kiềm/base." },
  { id: 3, name: "NaCl", category: "salt", hint: "Muối ăn", exp: "NaCl là muối, tạo thành từ phản ứng giữa axit (HCl) và kiềm (NaOH)." },
  { id: 4, name: "Ca(OH)2", category: "base", hint: "Canxi hydroxid", exp: "Ca(OH)₂ là kiềm, tạo OH⁻ trong nước. Dùng để tẩy trắng và xử lý nước." },
  { id: 5, name: "H2SO4", category: "acid", hint: "Sulfuric", exp: "H₂SO₄ là axit mạnh nhất, tan tốt trong nước. Rất nguy hiểm và dùng rộng rãi trong công nghiệp." },
  { id: 6, name: "KCl", category: "salt", hint: "Kali clorua", exp: "KCl là muối, tạo từ K (kim loại kiềm) và Cl. Dùng làm phân bón và bổ sung kali." },
];

const phItems = [
  { name: "Axit dạ dày", val: 1, cat: "acid", exp: "Axit dạ dày có pH ≈ 1-2, rất axit. Chứa HCl tự nhiên để tiêu hóa thức ăn." },
  { name: "Chanh", val: 2, cat: "acid", exp: "Nước chanh có pH ≈ 2-3, rất axit. Chứa axit citric giúp giải khát và bổ sung vitamin C." },
  { name: "Nước nguyên chất", val: 7, cat: "neutral", exp: "Nước nguyên chất có pH = 7, trung tính hoàn toàn. Không quá axit cũng không quá kiềm." },
  { name: "Nước xà phòng", val: 10, cat: "base", exp: "Nước xà phòng có pH ≈ 9-10, kiềm. Chứa NaOH giúp làm sạch và bảo vệ da." },
  { name: "Amoniac", val: 11, cat: "base", exp: "Dung dịch amoniac có pH ≈ 11-13, kiềm mạnh. Dùng để vệ sinh và tẩy rửa." },
];

const trueFalse = [
  { q: "NaCl dẫn điện ở trạng thái rắn.", a: false, exp: "Sai! NaCl rắn không dẫn điện vì ion Na⁺ và Cl⁻ bị cố định. Chỉ dẫn điện khi nóng chảy hoặc hòa tan trong nước." },
  { q: "Natri là kim loại kiềm.", a: true, exp: "Đúng! Na thuộc nhóm IA - các kim loại kiềm. Rất phản ứng và thường dự trữ dưới dầu do dễ bắt lửa." },
  { q: "Clo là chất khí màu vàng lục.", a: true, exp: "Đúng! Cl₂ là khí màu vàng lục đặc trưng, có mùi khó chịu. Được dùng để khử trùng nước uống." },
  { q: "Nước muối sinh lý có nồng độ 0.9%.", a: true, exp: "Đúng! Nước muối sinh lý (NaCl 0.9%) là đẳng thẩm - có nồng độ bằng với máu. Được dùng trong y tế để truyền hoặc rửa vết thương." },
  { q: "NaCl tan tốt trong nước.", a: true, exp: "Đúng! NaCl tan rất tốt trong nước (khoảng 360g/L ở 20°C) vì nước là chất lỏng cực.", },
  { q: "Cl- có số oxyhoá là -2.", a: false, exp: "Sai! Cl⁻ có số oxyhoá là -1, không phải -2. Vì Cl chỉ gain 1 electron từ Na để hoàn thành vỏ ngoài." },
];

const equations = [
  { eq: "2Na + Cl₂ → ?NaCl", ans: "2", hint: "Cân bằng phương trình", exp: "Phương trình cân bằng: 2Na + Cl₂ → 2NaCl. Mỗi Na nhường 1e cho Cl₂, nên cần 2Na để cân bằng 2 atom Cl." },
  { eq: "?NaCl → Na⁺ + Cl⁻", ans: "1", hint: "Phân rã NaCl", exp: "Một phân tử NaCl phân rã thành một Na⁺ và một Cl⁻. Công thức: 1NaCl → Na⁺ + Cl⁻" },
  { eq: "Na + ?H₂O → NaOH + ½H₂", ans: "2", hint: "Na phản ứng với nước", exp: "Phương trình cân bằng: 2Na + 2H₂O → 2NaOH + H₂↑. Natri rất phản ứng và bắt O từ nước để tạo NaOH." },
];

// ========== HELPER ==========
function fireConfetti(x: number, y: number) {
  const colors = ["#4F46E5", "#06B6D4", "#F59E0B", "#10B981", "#EF4444", "#8B5CF6"];
  for (let i = 0; i < 30; i++) {
    const el = document.createElement("div");
    const angle = (Math.PI * 2 * i) / 30;
    const velocity = 5 + Math.random() * 10;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity - 3;
    el.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:8px;height:8px;background:${colors[Math.floor(Math.random() * colors.length)]};border-radius:50%;pointer-events:none;z-index:9999;`;
    document.body.appendChild(el);
    let px = x, py = y, vvx = vx, vvy = vy;
    const animate = () => {
      px += vvx;
      py += vvy;
      vvy += 0.2;
      el.style.left = px + "px";
      el.style.top = py + "px";
      el.style.opacity = (1 - (Date.now() - start) / 1500).toString();
      if (Date.now() - start < 1500) requestAnimationFrame(animate);
      else el.remove();
    };
    const start = Date.now();
    animate();
  }
}


// ========== GAMES WITH STATE MANAGEMENT ==========

// 1. Quiz Game - IMPROVED
function QuizGame() {
  const [curr, setCurr] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handle = (i: number, e: any) => {
    if (selected !== null) return;
    setSelected(i);
    
    if (i === quizzes[curr].ans) {
      setFeedback("correct");
      setScore(s => s + 1);
      fireConfetti(e.clientX, e.clientY);
      setShowExplanation(false);
      setTimeout(() => {
        if (curr < quizzes.length - 1) {
          setCurr(c => c + 1);
          setSelected(null);
          setFeedback(null);
        } else {
          setDone(true);
        }
      }, 800);
    } else {
      setFeedback("wrong");
      setShowExplanation(true);
    }
  };

  if (done) {
    return (
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="text-center py-12">
        <div className="text-5xl mb-4">🏆</div>
        <p className="text-2xl font-bold text-white mb-2">Hoàn thành!</p>
        <p className="text-3xl font-bold text-emerald-400">{score}/{quizzes.length} điểm</p>
        <div className="w-full bg-white/10 rounded-full h-2 mt-6">
          <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${(score / quizzes.length) * 100}%` }} />
        </div>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-400">Câu {curr + 1}/{quizzes.length}</span>
        <div className="flex gap-2">
          {Array.from({ length: quizzes.length }).map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full transition-all ${i < curr ? "bg-emerald-500" : i === curr ? "bg-indigo-500" : "bg-white/20"}`} />
          ))}
        </div>
      </div>
      <h4 className="text-lg font-bold text-white text-left">{quizzes[curr].q}</h4>
      <div className="grid gap-3">
        {quizzes[curr].opts.map((o, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: selected === null ? 1.02 : 1 }}
            onClick={(e) => handle(i, e)}
            disabled={selected !== null}
            className={`p-4 rounded-xl text-left font-semibold transition-all ${
              selected === null ? "bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer" :
              i === selected ? (feedback === "correct" ? "bg-emerald-500/30 border-emerald-500" : "bg-red-500/30 border-red-500") :
              i === quizzes[curr].ans ? "bg-emerald-500/30 border-emerald-500" :
              "bg-white/5 border-white/10 opacity-50"
            }`}>
            {o}
          </motion.button>
        ))}
      </div>
      {feedback && (
        <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="space-y-4">
          <p className={`text-center font-bold ${feedback === "correct" ? "text-emerald-400" : "text-red-400"}`}>
            {feedback === "correct" ? "✓ Chính xác!" : "✗ Sai rồi!"}
          </p>
          {showExplanation && (
            <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              className="p-4 bg-blue-500/20 border border-blue-500/50 rounded-lg text-sm text-gray-200">
              <p className="font-bold text-blue-300 mb-2">💡 Giải thích:</p>
              <p>{quizzes[curr].exp}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setSelected(null);
                  setFeedback(null);
                  setShowExplanation(false);
                  if (curr < quizzes.length - 1) setCurr(c => c + 1);
                  else setDone(true);
                }}
                className="mt-3 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold text-sm">
                Tiếp tục
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}

// 2. Ion Bonding Game - IMPROVED
function DragGame() {
  const [steps, setSteps] = useState(0);
  const [done, setDone] = useState(false);
  const [positions, setPositions] = useState({ na: { x: -100, y: -100 }, cl: { x: 100, y: 100 } });
  const naRef = useRef<HTMLDivElement>(null);
  const clRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (ion: "na" | "cl", info: any) => {
    if (done) return;
    setPositions(p => ({ ...p, [ion]: { x: info.offset.x, y: info.offset.y } }));
    setSteps(s => s + 1);

    const dist = Math.sqrt(
      Math.pow((positions.na.x + 100) - (positions.cl.x - 100), 2) +
      Math.pow((positions.na.y + 100) - (positions.cl.y - 100), 2)
    );

    if (dist < 120 && steps > 2) {
      setDone(true);
      fireConfetti(window.innerWidth / 2, window.innerHeight / 2);
    }
  };

  if (done) {
    return (
      <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}
        className="text-center py-12">
        <div className="text-4xl mb-4">⚛️</div>
        <p className="text-xl font-bold text-emerald-400 mb-2">Liên kết tạo thành!</p>
        <p className="text-sm text-gray-400">Bạn đã tạo thành công NaCl sau {steps} bước</p>
      </motion.div>
    );
  }

  return (
    <div>
      <p className="text-sm text-gray-400 mb-4 text-center">Kéo Na+ lại gần Cl- để tạo liên kết ion</p>
      <div ref={containerRef} className="relative h-64 bg-gradient-to-br from-white/5 to-white/10 rounded-xl overflow-hidden border border-white/10">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-6xl opacity-20">🧂</div>
        </div>

        <motion.div
          ref={naRef}
          drag
          dragConstraints={containerRef}
          onDragEnd={(_, info) => handleDragEnd("na", info)}
          className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing font-bold text-lg shadow-lg hover:shadow-indigo-500/50"
        >
          Na<sup>+</sup>
        </motion.div>

        <motion.div
          ref={clRef}
          drag
          dragConstraints={containerRef}
          onDragEnd={(_, info) => handleDragEnd("cl", info)}
          className="absolute top-20 right-10 w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing font-bold text-lg shadow-lg hover:shadow-green-500/50"
        >
          Cl<sup>-</sup>
        </motion.div>
      </div>
      <p className="text-xs text-gray-500 mt-3 text-center">Bước: {steps}</p>
    </div>
  );
}

// 3. Sorting Game - IMPROVED
function SortGame() {
  const [curr, setCurr] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [answered, setAnswered] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handle = (cat: string, e: any) => {
    if (answered) return;
    setAnswered(true);

    if (cat === sortItems[curr].category) {
      setFeedback("correct");
      setScore(s => s + 1);
      fireConfetti(e.clientX, e.clientY);
      setShowExplanation(false);
      setTimeout(() => {
        if (curr < sortItems.length - 1) {
          setCurr(c => c + 1);
          setAnswered(false);
          setFeedback(null);
        }
      }, 800);
    } else {
      setFeedback("wrong");
      setShowExplanation(true);
    }
  };

  if (curr >= sortItems.length) {
    return (
      <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}
        className="text-center py-12">
        <div className="text-5xl mb-4">✨</div>
        <p className="text-2xl font-bold text-white mb-2">Hoàn thành!</p>
        <p className="text-emerald-400 font-bold">{score}/{sortItems.length} phân loại đúng</p>
      </motion.div>
    );
  }

  return (
    <div className="text-center">
      <p className="text-sm text-gray-400 mb-6">Phân loại hóa chất</p>
      <div className="text-4xl font-bold text-white mb-8 bg-white/10 p-6 rounded-xl border border-white/20">
        {sortItems[curr].name}
      </div>
      <p className="text-xs text-gray-500 mb-6 italic">{sortItems[curr].hint}</p>
      <div className="grid grid-cols-3 gap-3 mb-6">
        {["acid", "base", "salt"].map(c => (
          <motion.button
            key={c}
            whileHover={{ scale: answered ? 1 : 1.05 }}
            onClick={(e) => handle(c, e)}
            disabled={answered}
            className={`py-3 px-4 rounded-lg font-bold uppercase text-sm transition-all ${
              answered && c === sortItems[curr].category ? "bg-emerald-500 border-emerald-500" :
              answered && c !== sortItems[curr].category && feedback === "wrong" ? "bg-red-500 border-red-500" :
              "bg-white/10 border border-white/20 hover:bg-white/20"
            }`}>
            {c === "acid" ? "🔴 Axit" : c === "base" ? "🔵 Kiềm" : "⚪ Muối"}
          </motion.button>
        ))}
      </div>
      {answered && (
        <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="space-y-4">
          <p className={`font-bold ${feedback === "correct" ? "text-emerald-400" : "text-red-400"}`}>
            {feedback === "correct" ? "✓ Chính xác!" : "✗ Sai rồi!"}
          </p>
          {showExplanation && (
            <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              className="p-4 bg-blue-500/20 border border-blue-500/50 rounded-lg text-sm text-gray-200">
              <p className="font-bold text-blue-300 mb-2">💡 Giải thích:</p>
              <p>{sortItems[curr].exp}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setAnswered(false);
                  setFeedback(null);
                  setShowExplanation(false);
                  if (curr < sortItems.length - 1) setCurr(c => c + 1);
                }}
                className="mt-3 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold text-sm">
                Tiếp tục
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      )}
      <div className="mt-6 text-sm">
        <span className="text-gray-400">Câu {curr + 1}/{sortItems.length}</span>
        <div className="w-full bg-white/10 rounded-full h-1.5 mt-2">
          <div className="bg-indigo-500 h-1.5 rounded-full transition-all" style={{ width: `${((curr + 1) / sortItems.length) * 100}%` }} />
        </div>
      </div>
    </div>
  );
}

// 4. Equation Balancing - IMPROVED
function EqnGame() {
  const [curr, setCurr] = useState(0);
  const [ans, setAns] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const checkAnswer = () => {
    if (!ans.trim()) return;
    setAnswered(true);
    
    if (ans === equations[curr].ans) {
      setFeedback("correct");
      setScore(s => s + 1);
      fireConfetti(window.innerWidth / 2, window.innerHeight / 2);
      setShowExplanation(false);
      setTimeout(() => {
        if (curr < equations.length - 1) {
          setCurr(c => c + 1);
          setAns("");
          setFeedback(null);
          setAnswered(false);
        }
      }, 800);
    } else {
      setFeedback("wrong");
      setShowExplanation(true);
    }
  };

  if (curr >= equations.length) {
    return (
      <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-12">
        <div className="text-5xl mb-4">⚖️</div>
        <p className="text-2xl font-bold text-white mb-2">Hoàn thành!</p>
        <p className="text-emerald-400 font-bold">{score}/{equations.length} phương trình đúng</p>
      </motion.div>
    );
  }

  return (
    <div className="text-center">
      <p className="text-sm text-gray-400 mb-6">Điền hệ số để cân bằng phương trình</p>
      <div className="text-2xl font-mono font-bold text-white mb-6 bg-white/10 p-6 rounded-xl border border-white/20">
        {equations[curr].eq}
      </div>
      <p className="text-xs text-gray-500 mb-4 italic">{equations[curr].hint}</p>
      <div className="flex gap-3 justify-center mb-6">
        <input
          type="number"
          value={ans}
          onChange={e => setAns(e.target.value)}
          disabled={answered}
          placeholder="Nhập hệ số"
          className="w-24 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-center font-bold text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 disabled:opacity-50"
        />
        <motion.button
          whileHover={{ scale: answered ? 1 : 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={checkAnswer}
          disabled={answered}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-bold transition-colors disabled:opacity-50"
        >
          Kiểm tra
        </motion.button>
      </div>
      {answered && (
        <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="space-y-4">
          <p className={`font-bold ${feedback === "correct" ? "text-emerald-400" : "text-red-400"}`}>
            {feedback === "correct" ? "✓ Chính xác!" : `✗ Sai! Đáp án là ${equations[curr].ans}`}
          </p>
          {showExplanation && (
            <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              className="p-4 bg-blue-500/20 border border-blue-500/50 rounded-lg text-sm text-gray-200">
              <p className="font-bold text-blue-300 mb-2">💡 Giải thích:</p>
              <p>{equations[curr].exp}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setAnswered(false);
                  setFeedback(null);
                  setShowExplanation(false);
                  setAns("");
                  if (curr < equations.length - 1) setCurr(c => c + 1);
                }}
                className="mt-3 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold text-sm">
                Tiếp tục
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}

// 5. Ion Catcher - IMPROVED
function CatcherGame() {
  const [pos, setPos] = useState(50);
  const [score, setScore] = useState(0);
  const [ions, setIons] = useState<Array<{ id: number; top: number; active: boolean }>>([]);
  const [gameActive, setGameActive] = useState(true);
  const ionCountRef = useRef(0);

  useEffect(() => {
    const h = (e: any) => setPos(Math.max(0, Math.min(90, (e.clientX / window.innerWidth) * 100)));
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  useEffect(() => {
    if (!gameActive) return;
    const spawner = setInterval(() => {
      const newIon = { id: ionCountRef.current++, top: -30, active: true };
      setIons(prev => [...prev, newIon]);
    }, 600);
    return () => clearInterval(spawner);
  }, [gameActive]);

  useEffect(() => {
    const checkCollisions = setInterval(() => {
      setIons(prev => {
        const updated = prev.map(ion => {
          if (!ion.active) return ion;
          if (ion.top > 90) return { ...ion, active: false };
          const caught = Math.abs(pos - (ion.top + 5)) < 15 && ion.top > 80 && ion.top < 95;
          if (caught) {
            setScore(s => s + 1);
            fireConfetti(window.innerWidth * (pos / 100), 600);
          }
          return { ...ion, top: ion.top + 2, active: !caught };
        });
        return updated.filter(i => i.active);
      });
    }, 50);
    return () => clearInterval(checkCollisions);
  }, [pos]);

  useEffect(() => {
    const timer = setTimeout(() => setGameActive(false), 30000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-400">Điểm: <span className="text-emerald-400 font-bold">{score}</span></span>
        <span className="text-sm text-gray-400">Thời gian: {gameActive ? "Đang chơi" : "Kết thúc"}</span>
      </div>
      <div className="relative h-64 bg-gradient-to-b from-white/5 to-white/10 rounded-xl overflow-hidden border border-white/20">
        {/* Ions falling */}
        {ions.map(ion => (
          <motion.div key={ion.id} className="absolute left-1/2 -translate-x-1/2 text-3xl"
            style={{ top: `${ion.top}%` }}>🧂</motion.div>
        ))}
        {/* Catcher */}
        <div className="absolute bottom-2 h-5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full transition-all shadow-lg"
          style={{ left: `${pos}%`, width: '12%', boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)" }} />
      </div>
      <p className="text-xs text-gray-500 mt-3 text-center">Dùng chuột để bắt muối</p>
    </div>
  );
}

// 6. Crystal Builder - IMPROVED
function CrystalGame() {
  const [grid, setGrid] = useState(Array(9).fill(false));
  const [isValid, setIsValid] = useState(false);

  const toggle = (i: number) => {
    const n = [...grid];
    n[i] = !n[i];
    setGrid(n);
    validatePattern(n);
  };

  const validatePattern = (newGrid: boolean[]) => {
    // Valid crystal pattern (simulated - checking for symmetric/connected pattern)
    const count = newGrid.filter(v => v).length;
    const hasSymmetry = (newGrid[0] === newGrid[2] && newGrid[3] === newGrid[5] && newGrid[6] === newGrid[8]);
    setIsValid(count >= 4 && hasSymmetry);
  };

  return (
    <div className="text-center">
      <p className="text-sm text-gray-400 mb-6">Xây dựng cấu trúc tinh thể đối xứng</p>
      <div className="grid grid-cols-3 gap-2 w-40 mx-auto mb-6">
        {grid.map((v, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggle(i)}
            className={`w-12 h-12 rounded-lg border-2 transition-all font-bold text-lg ${
              v ? "bg-cyan-500 border-cyan-400 shadow-lg shadow-cyan-500/50" : "bg-white/5 border-white/20 hover:border-white/40"
            }`}>
            {v ? "✓" : ""}
          </motion.button>
        ))}
      </div>
      {isValid && (
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="text-center">
          <div className="text-4xl mb-2">💎</div>
          <p className="text-emerald-400 font-bold">Tinh thể hoàn hảo!</p>
        </motion.div>
      )}
    </div>
  );
}

// 7. pH Scale Game - IMPROVED
function PHGame() {
  const [curr, setCurr] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [answered, setAnswered] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handle = (v: number) => {
    if (answered) return;
    setAnswered(true);

    if (v === phItems[curr].val) {
      setFeedback("correct");
      setScore(s => s + 1);
      fireConfetti(window.innerWidth / 2, 400);
      setShowExplanation(false);
      setTimeout(() => {
        if (curr < phItems.length - 1) {
          setCurr(c => c + 1);
          setAnswered(false);
          setFeedback(null);
        }
      }, 800);
    } else {
      setFeedback("wrong");
      setShowExplanation(true);
    }
  };

  if (curr >= phItems.length) {
    return (
      <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-12">
        <div className="text-5xl mb-4">🌈</div>
        <p className="text-2xl font-bold text-white mb-2">Hoàn thành!</p>
        <p className="text-emerald-400 font-bold">{score}/{phItems.length} câu đúng</p>
      </motion.div>
    );
  }

  return (
    <div className="text-center">
      <p className="text-sm text-gray-400 mb-6">Chọn độ pH cho: <span className="font-bold text-white">{phItems[curr].name}</span></p>
      <div className="mb-8 px-8">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Axit (0)</span>
          <span>Trung tính (7)</span>
          <span>Kiềm (14)</span>
        </div>
        <div className="h-6 rounded-full bg-gradient-to-r from-red-600 via-green-600 to-blue-600 flex items-center justify-center">
          <div className="text-2xl">💧</div>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 mx-auto w-fit mb-6">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: answered ? 1 : 1.1 }}
            onClick={() => handle(i)}
            disabled={answered}
            className={`w-10 h-10 rounded-full font-bold text-xs transition-all ${
              answered && i === phItems[curr].val ? "bg-emerald-500 shadow-lg shadow-emerald-500/50" :
              answered && i !== phItems[curr].val ? "bg-white/10" :
              "bg-white/10 hover:bg-white/20"
            }`}>
            {i}
          </motion.button>
        ))}
      </div>
      {answered && (
        <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="space-y-4">
          <p className={`font-bold ${feedback === "correct" ? "text-emerald-400" : "text-red-400"}`}>
            {feedback === "correct" ? "✓ Chính xác!" : `✗ Sai! Đáp án là pH ${phItems[curr].val}`}
          </p>
          {showExplanation && (
            <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              className="p-4 bg-blue-500/20 border border-blue-500/50 rounded-lg text-sm text-gray-200">
              <p className="font-bold text-blue-300 mb-2">💡 Giải thích:</p>
              <p>{phItems[curr].exp}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setAnswered(false);
                  setFeedback(null);
                  setShowExplanation(false);
                  if (curr < phItems.length - 1) setCurr(c => c + 1);
                }}
                className="mt-3 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold text-sm">
                Tiếp tục
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}

// 8. True/False - IMPROVED
function TFGame() {
  const [curr, setCurr] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [answered, setAnswered] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handle = (v: boolean) => {
    if (answered) return;
    setAnswered(true);

    if (v === trueFalse[curr].a) {
      setFeedback("correct");
      setScore(s => s + 1);
      fireConfetti(window.innerWidth / 2, 300);
      setShowExplanation(false);
      setTimeout(() => {
        if (curr < trueFalse.length - 1) {
          setCurr(c => c + 1);
          setAnswered(false);
          setFeedback(null);
        }
      }, 800);
    } else {
      setFeedback("wrong");
      setShowExplanation(true);
    }
  };

  if (curr >= trueFalse.length) {
    return (
      <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-12">
        <div className="text-5xl mb-4">❓</div>
        <p className="text-2xl font-bold text-white mb-2">Hoàn thành!</p>
        <p className="text-emerald-400 font-bold">{score}/{trueFalse.length} câu đúng</p>
      </motion.div>
    );
  }

  return (
    <div className="text-center">
      <p className="text-sm text-gray-400 mb-6">Câu {curr + 1}/{trueFalse.length}</p>
      <p className="text-lg font-semibold text-white mb-8 leading-relaxed">{trueFalse[curr].q}</p>
      <div className="flex gap-4 justify-center mb-6">
        <motion.button
          whileHover={{ scale: answered ? 1 : 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handle(true)}
          disabled={answered}
          className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
            answered && trueFalse[curr].a === true ? "bg-emerald-600 shadow-lg shadow-emerald-600/50" :
            answered && trueFalse[curr].a !== true && feedback === "wrong" ? "bg-red-600" :
            "bg-emerald-600 hover:bg-emerald-700"
          }`}>
          ✓ Đúng
        </motion.button>
        <motion.button
          whileHover={{ scale: answered ? 1 : 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handle(false)}
          disabled={answered}
          className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
            answered && trueFalse[curr].a === false ? "bg-red-600 shadow-lg shadow-red-600/50" :
            answered && trueFalse[curr].a !== false && feedback === "wrong" ? "bg-emerald-600" :
            "bg-red-600 hover:bg-red-700"
          }`}>
          ✗ Sai
        </motion.button>
      </div>
      {answered && (
        <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="space-y-4">
          <p className={`font-bold ${feedback === "correct" ? "text-emerald-400" : "text-red-400"}`}>
            {feedback === "correct" ? "✓ Chính xác!" : "✗ Sai rồi!"}
          </p>
          {showExplanation && (
            <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              className="p-4 bg-blue-500/20 border border-blue-500/50 rounded-lg text-sm text-gray-200">
              <p className="font-bold text-blue-300 mb-2">💡 Giải thích:</p>
              <p>{trueFalse[curr].exp}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setAnswered(false);
                  setFeedback(null);
                  setShowExplanation(false);
                  if (curr < trueFalse.length - 1) setCurr(c => c + 1);
                  else setCurr(-1);
                }}
                className="mt-3 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold text-sm">
                Tiếp tục
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}

// 9. Lab Dissolution - IMPROVED
function LabGame() {
  const [crystals, setCrystals] = useState(Array(12).fill({ dissolved: false }));
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const dissolve = (i: number, e: any) => {
    const n = [...crystals];
    if (!n[i].dissolved) {
      n[i] = { dissolved: true };
      setCrystals(n);
      setScore(s => s + 1);
      fireConfetti(e.clientX, e.clientY);
      if (score === 11) setDone(true);
    }
  };

  if (done) {
    return (
      <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-12">
        <div className="text-5xl mb-4">⚗️</div>
        <p className="text-2xl font-bold text-white mb-2">Hoàn thành!</p>
        <p className="text-emerald-400 font-bold">Tất cả tinh thể đã hòa tan!</p>
      </motion.div>
    );
  }

  return (
    <div className="text-center">
      <p className="text-sm text-gray-400 mb-6">Click để hòa tan tinh thể NaCl</p>
      <div className="grid grid-cols-4 gap-3 mb-6">
        {crystals.map((c, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: c.dissolved ? 1 : 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => dissolve(i, e)}
            disabled={c.dissolved}
            className={`w-14 h-14 rounded-lg font-bold text-2xl transition-all ${
              c.dissolved ? "bg-cyan-500/30 text-cyan-400 border border-cyan-500" : "bg-white/10 border border-white/20 hover:bg-white/20"
            }`}>
            {c.dissolved ? "💧" : "💎"}
          </motion.button>
        ))}
      </div>
      <div className="text-sm">
        <span className="text-gray-400">Tiến độ: </span>
        <span className="text-emerald-400 font-bold">{score}/12</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2 mt-3">
        <div className="bg-cyan-500 h-2 rounded-full transition-all" style={{ width: `${(score / 12) * 100}%` }} />
      </div>
    </div>
  );
}

// 10. Matching Game
function MatchingGame() {
  const [pairs, setPairs] = useState<number[]>(Array(6).fill(-1));
  const [selected, setSelected] = useState<number | null>(null);
  const [matched, setMatched] = useState<number[]>([]);

  const definitions = [
    { term: "Ion", def: "Nguyên tử mất/nhận e" },
    { term: "Muối", def: "Hợp chất từ acid + base" },
    { term: "pH", def: "Độ axit/kiềm" },
  ];

  return (
    <div className="text-center">
      <p className="text-sm text-gray-400 mb-6">Nối các khái niệm với định nghĩa</p>
      <div className="space-y-2">
        {definitions.map((d, i) => (
          <div key={i} className="flex gap-4 justify-center items-center">
            <div className="px-4 py-3 bg-indigo-500/20 border border-indigo-500 rounded-lg flex-1 max-w-xs font-semibold">
              {d.term}
            </div>
            <div className="text-gray-400">→</div>
            <div className="px-4 py-3 bg-emerald-500/20 border border-emerald-500 rounded-lg flex-1 max-w-xs text-sm">
              {d.def}
            </div>
          </div>
        ))}
      </div>
      <motion.p initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className="text-emerald-400 font-bold mt-8">
        ✓ Đã nối xong!
      </motion.p>
    </div>
  );
}

// ========== MAIN COMPONENT ==========
const games = [
  { id: "quiz", title: "Trắc Nghiệm", emoji: "🧠", desc: "Kiểm tra kiến thức" },
  { id: "drag", title: "Liên Kết Ion", emoji: "⚛️", desc: "Tạo liên kết NaCl" },
  { id: "sort", title: "Phân Loại", emoji: "🧪", desc: "Phân loại hóa chất" },
  { id: "eqn", title: "Cân Bằng PT", emoji: "⚖️", desc: "Cân bằng phương trình" },
  { id: "catch", title: "Hứng Muối", emoji: "🧺", desc: "Trò chơi phản ứng nhanh" },
  { id: "build", title: "Xây Tinh Thể", emoji: "💎", desc: "Xây dựng cấu trúc" },
  { id: "ph", title: "Thang pH", emoji: "🌈", desc: "Hiểu về độ axit/kiềm" },
  { id: "tf", title: "Đúng/Sai", emoji: "❓", desc: "Kiểm tra sự thật" },
  { id: "lab", title: "Hòa Tan", emoji: "⚗️", desc: "Thí nghiệm hòa tan" },
  { id: "match", title: "Nối Khái Niệm", emoji: "🔗", desc: "Ghép định nghĩa" },
];

export default function GameCenter() {
  const [active, setActive] = useState<string | null>(null);
  const [globalScore, setGlobalScore] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState<string[]>([]);

  const handleGameComplete = () => {
    if (active && !gamesPlayed.includes(active)) {
      setGamesPlayed([...gamesPlayed, active]);
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-6 pb-20">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-block mb-4 px-4 py-2 bg-indigo-500/20 border border-indigo-500 rounded-full text-xs font-bold text-indigo-300">
          🎮 GAME CENTER
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
          10 Trò Chơi Hóa Học Thú Vị
        </h2>
        <p className="text-gray-400 text-base max-w-2xl mx-auto">
          Khám phá thế giới NaCl qua các trò chơi tương tác, vừa học vừa chơi!
        </p>
        <div className="mt-6 flex justify-center gap-6 text-sm">
          <div className="px-4 py-2 bg-white/5 rounded-lg">
            <span className="text-gray-400">Đã chơi: </span>
            <span className="font-bold text-emerald-400">{gamesPlayed.length}/{games.length}</span>
          </div>
          <div className="px-4 py-2 bg-white/5 rounded-lg">
            <span className="text-gray-400">Tổng điểm: </span>
            <span className="font-bold text-blue-400">{globalScore}</span>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!active ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
            {/* Games Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {games.map(g => (
                <motion.button
                  key={g.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActive(g.id)}
                  className={`group relative p-4 rounded-2xl border transition-all ${
                    gamesPlayed.includes(g.id)
                      ? "bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 border-emerald-500/50"
                      : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                  }`}>
                  <div className="relative z-10">
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{g.emoji}</div>
                    <div className="text-[10px] font-bold text-white uppercase tracking-tight leading-tight">{g.title}</div>
                    <div className="text-[8px] text-gray-500 mt-1">{g.desc}</div>
                  </div>
                  {gamesPlayed.includes(g.id) && (
                    <div className="absolute top-2 right-2 text-xs">✓</div>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-3 gap-4 mt-12">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="p-6 bg-gradient-to-br from-indigo-500/10 to-indigo-500/5 border border-indigo-500/20 rounded-2xl">
                <div className="text-3xl mb-3">🧠</div>
                <h3 className="font-bold text-white mb-2">Học Toàn Diện</h3>
                <p className="text-sm text-gray-400">Từ lý thuyết đến thực hành qua 10 trò chơi đa dạng</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded-2xl">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="font-bold text-white mb-2">Thử Thách Bản Thân</h3>
                <p className="text-sm text-gray-400">Các cấp độ khó khác nhau để kiểm tra kiến thức</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-2xl">
                <div className="text-3xl mb-3">🏆</div>
                <h3 className="font-bold text-white mb-2">Nhận Phần Thưởng</h3>
                <p className="text-sm text-gray-400">Tích lũy điểm và hoàn thành các trò chơi</p>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gradient-to-br from-white/5 to-white/10 border border-white/20 p-8 md:p-12 rounded-3xl relative">
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActive(null)}
              className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-gray-400 hover:text-white text-lg">
              ✕
            </motion.button>

            {/* Game Content */}
            <div className="mt-4">
              {active === "quiz" && <QuizGame />}
              {active === "drag" && <DragGame />}
              {active === "sort" && <SortGame />}
              {active === "eqn" && <EqnGame />}
              {active === "catch" && <CatcherGame />}
              {active === "build" && <CrystalGame />}
              {active === "ph" && <PHGame />}
              {active === "tf" && <TFGame />}
              {active === "lab" && <LabGame />}
              {active === "match" && <MatchingGame />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
