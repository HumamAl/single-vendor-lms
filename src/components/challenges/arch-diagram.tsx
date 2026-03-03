"use client";

import { Monitor, Server, Database, Layers, Users } from "lucide-react";
import { useState } from "react";

interface ArchLayer {
  id: string;
  label: string;
  technology: string;
  rationale: string;
  icon: React.ElementType;
  type: "frontend" | "backend" | "database" | "external" | "ai";
}

const layers: ArchLayer[] = [
  {
    id: "learner-ui",
    label: "Learner Interface",
    technology: "Next.js — course viewer, progress dashboard, quiz UI",
    rationale:
      "Server-side rendering keeps course pages fast on slower connections. React state handles quiz interactivity without full-page reloads.",
    icon: Monitor,
    type: "frontend",
  },
  {
    id: "instructor-ui",
    label: "Instructor & Admin Panel",
    technology: "Next.js App Router — content studio, learner roster, reports",
    rationale:
      "Shared codebase between learner and admin views means one deployment. Role-based rendering shows different views from the same route group.",
    icon: Layers,
    type: "frontend",
  },
  {
    id: "api-layer",
    label: "API & Business Logic",
    technology: "API routes — enrollment, progress, grading, certification",
    rationale:
      "Thin API layer enforces business rules: max attempts, passing thresholds, auto-certification triggers. Decoupled from UI so rules apply consistently.",
    icon: Server,
    type: "backend",
  },
  {
    id: "data-layer",
    label: "Data Layer",
    technology: "Relational DB — courses, enrollments, progress, certificates",
    rationale:
      "Relational model enforces integrity between learners, enrollments, and certifications. A learner cannot have a certificate without a passing assessment record.",
    icon: Database,
    type: "database",
  },
  {
    id: "learner-scale",
    label: "Multi-Learner Concurrency",
    technology: "Stateless API + connection pooling — scales to 500+ learners",
    rationale:
      "Stateless request handling means adding learners doesn't require server changes. Progress writes are lightweight — a single row update per module completion.",
    icon: Users,
    type: "external",
  },
];

const typeColors: Record<ArchLayer["type"], { bg: string; border: string; text: string }> = {
  frontend: {
    bg: "color-mix(in oklch, var(--primary) 8%, transparent)",
    border: "color-mix(in oklch, var(--primary) 25%, transparent)",
    text: "var(--primary)",
  },
  backend: {
    bg: "color-mix(in oklch, var(--warning) 8%, transparent)",
    border: "color-mix(in oklch, var(--warning) 25%, transparent)",
    text: "var(--warning)",
  },
  database: {
    bg: "color-mix(in oklch, var(--chart-3) 8%, transparent)",
    border: "color-mix(in oklch, var(--chart-3) 25%, transparent)",
    text: "var(--chart-3)",
  },
  external: {
    bg: "color-mix(in oklch, var(--success) 8%, transparent)",
    border: "color-mix(in oklch, var(--success) 20%, transparent)",
    text: "var(--success)",
  },
  ai: {
    bg: "color-mix(in oklch, var(--primary) 10%, transparent)",
    border: "color-mix(in oklch, var(--primary) 30%, transparent)",
    text: "var(--primary)",
  },
};

export function ArchDiagram() {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      {layers.map((layer) => {
        const colors = typeColors[layer.type];
        const isActive = activeLayer === layer.id;

        return (
          <button
            key={layer.id}
            type="button"
            onClick={() => setActiveLayer(isActive ? null : layer.id)}
            className="w-full text-left transition-all duration-200"
            style={{ cursor: "pointer" }}
          >
            <div
              className="rounded-lg border px-4 py-3 transition-all duration-200"
              style={{
                backgroundColor: isActive ? colors.bg : "transparent",
                borderColor: isActive ? colors.border : "var(--border)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: colors.bg,
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  <layer.icon
                    className="w-3.5 h-3.5"
                    style={{ color: colors.text }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-tight">{layer.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                    {layer.technology}
                  </p>
                </div>
                <span
                  className="text-xs shrink-0 transition-transform duration-200"
                  style={{ transform: isActive ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                  ›
                </span>
              </div>
              {isActive && (
                <p className="text-xs text-muted-foreground mt-3 pl-10 leading-relaxed border-t border-border/40 pt-3">
                  {layer.rationale}
                </p>
              )}
            </div>
          </button>
        );
      })}
      <p className="text-xs text-muted-foreground pl-1 pt-1">
        Click any layer to see the architectural rationale.
      </p>
    </div>
  );
}
