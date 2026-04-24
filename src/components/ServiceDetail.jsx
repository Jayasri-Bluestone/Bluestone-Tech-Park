import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Loader2, CheckCircle2, Zap, Shield, Target } from "lucide-react";
import * as LucideIcons from "lucide-react";
import SEO from "../common/SEO";

export const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch("https://bluestoneinternationalpreschool.com/techpark_api/api/services");
        const data = await res.json();
        const found = data.find(s => s.id.toString() === id);
        setService(found);
      } catch (err) {
        console.error("Error fetching service detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  const DynamicIcon = ({ name, className }) => {
    const IconComponent = LucideIcons[name] || LucideIcons.Globe;
    return <IconComponent className={className} />;
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  );

  if (!service) return (
    <div className="h-screen flex flex-col items-center justify-center bg-white p-6 text-center">
      <h2 className="text-4xl font-black text-slate-900 mb-4">Service Not Found</h2>
      <Link to="/services" className="text-blue-600 font-bold flex items-center gap-2">
        <ArrowLeft size={20} /> Back to Services
      </Link>
    </div>
  );

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <SEO 
        title={service.title}
        description={service.description}
        canonical={`/services/${id}`}
        ogImage={service.image_base64}
      />
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Link */}
        <Link to="/services" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-12 transition-colors group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
          BACK TO SERVICES
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Image/Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="absolute -top-6 -left-6 w-full h-full border-2 border-blue-100 rounded-[3rem]" />
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white aspect-[4/5] lg:aspect-square">
              <img 
                src={service.image_base64} 
                alt={service.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent" />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-blue-600 p-6 rounded-3xl shadow-xl text-white z-20">
              <DynamicIcon name={service.icon_name} className="w-8 h-8" />
            </div>
          </motion.div>

          {/* Right: Content */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="text-blue-600 font-bold text-xs uppercase tracking-[0.4em] mb-4 block">
                Technology Solutions
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-none tracking-tighter uppercase italic">
                {service.title}
              </h1>
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed mb-10">
                {service.description}
              </p>

              <div className="space-y-6 mb-12">
                {[
                  "Advanced Architectural Thinking",
                  "Industry-Standard Protocols",
                  "High-Performance Scalability",
                  "Global Enterprise Standards"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={14} className="text-blue-600" />
                    </div>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="px-10 py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-200 hover:bg-slate-900 transition-all text-center">
                  CONSULT NOW
                </Link>
                <div className="flex items-center gap-4 px-6 py-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Zap className="text-blue-600 w-5 h-5" />
                  </div>
                  <span className="text-slate-900 font-bold text-sm">Rapid Delivery</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Detailed Breakdown Section */}
        <div className="mt-32 pt-20 border-t border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100">
              <Target className="text-blue-600 w-10 h-10 mb-6" />
              <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase italic">Strategic Goal</h3>
              <p className="text-slate-500 leading-relaxed">
                We align every {service.title.toLowerCase()} project with your core business objectives to ensure maximum ROI and market impact.
              </p>
            </div>
            <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100">
              <Shield className="text-pink-600 w-10 h-10 mb-6" />
              <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase italic">Enterprise Security</h3>
              <p className="text-slate-500 leading-relaxed">
                Security is not an afterthought. Every line of code in our {service.title.toLowerCase()} service adheres to strict global security protocols.
              </p>
            </div>
            <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100">
              <LucideIcons.Cloud className="text-indigo-600 w-10 h-10 mb-6" />
              <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase italic">Cloud Ready</h3>
              <p className="text-slate-500 leading-relaxed">
                Built for the modern web. Our {service.title.toLowerCase()} solutions are designed for seamless cloud deployment and high-availability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
