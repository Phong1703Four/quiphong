"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Sparkles, BrainCircuit } from "lucide-react";

const INITIAL_MESSAGE = {
  id: 1,
  text: "Chào bạn! Tôi là Siêu Trí Tuệ Hóa Học. Tôi có thể giải đáp mọi thắc mắc của bạn về thế giới hóa học và muối ăn. Bạn muốn biết điều gì?",
  isBot: true,
};

const KNOWLEDGE_BASE: { [key: string]: string } = {
  "muối ăn là gì": "Muối ăn (NaCl) là một hợp chất ion, tinh thể màu trắng, vị mặn, tan tốt trong nước. Nó là thành phần chính của muối dùng trong thực phẩm.",
  "công thức": "Công thức hóa học là NaCl. Khối lượng mol là 58.44 g/mol.",
  "liên kết": "NaCl được tạo thành bởi liên kết ion giữa cation Na+ và anion Cl-. Na nhường 1e cho Cl để cả hai đạt cấu hình electron bền vững của khí hiếm.",
  "ứng dụng": "Có 4 nhóm ứng dụng chính: Gia vị thực phẩm, Bảo quản thực phẩm, Y tế (nước muối sinh lý), và Công nghiệp hóa chất (sản xuất NaOH, Cl2, Na).",
  "huyết áp": "Ăn thừa muối (quá 5g/ngày) gây giữ nước, tăng áp lực lên mạch máu dẫn đến tăng huyết áp, suy thận và đột quỵ.",
  "axit": "Axit là những hợp chất có khả năng cho proton (H+). Ví dụ: HCl (Axit clohydric), H2SO4 (Axit sunfuric).",
  "bazơ": "Bazơ là những hợp chất có khả năng nhận proton hoặc giải phóng OH-. Ví dụ: NaOH (Natri hydroxit), KOH.",
  "phản ứng": "Phản ứng giữa axit và bazơ tạo thành muối và nước được gọi là phản ứng trung hòa. Ví dụ: HCl + NaOH -> NaCl + H2O.",
  "bảng tuần hoàn": "Bảng tuần hoàn hiện có 118 nguyên tố, được sắp xếp theo số hiệu nguyên tử tăng dần. Natri nằm ở nhóm IA, Clo nằm ở nhóm VIIA.",
  "nước biển": "Nước biển có độ mặn trung bình khoảng 3.5%, trong đó NaCl chiếm khoảng 85% tổng lượng muối hòa tan.",
  "tinh thể": "Tinh thể NaCl có cấu trúc lập phương tâm diện, nơi mỗi ion Na+ được bao quanh bởi 6 ion Cl- và ngược lại.",
  "điện phân": "Điện phân dung dịch NaCl có màng ngăn là phương pháp quan trọng để sản xuất xút (NaOH) và khí Clo trong công nghiệp.",
  "mascot": "Mascot của chúng tôi là Bé Muối hình lập phương trắng muốt, cực kỳ thân thiện và thông thái!",
  "chào": "Xin chào! Tôi là AI chuyên gia hóa học của bạn. Rất vui được hỗ trợ!",
  "thời gian": "Thời gian là tương đối, nhưng sự chính xác trong hóa học là tuyệt đối! Bạn cần tôi giúp gì về hóa học không?",
  "nguyên tử": "Nguyên tử gồm hạt nhân (protron và neutron) và lớp vỏ electron. Natri có 11 electron, Clo có 17 electron.",
  "mol": "1 mol chứa khoảng 6.022 x 10^23 hạt (số Avogadro).",
  "ph": "pH là thang đo độ axit hoặc bazơ. pH < 7 là axit, pH > 7 là bazơ, pH = 7 là trung tính.",
  "ai": "Tôi là một trí tuệ nhân tạo được huấn luyện để hiểu sâu về hóa học, đặc biệt là NaCl Chronicles!",
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input, isBot: false };
    setMessages(prev => [...prev, userMsg]);
    const query = input.toLowerCase();
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let response = "Câu hỏi của bạn rất thú vị! Theo dữ liệu của tôi, ";
      let found = false;
      
      for (const key in KNOWLEDGE_BASE) {
        if (query.includes(key)) {
          response += KNOWLEDGE_BASE[key];
          found = true;
          break;
        }
      }

      if (!found) {
        response = "Tôi đang tiếp tục học hỏi thêm về chủ đề này. Hiện tại tôi có thể giải đáp tốt về công thức, liên kết, axit-bazơ, bảng tuần hoàn và các ứng dụng của muối. Bạn hãy thử hỏi cụ thể hơn nhé!";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, text: response, isBot: true }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="mb-4 w-80 md:w-[400px] h-[600px] bg-[#0a0a1f]/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(79,70,229,0.3)] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-[#4F46E5] via-[#8B5CF6] to-[#06B6D4] flex justify-between items-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="relative">
                   <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center animate-pulse">
                    <BrainCircuit size={22} className="text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0a0a1f]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">AI Super Brain</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <p className="text-[10px] text-white/80 font-medium uppercase tracking-widest">Sẵn sàng hỗ trợ</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 flex flex-col gap-5 scrollbar-hide">
              {messages.map(msg => (
                <motion.div 
                  initial={{ opacity: 0, x: msg.isBot ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={msg.id} 
                  className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.isBot 
                      ? "bg-white/5 text-gray-200 border border-white/10 shadow-sm" 
                      : "bg-gradient-to-br from-[#4F46E5] to-[#8B5CF6] text-white shadow-lg shadow-indigo-500/20"
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 px-4 py-3 rounded-2xl flex gap-1.5 items-center">
                    <Sparkles size={12} className="text-indigo-400 animate-spin" />
                    <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest">AI đang suy nghĩ</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-5 border-t border-white/5 bg-white/5">
              <div className="relative group">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSend()}
                  placeholder="Hỏi về Hóa học, NaCl, Axit..."
                  className="w-full bg-[#0a0a1a] border border-white/10 rounded-2xl py-4 px-6 pr-14 text-sm text-white placeholder:text-gray-600 focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/50 outline-none transition-all"
                />
                <button
                  onClick={handleSend}
                  className="absolute right-2 top-2 w-10 h-10 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] flex items-center justify-center text-white hover:shadow-lg hover:shadow-indigo-500/40 transition-all active:scale-95"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4F46E5] via-[#8B5CF6] to-[#06B6D4] flex items-center justify-center text-white shadow-[0_10px_30px_rgba(79,70,229,0.4)]"
      >
        <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
        <MessageSquare size={28} />
        {/* Badge */}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-[#0a0a1a]">
            1
          </div>
        )}
      </motion.button>
    </div>
  );
}
