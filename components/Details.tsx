"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "motion/react";

type SubNode = {
  id: string;
  label: string;
};

type MainNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  children: SubNode[];
};

const SCENE_WIDTH = 980;
const SCENE_HEIGHT = 680;

const PHASE_CENTER_END = 0.3;
const PHASE_MAIN_END = 0.5;

type ViewportProfile = "mobile" | "tablet" | "desktop";

type DetailsLayout = {
  profile: ViewportProfile;
  scale: number;
  centerLarge: number;
  centerSmall: number;
  scrollHeight: string;
  bloomRadius: number;
  burstScale: number;
  shakeMax: number;
  particleLimit: number;
};

const DEFAULT_LAYOUT: DetailsLayout = {
  profile: "desktop",
  scale: 1,
  centerLarge: 170,
  centerSmall: 32,
  scrollHeight: "300vh",
  bloomRadius: 102,
  burstScale: 1,
  shakeMax: 4,
  particleLimit: 36,
};

function getViewportProfile(width: number): ViewportProfile {
  if (width < 640) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

function getDetailsLayout(containerWidth: number, viewportHeight: number): DetailsLayout {
  const profile = getViewportProfile(containerWidth);
  const horizontalPad = profile === "mobile" ? 8 : profile === "tablet" ? 16 : 32;
  const verticalPad = profile === "mobile" ? 64 : profile === "tablet" ? 96 : 128;
  const safeWidth = Math.max(containerWidth - horizontalPad * 2, 260);
  const safeHeight = Math.max(viewportHeight - verticalPad, 360);
  const scale = Math.min(safeWidth / SCENE_WIDTH, safeHeight / SCENE_HEIGHT, 1);

  return {
    profile,
    scale,
    centerLarge: profile === "mobile" ? 118 : profile === "tablet" ? 148 : 170,
    centerSmall: profile === "mobile" ? 26 : 32,
    scrollHeight: profile === "mobile" ? "380vh" : profile === "tablet" ? "320vh" : "300vh",
    bloomRadius: profile === "mobile" ? 76 : profile === "tablet" ? 90 : 102,
    burstScale: profile === "mobile" ? 0.78 : profile === "tablet" ? 0.9 : 1,
    shakeMax: profile === "mobile" ? 2 : profile === "tablet" ? 3 : 4,
    particleLimit: profile === "mobile" ? 18 : profile === "tablet" ? 26 : 36,
  };
}

const centerNode = {
  x: SCENE_WIDTH / 2,
  y: SCENE_HEIGHT / 2,
  label: "My Skills",
};

const mainNodes: MainNode[] = [
  {
    id: "design",
    label: "Design",
    x: 250,
    y: 165,
    children: [
      { id: "ui", label: "UI Design" },
      { id: "ux", label: "UX Systems" },
      { id: "motion", label: "Motion" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    x: 675,
    y: 185,
    children: [
      { id: "react", label: "React" },
      { id: "next", label: "Next.js" },
      { id: "tailwind", label: "Tailwind" },
    ],
  },
  {
    id: "ml",
    label: "ML",
    x: 745,
    y: 385,
    children: [
      { id: "cv", label: "Computer Vision" },
      { id: "training", label: "Training" },
      { id: "dl", label: "Deep Learning" },
    ],
  },
  {
    id: "research",
    label: "Research",
    x: 540,
    y: 560,
    children: [
      { id: "cases", label: "Case Studies" },
      { id: "product", label: "Product Thinking" },
      { id: "analysis", label: "Analysis" },
    ],
  },
  {
    id: "systems",
    label: "Systems",
    x: 215,
    y: 430,
    children: [
      { id: "api", label: "APIs" },
      { id: "db", label: "Databases" },
      { id: "infra", label: "Integration" },
    ],
  },
  {
    id: "product",
    label: "Product",
    x: 555,
    y: 130,
    children: [
      { id: "flows", label: "User Flows" },
      { id: "thinking", label: "Feature Thinking" },
      { id: "logic", label: "Interaction Logic" },
    ],
  },
];

const nodesLeftToRight = [...mainNodes].sort((a, b) => a.x - b.x);

const visualLinks = [
  ["design", "frontend"],
  ["frontend", "ml"],
  ["ml", "research"],
  ["research", "product"],
  ["product", "systems"],
  ["systems", "design"],
  ["design", "product"],
  ["frontend", "research"],
  ["product", "research"],
] as const;

const pseudoNodes = [
  { id: "pc1", x: 360, y: 235, size: 7 },
  { id: "pc2", x: 575, y: 245, size: 7 },
  { id: "pc3", x: 635, y: 350, size: 8 },
  { id: "pc4", x: 505, y: 450, size: 7 },
  { id: "pc5", x: 355, y: 460, size: 7 },
  { id: "pc6", x: 305, y: 360, size: 7 },
  { id: "pl1", x: 455, y: 175, size: 6 },
  { id: "pl2", x: 710, y: 285, size: 6 },
  { id: "pl3", x: 655, y: 485, size: 7 },
  { id: "pl4", x: 415, y: 565, size: 6 },
  { id: "pl5", x: 245, y: 500, size: 6 },
  { id: "pl6", x: 220, y: 285, size: 6 },
  { id: "pa1", x: 390, y: 140, size: 5 },
  { id: "pa2", x: 765, y: 330, size: 5 },
  { id: "pa3", x: 610, y: 560, size: 5 },
  { id: "pa4", x: 175, y: 500, size: 5 },
];

type BloomItem = {
  nodeId: string;
  child: SubNode;
  x: number;
  y: number;
  nodeX: number;
  nodeY: number;
  progressStart: number;
  progressEnd: number;
};

function getNodeById(id: string) {
  return mainNodes.find((node) => node.id === id);
}

function getBloomPositions(
  node: MainNode,
  count: number,
  radius = 104
): { x: number; y: number }[] {
  const dx = node.x - centerNode.x;
  const dy = node.y - centerNode.y;
  const baseAngle = Math.atan2(dy, dx);

  const spread = Math.PI * 0.92;
  const start = baseAngle - spread / 2;

  return Array.from({ length: count }, (_, index) => {
    const angle =
      count === 1 ? baseAngle : start + (index / (count - 1)) * spread;

    return {
      x: node.x + Math.cos(angle) * radius,
      y: node.y + Math.sin(angle) * radius,
    };
  });
}

function buildBloomTimeline(bloomRadius: number): BloomItem[] {
  const totalChildSlots = nodesLeftToRight.reduce(
    (sum, node) => sum + node.children.length,
    0
  );
  const childBand = 1 - PHASE_MAIN_END;
  const items: BloomItem[] = [];
  let slot = 0;

  for (const node of nodesLeftToRight) {
    const positions = getBloomPositions(node, node.children.length, bloomRadius);
    const sorted = node.children
      .map((child, index) => ({
        child,
        x: positions[index].x,
        y: positions[index].y,
      }))
      .sort((a, b) => a.x - b.x);

    for (const entry of sorted) {
      const progressStart =
        PHASE_MAIN_END + (slot / totalChildSlots) * childBand;
      const progressEnd =
        PHASE_MAIN_END + ((slot + 1) / totalChildSlots) * childBand;

      items.push({
        nodeId: node.id,
        child: entry.child,
        x: entry.x,
        y: entry.y,
        nodeX: node.x,
        nodeY: node.y,
        progressStart,
        progressEnd,
      });

      slot += 1;
    }
  }

  return items;
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

/** Overshoot past 1 then settle — explosion pop */
function easeOutBack(t: number, overshoot = 3.2) {
  const c = clamp01(t);
  if (c === 0) return 0;
  if (c === 1) return 1;
  return (
    1 +
    (overshoot + 1) * Math.pow(c - 1, 3) +
    overshoot * Math.pow(c - 1, 2)
  );
}

/** Elastic wobble for atom settle */
function easeOutElastic(t: number) {
  const c = clamp01(t);
  if (c === 0) return 0;
  if (c === 1) return 1;
  return (
    Math.pow(2, -10 * c) *
      Math.sin(((c * 10 - 0.75) * (2 * Math.PI)) / 3) +
    1
  );
}

function explodeProgress(t: number) {
  return easeOutBack(t, 3.4);
}

function atomProgress(t: number) {
  const back = easeOutBack(t, 2.6);
  const settle = easeOutElastic(t);
  return back * 0.55 + settle * 0.45;
}

function explodeScale(t: number, peak = 1.55) {
  const e = explodeProgress(t);
  if (e <= 0) return 0.02;
  if (e >= 1) return 1;
  return 0.02 + e * (peak - 0.02);
}

function burstOffset(progress: number, distance: number) {
  return distance * (1 - explodeProgress(progress));
}

const explosionParticles = Array.from({ length: 36 }, (_, index) => {
  const angle = (index / 36) * Math.PI * 2 + (index % 3) * 0.18;
  const dist = 95 + (index % 7) * 38 + (index % 4) * 22;
  return {
    id: `ep-${index}`,
    angle,
    dist,
    size: 3 + (index % 4),
    delay: (index % 9) * 0.012,
  };
});

function ConnectionLine({
  x1,
  y1,
  x2,
  y2,
  reveal,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  reveal: MotionValue<number>;
}) {
  const burst = useTransform(reveal, (v) => explodeProgress(v));
  const pathLength = burst;
  const opacity = useTransform(burst, (v) =>
    v <= 0 ? 0 : Math.min(1, v * 1.35) * 0.95
  );
  const strokeWidth = useTransform(burst, (v) => 0.6 + clamp01(v) * 1.4);

  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="rgba(24,24,27,0.55)"
      strokeDasharray="4 8"
      strokeLinecap="round"
      style={{ pathLength, opacity, strokeWidth }}
    />
  );
}

function VisualLink({
  x1,
  y1,
  x2,
  y2,
  reveal,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  reveal: MotionValue<number>;
}) {
  const burst = useTransform(reveal, (v) => explodeProgress(v));
  const pathLength = burst;
  const opacity = useTransform(burst, (v) =>
    v <= 0 ? 0 : Math.min(1, v * 1.2) * 0.85
  );

  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="rgba(115,115,115,0.24)"
      strokeWidth={1}
      strokeDasharray="3 10"
      strokeLinecap="round"
      style={{ pathLength, opacity }}
    />
  );
}

function BloomLine({
  x1,
  y1,
  x2,
  y2,
  reveal,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  reveal: MotionValue<number>;
}) {
  const burst = useTransform(reveal, (v) => atomProgress(v));
  const pathLength = burst;
  const opacity = useTransform(burst, (v) => (v <= 0 ? 0 : Math.min(1, v * 1.5)));

  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="rgba(24,24,27,0.65)"
      strokeWidth={1.2}
      strokeLinecap="round"
      style={{ pathLength, opacity }}
    />
  );
}

function ShockRing({
  burst,
  burstScale,
  offset,
  index,
}: {
  burst: MotionValue<number>;
  burstScale: number;
  offset: number;
  index: number;
}) {
  const width = useTransform(burst, (v) => {
    const t = clamp01(v - offset);
    return (40 + t * (220 + index * 80)) * burstScale;
  });
  const height = useTransform(burst, (v) => {
    const t = clamp01(v - offset);
    return (40 + t * (220 + index * 80)) * burstScale;
  });
  const opacity = useTransform(burst, (v) => {
    const t = clamp01(v - offset);
    if (t <= 0 || t >= 1) return 0;
    return (1 - t) * (0.45 - index * 0.1);
  });
  const scale = useTransform(burst, (v) => {
    const t = clamp01(v - offset);
    return 0.6 + explodeProgress(t) * 0.5;
  });

  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border border-neutral-900/20"
      style={{
        x: "-50%",
        y: "-50%",
        width,
        height,
        opacity,
        scale,
      }}
    />
  );
}

