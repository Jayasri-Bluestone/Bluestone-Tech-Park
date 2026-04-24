import React from "react";
import { motion } from "framer-motion";
import { Search, PenTool, Code, Rocket } from "lucide-react";

// Import live assets
import IMG_8599 from "../assets/IMG_8599.jpg";
import IMG_8622 from "../assets/IMG_8622.jpg";
import vasa from "../assets/Vasa.png";
import IMG_8604 from "../assets/IMG_8604.jpg";

const steps = [
  {
    title: "Institutional Vision",
    desc: "As the dedicated technology vertical of Bluestone Group of Institutions, we translate institutional goals into powerful digital realities.",
    icon: <Search className="w-6 h-6" />,
    img: IMG_8599,
  },
  {
    title: "Product Incubation",
    desc: "We developed the complete digital ecosystem for Bluestone International Preschool, including a high-end parent portal and educational tools.",
    icon: <PenTool className="w-6 h-6" />,
    img: vasa,
  },
  {
    title: "Enterprise Engineering",
    desc: "From the main Group of Institutions website to complex student management apps, we build the backbone of modern education.",
    icon: <Code className="w-6 h-6" />,
    img: IMG_8604,
  },
  {
    title: "Velocity & Impact",
    desc: "We deploy global-standard tech solutions across the entire Bluestone ecosystem, ensuring excellence at every touchpoint.",
    icon: <Rocket className="w-6 h-6" />,
    img: IMG_8622,
  },
];

export const LearningJourney = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-blue-600 font-bold text-xs uppercase tracking-[0.3em] mb-4 block"
          >
            The Journey
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter"
          >
            FROM VISION TO <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600">VELOCITY</span>
          </motion.h2>
        </div>

        <div className="space-y-32">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 lg:gap-24`}
            >
              <div className="w-full lg:w-1/2">
                <div className="relative group">
                  <div className="absolute -top-6 -left-6 w-full h-full border-2 border-blue-100 rounded-[3rem] group-hover:-translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                  <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white aspect-[4/3]">
                    <img src={step.img} alt={step.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent" />
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-200">
                    {step.icon}
                  </div>
                  <span className="text-blue-600 font-black text-2xl italic opacity-20">0{i + 1}</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight uppercase italic">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-lg">
                  {step.desc}
                </p>
                <div className="mt-10 flex items-center gap-2">
                  <div className="h-px w-8 bg-blue-600" />
                  <span className="text-blue-600 font-bold text-xs uppercase tracking-widest">Excellence Guaranteed</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
