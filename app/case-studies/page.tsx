"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { caseStudies } from "@/content/caseStudies";
import Image from "next/image";
import { motion } from "motion/react";

const words = ["Crafting", "experiences", "that", "matter"];

export default function CaseStudiesPage() {
  return (
    <>
      <div className="sticky top-0 z-50 flex w-full justify-center px-3 pt-4 sm:px-4 lg:px-6">
        <Navbar />
      </div>

      <main className="flex min-h-screen items-center justify-center px-6 md:px-12 lg:px-20">
        <section className="mx-auto max-w-6xl pb-20 pt-32">
          <motion.h1
            className="mt-42 text-3xl md:text-5xl"
            aria-label="Crafting experiences that matter"
          >
            {words.map((word, index) => (
              <motion.span
                key={word}
                className={`mr-3 inline-block ${
                  word === "Crafting"
                    ? "ubuntu-regular italic"
                    : "outfit-bold"
                }`}
                initial={{
                  opacity: 0,
                  y: 42,
                  rotate: index === 0 ? -4 : 0,
                  filter: "blur(10px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotate: 0,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 2.1 + index * 0.12,
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="mt-6 max-w-2xl text-base leading-7 text-black/65 md:text-lg lg:text-center"
            initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
              delay: 2.55,
            }}
          >
            A curated collection of product, AI, and interface design case
            studies focused on human-centered systems and thoughtful interaction
            design.
          </motion.p>

          <motion.div
            className="mt-10 flex w-full items-center justify-center overflow-hidden"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
              delay: 2.75,
            }}
          >
            <Image
              src="/scroll.svg"
              alt="Scroll-Down"
              height={100}
              width={600}
              className="object-fill"
            />
          </motion.div>

          <div className="mt-16 grid gap-6 md:grid-cols-1">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.slug}
                initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.75,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 2.0 + index * 0.12,
                }}
              >
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="group relative block overflow-hidden rounded-2xl border border-black/10 p-6 shadow-xl shadow-black/20"
                >
                  <div className="relative h-120 w-full overflow-hidden rounded-xl bg-white">
                    <Image
                      src={study.heroImage}
                      alt={study.title}
                      fill
                      className="relative object-cover"
                    />
                  </div>

                  <div className="bottom-10 flex w-full flex-col items-center justify-center rounded-2xl">
                    <p className="text-sm uppercase tracking-[0.18em] text-black/40 transition-all duration-300 group-hover:text-white/60">
                      {study.category}
                    </p>

                    <h2 className="mt-4 text-3xl font-semibold text-black transition-all duration-300 group-hover:text-white">
                      {study.title}
                    </h2>

                    <div className="mt-6 text-sm text-black/45 transition group-hover:text-white">
                      View case study →
                    </div>

                    <div
                      style={{ backgroundColor: study.tint }}
                      className="absolute -z-10 aspect-square h-48 w-48 translate-y-200 rounded-full opacity-50 blur-xl transition-all duration-900 group-hover:translate-y-0 group-hover:scale-[5]"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}