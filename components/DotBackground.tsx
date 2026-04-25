"use client";

import { useEffect, useRef } from "react";

export default function DotBackground() {
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;

    let mouseX = el.offsetWidth / 2;
    let mouseY = el.offsetHeight / 2;

    let currentX = mouseX;
    let currentY = mouseY;

    let repelX = 0;
    let repelY = 0;

    let animationFrame: number;

    const lerp = (start: number, end: number, t: number) =>
      start + (end - start) * t;

    const handleMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();

      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const animate = () => {
      currentX = lerp(currentX, mouseX, 0.08);
      currentY = lerp(currentY, mouseY, 0.08);

      const centerX = el.offsetWidth / 2;
      const centerY = el.offsetHeight / 2;

      const dx = currentX - centerX;
      const dy = currentY - centerY;

      repelX = lerp(repelX, dx * -0.018, 0.08);
      repelY = lerp(repelY, dy * -0.018, 0.08);

      el.style.setProperty("--mouse-x", `${currentX}px`);
      el.style.setProperty("--mouse-y", `${currentY}px`);
      el.style.setProperty("--repel-x", `${repelX}px`);
      el.style.setProperty("--repel-y", `${repelY}px`);

      animationFrame = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", handleMove);
    animate();

    return () => {
      window.removeEventListener("pointermove", handleMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <div ref={bgRef} className="dot-bg" />;
}