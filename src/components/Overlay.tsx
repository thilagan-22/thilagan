"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  // Section 1: Intro (0% to ~20%)
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.22], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.22], [0, -60]);

  // Section 2: Tech/Experience (28% to ~45%)
  const opacity2 = useTransform(scrollYProgress, [0.22, 0.3, 0.42, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.22, 0.3, 0.42, 0.5], [60, 0, 0, -60]);

  // Section 3: Value/Vision (53% to ~70%)
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.58, 0.72, 0.8], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.58, 0.72, 0.8], [60, 0, 0, -60]);

  // Scroll Down Indicator (fades out early)
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <div className="absolute inset-0 z-10 w-full h-full pointer-events-none overflow-hidden">
      {/* Section 1: Centered Introduction */}
      <motion.div
        style={{ opacity: opacity1, y: y1 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
      >
        <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-purple-400 font-medium mb-3 font-sans">
          Senior Creative Developer
        </span>
        <h1 className="font-display text-5xl md:text-8xl font-black tracking-tight text-white mb-4 text-glow leading-none">
          M.S. THILAGAN
        </h1>
        <p className="text-sm md:text-lg text-neutral-400 max-w-md font-sans tracking-wide">
          Crafting premium digital interfaces and immersive web experiences.
        </p>
      </motion.div>

      {/* Section 2: Left Aligned Experiences */}
      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="absolute inset-0 flex items-center justify-start max-w-7xl mx-auto px-6 md:px-16 lg:px-24"
      >
        <div className="max-w-2xl text-left">
          <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-purple-400 font-medium mb-3 block">
            Digital Craftsmanship
          </span>
          <h2 className="font-display text-4xl md:text-7xl font-black tracking-tight text-white mb-6 leading-tight">
            I build digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">
              experiences.
            </span>
          </h2>
          <p className="text-sm md:text-lg text-neutral-300 tracking-wide leading-relaxed font-sans">
            Specializing in high-performance WebGL, Interactive Canvas, and advanced layouts. 
            Blending motion aesthetics with structural speed to create unforgettable interactive products.
          </p>
        </div>
      </motion.div>

      {/* Section 3: Right Aligned Vision */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="absolute inset-0 flex items-center justify-end max-w-7xl mx-auto px-6 md:px-16 lg:px-24"
      >
        <div className="max-w-2xl text-right">
          <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-purple-400 font-medium mb-3 block">
            The Philosophy
          </span>
          <h2 className="font-display text-4xl md:text-7xl font-black tracking-tight text-white mb-6 leading-tight">
            Bridging design <br />& engineering.
          </h2>
          <p className="text-sm md:text-lg text-neutral-300 tracking-wide leading-relaxed font-sans ml-auto">
            Design without performance is static. Code without design is mechanical. 
            I synthesize both worlds into responsive, fluid creations that feel alive to touch and interact with.
          </p>
        </div>
      </motion.div>

      {/* Elegant Scroll Indicator */}
      <motion.div
        style={{ opacity: scrollIndicatorOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-medium">
          Scroll to explore
        </span>
        <div className="w-[18px] h-[30px] border-2 border-neutral-700 rounded-full flex justify-center p-1">
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1 h-2 bg-purple-500 rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
}