function ExplosionShockwave({
  burst,
  burstScale,
}: {
  burst: MotionValue<number>;
  burstScale: number;
}) {
  return (
    <>
      <ShockRing burst={burst} burstScale={burstScale} offset={0} index={0} />
      <ShockRing burst={burst} burstScale={burstScale} offset={0.12} index={1} />
      <ShockRing burst={burst} burstScale={burstScale} offset={0.24} index={2} />
    </>
  );
}

function ExplosionParticleDot({
  burst,
  burstScale,
  particle,
  active,
}: {
  burst: MotionValue<number>;
  burstScale: number;
  particle: (typeof explosionParticles)[number];
  active: boolean;
}) {
  const x = useTransform(burst, (v) => {
    const t = clamp01(v - particle.delay);
    if (!active || t <= 0) return -particle.size / 2;
    const e = explodeProgress(t);
    return (
      Math.cos(particle.angle) * particle.dist * burstScale * e - particle.size / 2
    );
  });
  const y = useTransform(burst, (v) => {
    const t = clamp01(v - particle.delay);
    if (!active || t <= 0) return -particle.size / 2;
    const e = explodeProgress(t);
    return (
      Math.sin(particle.angle) * particle.dist * burstScale * e - particle.size / 2
    );
  });
  const opacity = useTransform(burst, (v) => {
    if (!active) return 0;
    const t = clamp01(v - particle.delay);
    if (t <= 0) return 0;
    if (t >= 1) return 0.35;
    return Math.min(1, (1 - t) * 1.2) * 0.85;
  });
  const scale = useTransform(burst, (v) => {
    if (!active) return 0;
    const t = clamp01(v - particle.delay);
    return t <= 0 ? 0 : explodeScale(t, 2.2);
  });
  const filter = useTransform(burst, (v) => {
    if (!active) return "blur(0px)";
    const t = clamp01(v - particle.delay);
    return t > 0 && t < 0.85 ? "blur(1px)" : "blur(0px)";
  });

  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-1/2 rounded-full bg-neutral-800"
      style={{
        width: particle.size,
        height: particle.size,
        x,
        y,
        opacity,
        scale,
        filter,
      }}
    />
  );
}

