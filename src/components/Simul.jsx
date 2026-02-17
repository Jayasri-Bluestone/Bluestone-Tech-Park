"use client";

import React, { useRef, memo } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/* ---------------- OPTIMIZED COMPONENTS ---------------- */

// Memoized to prevent re-renders when the parent scroll values update
const StatBlock = memo(({ label, value, color }) => (
  <div className={`border-l-2 ${color} pl-6 transform-gpu`}>
    <h4 className="text-white font-mono text-2xl font-bold">{value}</h4>
    <p className="text-slate-500 text-[10px] uppercase tracking-widest">{label}</p>
  </div>
));

StatBlock.displayName = "StatBlock";

export const SimulationSection = () => {
  const containerRef = useRef(null);
  
  // 1. Scroll Progress with proper offset
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 2. Optimized Spring (Slightly higher damping for stability)
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 70, 
    damping: 25,
    mass: 0.5,
    restDelta: 0.001
  });

  // 3. Transformations with limited ranges to avoid extreme paint areas
  const xBg = useTransform(smoothScroll, [0, 1], ["0%", "-20%"]);
  const scanLineY = useTransform(smoothScroll, [0, 1], ["-5vh", "105vh"]);
  const nodeOpacity = useTransform(smoothScroll, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const scaleEffect = useTransform(smoothScroll, [0.2, 0.5, 0.8], [0.95, 1, 0.95]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[100vh] bg-slate-950 overflow-hidden" // Increased height for better scroll feel
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        
        {/* LARGE BACKGROUND TEXT - Accelerated */}
        <motion.div 
          style={{ x: xBg, translateZ: 0 }}
          className="absolute inset-0 flex items-center whitespace-nowrap pointer-events-none select-none will-change-transform transform-gpu"
        >
          <h2 className="text-[25vw] font-black text-white/[0.01] leading-none">
            VIRTUAL_PRODUCTION_SIMULATION_SYSTEM_01
          </h2>
        </motion.div>

        {/* SCANNING LINE EFFECT - Accelerated */}
        <motion.div 
          style={{ y: scanLineY, translateZ: 0 }} 
          className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent z-10 will-change-transform transform-gpu"
        />

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-6xl italic lg:text-8xl font-black text-white tracking-tighter leading-none">
                THE<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600">DIGITAL TWIN</span>
              </h2>
            </motion.div>
            
            <motion.p 
              className="text-slate-400 text-lg md:text-xl max-w-md font-light leading-relaxed"
            >
              Every square inch of Bluestone Tech Park is mirrored in a high-fidelity virtual environment.
            </motion.p>

            <div className="flex gap-10">
              <StatBlock label="Accuracy" value="1:1" color="border-blue-600" />
              <StatBlock label="Latency" value="0.5ms" color="border-slate-800" />
            </div>
          </div>

          {/* RIGHT SIDE: DATA VISUALIZATION WINDOW */}
          <motion.div 
            style={{ scale: scaleEffect, translateZ: 0 }}
            className="relative aspect-video rounded-[2rem] border border-white/10 bg-slate-900/50 backdrop-blur-sm overflow-hidden transform-gpu will-change-transform"
          >
             {/* Optimized Grid - Using CSS instead of complex SVGs */}
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />

             {/* Moving Simulation Nodes */}
             <motion.div
               style={{ opacity: nodeOpacity, translateZ: 0 }}
               className="absolute inset-0 p-6 md:p-12 will-change-opacity"
             >
                <div className="w-full h-full relative border border-blue-500/20 rounded-2xl overflow-hidden">
                    <div className="absolute top-4 left-4 flex items-center gap-2 z-20">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-blue-500 font-mono text-[10px] uppercase">Live_Node_Feed</span>
                    </div>

                    <img
                      src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=60&w=800"
                      className="w-full h-full object-cover opacity-20 mix-blend-overlay"
                      alt="Simulation"
                      loading="lazy"
                    />
                </div>
             </motion.div>
          </motion.div>
        </div>

        {/* HUD UI */}
        <div className="absolute bottom-10 left-0 w-full px-10 flex justify-between items-end opacity-20">
            <div className="hidden md:flex font-mono text-[9px] text-slate-500 gap-10">
                <span>VER_4.0.9</span>
                <span>LOC_12.9_77.5</span>
            </div>
            <motion.div 
              animate={{ opacity: [0.2, 0.5, 0.2] }} 
              transition={{ repeat: Infinity, duration: 4 }}
              className="text-blue-500 font-mono text-[10px] uppercase tracking-widest"
            >
              Simulation Active
            </motion.div>
        </div>
      </div>
    </section>
  );
};