import React, { useState, useEffect, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react"; 
import { ChevronRight, Loader2, Code, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom"; 

// Move static data outside to prevent re-declaration
const categories = ["All", "Development", "Mobile", "Marketing", "No-Code"];

// PERFORMANCE FIX 1: Memoize the Icon lookup so it doesn't recalculate on every hover/animation frame
const DynamicIcon = memo(({ name, size, strokeWidth }) => {
  const IconComponent = LucideIcons[name] || Code;
  return <IconComponent size={size} strokeWidth={strokeWidth} />;
});

export const Courses = () => {
  const [dbCourses, setDbCourses] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:5003/api/courses");
        const data = await res.json();
        setDbCourses(data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // PERFORMANCE FIX 2: Use useMemo for filtering to prevent logic execution on every re-render
  const filteredCourses = useMemo(() => {
    return activeCategory === "All" 
      ? dbCourses 
      : dbCourses.filter(c => c.category === activeCategory);
  }, [activeCategory, dbCourses]);

  if (loading) return (
    <div className="h-96 flex items-center justify-center bg-white">
      <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  );

  return (
    <section className="py-20 md:py-32 bg-[#fdfdfd] text-slate-900 overflow-hidden relative">
      {/* Background Accents: Simplified for performance */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-100 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-100 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl italic font-black mb-6 tracking-tight"
          >
            Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600 italic">Premium Skills</span>
          </motion.h2>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-6 py-2 rounded-full font-bold text-xs md:text-sm transition-all ${
                activeCategory === cat ? "text-white" : "text-slate-500 bg-slate-100"
              }`}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeCat"
                  className="absolute inset-0 bg-blue-600 rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
                />
              )}
              {cat}
            </button>
          ))}
        </div>

        {/* Courses List */}
        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id || index}
                layout // PERFORMANCE FIX 3: Enable layout transitions for smoother sorting
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                // PERFORMANCE FIX 4: Use transform-gpu to offload to graphics card
                className="group relative transform-gpu"
              >
                <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-500 p-[2px] shadow-xl hover:shadow-blue-200/50 transition-all">
                  
                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-6 md:p-10 gap-6 bg-white rounded-[1.9rem]">
                    
                    <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left flex-1">
                      <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shrink-0">
                        <DynamicIcon name={course.icon_name} size={32} strokeWidth={2} />
                      </div>
                      
                      <div>
                        <span className="text-pink-500 font-black uppercase text-[9px] tracking-widest">
                          {course.category}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 mt-1 mb-2 leading-tight">
                          {course.title}
                        </h3>
                        <p className="text-slate-500 max-w-xl text-sm md:text-base leading-relaxed line-clamp-2">
                          {course.description}
                        </p>
                      </div>
                    </div>

                    <Link to="/contact">
                            <button className="group flex items-center gap-3 px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95">
                              Get Started
                              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                          </Link>
                  </div>

                  {/* Aesthetic Background Icon: PERFORMANCE FIX 5: Simplified size/opacity */}
                  <div className="absolute right-[-10px] top-[-10px] opacity-[0.03] text-slate-900 pointer-events-none rotate-12">
                    <DynamicIcon name={course.icon_name} size={180} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};