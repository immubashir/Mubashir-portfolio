"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

type HeroImageScrollerProps = {
  introComplete: boolean;
};

const HeroImageScroller = ({ introComplete }: HeroImageScrollerProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [screenType, setScreenType] = useState<"mobile" | "tablet" | "desktop">("desktop");

  useEffect(() => {
    const updateScreenType = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setScreenType("mobile");
      } else if (width < 1024) {
        setScreenType("tablet");
      } else {
        setScreenType("desktop");
      }
    };

    updateScreenType();
    window.addEventListener("resize", updateScreenType);

    return () => window.removeEventListener("resize", updateScreenType);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const inputRange =
    screenType === "desktop"
      ? [0, 0.18, 0.42, 1]
      : [0, 0.08, 0.28, 1];

  const finalWidth =
    screenType === "mobile"
      ? 320
      : screenType === "tablet"
      ? 700
      : 1120;

  const finalHeight =
    screenType === "mobile"
      ? 420
      : screenType === "tablet"
      ? 460
      : 500;

  const initialWidth = screenType === "mobile" ? 140 : 180;
  const initialHeight = screenType === "mobile" ? 46 : 56;

  const rawWidth = useTransform(
    scrollYProgress,
    inputRange,
    [initialWidth, initialWidth, finalWidth, finalWidth]
  );

  const rawHeight = useTransform(
    scrollYProgress,
    inputRange,
    [initialHeight, initialHeight, finalHeight, finalHeight]
  );

  const rawRadius = useTransform(scrollYProgress, inputRange, [80, 80, 10, 2]);
  const rawY = useTransform(scrollYProgress, inputRange, [250, 60, 50, 50]);

  const width = useSpring(rawWidth, {
    stiffness: 115,
    damping: 22,
    mass: 0.85,
  });

  const height = useSpring(rawHeight, {
    stiffness: 115,
    damping: 22,
    mass: 0.85,
  });

  const borderRadius = useSpring(rawRadius, {
    stiffness: 115,
    damping: 22,
    mass: 0.85,
  });

  const y = useSpring(rawY, {
    stiffness: 125,
    damping: 20,
    mass: 0.8,
  });

  const textOpacityRaw = useTransform(
    scrollYProgress,
    [0.34, 0.46, 1],
    [0, 1, 1]
  );

  const textYRaw = useTransform(
    scrollYProgress,
    [0.34, 0.46, 1],
    [16, 0, 0]
  );

  const textOpacity = useSpring(textOpacityRaw, {
    stiffness: 140,
    damping: 24,
    mass: 0.8,
  });

  const textY = useSpring(textYRaw, {
    stiffness: 140,
    damping: 24,
    mass: 0.8,
  });

  const line1Progress = useSpring(
    useTransform(scrollYProgress, [0.46, 0.68], [0, 100]),
    {
      stiffness: 120,
      damping: 26,
      mass: 0.8,
    }
  );

  const line2Progress = useSpring(
    useTransform(scrollYProgress, [0.56, 0.78], [0, 100]),
    {
      stiffness: 120,
      damping: 26,
      mass: 0.8,
    }
  );

  const line3Progress = useSpring(
    useTransform(scrollYProgress, [0.66, 0.88], [0, 100]),
    {
      stiffness: 120,
      damping: 26,
      mass: 0.8,
    }
  );

  const line4Progress = useSpring(
    useTransform(scrollYProgress, [0.76, 0.92], [0, 100]),
    {
      stiffness: 120,
      damping: 26,
      mass: 0.8,
    }
  );

  const line5Progress = useSpring(
    useTransform(scrollYProgress, [0.86, 0.98], [0, 100]),
    {
      stiffness: 120,
      damping: 26,
      mass: 0.8,
    }
  );
  const line1Fill = useTransform(
    line1Progress,
    (v) => `linear-gradient(to right, white ${v}%, rgba(0,0,0,0.32) ${v}%)`
  );

  const line2Fill = useTransform(
    line2Progress,
    (v) => `linear-gradient(to right, white ${v}%, rgba(0,0,0,0.32) ${v}%)`
  );

  const line3Fill = useTransform(
    line3Progress,
    (v) => `linear-gradient(to right, white ${v}%, rgba(0,0,0,0.32) ${v}%)`
  );

  const line4Fill = useTransform(
    line4Progress,
    (v) => `linear-gradient(to right, white ${v}%, rgba(0,0,0,0.32) ${v}%)`
  );

  const line5Fill = useTransform(
    line5Progress,
    (v) => `linear-gradient(to right, white ${v}%, rgba(0,0,0,0.32) ${v}%)`
  );



  return (
    <section className="relative w-full">
      <div
        ref={ref}
        className="pointer-events-none relative -mt-[100vh] h-[240vh] w-full"
      >
        <motion.div
          initial={false}
          animate={{
            opacity: introComplete ? 1 : 0,
            filter: introComplete ? "blur(0px)" : "blur(8px)",
          }}
          transition={{
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="sticky top-0 flex h-screen items-center justify-center overflow-visible px-4 sm:px-6 md:px-8"
        >
          <motion.div
            style={{
              width,
              height,
              borderRadius,
              y,
            }}
            className="relative overflow-hidden bg-black/80 will-change-transform"
          >
            <Image
              src="/Me_pic_1.png"
              alt=""
              fill
              priority
              sizes="(max-width: 767px) 320px, (max-width: 1023px) 700px, 1120px"
              className="scale-110 object-cover object-center blur-2xl opacity-40"
            />

            <Image
              src="/Me_pic_1.png"
              alt="Mubashir portrait"
              fill
              priority
              sizes="(max-width: 767px) 320px, (max-width: 1023px) 700px, 1120px"
              className="object-contain object-center"
            />

            <motion.div
              style={{
                opacity: textOpacity,
                y: textY,
              }}
              className="
                absolute right-4 top-1/2 z-20 max-w-[180px] -translate-y-1/2 text-left
                text-4xl leading-snug sm:right-6 sm:max-w-[220px] sm:text-base
                md:right-8 md:max-w-[260px] md:text-lg
                lg:right-40 lg:max-w-[320px] lg:text-5xl font-bold
              "
            >
              <div className="space-y-1 sm:space-y-1.5">
                <motion.p
                  style={{
                    backgroundImage: line1Fill,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                  className="font-medium tracking-[-0.03em]"
                >
                  Scroll down
                </motion.p>

                <motion.p
                  style={{
                    backgroundImage: line2Fill,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                  className="font-medium tracking-[-0.03em]"
                >
                  to explore
                </motion.p>

                <motion.p
                  style={{
                    backgroundImage: line3Fill,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                  className="font-medium tracking-[-0.03em]"
                >
                  my work
                </motion.p>
                <motion.p
                  style={{
                    backgroundImage: line4Fill,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                  className="font-medium tracking-[-0.03em]"
                >
                  and know more
                </motion.p>
                <motion.p
                  style={{
                    backgroundImage: line5Fill,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                  className="font-medium tracking-[-0.03em]"
                >
                  about me.
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroImageScroller;