"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  TrendingUp, 
  Users, 
  Award, 
  Briefcase, 
  ArrowRight, 
  Sparkles, 
  Globe, 
  ShieldCheck, Zap,
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

// --- DATA ---

const benefits = [
  {
    title: "Expert Mentorship",
    description: "Learn directly from industry veterans with years of experience in top tech companies.",
    icon: <Users className="w-6 h-6 text-blue-600" />,
    delay: 0.1
  },
  {
    title: "Live Projects",
    description: "Work on real-world projects that simulate the actual work environment and build a portfolio.",
    icon: <Briefcase className="w-6 h-6 text-blue-600" />,
    delay: 0.2
  },
  {
    title: "Career Support",
    description: "Get dedicated placement assistance, resume reviews, and mock interviews.",
    icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
    delay: 0.3
  },
  {
    title: "Certification",
    description: "Earn industry-recognized certificates upon completion to gain a competitive edge.",
    icon: <Award className="w-6 h-6 text-blue-600" />,
    delay: 0.4
  },
];

// --- COMPONENTS ---

export const WhyChooseUs = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const imageRotate = useTransform(scrollYProgress, [0, 0.5], [5, 0]);

  return (

      <div ref={containerRef} className="relative bg-[#fdfdfd] overflow-hidden">
      
      {/* 1. CINEMATIC BACKGROUND */}
      <motion.div style={{ y: y1 }} className="absolute top-20 left-[-10%] w-[50%] h-[30%] bg-blue-50 rounded-full blur-[120px] opacity-60 pointer-events-none" />
      <motion.div style={{ y: y2 }} className="absolute bottom-40 right-[-10%] w-[40%] h-[40%] bg-pink-50 rounded-full blur-[120px] opacity-40 pointer-events-none" />

      {/* --- ABOUT BLUESTONE (MD SECTION) --- */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Left: MD Image Stack */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 relative group"
            >
              {/* Decorative Back Layer */}
              <div className="absolute -top-6 -left-6 w-full h-full border-2 border-blue-100 rounded-[3rem] group-hover:-translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
              
              {/* Main Image Frame */}
              <motion.div 
                style={{ rotate: imageRotate }}
                className="relative z-20 rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border-[12px] border-white"
              >
                <img 
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000" 
                  alt="Bluestone Techpark Environment" 
                  className="w-full h-[450px] md:h-[550px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent" />
                
                {/* Overlay Text on Image */}
                <div className="absolute bottom-10 left-10 text-white">
                  <p className="text-xs font-bold tracking-[0.3em] uppercase opacity-80 mb-2">Established Excellence</p>
                  <h4 className="text-2xl font-black italic">EST. 2015</h4>
                </div>
              </motion.div>

              {/* MD Floating Card (Glassmorphism) */}
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="absolute -right-4 md:-right-12 top-1/4 z-30 bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white max-w-[200px] hidden md:block"
              >
                <div className="flex flex-col gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                    <Zap size={20} fill="white" />
                  </div>
                  <span className="font-black text-slate-900 text-sm leading-tight">Agile Training Methodology</span>
                  <div className="w-full h-1 bg-blue-100 rounded-full">
                    <div className="w-3/4 h-full bg-blue-600 rounded-full" />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Modern Description */}
            <div className="w-full lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px w-8 bg-blue-600" />
                  <span className="text-blue-600 font-bold text-xs uppercase tracking-[0.4em]">The Bluestone Identity</span>
                </div>

                <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.95] mb-8 tracking-tighter">
                  Where <span className="italic">Vision</span> <br/>
                  Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600 italic">Velocity</span>
                </h2>

                <div className="space-y-6">
                  <p className="text-slate-700 text-lg md:text-xl font-medium leading-relaxed">
                    Bluestone Techpark is a premier <span className="text-blue-600">Software Excellence Center</span> designed for the creators of tomorrow.
                  </p>
                  
                  <p className="text-slate-500 text-base leading-relaxed border-l-4 border-blue-50 pl-6">
                    We don't just teach code; we cultivate engineers. Our ecosystem is built on a hybrid model of <strong>intensive technical labs</strong> and <strong>global professional mentorship</strong>. Here, students don't sit in classrooms—they work in high-performance squads, tackling the same architectural challenges faced by Silicon Valley giants.
                  </p>
                </div>

                {/* Trust Matrix */}
                <div className="grid grid-cols-2 gap-6 mt-12 pt-8 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="text-blue-600 w-5 h-5" />
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-400">Global Network</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="text-blue-600 w-5 h-5" />
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-400">Global Placements</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 1. SHARED CINEMATIC BACKGROUND */}
      <motion.div style={{ y: y1 }} className="absolute top-20 left-[-10%] w-[50%] h-[30%] bg-blue-50 rounded-full blur-[120px] opacity-60 pointer-events-none" />
      <motion.div style={{ y: y2 }} className="absolute bottom-40 right-[-10%] w-[40%] h-[40%] bg-pink-50 rounded-full blur-[120px] opacity-40 pointer-events-none" />

      {/* --- ABOUT SECTION --- */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
             <div className="w-full lg:w-1/2 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                <Sparkles className="text-blue-600 w-4 h-4" />
                <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.3em]">Our Story</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-6">
                Redefining the <br/>
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600">Digital Standard</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Bluestone Techpark is more than a training center; it is a <strong>Software Excellence Hub</strong>. We bridge the gap between classroom theory and high-stakes industry reality.
              </p>
              <p className="text-slate-500 text-base leading-relaxed mb-8">
                By combining elite mentorship with a high-performance ecosystem, we empower the next generation of engineers to build products that move the world.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-100 shadow-sm">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold text-slate-700">Global Network</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-100 shadow-sm">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold text-slate-700">5k+ Alumni</span>
                </div>
              </div>
            </div>
            
            {/* Left: Image Imagery */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" 
                  alt="Tech Collaboration" 
                  className="w-full h-[350px] md:h-[450px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent" />
              </div>
              
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-6 -right-4 bg-white p-4 md:p-6 rounded-2xl shadow-xl border border-slate-100 hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-500 p-2 rounded-lg">
                    <ShieldCheck className="text-white w-5 h-5" />
                  </div>
                  <span className="font-black text-slate-800 text-xs uppercase">Industry Verified</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Content */}
           
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US SECTION --- */}
      <section className="py-16 md:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-16 md:mb-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <span className="bg-blue-600/5 text-blue-600 border border-blue-100 px-4 py-1.5 md:px-6 md:py-2 rounded-full font-bold tracking-[0.2em] uppercase text-[9px] md:text-[10px]">
                Why Choose Us
              </span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-7xl italic font-black text-slate-900 mt-6 md:mt-8 leading-[1.1] tracking-tight"
            >
              Your Path to <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600 italic">Global Success</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: benefit.delay }}
                className="group relative"
              >
                <div className="relative h-full overflow-hidden rounded-[2rem] md:rounded-[3rem] p-1 bg-gradient-to-br from-blue-400 to-indigo-500 shadow-lg hover:shadow-blue-200 transition-all duration-500">
                  <div className="relative z-10 p-8 md:p-12 h-full flex flex-col items-start bg-white/5 backdrop-blur-sm rounded-[1.9rem] md:rounded-[2.9rem]">
                    
                    <motion.div 
                      whileHover={{ rotate: -10, scale: 1.1 }}
                      className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white shadow-lg flex items-center justify-center mb-6 md:mb-10"
                    >
                      {benefit.icon}
                    </motion.div>

                    <h3 className="text-2xl md:text-3xl font-black text-white mb-4 md:mb-6 leading-tight">
                      {benefit.title}
                    </h3>

                    <p className="text-black/80 text-base md:text-lg leading-relaxed mb-8 md:mb-10 font-medium max-w-sm">
                      {benefit.description}
                    </p>

                    <motion.button 
                      onClick={() => navigate('/contact')}
                      whileHover={{ x: 5 }}
                      className="mt-auto flex items-center gap-2 text-white font-black text-[10px] md:text-xs uppercase tracking-widest border-b border-white/40 pb-1 hover:border-white transition-all"
                    >
                      Enrollment Guide <ArrowRight size={14} />
                    </motion.button>
                  </div>

                  <motion.span 
                    initial={{ x: 30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 0.1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="absolute -bottom-4 -right-2 md:bottom-[-5%] md:right-5 text-white font-black text-8xl md:text-[12rem] select-none pointer-events-none"
                  >
                    0{index + 1}
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};