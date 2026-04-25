"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CustomButton from "./CustomButton";
import Image from "next/image";

const topRow = [
  { name: "Next.js", icon: "/Dashboard.png" },
  { name: "React.js", icon: "/Code_to_web.png" },
  { name: "Tailwind CSS", icon: "/Genius_ss.png" },
  { name: "TypeScript", icon: "/Sociogram_img.png" },
];

const bottomRow = [
  { name: "Python", icon: "/Lunacal-1.png" },
  { name: "Flask", icon: "/Lunacal-2.png" },
  { name: "PostgreSQL", icon: "/sumz - Copy.png" },
  { name: "MongoDB", icon: "/threads_img - Copy.png" },
];

const SkillCard = ({ skill }: { skill: { name: string; icon: string } }) => {
  return (
    <div
      className="h-[180px] w-[220px] shrink-0 rounded-[2px] border border-black/5 bg-[#d9d9d9] sm:h-[220px] sm:w-[260px] lg:h-[32vh] lg:min-h-[260px] lg:w-[28rem] 2xl:min-h-[320px]"
    >

      <div className="relative h-full w-full overflow-hidden rounded-[px]">
        <Image
          src={skill.icon}
          alt={skill.name}
          fill
          className="object-cover" // or object-cover
        />
      </div>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const topX = useTransform(scrollYProgress, [0, 1], [-35, 35]);
  const bottomX = useTransform(scrollYProgress, [0, 1], [35, -35]);

  const topItems = [...topRow, ...topRow];
  const bottomItems = [...bottomRow, ...bottomRow];

  return (
    <section
      ref={sectionRef}
      className="relative z-10 h-[calc(100vh+3rem)] min-h-[760px] w-full overflow-hidden sm:h-[calc(100vh+5rem)] lg:h-[calc(100vh+8rem)]"
    >
      {/* <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(#cfcfcf 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      /> */}

      <div className="relative mx-auto flex h-full max-w-[1800px] flex-col justify-center gap-6 px-4 sm:gap-8 sm:px-6 md:px-10 lg:gap-[6vh] lg:px-16 xl:px-20 2xl:px-28">
        <motion.div style={{ x: topX }} className="-ml-48 flex w-max gap-4 sm:gap-6 lg:gap-12">
          {topItems.map((skill, index) => (
            <SkillCard key={`top-${skill.name}-${index}`} skill={skill} />
          ))}
        </motion.div>

        <motion.div style={{ x: bottomX }} className="-ml-62 flex w-max gap-4 sm:gap-6 lg:gap-12">
          {bottomItems.map((skill, index) => (
            <SkillCard key={`bottom-${skill.name}-${index}`} skill={skill} />
          ))}
        </motion.div>

        <div className="flex items-center justify-center pt-2 sm:pt-4">
          <a href="/Mubashir_Resume_AI.pdf" download>
            <CustomButton>Download Resume</CustomButton>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Skills;