function ExplosionParticles({
  burst,
  burstScale,
  particleLimit,
}: {
  burst: MotionValue<number>;
  burstScale: number;
  particleLimit: number;
}) {
  return (
    <>
      {explosionParticles.map((particle, index) => (
        <ExplosionParticleDot
          key={particle.id}
          burst={burst}
          burstScale={burstScale}
          particle={particle}
          active={index < particleLimit}
        />
      ))}
    </>
  );
}

function CenterNode({
  shrink,
  burst,
  centerLarge,
  centerSmall,
  burstScale,
  particleLimit,
}: {
  shrink: MotionValue<number>;
  burst: MotionValue<number>;
  centerLarge: number;
  centerSmall: number;
  burstScale: number;
  particleLimit: number;
}) {
  const [shouldFloat, setShouldFloat] = useState(true);
  const shrinkDelta = centerLarge - centerSmall;
  const crushed = useTransform(shrink, (t) => {
    const c = clamp01(t);
    if (c < 0.72) return c;
    return 0.72 + (c - 0.72) * 2.2;
  });
  const size = useTransform(
    crushed,
    (t) => centerLarge - shrinkDelta * clamp01(t)
  );
  const implodeScaleX = useTransform(shrink, (t) => {
    const c = clamp01(t);
    if (c < 0.55) return 1;
    if (c < 0.88) return 1 + (c - 0.55) * 0.45;
    return 1.16 - (c - 0.88) * 2.8;
  });
  const implodeScaleY = useTransform(shrink, (t) => {
    const c = clamp01(t);
    if (c < 0.55) return 1;
    if (c < 0.88) return 1 - (c - 0.55) * 0.35;
    return 0.88 + (c - 0.88) * 0.4;
  });
  const isCompact = useTransform(shrink, (t) => (clamp01(t) > 0.82 ? 1 : 0));
  const labelOpacity = useTransform(shrink, (t) => 1 - clamp01(t) * 1.35);
  const labelY = useTransform(shrink, (t) => -12 * clamp01(t));
  const coreFlash = useTransform(burst, (v) =>
    v <= 0 ? 0 : Math.min(1, v * 2.5) * (1 - clamp01(v))
  );
  const coreBurstScale = useTransform(
    burst,
    (v) => 0.4 + explodeProgress(v) * 1.1
  );
  const labelWrapScale = useTransform(shrink, (t) => 1 - clamp01(t) * 0.28);
  const hintOpacity = useTransform(shrink, (t) =>
    clamp01(t) < 0.12 ? 0.7 * (1 - clamp01(t) / 0.12) : 0
  );
  const ringOpacity = useTransform(burst, (v) =>
    v <= 0 ? 0 : Math.min(0.5, explodeProgress(v) * 0.35)
  );
  const ringScale = useTransform(burst, (v) => 1 + explodeProgress(v) * 0.35);

  useMotionValueEvent(shrink, "change", (t) => {
    setShouldFloat(clamp01(t) < 0.08);
  });

  return (
    <motion.div
      className="absolute outline-none"
      style={{
        left: centerNode.x,
        top: centerNode.y,
        zIndex: 60,
      }}
      animate={shouldFloat ? { y: [0, -8, 0] } : { y: 0 }}
      transition={
        shouldFloat
          ? { duration: 4.2, ease: "easeInOut", repeat: Infinity }
          : { duration: 0.15, ease: [0.12, 0.9, 0.2, 1] }
      }
    >
      <ExplosionShockwave burst={burst} burstScale={burstScale} />
      <ExplosionParticles
        burst={burst}
        burstScale={burstScale}
        particleLimit={particleLimit}
      />

      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 rounded-full bg-neutral-900/25 blur-2xl"
        style={{
          width: 280 * burstScale,
          height: 280 * burstScale,
          x: "-50%",
          y: "-50%",
          opacity: coreFlash,
          scale: coreBurstScale,
        }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 rounded-full border border-neutral-900 bg-black shadow-[0_0_0_20px_rgba(0,0,0,0.055),0_30px_80px_rgba(0,0,0,0.18)]"
        style={{
          width: size,
          height: size,
          x: "-50%",
          y: "-50%",
          scaleX: implodeScaleX,
          scaleY: implodeScaleY,
        }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center"
        style={{ scale: labelWrapScale }}
      >
        <motion.div
          className="whitespace-nowrap text-[15px] font-medium tracking-[0.06em] text-white sm:text-[18px] sm:tracking-[0.08em] md:text-[20px]"
          style={{
            opacity: labelOpacity,
            y: labelY,
          }}
        >
          {centerNode.label}
        </motion.div>

        <motion.div
          className="mt-1.5 whitespace-nowrap text-[8px] uppercase tracking-[0.18em] text-white/70 sm:mt-2 sm:text-[10px] sm:tracking-[0.24em]"
          style={{ opacity: hintOpacity }}
        >
          scroll to explore
        </motion.div>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border border-neutral-900/10"
        style={{
          width: 90,
          height: 90,
          x: "-50%",
          y: "-50%",
          opacity: ringOpacity,
          scale: ringScale,
        }}
      />
    </motion.div>
  );
}

function PseudoNode({
  x,
  y,
  size,
  reveal,
  stagger = 0,
}: {
  x: number;
  y: number;
  size: number;
  reveal: MotionValue<number>;
  stagger?: number;
}) {
  const dx = centerNode.x - x;
  const dy = centerNode.y - y;
  const burst = useTransform(reveal, (v) => explodeProgress(clamp01(v - stagger)));
  const opacity = useTransform(burst, (v) =>
    v <= 0 ? 0 : Math.min(0.95, v * 1.1) * 0.9
  );
  const scale = useTransform(burst, (v) => explodeScale(v, 2.4));
  const offsetX = useTransform(burst, (v) => burstOffset(v, dx));
  const offsetY = useTransform(burst, (v) => burstOffset(v, dy));

  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        zIndex: 12,
        opacity,
        scale,
        x: offsetX,
        y: offsetY,
        filter: useTransform(burst, (v) =>
          v > 0 && v < 1 ? "blur(2px)" : "blur(0px)"
        ),
      }}
    >
      <div className="relative h-full w-full">
        <div className="absolute inset-0 rounded-full bg-neutral-500/20 blur-[3px]" />
        <div className="relative h-full w-full rounded-full border border-neutral-500/60 bg-neutral-700/75 shadow-[0_3px_8px_rgba(0,0,0,0.05)]" />
      </div>
    </motion.div>
  );
}

