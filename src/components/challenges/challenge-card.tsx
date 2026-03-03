import type { ReactNode } from "react";
import { OutcomeStatement } from "./outcome-statement";

interface Challenge {
  id: string;
  title: string;
  description: string;
  outcome?: string;
}

interface ChallengeCardProps {
  challenge: Challenge;
  index: number;
  visualization?: ReactNode;
}

export function ChallengeCard({ challenge, index, visualization }: ChallengeCardProps) {
  const stepNumber = String(index + 1).padStart(2, "0");

  return (
    <div
      className="bg-card rounded-lg p-6 space-y-4"
      style={{
        border: "1px solid color-mix(in oklch, var(--border), transparent 40%)",
        boxShadow:
          "0 1px 3px oklch(0 0 0 / 0.08), 0 1px 2px oklch(0 0 0 / 0.04)",
      }}
    >
      <div>
        <div className="flex items-baseline gap-3 mb-1">
          <span
            className="font-mono text-sm font-medium w-6 shrink-0 tabular-nums"
            style={{ color: "color-mix(in oklch, var(--primary) 70%, transparent)" }}
          >
            {stepNumber}
          </span>
          <h2 className="text-lg font-semibold">{challenge.title}</h2>
        </div>
        <p
          className="text-sm text-muted-foreground"
          style={{ paddingLeft: "calc(1.5rem + 0.75rem)" }}
        >
          {challenge.description}
        </p>
      </div>
      {visualization && <div>{visualization}</div>}
      {challenge.outcome && <OutcomeStatement outcome={challenge.outcome} />}
    </div>
  );
}
