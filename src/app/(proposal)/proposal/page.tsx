import { APP_CONFIG } from "@/lib/config";
import { profile, portfolioProjects } from "@/data/proposal";
import { ProjectCard } from "@/components/proposal/project-card";
import { SkillsGrid } from "@/components/proposal/skills-grid";

// Social proof stats from developer-profile.md — exact numbers, no inflation.
const heroStats = [
  { value: "24+", label: "Projects Shipped" },
  { value: "15+", label: "Industries Served" },
  { value: "< 48hr", label: "Demo Turnaround" },
];

// How I Work steps — adapted to LMS project type, not generic "Understand / Build / Ship / Iterate"
const processSteps = profile.approach;

export default function ProposalPage() {
  const projectLabel =
    APP_CONFIG.clientName ?? APP_CONFIG.projectName;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-12">

        {/* ────────────────────────────────────────────────────────────────────
            Section 1 — Hero (Project Brief)
            Dark panel. Client's project reflected first. Pulsing badge mandatory.
        ──────────────────────────────────────────────────────────────────── */}
        <section
          className="relative rounded-2xl overflow-hidden"
          style={{ background: "oklch(0.10 0.02 var(--primary-h, 200))" }}
        >
          {/* Subtle radial top highlight */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at top, oklch(0.55 0.16 200 / 0.12) 0%, transparent 65%)",
            }}
          />

          <div className="relative z-10 px-8 pt-10 pb-6 md:px-12 md:pt-12 md:pb-8">
            {/* Effort badge — "Built this demo for your project" */}
            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-white/10 border border-white/10 text-white/80 px-3 py-1 rounded-full mb-6">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
              </span>
              Built this demo for your project
            </span>

            {/* Muted role prefix */}
            <p className="font-mono text-xs tracking-widest uppercase text-white/40 mb-3">
              Full-Stack Developer · LMS Specialist
            </p>

            {/* Weight-contrast headline */}
            <h1 className="text-4xl md:text-5xl tracking-tight leading-none mb-4">
              <span className="font-light text-white/70">Hi, I&apos;m</span>{" "}
              <span className="font-black text-white">{profile.name}</span>
            </h1>

            {/* Tailored value prop — one sentence, specific to this job */}
            <p className="text-lg text-white/65 max-w-2xl leading-relaxed mb-2">
              {profile.tagline}
            </p>
          </div>

          {/* Stats shelf */}
          <div className="relative z-10 border-t border-white/10 bg-white/5 px-8 py-4 md:px-12">
            <div className="grid grid-cols-3 gap-4">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-xl md:text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/50 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────────────
            Section 2 — Proof of Work
            3–4 portfolio projects. Outcomes from developer-profile.md exactly.
        ──────────────────────────────────────────────────────────────────── */}
        <section className="space-y-4">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
              Proof of Work
            </p>
            <h2 className="text-2xl font-bold tracking-tight">
              Relevant Projects
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {portfolioProjects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                tech={project.tech}
                relevance={project.relevance}
                outcome={project.outcome}
                liveUrl={project.liveUrl}
              />
            ))}
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────────────
            Section 3 — How I Work
            LMS-adapted step names. Not generic "Understand / Build / Ship / Iterate".
        ──────────────────────────────────────────────────────────────────── */}
        <section className="space-y-4">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
              Process
            </p>
            <h2 className="text-2xl font-bold tracking-tight">How I Work</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {processSteps.map((step, i) => (
              <div
                key={step.title}
                className="aesthetic-card p-5 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-base font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────────────
            Section 4 — Skills Grid
            Relevant tech only — filtered to what this LMS job needs.
        ──────────────────────────────────────────────────────────────────── */}
        <section className="space-y-4">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
              Tech Stack
            </p>
            <h2 className="text-2xl font-bold tracking-tight">
              What I Build With
            </h2>
          </div>

          <SkillsGrid categories={profile.skillCategories} />
        </section>

        {/* ────────────────────────────────────────────────────────────────────
            Section 5 — CTA (Dark Panel)
            Pulsing availability indicator. "Reply on Upwork" as text, not a link.
            Back-link to demo. Signed by Humam.
        ──────────────────────────────────────────────────────────────────── */}
        <section
          className="relative rounded-2xl overflow-hidden text-center"
          style={{ background: "oklch(0.10 0.02 var(--primary-h, 200))" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at bottom, oklch(0.55 0.16 200 / 0.10) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 px-8 py-10 md:px-12 md:py-12 space-y-4">
            {/* Pulsing availability indicator */}
            <div className="flex items-center justify-center gap-2">
              <span className="relative inline-flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-[color:var(--success)]" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[color:var(--success)]" />
              </span>
              <span
                className="text-sm"
                style={{
                  color: "color-mix(in oklch, var(--success) 80%, white)",
                }}
              >
                Currently available for new projects
              </span>
            </div>

            {/* Tailored headline — specific to this LMS project */}
            <h2 className="text-2xl font-bold text-white">
              Ready to build your {projectLabel} — with all three roles working from day one.
            </h2>

            {/* Specific body copy — references the demo */}
            <p className="text-white/65 max-w-lg mx-auto leading-relaxed text-sm">
              I built the demo above to show you the learner dashboard, course
              catalog, progress tracking, and certification flow — the hard
              architectural parts are already solved. The production version
              starts from here.
            </p>

            {/* Primary action — text, not a dead-end button */}
            <p className="text-lg font-semibold text-white pt-2">
              Reply on Upwork to start
            </p>

            {/* Secondary link back to demo */}
            <a
              href="/"
              className="inline-flex items-center gap-1 text-sm text-white/45 hover:text-white/65 transition-colors duration-150"
            >
              ← Back to the demo
            </a>

            {/* Signature */}
            <p className="pt-4 text-sm text-white/35 border-t border-white/10 mt-4">
              — Humam
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
