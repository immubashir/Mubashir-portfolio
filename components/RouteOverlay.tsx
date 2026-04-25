"use client";

import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function RouteOverlay() {
  const pathname = usePathname();
  const prevPath = useRef(pathname);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (prevPath.current !== pathname) {
      setIsTransitioning(true);

      const timer = window.setTimeout(() => {
        setIsTransitioning(false);
      }, 650);

      prevPath.current = pathname;

      return () => window.clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          key={pathname}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.65, ease }}
          className="pointer-events-none fixed inset-0 z-[9999] bg-[#171717]"
        />
      )}
    </AnimatePresence>
  );
}