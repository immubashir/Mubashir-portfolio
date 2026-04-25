"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type HeroLoaderProps = {
  onComplete: () => void;
};

type Phase =
  | "counting"
  | "plus"
  | "expanding"
  | "revealing"
  | "done";

const HeroLoader = ({ onComplete }: HeroLoaderProps) => {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("counting");
  const completedRef = useRef(false);

  useEffect(() => {
    let frameId: number;
    let startTime: number | null = null;

    const duration = 1300;

    const animateCount = (time: number) => {
      if (startTime === null) startTime = time;

      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * 100);

      setCount(value);

      if (progress < 1) {
        frameId = requestAnimationFrame(animateCount);
      } else {
        setCount(100);

        setTimeout(() => {
          setPhase("plus");
        }, 80);

        setTimeout(() => {
          setPhase("expanding");
        }, 900);

        setTimeout(() => {
          setPhase("revealing");
        }, 1250);

        setTimeout(() => {
          setPhase("done");
          if (!completedRef.current) {
            completedRef.current = true;
            onComplete();
          }
        }, 2200);
      }
    };

    frameId = requestAnimationFrame(animateCount);

    return () => cancelAnimationFrame(frameId);
  }, [onComplete]);

  if (phase === "done") return null;

  const showCounter = phase === "counting";
  const showPlus = phase === "plus";

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-transparent"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="relative flex items-center justify-center overflow-hidden border border-black/20 bg-white/10 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
        initial={{ width: 52, height: 52, borderRadius: 10 }}
        animate={
          phase === "expanding" || phase === "revealing"
            ? { width: 620, height: 260, borderRadius: 28 }
            : { width: 52, height: 52, borderRadius: 10 }
        }
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <AnimatePresence mode="wait">
          {showCounter && (
            <motion.span
              key="count"
              className="absolute text-[16px] font-medium text-black/80"
              initial={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{
                opacity: 0,
                scale: 0.8,
                transition: { duration: 0.14 },
              }}
            >
              {count}
            </motion.span>
          )}

          {showPlus && (
            <motion.span
              key="plus"
              className="absolute text-[18px] font-medium text-black/80"
              initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0.8, 1, 1, 0.72],
                rotate: [0, 0, 360, 360],
              }}
              transition={{
                duration: 0.8,
                times: [0, 0.12, 0.78, 1],
                ease: "easeInOut",
              }}
            >
              +
            </motion.span>
          )}
        </AnimatePresence>

        <motion.div
          className="flex h-full w-full items-center justify-between px-8 md:px-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === "revealing" ? 1 : 0 }}
          transition={{ duration: 0.18 }}
        >
          <motion.div
            className="max-w-[300px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: phase === "revealing" ? 1 : 0,
              y: phase === "revealing" ? 0 : 20,
            }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.05,
            }}
          >
            <p className="mb-2 text-sm text-black/55">Heyyyy!</p>
            <h1 className="text-4xl font-semibold leading-tight text-black md:text-5xl">
              I’m Mubashir
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-black/55 md:text-base">
              Creating unique digital experiences that are sharp, intuitive, and
              built with purpose.
            </p>
          </motion.div>

          <motion.div
            className="h-28 w-28 rounded-2xl bg-neutral-300 md:h-36 md:w-36"
            initial={{ opacity: 0, scale: 0.8, x: 14 }}
            animate={{
              opacity: phase === "revealing" ? 1 : 0,
              scale: phase === "revealing" ? 1 : 0.8,
              x: phase === "revealing" ? 0 : 14,
            }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.16,
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HeroLoader;