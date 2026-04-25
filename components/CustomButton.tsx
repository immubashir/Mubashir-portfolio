"use client";

import React from "react";
import { motion } from "framer-motion";

type CustomButtonProps = {
  children: React.ReactNode;
  className?: string;
};

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const buttonVariants = {
  rest: {
    borderRadius: 100,
  },
  hover: {
    borderRadius: 1,
  },
};

const cornerVariants = {
  rest: (offset: { x: number; y: number }) => ({
    x: offset.x,
    y: offset.y,
  }),
  hover: {
    x: 0,
    y: 0,
  },
};

function CornerPlus({
  className,
  offset,
}: {
  className: string;
  offset: { x: number; y: number };
}) {
  return (
    <motion.span
      className={`absolute block h-4 w-4 pointer-events-none ${className}`}
      variants={cornerVariants}
      custom={offset}
      transition={{ duration: 0.7, ease }}
    >
      <span className="absolute border-[1.5px] left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
      <span className="absolute border-[1.5px] left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
    </motion.span>
  );
}

export default function CustomButton({
  children,
  className = "cursor-pointer",
}: CustomButtonProps) {
  return (
    <motion.button
      initial="rest"
      animate="rest"
      whileHover="hover"
      variants={buttonVariants}
      transition={{ duration: 0.2, ease }}
      className={`
        relative flex h-14 w-80 items-center justify-center
        border-[1.5px] border-black bg-transparent text-black
        overflow-visible hover:bg-black tranition-all duration-500 group
        ${className}
      `}
    >
      {/* top-left */}
      <CornerPlus
        className="-left-2 -top-2"
        offset={{ x: -14, y: -14 }}
      />

      {/* top-right */}
      <CornerPlus
        className="-right-2 -top-2"
        offset={{ x: 14, y: -14 }}
      />

      {/* bottom-left */}
      <CornerPlus
        className="-left-2 -bottom-2"
        offset={{ x: -14, y: 14 }}
      />

      {/* bottom-right */}
      <CornerPlus
        className="-right-2 -bottom-2"
        offset={{ x: 14, y: 14 }}
      />

      <span className="relative z-10 text-[18px] font-medium group-hover:text-white transition-all duration-500 ubuntu-bold">
        {children}
      </span>
    </motion.button>
  );
}