"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Raw app screenshots (no laptop frame) — a mix of dark and light UIs across all
// four products, so the reel reads as real shipped software, not stock imagery.
type Row = {
  dir: "normal" | "reverse";
  dur: string;
  shots: string[];
};

const ROWS: Row[] = [
  {
    dir: "normal",
    dur: "120s",
    shots: [
      "/easyaccounts/transactions-list.png",
      "/xenia/task-management-kanban.png",
      "/hirecinch/pipeline.png",
      "/canonical/my-exams.png",
      "/easyaccounts/reports-balance-sheet.png",
    ],
  },
  {
    dir: "reverse",
    dur: "150s",
    shots: [
      "/hirecinch/applicants.png",
      "/canonical/checkout.png",
      "/xenia/documents.png",
      "/easyaccounts/ledgers-view.png",
      "/hirecinch/scorecard.png",
    ],
  },
  {
    dir: "normal",
    dur: "135s",
    shots: [
      "/xenia/reporting-task-summary.png",
      "/hirecinch/job-creation.png",
      "/canonical/schedule-exam.png",
      "/easyaccounts/cheque-history.png",
      "/xenia/checklist-builder.png",
    ],
  },
];

// Kept deliberately faint: the reel is ambient texture behind the headline, not
// the subject. It should read as a ghost of real software, never compete with
// the foreground copy or the nav for contrast.
const REEL_OPACITY = 0.3;

export function ScreenReel() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return (
    <div
      aria-hidden
      data-reduced={reduced ? "true" : "false"}
      className="pointer-events-none absolute inset-0 overflow-hidden [mask-image:radial-gradient(125%_120%_at_50%_42%,#000_45%,transparent_100%)] [-webkit-mask-image:radial-gradient(125%_120%_at_50%_42%,#000_45%,transparent_100%)]"
    >
      <div
        className="hero-fade absolute top-1/2 left-1/2 flex flex-col gap-5 [animation-delay:0.9s]"
        style={{
          opacity: REEL_OPACITY,
          transformStyle: "preserve-3d",
          transform:
            "translate(-50%, -50%) rotateX(12deg) rotateY(-16deg) rotateZ(5deg) scale(1.35)",
        }}
      >
        {ROWS.map((row, i) => (
          <div
            key={i}
            className="reel-track"
            data-dir={row.dir}
            style={{ "--dur": row.dur } as React.CSSProperties}
          >
            {[...row.shots, ...row.shots].map((src, j) => (
              <div
                key={`${src}-${j}`}
                className="relative mr-5 aspect-16/10 w-[clamp(220px,24vw,360px)] shrink-0 overflow-hidden rounded-xl border border-border-strong bg-card shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  quality={40}
                  draggable={false}
                  sizes="(min-width: 768px) 24vw, 45vw"
                  className="object-cover object-top select-none"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
