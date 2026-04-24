import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const features = [
  {
    title: "Innovation & Engineering Labs",
    description: "Our labs foster a culture of technical excellence and creative problem-solving. We focus on building robust, scalable solutions and mastering the modern engineering practices used by world-class technology companies.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
  },
  {
    title: "Global Mentorship Network",
    description: "Connect with veterans from companies like Google, Meta, and Netflix. Our mentorship program provides direct access to industry leaders who provide code reviews, architecture critiques, and career guidance that you won't find in any textbook.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000",
  },
  {
    title: "Enterprise Ecosystem",
    description: "Bluestone Tech Park is embedded within a global network of enterprise partners. We bridge the gap between education and employment by integrating real enterprise challenges into our curriculum, ensuring our graduates are Day-1 ready for the world's most demanding tech roles.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000",
  },
];

const FeatureBlock = ({ feature, index, setActiveCard }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-50% 0px -50% 0px",
    once: false
  });

  useEffect(() => {
    if (isInView) {
      setActiveCard(index);
    }
  }, [isInView, index, setActiveCard]);

  return (
    <div ref={ref} className="h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl bg-white/80 backdrop-blur-2xl p-8 md:p-16 rounded-[4rem] border border-blue-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] text-center"
      >
        <span className="text-blue-600 font-bold text-xs md:text-sm uppercase tracking-[0.5em] mb-6 block">
          PHASE 0{index + 1} — THE ECOSYSTEM
        </span>
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight tracking-tighter uppercase italic">
          {feature.title}
        </h2>
        <p className="text-slate-600 text-lg md:text-2xl leading-relaxed max-w-2xl mx-auto font-medium">
          {feature.description}
        </p>
        <div className="mt-12 h-1.5 w-24 bg-gradient-to-r from-blue-600 to-pink-600 mx-auto rounded-full" />
      </motion.div>
    </div>
  );
};

export const StickyScroll = () => {
  const [activeCard, setActiveCard] = useState(0);
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { margin: "0px 0px 0px 0px" });

  return (
    <section ref={sectionRef} className="relative w-full bg-slate-50">
      {/* 1. Bright Background Layer */}
      <div className={`fixed inset-0 w-full h-full pointer-events-none transition-opacity duration-700 ${isSectionInView ? 'opacity-100' : 'opacity-0'}`} style={{ zIndex: 0 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCard}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <img 
              src={features[activeCard].image} 
              alt="" 
              className="w-full h-full object-cover"
            />
            {/* Bright, high-end overlays */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white/20 to-white opacity-90" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 2. Scrolling Content Layer */}
      <div className="relative z-10">
        {features.map((feature, index) => (
          <FeatureBlock 
            key={index} 
            feature={feature} 
            index={index} 
            setActiveCard={setActiveCard} 
          />
        ))}
      </div>
    </section>
  );
};
