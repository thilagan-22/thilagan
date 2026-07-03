"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Overlay from "./Overlay";

const totalFrames = 150;
const currentFrame = (index: number) =>
  `/ezgif-split/frame_${index.toString().padStart(3, "0")}_delay-0.067s.png`;

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const activeFrameRef = useRef(0);

  // 1. Preload Images in useEffect
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      
      const handleLoad = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
        if (loadedCount === totalFrames) {
          setImages(loadedImages);
          // Small delay for smooth exit transition
          setTimeout(() => setLoading(false), 600);
        }
      };

      const handleError = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
        if (loadedCount === totalFrames) {
          setImages(loadedImages);
          setTimeout(() => setLoading(false), 600);
        }
      };

      img.onload = handleLoad;
      img.onerror = handleError;
      loadedImages.push(img);
    }
  }, []);

  // 2. High-performance canvas draw routine with cover logic and high-DPI support
  const renderCanvas = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas || !images[index]) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = images[index];
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      // Adjust internal dimensions for high-DPI rendering
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      const canvasWidth = rect.width;
      const canvasHeight = rect.height;

      // Aspect Ratio Cover Calculation
      const canvasRatio = canvasWidth / canvasHeight;
      const imgRatio = img.width / img.height;
      let sx = 0, sy = 0, sWidth = img.width, sHeight = img.height;

      if (canvasRatio > imgRatio) {
        // Crop vertically
        sHeight = img.width / canvasRatio;
        sy = (img.height - sHeight) / 2;
      } else {
        // Crop horizontally
        sWidth = img.height * canvasRatio;
        sx = (img.width - sWidth) / 2;
      }

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, canvasWidth, canvasHeight);
    },
    [images]
  );

  // 3. Scroll linking logic via Framer Motion
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress (0 to 1) to frame index (0 to 149)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    const roundedIndex = Math.round(latest);
    const index = Math.max(0, Math.min(totalFrames - 1, roundedIndex));
    activeFrameRef.current = index;
    if (!loading && images.length > 0) {
      requestAnimationFrame(() => renderCanvas(index));
    }
  });

  // 4. Initial Frame Render
  useEffect(() => {
    if (!loading && images.length > 0) {
      requestAnimationFrame(() => renderCanvas(0));
    }
  }, [loading, images, renderCanvas]);

  // 5. Handle resize events
  useEffect(() => {
    const handleResize = () => {
      if (!loading && images.length > 0) {
        requestAnimationFrame(() => renderCanvas(activeFrameRef.current));
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [loading, images, renderCanvas]);

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-[#121212] w-full">
      {/* Loading overlay screen */}
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#121212] text-white">
          <div className="flex flex-col items-center gap-6 max-w-xs w-full px-6">
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-500 font-bold mb-2">
                Creative Portfolio
              </span>
              <h2 className="font-display text-2xl font-black tracking-widest text-glow-purple">
                LOADING
              </h2>
            </div>
            
            {/* Minimal Progress Bar */}
            <div className="relative w-full h-[2px] bg-neutral-900 overflow-hidden rounded-full">
              <div 
                style={{ width: `${loadProgress}%` }}
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 transition-all duration-300 ease-out shadow-[0_0_10px_#a855f7]"
              />
            </div>
            
            <div className="flex items-center gap-1 font-mono text-xs text-neutral-400">
              <span className="text-purple-400 font-bold">{loadProgress}%</span>
              <span>rendered</span>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Viewport Wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden select-none">
        <canvas
          ref={canvasRef}
          className="w-full h-full block object-cover filter brightness-[0.85] contrast-[1.05]"
        />
        {/* Parallax typography overlaid on top */}
        {!loading && <Overlay scrollYProgress={scrollYProgress} />}
      </div>
    </div>
  );
}