function MainNodeDot({
  node,
  reveal,
  aggression,
  compact,
}: {
  node: MainNode;
  reveal: MotionValue<number>;
  aggression: number;
  compact: boolean;
}) {
  const glowMap: Record<string, string> = {
    design:
      "radial-gradient(circle, rgba(168,85,247,0.34) 0%, rgba(168,85,247,0.16) 38%, rgba(168,85,247,0.00) 72%)",
    frontend:
      "radial-gradient(circle, rgba(59,130,246,0.32) 0%, rgba(59,130,246,0.15) 38%, rgba(59,130,246,0.00) 72%)",
    ml: "radial-gradient(circle, rgba(236,72,153,0.32) 0%, rgba(236,72,153,0.15) 38%, rgba(236,72,153,0.00) 72%)",
    research:
      "radial-gradient(circle, rgba(245,158,11,0.3) 0%, rgba(245,158,11,0.14) 38%, rgba(245,158,11,0.00) 72%)",
    systems:
      "radial-gradient(circle, rgba(16,185,129,0.32) 0%, rgba(16,185,129,0.15) 38%, rgba(16,185,129,0.00) 72%)",
    product:
      "radial-gradient(circle, rgba(249,115,22,0.32) 0%, rgba(249,115,22,0.15) 38%, rgba(249,115,22,0.00) 72%)",
  };

  const burst = useTransform(reveal, (v) => explodeProgress(v));
  const dx = centerNode.x - node.x;
  const dy = centerNode.y - node.y;

  const opacity = useTransform(burst, (v) =>
    v <= 0 ? 0 : Math.min(1, v * 1.25)
  );
  const scale = useTransform(burst, (v) =>
    explodeScale(v, 1.72 + aggression * 0.35)
  );
  const offsetX = useTransform(burst, (v) => burstOffset(v, dx));
  const offsetY = useTransform(burst, (v) => burstOffset(v, dy));
  const labelOpacity = useTransform(burst, (v) => clamp01(v));
  const labelY = useTransform(burst, (v) => -18 * (1 - clamp01(v)));
  const labelScale = useTransform(burst, (v) => 0.7 + clamp01(v) * 0.3);
  const glowOpacity = useTransform(burst, (v) =>
    v <= 0 ? 0 : Math.min(1, v) * 0.9
  );
  const glowScale = useTransform(burst, (v) => 0.4 + explodeScale(v, 1.9) * 0.35);
  const motionBlur = useTransform(burst, (v) =>
    v > 0 && v < 1 ? `blur(${Math.min(6, (1 - clamp01(v)) * 8)}px)` : "blur(0px)"
  );
  const pointerEvents = useTransform(reveal, (v) =>
    clamp01(v) > 0.35 ? "auto" : "none"
  );

  return (
    <motion.div
      className="absolute outline-none"
      style={{
        left: node.x,
        top: node.y,
        zIndex: 30,
        opacity,
        scale,
        x: offsetX,
        y: offsetY,
        pointerEvents,
      }}
    >
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: compact ? 88 : 118,
          height: compact ? 88 : 118,
          background: glowMap[node.id] ?? glowMap.design,
          zIndex: 0,
          filter: "blur(7px)",
          opacity: glowOpacity,
          scale: glowScale,
        }}
      />

      <motion.div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-900 bg-neutral-900 ${
          compact ? "h-4 w-4" : "h-5 w-5"
        }`}
        style={{ zIndex: 1, filter: motionBlur }}
      />

      <motion.div
        className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full tracking-wide text-neutral-600 ${
          compact
            ? "top-[14px] max-w-[72px] truncate px-1.5 py-0.5 text-[9px]"
            : "top-[20px] px-3 py-1 text-sm"
        }`}
        style={{
          zIndex: 2,
          opacity: labelOpacity,
          y: labelY,
          scale: labelScale,
        }}
      >
        {node.label}
      </motion.div>
    </motion.div>
  );
}

