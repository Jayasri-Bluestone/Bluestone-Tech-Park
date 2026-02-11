import { motion, useScroll, useTransform } from "framer-motion";

const items = [
  { title: "Web Platforms", desc: "Scalable, secure, modern apps" },
  { title: "Mobile Apps", desc: "iOS & Android experiences" },
  { title: "AI Automation", desc: "Smart workflows & insights" },
  { title: "Cloud Systems", desc: "High availability infra" },
];

export const FloatingUseCases = () => {
  const { scrollY } = useScroll();

  return (
    <div className="relative w-full h-full">
      {items.map((item, i) => {
        const y = useTransform(scrollY, [0, 600], [0, -40 * (i + 1)]);
        const scale = 1 - i * 0.04;

        return (
          <motion.div
            key={i}
            style={{
              y,
              top: `${20 + i * 18}%`,
              right: i % 2 === 0 ? "0%" : "15%",
              scale,
            }}
            animate={{ y: [0, -18, 0] }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute"
          >
            <div className="w-64 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 p-5 shadow-2xl">
              <h4 className="text-white font-semibold mb-1">
                {item.title}
              </h4>
              <p className="text-sm text-slate-300">
                {item.desc}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
