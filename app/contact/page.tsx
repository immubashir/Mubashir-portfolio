"use client";

import Link from "next/link";
import { motion } from "motion/react";
import CustomButton from "@/components/CustomButton";
import Navbar from "@/components/Navbar";

const socials = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/mubashir-uddin/",
  },
  {
    name: "GitHub",
    href: "https://github.com/immubashir",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/_mubashir.03_/",
  },
];

const contactOptions = [
  {
    label: "Email",
    value: "Let’s start a conversation",
    href: "mailto:khajamubashiruddin@gmail.com",
  },
  {
    label: "Location",
    value: "Buffalo, NY · Open to relocate",
    href: null,
  },
  {
    label: "Focus",
    value: "AI/ML · Frontend · Human-centered products",
    href: null,
  },
];

const lines = [
  "Let’s build",
  "something",
  "together!",
];

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ContactPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#edf1f1] px-5 py-28 text-[#151515] sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-28">
      <Navbar/>
      <section className="mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-[1800px] flex-col justify-between gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end"
        >
          <div>
            <p className="mb-6 text-xs font-black uppercase tracking-[0.35em] text-black/45">
              Contact
            </p>

            <motion.h1
            className="max-w-5xl text-[clamp(3.5rem,10vw,12rem)] font-black leading-[0.86] tracking-[-0.08em]"
            aria-label="Let’s build something together!"
            >
            {lines.map((line, lineIndex) => (
                <div key={lineIndex} className="block overflow-hidden">
                {line.split("").map((char, index) => {
                    const globalIndex =
                    lines.slice(0, lineIndex).join("").length + index;

                    return (
                    <motion.span
                        key={`${char}-${index}`}
                        className="inline-block"
                        initial={{
                        opacity: 0,
                        y: -80,
                        x: -24,
                        rotate: -8,
                        }}
                        animate={{
                        opacity: 1,
                        y: 0,
                        x: 0,
                        rotate: 0,
                        }}
                        transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 16,
                        mass: 0.6,
                        delay: 1.5 + globalIndex * 0.025,
                        }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                    );
                })}
                </div>
            ))}
            </motion.h1>
          </div>

          <div className="max-w-xl lg:ml-auto">
            <Link
              href="mailto:mubashiruddinkhaja03@gmail.com"
              className="cursor-pointer"
            >
              <CustomButton>
                Say Hello
              </CustomButton>
            </Link>
          </div>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-3">
          {contactOptions.map((item, index) => {
            const content = (
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.15 + index * 0.08, ease }}
                className="group min-h-[220px] rounded-[2rem] border border-black/10 bg-white/45 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/70"
              >
                <div className="mb-20 flex items-center justify-between">
                  <p className="text-xs font-black uppercase tracking-[0.28em] text-black/40">
                    {item.label}
                  </p>

                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/60 text-sm transition duration-300 group-hover:bg-black group-hover:text-white">
                    ↗
                  </span>
                </div>

                <p className="max-w-sm text-2xl font-semibold leading-tight tracking-[-0.04em] text-black/80">
                  {item.value}
                </p>
              </motion.div>
            );

            return item.href ? (
              <Link key={item.label} href={item.href}>
                {content}
              </Link>
            ) : (
              <div key={item.label}>{content}</div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease }}
          className="grid gap-5 rounded-[2rem] border border-black/10 bg-white/35 p-4 backdrop-blur-xl md:grid-cols-3"
        >
          {socials.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-[1.5rem] border border-black/10 px-5 py-5 text-sm font-semibold text-black/60 transition duration-300 hover:text-white"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-black transition-transform duration-500 ease-out group-hover:scale-x-100" />
              <span className="relative z-10 flex items-center justify-between">
                {social.name}
                <span className="transition duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </span>
            </Link>
          ))}
        </motion.div>
      </section>
    </main>
  );
}