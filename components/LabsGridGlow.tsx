export default function LabsGridGlow() {
    return (
      <div className="pointer-events-none absolute left-1/2 top-[42%] h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full opacity-70">
        <div
          className="
            absolute inset-0
            [background-image:linear-gradient(to_right,rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.16)_1px,transparent_1px)]
            [background-size:38px_38px]
            [mask-image:radial-gradient(circle,black_0%,black_38%,transparent_72%)]
            [-webkit-mask-image:radial-gradient(circle,black_0%,black_38%,transparent_72%)]
          "
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_0%,transparent_48%,#070707_82%)]" />
      </div>
    );
  }