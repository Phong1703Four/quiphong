"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import ParticleCanvas from "@/components/ParticleCanvas";
import Chatbot from "@/components/Chatbot";
import AudioManager from "@/components/AudioManager";
import StorySection from "@/components/StorySection";
import KnowledgeSection from "@/components/KnowledgeSection";
import VideoSection from "@/components/VideoSection";
import GameCenter from "@/components/GameCenter";

// Transition styles cho các sections
const sectionVariants = {
  hidden: { 
    opacity: 0, 
    y: 20, 
    filter: "blur(8px)" 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    filter: "blur(8px)",
    transition: {
      duration: 0.5
    }
  }
};

// Transition styles cho page transitions
const pageVariants = {
  hidden: { 
    opacity: 0, 
    y: 10, 
    filter: "blur(4px)" 
  },
  animate: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.43, 0.13, 0.23, 0.96],
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: { 
    opacity: 0, 
    y: -10, 
    filter: "blur(4px)",
    transition: {
      duration: 0.4
    }
  }
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("story");
  const [soundOn, setSoundOn] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#02020a]">
      <ParticleCanvas />
      <AudioManager isVideoActive={activeTab === "video"} soundOn={soundOn} />
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        soundOn={soundOn} 
        setSoundOn={() => setSoundOn(!soundOn)} 
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={pageVariants}
          initial="hidden"
          animate="animate"
          exit="exit"
        >
          {activeTab === "story" && (
            <motion.div initial="hidden" animate="visible" variants={sectionVariants}>
              <HeroSection />
              <StorySection soundOn={soundOn} />
            </motion.div>
          )}
          {activeTab === "knowledge" && (
            <motion.div initial="hidden" animate="visible" variants={sectionVariants}>
              <KnowledgeSection />
            </motion.div>
          )}
          {activeTab === "video" && (
            <motion.div initial="hidden" animate="visible" variants={sectionVariants}>
              <VideoSection />
            </motion.div>
          )}
          {activeTab === "games" && (
            <motion.div initial="hidden" animate="visible" variants={sectionVariants}>
              <GameCenter />
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <Chatbot />
    </main>
  );
}
