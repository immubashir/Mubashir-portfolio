"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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

function ConnectionLine({
  x1,
  y1,
  x2,
  y2,
  active = false,
  visible = true,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  active?: boolean;
  visible?: boolean;
}) {
  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={active ? "rgba(24,24,27,0.9)" : "rgba(82,82,91,0.42)"}
      strokeWidth={active ? 1.55 : 1.1}
      strokeDasharray={active ? "0" : "4 8"}
      strokeLinecap="round"
      initial={false}
      animate={{
        pathLength: visible ? 1 : 0,
        opacity: visible ? 1 : 0,
      }}
      transition={
        visible
          ? {
              delay: 0.18,
              duration: 0.38,
              ease: [0.23, 1, 0.32, 1] as const,
            }
          : {
              duration: 0.18,
              ease: [0.4, 0, 1, 1] as const,
            }
      }
    />
  );
}

function VisualLink({
  x1,
  y1,
  x2,
  y2,
  visible = true,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  visible?: boolean;
}) {
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
      initial={false}
      animate={{
        pathLength: visible ? 1 : 0,
        opacity: visible ? 1 : 0,
      }}
      transition={
        visible
          ? {
              delay: 0.24,
              duration: 0.42,
              ease: [0.23, 1, 0.32, 1] as const,
            }
          : {
              duration: 0.16,
              ease: [0.4, 0, 1, 1] as const,
            }
      }
    />
  );
}

function BloomLine({
  x1,
  y1,
  x2,
  y2,
  delay = 0,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay?: number;
}) {
  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="rgba(38,38,38,0.55)"
      strokeWidth={1.1}
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      exit={{ pathLength: 0, opacity: 0 }}
      transition={{
        delay: delay + 0.08,
        duration: 0.26,
        ease: [0.2, 0.8, 0.2, 1] as const,
      }}
    />
  );
}

