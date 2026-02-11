import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  const { scrollY } = useScroll();

  /* Parallax layers */
  const y1 = useTransform(scrollY, [0, 600], [0, 140]);
  const y2 = useTransform(scrollY, [0, 600], [0, -100]);

  /* Mouse tilt */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [6, -6]), {
    stiffness: 80,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-6, 6]), {
    stiffness: 80,
    damping: 20,
  });

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    mouseX.set(e.clientX - innerWidth / 2);
    mouseY.set(e.clientY - innerHeight / 2);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-[#0B0F1A] overflow-hidden flex items-center"
    >
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.06]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#60A5FA" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Background blobs */}
      <motion.div
        style={{ y: y1 }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute -top-48 -left-48 w-[700px] h-[700px] bg-blue-600/25 rounded-full blur-[160px]"
      />

      <motion.div
        style={{ y: y2 }}
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-350px] right-[-250px] w-[800px] h-[800px] bg-cyan-500/20 rounded-full blur-[180px]"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-20 items-center">
        {/* Left */}
        <div>
          <span className="inline-block mb-6 px-4 py-2 text-sm font-semibold tracking-widest uppercase rounded-full bg-blue-500/10 text-blue-400">
            Next-Gen Tech Park
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-white">
            Build the
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Future of Technology
            </span>
          </h1>

          <p className="mt-6 text-lg text-slate-300 max-w-xl">
            Bluestone Tech Park empowers developers, startups, and enterprises
            with cutting-edge education, digital solutions, and innovation-driven
            ecosystems.
          </p>

          <div className="mt-10 flex flex-wrap gap-5">
            <Link
              to="/courses"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-cyan-500/40 transition-all"
            >
              Explore Courses
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white hover:bg-white/5 backdrop-blur transition-all"
            >
              View Services
            </Link>
          </div>
        </div>

        {/* Right visual */}
        <motion.div
          style={{ rotateX, rotateY }}
          className="relative perspective-[1200px]"
        >
          <div className="relative rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-8">
            <div className="space-y-6">
              <div className="h-4 w-32 rounded bg-blue-400/60" />
              <div className="h-4 w-full rounded bg-white/20" />
              <div className="h-4 w-5/6 rounded bg-white/20" />
              <div className="h-4 w-4/6 rounded bg-white/20" />
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4">
              <div className="h-20 rounded-xl bg-blue-500/20" />
              <div className="h-20 rounded-xl bg-cyan-500/20" />
              <div className="h-20 rounded-xl bg-indigo-500/20" />
            </div>
          </div>

          {/* Floating stats */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-8 -right-8 px-4 py-2 rounded-xl bg-white/10 backdrop-blur border border-white/15 text-white text-sm"
          >
            🚀 120+ Projects
          </motion.div>

          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -bottom-8 -left-8 px-4 py-2 rounded-xl bg-white/10 backdrop-blur border border-white/15 text-white text-sm"
          >
            ⚡ Industry Ready
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
