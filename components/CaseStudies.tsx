"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useSpring } from "framer-motion";
import CustomButton from "./CustomButton";
import { caseStudies } from "@/content/caseStudies";

type HoverPreviewProps = {
  title: string;
  category: string;
  slug: string;
  heroImage: string;
};

const HoverPreview = ({
  title,
  category,
  slug,
  heroImage,
}: HoverPreviewProps) => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const previewSize = 320;

  const mouseX = useSpring(0, { stiffness: 260, damping: 24, mass: 0.7 });
  const mouseY = useSpring(0, { stiffness: 260, damping: 24, mass: 0.7 });

  const updatePreviewPosition = (clientX: number, clientY: number) => {
    if (!parentRef.current) return;

    const rect = parentRef.current.getBoundingClientRect();
    const x = clientX - rect.left - previewSize / 2;
    const y = clientY - rect.top - previewSize / 2;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updatePreviewPosition(e.clientX, e.clientY);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    updatePreviewPosition(e.clientX, e.clientY);
    setIsHovering(true);
  };

  return (
    <li className="w-full">
      <Link href={`/case-studies/${slug}`} className="block w-full">
        <div
          ref={parentRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setIsHovering(false)}
          onMouseMove={handleMouseMove}
          className="group relative flex min-h-[150px] w-full flex-col justify-between gap-4 border-b border-black/10 py-6 sm:min-h-[180px] sm:py-8 md:min-h-[220px] md:flex-row md:items-center md:gap-8 md:py-10"
        >
          <h1 className="relative z-10 max-w-4xl text-[clamp(2rem,5vw,4rem)] leading-none tracking-[-0.04em] transition-all duration-300 group-hover:text-gray-500 md:group-hover:-translate-x-2">
            {title}
          </h1>

          <h2 className="relative z-10 text-sm uppercase tracking-[0.18em] text-black/60 transition-all duration-500 group-hover:text-gray-500 sm:text-base md:text-[clamp(1.05rem,2vw,2.2rem)] md:tracking-normal md:group-hover:translate-x-2">
            {category}
          </h2>

          <motion.div
            className="pointer-events-none absolute z-20 hidden overflow-hidden bg-gray-300 shadow-[inset_0_1px_10px_rgba(255,255,255,0.25),0_12px_40px_rgba(255,255,255,0.15)] backdrop-blur-2xl md:block"
            style={{
              width: previewSize,
              height: previewSize,
              left: mouseX,
              top: mouseY,
            }}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{
              opacity: isHovering ? 1 : 0,
              scale: isHovering ? 1 : 0.75,
            }}
            transition={{
              opacity: { duration: 0.22, ease: "easeInOut" },
              scale: { duration: 0.28, ease: "easeInOut" },
            }}
          >
            <Image
              src={heroImage}
              alt={`${title} preview`}
              fill
              className="object-contain"
              sizes="320px"
            />
          </motion.div>
        </div>
      </Link>
    </li>
  );
};

const CaseStudies = () => {
  return (
    <section className="mx-auto flex w-full max-w-[1800px] flex-col px-5 py-16 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-28">
      <h1 className="text-sm font-black tracking-[0.22em] text-slate-700 sm:text-base">
        CASE STUDIES
      </h1>

      <ul className="mt-5 list-none">
        {caseStudies.map((study) => (
          <HoverPreview
            key={study.slug}
            slug={study.slug}
            title={study.title}
            category={study.category}
            heroImage={study.heroImage}
          />
        ))}
      </ul>

      <div className="mt-10 flex w-full items-center justify-center sm:mt-12 ubuntu-regular">
        <Link href="/case-studies">
          <CustomButton className="cursor-pointer">More Studies</CustomButton>
        </Link>
      </div>
    </section>
  );
};

export default CaseStudies;