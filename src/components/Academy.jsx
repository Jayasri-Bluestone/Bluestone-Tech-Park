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
const CourseCard = memo(({ course }) => (
  <div className="w-[300px] sm:w-[450px] md:w-[600px] flex-shrink-0 px-2 md:px-4 transform-gpu">
    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 h-[280px] md:h-[320px] flex flex-col justify-between shadow-2xl relative overflow-hidden">
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 md:gap-6 mb-4">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white shrink-0">
            <DynamicIcon name={course.icon_name} className="w-6 h-6 md:w-8 md:h-8" />
          </div>
          <div>
            <h3 className="text-xl md:text-3xl font-black text-white tracking-tight leading-tight">
              {course.title}
            </h3>
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-200">
              {course.category || "Pro Track"}
            </span>
          </div>
        </div>
        <p className="text-white/80 text-sm md:text-base line-clamp-2 max-w-sm font-medium">
          {course.description}
        </p>
      </div>

      <div className="relative z-10">
        <Link to="/contact">
          <button className="bg-white text-blue-700 px-6 py-3 rounded-xl font-black text-[10px] md:text-xs uppercase tracking-[0.2em] flex items-center gap-3 shadow-lg active:scale-95 transition-transform">
            Explore <ChevronRight size={16} />
          </button>
        </Link>
      </div>

      <div className="absolute -bottom-10 -right-10 text-white/10 pointer-events-none rotate-[-15deg]">
        <DynamicIcon name={course.icon_name} size={220} />
      </div>
    </div>
  </div>
));

export const AcademySection = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch("https://bluestoneinternationalpreschool.com/techpark_api/api/courses"); 
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