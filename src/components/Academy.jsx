"use client";

import React, { useEffect, useState, useMemo, memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import * as LucideIcons from 'lucide-react';
import { Loader2, ChevronRight } from "lucide-react";

// Memoized Icon Component
const DynamicIcon = memo(({ name, size = 24, className = "" }) => {
  const IconComponent = LucideIcons[name] || LucideIcons.Code;
  return <IconComponent size={size} className={className} />;
});

// Memoized Card - Optimized for hardware acceleration
const CourseCard = memo(({ course }) => {
  // Cycle through vibrant accent colors
  const accents = [
    { bg: "bg-blue-600", text: "text-blue-600", border: "border-blue-500/20", glow: "shadow-blue-500/20" },
    { bg: "bg-pink-600", text: "text-pink-600", border: "border-pink-500/20", glow: "shadow-pink-500/20" },
    { bg: "bg-emerald-600", text: "text-emerald-600", border: "border-emerald-500/20", glow: "shadow-emerald-500/20" },
  ];
  const accent = accents[course.id % accents.length] || accents[0];

  return (
    <div className="w-[300px] sm:w-[450px] md:w-[500px] flex-shrink-0 px-4 transform-gpu">
      <div className="group relative bg-white rounded-[3rem] p-10 h-[380px] flex flex-col justify-between shadow-xl shadow-slate-200/50 border border-slate-100 transition-all duration-500 hover:border-blue-200 hover:-translate-y-2 overflow-hidden">
        
        {/* Animated Background Glow */}
        <div className={`absolute top-0 right-0 w-64 h-64 ${accent.bg} opacity-5 rounded-full blur-[80px] -mr-32 -mt-32 group-hover:opacity-10 transition-opacity`} />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-8">
            <div className={`w-16 h-16 ${accent.bg}/10 rounded-2xl flex items-center justify-center ${accent.text} border ${accent.border} shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
              <DynamicIcon name={course.icon_name} className="w-8 h-8" />
            </div>
            
            <div className="flex gap-1.5 pt-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < 3 ? accent.bg : 'bg-slate-100'}`} />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className={`px-4 py-1 rounded-full ${accent.bg}/10 ${accent.text} text-[10px] font-black uppercase tracking-[0.2em] border ${accent.border}`}>
                {course.category || "Professional Track"}
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter leading-none mb-6">
              {course.title}
            </h3>
            <p className="text-slate-500 text-base line-clamp-3 font-medium leading-relaxed">
              {course.description}
            </p>
          </div>
        </div>

        <div className="relative z-10 pt-6">
          <Link to="/contact">
            <button className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-300 ${accent.bg} text-white hover:opacity-90 hover:gap-5 shadow-lg ${accent.glow}`}>
              Start Journey <ChevronRight size={18} />
            </button>
          </Link>
        </div>

        {/* Large Faded Background Icon */}
        <div className={`absolute -bottom-10 -right-10 ${accent.text} opacity-[0.03] pointer-events-none rotate-[-15deg] group-hover:rotate-0 transition-transform duration-700`}>
          <DynamicIcon name={course.icon_name} size={280} />
        </div>
      </div>
    </div>
  );
});

export const AcademySection = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch("https://bluestoneinternationalpreschool.com/techpark_api/api/courses?limit=100"); 
        const result = await res.json();
        setCourses(result.data || []);
      } catch (err) {
        console.error("Error fetching programs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  // Triple the list to ensure no "white space" on very wide monitors
  const infiniteCourses = useMemo(() => [...courses, ...courses, ...courses], [courses]);

  if (loading) return (
    <div className="h-96 flex items-center justify-center">
      <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  );

  return (
    <section className="py-20 bg-white overflow-hidden relative">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white z-10" />
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=60&w=1200" 
          alt=""
          className="w-full h-full object-cover opacity-10 grayscale" 
          loading="lazy"
        />
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <h2 className="text-5xl md:text-7xl italic font-black text-black tracking-tighter">
            OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600">PROGRAMS</span>
          </h2>
        </div>

        {/* CSS PERFORMANCE FIX: 
          We use a group and a CSS class to pause animation. 
          This is much smoother than using Framer's internal state.
        */}
        <div className="flex overflow-hidden group">
          <motion.div 
            className="flex will-change-transform group-hover:[animation-play-state:paused]"
            initial={{ x: 0 }}
            animate={{ x: "-33.33%" }}
            transition={{
              duration: 40,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop"
            }}
            style={{ 
              backfaceVisibility: "hidden",
              perspective: 1000 
            }}
          >
            {infiniteCourses.map((course, i) => (
              <CourseCard key={`${course.id}-${i}`} course={course} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
