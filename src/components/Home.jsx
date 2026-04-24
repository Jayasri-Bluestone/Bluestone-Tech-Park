
"use client";

import React, { useRef, useState, useEffect, useMemo, memo } from "react";
import {
  motion,
  useScroll,
  useTransform, AnimatePresence,
  useMotionValue, useSpring, useInView
} from "framer-motion";

import { Link } from "react-router-dom";

import { ReactLenis } from "lenis/react";
import {
  Cpu, Database,
  Layout, ArrowRight,
  MousePointer2, Loader2,
  ChevronRight, Code, Smartphone,
} from "lucide-react";
import { TechParkFeatures } from "./TechParkFeatures";
import { Contact } from "./Contact";
import { Services } from "./Services";
import * as LucideIcons from 'lucide-react';
import { AcademySection } from "./Academy";

// Import live assets
import IMG_8599 from "../assets/IMG_8599.jpg";
import IMG_8602 from "../assets/IMG_8602.jpg";
import IMG_8604 from "../assets/IMG_8604.jpg";
import IMG_8622 from "../assets/IMG_8622.jpg";
import vasa from "../assets/vasa.png";

/* ---------------- DATA ---------------- */


// --- ANIMATION VARIANTS ---
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};




//Hero Component

const Hero = () => {
  // 1. ALL HOOKS AT THE TOP
  const [activeCard, setActiveCard] = useState(null);
  const [features, setFeatures] = useState([]);
  const [heroData, setHeroData] = useState(null);

  // 2. DEFINE DERIVED VARIABLES
  // bgImage uses the first image from your DB, or a fallback if empty
  const bgImage = heroData?.image_url || heroData?.image_data;

  // 3. FETCH IMAGES FROM DATABASE
  useEffect(() => {
    const getHeroAssets = async () => {
      try {
        const response = await fetch("https://bluestoneinternationalpreschool.com/techpark_api/api/media/hero");
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          // Set the primary background image (first entry)
          setHeroData(data[0]);

          // Map database rows to your orbital feature structure
          const formattedData = data.map((item, index) => ({
            id: item.id,
            img: item.image_url || item.image_data,
            title: item.title || `Module ${index + 1}`,
            // Alternating your specific brand gradients
            color: index % 2 === 0 ? "from-blue-600 to-indigo-600" : "from-cyan-500 to-blue-400"
          }));
          setFeatures(formattedData);
        }
      } catch (error) {
        console.error("Failed to fetch hero assets:", error);
      }
    };

    getHeroAssets();
  }, []);

  // 4. ANIMATION VARIANTS
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };



  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative min-h-screen w-full bg-[#fdfdfd] flex flex-col lg:flex-row overflow-x-hidden"
    >

      {/* --- LEFT SECTION --- */}
      <div className="w-full lg:w-[45%] p-6 sm:p-12 lg:p-24 flex flex-col justify-center z-20 bg-[#fdfdfd] text-center lg:text-left items-center lg:items-start">
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
          <span className="text-blue-600 font-bold text-[10px] sm:text-xs mt-20 uppercase tracking-[0.3em]">Software Excellence Center</span>
        </motion.div>

        <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl italic lg:text-7xl font-black text-slate-900 leading-none mb-6">
          BLUESTONE<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600 italic uppercase">Tech Park</span>
        </motion.h1>

        <motion.p variants={itemVariants} className="text-slate-500 text-base sm:text-lg lg:text-xl mb-10 max-w-md leading-relaxed">
          The technology vertical of <span className="text-blue-600 font-bold italic">Bluestone Group of Institutions</span>.
          We build the digital infrastructure for the future of education.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link to="/contact" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-3 tracking-wide"
            >
              ENROLL NOW <ArrowRight size={20} />
            </motion.button>
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-4 p-3 border border-blue-50 rounded-2xl bg-blue-50/30 w-fit">
          <div className="flex -space-x-3">
            {[IMG_8602, IMG_8604, IMG_8622].map((img, i) => (
              <img key={i} src={img} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white object-cover" alt="student" />
            ))}
          </div>
          <p className="text-xs sm:text-sm font-bold text-slate-600">Join <span className="text-blue-600">1,200+</span> Developers</p>
        </motion.div>
      </div>

      {/* --- RIGHT SECTION: RESPONSIVE ORBIT --- */}
      <div className="relative w-full lg:w-[55%] min-h-[500px] sm:min-h-[600px] flex items-center justify-center bg-[#fdfdfd] overflow-hidden">

        {/* Cinematic Backdrop (Dynamic from DB) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          className="absolute inset-0 grayscale pointer-events-none transition-opacity duration-1000"
        >
          <img src={bgImage} alt="bg" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent lg:bg-gradient-to-r" />
        </motion.div>

        {/* The Orbital Interface */}
        <div className="relative z-10 w-[300px] h-[300px] sm:w-[470px] sm:h-[470px] lg:w-[500px] lg:h-[500px] flex items-center justify-center">

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border border-blue-400 rounded-full border-dashed scale-90 opacity-50"
          />

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {features.map((item, index) => {
              const angle = (index / features.length) * (2 * Math.PI);
              const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 120 : 220;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.div
                  key={item.id}
                  style={{ x, y }}
                  className="absolute w-20 h-20 sm:w-28 sm:h-28 lg:w-32 h-32 cursor-pointer z-20"
                >
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    whileHover={{ scale: 1.1 }}
                    onHoverStart={() => setActiveCard(item)}
                    onHoverEnd={() => setActiveCard(null)}
                    onClick={() => setActiveCard(item === activeCard ? null : item)}
                    className="w-full md:h-full h-[100px] bg-white rounded-2xl sm:rounded-[2rem] p-1 shadow-xl border border-white hover:border-blue-400 overflow-hidden group"
                  >
                    <div className="relative w-full h-full  rounded-xl sm:rounded-[1.7rem] overflow-hidden">
                      <img src={item.img} alt={item.title} className="w-full md:h-full h-[100px] object-cover" />
                      <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-40`} />
                      <div className="absolute bottom-2 left-0 right-0 text-center">
                        <span className="text-[8px] sm:text-[10px] font-black text-white uppercase">{item.title}</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CENTRAL HUB */}
          <div className="absolute inset-0 flex  items-center justify-center pointer-events-none">
            <AnimatePresence mode='wait'>
              {activeCard ? (
                <motion.div
                  key="info"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-center bg-white/95 backdrop-blur-md p-4 sm:p-8 rounded-full border border-blue-100 shadow-xl pointer-events-auto"
                >
                  <p className="text-blue-600 font-black text-xs sm:text-sm uppercase mb-1 tracking-widest">{activeCard.title}</p>
                  <p className="text-slate-400 text-[8px] sm:text-[10px] font-bold uppercase">Active</p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-16 h-16 sm:w-24 sm:h-24 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-200"
                >
                  <Code className="text-white" size={typeof window !== 'undefined' && window.innerWidth < 640 ? 24 : 32} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* TECH STACK BAR */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 md:right-15 hidden flex bg-white/90 backdrop-blur-lg border border-slate-100 px-6 py-3 rounded-2xl shadow-xl items-center gap-6 sm:gap-8"
        >
          <div className="flex flex-col items-center opacity-50"><Database size={18} /><span className="text-[7px] mt-1 font-bold uppercase">Data</span></div>
          <div className="flex flex-col items-center text-blue-600 font-black"><Cpu size={18} /><span className="text-[7px] mt-1 uppercase">Logic</span></div>
          <div className="flex flex-col items-center opacity-50"><Layout size={18} /><span className="text-[7px] mt-1 font-bold uppercase">UI/UX</span></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

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



//Timeline Component

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





// --- VERTICAL SHOWCASE SECTION (Replaced Simulation) ---
export const VerticalShowcase = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const xBg = useTransform(smoothScroll, [0, 1], ["0%", "-20%"]);
  const scanLineY = useTransform(smoothScroll, [0, 1], ["-10vh", "110vh"]);
  const nodeOpacity = useTransform(smoothScroll, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative h-[100vh] bg-slate-950 overflow-hidden">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">

        {/* LARGE BACKGROUND TEXT */}
        <motion.div
          style={{ x: xBg }}
          className="absolute inset-0 flex items-center whitespace-nowrap pointer-events-none select-none will-change-transform transform-gpu"
        >
          <h2 className="text-[25vw] font-black text-white/[0.015] leading-none uppercase">
            Institutional_Ecosystem_V3
          </h2>
        </motion.div>

        {/* SCANNING LINE EFFECT */}
        <motion.div
          style={{ y: scanLineY }}
          className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent z-10 transform-gpu"
        />

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex gap-1.5 mb-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full ${i < 3 ? 'bg-blue-600' : 'bg-slate-800'}`} />
                ))}
              </div>
              <h2 className="text-6xl italic lg:text-8xl font-black text-white tracking-tighter leading-none">
                OUR<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600 uppercase">SOLUTIONS</span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-lg md:text-xl max-w-md font-light leading-relaxed"
            >
              Bluestone Tech Park serves as the core technology vertical, powering the entire digital ecosystem of Bluestone Group of Institutions.
            </motion.p>

            <div className="flex gap-10">
              <StatBlock label="Verticals" value="04+" color="border-blue-600" />
              <StatBlock label="Active Users" value="50k+" color="border-slate-800" />
            </div>
          </div>

          {/* PROJECT PREVIEW WINDOW */}
          <div className="relative aspect-square lg:aspect-video rounded-[3rem] border border-white/10 bg-slate-900/50 backdrop-blur-xl overflow-hidden group">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            <motion.div
              style={{ opacity: nodeOpacity }}
              className="absolute inset-0 p-8 md:p-12"
            >
              <div className="w-full h-full relative border border-blue-500/20 rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute top-6 left-6 flex items-center gap-2 z-20">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-white font-mono text-[10px] uppercase tracking-widest">Portfolio_Live_02</span>
                </div>

                <img
                  src="/bluestone_preschool_mockup_1777013212530.png"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt="Bluestone Preschool Platform"
                />

                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-950 to-transparent">
                  <p className="text-white font-black italic text-2xl uppercase tracking-tighter">Bluestone Preschool Platform</p>
                  <p className="text-blue-400 text-xs font-bold uppercase tracking-widest">Web & Mobile Ecosystem</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* HUD UI */}
        <div className="absolute bottom-10 left-0 w-full px-10 flex justify-between items-end opacity-30">
          <div className="hidden md:flex font-mono text-[9px] text-slate-500 gap-10 uppercase tracking-widest">
            <span>Vertical_Integration_Stable</span>
            <span>System_Uptime_99.9%</span>
          </div>
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="text-blue-500 font-mono text-[10px] uppercase tracking-widest"
          >
            Powering Bluestone Group
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const StatBlock = ({ label, value, color }) => (
  <div className={`border-l-2 ${color} pl-6`}>
    <h4 className="text-white font-mono text-2xl font-bold">{value}</h4>
    <p className="text-slate-500 text-[10px] uppercase tracking-widest">{label}</p>
  </div>
);



