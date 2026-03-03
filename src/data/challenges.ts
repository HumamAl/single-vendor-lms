import type { Challenge } from "@/lib/types";

export interface ExecutiveSummaryData {
  commonApproach: string;
  differentApproach: string;
  accentWord?: string;
}

export const executiveSummary: ExecutiveSummaryData = {
  commonApproach:
    "Most LMS builds start with a content management mindset — upload videos, create quizzes, ship it. The result is a system that stores courses but doesn't give instructors real signal on where learners struggle, or give admins confidence that certificates are being issued accurately and consistently.",
  differentApproach:
    "I'd build this around three interconnected layers: a delivery architecture that scales without rebuilding, a real-time progress tracking model that tells instructors exactly where learners drop off, and an automated assessment-to-certification pipeline that removes all manual tracking from the process.",
  accentWord: "three interconnected layers",
};

export const challenges: Challenge[] = [
  {
    id: "challenge-1",
    title: "Scalable single-vendor course delivery architecture",
    description:
      "A single-vendor LMS means one organization owns all content and controls all learner access. The architecture decision made at the start determines whether you can add 50 more learners or 500 more courses without rebuilding how content is delivered.",
    visualizationType: "architecture",
    outcome:
      "Could support hundreds of concurrent learners across multiple courses without rebuilding the content delivery layer — scaling from 50 learners to 500 is a configuration change, not a code change.",
  },
  {
    id: "challenge-2",
    title: "Learner progress tracking across multi-module courses",
    description:
      "Multi-module courses create a tracking problem: completion at the course level tells you almost nothing. Without per-module progress data, instructors can't identify where learners consistently drop off or which modules need revision.",
    visualizationType: "flow",
    outcome:
      "Could give instructors a real-time view of where learners drop off — enabling targeted intervention before completion rates fall below the 70% threshold that typically triggers re-enrollment mandates.",
  },
  {
    id: "challenge-3",
    title: "Assessment and certification workflow",
    description:
      "Quiz completion should automatically trigger certificate issuance when a learner passes. Without an automated pipeline, L&D admins are manually checking who passed, issuing certificates one at a time, and tracking expiry dates in spreadsheets.",
    visualizationType: "flow",
    outcome:
      "Could automate quiz grading and certificate issuance entirely — eliminating the manual tracking step that typically takes L&D admins 3-5 hours per week in organizations with 100+ active learners.",
  },
];
