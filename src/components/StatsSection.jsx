import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const Counter = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value);
      const totalMiliseconds = duration * 1000;
      const incrementTime = totalMiliseconds / end;

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
};

export const StatsSection = () => {
  const stats = [
    { label: "Successful Placements", value: "500", suffix: "+" },
    { label: "Enterprise Partners", value: "50", suffix: "+" },
    { label: "Expert Mentors", value: "25", suffix: "+" },
    { label: "Years of Excellence", value: "10", suffix: "" },
  ];

  return (
    <section className="py-20 bg-blue-600 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl md:text-7xl font-black mb-4 flex items-center justify-center italic">
                <Counter value={stat.value} />
                {stat.suffix}
              </div>
              <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] opacity-80">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