function MainNodeReveal({
  smooth,
  index,
  total,
  node,
  aggression,
  compact,
}: {
  smooth: MotionValue<number>;
  index: number;
  total: number;
  node: MainNode;
  aggression: number;
  compact: boolean;
}) {
  const mainBand = PHASE_MAIN_END - PHASE_CENTER_END;
  const overlap = 0.52;
  const start = PHASE_CENTER_END + (index / total) * mainBand * overlap;
  const end =
    PHASE_CENTER_END + ((index + 1.1) / total) * mainBand * overlap + mainBand * 0.35;
  const reveal = useTransform(smooth, [start, Math.min(end, PHASE_MAIN_END)], [0, 1]);

  return (
    <MainNodeDot
      node={node}
      reveal={reveal}
      aggression={aggression}
      compact={compact}
    />
  );
}

function BloomChild({
  x,
  y,
  label,
  reveal,
  originX,
  originY,
  compact,
}: {
  x: number;
  y: number;
  label: string;
  reveal: MotionValue<number>;
  originX: number;
  originY: number;
  compact: boolean;
}) {
  const dx = originX - x;
  const dy = originY - y;
  const burst = useTransform(reveal, (v) => atomProgress(v));
  const opacity = useTransform(burst, (v) =>
    v <= 0 ? 0 : Math.min(1, v * 1.4)
  );
  const scale = useTransform(burst, (v) => explodeScale(v, 1.85));
  const offsetX = useTransform(burst, (v) => burstOffset(v, dx));
  const offsetY = useTransform(burst, (v) => burstOffset(v, dy));
  const motionBlur = useTransform(burst, (v) =>
    v > 0 && v < 1 ? `blur(${Math.min(5, (1 - clamp01(v)) * 6)}px)` : "blur(0px)"
  );

  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{
        left: x,
        top: y,
        zIndex: 40,
        opacity,
        scale,
        x: offsetX,
        y: offsetY,
        filter: motionBlur,
      }}
    >
      <div
        className={`flex flex-col items-center ${compact ? "gap-1" : "gap-2"}`}
      >
        <div
          className={`rounded-full border border-neutral-700 bg-neutral-800 shadow-[0_6px_16px_rgba(0,0,0,0.08)] ${
            compact ? "h-2.5 w-2.5" : "h-3.5 w-3.5"
          }`}
        />
        <div
          className={`rounded-full border border-neutral-300 bg-white text-neutral-700 shadow-[0_8px_20px_rgba(0,0,0,0.05)] ${
            compact
              ? "max-w-[88px] truncate px-2 py-0.5 text-[9px]"
              : "px-3 py-1.5 text-[12px]"
          }`}
        >
          {label}
        </div>
      </div>
    </motion.div>
  );
}

