
"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform, AnimatePresence,
  useMotionValue, useSpring, useInView
} from "framer-motion";

import { Link } from "react-router-dom";

import { ReactLenis } from "lenis/react";
import {
  ChevronLeft, Zap, ShieldCheck, Cpu, Leaf, Shield, Play, Database,
  Layout, ArrowUpRight, Building2, ArrowRight,
  MousePointer2, Loader2,
  ChevronRight, Users, Briefcase, TrendingUp, Code, Monitor, Globe, Smartphone, BarChart, PenTool, Cloud, Sparkles
} from "lucide-react";
import { TechParkFeatures } from "./TechParkFeatures";
import { Contact } from "./Contact";
import { Services } from "./Services";
import * as LucideIcons from 'lucide-react';

/* ---------------- DATA ---------------- */
// --- DATA ---



const courses = [
  {
    title: "Fullstack Development",
    category: "Development",
    description: "Master both frontend and backend technologies including React, Node.js, and databases.",
    icon: <Code />,
    color: "from-blue-500 to-blue-600",
    gradient: "from-blue-500/20 to-blue-600/20",
  },
  {
    title: "Front-end React JS",
    category: "Development",
    description: "Deep dive into modern React, Hooks, Redux, and building interactive UIs.",
    icon: <Layout />,
    color: "from-cyan-500 to-cyan-600",
    gradient: "from-cyan-500/20 to-cyan-600/20",
  },
  {
    title: "Flutter Mobile Dev",
    category: "Mobile",
    description: "Build beautiful native apps for iOS and Android with a single codebase using Flutter.",
    icon: <Smartphone />,
    color: "from-blue-600 to-blue-700",
    gradient: "from-blue-600/20 to-blue-700/20",
  },
  {
    title: "Digital Marketing",
    category: "Marketing",
    description: "Learn SEO, SEM, content strategy, and social media analytics to grow businesses.",
    icon: <MousePointer2 />,
    color: "from-sky-500 to-sky-600",
    gradient: "from-sky-500/20 to-sky-600/20",
  },
  {
    title: "No-Code: Framer",
    category: "No-Code",
    description: "Design and publish stunning websites without writing a single line of code.",
    icon: <Layout />,
    color: "from-blue-400 to-blue-500",
    gradient: "from-blue-400/20 to-blue-500/20",
  },
];

const categories = ["All", "Development", "Mobile", "Marketing", "No-Code"];

// --- ANIMATION VARIANTS ---
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const PHASES = [
  {
    title: "Foundation",
    description: "Establishing core neural networks and baseline data architecture.",
    // Bright, clean white data center/server aesthetic
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Incubation",
    description: "Training specialized models within sandboxed smart environments.",
    // Bright, modern lab/office with natural light
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Expansion",
    description: "Scaling infrastructure across distributed edge computing nodes.",
    // High-tech white architecture / cloud networking visual
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Global AI Campus",
    description: "Full integration of smart infrastructure with autonomous systems.",
    // Aerial view of a clean, futuristic smart city or campus in daylight
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
  },
];

// --- HELPER COMPONENTS ---


