import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react"; 
import { ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom"; // Added for routing

export const Services = () => {
  const [dbServices, setDbServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("http://localhost:5003/api/services");
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

  // Performance: Memoize sizing calculations so they don't recalculate on every frame
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
    <div className="h-96 flex items-center justify-center">
      <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  );

  if (dbServices.length === 0) return null;

  return (
    <section className="relative py-20 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-2 italic leading-tight uppercase">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-blue-500"> Services</span> 
          </h2>
        </motion.div>

        <div className="relative h-[450px] md:h-[550px] flex items-center justify-center">
          <div className="relative w-full h-full">
            <AnimatePresence mode="popLayout" initial={false}>
              {dbServices.map((service, index) => {
                const offset = index - active;
                
                // PERFORMANCE FIX 1: Don't render cards that are too far away
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
                    transition={{ 
                      type: "spring", 
                      stiffness: 150, // Snappier stiffness for mobile response
                      damping: 25, 
                      mass: 0.8 
                    }}
                    // PERFORMANCE FIX 2: Hardware acceleration classes
                    className={`absolute top-1/2 left-1/2 h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl cursor-pointer bg-slate-900 border-4 transform-gpu will-change-transform ${
                      offset === 0 ? 'border-blue-500/50' : 'border-transparent'
                    }`}
                    style={{
                      width: cardWidth,
                      zIndex: 10 - Math.abs(offset),
                    }}
                  >
                    {/* Background Image - Simplified opacity logic */}
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
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-blue-600 flex-shrink-0 flex items-center justify-center shadow-xl">
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
                          transition={{ duration: 0.2 }}
                        >
                          <p className="text-slate-300 text-sm md:text-base mb-8 max-w-md leading-relaxed line-clamp-2 md:line-clamp-3">
                            {service.description}
                          </p>
                          
                          {/* PERFORMANCE FIX 3: Link added to Contact route */}
                          <Link to="/contact">
                            <button className="group flex items-center gap-3 px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95">
                              Get Started
                              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
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

        {/* Pagination Dots */}
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
  );
};