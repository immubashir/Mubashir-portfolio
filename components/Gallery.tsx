"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";

type ImageItem = {
  id: number;
  src: string;
  location: string;
  cols: string;
  height: string;
};

const modalEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const images: ImageItem[] = [
  {
    id: 1,
    src: "/gallery/Gallery-Image-1.jpeg",
    location: "Buffalo, NY",
    cols: "md:col-span-7",
    height: "h-[320px] sm:h-[380px] md:h-[520px] 2xl:h-[620px]",
  },
  {
    id: 2,
    src: "/gallery/Gallery-Image-2.jpeg",
    location: "Buffalo, NY",
    cols: "md:col-span-5",
    height: "h-[260px] sm:h-[300px] md:h-[380px] 2xl:h-[440px]",
  },
  {
    id: 3,
    src: "/gallery/Gallery-Image-3.jpeg",
    location: "Buffalo, NY",
    cols: "md:col-span-5",
    height: "h-[280px] sm:h-[340px] md:h-[460px] 2xl:h-[520px]",
  },
  {
    id: 4,
    src: "/gallery/Gallery-Image-4.jpeg",
    location: "Buffalo, NY",
    cols: "md:col-span-7",
    height: "h-[320px] sm:h-[380px] md:h-[560px] 2xl:h-[660px]",
  },
  {
    id: 5,
    src: "/gallery/Gallery-Image-5.jpeg",
    location: "Buffalo, NY",
    cols: "md:col-span-12",
    height: "h-[320px] sm:h-[400px] md:h-[650px] 2xl:h-[760px]",
  },
];

type FilterDropdownProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

const FilterDropdown = ({ options, value, onChange }: FilterDropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative w-full md:w-[280px]">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-[20px] border border-black/10 bg-white/70 px-4 py-3 text-sm backdrop-blur-md transition-all duration-200 md:text-base ubuntu-regular"
      >
        <span>{value}</span>
        <span
          className={`text-xs transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full z-20 mt-2 w-full overflow-hidden rounded-[20px] border border-black/10 bg-white/80 shadow-xl backdrop-blur-xl"
          >
            {options.map((option) => {
              const isActive = option === value;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left text-sm transition-all duration-200 md:text-base ubuntu-regular ${
                    isActive
                      ? "bg-black text-white"
                      : "text-black hover:bg-black/5"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

type GalleryItemProps = {
  image: ImageItem;
  onClick: (image: ImageItem) => void;
};

const GalleryItem = ({ image, onClick }: GalleryItemProps) => {
  const ref = useRef<HTMLButtonElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => onClick(image)}
      aria-label={`Open gallery image ${image.id}`}
      className={`group relative ${image.cols} ${image.height} cursor-pointer overflow-hidden rounded-[24px] bg-black/5 text-left focus:outline-none md:rounded-[28px]`}
    >
      <img
        src={image.src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-xl"
      />

      <motion.img
        src={image.src}
        alt={`Gallery Image ${image.id}`}
        style={{ y }}
        className="absolute left-0 top-[-12%] h-[124%] w-full object-cover will-change-transform transition-transform duration-500 group-hover:scale-[1.03]"
      />

      <div className="absolute inset-0 bg-black/15" />

      <div className="absolute bottom-4 left-4 z-10 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
        <p className="text-sm text-white md:text-base ubuntu-regular">
          {image.location}
        </p>
      </div>
    </button>
  );
};

type ImageModalProps = {
  selectedImage: ImageItem | null;
  onClose: () => void;
};

const ImageModal = ({ selectedImage, onClose }: ImageModalProps) => {
  useEffect(() => {
    if (!selectedImage) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage, onClose]);

  if (!selectedImage) return null;
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center px-4 sm:px-6 md:px-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <button
          type="button"
          aria-label="Close image"
          onClick={onClose}
          className="absolute inset-0 cursor-default bg-black/65 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{
            duration: 0.35,
            ease: modalEase,
          }}
          className="relative z-10 flex max-h-[88vh] w-full max-w-6xl items-center justify-center overflow-hidden rounded-[24px] shadow-2xl md:rounded-[32px]"
          onClick={(event) => event.stopPropagation()}
        >
          <img
            src={selectedImage.src}
            alt={`Gallery Image ${selectedImage.id}`}
            className="block max-h-[88vh] w-full object-contain"
          />

          <div className="pointer-events-none absolute inset-0 bg-black/5" />

          <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/15 px-4 py-2 backdrop-blur-md md:left-5 md:top-5">
            <p className="text-sm text-white md:text-base ubuntu-regular">
              {selectedImage.location}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/15 text-xl text-white backdrop-blur-md transition hover:bg-white/25 md:right-5 md:top-5 md:h-11 md:w-11"
            aria-label="Close image"
          >
            ×
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

const Gallery = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

  const locations = useMemo(() => {
    const uniqueLocations = Array.from(
      new Set(images.map((image) => image.location))
    );

    return ["All", ...uniqueLocations];
  }, []);

  const filteredImages = useMemo(() => {
    if (selectedFilter === "All") return images;

    return images.filter((image) => image.location === selectedFilter);
  }, [selectedFilter]);

  return (
    <>
      <section
        className={`relative mx-auto w-full max-w-[1800px] px-5 py-16 transition-all duration-300 sm:px-6 md:px-10 lg:px-16 lg:py-20 xl:px-20 2xl:px-28 shadow-2xl shadow-black rounded-b-4xl ${
          selectedImage ? "scale-[0.985] blur-[8px]" : "scale-100 blur-0"
        }`}
      >
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-col gap-8 md:gap-10">
            <h1 className="max-w-5xl text-[clamp(2rem,4vw,4rem)] leading-tight tracking-[-0.04em] ubuntu-bold">
              Here is a collection of my favorite photos
            </h1>

            <div className="w-full rounded-[24px] border border-black/10 bg-white/70 p-4 backdrop-blur-md md:p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-black/50 ubuntu-regular">
                    Filter
                  </p>
                  <h2 className="text-lg font-semibold md:text-xl ubuntu-regular">
                    Browse by location
                  </h2>
                </div>

                <FilterDropdown
                  options={locations}
                  value={selectedFilter}
                  onChange={setSelectedFilter}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-12 md:gap-8">
              {filteredImages.map((image) => (
                <GalleryItem
                  key={image.id}
                  image={image}
                  onClick={setSelectedImage}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <ImageModal
        selectedImage={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </>
  );
};

export default Gallery;