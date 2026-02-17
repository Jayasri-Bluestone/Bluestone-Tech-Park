import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import * as LucideIcons from 'lucide-react';
import { Loader2 } from "lucide-react";




// Helper to assign grid sizes and icons based on index
const getLayoutProps = (i) => {
  const layouts = [
    { size: "col-span-2 row-span-2", icon: "🧠", x: -50, y: -50 },
    { size: "col-span-1 row-span-1", icon: "💰", x: 50, y: -20 },
    { size: "col-span-1 row-span-2", icon: "☁️", x: 100, y: 0 },
    { size: "col-span-1 row-span-1", icon: "🧬", x: -100, y: 50 },
    { size: "col-span-1 row-span-1", icon: "🚀", x: 0, y: 100 },
    { size: "col-span-1 row-span-1", icon: "🛡️", x: 50, y: 50 },
    { size: "col-span-2 row-span-1", icon: "🤖", x: -50, y: 100 },
  ];
  return layouts[i % layouts.length];
};

// Fallback titles since your DB shows NULL
const getFallbackTitle1 = (i) => 
  ["AI Research", "Fintech", "Cloud Hub", "BioTech", "Accelerator", "Cyber Unit", "Robotics"][i] || "Innovation Lab";

export const EcosystemGrid = () => {
  const [dbDivisions, setDbDivisions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEcosystem = async () => {
      try {
        // Fetching "campus ecosystem media" (encoded with %20)
        const response = await fetch("https://bluestoneinternationalpreschool.com/techpark_api/api/media/campus ecosystem");
        const data = await response.json();

        if (Array.isArray(data)) {
          const formatted = data.map((item, i) => {
            const layout = getLayoutProps(i);
            return {
              ...layout,
              title:getFallbackTitle1(i),
              img: item.image_url || item.image_data,
            };
          });
          setDbDivisions(formatted);
        }
      } catch (error) {
        console.error("Ecosystem fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEcosystem();
  }, []);

  if (loading) return <div className="py-20 text-center font-black uppercase italic">Loading Ecosystem...</div>;
  if (dbDivisions.length === 0) return null;

  return (
    <section className="py-20 bg-white overflow-hidden min-h-full flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        
        <div className="mb-24 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl font-black text-black uppercase italic tracking-tighter"
          >
            Campus <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600 underline decoration-blue-500 underline-offset-8">Ecosystem</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-3 gap-6 h-[750px]">
          {dbDivisions.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, x: item.x, y: item.y }}
              whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ 
                type: "spring", 
                stiffness: 80, 
                damping: 20, 
                delay: i * 0.08 
              }}
              whileHover={{ scale: 0.98, zIndex: 10 }}
              className={`${item.size} relative group cursor-pointer overflow-hidden rounded-[2.5rem] shadow-2xl`}
            >
              <motion.img 
                src={item.img}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:opacity-80 transition-all duration-700"
                whileHover={{ scale: 1.2 }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />

              <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                <motion.div 
                  initial={{ rotate: -10 }}
                  whileHover={{ rotate: 0, scale: 1.1 }}
                  className="bg-white/10 w-14 h-14 rounded-2xl flex items-center justify-center text-3xl backdrop-blur-xl border border-white/20 shadow-xl"
                >
                  {item.icon}
                </motion.div>
                
                <div>
                  <h3 className="text-white text-2xl font-black uppercase tracking-tighter group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <div className="w-0 group-hover:w-full h-[3px] bg-blue-500 mt-2 transition-all duration-500 shadow-[0_0_10px_#3b82f6]" />
                </div>
              </div>

              <div className="absolute -bottom-6 -right-2 text-[10rem] opacity-20 font-black text-white pointer-events-none group-hover:opacity-10 transition-opacity">
                {i + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