function CenterNode({
  expanded,
  onToggle,
}: {
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      className="absolute cursor-pointer outline-none"
      style={{
        left: centerNode.x,
        top: centerNode.y,
        zIndex: 60,
      }}
      initial={false}
      whileTap={{ scale: 0.98 }}
      animate={expanded ? { y: 0 } : { y: [0, -8, 0] }}
      transition={
        expanded
          ? {
              duration: 0.25,
              ease: [0.22, 1, 0.36, 1] as const,
            }
          : {
              duration: 4.2,
              ease: "easeInOut",
              repeat: Infinity,
            }
      }
    >
      <motion.div
        className="absolute left-1/2 top-1/2 rounded-full border border-neutral-900 bg-black transition-colors duration-500 hover:border-transparent hover:bg-black/20"
        initial={false}
        animate={{
          width: expanded ? 32 : 170,
          height: expanded ? 32 : 170,
          x: "-50%",
          y: "-50%",
          boxShadow: expanded
            ? "0 0 0 10px rgba(0,0,0,0.04), 0 12px 30px rgba(0,0,0,0.12)"
            : "0 0 0 20px rgba(0,0,0,0.055), 0 30px 80px rgba(0,0,0,0.18)",
        }}
        transition={{
          type: "spring",
          stiffness: 280,
          damping: 20,
          mass: 0.9,
        }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center"
        initial={false}
        animate={{
          scale: expanded ? 0.72 : 1,
        }}
        transition={{
          duration: 0.42,
          ease: [0.22, 1, 0.36, 1] as const,
        }}
      >
        <motion.div
          className="whitespace-nowrap text-[20px] font-medium tracking-[0.08em] text-white"
          initial={false}
          animate={{
            opacity: expanded ? 0 : 1,
            y: expanded ? -6 : 0,
            scale: expanded ? 0.72 : 1,
            textShadow: expanded
              ? "0 0 0 rgba(255,255,255,0)"
              : "0 0 18px rgba(255,255,255,0.45)",
          }}
          transition={{
            duration: 0.28,
            ease: [0.22, 1, 0.36, 1] as const,
          }}
        >
          {centerNode.label}
        </motion.div>

        <AnimatePresence mode="wait">
          {!expanded && (
            <motion.div
              key="expand-hint"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 0.7, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.22 }}
              className="mt-2 whitespace-nowrap text-[10px] uppercase tracking-[0.24em] text-white/70"
            >
              click to expand
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border border-neutral-900/10"
            initial={{
              width: 32,
              height: 32,
              opacity: 0.22,
              x: "-50%",
              y: "-50%",
              scale: 1,
            }}
            animate={{
              width: 90,
              height: 90,
              opacity: 0,
              x: "-50%",
              y: "-50%",
              scale: 1.08,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function PseudoNode({
  x,
  y,
  size,
  visible,
}: {
  x: number;
  y: number;
  size: number;
  visible: boolean;
}) {
  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        zIndex: 12,
      }}
      initial={false}
      animate={{
        opacity: visible ? 0.9 : 0,
        scale: visible ? 1 : 0.6,
      }}
      transition={{
        delay: visible ? 0.22 : 0,
        duration: 0.34,
        ease: [0.22, 1, 0.36, 1] as const,
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
  active,
  dimmed,
  visible,
  onClick,
}: {
  node: MainNode;
  active: boolean;
  dimmed: boolean;
  visible: boolean;
  onClick: () => void;
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

  const textGlowMap: Record<string, string> = {
    design: "0 0 18px rgba(168,85,247,0.42)",
    frontend: "0 0 18px rgba(59,130,246,0.42)",
    ml: "0 0 18px rgba(236,72,153,0.42)",
    research: "0 0 18px rgba(245,158,11,0.42)",
    systems: "0 0 18px rgba(16,185,129,0.42)",
    product: "0 0 18px rgba(249,115,22,0.42)",
  };

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="absolute outline-none"
      style={{
        left: node.x,
        top: node.y,
        zIndex: active ? 45 : 30,
        pointerEvents: visible ? "auto" : "none",
      }}
      initial={false}
      animate={{
        opacity: visible ? (dimmed ? 0.26 : 1) : 0,
        scale: visible ? (active ? 1.12 : 1) : 0.08,
        x: visible ? 0 : centerNode.x - node.x,
        y: visible ? 0 : centerNode.y - node.y,
      }}
      whileHover={visible ? { scale: active ? 1.15 : 1.08 } : {}}
      whileTap={visible ? { scale: 0.97 } : {}}
      transition={
        visible
          ? {
              type: "spring",
              stiffness: 360,
              damping: 18,
              mass: 0.78,
            }
          : {
              duration: 0.24,
              ease: [0.4, 0, 1, 1] as const,
            }
      }
    >
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 118,
          height: 118,
          background: glowMap[node.id] ?? glowMap.design,
          zIndex: 0,
          filter: "blur(7px)",
        }}
        initial={false}
        animate={{
          opacity: visible ? (dimmed ? 0.08 : active ? 1 : 0.76) : 0,
          scale: active ? [1.05, 1.18, 1.05] : [0.98, 1.08, 0.98],
        }}
        transition={{
          duration: active ? 2.4 : 3.4,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      <motion.div
        className={`absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border ${
          active ? "border-black bg-black" : "border-neutral-900 bg-neutral-900"
        }`}
        style={{ zIndex: 1 }}
        initial={false}
        animate={{
          boxShadow: active
            ? "0 0 0 12px rgba(0,0,0,0.045), 0 14px 28px rgba(0,0,0,0.16)"
            : "0 0 0 7px rgba(0,0,0,0.03), 0 10px 20px rgba(0,0,0,0.09)",
          scale: active ? 1.02 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 22,
          mass: 0.86,
        }}
      />

      <motion.div
        className={`absolute left-1/2 top-[20px] -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-sm tracking-wide ${
          active ? "text-black" : "text-neutral-600"
        }`}
        style={{
          zIndex: 2,
          textShadow: active
            ? textGlowMap[node.id] ?? textGlowMap.design
            : dimmed
            ? "none"
            : "0 0 14px rgba(0,0,0,0.12)",
        }}
        initial={false}
        animate={{
          opacity: visible ? 1 : 0,
          y: visible ? 0 : -8,
          scale: visible ? 1 : 0.96,
          backgroundColor: active
            ? "rgba(255,255,255,0.72)"
            : "rgba(255,255,255,0)",
          boxShadow: active
            ? "0 10px 28px rgba(0,0,0,0.06)"
            : "0 0 0 rgba(0,0,0,0)",
          backdropFilter: active ? "blur(10px)" : "blur(0px)",
        }}
        transition={{
          delay: visible ? 0.06 : 0,
          duration: 0.24,
          ease: [0.22, 1, 0.36, 1] as const,
        }}
      >
        {node.label}
      </motion.div>
    </motion.button>
  );
}

function BloomChild({
  x,
  y,
  label,
  delay,
}: {
  x: number;
  y: number;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{
        left: x,
        top: y,
        zIndex: 40,
      }}
      initial={{ opacity: 0, scale: 0.42, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.72, y: 4 }}
      transition={{
        delay,
        type: "spring",
        stiffness: 260,
        damping: 18,
        mass: 0.8,
      }}
    >
      <div className="flex flex-col items-center gap-2">
        <div className="h-3.5 w-3.5 rounded-full border border-neutral-700 bg-neutral-800 shadow-[0_6px_16px_rgba(0,0,0,0.08)]" />
        <div className="rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-[12px] text-neutral-700 shadow-[0_8px_20px_rgba(0,0,0,0.05)]">
          {label}
        </div>
      </div>
    </motion.div>
  );
}

export default function Details() {
  const [expanded, setExpanded] = useState(false);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  const activeNode = useMemo(
    () => mainNodes.find((node) => node.id === activeNodeId) ?? null,
    [activeNodeId]
  );

  const bloomPositions = useMemo(() => {
    if (!activeNode || !expanded) return [];
    return getBloomPositions(activeNode, activeNode.children.length, 102);
  }, [activeNode, expanded]);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateScale = () => {
      if (!containerRef.current) return;

      const availableWidth = containerRef.current.clientWidth;
      const safeWidth = Math.max(availableWidth - 16, 280);
      const nextScale = Math.min(1, safeWidth / SCENE_WIDTH);

      setScale(nextScale);
    };

    updateScale();

    const observer = new ResizeObserver(() => {
      updateScale();
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  const handleCenterToggle = () => {
    setHasInteracted(true);

    setExpanded((prev) => {
      const next = !prev;
      if (!next) setActiveNodeId(null);
      return next;
    });
  };

  const handleNodeClick = (nodeId: string) => {
    setHasInteracted(true);
    setActiveNodeId((prev) => (prev === nodeId ? null : nodeId));
  };

  return (
    <section className="relative w-full overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:px-10">
      <div ref={containerRef} className="mx-auto w-full max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex w-full justify-center"
          style={{
            minHeight: SCENE_HEIGHT * scale,
          }}
        >
          <div
            className="origin-top"
            style={{
              width: SCENE_WIDTH,
              height: SCENE_HEIGHT,
              transform: `scale(${scale})`,
            }}
          >
            <div
              className="relative"
              style={{
                width: SCENE_WIDTH,
                height: SCENE_HEIGHT,
              }}
            >
              <AnimatePresence>
                {!hasInteracted && (
                  <motion.div
                    className="pointer-events-none absolute right-6 top-6 z-[80] rounded-full border border-black/10 bg-white/70 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-neutral-500 shadow-[0_10px_30px_rgba(0,0,0,0.04)] backdrop-blur-md"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    Click nodes to expand
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {!hasInteracted && !expanded && (
                  <motion.div
                    className="pointer-events-none absolute inset-0 z-[70] flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="mt-[250px] rounded-full border border-black/10 bg-white/75 px-5 py-2.5 text-sm text-neutral-600 shadow-[0_18px_50px_rgba(0,0,0,0.06)] backdrop-blur-md"
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{
                        delay: 0.2,
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      Explore each node to uncover more
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <svg className="pointer-events-none absolute inset-0 h-full w-full">
                {mainNodes.map((node) => (
                  <ConnectionLine
                    key={`main-line-${node.id}`}
                    x1={centerNode.x}
                    y1={centerNode.y}
                    x2={node.x}
                    y2={node.y}
                    active={activeNodeId === node.id}
                    visible={expanded}
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
                      visible={expanded}
                    />
                  );
                })}

                <AnimatePresence>
                  {expanded &&
                    activeNode &&
                    bloomPositions.map((position, index) => (
                      <BloomLine
                        key={`bloom-line-${activeNode.children[index].id}`}
                        x1={activeNode.x}
                        y1={activeNode.y}
                        x2={position.x}
                        y2={position.y}
                        delay={index * 0.03}
                      />
                    ))}
                </AnimatePresence>
              </svg>

              <CenterNode expanded={expanded} onToggle={handleCenterToggle} />

              {pseudoNodes.map((node) => (
                <PseudoNode
                  key={node.id}
                  x={node.x}
                  y={node.y}
                  size={node.size}
                  visible={expanded}
                />
              ))}

              {mainNodes.map((node) => {
                const isActive = activeNodeId === node.id;
                const isDimmed = activeNodeId !== null && !isActive;

                return (
                  <MainNodeDot
                    key={node.id}
                    node={node}
                    active={isActive}
                    dimmed={isDimmed}
                    visible={expanded}
                    onClick={() => handleNodeClick(node.id)}
                  />
                );
              })}

              <AnimatePresence>
                {expanded &&
                  activeNode &&
                  bloomPositions.map((position, index) => (
                    <BloomChild
                      key={activeNode.children[index].id}
                      x={position.x}
                      y={position.y}
                      label={activeNode.children[index].label}
                      delay={index * 0.045}
                    />
                  ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}