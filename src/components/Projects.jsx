import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronRight, Monitor, Smartphone, Globe, Code, ArrowRight } from "lucide-react";

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const API_BASE = window.location.hostname === 'localhost' 
    ? "http://localhost:5003" 
    : "https://bluestoneinternationalpreschool.com/techpark_api";

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/projects?limit=100`); // Use high limit for public view
        const result = await res.json();
        setProjects(result.data || []);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter((p) => p.category === filter);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 font-black uppercase tracking-widest text-xs italic">Loading Portfolio...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-blue-600 font-bold text-xs uppercase tracking-[0.3em] mb-4 block"
          >
            Our Work
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter uppercase italic leading-none"
          >
            PROJECT <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600">ARCHIVE</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium"
          >
            Explore the digital ecosystem built by Bluestone Tech Park, from enterprise educational platforms to cutting-edge mobile solutions.
          </motion.p>
        </div>

        {/* --- FILTERS --- */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${
                filter === cat 
                  ? "bg-blue-600 text-white shadow-xl shadow-blue-200" 
                  : "bg-white text-slate-400 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* --- GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group relative bg-white rounded-[3rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-500"
              >
                {/* Image Container */}
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={project.image_data} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Category Tag */}
                  <div className="absolute top-6 left-6">
                    <div className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-white/50">
                      <p className="text-blue-600 font-black text-[10px] uppercase tracking-widest">{project.category}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-10 space-y-6">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter mb-4 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-4">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech_stack?.split(',').map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-50 text-slate-400 text-[9px] font-black uppercase rounded-lg border border-slate-100 group-hover:border-blue-100 group-hover:text-blue-500 transition-colors">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>

                  {/* Action */}
                  <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                    {project.live_link ? (
                      <>
                        <a 
                          href={project.live_link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest hover:gap-4 transition-all"
                        >
                          Visit Project <ExternalLink size={14} />
                        </a>
                        <a 
                          href={project.live_link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all cursor-pointer"
                        >
                          <ArrowRight size={18} />
                        </a>
                      </>
                    ) : (
                      <>
                        <span className="text-slate-300 font-black text-xs uppercase tracking-widest">Internal Project</span>
                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-slate-200 transition-all">
                          <ArrowRight size={18} />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-40 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Monitor size={32} className="text-slate-300" />
            </div>
            <p className="text-slate-400 font-black italic uppercase tracking-[0.3em] text-sm">
              No projects found in this category
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
