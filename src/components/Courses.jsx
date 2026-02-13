import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from 'lucide-react'; // Import all icons for dynamic lookup
import { ChevronRight, Loader2 } from "lucide-react";

// The categories remain static for the filter buttons
const categories = ["All", "Development", "Mobile", "Marketing", "No-Code"];

export const Courses = () => {
  const [dbCourses, setDbCourses] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // 1. Fetch data from backend
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

  // 2. Helper for dynamic icons
  const DynamicIcon = ({ name, ...props }) => {
    const IconComponent = LucideIcons[name] || LucideIcons.Code;
    return <IconComponent {...props} />;
  };

  // 3. Filter logic based on the fetched data
  const filteredCourses = activeCategory === "All" 
    ? dbCourses 
    : dbCourses.filter(c => c.category === activeCategory);

  if (loading) return (
    <div className="h-96 flex items-center justify-center bg-white">
      <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  );

  return (
    <section className="py-32 bg-[#fdfdfd] text-slate-900 overflow-hidden relative">
      
      {/* Subtle Background Accents */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-50 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl italic font-black mb-6 tracking-tight"
          >
            Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600 italic">Premium Skills</span>
          </motion.h2>

          <motion.p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Industry-aligned programs designed to transform your career and unlock endless opportunities.
          </motion.p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-20">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-8 py-3 rounded-full font-bold text-sm transition-all ${
                activeCategory === cat ? "text-white" : "text-slate-500 hover:text-blue-600 bg-slate-100"
              }`}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeCat"
                  className="absolute inset-0 bg-blue-600 rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {cat}
            </button>
          ))}
        </div>

        {/* Courses List */}
        <div className="grid grid-cols-1 gap-8">
          <AnimatePresence mode="wait">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id || index} // Use course.id from database
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative"
              >
                <div className={`relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-500 p-1 shadow-2xl shadow-blue-200/50 hover:shadow-blue-400/40 transition-all duration-500`}>
                  
                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-12 gap-8 bg-[#fdfdfd]/10 backdrop-blur-sm rounded-[2.4rem]">
                    
                    {/* Left: Icon & Title */}
                    <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left flex-1">
                      <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner">
                        {/* Dynamic Icon replacement */}
                        <DynamicIcon name={course.icon_name} size={36} strokeWidth={2.5} />
                      </div>
                      
                      <div>
                        <span className="text-pink-500 font-bold uppercase text-[10px] tracking-[0.2em]">
                          {course.category}
                        </span>
                        <h3 className="text-3xl md:text-4xl font-black text-white mt-1 mb-3 leading-tight">
                          {course.title}
                        </h3>
                        <p className="text-black/80 max-w-xl font-medium leading-relaxed">
                          {course.description}
                        </p>
                      </div>
                    </div>

                    {/* Right: Action Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-10 py-5 bg-white text-blue-600 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl flex items-center gap-3 hover:bg-blue-50 transition-colors shrink-0"
                    >
                      Explore Course <ChevronRight size={20} />
                    </motion.button>
                  </div>

                  {/* Aesthetic Detail: Background Icon */}
                  <div className="absolute right-[-20px] top-[-20px] opacity-10 text-white pointer-events-none rotate-12">
                    <DynamicIcon name={course.icon_name} size={280} />
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