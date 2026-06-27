"use client";

import { motion } from "framer-motion";
import { User, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function PopoutPortrait() {
  return (
    <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center animate-float">
      {/* Background Ambient Glow Behind Portal */}
      <div className="absolute w-[85%] h-[85%] bg-gradient-to-tr from-[#3FB9FF]/15 to-[#7B61FF]/15 rounded-full blur-[60px] pointer-events-none" />

      {/* Outer Neon Accent Ring (Purple) */}
      <div className="absolute inset-[4px] rounded-full border border-[#7B61FF]/20 blur-[2px] pointer-events-none" />
      <div className="absolute inset-[-6px] rounded-full border border-[#3FB9FF]/10 blur-[6px] pointer-events-none" />

      {/* Double Neon Ring Portal (Cyan-Blue) */}
      <div className="relative w-[90%] h-[90%] rounded-full p-1.5 bg-[#050816] shadow-glow-neon">
        <div className="w-full h-full rounded-full border-[5px] border-[#3FB9FF] overflow-hidden relative bg-[#050816] flex items-center justify-center">
          
          {/* Glow layers behind the subject */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(47,128,255,0.45)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-[#3FB9FF]/20 to-transparent pointer-events-none" />
          
          {/* Portrait Image (Transparent PNG) */}
          <div className="w-[105%] h-[105%] relative mt-2">
            <Image
              src="/thilagan_portrait.png"
              alt="Thilagan M.S."
              fill
              priority
              sizes="(max-width: 768px) 300px, 400px"
              className="object-cover object-top select-none pointer-events-none"
            />
          </div>

          {/* Dark gradient overlay on top of the image to blend seamlessly into the website background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050816] pointer-events-none" />
        </div>
      </div>

      {/* Floating Status Card (Bottom-Left Overlap) */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="absolute bottom-4 left-[-10px] md:left-[-30px] z-10 w-[190px] md:w-[210px] p-4 glass-panel rounded-2xl border-white/[0.04] shadow-2xl flex flex-col gap-2"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#2D8CFF]/15 border border-[#2D8CFF]/30 flex items-center justify-center text-[#3FB9FF]">
            <User size={16} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-white tracking-wide leading-none mb-1">
              Thilagan M.S.
            </span>
            <span className="text-[9px] text-[#3FB9FF] font-medium tracking-wide leading-none">
              Full Stack Developer
            </span>
          </div>
        </div>

        {/* Green availability indicator */}
        <div className="flex items-center gap-2 py-1">
          <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
          <span className="text-[9px] font-semibold text-[#C7D2E3] tracking-wide">
            Available for Freelance
          </span>
        </div>

        {/* Hire Me CTA button */}
        <a
          href="#contact"
          className="w-full mt-1 py-2 bg-gradient-to-r from-[#2D8CFF] to-[#7C4DFF] text-black font-black text-[9px] tracking-widest rounded-xl hover:opacity-95 transition-all flex items-center justify-center gap-1"
        >
          <span>HIRE ME</span>
          <ArrowRight size={10} />
        </a>
      </motion.div>
    </div>
  );
}
