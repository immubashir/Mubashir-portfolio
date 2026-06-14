"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "motion/react";

const lines = [
  "I design what I build.",
  "Calm interfaces for complex systems.",
  "No handoff. No loss in translation.",
];

const About = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  const isInView = useInView(textRef, {
    once: false,
    amount: 0.35,
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [70, -70]);

  return (
    <section
      ref={sectionRef}
      className="mx-auto flex min-h-screen w-full max-w-[1800px] flex-col items-center justify-center gap-10 px-5 py-20 sm:px-6 md:gap-14 md:px-10 lg:flex-row lg:gap-16 lg:px-16 xl:px-20 2xl:gap-24 2xl:px-28"
    >
      <div className="relative aspect-[0.95/1] w-full max-w-[640px] overflow-hidden bg-neutral-300 sm:rounded-[10px] lg:w-[46%] lg:max-w-none 2xl:w-[44%]">
        <motion.div style={{ y: imageY }} className="absolute inset-0 scale-[1.2] sm:scale-[1.35] lg:scale-[1.5] 2xl:scale-[1.7]">
          <Image
            src="/Me_img_2.png"
            alt="Mubashir portrait"
            fill
            className="object-contain"
            priority
          />
        </motion.div>
      </div>

      <div ref={textRef} className="w-full max-w-4xl lg:w-[54%] 2xl:max-w-5xl">
        <h1 className="outfit-light 
        text-[clamp(2rem,4vw,4rem)] leading-[1.05] tracking-[-0.04em]">
          {lines.map((line, index) => (
            <span key={index} className="block overflow-hidden py-1">
              <motion.span
                className="block"
                initial={{
                  y: "120%",
                  opacity: 0,
                  rotate: index % 2 === 0 ? 3 : -3,
                  filter: "blur(6px)",
                }}
                animate={
                  isInView
                    ? {
                        y: "0%",
                        opacity: 1,
                        rotate: 0,
                        filter: "blur(0px)",
                      }
                    : {
                        y: "120%",
                        opacity: 0,
                      }
                }
                transition={{
                  duration: 1.2,
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ transformOrigin: "left bottom" }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
};

export default About;
