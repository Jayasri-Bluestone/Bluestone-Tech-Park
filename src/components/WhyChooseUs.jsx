import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TrendingUp, Users, Award, Briefcase, ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';

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
    title: "Global Certification",
    description: "Earn industry-recognized certificates upon completion to gain a competitive edge.",
    icon: <Award className="w-6 h-6 text-blue-600" />,
    delay: 0.4
  },
];

export const WhyChooseUs = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section 
      ref={containerRef}
      className="py-16 md:py-32 bg-[#fdfdfd] relative overflow-x-hidden"
    >
      {/* 1. CINEMATIC BACKGROUND ELEMENTS - Adjusted for Mobile */}
      <motion.div style={{ y: y1 }} className="absolute top-10 left-[-20%] md:left-[-10%] w-[60%] md:w-[40%] h-[40%] bg-blue-50 rounded-full blur-[80px] md:blur-[120px] opacity-60 pointer-events-none" />
      <motion.div style={{ y: y2 }} className="absolute bottom-10 right-[-20%] md:right-[-10%] w-[50%] md:w-[30%] h-[50%] bg-cyan-50 rounded-full blur-[80px] md:blur-[100px] opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
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

        {/* 2. STAGGERED GRID CARDS */}
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
              {/* The Card */}
              <div className="relative h-full overflow-hidden rounded-[2rem] md:rounded-[3rem] p-1 bg-gradient-to-br from-blue-400 to-indigo-500 shadow-lg hover:shadow-blue-200 transition-all duration-500">
                
                <div className="relative z-10 p-8 md:p-12 h-full flex flex-col items-start bg-white/5 backdrop-blur-sm rounded-[1.9rem] md:rounded-[2.9rem]">
                  
                  {/* Floating Icon */}
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

                {/* Big Background Number Reveal - Scaled down for mobile */}
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
  );
};