import Image from "next/image";
import { CaseStudyMediaItem } from "@/content/caseStudies";

type Props = {
  items: CaseStudyMediaItem[];
};

export default function CaseStudyMediaShowcase({ items }: Props) {
  return (
    <section className="space-y-14">
      {items.map((item) => (
        <div key={item.id} className="space-y-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <span className="text-sm uppercase tracking-[0.2em] text-[#71717a]">
              {item.id}
            </span>
            <h3 className="text-lg font-medium text-[#111827] md:text-xl">
              {item.title}
            </h3>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
            {item.type === "image" ? (
              <Image
                src={item.src}
                alt={item.title}
                width={1600}
                height={1000}
                className="h-auto w-full object-cover"
              />
            ) : (
              <video
                src={item.src}
                autoPlay
                loop
                muted
                playsInline
                className="h-auto w-full object-cover"
              />
            )}
          </div>
        </div>
      ))}
    </section>
  );
}