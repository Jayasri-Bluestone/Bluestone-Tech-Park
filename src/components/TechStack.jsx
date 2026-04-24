import React from "react";
import { motion } from "framer-motion";

const technologies = [
  { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB", category: "Frontend" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933", category: "Backend" },
  { name: "Php", icon: "https://cdn.simpleicons.org/php/3776AB", category: "Data Science" },
  { name: "UI/UX", icon: "https://cdn.simpleicons.org/Figma/1FA66", category: "Language" },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/000000", category: "Framework" },
  { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4169E1", category: "Database" },
    { name: "Framer", icon: "https://cdn.simpleicons.org/framer/c10f37", category: "NOCODE" },
      { name: "Flutter", icon: "https://cdn.simpleicons.org/flutter/12D18E", category: "Mobile app" },
];

export const TechStack = () => {
  return (
    <section className="py-20 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-blue-600 font-bold text-xs uppercase tracking-[0.3em] mb-4 block"
          >
            Our Ecosystem
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter"
          >
            MASTER THE <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600">MODERN STACK</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10, scale: 1.05 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center justify-center text-center group cursor-default"
            >
              <div className="w-16 h-16 mb-6 group-hover:rotate-12 transition-transform duration-500">
                <img src={tech.icon} alt={tech.name} className="w-full h-full object-contain group-hover:grayscale-0 transition-all" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">{tech.name}</h3>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{tech.category}</span>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 p-10 rounded-[3rem] bg-slate-900 text-white text-center"
        >
          <p className="text-xl md:text-2xl font-medium leading-relaxed max-w-3xl mx-auto">
            "At Bluestone Tech Park, we focus on the <span className="text-blue-400 font-bold">First Principles</span> of engineering. Whether it's high-concurrency backend systems or pixel-perfect frontends, we prepare you for the technologies of tomorrow, today."
          </p>
        </motion.div>
      </div>
    </section>
  );
};
