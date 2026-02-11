import React from "react";
import { motion } from "framer-motion";

const flakes = Array.from({ length: 40 });

export const Snowfall = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {flakes.map((_, i) => {
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 10 + 8;
        const delay = Math.random() * -20;
        const left = Math.random() * 100;

        return (
          <motion.span
            key={i}
            initial={{ y: -50, opacity: 0 }}
            animate={{
              y: "110vh",
              opacity: [0, 0.8, 0.8, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: `${left}%`,
              width: size,
              height: size,
            }}
            className="absolute top-0 rounded-full bg-white/70 blur-[0.5px]"
          />
        );
      })}
    </div>
  );
};
