import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, Coffee, Users, Monitor } from "lucide-react";

const getIcon = (index) => {
  const icons = [
    <Wifi className="w-8 h-8" />,
    <Users className="w-8 h-8" />,
    <Monitor className="w-8 h-8" />,
    <Coffee className="w-8 h-8" />,
  ];
  return icons[index % icons.length];
};

export const TechParkFeatures = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [dbFeatures, setDbFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFeatures = async () => {
      try {
        // CHANGED: Fetching from the 'features' category specifically
        const response = await fetch("http://localhost:5003/api/media/features");
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map((item, index) => ({
            // If your DB title is NULL (as seen in your snippet), we provide fallbacks
            title: item.title || getDefaultTitle(index),
            description: item.description || getDefaultDesc(index),
            icon: getIcon(index),
            image: item.image_url || item.image_data 
          }));
          setDbFeatures(formatted);
        }
      } catch (error) {
        console.error("Error fetching features:", error);
      } finally {
        setLoading(false);
      }
    };
    getFeatures();
  }, []);

  // Fallback helpers since your DB shows NULL for titles
  const getDefaultTitle = (i) => ["High-Speed Infrastructure", "Collaborative Spaces", "Modern Labs", "Recreation Zones"][i] || "Innovation Hub";
  const getDefaultDesc = (i) => ["Gigabit internet and workstations.", "Built for teamwork.", "Research facilities.", "Relax and recharge."][i] || "State of the art facilities.";

  const handleHover = useCallback((index) => {
    setActiveFeature(index);
  }, []);

  if (loading) return <div className="py-24 text-center">Loading Ecosystem...</div>;
  if (dbFeatures.length === 0) return null; // Hide section if fetch fails

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <motion.div
        animate={{ x: [0, 15, 0], y: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none transform-gpu"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-7xl italic font-black text-slate-900 tracking-tighter mb-4">
            Experience the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600">Bluestone Ecosystem</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-20">
          <div className="lg:w-1/2 space-y-4">
            {dbFeatures.map((feature, index) => {
              const isActive = activeFeature === index;
              return (
                <motion.div
                  key={index}
                  onPointerEnter={() => handleHover(index)}
                  className={`relative p-6 rounded-2xl cursor-pointer transition-colors duration-300 transform-gpu ${
                    isActive ? "text-white" : "bg-white text-slate-600 shadow-sm"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="feature-bg"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl -z-10 shadow-lg shadow-blue-200"
                    />
                  )}

                  <div className="relative z-10 flex items-center space-x-6">
                    <div className={`p-4 rounded-xl ${isActive ? "bg-white/20" : "bg-blue-50 text-blue-600"}`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-xl">{feature.title}</h4>
                      <p className={`text-sm mt-1 ${isActive ? "opacity-90" : "opacity-60"}`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="lg:w-1/2 sticky top-24 h-[450px] w-full">
            <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl bg-slate-200 transform-gpu">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <img
                    src={dbFeatures[activeFeature].image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-10">
                    <div>
                      <h4 className="text-white text-3xl font-bold">{dbFeatures[activeFeature].title}</h4>
                      <p className="text-blue-200 mt-2">{dbFeatures[activeFeature].description}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};