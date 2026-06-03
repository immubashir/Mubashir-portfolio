"use client";

import Link from "next/link";
import { motion } from "motion/react";
import SiteToggle from "@/components/SiteToggle";
import LabsGridGlow from "@/components/LabsGridGlow";
import { labs } from "@/content/labs";
import LabCard from "@/components/LabCard";

export default function LabsPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#070707] text-white">
      <SiteToggle />

      <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-32 text-center md:px-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, filter: "blur(30px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{
            duration: 2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute inset-0"
        >
          <LabsGridGlow />
        </motion.div>

        <div className="relative z-10 flex flex-col items-center">
          <motion.p
            className="mb-5 text-sm uppercase tracking-[0.35em] text-white/40"
            initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.9,
              delay: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            Experimental work
          </motion.p>

          <h1 className="max-w-5xl text-5xl font-medium tracking-[-0.06em] md:text-7xl lg:text-8xl">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 18, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 1,
                delay: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              Labs for small systems,
            </motion.span>

            <motion.span
              className="block"
              initial={{ opacity: 0, y: 18, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 1,
                delay: 0.56,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              rough ideas,
            </motion.span>

            <motion.span
              className="block"
              initial={{ opacity: 0, y: 18, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 1,
                delay: 0.67,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              and AI-native experiments.
            </motion.span>
          </h1>

          <motion.p
            className="mt-7 max-w-2xl text-base leading-7 text-white/50 md:text-lg"
            initial={{ opacity: 0, y: 12, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 1,
              delay: 0.95,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            A darker corner of the portfolio for prototypes that are still
            evolving — interaction models, tools, utilities, and unfinished
            systems worth exploring.
          </motion.p>

          <motion.div
            className="mt-16 w-full max-w-2xl text-left"
            initial={{
              opacity: 0,
              y: 32,
              scale: 0.97,
              filter: "blur(18px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 1.3,
              delay: 1.15,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
              {labs.map((lab) => (
                <LabCard
                  key={lab.slug}
                  title={lab.title}
                  description={lab.description}
                  status={lab.status}
                  href={`/labs/${lab.slug}`}
                />
              ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}