function BloomLineSlot({
  smooth,
  item,
}: {
  smooth: MotionValue<number>;
  item: BloomItem;
}) {
  const reveal = useTransform(
    smooth,
    [item.progressStart, item.progressEnd],
    [0, 1]
  );

  return (
    <BloomLine
      x1={item.nodeX}
      y1={item.nodeY}
      x2={item.x}
      y2={item.y}
      reveal={reveal}
    />
  );
}

function BloomChildSlot({
  smooth,
  item,
  compact,
}: {
  smooth: MotionValue<number>;
  item: BloomItem;
  compact: boolean;
}) {
  const reveal = useTransform(
    smooth,
    [item.progressStart, item.progressEnd],
    [0, 1]
  );

  return (
    <BloomChild
      x={item.x}
      y={item.y}
      label={item.child.label}
      reveal={reveal}
      originX={item.nodeX}
      originY={item.nodeY}
      compact={compact}
    />
  );
}

export default function Details() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const shakeMaxRef = useRef(DEFAULT_LAYOUT.shakeMax);
  const [layout, setLayout] = useState<DetailsLayout>(DEFAULT_LAYOUT);
  const [scrollHintVisible, setScrollHintVisible] = useState(true);

  const bloomTimeline = useMemo(
    () => buildBloomTimeline(layout.bloomRadius),
    [layout.bloomRadius]
  );
  const isCompact = layout.profile !== "desktop";

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const scrollVelocity = useVelocity(scrollYProgress);
  const speed = useTransform(scrollVelocity, (v) =>
    Math.min(Math.abs(v) * 1400, 1)
  );

  const [aggression, setAggression] = useState(0);

  const smooth = useSpring(scrollYProgress, {
    stiffness: 95 + aggression * 220,
    damping: 22 - aggression * 10,
    mass: 0.42 - aggression * 0.2,
  });

  useMotionValueEvent(speed, "change", (latest) => {
    setAggression(latest);
  });

  const centerShrink = useTransform(smooth, [0, PHASE_CENTER_END], [0, 1]);
  const mainReveal = useTransform(
    smooth,
    [PHASE_CENTER_END, PHASE_MAIN_END],
    [0, 1]
  );
  const explosionBurst = useTransform(
    smooth,
    [PHASE_CENTER_END - 0.02, PHASE_CENTER_END + 0.14],
    [0, 1]
  );
  shakeMaxRef.current = layout.shakeMax;

  const sceneShake = useTransform(explosionBurst, (v) => {
    if (v <= 0 || v >= 1) return 0;
    const t = explodeProgress(v);
    return Math.sin(t * Math.PI * 6) * (1 - t) * shakeMaxRef.current;
  });

  const hintOpacity = useTransform(smooth, [0, 0.08, 0.18], [1, 0.85, 0]);
  const hintY = useTransform(smooth, [0, 0.2], [10, 0]);
  const burstFlash = useTransform(explosionBurst, (v) =>
    v <= 0 ? 0 : Math.min(0.22, v * (1 - v) * 0.9)
  );

  useMotionValueEvent(smooth, "change", (latest) => {
    setScrollHintVisible(latest < 0.12);
  });

  useEffect(() => {
    const updateLayout = () => {
      const width = containerRef.current?.clientWidth ?? window.innerWidth;
      const height = window.visualViewport?.height ?? window.innerHeight;
      setLayout(getDetailsLayout(width, height));
    };

    updateLayout();
    const frame = requestAnimationFrame(updateLayout);

    const observer = new ResizeObserver(updateLayout);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    window.addEventListener("resize", updateLayout);
    window.visualViewport?.addEventListener("resize", updateLayout);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", updateLayout);
      window.visualViewport?.removeEventListener("resize", updateLayout);
    };
  }, []);

  return (
    <section
      ref={scrollRef}
      className="relative w-full touch-pan-y bg-white"
      style={{ height: layout.scrollHeight }}
    >
      <div className="sticky top-0 flex min-h-[100dvh] w-full items-center justify-center overflow-hidden px-2 py-10 sm:px-4 sm:py-14 md:px-8 md:py-20 lg:px-10">
        <div ref={containerRef} className="mx-auto w-full max-w-[1200px]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-full justify-center"
            style={{
              minHeight: SCENE_HEIGHT * layout.scale,
            }}
          >
            <div
              className="mx-auto shrink-0"
              style={{
                width: SCENE_WIDTH * layout.scale,
                height: SCENE_HEIGHT * layout.scale,
              }}
            >
              <div
                style={{
                  width: SCENE_WIDTH,
                  height: SCENE_HEIGHT,
                  transform: `scale(${layout.scale})`,
                  transformOrigin: "top left",
                }}
              >
              <motion.div
                className="relative"
                style={{
                  width: SCENE_WIDTH,
                  height: SCENE_HEIGHT,
                  x: sceneShake,
                }}
              >
                <motion.div
                  className="pointer-events-none absolute inset-0 z-[5] bg-white"
                  style={{ opacity: burstFlash }}
                />
                {scrollHintVisible && (
                  <motion.div
                    className="pointer-events-none absolute left-1/2 top-3 z-[80] max-w-[min(92vw,280px)] -translate-x-1/2 rounded-full border border-black/10 bg-white/80 px-3 py-1.5 text-center text-[9px] uppercase tracking-[0.16em] text-neutral-500 shadow-[0_10px_30px_rgba(0,0,0,0.04)] backdrop-blur-md sm:left-auto sm:right-6 sm:top-6 sm:max-w-none sm:translate-x-0 sm:px-4 sm:py-2 sm:text-[11px] sm:tracking-[0.22em]"
                    style={{ opacity: hintOpacity }}
                  >
                    Scroll to expand
                  </motion.div>
                )}

                <motion.div
                  className="pointer-events-none absolute inset-x-0 bottom-[8%] z-[70] flex justify-center px-3 sm:inset-0 sm:items-center sm:px-0"
                  style={{ opacity: hintOpacity }}
                >
                  <motion.div
                    className="max-w-[min(92vw,320px)] rounded-full border border-black/10 bg-white/80 px-4 py-2 text-center text-xs leading-snug text-neutral-600 shadow-[0_18px_50px_rgba(0,0,0,0.06)] backdrop-blur-md sm:mt-[250px] sm:max-w-none sm:px-5 sm:py-2.5 sm:text-sm"
                    style={{ y: hintY }}
                  >
                    Scroll through each skill cluster
                  </motion.div>
                </motion.div>

                <svg className="pointer-events-none absolute inset-0 h-full w-full">
                  {mainNodes.map((node) => (
                    <ConnectionLine
                      key={`main-line-${node.id}`}
                      x1={centerNode.x}
                      y1={centerNode.y}
                      x2={node.x}
                      y2={node.y}
                      reveal={mainReveal}
                    />
                  ))}

                  {visualLinks.map(([fromId, toId]) => {
                    const from = getNodeById(fromId);
                    const to = getNodeById(toId);
                    if (!from || !to) return null;

                    return (
                      <VisualLink
                        key={`visual-link-${fromId}-${toId}`}
                        x1={from.x}
                        y1={from.y}
                        x2={to.x}
                        y2={to.y}
                        reveal={mainReveal}
                      />
                    );
                  })}

                  {bloomTimeline.map((item) => (
                    <BloomLineSlot
                      key={`bloom-line-${item.nodeId}-${item.child.id}`}
                      smooth={smooth}
                      item={item}
                    />
                  ))}
                </svg>

                <CenterNode
                  shrink={centerShrink}
                  burst={explosionBurst}
                  centerLarge={layout.centerLarge}
                  centerSmall={layout.centerSmall}
                  burstScale={layout.burstScale}
                  particleLimit={layout.particleLimit}
                />

                {pseudoNodes.map((node, index) => (
                  <PseudoNode
                    key={node.id}
                    x={node.x}
                    y={node.y}
                    size={node.size}
                    reveal={mainReveal}
                    stagger={(index % 6) * 0.04}
                  />
                ))}

                {nodesLeftToRight.map((node, index) => (
                  <MainNodeReveal
                    key={node.id}
                    smooth={smooth}
                    index={index}
                    total={nodesLeftToRight.length}
                    node={node}
                    aggression={aggression}
                    compact={isCompact}
                  />
                ))}

                {bloomTimeline.map((item) => (
                  <BloomChildSlot
                    key={`bloom-child-${item.nodeId}-${item.child.id}`}
                    smooth={smooth}
                    item={item}
                    compact={isCompact}
                  />
                ))}
              </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
