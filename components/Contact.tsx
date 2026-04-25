"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

const Contact = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.45, 1], [-140, 0, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.45], [0.2, 0.65, 1]);
  const blurValue = useTransform(scrollYProgress, [0, 0.35], [10, 0]);

  const filter = useMotionTemplate`blur(${blurValue}px)`;

  return (
    <motion.section
      ref={sectionRef}
      style={{ y, opacity, filter }}
      className="relative z-0 overflow-hidden px-5 pb-20 pt-24 sm:px-6 md:px-10 md:pb-24 md:pt-32 lg:px-16 lg:pt-40 xl:px-20 2xl:px-28"
    >
      <motion.div className="relative z-0 mx-auto max-w-[1800px]">
        <div className="mx-auto max-w-6xl rounded-[28px] border border-black/10 bg-black/5 p-6 text-black backdrop-blur-sm sm:p-8 md:rounded-[32px] md:p-12 lg:p-14 2xl:max-w-7xl 2xl:p-16">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-black/50 sm:text-sm">
            Contact
          </p>

          <h2 className="max-w-4xl text-[clamp(2rem,4.5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            Let’s build something together!
          </h2>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-black/65 sm:text-base md:mt-6 md:text-lg">
            Whether it’s an internship, collaboration, freelance work, or just
            a good conversation around design and ML — I’m open to it.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
            <a
              href="mailto:mubashiruddinkhaja03@gmail.com"
              className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-6 py-3 text-sm font-medium text-black transition-transform duration-300 hover:scale-[1.03]"
            >
              Email Me
            </a>

            <a
              href="https://linkedin.com/in/mubashir-uddin"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-black/15 px-6 py-3 text-sm font-medium text-black transition-colors duration-300 hover:bg-black/10"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Contact;
