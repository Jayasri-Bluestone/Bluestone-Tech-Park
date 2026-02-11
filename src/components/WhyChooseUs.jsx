import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  TrendingUp,
  Users,
  Award,
  Briefcase,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const benefits = [
  {
    title: "Expert Mentorship",
    description:
      "Learn directly from industry veterans with years of experience in top tech companies. Our mentors provide personalized guidance to help you master complex concepts.",
    icon: <Users className="w-6 h-6 text-white" />,
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    title: "Live Projects",
    description:
      "Work on real-world projects that simulate the actual work environment. Build a robust portfolio that showcases your practical skills to potential employers.",
    icon: <Briefcase className="w-6 h-6 text-white" />,
    gradient: "from-blue-600 to-blue-400",
  },
  {
    title: "Career Support",
    description:
      "Get dedicated placement assistance, resume reviews, and mock interviews. We connect you with our network of hiring partners to kickstart your career.",
    icon: <TrendingUp className="w-6 h-6 text-white" />,
    gradient: "from-cyan-500 to-blue-400",
  },
  {
    title: "Global Certification",
    description:
      "Earn industry-recognized certificates upon course completion. Validate your skills and gain a competitive edge in the job market.",
    icon: <Award className="w-6 h-6 text-white" />,
    gradient: "from-sky-600 to-blue-500",
  },
];

export const WhyChooseUs = () => {
  const stackRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ["start center", "end center"] });

  return (
    <section className="py-32 bg-gradient-to-b from-slate-900 via-blue-900 to-blue-950 relative overflow-hidden" ref={stackRef}>
      {/* Animated Background Lines */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="cyan" stopOpacity="0.1" />
              <stop offset="100%" stopColor="blue" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <line x1="0" y1="0" x2="100%" y2="100%" stroke="url(#lineGrad)" strokeWidth="2" />
          <line x1="100%" y1="0" x2="0" y2="100%" stroke="url(#lineGrad)" strokeWidth="2" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-cyan-400 font-bold tracking-[2px] uppercase text-sm">✨ Why Choose Us ✨</motion.span>

          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-5xl md:text-6xl font-black text-white mt-6 mb-6 leading-tight">
            Your Path to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-blue-400">Success</span>
          </motion.h2>

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-blue-100 max-w-2xl mx-auto text-lg mt-6">
            We combine world-class education with real-world experience to launch your tech career.
          </motion.p>
        </div>

        {/* Timeline/Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500 to-transparent"></div>

          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`group relative pt-8 ${index % 2 === 0 ? "lg:pr-12" : "lg:pl-12 lg:col-start-2"}`}
            >
              {/* Number Indicator */}
              <div className="absolute -top-4 left-0 w-8 h-8 lg:left-1/2 lg:-translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center font-bold text-white text-sm shadow-lg shadow-cyan-500/50">
                {index + 1}
              </div>

              {/* Card */}
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-2xl border border-cyan-500/30 rounded-2xl p-8 hover:border-cyan-400/80 transition-all duration-300 group">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-cyan-500/40`}>
                  {benefit.icon}
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">{benefit.title}</h3>

                <p className="text-blue-100 leading-relaxed mb-6">{benefit.description}</p>

                <motion.div className="inline-flex items-center text-sm font-semibold text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" whileHover={{ x: 5 }}>
                  Learn more <ArrowRight className="ml-2" size={16} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
