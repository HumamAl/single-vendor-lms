"use client";

import { useState } from "react";
import { CheckCircle, XCircle, BookOpen, AlertCircle, BarChart3, Clock } from "lucide-react";

type ViewMode = "problem" | "solution";

const problemItems = [
  { icon: XCircle, label: "Course-level completion only", detail: "73% complete — but which modules?" },
  { icon: XCircle, label: "No drop-off visibility", detail: "Module 4 causes 40% of failures silently" },
  { icon: XCircle, label: "Manual instructor check-ins", detail: "Instructor emails learners who haven't logged in" },
  { icon: XCircle, label: "No re-engagement triggers", detail: "Stalled learners go unnoticed for weeks" },
];

const solutionSteps = [
  {
    icon: BookOpen,
    label: "Learner opens Module",
    detail: "Session start logged — timestamp, device, learner ID",
    status: "completed" as const,
  },
  {
    icon: BarChart3,
    label: "Per-module progress stored",
    detail: "Each section completion writes a progress record",
    status: "completed" as const,
  },
  {
    icon: AlertCircle,
    label: "Stall detection triggers",
    detail: "No activity after 48h flags the enrollment",
    status: "active" as const,
  },
  {
    icon: Clock,
    label: "Instructor dashboard updates",
    detail: "Real-time drop-off rate visible per module",
    status: "completed" as const,
  },
];

export function ProgressTrackingViz() {
  const [view, setView] = useState<ViewMode>("problem");

  return (
    <div className="space-y-3">
      {/* Toggle */}
      <div className="flex items-center gap-1 p-1 rounded-lg w-fit"
        style={{ backgroundColor: "var(--muted)" }}
      >
        <button
          type="button"
          onClick={() => setView("problem")}
          className="px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-150"
          style={{
            backgroundColor: view === "problem" ? "var(--destructive)" : "transparent",
            color: view === "problem" ? "white" : "var(--muted-foreground)",
          }}
        >
          Without tracking
        </button>
        <button
          type="button"
          onClick={() => setView("solution")}
          className="px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-150"
          style={{
            backgroundColor: view === "solution" ? "var(--primary)" : "transparent",
            color: view === "solution" ? "var(--primary-foreground)" : "var(--muted-foreground)",
          }}
        >
          With per-module tracking
        </button>
      </div>

      {/* Content */}
      {view === "problem" ? (
        <div
          className="rounded-lg p-4 space-y-2"
          style={{
            backgroundColor: "color-mix(in oklch, var(--destructive) 5%, transparent)",
            border: "1px solid color-mix(in oklch, var(--destructive) 15%, transparent)",
          }}
        >
          <p className="text-xs font-medium text-destructive mb-3">
            What instructors are working with today
          </p>
          {problemItems.map((item) => (
            <div key={item.label} className="flex items-start gap-2.5">
              <item.icon className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {solutionSteps.map((step, i) => (
            <div key={step.label} className="flex items-start gap-3">
              {/* Timeline dot + line */}
              <div className="flex flex-col items-center shrink-0">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor:
                      step.status === "active"
                        ? "color-mix(in oklch, var(--primary) 15%, transparent)"
                        : "color-mix(in oklch, var(--success) 10%, transparent)",
                    border:
                      step.status === "active"
                        ? "2px solid var(--primary)"
                        : "1px solid color-mix(in oklch, var(--success) 30%, transparent)",
                  }}
                >
                  <step.icon
                    className="w-3.5 h-3.5"
                    style={{
                      color: step.status === "active" ? "var(--primary)" : "var(--success)",
                    }}
                  />
                </div>
                {i < solutionSteps.length - 1 && (
                  <div
                    className="w-px flex-1 mt-1"
                    style={{
                      minHeight: "12px",
                      backgroundColor: "var(--border)",
                    }}
                  />
                )}
              </div>
              <div className="pb-3">
                <p className="text-sm font-medium leading-tight">{step.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{step.detail}</p>
              </div>
            </div>
          ))}
          <div
            className="rounded-md px-3 py-2 ml-10"
            style={{
              backgroundColor: "color-mix(in oklch, var(--primary) 6%, transparent)",
              border: "1px solid color-mix(in oklch, var(--primary) 15%, transparent)",
            }}
          >
            <p className="text-xs font-medium" style={{ color: "var(--primary)" }}>
              Result: instructors see module-level drop-off rates in real time — no manual follow-up needed.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
