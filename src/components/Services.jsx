"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight, 
  ArrowLeft, // Added for navigation
  Sparkles, 
  Target,
  Zap,
  Cpu,
  Loader2,
  Shield
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';

// --- SUB-COMPONENT: VALUE PROPOSITION (BENTO GRID) ---
const ValueProp = () => {
  const features = [
    {
      title: "Industry Aligned",
      desc: "Curriculums designed by tech leads from top-tier companies.",
      icon: <Target className="text-blue-600" />,
      bg: "bg-blue-50"
    },
    {
      title: "Rapid Deployment",
      desc: "Accelerated learning paths to get you project-ready in weeks.",
      icon: <Zap className="text-pink-600" />,
      bg: "bg-pink-50"
    },
    {
      title: "Enterprise Grade",
      desc: "Learn the security and scalability standards of the Fortune 500.",
      icon: <Shield className="text-indigo-600" />,
      bg: "bg-indigo-50"
    },
    {
      title: "Next-Gen Stack",
      desc: "Master AI, Cloud-Native, and High-Performance architectures.",
      icon: <Cpu className="text-cyan-600" />,
      bg: "bg-cyan-50"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[2rem] border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all group"
            >
              <div className={`w-14 h-14 rounded-2xl ${f.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3 uppercase tracking-tighter italic">{f.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- MAIN COMBINED COMPONENT ---
export const Services = () => {
  const [dbServices, setDbServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Navigation Logic
  const handleNext = () => {
    setActive((prev) => (prev + 1) % dbServices.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + dbServices.length) % dbServices.length);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const imageRotate = useTransform(scrollYProgress, [0, 0.5], [5, 0]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("https://bluestoneinternationalpreschool.com/techpark_api/api/services");
        const data = await res.json();
        setDbServices(data);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { isMobile, cardWidth, spacing } = useMemo(() => {
    const mobile = width < 768;
    const cWidth = mobile ? width * 0.85 : 520;
    return {
      isMobile: mobile,
      cardWidth: cWidth,
      spacing: mobile ? cWidth + 15 : 320,
    };
  }, [width]);

  const DynamicIcon = ({ name }) => {
    const IconComponent = LucideIcons[name] || LucideIcons.Globe;
    return <IconComponent className="w-5 h-5 md:w-8 md:h-8 text-white" />;
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  );

  return (
    <div ref={containerRef} className="relative bg-white overflow-hidden">
      
      {/* 1. CINEMATIC BACKGROUND ELEMENTS */}
      <motion.div style={{ y: y1 }} className="absolute top-20 left-[-10%] w-[50%] h-[30%] bg-blue-50 rounded-full blur-[120px] opacity-60 pointer-events-none" />
      <motion.div style={{ y: y2 }} className="absolute bottom-40 right-[-10%] w-[40%] h-[40%] bg-pink-50 rounded-full blur-[120px] opacity-40 pointer-events-none" />

      {/* --- SECTION: ABOUT BLUESTONE (MD STYLE) --- */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 relative group"
            >
              <div className="absolute -top-6 -left-6 w-full h-full border-2 border-blue-100 rounded-[3rem] transition-transform duration-500 group-hover:-translate-x-2" />
              <motion.div 
                style={{ rotate: imageRotate }}
                className="relative z-20 rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white"
              >
                <img 
                  src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000" 
                  alt="Bluestone Excellence Center" 
                  className="w-full h-[450px] md:h-[550px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 text-white">
                  <p className="text-xs font-bold tracking-[0.3em] uppercase opacity-80 mb-2">Established Excellence</p>
                  <h4 className="text-2xl font-black italic">EST. 2025</h4>
                </div>
              </motion.div>
            </motion.div>

            <div className="w-full lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px w-8 bg-blue-600" />
                  <span className="text-blue-600 font-bold text-xs uppercase tracking-[0.4em]">The Identity</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.95] mb-8 tracking-tighter uppercase italic">
                  Vision & <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600">Velocity</span>
                </h2>
                <div className="space-y-6">
                  <p className="text-slate-700 text-lg md:text-xl font-medium leading-relaxed">
                    Bluestone Techpark is a premier <span className="text-blue-600 font-black">Software Excellence Center</span> designed for the creators of tomorrow.
                  </p>
                  <p className="text-slate-500 text-base leading-relaxed border-l-4 border-blue-100 pl-6 italic">
                    We bridge the gap between classroom theory and industry reality. Our ecosystem is built on intensive technical labs and global mentorship.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <ValueProp />

      {/* --- SECTION: DYNAMIC SERVICES --- */}
      <section className="relative py-20 md:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 md:mb-24">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8 bg-blue-600" />
                <span className="text-blue-600 font-bold text-xs uppercase tracking-[0.4em]">Expertise</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.95] tracking-tighter uppercase italic">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-blue-500">Services</span>
              </h2>
            </motion.div>

            {/* Desktop Navigation Arrows */}
            <div className="hidden md:flex gap-4 mb-2">
              <button 
                onClick={handlePrev}
                className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-blue-600 hover:text-blue-600 transition-all active:scale-90"
              >
                <ArrowLeft size={24} />
              </button>
              <button 
                onClick={handleNext}
                className="w-14 h-14 rounded-full bg-slate-900 flex items-center justify-center text-white hover:bg-blue-600 transition-all shadow-xl active:scale-90"
              >
                <ArrowRight size={24} />
              </button>
            </div>
          </div>

          <div className="relative h-[450px] md:h-[550px] flex items-center justify-center">
            
            {/* Mobile Navigation Overlays (Visible on small screens) */}
            <div className="absolute inset-y-0 left-0 w-16 z-50 flex items-center md:hidden">
                <button onClick={handlePrev} className="bg-white/50 backdrop-blur-md p-2 rounded-full text-slate-900">
                    <ArrowLeft size={20} />
                </button>
            </div>
            <div className="absolute inset-y-0 right-0 w-16 z-50 flex items-center justify-end md:hidden">
                <button onClick={handleNext} className="bg-white/50 backdrop-blur-md p-2 rounded-full text-slate-900">
                    <ArrowRight size={20} />
                </button>
            </div>

            <div className="relative w-full h-full">
              <AnimatePresence mode="popLayout" initial={false}>
                {dbServices.map((service, index) => {
                  const offset = index - active;
                  if (Math.abs(offset) > 2) return null;

                  return (
                    <motion.div
                      key={service.id}
                      onClick={() => setActive(index)}
                      initial={false}
                      animate={{
                        x: `calc(-50% + ${offset * spacing}px)`,
                        y: "-50%",
                        scale: offset === 0 ? 1 : 0.85,
                        opacity: Math.abs(offset) > (isMobile ? 1 : 2) ? 0 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 150, damping: 25, mass: 0.8 }}
                      className={`absolute top-1/2 left-1/2 h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl cursor-pointer bg-slate-900 border-4 transform-gpu will-change-transform ${
                        offset === 0 ? 'border-blue-500/50' : 'border-transparent'
                      }`}
                      style={{ width: cardWidth, zIndex: 10 - Math.abs(offset) }}
                    >
                      <div className="absolute inset-0 pointer-events-none">
                        <img 
                          src={service.image_base64} 
                          alt="" 
                          className={`w-full h-full object-cover transition-opacity duration-500 ${
                            offset === 0 ? 'opacity-50' : 'opacity-10'
                          }`} 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                        <div className="flex items-center gap-5 mb-6">
                          <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-blue-600 flex-shrink-0 flex items-center justify-center">
                            <DynamicIcon name={service.icon_name} />
                          </div>
                          <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white italic uppercase tracking-tighter">
                            {service.title}
                          </h3>
                        </div>

                        {offset === 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                          >
                            <p className="text-slate-300 text-sm md:text-base mb-8 max-w-md leading-relaxed line-clamp-2">
                              {service.description}
                            </p>
                            <Link to="/contact">
                              <button className="group flex items-center gap-3 px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-xl">
                                Get Started <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                              </button>
                            </Link>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-12">
            {dbServices.map((_, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index === active ? "bg-blue-600 w-12" : "bg-slate-200 w-3"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};