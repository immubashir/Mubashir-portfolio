"use client";

import { useEffect, useRef } from "react";
import "locomotive-scroll/dist/locomotive-scroll.css";

type Props = {
  children: React.ReactNode;
};

export default function SmoothScrollProvider({ children }: Props) {
  const locoRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;

    const initScroll = async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;

      if (!mounted) return;

      locoRef.current = new LocomotiveScroll({
        autoStart: true,
        lenisOptions: {
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          lerp: 0.08,
        },
      });
    };

    initScroll();

    const handleResize = () => {
      locoRef.current?.resize?.();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      mounted = false;
      window.removeEventListener("resize", handleResize);
      locoRef.current?.destroy?.();
      locoRef.current = null;
    };
  }, []);

  return <>{children}</>;
}