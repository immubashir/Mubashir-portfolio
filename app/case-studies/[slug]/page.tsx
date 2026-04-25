import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import { caseStudies } from "@/content/caseStudies";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import CaseStudyImageGrid from "@/components/case-study/CaseStudyImageGrid";
import CaseStudyBulletList from "@/components/case-study/CaseStudyBulletList";
import CaseStudyMediaShowcase from "@/components/case-study/CaseStudyMediaShowcase";
import NextCaseStudy from "@/components/NextCaseStudy";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;

  const currentIndex = caseStudies.findIndex(
    (item) => item.slug === decodeURIComponent(slug)
  );

  if (currentIndex === -1) notFound();

  const study = caseStudies[currentIndex];

  const nextStudy =
    currentIndex < caseStudies.length - 1
      ? caseStudies[currentIndex + 1]
      : undefined;

  return (
    <main className="min-h-screen bg-[#f7f7f3] text-[#171717]">
      <Navbar />
      <CaseStudyHero study={study} />

      <div className="mx-auto max-w-6xl px-6 pb-24 pt-14 md:px-10">
        {study.highlights && study.highlights.length > 0 && (
          <section className="border-b border-black/10 pb-14">
            <p className="text-sm uppercase tracking-[0.2em] text-[#71717a]">
              Highlights
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {study.highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-3xl border border-black/10 bg-white px-5 py-5 text-[#3f3f46] shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>
        )}

        {study.mediaShowcase && study.mediaShowcase.length > 0 && (
          <section className="border-b border-black/10 py-14">
            <p className="text-sm uppercase tracking-[0.2em] text-[#71717a]">
              Showcase
            </p>

            <div className="mt-8">
              <CaseStudyMediaShowcase items={study.mediaShowcase} />
            </div>
          </section>
        )}

        <div className="mt-14 grid gap-12 lg:grid-cols-[220px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-sm uppercase tracking-[0.2em] text-[#71717a]">
                Contents
              </p>

              <nav className="mt-6 space-y-3">
                <a
                  href="#overview"
                  className="block text-sm text-[#52525b] transition hover:text-[#111827]"
                >
                  Overview
                </a>

                {study.chapters?.map((chapter) => (
                  <a
                    key={chapter.id}
                    href={`#${chapter.id}`}
                    className="block text-sm text-[#52525b] transition hover:text-[#111827]"
                  >
                    {chapter.label}. {chapter.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="space-y-20">
            <section id="overview" className="scroll-mt-28">
              <p className="text-sm uppercase tracking-[0.2em] text-[#71717a]">
                Overview
              </p>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-[#3f3f46]">
                {study.overview}
              </p>
            </section>

            {study.chapters?.map((chapter) => (
              <section
                key={chapter.id}
                id={chapter.id}
                className="scroll-mt-28 border-t border-black/10 pt-10"
              >
                <div className="mb-6 flex items-center gap-4">
                  <span className="text-sm uppercase tracking-[0.2em] text-[#71717a]">
                    {chapter.label}
                  </span>

                  <h2 className="text-2xl font-semibold text-[#111827] md:text-3xl">
                    {chapter.title}
                  </h2>
                </div>

                {chapter.quote && (
                  <div className="rounded-[2rem] border border-black/10 bg-white px-6 py-8 shadow-[0_8px_30px_rgba(0,0,0,0.05)] md:px-8">
                    <p className="max-w-4xl text-2xl leading-10 text-[#111827]">
                      {chapter.quote}
                    </p>
                  </div>
                )}

                {chapter.content && (
                  <div className="space-y-5">
                    {chapter.content.map((paragraph, index) => (
                      <p
                        key={index}
                        className="max-w-3xl text-base leading-8 text-[#3f3f46] md:text-lg"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}

                {chapter.bullets && chapter.bullets.length > 0 && (
                  <div className="mt-4">
                    <CaseStudyBulletList items={chapter.bullets} />
                  </div>
                )}

                {chapter.cards && chapter.cards.length > 0 && (
                  <div className="mt-6 grid gap-6">
                    {chapter.cards.map((card) => (
                      <div
                        key={card.title}
                        className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.05)] md:p-8"
                      >
                        <h3 className="text-xl font-semibold text-[#111827]">
                          {card.title}
                        </h3>

                        {card.description && (
                          <p className="mt-3 max-w-3xl leading-7 text-[#52525b]">
                            {card.description}
                          </p>
                        )}

                        {(card.pros || card.cons) && (
                          <div className="mt-6 grid gap-6 md:grid-cols-2">
                            {card.pros && card.pros.length > 0 && (
                              <div>
                                <h4 className="mb-3 text-sm uppercase tracking-[0.18em] text-[#71717a]">
                                  Pros
                                </h4>
                                <CaseStudyBulletList items={card.pros} />
                              </div>
                            )}

                            {card.cons && card.cons.length > 0 && (
                              <div>
                                <h4 className="mb-3 text-sm uppercase tracking-[0.18em] text-[#71717a]">
                                  Cons
                                </h4>
                                <CaseStudyBulletList items={card.cons} />
                              </div>
                            )}
                          </div>
                        )}

                        {card.outcome && (
                          <div className="mt-6 rounded-2xl border border-black/10 bg-[#fafaf9] px-4 py-3 text-[#3f3f46]">
                            <span className="text-[#71717a]">Outcome:</span>{" "}
                            {card.outcome}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {chapter.images && chapter.images.length > 0 && (
                  <div className="mt-8">
                    <CaseStudyImageGrid
                      images={chapter.images}
                      title={study.title}
                    />
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>

      <NextCaseStudy nextStudy={nextStudy} />
    </main>
  );
}