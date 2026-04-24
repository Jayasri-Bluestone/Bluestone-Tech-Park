import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Quote, Loader2 } from "lucide-react";

const staticTestimonials = [
  {
    name: "Alex Johnson",
    role: "Full-Stack Developer @ Meta",
    content: "Bluestone Tech Park completely transformed my career. The intensive labs and real-world projects prepared me for the scale of Meta in a way no other program could.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    color: "from-blue-500/10 to-indigo-500/10",
    accent: "bg-blue-600",
    border: "border-blue-100",
  },
  {
    name: "Sarah Chen",
    role: "Software Engineer @ Google",
    content: "The mentorship here is world-class. Having direct access to industry veterans who have built global platforms is an invaluable experience for any aspiring engineer.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    color: "from-pink-500/10 to-rose-500/10",
    accent: "bg-pink-600",
    border: "border-pink-100",
  },
  {
    name: "Michael Rivera",
    role: "Backend Lead @ Stripe",
    content: "The focus on first principles and architectural thinking is what sets Bluestone apart. They don't just teach you how to code; they teach you how to build systems.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    color: "from-emerald-500/10 to-teal-500/10",
    accent: "bg-emerald-600",
    border: "border-emerald-100",
  },
];

export const SuccessStories = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = window.location.hostname === 'localhost' 
    ? "http://localhost:5003" 
    : "https://bluestoneinternationalpreschool.com/techpark_api";

  const fetchTestimonials = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/testimonials?limit=100`);
      const result = await res.json();
      const data = result.data || [];
      
      if (Array.isArray(data) && data.length > 0) {
        const formatted = data.map((item, i) => {
          // Cycle through colors for variety
          const themes = [
            { color: "from-blue-500/10 to-indigo-500/10", accent: "bg-blue-600", border: "border-blue-100" },
            { color: "from-pink-500/10 to-rose-500/10", accent: "bg-pink-600", border: "border-pink-100" },
            { color: "from-emerald-500/10 to-teal-500/10", accent: "bg-emerald-600", border: "border-emerald-100" },
          ];
          const theme = themes[i % themes.length];

          return {
            id: item.id,
            name: item.name,
            role: item.role,
            title: item.title,
            content: item.content,
            image: item.image_data,
            ...theme
          };
        });
        setTestimonials(formatted);
      } else {
        setTestimonials(staticTestimonials);
      }
    } catch (err) {
      console.error("Testimonials fetch error:", err);
      setTestimonials(staticTestimonials);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-blue-600 font-bold text-xs uppercase tracking-[0.3em] mb-4 block"
          >
            Success Stories
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter"
          >
            VOICES OF <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600">EXCELLENCE</span>
          </motion.h2>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
             <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
             <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Fetching Excellence...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id || i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="relative bg-white p-12 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-50 flex flex-col h-full group"
              >
                {/* Top Section: Dots and Quote */}
                <div className="flex justify-between items-start mb-10">
                  <div className="flex gap-1.5 pt-2">
                    {[...Array(5)].map((_, dot) => (
                      <div key={dot} className={`w-1.5 h-1.5 rounded-full ${t.accent}`} />
                    ))}
                  </div>
                  <div className={`${t.accent.replace('bg-', 'bg-')}/10 p-3 rounded-2xl`}>
                    <Quote size={32} className={`${t.accent.replace('bg-', 'text-')} opacity-30`} fill="currentColor" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow mb-12">
                  {t.title && (
                    <h3 className={`${t.accent.replace('bg-', 'text-')} font-black uppercase text-[10px] tracking-[0.2em] mb-3 italic`}>
                      {t.title}
                    </h3>
                  )}
                  <p className="text-slate-800 text-md font-bold leading-relaxed italic">
                    "{t.content}"
                  </p>
                </div>

                {/* Profile Section */}
                <div className="flex items-center gap-4 mt-auto">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border-2 border-white bg-slate-100">
                      <img 
                        src={t.image} 
                        alt={t.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    {/* Status Dot */}
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${t.accent} shadow-sm`} />
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <h4 className="font-black text-slate-900 text-base uppercase tracking-tight">
                      {t.name}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className={`w-4 h-[2px] ${t.accent} rounded-full`} />
                      <p className={`${t.accent.replace('bg-', 'text-')} font-bold text-[10px] uppercase tracking-widest`}>
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
