import { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export default function CaseStudySection({ title, children }: Props) {
  return (
    <section className="grid gap-5 md:grid-cols-[220px_1fr] md:gap-10">
      <div>
        <h2 className="text-sm uppercase tracking-[0.2em] text-[#71717a]">
          {title}
        </h2>
      </div>

      <div>{children}</div>
    </section>
  );
}