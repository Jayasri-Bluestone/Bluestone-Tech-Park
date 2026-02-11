import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Layout,
  Smartphone,
  MousePointer2,
  ChevronRight,
} from "lucide-react";

const courses = [
  {
    title: "Fullstack Development",
    category: "Development",
    description:
      "Master both frontend and backend technologies including React, Node.js, and databases.",
    icon: <Code />,
    color: "from-blue-500 to-blue-600",
    gradient: "from-blue-500/20 to-blue-600/20",
  },
  {
    title: "Front-end React JS",
    category: "Development",
    description:
      "Deep dive into modern React, Hooks, Redux, and building interactive UIs.",
    icon: <Layout />,
    color: "from-cyan-500 to-cyan-600",
    gradient: "from-cyan-500/20 to-cyan-600/20",
  },
  {
    title: "Flutter Mobile Dev",
    category: "Mobile",
    description:
      "Build beautiful native apps for iOS and Android with a single codebase using Flutter.",
    icon: <Smartphone />,
    color: "from-blue-600 to-blue-700",
    gradient: "from-blue-600/20 to-blue-700/20",
  },
  {
    title: "Digital Marketing",
    category: "Marketing",
    description:
      "Learn SEO, SEM, content strategy, and social media analytics to grow businesses.",
    icon: <MousePointer2 />,
    color: "from-sky-500 to-sky-600",
    gradient: "from-sky-500/20 to-sky-600/20",
  },
  {
    title: "No-Code: Framer",
    category: "No-Code",
    description:
      "Design and publish stunning websites without writing a single line of code.",
    icon: <Layout />,
    color: "from-blue-400 to-blue-500",
    gradient: "from-blue-400/20 to-blue-500/20",
  },
  {
    title: "No-Code: Bubble",
    category: "No-Code",
    description:
      "Build fully functional web applications visually with powerful logic workflows.",
    icon: <MousePointer2 />,
    color: "from-cyan-600 to-cyan-700",
    gradient: "from-cyan-600/20 to-cyan-700/20",
  },
  {
    title: "WordPress Mastery",
    category: "CMS",
    description:
      "Create professional websites and e-commerce stores using the world's most popular CMS.",
    icon: <Layout />,
    color: "from-blue-700 to-blue-800",
    gradient: "from-blue-700/20 to-blue-800/20",
  },
];

const categories = ["All", "Development", "Mobile", "Marketing", "No-Code", "CMS"];

