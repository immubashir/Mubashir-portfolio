"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import SiteToggle from "@/components/SiteToggle";
import type { Lab } from "@/content/labs";

function StatusDot({ status }: { status: "in-progress" | "completed" }) {
  const isInProgress = status === "in-progress";

  return (
    <span className="flex items-center gap-2">
      <span className="relative flex h-2.5 w-2.5">
        {isInProgress && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-35" />
        )}

        <span
          className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
            isInProgress ? "bg-sky-400" : "bg-emerald-400"
          }`}
        />
      </span>

      <span>{isInProgress ? "In Progress" : "Completed"}</span>
    </span>
  );
}

export default function LabDetailClient({ lab }: { lab: Lab }) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#070707] text-white">
      <SiteToggle />

      <section className="mx-auto min-h-screen max-w-6xl px-6 pb-32 pt-40 md:px-10">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/labs"
              className="text-sm text-white/45 transition hover:text-white"
            >
              ← Back to Labs
            </Link>
          </motion.div>

          <div className="mt-24">
            <motion.p
              className="text-sm uppercase tracking-[0.35em] text-white/35"
              initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.9,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {lab.eyebrow}
            </motion.p>

            <motion.h1
              className="mt-5 max-w-5xl text-6xl font-medium tracking-[-0.075em] md:text-8xl lg:text-[9rem]"
              initial={{ opacity: 0, y: 22, filter: "blur(14px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 1.1,
                delay: 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {lab.title}
            </motion.h1>

            <motion.p
              className="mt-8 max-w-3xl text-lg leading-8 text-white/55 md:text-xl md:leading-9"
              initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 1,
                delay: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {lab.description}
            </motion.p>

            <motion.div
              className="mt-14 grid overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.035] sm:grid-cols-3"
              initial={{ opacity: 0, y: 20, filter: "blur(14px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 1.1,
                delay: 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="p-5 sm:p-6">
                <p className="text-xs uppercase tracking-[0.22em] text-white/30">
                  Status
                </p>
                <p className="mt-3 text-sm text-white/75">
                  <StatusDot status={lab.status} />
                </p>
              </div>

              <div className="border-t border-white/10 p-5 sm:border-l sm:border-t-0 sm:p-6">
                <p className="text-xs uppercase tracking-[0.22em] text-white/30">
                  Year
                </p>
                <p className="mt-3 text-sm text-white/75">{lab.year}</p>
              </div>

              <div className="border-t border-white/10 p-5 sm:border-l sm:border-t-0 sm:p-6">
                <p className="text-xs uppercase tracking-[0.22em] text-white/30">
                  Type
                </p>
                <p className="mt-3 text-sm text-white/75">{lab.type}</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="mt-16 grid gap-6 md:grid-cols-2"
            initial={{ opacity: 0, y: 26, filter: "blur(16px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 1.1,
              delay: 0.85,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-7">
              <p className="text-sm uppercase tracking-[0.25em] text-white/35">
                Problem
              </p>
              <p className="mt-5 leading-7 text-white/60">{lab.problem}</p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-7">
              <p className="text-sm uppercase tracking-[0.25em] text-white/35">
                Direction
              </p>
              <p className="mt-5 leading-7 text-white/60">{lab.direction}</p>
            </div>
          </motion.div>

          <motion.section
            className="mt-24"
            initial={{ opacity: 0, y: 28, filter: "blur(16px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 1.1,
              delay: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="mb-10">
              <p className="text-sm uppercase tracking-[0.28em] text-white/35">
                UX Decisions
              </p>
              <h2 className="mt-4 max-w-3xl text-4xl font-medium tracking-[-0.05em] text-white md:text-6xl">
                Three decisions that made the system easier to inspect.
              </h2>
            </div>

            <div className="grid gap-10">
              {lab.decisions.map((decision, index) => (
                <article
                  key={decision.title}
                  className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035]"
                >
                  <div className="relative aspect-[16/9] overflow-hidden border-b border-white/10 bg-[#151515]">
                    <Image
                        src={decision.image}
                        alt={decision.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 1100px"
                        className="object-contain p-6"
                    />
                    </div>

                  <div className="grid gap-8 p-6 md:grid-cols-[220px_1fr] md:p-8">
                    <div>
                      <p className="text-sm text-white/30">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-4 text-3xl font-medium tracking-[-0.04em] text-white">
                        {decision.title}
                      </h3>
                    </div>

                    <div className="grid gap-6">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                          Problem
                        </p>
                        <p className="mt-3 leading-7 text-white/55">
                          {decision.problem}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                          Solution
                        </p>
                        <p className="mt-3 leading-7 text-white/55">
                          {decision.solution}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                          Impact
                        </p>
                        <p className="mt-3 leading-7 text-white/55">
                          {decision.impact}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </motion.section>

          <motion.section
            className="mt-24"
            initial={{ opacity: 0, y: 28, filter: "blur(16px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 1.1,
              delay: 1.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="mb-10">
              <p className="text-sm uppercase tracking-[0.28em] text-white/35">
                Interfaces
              </p>
              <h2 className="mt-4 max-w-3xl text-4xl font-medium tracking-[-0.05em] text-white md:text-6xl">
                The surfaces that make AI execution visible.
              </h2>
            </div>

            <div className="grid gap-10">
              {lab.interfaces.map((item, index) => {
                const reversed = index % 2 !== 0;

                return (
                  <article
                    key={item.title}
                    className="grid gap-6 rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 md:grid-cols-[1.1fr_0.9fr] md:p-6"
                  >
                    <div
                      className={`relative aspect-[16/10] overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] ${
                        reversed ? "md:order-2" : ""
                      }`}
                    >
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 650px"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-col justify-center p-2 md:p-6">
                      <p className="text-sm text-white/30">
                        {String(index + 1).padStart(2, "0")}
                      </p>

                      <h3 className="mt-4 text-3xl font-medium tracking-[-0.04em] text-white">
                        {item.title}
                      </h3>

                      <p className="mt-5 leading-7 text-white/50">
                        {item.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </motion.section>

          <motion.section
            className="mt-24"
            initial={{ opacity: 0, y: 28, filter: "blur(16px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 1.1,
              delay: 1.2,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="mb-10">
              <p className="text-sm uppercase tracking-[0.28em] text-white/35">
                Execution Timeline
              </p>
              <h2 className="mt-4 max-w-3xl text-4xl font-medium tracking-[-0.05em] text-white md:text-6xl">
                Turning an AI response into a visible sequence.
              </h2>
            </div>

            <div className="grid gap-6">
              {lab.timeline.map((step, index) => {
                const reversed = index % 2 !== 0;

                return (
                  <article
                    key={step.title}
                    className="grid gap-6 rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 md:grid-cols-[0.9fr_1.1fr] md:p-6"
                  >
                    <div className="flex flex-col justify-center p-2 md:p-6">
                      <p className="text-sm text-white/30">
                        {String(index + 1).padStart(2, "0")}
                      </p>

                      <h3 className="mt-4 text-3xl font-medium tracking-[-0.04em] text-white">
                        {step.title}
                      </h3>

                      <p className="mt-5 leading-7 text-white/50">
                        {step.description}
                      </p>
                    </div>

                    <div
                      className={`relative aspect-[16/10] overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] ${
                        reversed ? "md:-order-1" : ""
                      }`}
                    >
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 650px"
                        className="object-cover"
                      />
                    </div>
                  </article>
                );
              })}
            </div>
          </motion.section>

          <motion.section
            className="mt-24"
            initial={{ opacity: 0, y: 26, filter: "blur(16px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 1.1,
              delay: 1.3,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="mb-6">
              <p className="text-sm uppercase tracking-[0.28em] text-white/35">
                Learnings
              </p>
              <h2 className="mt-4 max-w-3xl text-4xl font-medium tracking-[-0.05em] text-white md:text-6xl">
                What this experiment clarified.
              </h2>
            </div>

            <div className="grid gap-4">
              {lab.learnings.map((learning, index) => (
                <div
                  key={learning.title}
                  className="grid gap-3 border-t border-white/10 py-6 md:grid-cols-[240px_1fr]"
                >
                  <p className="text-white/80">
                    {String(index + 1).padStart(2, "0")} · {learning.title}
                  </p>

                  <p className="leading-7 text-white/50">{learning.body}</p>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      </section>
    </main>
  );
}