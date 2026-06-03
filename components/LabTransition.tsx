"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";

export default function LabsTransition() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[999999] flex h-screen w-screen items-center justify-center bg-[#edf1f1]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-col items-center gap-9 text-black">
        <div className="relative h-48 w-36">
          <svg
            viewBox="0 0 160 210"
            className="absolute inset-0 h-full w-full"
            fill="none"
          >
            <defs>
              <clipPath id="flask-liquid-clip">
                <path d="M66 18H94V72L132 168C138 184 126 202 109 202H51C34 202 22 184 28 168L66 72V18Z" />
              </clipPath>
            </defs>

            <g clipPath="url(#flask-liquid-clip)">
              <motion.rect
                x="20"
                y="202"
                width="120"
                height="190"
                fill="rgba(0,0,0,0.72)"
                initial={{ y: 202 }}
                animate={{ y: 64 }}
                transition={{
                  duration: 2.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />

              <motion.path
                d="M20 80 C45 65, 62 95, 86 80 C108 66, 125 86, 140 74 V210 H20 Z"
                fill="rgba(0,0,0,0.18)"
                animate={{
                  x: [0, -10, 8, 0],
                  y: [0, 4, -3, 0],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </g>

            <path
              d="M66 18H94"
              stroke="rgba(0,0,0,0.72)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M66 18H94V72L132 168C138 184 126 202 109 202H51C34 202 22 184 28 168L66 72V18Z"
              stroke="rgba(0,0,0,0.72)"
              strokeWidth="4"
              strokeLinejoin="round"
            />

            <path
              d="M58 112H102"
              stroke="rgba(0,0,0,0.28)"
              strokeWidth="3"
              strokeLinecap="round"
            />

            <motion.circle
              cx="62"
              cy="150"
              r="4"
              fill="rgba(237,241,241,0.72)"
              animate={{ cy: [164, 132], opacity: [0, 1, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />

            <motion.circle
              cx="96"
              cy="158"
              r="3"
              fill="rgba(237,241,241,0.62)"
              animate={{ cy: [176, 138], opacity: [0, 1, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: 0.25 }}
            />
            
            <motion.circle
              cx="80"
              cy="174"
              r="2.5"
              fill="rgba(237,241,241,0.55)"
              animate={{ cy: [188, 150], opacity: [0, 1, 0] }}
              transition={{ duration: 1.7, repeat: Infinity, delay: 0.45 }}
            />
          </svg>
        </div>

        <div className="text-center">
          <motion.p
            className="text-sm uppercase tracking-[0.35em] text-black/50"
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.55, duration: 0.75 }}
          >
            Cooking in progress
          </motion.p>

          <motion.p
            className="mt-3 text-sm text-black/40"
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.9, duration: 0.75 }}
          >
            entering the lab
          </motion.p>
        </div>
      </div>
    </motion.div>,
    document.body
  );
}