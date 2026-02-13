"use client";
import React, { useEffect, useRef, useState } from "react";
import { ReactLenis } from "@studio-freight/react-lenis";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const CustomCursor = () => {
  const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <motion.div
      style={{ x: cursorX, y: cursorY }}
      className="fixed top-0 left-0 w-6 h-6 bg-cyan-400 rounded-full pointer-events-none z-[9999] mix-blend-difference -ml-3 -mt-3"
    />
  );
};