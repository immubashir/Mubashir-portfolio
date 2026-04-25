"use client";

import ParallaxImage from "./ParallaxImage";

type CaseStudyImageGridProps = {
  images: string[];
  title: string;
};

export default function CaseStudyImageGrid({
  images,
  title,
}: CaseStudyImageGridProps) {
  if (!images?.length) return null;

  if (images.length === 1) {
    return (
      <div className="grid gap-6">
        <div className="border border-black/10 bg-white p-0 shadow-[0_8px_30px_rgba(0,0,0,0.05)] md:p-0">
          <ParallaxImage
            src={images[0]}
            alt={`${title} image 1`}
            className="aspect-[16/10] w-full"
            priority
          />
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {images.map((image, index) => (
        <div
          key={image}
          className=" border border-black/10 bg-white  shadow-[0_8px_30px_rgba(0,0,0,0.05)] md:p-0"
        >
          <ParallaxImage
            src={image}
            alt={`${title} image ${index + 1}`}
            className="aspect-[4/3] w-full"
            priority={index < 2}
          />
        </div>
      ))}
    </div>
  );
}