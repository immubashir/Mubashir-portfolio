"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

const MidEle = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLSpanElement | null>(null);

  const [percent, setPercent] = useState(0);
  const [maxExtraOs, setMaxExtraOs] = useState(20);

  const baseText = "Let's gooooooooo";
  const exclamations = "!!!";

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 24,
    mass: 0.42,
  });

  const percentValue = useTransform(smoothProgress, (latest) =>
    Math.round(latest * 100)
  );

  const opacity = useTransform(smoothProgress, [0, 0.08, 0.16], [0.2, 0.72, 1]);
  const y = useTransform(smoothProgress, [0, 0.16], [18, 0]);

  const x = useTransform(
    smoothProgress,
    [0, 0.5, 0.9, 1],
    ["0%", "0%", "-15%", "-15%"]
  );

  const lineScale = useTransform(
    smoothProgress,
    [0, 0.5, 0.9, 1],
    [0.6, 1.02, 1.01, 1.008]
  );

  useMotionValueEvent(percentValue, "change", (latest) => {
    setPercent(latest);
  });

  useEffect(() => {
    const calculateExtraOs = () => {
      if (!measureRef.current) return;

      const sampleWidth = measureRef.current.getBoundingClientRect().width;
      if (!sampleWidth) return;

      const avgOWidth = sampleWidth / 10;
      const viewportWidth = window.innerWidth;
      const targetTailWidth = viewportWidth * 0.75;

      setMaxExtraOs(Math.ceil(targetTailWidth / avgOWidth));
    };

    calculateExtraOs();
    window.addEventListener("resize", calculateExtraOs);

    return () => window.removeEventListener("resize", calculateExtraOs);
  }, []);

  const letters = useMemo(() => {
    const result: { char: string; visible: boolean; key: string }[] = [];

    // Phase 1: 0 -> 50%
    const baseVisibleCount =
      percent <= 50
        ? Math.floor((percent / 50) * baseText.length)
        : baseText.length;

    for (let i = 0; i < baseText.length; i++) {
      result.push({
        char: baseText[i],
        visible: i < baseVisibleCount,
        key: `base-${i}`,
      });
    }

    // Phase 2: 50 -> 90%
    const extraVisibleCount =
      percent <= 50
        ? 0
        : percent <= 90
        ? Math.floor(((percent - 50) / 40) * maxExtraOs)
        : maxExtraOs;

    for (let i = 0; i < maxExtraOs; i++) {
      result.push({
        char: "o",
        visible: i < extraVisibleCount,
        key: `extra-o-${i}`,
      });
    }

    // Phase 3: 90 -> 100%
    const bangVisibleCount =
      percent <= 90
        ? 0
        : Math.floor(((percent - 90) / 10) * exclamations.length);

    for (let i = 0; i < exclamations.length; i++) {
      result.push({
        char: exclamations[i],
        visible: i < bangVisibleCount,
        key: `bang-${i}`,
      });
    }

    return result;
  }, [percent, baseText, exclamations, maxExtraOs]);

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh] border border-white/10"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="flex w-full flex-col items-center gap-8 px-6">
          <motion.div
            className="w-full whitespace-nowrap text-center text-4xl font-semibold tracking-tight text-black md:text-6xl"
            style={{
              opacity,
              y,
              x,
              scale: lineScale,
              willChange: "transform, opacity",
            }}
          >
            {letters.map((item, index) => (
              <span
                key={item.key}
                className="inline-block will-change-transform"
                style={{
                  transform: item.visible
                    ? "translate3d(8px, 0px, 0px) scale(1)"
                    : "translate3d(0px, 18px, 0px) scale(0.94)",
                  opacity: item.visible ? 1 : 0,
                  filter: item.visible ? "blur(0px)" : "blur(14px)",
                  transitionProperty: "transform, opacity, filter",
                  transitionDuration: "420ms",
                  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                  transitionDelay: `${index * 5}ms`,
                }}
              >
                {item.char === " " ? "\u00A0" : item.char}
              </span>
            ))}
          </motion.div>

          <span
            ref={measureRef}
            className="pointer-events-none absolute invisible whitespace-nowrap text-4xl font-semibold tracking-tight md:text-6xl"
          >
            oooooooooo
          </span>
        </div>
      </div>
    </section>
  );
};

export default MidEle;