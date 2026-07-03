"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function PopoutPortrait() {
  return (
    <div className="relative w-full max-w-[1000px] h-[420px] sm:h-[480px] md:h-[550px] flex items-center justify-center overflow-visible select-none">
      
      {/* 1. Background Giant Text: THILAGAN */}
      <h1 className="font-display text-[14vw] sm:text-[15vw] md:text-[14vw] font-black tracking-tighter leading-none text-white/[0.04] absolute z-0 text-center w-full select-none scale-y-[1.18] translate-y-[-20px] pointer-events-none">
        THILAGAN
      </h1>

      {/* 2. Background glowing circle behind portrait */}
      <div className="absolute w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] bg-gradient-to-tr from-[#00FF95]/5 to-[#00E5FF]/5 rounded-full blur-[80px] z-0 pointer-events-none" />

      {/* 3. Portrait image in the foreground */}
      <div className="relative w-[280px] h-[360px] sm:w-[300px] sm:h-[400px] md:w-[340px] md:h-[450px] z-10 select-none pointer-events-none flex items-end justify-center">
        <div className="w-full h-full relative">
          <Image
            src="/thilagan_portrait.png"
            alt="Thilagan M.S."
            fill
            priority
            sizes="(max-width: 768px) 300px, 400px"
            className="object-cover object-top select-none pointer-events-none"
          />
        </div>
        
        {/* Soft bottom gradient overlay to blend portrait into solid black background */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent pointer-events-none" />
      </div>

      {/* 4. Brushed Steel Expertise Badge (overlapping bottom right of portrait) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="brushed-metal absolute z-20 bottom-[10%] right-[2%] sm:right-[12%] md:right-[20%] px-5 py-2.5 rounded-2xl flex flex-col items-start gap-0.5 border border-white/40 shadow-2xl"
      >
        <span className="text-[8px] uppercase tracking-[0.25em] text-[#0f172a]/80 font-extrabold font-sans leading-none">
          EXPERTISE
        </span>
        <span className="text-[10px] md:text-xs font-black text-[#0f172a] font-sans leading-none">
          React, Node, PCB, Embedded
        </span>
      </motion.div>
      
    </div>
  );
}
