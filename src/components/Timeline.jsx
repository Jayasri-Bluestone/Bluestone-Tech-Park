import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import * as LucideIcons from 'lucide-react';
import { Loader2 } from "lucide-react";




// --- HELPERS for NULL DB FIELDS ---
const getFallbackTitle = (i) => ["Foundation", "Incubation", "Expansion", "Global AI Campus"][i] || "Future Phase";
const getFallbackDesc = (i) => [
  "Establishing core neural networks and baseline data architecture.",
  "Training specialized models within sandboxed smart environments.",
  "Scaling infrastructure across distributed edge computing nodes.",
  "Full integration of smart infrastructure with autonomous systems."
][i] || "Innovating the next generation of smart systems.";

const TimelineSection = ({ phase, index, isEven }) => {
  return (
    <div className={`flex flex-col md:flex-row items-center justify-between mb-32 ${isEven ? 'md:flex-row-reverse' : ''}`}>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-5/12 transform-gpu"
      >
        <span className="text-pink-600 font-mono font-bold tracking-widest uppercase text-xs">Phase 0{index + 1}</span>
        <h3 className="lg:text-5xl md:text-4xl text-3xl font-black mt-2 mb-4 uppercase italic text-blue-600">
          {phase.getFallbackTitle ? phase.getFallbackTitle(index) : getFallbackTitle(index)}
        </h3>
        <p className="text-slate-600 text-base md:text-lg leading-relaxed">{phase.description}</p>
      </motion.div>

      <div className="hidden md:block w-2/12" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full md:w-5/12 mt-8 md:mt-0 transform-gpu"
      >
        <div className="relative overflow-hidden rounded-2xl shadow-xl">
          <div className="absolute inset-0 border-2 border-blue-500/10 rounded-2xl pointer-events-none" />
          <img 
            src={phase.image} 
            alt={phase.title}
            loading="lazy"
            className="w-full h-64 md:h-80 object-cover rounded-2xl"
          />
        </div>
      </motion.div>
    </div>
  );
};



export const InnovationTimeline = () => {
  const targetRef = useRef(null);
  const [dbPhases, setDbPhases] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- FETCH LOGIC ---
  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        // Matches "timeline media" from your DB screenshot
        const response = await fetch("https://bluestoneinternationalpreschool.com/techpark_api/api/media/timeline");
        const data = await response.json();

        if (Array.isArray(data)) {
          const formatted = data.map((item, i) => ({
            title: item.title || getFallbackTitle(i),
            description: item.description || getFallbackDesc(i),
            image: item.image_url || item.image_data,
          }));
          setDbPhases(formatted);
        }
      } catch (error) {
        console.error("Timeline fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeline();
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start center", "end end"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 30,
    restDelta: 0.001
  });

  if (loading) return <div className="py-20 text-center font-mono">Loading Timeline...</div>;
  if (dbPhases.length === 0) return null;

  return (
    <section ref={targetRef} className="relative py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 relative">
        
        {/* Central Vertical Line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-100 -translate-x-1/2 overflow-hidden">
          <motion.div
            style={{ scaleY }}
            className="absolute top-0 w-full bg-blue-600 origin-top transform-gpu will-change-transform"
          />
        </div>

        <div className="relative z-10">
          {dbPhases.map((phase, i) => (
            <div key={i} className="relative">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="absolute left-[-22px] md:left-1/2 md:-translate-x-1/2 top-10 w-4 h-4 rounded-full bg-blue-600 border-4 border-white z-20"
              />
              <TimelineSection phase={phase} index={i} isEven={i % 2 !== 0} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



