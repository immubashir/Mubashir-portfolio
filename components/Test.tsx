"use client";

import React, { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  MotionValue,
} from "framer-motion";

const nodes = [
  { id: 1, label: "Design", x: 220, y: 80 },
  { id: 2, label: "Frontend", x: 470, y: 120 },
  { id: 3, label: "ML", x: 560, y: 280 },
  { id: 4, label: "Research", x: 390, y: 430 },
  { id: 5, label: "Systems", x: 150, y: 320 },
];

const centerNode = { x: 320, y: 240, label: "Me" };

type RevealNodeProps = {
  node: (typeof nodes)[number];
  index: number;
  progress: MotionValue<number>;
};

const RevealNode = ({ node, index, progress }: RevealNodeProps) => {
  const total = nodes.length + 1;

  const start = (index + 1) / (total + 1);
  const end = start + 0.12;

  const opacity = useTransform(progress, [0, start, end, 1], [0, 0, 1, 1]);
  const scale = useTransform(progress, [0, start, end, 1], [0.7, 0.7, 1, 1]);
  const yFloat = useTransform(progress, [0, start, end, 1], [20, 20, 0, 0]);
  const linePath = useTransform(progress, [0, start, end, 1], [0, 0, 1, 1]);
  const lineOpacity = useTransform(progress, [0, start, end, 1], [0, 0, 1, 1]);

  return (
    <>
      <motion.svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <motion.line
          x1={centerNode.x}
          y1={centerNode.y}
          x2={node.x}
          y2={node.y}
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1.5"
          style={{
            pathLength: linePath,
            opacity: lineOpacity,
          }}
        />
      </motion.svg>

      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
        style={{
          left: node.x,
          top: node.y,
          opacity,
          scale,
          y: yFloat,
        }}
      >
        <div className="px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05)]">
          <span className="text-sm text-white/85">{node.label}</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute w-2 h-2 rounded-full bg-violet-400/80 -translate-x-1/2 -translate-y-1/2 z-10"
        style={{
          left: (centerNode.x + node.x) / 2,
          top: (centerNode.y + node.y) / 2,
          opacity,
          scale,
        }}
      />
    </>
  );
};
const Details = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLElement | null>(null);

  const isInView = useInView(bgRef, {
    margin: "-20% 0px -20% 0px",
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.18],
    ["rgba(0,0,0,0)", "rgba(0,0,0,1)"]
  );

  const centerOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
  const centerScale = useTransform(scrollYProgress, [0, 0.08], [0.8, 1]);

  return (
    <motion.section
      ref={sectionRef}
      style={{
        backgroundColor: isInView ? backgroundColor : "rgba(0,0,0,0)",
      }}
      className="relative w-full h-[260vh] text-white"
    >
      <div ref={bgRef} className="sticky top-0 h-screen flex items-center justify-center px-20 py-24 overflow-hidden">
        <div className="relative w-[700px] h-[520px] rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden">
          {/* grid background */}
          {/* <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
              `,
              backgroundSize: "36px 36px",
            }}
          /> */}

          {/* center glow */}
          {/* <motion.div
            className="absolute w-40 h-40 rounded-full bg-violet-500/10 blur-3xl"
            style={{
              left: centerNode.x - 80,
              top: centerNode.y - 80,
              opacity: centerOpacity,
              scale: centerScale,
            }}
          /> */}

          {/* center node */}
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            style={{
              left: centerNode.x,
              top: centerNode.y,
              opacity: centerOpacity,
              scale: centerScale,
            }}
          >
            <div className="px-6 py-3 rounded-full border border-violet-400/40 bg-violet-500/15 backdrop-blur-md shadow-[0_0_30px_rgba(139,92,246,0.25)]">
              <span className="text-sm tracking-wide font-medium">
                {centerNode.label}
              </span>
            </div>
          </motion.div>

          {/* progressive nodes */}
          {nodes.map((node, index) => (
            <RevealNode
              key={node.id}
              node={node}
              index={index}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Details;