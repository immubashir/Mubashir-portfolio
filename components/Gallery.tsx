"use client";

import React, { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";

type ImageItem = {
  id: number;
  src: string;
  location: string;
  note: string;
  meta: string;
  layout: "wide" | "half" | "tall";
};

const images: ImageItem[] = [
  {
    id: 1,
    src: "/gallery/Gallery-Image-1.jpeg",
    location: "Buffalo, NY",
    meta: "Lake Erie",
    note: "The lake looked unreal that day.",
    layout: "wide",
  },
  {
    id: 2,
    src: "/gallery/Gallery-Image-2.jpeg",
    location: "Buffalo, NY",
    meta: "Winter light",
    note: "A small moment that felt louder than the street.",
    layout: "half",
  },
  {
    id: 3,
    src: "/gallery/Gallery-Image-3.jpeg",
    location: "Buffalo, NY",
    meta: "Campus",
    note: "Architecture, blue hour, and a quiet walk back.",
    layout: "half",
  },
  {
    id: 4,
    src: "/gallery/Gallery-Image-4.jpeg",
    location: "Buffalo, NY",
    meta: "Fog",
    note: "The fog made the campus feel almost paused.",
    layout: "wide",
  },
  {
    id: 5,
    src: "/gallery/Gallery-Image-5.jpeg",
    location: "Buffalo, NY",
    meta: "Stillness",
    note: "A frame from a place I kept coming back to.",
    layout: "wide",
  },
];

const getLayoutClasses = (layout: ImageItem["layout"]) => {
  if (layout === "wide") {
    return {
      wrapper: "md:col-span-12",
      image: "h-[360px] sm:h-[460px] md:h-[680px] 2xl:h-[780px]",
    };
  }

  if (layout === "tall") {
    return {
      wrapper: "md:col-span-5",
      image: "h-[520px] sm:h-[620px] md:h-[760px]",
    };
  }

  return {
    wrapper: "md:col-span-6",
    image: "h-[340px] sm:h-[440px] md:h-[560px]",
  };
};

type GalleryCardProps = {
  image: ImageItem;
  activeId: number | null;
  setActiveId: (id: number | null) => void;
};

const GalleryCard = ({ image, activeId, setActiveId }: GalleryCardProps) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const isActive = activeId === image.id;
  const layout = getLayoutClasses(image.layout);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [36, -36]);

  return (
    <motion.article
      layout
      className={`${layout.wrapper} ${
        activeId && !isActive ? "opacity-35 blur-[1px]" : "opacity-100 blur-0"
      } transition-all duration-500`}
    >
      <button
        ref={ref}
        type="button"
        onClick={() => setActiveId(isActive ? null : image.id)}
        className="group block w-full cursor-pointer text-left focus:outline-none"
        aria-label={`View photograph ${image.id}`}
      >
        <div
          className={`relative overflow-hidden rounded-[24px] bg-black/5 md:rounded-[30px] ${layout.image}`}
        >
          <motion.img
            src={image.src}
            alt={image.note}
            style={{ y }}
            className="absolute left-0 top-[-8%] h-[116%] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
          />

          <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/5" />

          <div className="absolute bottom-4 left-4 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-sm text-white backdrop-blur-md md:bottom-5 md:left-5">
            {image.location}
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-black/40 ubuntu-regular">
              {image.meta}
            </p>

            <p className="mt-2 max-w-2xl text-[clamp(1.25rem,2vw,2.1rem)] leading-tight tracking-[-0.045em] text-black ubuntu-regular">
              {image.note}
            </p>
          </div>

          <p className="text-sm text-black/40 md:pt-2 ubuntu-regular">
            0{image.id}
          </p>
        </div>
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: 16 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: 12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-6 border-t border-black/10 pt-5">
              <p className="max-w-3xl text-sm leading-7 text-black/55 md:text-base ubuntu-regular">
                A small visual note from {image.location}. I keep these here less
                as a photo dump and more as a record of things that made me stop
                for a second.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

const Gallery = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <section className="relative z-[100] mx-auto w-full max-w-[1800px] rounded-b-[36px] bg-[#f3f3f1] px-5 py-16 text-black shadow-[0_28px_80px_rgba(0,0,0,0.14)] sm:px-6 md:px-10 lg:px-16 lg:py-24 xl:px-20 2xl:px-28">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-14 md:gap-20">
          <header className="flex flex-col justify-between gap-8 border-b border-black/10 pb-10 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-black/40 ubuntu-regular">
                Photographs
              </p>

              <h1 className="max-w-4xl text-[clamp(3rem,7vw,8rem)] leading-[0.9] tracking-[-0.075em] text-black ubuntu-bold">
                Things that caught my attention.
              </h1>
            </div>

            <div className="flex flex-wrap gap-2 md:max-w-sm md:justify-end">
              {["Buffalo", "Winter", "Water", "Architecture"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-black/10 bg-white/55 px-4 py-2 text-sm text-black/55 backdrop-blur-md ubuntu-regular"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="grid grid-cols-1 gap-x-8 gap-y-20 md:grid-cols-12 md:gap-y-28">
            {images.map((image) => (
              <GalleryCard
                key={image.id}
                image={image}
                activeId={activeId}
                setActiveId={setActiveId}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;