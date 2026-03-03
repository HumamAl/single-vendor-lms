"use client";

import type { ReactNode } from "react";
import type { Challenge } from "@/lib/types";
import { ChallengeCard } from "./challenge-card";
import { ArchDiagram } from "./arch-diagram";
import { ProgressTrackingViz } from "./progress-tracking-viz";
import { CertificationFlowViz } from "./certification-flow-viz";

interface ChallengePageContentProps {
  challenges: Challenge[];
}

export function ChallengePageContent({ challenges }: ChallengePageContentProps) {
  const visualizations: Record<string, ReactNode> = {
    "challenge-1": <ArchDiagram />,
    "challenge-2": <ProgressTrackingViz />,
    "challenge-3": <CertificationFlowViz />,
  };

  return (
    <div className="flex flex-col gap-4">
      {challenges.map((challenge, index) => (
        <ChallengeCard
          key={challenge.id}
          challenge={challenge}
          index={index}
          visualization={visualizations[challenge.id]}
        />
      ))}
    </div>
  );
}
