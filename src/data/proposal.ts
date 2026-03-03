import type { Profile, PortfolioProject } from "@/lib/types";

export const profile: Profile = {
  name: "Humam",
  tagline:
    "I build LMS platforms with course management, learner progress tracking, and certification workflows — and I've already built one for your review in Tab 1.",
  bio: "Full-stack developer who builds B2B SaaS platforms that actually get used. I've shipped 24+ products across 15+ industries — healthcare SaaS, fleet management, CRM tools, analytics dashboards. Every project starts with understanding the operational need, not the feature list.",
  approach: [
    {
      title: "Map Requirements",
      description:
        "Start by mapping your learner roles, course structure, and certification rules to specific data models. Ask the one question that clarifies the rest: what happens when a learner fails an assessment?",
    },
    {
      title: "Build Core LMS",
      description:
        "Working course catalog, enrollment flow, and learner progress tracking from week one. Visible progress every few days — no dark periods while the architecture is being figured out.",
    },
    {
      title: "Deploy & Train",
      description:
        "Production-ready on Vercel, TypeScript strict mode, documented structure your team can extend. Assessment engine and certificate generation wired in before handoff.",
    },
    {
      title: "Iterate & Scale",
      description:
        "Short feedback cycles after launch. Adding a new course type, a new learner cohort, or a new report shouldn't require a rewrite — the architecture is built to extend.",
    },
  ],
  skillCategories: [
    {
      name: "Frontend",
      skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    },
    {
      name: "Backend & APIs",
      skills: ["Node.js", "REST APIs", "PostgreSQL", "Vercel"],
    },
    {
      name: "Data & Reporting",
      skills: ["Recharts", "Data modeling", "Progress tracking", "Analytics"],
    },
  ],
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "tinnitus-therapy",
    title: "Tinnitus Therapy SaaS",
    description:
      "Multi-clinic therapy management platform with patient intake, protocol assignment, session tracking, and outcome dashboards — structurally very close to a multi-role LMS.",
    outcome:
      "Multi-clinic SaaS covering the full patient journey — intake, protocol assignment, session tracking, and outcome dashboards",
    tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui", "Recharts"],
    liveUrl: "https://tinnitus-therapy.vercel.app",
    relevance:
      "Same architecture as your LMS: roles (admin/instructor/learner), structured content delivery, progress tracking, and completion outcomes.",
  },
  {
    id: "fleet-maintenance",
    title: "Fleet Maintenance SaaS",
    description:
      "6-module SaaS platform covering the full maintenance lifecycle — asset registry, work orders, preventive scheduling, inspections, parts inventory, and analytics.",
    outcome:
      "6-module SaaS covering the full maintenance lifecycle — from asset registry to work orders to parts inventory",
    tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui", "Recharts"],
    relevance:
      "Demonstrates multi-module SaaS complexity — the same kind of interconnected data relationships your LMS needs between courses, learners, enrollments, and certificates.",
  },
  {
    id: "data-intelligence",
    title: "Data Intelligence Platform",
    description:
      "Unified analytics dashboard pulling data from multiple sources with interactive charts and filterable insights — relevant to the reporting layer your LMS will need.",
    outcome:
      "Unified analytics dashboard pulling data from multiple sources with interactive charts and filterable insights",
    tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui", "Recharts"],
    liveUrl: "https://data-intelligence-platform-sandy.vercel.app",
    relevance:
      "Your LMS needs completion rate reports, learner progress views, and compliance dashboards — this shows the reporting foundation I'd build for those.",
  },
  {
    id: "lead-intake-crm",
    title: "Lead Intake CRM",
    description:
      "End-to-end lead flow with public intake form, scored pipeline, CRM dashboard, and configurable automation rules — demonstrates complex state management in a multi-role SaaS.",
    outcome:
      "End-to-end lead flow — public intake form to scored pipeline with configurable automation rules",
    tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui"],
    relevance:
      "Shows the admin-facing management layer — the same pattern your instructor and L&D admin roles need for managing courses, learners, and enrollments.",
  },
];
