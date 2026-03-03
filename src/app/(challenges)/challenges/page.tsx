import { ExecutiveSummary } from "@/components/challenges/executive-summary";
import { ChallengePageContent } from "@/components/challenges/challenge-page-content";
import { CtaCloser } from "@/components/challenges/cta-closer";
import { challenges, executiveSummary } from "@/data/challenges";

export const metadata = { title: "My Approach | LearnHub Demo by Humam" };

export default function ChallengesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8 md:px-6 space-y-8">
        {/* Page heading */}
        <div>
          <h1 className="text-2xl font-bold">My Approach</h1>
          <p className="text-sm text-muted-foreground mt-1">
            How I would tackle the key technical challenges in building this LMS
          </p>
        </div>

        {/* Executive summary — dark hero banner */}
        <ExecutiveSummary data={executiveSummary} />

        {/* Challenge cards with visualizations — client wrapper for interactive elements */}
        <ChallengePageContent challenges={challenges} />

        {/* CTA closer */}
        <CtaCloser />
      </div>
    </div>
  );
}
