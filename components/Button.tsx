"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const MoreStudiesButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full flex items-center justify-center mt-12 ubuntu-regular">
      <motion.button
        initial="rest"
        animate={isHovered ? "hover" : "rest"}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileTap={{ scale: 0.97 }}
        className={`relative flex items-center justify-center border rounded-full w-48 h-12 cursor-pointer transition-colors duration-300 ${
          isHovered ? "overflow-hidden border-violet-500" : "overflow-visible"
        }`}
      >
        <motion.span
          variants={{
            rest: { color: "#000000" },
            hover: { color: "#ffffff" },
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative z-20 text-lg"
        >
          More Studies
        </motion.span>

        <motion.div
          variants={{
            rest: {
              width: 22,
              height: 22,
              x: 70,
              y: -18,
              borderRadius: 999,
            },
            hover: {
              width: 260,
              height: 260,
              x: 0,
              y: 0,
              borderRadius: 999,
            },
          }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 22,
            mass: 0.8,
          }}
          className="absolute z-10 bg-violet-500"
          style={{
            top: "50%",
            left: "50%",
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
      </motion.button>
    </div>
  );
};

export default MoreStudiesButton;