"use client";

import React, { useRef, useState, useEffect, useMemo, memo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useSpring,
} from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Code,
} from "lucide-react";

// --- SUB-COMPONENTS (MEMOIZED) ---

const OrbitalIcon = memo(({ item, index, total, activeCard, setActiveCard }) => {
  const angle = (index / total) * (2 * Math.PI);
  
  // Responsive Radius
  const radius = typeof window !== 'undefined' 
    ? (window.innerWidth < 640 ? 100 : window.innerWidth < 1024 ? 160 : 220) 
    : 220;
    
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return (
    <motion.div
      style={{ x, y, translateZ: 0 }}
      className="absolute w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 cursor-pointer z-20 will-change-transform transform-gpu"
    >
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        whileHover={{ scale: 1.1 }}
        onHoverStart={() => setActiveCard(item)}
        onHoverEnd={() => setActiveCard(null)}
        onClick={() => setActiveCard(item === activeCard ? null : item)}
        className="w-full h-full bg-white rounded-2xl p-1 shadow-lg border border-slate-100 hover:border-blue-400 overflow-hidden"
      >
        <div className="relative w-full h-full rounded-xl overflow-hidden">
          <img src={item.img} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
          <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-30`} />
          <div className="absolute bottom-1 lg:bottom-2 left-0 right-0 text-center">
            <span className="text-[6px] sm:text-[8px] lg:text-[10px] font-black text-white uppercase px-1">{item.title}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

// --- MAIN HERO COMPONENT ---

export const Hero = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [dbData, setDbData] = useState([]);
  const [heroPrimary, setHeroPrimary] = useState(null);

  useEffect(() => {
    const getHeroAssets = async () => {
      try {
        const response = await fetch("https://bluestoneinternationalpreschool.com/techpark_api/api/media/hero");
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setHeroPrimary(data[0]);
          setDbData(data);
        }
      } catch (error) {
        console.error("Failed to fetch hero assets:", error);
      }
    };
    getHeroAssets();
  }, []);

  const features = useMemo(() => {
    return dbData.map((item, index) => ({
      id: item.id,
      img: item.image_url || item.image_data,
      title: item.title || `Module ${index + 1}`,
      color: index % 2 === 0 ? "from-blue-600 to-indigo-600" : "from-cyan-500 to-blue-400"
    }));
  }, [dbData]);

  const bgImage = heroPrimary?.image_url || heroPrimary?.image_data;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      // Unified background color for both sides
      className="relative min-h-screen w-full bg-white flex flex-col-reverse lg:flex-row overflow-x-hidden"
    >
      
      {/* --- LEFT CONTENT SECTION --- */}
      <div className="w-full lg:w-[45%] px-6 py-6 sm:p-8 lg:p-24 flex flex-col justify-center z-20 text-center lg:text-left items-center lg:items-start order-2 lg:order-1">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-3 mb-6 mt-20"
        >
          <span className="text-blue-600 font-bold text-[10px] sm:text-xs uppercase tracking-[0.3em]">
            Software Excellence Center
          </span>
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-6"
        >
          <span className="italic">BLUESTONE</span><br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600 italic">TECHPARK</span>
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 text-base sm:text-lg lg:text-xl mb-10 max-w-md leading-relaxed"
        >
          Master the future of <span className="text-blue-600 font-bold">Full-Stack Development</span>. 
          Enroll in our elite tech ecosystem.
        </motion.p>

        <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.3 }}
        >
          <Link to="/contact">
            <motion.button 
              whileHover={{ y: -4, backgroundColor: "#1d4ed8" }} 
              whileTap={{ scale: 0.95 }} 
              className="px-8 py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-100 flex items-center gap-3 transition-colors"
            >
              ENROLL NOW <ArrowRight size={20} />
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* --- RIGHT VISUAL SECTION --- */}
      <div className="relative w-full lg:w-[55%] min-h-[400px] sm:min-h-[500px] lg:min-h-screen flex items-center justify-center order-1 lg:order-2">
        
        {/* Background Image with Unified Gradient Mask */}
        <div className="absolute inset-0 pointer-events-none">
          <img 
            src={bgImage} 
            alt="" 
            className="w-full h-full object-cover opacity-[0.08] lg:opacity-[0.12] grayscale" 
          />
          {/* This gradient ensures the "shade" matches the left side perfectly */}
          <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-white via-white/40 to-transparent" />
        </div>

        {/* The Orbital Interface */}
        <div className="relative z-10 w-[280px] h-[280px] sm:w-[450px] sm:h-[450px] lg:w-[500px] lg:h-[500px] flex items-center justify-center">
          
          {/* Orbital Ring Path */}
          <div className="absolute inset-0 border border-blue-400 rounded-full border-dashed scale-95 opacity-50" />

          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            style={{ translateZ: 0 }}
            className="relative w-full h-full flex items-center justify-center will-change-transform transform-gpu"
          >
            {features.map((item, index) => (
              <OrbitalIcon 
                key={item.id} 
                item={item} 
                index={index} 
                total={features.length} 
                activeCard={activeCard} 
                setActiveCard={setActiveCard} 
              />
            ))}
          </motion.div>

          {/* Central Hub Icon/Info */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <AnimatePresence mode='wait'>
              {activeCard ? (
                <motion.div 
                  key="info" 
                  initial={{ opacity: 0, scale: 0.8 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.8 }} 
                  className="text-center bg-white p-5 lg:p-8 rounded-full border border-blue-50 shadow-2xl pointer-events-auto min-w-[120px]"
                >
                  <p className="text-blue-600 font-black text-[10px] lg:text-xs uppercase tracking-widest leading-tight">
                    {activeCard.title}
                  </p>
                  <div className="h-1 w-8 bg-blue-100 mx-auto mt-2 rounded-full" />
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
                  className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-200"
                >
                  <Code className="text-white" size={window?.innerWidth < 640 ? 24 : 32} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};