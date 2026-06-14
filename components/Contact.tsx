"use client";

import React, { useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const CENTER = { x: 50, y: 45 };
const GOLDEN_ANGLE = 137.508;

const constellationLabels = [
  "Design",
  "Frontend",
  "AI",
  "Systems",
  "Research",
  "Product",
  "Interaction",
  "Motion",
  "Trust",
  "Clarity",
  "React",
  "Next.js",
  "TypeScript",
  "UX Systems",
  "Computer Vision",
  "Architecture",
  "Case Studies",
  "Product Thinking",
];

const slugify = (value: string) => value.toLowerCase().replace(/\s+/g, "-");

type SkillNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  tone: "major" | "minor";
  twinkleDelay: number;
  twinkleDuration: number;
};

const Contact = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [isInside, setIsInside] = useState(false);

  const gravityX = useSpring(50, {
    stiffness: 85,
    damping: 26,
    mass: 0.9,
  });

  const gravityY = useSpring(50, {
    stiffness: 85,
    damping: 26,
    mass: 0.9,
  });

  const gravityBackground = useMotionTemplate`radial-gradient(
    760px circle at ${gravityX}% ${gravityY}%,
    rgba(255,255,255,0.12),
    rgba(255,255,255,0.045) 30%,
    rgba(255,255,255,0.015) 58%,
    transparent 78%
  )`;

  const nodes = useMemo<SkillNode[]>(() => {
    return constellationLabels.map((label, index) => {
      const radius = 11 + Math.sqrt(index + 1) * 7.4;
      const angle = index * GOLDEN_ANGLE - 18;
      const rad = (angle * Math.PI) / 180;

      return {
        id: slugify(label),
        label,
        x: CENTER.x + Math.cos(rad) * radius,
        y: CENTER.y + Math.sin(rad) * radius,
        tone: index < 6 ? "major" : "minor",
        twinkleDelay: (index * 0.73) % 5.2,
        twinkleDuration: 2.4 + ((index * 0.37) % 2.2),
      };
    });
  }, []);

  const connections = useMemo(() => {
    return nodes.flatMap((node, index) =>
      nodes
        .slice(index + 1)
        .map((target) => {
          const dx = node.x - target.x;
          const dy = node.y - target.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          return { from: node.id, to: target.id, distance };
        })
        .filter((connection) => connection.distance < 18)
        .slice(0, 2)
    );
  }, [nodes]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const blackOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.42],
    [0, 0.72, 1]
  );

  const contentOpacity = useTransform(
    scrollYProgress,
    [0.08, 0.24, 0.42],
    [0, 0.78, 1]
  );

  const blurValue = useTransform(scrollYProgress, [0.1, 0.34], [8, 0]);
  const filter = useMotionTemplate`blur(${blurValue}px)`;

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const nextMouse = {
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    };

    setMouse(nextMouse);

    if (!shouldReduceMotion) {
      gravityX.set(nextMouse.x);
      gravityY.set(nextMouse.y);
    }
  };

  const getDistance = (x: number, y: number) => {
    const dx = x - mouse.x;
    const dy = y - mouse.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const getReveal = (x: number, y: number) => {
    if (shouldReduceMotion) return 1;
    if (!isInside) return 0.12;

    const distance = getDistance(x, y);
    return Math.max(0.1, 1 - distance / 44);
  };

  const getGravityOffset = (x: number, y: number) => {
    if (shouldReduceMotion || !isInside) return { x: 0, y: 0 };

    const dx = mouse.x - x;
    const dy = mouse.y - y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const force = Math.max(0, 1 - distance / 36) * 9;

    return {
      x: (dx / Math.max(distance, 1)) * force,
      y: (dy / Math.max(distance, 1)) * force,
    };
  };

  const getCurvePath = (a: SkillNode, b: SkillNode) => {
    const midX = (a.x + b.x) / 2;
    const midY = (a.y + b.y) / 2;

    const pullX = shouldReduceMotion ? CENTER.x : isInside ? mouse.x : CENTER.x;
    const pullY = shouldReduceMotion ? CENTER.y : isInside ? mouse.y : CENTER.y;

    const curveStrength = isInside ? 0.08 : 0.045;

    const controlX = midX + (pullX - midX) * curveStrength;
    const controlY = midY + (pullY - midY) * curveStrength;

    return `M ${a.x} ${a.y} Q ${controlX} ${controlY} ${b.x} ${b.y}`;
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsInside(true)}
      onMouseLeave={() => setIsInside(false)}
      className="relative z-0 -mt-10 min-h-screen overflow-hidden px-5 py-24 text-white sm:px-6 md:px-10 md:py-32 lg:px-16 lg:py-40 xl:px-20 2xl:px-28"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 bg-[#020202]"
        style={{ opacity: blackOpacity }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        animate={{ opacity: isInside ? 1 : 0.52 }}
        style={{
          background: shouldReduceMotion
            ? `radial-gradient(
                760px circle at 50% 50%,
                rgba(255,255,255,0.1),
                rgba(255,255,255,0.04) 34%,
                transparent 78%
              )`
            : gravityBackground,
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:36px_36px] opacity-20" />

      <motion.div
        style={{ opacity: contentOpacity, filter }}
        className="relative z-10 mx-auto flex min-h-[75vh] w-full max-w-[1800px] flex-col justify-between gap-6"
      >
        <div className="relative min-h-[620px] w-full overflow-hidden py-6 sm:py-8 md:py-12 lg:min-h-[720px] lg:py-16">
          {/* Black hole core */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-[45%] z-10 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            animate={shouldReduceMotion ? {} : { rotate: 360 }}
            transition={{
              duration: 48,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="absolute inset-[70px] rounded-full bg-black shadow-[0_0_60px_rgba(0,0,0,1),0_0_120px_rgba(255,255,255,0.12)]" />

            <div className="absolute left-1/2 top-1/2 h-[30px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-xl" />

            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,transparent_34%,rgba(255,255,255,0.05)_44%,transparent_62%)]" />
          </motion.div>

          {/* Curved constellation lines */}
          <svg
            className="pointer-events-none absolute inset-0 z-20 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {connections.map((connection) => {
              const a = nodes.find((node) => node.id === connection.from);
              const b = nodes.find((node) => node.id === connection.to);

              if (!a || !b) return null;

              const reveal = Math.max(getReveal(a.x, a.y), getReveal(b.x, b.y));

              return (
                <motion.path
                  key={`${connection.from}-${connection.to}`}
                  d={getCurvePath(a, b)}
                  fill="none"
                  stroke="white"
                  strokeLinecap="round"
                  strokeWidth="0.09"
                  animate={{ opacity: reveal * 0.36 }}
                  transition={{ duration: 0.18 }}
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {nodes.map((node) => {
            const reveal = getReveal(node.x, node.y);
            const isMajor = node.tone === "major";
            const offset = getGravityOffset(node.x, node.y);

            return (
              <motion.div
                key={node.id}
                className="pointer-events-none absolute z-30"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                animate={{
                  opacity: reveal,
                  scale: 0.82 + reveal * 0.24,
                  x: offset.x,
                  y: offset.y,
                }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className={`rounded-full bg-white ${
                    isMajor ? "h-4 w-4" : "h-2.5 w-2.5"
                  }`}
                  animate={{
                    opacity: [0.55, 1, 0.62],
                    scale: [1, 1.28, 1],
                  }}
                  transition={{
                    duration: node.twinkleDuration,
                    delay: node.twinkleDelay,
                    repeat: Infinity,
                    repeatDelay: 1.8,
                    ease: "easeInOut",
                  }}
                  style={{
                    boxShadow: `0 0 ${8 + reveal * 52}px rgba(255,255,255,${
                      0.14 + reveal * 0.54
                    })`,
                  }}
                />

                <motion.span
                  className="absolute left-1/2 top-6 -translate-x-1/2 whitespace-nowrap text-[11px] font-medium tracking-[-0.02em] text-white/65"
                  animate={{
                    opacity: reveal > 0.68 ? 1 : 0,
                    y: reveal > 0.68 ? 0 : 4,
                  }}
                  transition={{ duration: 0.18 }}
                >
                  {node.label}
                </motion.span>
              </motion.div>
            );
          })}

          <div className="relative z-40 flex min-h-[520px] flex-col justify-end lg:min-h-[620px]">
            <p className="mb-5 text-xs uppercase tracking-[0.32em] text-white/35">
              BEYOND THE WORK
            </p>

            <h2 className="max-w-6xl text-[clamp(2.5rem,5.8vw,7rem)] font-semibold leading-[0.9] tracking-[-0.085em] text-white">
              Every idea bends toward what it connects to.
            </h2>

            <p className="mt-8 max-w-2xl text-[clamp(1.1rem,2vw,1.7rem)] leading-snug tracking-[-0.04em] text-white/55">
              Design, code, and AI are different dimensions of the same work.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-8 border-t border-white/10 pt-8 md:flex-row md:items-end">
          <div>
            <p className="text-[clamp(1.7rem,3vw,3rem)] font-medium leading-tight tracking-[-0.055em] text-white">
              Let’s build something meaningful.
            </p>

            <p className="mt-3 text-sm text-white/42">
              Design Engineer · AI-native products · Frontend systems
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:mubashiruddinkhaja03@gmail.com"
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/80 transition-colors duration-300 hover:border-white/35 hover:bg-white/10 hover:text-white"
            >
              Email
            </a>

            <a
              href="https://linkedin.com/in/mubashir-uddin"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/80 transition-colors duration-300 hover:border-white/35 hover:bg-white/10 hover:text-white"
            >
              LinkedIn
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/80 transition-colors duration-300 hover:border-white/35 hover:bg-white/10 hover:text-white"
            >
              Resume
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;