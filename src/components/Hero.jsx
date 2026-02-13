import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, Code2, Cloud, Database, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// --- ANIMATED TEXT HELPER ---
const AnimatedText = ({ text, className }) => {
  return (
    <div className={`flex flex-wrap overflow-hidden ${className}`}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.02,
            ease: [0.33, 1, 0.68, 1],
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
};

// --- COLORFUL CONTRAST GLASS CARD ---
const GlassCard = ({ icon: Icon, title, desc, delay, rotate, yOffset, className, accentColor }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, rotate: rotate + 5 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotate }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8, 
        delay, 
        type: "spring", 
        stiffness: 60 
      }}
      whileHover={{ 
        y: -30, 
        rotate: 0,
        scale: 1.05,
        zIndex: 50,
        transition: { duration: 0.3, ease: "easeOut" } 
      }}
      whileTap={{ scale: 0.98 }}
      style={{ translateY: yOffset }}
      className={`w-full max-w-[380px] bg-white/80 backdrop-blur-2xl border-2 border-white/50 rounded-[2.5rem] p-8 shadow-[0_30px_60px_rgba(0,0,0,0.08)] cursor-pointer group mb-6 lg:mb-0 lg:absolute lg:right-0 ${className}`}
    >
      <div className="flex justify-between items-start mb-6">
        <div className={`p-4 rounded-2xl text-white shadow-lg transition-transform group-hover:scale-110 duration-300 ${accentColor}`}>
          <Icon size={32} strokeWidth={2.5} />
        </div>
        <div className="text-right">
          <span className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Z# Evolution</span>
          <span className="block text-[10px] font-bold text-blue-500 mt-1">v4.0.2</span>
        </div>
      </div>
      
      <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tighter uppercase">
        {title}
      </h3>
      
      <p className="text-sm text-slate-600 leading-relaxed font-semibold mb-8">
        {desc}
      </p>

      <div className="flex items-center justify-between pt-6 border-t border-slate-200/50">
        <div className="flex items-center gap-2">
           <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white" />
              <div className="w-6 h-6 rounded-full bg-purple-500 border-2 border-white" />
           </div>
           <span className="text-[10px] font-mono text-slate-500 font-bold">5k+ commits</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center transition-transform group-hover:translate-x-1">
          <ArrowRight size={14} />
        </div>
      </div>
    </motion.div>
  );
};

export const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Smooth stacking movement
  const card1Y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const card2Y = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const card3Y = useTransform(scrollYProgress, [0, 1], [0, -320]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white py-20 lg:py-0"
    >
      {/* BACKGROUND IMAGE & MESH OVERLAY */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
          alt="Tech background" 
          className="w-full h-full object-cover opacity-[0.3]"
        />
        {/* Animated Mesh Gradients */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-[-10%] right-[-5%] w-[70vw] h-[70vw] bg-blue-400/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute bottom-[-10%] left-[-5%] w-[50vw] h-[50vw] bg-purple-400/20 rounded-full blur-[100px]" 
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* LEFT CONTENT */}
        <div className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white border border-slate-200 shadow-sm w-fit mb-10"
          >
             <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
             </span>
            <span className="text-[12px] font-black text-slate-900 tracking-widest uppercase">
              NETWORK STABLE v2.0
            </span>
            <ChevronRight size={14} className="text-slate-400" />
          </motion.div>

          <h1 className="text-7xl md:text-[4rem] font-black leading-[0.9] tracking-tighter text-slate-900 mb-10">
            <AnimatedText text="RECODE" />
            <motion.span 
              className="block italic text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-pink-500 to-purple-600 py-3"
            >
              POSSIBLE...
            </motion.span>
            <AnimatedText text="GROW BEYOND!." />
          </h1>

          <div className="grid grid-cols-2 gap-10 mb-12 border-l-2 border-slate-100 pl-8">
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-600 mb-2">Efficiency</h4>
              <p className="text-sm text-slate-800 font-bold leading-relaxed">High-performance architecture with zero-bottleneck CI/CD.</p>
            </div>
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-purple-600 mb-2">Scalability</h4>
              <p className="text-sm text-slate-800 font-bold leading-relaxed">Dynamic load-balancing and auto-scaling infra logic.</p>
            </div>
          </div>

          <Link
            to="/courses"
            className="group px-14 py-6 bg-slate-900 text-white font-black rounded-[2rem] hover:bg-blue-600 transition-all flex items-center gap-4 w-fit shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
          >
            GET EARLY ACCESS
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {/* RIGHT CONTENT - COLORFUL STACK */}
        <div className="lg:col-span-6 relative h-[750px] flex items-center justify-center lg:justify-end">
           <GlassCard 
              icon={Code2} 
              title="Codebase" 
              desc="Modular structure designed for enterprise-grade collaborative scaling." 
              delay={0.2} 
              rotate={-8}
              yOffset={card1Y}
              accentColor="bg-gradient-to-br from-blue-600 to-cyan-400"
              className="lg:top-30"
           />
           
           <GlassCard 
              icon={Cloud} 
              title="Cloud Engine" 
              desc="Next-gen cloud deployment with native edge computing support." 
              delay={0.4} 
              rotate={4}
              yOffset={card2Y}
              accentColor="bg-gradient-to-br from-orange-500 to-yellow-400"
              className="lg:top-[240px]"
           />

           <GlassCard 
              icon={Database} 
              title="Data Vault" 
              desc="Immutable data structures with ultra-low latency retrieval systems." 
              delay={0.6} 
              rotate={-4}
              yOffset={card3Y}
              accentColor="bg-gradient-to-br from-pink-600 to-rose-400"
              className="lg:top-[360px]"
           />
        </div>
      </div>
    </section>
  );
};