// Helper to assign grid sizes and icons based on index
const getLayoutProps = (i) => {
  const layouts = [
    { size: "col-span-2 row-span-2", icon: "🧠", x: -50, y: -50 },
    { size: "col-span-1 row-span-1", icon: "💰", x: 50, y: -20 },
    { size: "col-span-1 row-span-2", icon: "☁️", x: 100, y: 0 },
    { size: "col-span-1 row-span-1", icon: "🧬", x: -100, y: 50 },
    { size: "col-span-1 row-span-1", icon: "🚀", x: 0, y: 100 },
    { size: "col-span-1 row-span-1", icon: "🛡️", x: 50, y: 50 },
    { size: "col-span-2 row-span-1", icon: "🤖", x: -50, y: 100 },
  ];
  return layouts[i % layouts.length];
};

// Fallback titles since your DB shows NULL
const getFallbackTitle1 = (i) =>
  ["AI Research", "Fintech", "Cloud Hub", "BioTech", "Accelerator", "Cyber Unit", "Robotics"][i] || "Innovation Lab";

export const EcosystemGrid = () => {
  const [dbDivisions, setDbDivisions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEcosystem = async () => {
      try {
        // Fetching "campus ecosystem media" (encoded with %20)
        const response = await fetch("https://bluestoneinternationalpreschool.com/techpark_api/api/media/campus ecosystem");
        const data = await response.json();

        if (Array.isArray(data)) {
          const formatted = data.map((item, i) => {
            const layout = getLayoutProps(i);
            const fallbacks = [IMG_8599, IMG_8604, IMG_8622];
            return {
              ...layout,
              title: getFallbackTitle1(i),
              img: item.image_url || item.image_data || fallbacks[i % fallbacks.length],
            };
          });
          setDbDivisions(formatted);
        }
      } catch (error) {
        console.error("Ecosystem fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEcosystem();
  }, []);

  if (loading) return <div className="py-20 text-center font-black uppercase italic">Loading Ecosystem...</div>;
  if (dbDivisions.length === 0) return null;

  return (
    <section className="py-20 bg-white overflow-hidden min-h-full flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full">

        <div className="mb-24 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl font-black text-black uppercase italic tracking-tighter"
          >
            Campus <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600 underline decoration-blue-500 underline-offset-8">Ecosystem</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-3 gap-6 h-[750px]">
          {dbDivisions.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, x: item.x, y: item.y }}
              whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 20,
                delay: i * 0.08
              }}
              whileHover={{ scale: 0.98, zIndex: 10 }}
              className={`${item.size} relative group cursor-pointer overflow-hidden rounded-[2.5rem] shadow-2xl`}
            >
              <motion.img
                src={item.img}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:opacity-80 transition-all duration-700"
                whileHover={{ scale: 1.2 }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />

              <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                <motion.div
                  initial={{ rotate: -10 }}
                  whileHover={{ rotate: 0, scale: 1.1 }}
                  className="bg-white/10 w-14 h-14 rounded-2xl flex items-center justify-center text-3xl backdrop-blur-xl border border-white/20 shadow-xl"
                >
                  {item.icon}
                </motion.div>

                <div>
                  <h3 className="text-white text-2xl font-black uppercase tracking-tighter group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <div className="w-0 group-hover:w-full h-[3px] bg-blue-500 mt-2 transition-all duration-500 shadow-[0_0_10px_#3b82f6]" />
                </div>
              </div>

              <div className="absolute -bottom-6 -right-2 text-[10rem] opacity-20 font-black text-white pointer-events-none group-hover:opacity-10 transition-opacity">
                {i + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};




/* ---------------- MAIN ---------------- */

export default function BluestoneExperience() {
  return (
    <ReactLenis root options={{ lerp: 0.08 }}>
      <main className="relative bg-[#f8fafc] text-slate-900 overflow-hidden">

        {/* ---------- 2-COLOR BACKGROUND THEME ---------- */}
        <div className="fixed inset-0 -z-10">

          <div className="absolute inset-0 bg-gradient-to-br from-[#f8fafc] via-[#eef2ff] to-[#f1f5f9]" />

          <motion.div
            animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-blue-400/20 rounded-full blur-[160px]"
          />

          <motion.div
            animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-indigo-400/20 rounded-full blur-[160px]"
          />

        </div>

        <Hero />
        <TechParkFeatures />
        <InnovationTimeline />
        <VerticalShowcase />
        <Services />
        <EcosystemGrid />
        <AcademySection />
        <Contact />

      </main>

    </ReactLenis>
  );
}
