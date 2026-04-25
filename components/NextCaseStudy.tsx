import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/content/caseStudies";

type NextCaseStudyProps = {
  nextStudy?: CaseStudy;
};

export default function NextCaseStudy({ nextStudy }: NextCaseStudyProps) {
  if (!nextStudy) {
    return (
      <section className="mx-auto max-w-7xl px-5 pb-8 pt-20">
        <Link
          href="/case-studies"
          className="group relative block overflow-hidden rounded-[2rem] bg-black p-8 text-white md:p-12"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-white/50">
            End of project
          </p>

          <div className="flex items-end justify-between gap-6">
            <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] md:text-7xl">
              View all case studies
            </h2>

            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white text-black transition duration-300 group-hover:rotate-45">
              <ArrowUpRight size={24} />
            </div>
          </div>
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-5 pb-8 pt-20">
      <Link
        href={`/case-studies/${nextStudy.slug}`}
        className="group relative block overflow-hidden rounded-[2rem] bg-black text-white"
      >
        <div className="relative h-[420px] w-full overflow-hidden md:h-[560px]">
          <Image
            src={nextStudy.heroImage}
            alt={nextStudy.title}
            fill
            className="object-cover opacity-75 transition duration-700 group-hover:scale-105 group-hover:opacity-90"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-7 md:p-12">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-white/60">
              Next project
            </p>

            <div className="flex items-end justify-between gap-6">
              <div>
                <h2 className="text-4xl ubuntu-bold font-semibold tracking-[-0.04em] md:text-7xl">
                  {nextStudy.title}
                </h2>

                <p className="mt-4 max-w-2xl text-base text-white/70 md:text-lg">
                  {nextStudy.subtitle}
                </p>
              </div>

              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white text-black transition duration-300 group-hover:rotate-45">
                <ArrowUpRight size={24} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}