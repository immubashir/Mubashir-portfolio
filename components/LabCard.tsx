import Link from "next/link";

type LabStatus = "in-progress" | "completed";

type LabCardProps = {
  title: string;
  description: string;
  status: LabStatus;
  href: string;
};

const statusConfig = {
  "in-progress": {
    label: "In Progress",
    dot: "bg-sky-400",
    pulse: true,
  },
  completed: {
    label: "Completed",
    dot: "bg-emerald-400",
    pulse: false,
  },
};

export default function LabCard({
  title,
  description,
  status,
  href,
}: LabCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 transition hover:border-white/25 hover:bg-white/[0.07]"
    >
      <div className="mb-10 flex items-center justify-between">
        <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-white/55 bg-white/10 px-2 py-1 rounded-full">
          <span className="relative flex h-2 w-2">
            {statusConfig[status].pulse && (
              <span
                className={`absolute inline-flex h-full w-full animate-ping rounded-full ${statusConfig[status].dot} opacity-40`}
              />
            )}

            <span
              className={`relative inline-flex h-2 w-2 rounded-full ${statusConfig[status].dot}`}
            />
          </span>

          {statusConfig[status].label}
        </span>

        <span className="text-white/40 transition group-hover:translate-x-1 group-hover:text-white">
          →
        </span>
      </div>

      <h2 className="text-3xl font-medium tracking-tight text-white">
        {title}
      </h2>

      <p className="mt-4 max-w-xl text-sm leading-6 text-white/55">
        {description}
      </p>
    </Link>
  );
}