export const Courses = () => {
  const [activeCategory, setActiveCategory] = React.useState("All");
  const [selectedCourse, setSelectedCourse] = React.useState(null);

  const filteredCourses = activeCategory === "All" 
    ? courses 
    : courses.filter(c => c.category === activeCategory);

  return (
    <section className="py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-blue-950 text-white overflow-hidden relative">
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-40 right-40 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black mb-6"
          >
            Master{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-blue-400">
              Premium Skills
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }} 
            className="text-blue-100 max-w-2xl mx-auto text-lg"
          >
            Industry-aligned programs designed to transform your career and unlock endless opportunities.
          </motion.p>
        </div>

        {/* Category Filter - Innovative Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-20"
        >
          {categories.map((cat, idx) => (
            <motion.button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-6 py-2 rounded-full font-semibold text-sm transition-all overflow-hidden group ${
                activeCategory === cat
                  ? "text-white"
                  : "text-cyan-300 hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 -z-10 rounded-full"
                  transition={{ type: "spring", bounce: 0.2 }}
                />
              )}
              <span className="relative">{cat}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Innovative Course Layout - Staggered Showcase */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, x: -100, y: 50 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: 100, y: 50 }}
                transition={{ 
                  delay: index * 0.15,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }}
                onMouseEnter={() => setSelectedCourse(course.title)}
                onMouseLeave={() => setSelectedCourse(null)}
                className="group relative"
              >
                {/* Staggered Background Effect */}
                {index % 2 === 0 ? (
                  <div className="flex gap-6 items-stretch">
                    {/* Content on left, Image placeholder on right */}
                    <motion.div
                      className="flex-1 relative overflow-hidden rounded-2xl bg-white border border-gray-200 hover:border-cyan-400 shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ borderColor: "rgba(34, 211, 238, 1)" }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.15 + 0.2, duration: 0.5 }}
                    >
                      <div className="relative p-8 h-full flex flex-col justify-between min-h-[260px]">
                        <div>
                          <motion.span
                            className="inline-block px-3 py-1 text-xs font-bold text-cyan-600 bg-cyan-50 rounded-full mb-4 border border-cyan-200"
                            whileHover={{ scale: 1.1 }}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15 + 0.3 }}
                          >
                            {course.category}
                          </motion.span>

                          <motion.div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-r ${course.color} flex items-center justify-center mb-5 text-white shadow-lg`}
                            whileHover={{ rotate: 360, scale: 1.1 }}
                           // transition={{ duration: 0.6 }}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.15 + 0.35, duration: 0.5 }}
                          >
                            {React.cloneElement(course.icon, { className: "w-6 h-6" })}
                          </motion.div>

                          <motion.h3 
                            className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-cyan-600 transition-colors"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15 + 0.25 }}
                          >
                            {course.title}
                          </motion.h3>

                          <motion.p 
                            className="text-gray-600 text-sm leading-relaxed mb-6"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15 + 0.3 }}
                          >
                            {course.description}
                          </motion.p>
                        </div>

                        <motion.button
                          whileHover={{ x: 4 }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.15 + 0.4 }}
                          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all w-fit"
                        >
                          Explore <ChevronRight size={18} />
                        </motion.button>
                      </div>
                    </motion.div>

                    {/* Visual accent on right */}
                    <motion.div
                      className={`hidden md:flex w-48 rounded-2xl bg-gradient-to-br ${course.gradient} border border-cyan-500/20 items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300`}
                     // animate={{ y: [0, 10, 0] }}
                     // transition={{ duration: 3, repeat: Infinity }}
                      initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      transition={{ delay: index * 0.15 + 0.3, duration: 0.6 }}
                    >
                      <div className="relative z-10 text-center">
                        <motion.div 
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${course.color} flex items-center justify-center mx-auto mb-3 text-white shadow-xl`}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.15 + 0.4 }}
                        >
                          {React.cloneElement(course.icon, { className: "w-8 h-8" })}
                        </motion.div>
                        <motion.p 
                          className="text-xs font-bold text-cyan-300"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.15 + 0.45 }}
                        >
                          Ready to learn?
                        </motion.p>
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  /* Reverse layout for alternating courses */
                  <div className="flex gap-6 items-stretch flex-row-reverse">
                    <motion.div
                      className="flex-1 relative overflow-hidden rounded-2xl bg-white border border-gray-200 hover:border-cyan-400 shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ borderColor: "rgba(34, 211, 238, 1)" }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.15 + 0.2, duration: 0.5 }}
                    >
                      <div className="relative p-8 h-full flex flex-col justify-between min-h-[260px]">
                        <div>
                          <motion.span
                            className="inline-block px-3 py-1 text-xs font-bold text-cyan-600 bg-cyan-50 rounded-full mb-4 border border-cyan-200"
                            whileHover={{ scale: 1.1 }}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15 + 0.3 }}
                          >
                            {course.category}
                          </motion.span>

                          <motion.div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-r ${course.color} flex items-center justify-center mb-5 text-white shadow-lg`}
                            whileHover={{ rotate: 360, scale: 1.1 }}
                           // transition={{ duration: 0.6 }}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.15 + 0.35, duration: 0.5 }}
                          >
                            {React.cloneElement(course.icon, { className: "w-6 h-6" })}
                          </motion.div>

                          <motion.h3 
                            className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-cyan-600 transition-colors"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15 + 0.25 }}
                          >
                            {course.title}
                          </motion.h3>

                          <motion.p 
                            className="text-gray-600 text-sm leading-relaxed mb-6"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15 + 0.3 }}
                          >
                            {course.description}
                          </motion.p>
                        </div>

                        <motion.button
                          whileHover={{ x: 4 }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.15 + 0.4 }}
                          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all w-fit"
                        >
                          Explore <ChevronRight size={18} />
                        </motion.button>
                      </div>
                    </motion.div>

                    <motion.div
                      className={`hidden md:flex w-48 rounded-2xl bg-gradient-to-br ${course.gradient} border border-cyan-500/20 items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300`}
                     // animate={{ y: [0, 10, 0] }}
                      //transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                      initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      transition={{ delay: index * 0.15 + 0.3, duration: 0.6 }}
                    >
                      <div className="relative z-10 text-center">
                        <motion.div 
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${course.color} flex items-center justify-center mx-auto mb-3 text-white shadow-xl`}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.15 + 0.4 }}
                        >
                          {React.cloneElement(course.icon, { className: "w-8 h-8" })}
                        </motion.div>
                        <motion.p 
                          className="text-xs font-bold text-cyan-300"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.15 + 0.45 }}
                        >
                          Ready to learn?
                        </motion.p>
                      </div>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
