import React, { useState } from "react";
import { motion } from "framer-motion";
import { Wifi, Coffee, Users, Monitor } from "lucide-react";

const features = [
  {
    title: "High-Speed Infrastructure",
    description: "Gigabit internet and state-of-the-art workstations.",
    icon: <Wifi className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?auto=format&fit=crop&w=1080&q=80"
  },
  {
    title: "Collaborative Spaces",
    description: "Open floor plans designed for teamwork and innovation.",
    icon: <Users className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1080&q=80"
  },
  {
    title: "Modern Labs",
    description: "Dedicated labs for IoT, VR/AR, and Robotics research.",
    icon: <Monitor className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1080&q=80"
  },
  {
    title: "Recreation Zones",
    description: "Relax and recharge with our cafeteria and gaming zones.",
    icon: <Coffee className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1578182429518-180b50a9ad7e?auto=format&fit=crop&w=1080&q=80"
  },
];

export const TechParkFeatures = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section className="py-24 bg-gradient-to-b from-blue-50 to-slate-50 relative overflow-hidden">
      {/* Decorative blobs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-30"
      />

      <motion.div
        animate={{ scale: [1, 1.1, 1], x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-0 right-0 w-64 h-64 bg-cyan-200 rounded-full blur-3xl opacity-30"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-4">
            Experience the <span className="text-blue-600">Bluestone Ecosystem</span>
          </h2>
          <p className="text-blue-700 text-lg max-w-2xl mx-auto">
            We provide more than just a workspace or a classroom. We offer a thriving ecosystem where technology meets creativity.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-stretch gap-12">
          {/* Left Features Grid */}
          <div className="lg:w-1/2 space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                onMouseEnter={() => setActiveFeature(index)}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-6 rounded-xl cursor-pointer transition-all duration-300 overflow-hidden group ${
                  activeFeature === index
                    ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-xl scale-105"
                    : "bg-white text-blue-950 shadow-md hover:shadow-lg"
                }`}
              >
                {/* Gradient overlay for active state */}
                {activeFeature === index && (
                  <motion.div
                    layoutId="active-gradient"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 -z-10"
                    transition={{ duration: 0.3 }}
                  />
                )}

                <div className="relative z-10 flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${
                    activeFeature === index
                      ? "bg-white/20"
                      : "bg-blue-100"
                  } flex-shrink-0 transition-all duration-300`}>
                    {activeFeature === index ? (
                      <span className="text-white">{feature.icon}</span>
                    ) : (
                      <span className="text-blue-600">{feature.icon}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">
                      {feature.title}
                    </h4>
                    <p className={`text-sm ${
                      activeFeature === index
                        ? "text-blue-50"
                        : "text-blue-600"
                    }`}>
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Hover glow effect */}
                <motion.div
                  className="absolute -inset-0.5 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-xl -z-20 blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                  animate={activeFeature === index ? { opacity: 0.8 } : { opacity: 0 }}
                />
              </motion.div>
            ))}
          </div>

          {/* Right Sticky Image */}
          <div className="lg:w-1/2 flex items-center sticky top-24">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl h-96 lg:h-full lg:min-h-96">
                <img
                  src={features[activeFeature].image}
                  alt={features[activeFeature].title}
                  className="w-full h-full object-cover"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-transparent to-transparent flex items-end p-8"
                >
                  <div className="text-white">
                    <p className="font-bold text-2xl">{features[activeFeature].title}</p>
                    <p className="text-blue-100">{features[activeFeature].description}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