const Hero = () => {
  const [activeCard, setActiveCard] = useState(null);

  const features = [
    { id: 1, img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=200", title: "Dev Ops", color: "from-blue-600 to-indigo-600" },
    { id: 2, img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=200", title: "AI Labs", color: "from-cyan-500 to-blue-400" },
    { id: 3, img: "https://images.unsplash.com/photo-1551703599-6b3e8379aa8c?q=80&w=200", title: "Cloud Hub", color: "from-blue-400 to-cyan-300" },
    { id: 4, img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=200", title: "Security", color: "from-blue-700 to-blue-900" },
  ];

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
          BLUESTONE<br/>
          <span className="text-blue-600 drop-shadow-sm non-italic">TECHPARK</span>
        </motion.h1>

        <motion.p variants={itemVariants} className="text-slate-500 text-base sm:text-lg lg:text-xl mb-10 max-w-md leading-relaxed">
          Master the future of <span className="text-blue-600 font-bold">Full-Stack Development</span>. 
          Enroll in our elite tech ecosystem.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link to="/contact" className="w-full sm:w-auto">
            <motion.button 
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8  py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-3 tracking-wide"
            >
              ENROLL NOW <ArrowRight size={20} />
            </motion.button>
          </Link>
        </motion.div>

        {/* Dynamic Badge - Scaled for mobile */}
        <motion.div variants={itemVariants} className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-4 p-3 border border-blue-50 rounded-2xl bg-blue-50/30 w-fit">
          <div className="flex -space-x-3">
            {[1,2,3].map(i => (
              <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" alt="student" />
            ))}
          </div>
          <p className="text-xs sm:text-sm font-bold text-slate-600">Join <span className="text-blue-600">1,200+</span> Developers</p>
        </motion.div>
      </div>

      {/* --- RIGHT SECTION: RESPONSIVE ORBIT --- */}
      <div className="relative w-full lg:w-[55%] min-h-[500px] sm:min-h-[600px] flex items-center justify-center bg-[#fdfdfd] overflow-hidden">
        
        {/* Cinematic Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          className="absolute inset-0 grayscale pointer-events-none"
        >
          <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072" alt="bg" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent lg:bg-gradient-to-r" />
        </motion.div>

        {/* The Orbital Interface - Responsive Sizing */}
        {/* Scale logic: 320px on mobile, 450px on tablet, 550px on desktop */}
        <div className="relative z-10 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] lg:w-[550px] lg:h-[550px] flex items-center justify-center">
          
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border border-blue-400 rounded-full border-dashed scale-90 opacity-20" 
          />
          
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {features.map((item, index) => {
              const angle = (index / features.length) * (2 * Math.PI);
              // Responsive radius
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
                    className="w-full h-full bg-white rounded-2xl sm:rounded-[2rem] p-1 shadow-xl border border-white hover:border-blue-400 overflow-hidden group"
                  >
                    <div className="relative w-full h-full rounded-xl sm:rounded-[1.7rem] overflow-hidden">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
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
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
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
                    <Code className="text-white" size={window.innerWidth < 640 ? 24 : 32} />
                  </motion.div>
                )}
             </AnimatePresence>
          </div>
        </div>

        {/* Tech Stack Bar - Repositioned for mobile */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-6 sm:bottom-12 flex bg-white/90 backdrop-blur-lg border border-slate-100 px-6 py-3 rounded-2xl shadow-xl items-center gap-6 sm:gap-8"
        >
          <div className="flex flex-col items-center opacity-50"><Database size={18} /><span className="text-[7px] mt-1 font-bold uppercase">Data</span></div>
          <div className="flex flex-col items-center text-blue-600 font-black"><Cpu size={18} /><span className="text-[7px] mt-1 uppercase">Logic</span></div>
          <div className="flex flex-col items-center opacity-50"><Layout size={18} /><span className="text-[7px] mt-1 font-bold uppercase">UI/UX</span></div>
        </motion.div>
      </div>
    </motion.div>
  );
};


/* ---------------- TIMELINE ---------------- */
const TimelineSection = ({ phase, index, isEven }) => {
  return (
    <div className={`flex flex-col md:flex-row items-center justify-between mb-32 ${isEven ? 'md:flex-row-reverse' : ''}`}>

      
      {/* Text Content */}
      <motion.div 
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full md:w-5/12"
      >
        <span className="text-pink-600 font-mono font-bold tracking-widest uppercase text-sm">Phase 0{index + 1}</span>
        <h3 className="lg:text-6xl md:text-5xl text-4xl font-black mt-2 mb-4 uppercase italic text-blue-500">{phase.title}</h3>
        <p className="text-slate-600 text-lg leading-relaxed">{phase.description}</p>
      </motion.div>

      {/* Spacer for the center line */}
      <div className="hidden md:block w-2/12" />
      

      {/* Image Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, rotateY: isEven ? -5 : 20 }}
        whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="w-full md:w-5/12 mt-8 md:mt-0"
      >
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-2xl blur opacity-75 group-hover:opacity-50 transition duration-1000"></div>
          <img 
            src={phase.image} 
            alt={phase.title}
            className="relative rounded-2xl shadow-2xl object-cover w-full h-72 border border-slate-200"
          />
        </div>
      </motion.div>
    </div>
  );
};

const InnovationTimeline = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start center", "end end"],
  });

  // Smooth out the progress bar movement
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={targetRef} className="relative py-20 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative">
        
        {/* Central Vertical Line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-100 -translate-x-1/2">
          <motion.div
            style={{ scaleY }}
            className="absolute top-0 w-full bg-blue-600 origin-top shadow-[0_0_15px_rgba(37,99,235,0.5)]"
          />
        </div>

        {/* Timeline Items */}
        <div className="relative">
          {PHASES.map((phase, i) => (
            <div key={i} className="relative">
              {/* Dot on the timeline */}
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
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



/* ---------------- WAABI-INSPIRED SIMULATION SECTION ---------------- */

const SimulationSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax for the big background text
  const xBg = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  // Simulation scan line movement
  const scanLineY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  // Opacity for data nodes
  const nodeOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative h-[120vh] bg-slate-950 overflow-hidden py-20">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center">
        
        {/* LARGE BACKGROUND TEXT (WAABI STYLE) */}
        <motion.div 
          style={{ x: xBg }}
          className="absolute inset-0 flex items-center whitespace-nowrap pointer-events-none select-none"
        >
          <h2 className="text-[30vw] font-black text-white/[0.02] leading-none">
            VIRTUAL_PRODUCTION_SIMULATION_SYSTEM_01
          </h2>
        </motion.div>

        {/* SCANNING LINE EFFECT */}
        <motion.div 
          style={{ top: scanLineY }}
          className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 to-transparent z-10 shadow-[0_0_20px_rgba(59,130,246,0.8)]"
        />

        {/* CENTER CONTENT CONTAINER */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="space-y-8">
            <motion.div {...fadeInUp}>
              {/* <span className="text-blue-500 font-mono text-xs tracking-[0.5em] uppercase block mb-4">
                // Simulation Environment
              </span> */}
              <h2 className="text-6xl italic lg:text-8xl font-black text-white tracking-tighter leading-none">
                THE<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600">DIGITAL TWIN</span>
              </h2>
            </motion.div>
            
            <p className="text-slate-400 text-xl max-w-md font-light leading-relaxed">
              Every square inch of Bluestone Tech Park is mirrored in a high-fidelity virtual environment for stress-testing industrial AI.
            </p>

            <div className="flex gap-10">
              <div className="border-l-2 border-blue-600 pl-6">
                <h4 className="text-white font-mono text-2xl font-bold">1:1</h4>
                <p className="text-slate-500 text-sm uppercase tracking-widest">Scale Accuracy</p>
              </div>
              <div className="border-l-2 border-slate-800 pl-6">
                <h4 className="text-white font-mono text-2xl font-bold">0.5ms</h4>
                <p className="text-slate-500 text-sm uppercase tracking-widest">Sync Latency</p>
              </div>
            </div>
          </div>

           {/* RIGHT SIDE: DATA VISUALIZATION WINDOW */}

          <div className="relative aspect-square lg:aspect-video rounded-[3rem] border border-white/10 bg-slate-900/50 backdrop-blur-3xl overflow-hidden group">

             {/* Animated Grid Background */}

             <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

             

             {/* Moving Simulation Nodes */}

             <motion.div

               style={{ opacity: nodeOpacity }}

               className="absolute inset-0 p-12"

             >

                <div className="w-full h-full relative border border-blue-500/20 rounded-2xl">

                    <div className="absolute top-4 left-4 flex items-center gap-2">

                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />

                        <span className="text-blue-500 font-mono text-[10px] uppercase">Live_Node_Feed</span>

                    </div>

                    {/* Placeholder for a technical wireframe or abstract 3D image */}

                    <img

                      src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200"

                      className="w-full h-full object-cover opacity-30 mix-blend-overlay"

                      alt="Simulation"

                    />

                </div>

             </motion.div>

          </div>

        </div>



        {/* BOTTOM HUD DATA */}
        <div className="absolute bottom-10 left-0 w-full px-10 flex justify-between items-end border-t border-white/5 pt-10">
            <div className="font-mono text-[10px] text-slate-600 flex gap-10">
                <span>SEC_VER: 4.0.9</span>
                <span>ENC: AES-256</span>
                <span>LOC: 12.9716° N, 77.5946° E</span>
            </div>
            <motion.div 
              animate={{ opacity: [0.4, 1, 0.4] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-blue-500 font-mono text-xs uppercase"
            >
              System Ready for Deployment
            </motion.div>
        </div>
      </div>
    </section>
  );
};



const EcosystemGrid = () => {
  const divisions = [
    { title: "AI Research", icon: "🧠", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800", size: "col-span-2 row-span-2", x: -50, y: -50 },
    { title: "Fintech", icon: "💰", img: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2031&auto=format&fit=crop", size: "col-span-1 row-span-1", x: 50, y: -20 },
    { title: "Cloud Hub", icon: "☁️", img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=600", size: "col-span-1 row-span-2", x: 100, y: 0 },
    { title: "BioTech", icon: "🧬", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop", size: "col-span-1 row-span-1", x: -100, y: 50 },
    { title: "Accelerator", icon: "🚀", img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=600", size: "col-span-1 row-span-1", x: 0, y: 100 },
    { title: "Cyber Unit", icon: "🛡️", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600", size: "col-span-1 row-span-1", x: 50, y: 50 },
    { title: "Robotics", icon: "🤖", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800", size: "col-span-2 row-span-1", x: -50, y: 100 },
  ];

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
          {divisions.map((item, i) => (
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
              whileHover={{ scale: 0.98, zIndex: 10 }} // Slight shrink for a "pressed" feel
              className={`${item.size} relative group cursor-pointer overflow-hidden rounded-[2.5rem] shadow-2xl`}
            >
              {/* THE BACKGROUND IMAGE */}
              <motion.img 
                src={item.img}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:opacity-80 transition-all duration-700"
                whileHover={{ scale: 1.2 }} // Parallax zoom on hover
              />

              {/* OVERLAYS */}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-black/20 to-transparent opacity-50" />
              <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 rounded-[2.5rem] transition-all duration-500" />

              {/* CONTENT */}
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

              {/* ACCENT NUMBER */}
              <div className="absolute -bottom-6 -right-2 text-[10rem] opacity-40 font-black text-white pointer-events-none group-hover:opacity-20 transition-opacity">
                {i + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};



export const AcademySection = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch data from your backend
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        // Replace with your actual endpoint (e.g., /api/programs or /api/services)
        const res = await fetch("http://localhost:5003/api/courses"); 
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error("Error fetching programs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  // 2. Helper to render dynamic icons
  const DynamicIcon = ({ name, ...props }) => {
    const IconComponent = LucideIcons[name] || LucideIcons.Code;
    return <IconComponent {...props} />;
  };

  // Triple the data for the infinite loop effect
  const infiniteCourses = [...courses, ...courses, ...courses];

  if (loading) return (
    <div className="h-96 flex items-center justify-center">
      <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  );

  if (courses.length === 0) return null;

  return (
    <section className="py-10 md:py-24 bg-white overflow-hidden relative min-h-full flex flex-col justify-center">
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072" 
          alt="Abstract Tech"
          className="w-full h-full object-cover opacity-10 md:opacity-20" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="h-[1px] w-8 md:w-12 bg-blue-500"></span>
            <span className="text-black font-mono text-[10px] md:text-xs uppercase tracking-[0.3em]">Curriculum Track</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-7xl italic font-black text-black tracking-tighter leading-none">
            OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600">PROGRAMS</span>
          </h2>
        </div>

        {/* Infinite Slider Track */}
        <div className="flex relative items-center">
          <motion.div 
            className="flex gap-4 md:gap-8 px-4"
            animate={{ x: [0, "-33.33%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30, 
                ease: "linear",
              },
            }}
            style={{ width: "max-content" }}
          >
           {infiniteCourses.map((course, i) => (
  <div 
    key={`${course.id}-${i}`} 
    className="w-[300px] sm:w-[450px] md:w-[650px] lg:w-[700px] group flex-shrink-0"
  >
    {/* Cinematic Card */}
    <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-700 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 h-[280px] md:h-[300px] flex flex-col justify-between shadow-2xl relative overflow-hidden transition-all duration-500 hover:shadow-blue-500/20">
      
      {/* Card Content Row */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-4">
        <div className="flex items-start md:items-center gap-4 md:gap-6">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl flex items-center justify-center text-white group-hover:bg-white group-hover:text-blue-600 transition-all duration-500">
            {/* FIXED: changed courses.icon_name to course.icon_name */}
            <DynamicIcon name={course.icon_name} className="w-6 h-6 md:w-8 md:h-8" />
          </div>
          <div>
            <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight mb-1 md:mb-2">
              {/* FIXED: changed courses.title to course.title */}
              {course.title}
            </h3>
            <div className="flex gap-3 items-center text-white/70">
              <span className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest line-clamp-1">
                {/* SAFE SUBSTRING CHECK */}
                {(course.description?.substring(0, 40) || "Explore our premium curriculum")}...
              </span>
            </div>
          </div>
        </div>
        
        <div className="hidden lg:block">
          <ArrowUpRight className="text-white/30 group-hover:text-white transition-colors" size={40} />
        </div>
      </div>

      {/* Tags and Action Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 md:px-4 md:py-1.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white group-hover:bg-white/20 transition-colors">
            {/* FIXED: changed courses.category to course.category */}
            {course.category || "Pro Track"}
          </span>
        </div>

        <button className="w-fit bg-white text-blue-600 px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.2em] flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-lg">
          Explore
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Background "Ghost" Icon */}
      <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 text-white/5 group-hover:text-white/[0.08] transition-colors pointer-events-none rotate-[-15deg]">
         <DynamicIcon name={course.icon_name} size={300} />
      </div>
    </div>
  </div>
))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};




export const Btm = () => {
  return (
  <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="inline-block bg-gradient-to-r from-cyan-400 via-blue-300 to-blue-500 rounded-2xl p-8 max-w-2xl">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <MessageCircle className="w-12 h-12 text-cyan-600" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Ready to Connect?</h3>
            <p className="text-gray-700 mb-6">
              Whether it's a quick question or a full project discussion, we're here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-3 bg-pink-500 text-white font-bold hover:bg-white hover:text-pink-600 rounded-xl hover:shadow-lg hover:shadow-blue-400/50 transition-all"
              >
                Start a Project
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-3 border border-black text-pink-600 font-bold rounded-xl hover:border-blue-400 hover:text-blue-700 hover:bg-blue-50 transition-all"
              >
                Schedule a Call
              </motion.button>
            </div>
          </div>
        </motion.div>
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
  {/* --------------------------------------------- */}

  <Hero />
  {/* <ScrollZoomBenefits /> */}
  <TechParkFeatures/>
  <InnovationTimeline />
  {/* <CampusStack /> */}
<SimulationSection/>
  {/* NEW SECTIONS */}
  <Services />
  <EcosystemGrid />
  {/* <PerformanceSection /> */}
  <AcademySection />
  <Contact/>

</main>

    </ReactLenis>
  );
}
