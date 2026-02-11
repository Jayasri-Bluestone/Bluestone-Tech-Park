import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  BarChart,
  PenTool,
  ShieldCheck,
  Cloud,
  Cpu,
  Sparkles,
  ArrowRight,
  X,
} from "lucide-react";

const services = [
  {
    title: "Website Development",
    description:
      "Custom, responsive, high-performance websites using React & Next.js.",
    icon: <Globe className="w-8 h-8 text-white" />,
    image:
      "https://images.unsplash.com/photo-1607743386830-f198fbd7f9c4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Mobile App Development",
    description:
      "Native & cross-platform apps using Flutter & React Native.",
    icon: <Smartphone className="w-8 h-8 text-white" />,
    image:
      "https://images.unsplash.com/photo-1767449441925-737379bc2c4d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Digital Marketing",
    description:
      "SEO, paid ads, and analytics-driven growth strategies.",
    icon: <BarChart className="w-8 h-8 text-white" />,
    image:
      "https://images.unsplash.com/photo-1759215524649-78b47fc790e0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "UI / UX Design",
    description:
      "Modern, human-centered interfaces for premium brands.",
    icon: <PenTool className="w-8 h-8 text-white" />,
    image:
      "https://images.unsplash.com/photo-1569653402334-2e98fbaa80ee?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Cloud Solutions",
    description:
      "Cloud-native infrastructure on AWS, Azure & GCP with security and scalability.",
    icon: <Cloud className="w-8 h-8 text-white" />,
    image:
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "AI & Automation",
    description:
      "Intelligent automation, AI tools, and workflow optimization for modern businesses.",
    icon: <Sparkles className="w-8 h-8 text-white" />,
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Cyber Security",
    description:
      "Enterprise-grade security audits, penetration testing and compliance solutions.",
    icon: <ShieldCheck className="w-8 h-8 text-white" />,
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Custom Software",
    description:
      "Tailored enterprise software designed to scale with your organization.",
    icon: <Cpu className="w-8 h-8 text-white" />,
    image:
      "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=1600&q=80",
  },
];

export const Services = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="relative py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-block mb-4"
          >
            <span className="text-cyan-500 font-bold tracking-widest uppercase text-sm">
              ✨ Our Solutions
            </span>
          </motion.div>
          <h2 className="text-6xl md:text-7xl font-black text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Transforming Ideas
            <br />
            Into Reality
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl leading-relaxed">
            We deliver innovative digital solutions that drive growth, enhance user experiences, and set your brand apart in a competitive market. From cutting-edge web platforms to mobile applications, we turn your vision into powerful technology.
          </p>
        </motion.div>

        {/* Slider Container */}
        <div className="relative h-[480px] flex items-center justify-center">
          <div className="relative w-full h-full">
            {services.map((service, index) => {
              const offset = index - active;

              return (
                <motion.div
                  key={index}
                  onClick={() => setActive(index)}
                  animate={{
                    x: offset * 320,
                    scale: offset === 0 ? 1 : 0.85,
                    opacity: offset < -2 ? 0 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 25,
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[400px] rounded-3xl overflow-hidden shadow-2xl cursor-pointer bg-black"
                  style={{
                    zIndex: 10 - Math.abs(offset),
                  }}
                >
                  {/* Image with staggered animation */}
                  <motion.div
                    initial={{ scale: 1.2, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      ease: "easeOut",
                      delay: index * 0.15,
                    }}
                    className="absolute inset-0 overflow-hidden"
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center gap-4 mb-4"
                    >
                      <motion.div
                        className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.1 }}
                      >
                        {service.icon}
                      </motion.div>
                      <h3 className="text-3xl font-bold text-white">
                        {service.title}
                      </h3>
                    </motion.div>

                    {offset === 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <p className="text-gray-200 text-sm mb-5 max-w-sm leading-relaxed">
                          {service.description}
                        </p>

                        <motion.button
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          whileHover={{ x: 5 }}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                        >
                          Explore Service <ArrowRight size={18} />
                        </motion.button>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
            );
          })}
        </div>
        {/* Navigation Dots */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-3 mt-16"
        >
          {services.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setActive(index)}
              className={`rounded-full transition-all duration-300 ${
                index === active
                  ? "bg-blue-600 w-10 h-3"
                  : "bg-gray-300 w-3 h-3 hover:bg-gray-400"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
            />
          ))}
        </motion.div>
        </div>
      </div>
    </section>
  );
};
