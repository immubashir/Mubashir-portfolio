"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

import About from "@/components/About";
import CaseStudies from "@/components/CaseStudies";
import Contact from "@/components/Contact";
import Details from "@/components/Details";
import Gallery from "@/components/Gallery";
import MidEle from "@/components/MidEle";
import Navbar from "@/components/Navbar";
import Skills from "@/components/Skills";
import Socials from "@/components/Socials";
import Hero from "@/components/Hero";
import DotBackground from "@/components/DotBackground";
import SiteToggle from "@/components/SiteToggle";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [showHomeEnter, setShowHomeEnter] = useState(false);

  const lockedScrollY = useRef(0);

  useEffect(() => {
    const hasSeenLoader = sessionStorage.getItem("home-loader-seen");

    if (!hasSeenLoader) {
      setIsLoading(true);
      sessionStorage.setItem("home-loader-seen", "true");
    } else {
      setIsLoading(false);
      setShowHomeEnter(true);
    }

    setSessionChecked(true);
  }, []);

  useEffect(() => {
    if (!sessionChecked) return;

    let unlockTimer: number | undefined;

    const lockScroll = () => {
      lockedScrollY.current = window.scrollY;

      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.height = "100%";

      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
      document.body.style.position = "fixed";
      document.body.style.top = `-${lockedScrollY.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.touchAction = "none";
      document.body.style.overscrollBehavior = "none";
    };

    const unlockScroll = () => {
      document.documentElement.style.overflow = "";
      document.documentElement.style.height = "";

      document.body.style.overflow = "";
      document.body.style.height = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.touchAction = "";
      document.body.style.overscrollBehavior = "";

      window.scrollTo(0, lockedScrollY.current);
    };

    if (isLoading) {
      lockScroll();
    } else {
      unlockTimer = window.setTimeout(() => {
        unlockScroll();
        window.dispatchEvent(new Event("resize"));
      }, 450);
    }

    return () => {
      if (unlockTimer) window.clearTimeout(unlockTimer);
      unlockScroll();
    };
  }, [isLoading, sessionChecked]);

  const handleHeroIntroComplete = () => {
    setIsLoading(false);
  };

  if (!sessionChecked) {
    return <main className="min-h-screen bg-transparent" />;
  }

  return (
    <>
    <motion.main
      className="relative overflow-x-clip bg-transparent"
      initial={showHomeEnter ? { opacity: 0, y: 18, filter: "blur(8px)" } : false}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
          className="sticky pointer-events-none fixed inset-0 z-[9999]"
          initial={false}
          animate={
            isLoading
              ? {
                  opacity: 0,
                  scale: 0.98,
                  filter: "blur(6px)",
                  pointerEvents: "none" as const,
                }
              : {
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                  pointerEvents: "auto" as const,
                }
          }
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >

          <div className="pointer-events-auto fixed left-1/2 top-6 -translate-x-1/2">
            <SiteToggle />
          </div>
        </motion.div>
      <Hero
        onIntroComplete={handleHeroIntroComplete}
        // skipIntro={!isLoading}
      />

      <motion.div
        initial={false}
        animate={
          isLoading
            ? { opacity: 0, y: 16, pointerEvents: "none" as const }
            : { opacity: 1, y: 0, pointerEvents: "auto" as const }
        }
        transition={{
          duration: 0.75,
          delay: isLoading ? 0.12 : 0.18,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <MidEle />
        <About />
        <CaseStudies />
        <Details />
        <Skills />
        <Socials />
        <Gallery />
        <Contact />
      </motion.div>
    </motion.main>
  </>
  );
}