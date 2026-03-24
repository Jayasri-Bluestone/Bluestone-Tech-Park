import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCw, ShieldCheck } from "lucide-react";

export const Captcha = ({ onCodeChange, className = "" }) => {
  const [code, setCode] = useState("");
  const [isRotating, setIsRotating] = useState(false);

  const generateCaptcha = useCallback(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }, []);

  const refreshCaptcha = () => {
    setIsRotating(true);
    const newCode = generateCaptcha();
    setCode(newCode);
    onCodeChange(newCode);
    setTimeout(() => setIsRotating(false), 500);
  };

  useEffect(() => {
    const initialCode = generateCaptcha();
    setCode(initialCode);
    onCodeChange(initialCode);
  }, [generateCaptcha, onCodeChange]);

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-3 shadow-inner">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600/20 p-2 rounded-lg">
            <ShieldCheck className="text-white w-5 h-5" />
          </div>
          <div className="flex gap-1 select-none">
            {code.split("").map((char, index) => (
              <motion.span
                key={`${char}-${index}`}
                initial={{ opacity: 0, y: 5, rotate: Math.random() * 20 - 10 }}
                animate={{ opacity: 1, y: 0, rotate: Math.random() * 20 - 10 }}
                transition={{ delay: index * 0.05 }}
                className="text-xl font-black text-white italic tracking-widest font-mono"
                style={{ 
                  textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
                  display: "inline-block"
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>

        <motion.button
          type="button"
          onClick={refreshCaptcha}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
          title="Refresh Captcha"
        >
          <motion.div
            animate={{ rotate: isRotating ? 360 : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <RotateCw size={18} />
          </motion.div>
        </motion.button>
      </div>
      <p className="text-[10px] text-blue-100 font-bold uppercase tracking-widest ml-1">
        Enter the characters shown above
      </p>
    </div>
  );
};
