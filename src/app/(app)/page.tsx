"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import {
  Users,
  TrendingUp,
  TrendingDown,
  Award,
  AlertTriangle,
  ChevronRight,
  Bell,
  CheckCircle,
  Clock,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { APP_CONFIG } from "@/lib/config";
import {
  dashboardStats,
  enrollmentTrend,
  courses,
  overdueAlerts,
} from "@/data/mock-data";
import type { OverdueAlert, Course } from "@/lib/types";

// ── SSR-safe chart import ────────────────────────────────────────────────────
const EnrollmentChart = dynamic(
  () =>
    import("@/components/dashboard/enrollment-chart").then(
      (m) => m.EnrollmentChart
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-[300px] animate-pulse rounded-lg bg-muted/30" />
    ),
  }
);

// ── Animated counter hook ────────────────────────────────────────────────────
function useCountUp(target: number, duration: number = 1200) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

// ── Stat card component ──────────────────────────────────────────────────────
interface StatCardProps {
  title: string;
  value: number;
  suffix?: string;
  prefix?: string;
  change: number;
  changeLabel: string;
  icon: React.ReactNode;
  index: number;
  variant?: "default" | "warning";
  description?: string;
}

function StatCard({
  title,
  value,
  suffix = "",
  prefix = "",
  change,
  changeLabel,
  icon,
  index,
  variant = "default",
  description,
}: StatCardProps) {
  const { count, ref } = useCountUp(value);
  const isPositive = change > 0;
  const isWarning = variant === "warning";

  const displayValue =
    value >= 1000
      ? count.toLocaleString()
      : suffix === "%"
      ? count.toFixed(1)
      : count.toString();

  return (
    <div
      ref={ref}
      className={cn(
        "linear-card p-[var(--card-padding)] flex flex-col gap-3 animate-fade-up-in",
        isWarning &&
          "border-destructive/30 bg-gradient-to-br from-destructive/5 to-destructive/[0.02]"
      )}
      style={{
        animationDelay: `${index * 50}ms`,
        animationDuration: "150ms",
        animationFillMode: "both",
      }}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <span
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg",
            isWarning
              ? "bg-destructive/10 text-destructive"
              : "bg-primary/10 text-primary"
          )}
        >
          {icon}
        </span>
      </div>
      <div>
        <p
          className={cn(
            "text-3xl font-bold font-mono tabular-nums tracking-tight",
            isWarning
              ? "text-destructive"
              : "bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
          )}
        >
          {prefix}
          {displayValue}
          {suffix}
        </p>
      </div>
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {isPositive && !isWarning ? (
          <TrendingUp className="h-3.5 w-3.5 text-success shrink-0" />
        ) : isWarning && isPositive ? (
          <TrendingUp className="h-3.5 w-3.5 text-destructive shrink-0" />
        ) : (
          <TrendingDown
            className={cn(
              "h-3.5 w-3.5 shrink-0",
              isWarning ? "text-success" : "text-destructive"
            )}
          />
        )}
        <span className={cn(isWarning && isPositive && "text-destructive")}>
          {isPositive ? "+" : ""}
          {change}%
        </span>
        <span>· {changeLabel}</span>
        {description && (
          <span className="text-muted-foreground/70">· {description}</span>
        )}
      </div>
    </div>
  );
}

// ── Enrollment status badge ──────────────────────────────────────────────────
function StatusBadge({ status }: { status: Course["status"] }) {
  const map: Record<
    Course["status"],
    { label: string; className: string }
  > = {
    Published: {
      label: "Published",
      className: "bg-success/10 text-success border border-success/20",
    },
    Draft: {
      label: "Draft",
      className:
        "bg-muted text-muted-foreground border border-border",
    },
    Archived: {
      label: "Archived",
      className:
        "bg-muted text-muted-foreground/60 border border-border",
    },
  };
  const cfg = map[status];
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium",
        cfg.className
      )}
    >
      {cfg.label}
    </span>
  );
}

// ── Delivery type badge ──────────────────────────────────────────────────────
function DeliveryBadge({
  type,
}: {
  type: Course["deliveryType"];
}) {
  const map = {
    "Self-Paced": "bg-chart-3/10 text-chart-3 border border-chart-3/20",
    ILT: "bg-chart-4/10 text-chart-4 border border-chart-4/20",
    Blended: "bg-chart-2/10 text-chart-2 border border-chart-2/20",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium",
        map[type]
      )}
    >
      {type}
    </span>
  );
}

// ── Overdue alert row ────────────────────────────────────────────────────────
function OverdueRow({
  alert,
  onSendReminder,
  sent,
}: {
  alert: OverdueAlert;
  onSendReminder: (id: string) => void;
  sent: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3 aesthetic-hover rounded-lg transition-colors",
        sent && "opacity-60"
      )}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/10 shrink-0">
        <AlertTriangle className="h-4 w-4 text-destructive" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{alert.learnerName}</p>
        <p className="text-xs text-muted-foreground truncate">
          {alert.courseTitle}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1 shrink-0">
        <span className="text-xs font-mono font-semibold text-destructive">
          {alert.daysOverdue}d overdue
        </span>
        <div className="flex items-center gap-1">
          <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-warning"
              style={{ width: `${alert.progressPct}%` }}
            />
          </div>
          <span className="text-xs font-mono text-muted-foreground w-7 text-right">
            {alert.progressPct}%
          </span>
        </div>
      </div>
      <button
        onClick={() => onSendReminder(alert.enrollmentId)}
        disabled={sent}
        className={cn(
          "shrink-0 text-xs px-2.5 py-1 rounded-md border transition-colors",
          "duration-[var(--dur-fast)]",
          sent
            ? "bg-success/10 text-success border-success/20 cursor-default"
            : "border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
        )}
      >
        {sent ? (
          <span className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Sent
          </span>
        ) : (
          "Send Reminder"
        )}
      </button>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────
type Period = "7d" | "30d" | "90d";

const PERIOD_LABELS: Record<Period, string> = {
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  "90d": "Last 90 days",
};

export default function DashboardPage() {
  const [period, setPeriod] = useState<Period>("30d");
  const [remindersSent, setRemindersSent] = useState<Set<string>>(new Set());
  const [courseFilter, setCourseFilter] = useState<
    "All" | "Published" | "Draft" | "Archived"
  >("All");

  const chartData = useMemo(() => {
    if (period === "7d") return enrollmentTrend.slice(-2);
    if (period === "30d") return enrollmentTrend.slice(-6);
    return enrollmentTrend;
  }, [period]);

  const filteredCourses = useMemo(() => {
    const published = courses.filter((c) => c.status === "Published");
    const base =
      courseFilter === "All"
        ? published.slice(0, 8)
        : courses
            .filter((c) => c.status === courseFilter)
            .slice(0, 8);
    return base;
  }, [courseFilter]);

  function handleSendReminder(enrollmentId: string) {
    setRemindersSent((prev) => new Set([...prev, enrollmentId]));
  }

  const stats = [
    {
      title: "Active Learners",
      value: dashboardStats.activeLearners,
      change: dashboardStats.activeLearnersChange,
      changeLabel: "vs. last month",
      description: "logged in last 30 days",
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Course Completion Rate",
      value: Math.round(dashboardStats.courseCompletionRate * 10) / 10,
      suffix: "%",
      change: dashboardStats.completionRateChange,
      changeLabel: "vs. last month",
      description: "org-wide average",
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      title: "Certificates Issued",
      value: dashboardStats.certificatesIssuedThisMonth,
      change: dashboardStats.certificatesChange,
      changeLabel: "this month",
      description: "completion milestones",
      icon: <Award className="h-4 w-4" />,
    },
    {
      title: "Overdue Enrollments",
      value: dashboardStats.overdueEnrollments,
      change: dashboardStats.overdueEnrollmentsChange,
      changeLabel: "vs. last month",
      description: "require follow-up",
      icon: <AlertTriangle className="h-4 w-4" />,
      variant: "warning" as const,
    },
  ];

  return (
    <div className="page-container space-y-[var(--section-gap)]">

      {/* ── Page header ─────────────────────────────────────────── */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight aesthetic-heading">
          Learning Overview
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Apex Industrial Solutions — L&D dashboard · Updated now
        </p>
      </div>

      {/* ── KPI stat cards ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[var(--grid-gap)]">
        {stats.map((stat, i) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            suffix={stat.suffix}
            change={stat.change}
            changeLabel={stat.changeLabel}
            description={stat.description}
            icon={stat.icon}
            index={i}
            variant={stat.variant}
          />
        ))}
      </div>

      {/* ── Period filter ────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-foreground font-medium mr-1">
          Period:
        </span>
        {(["7d", "30d", "90d"] as const).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={cn(
              "px-3 py-1.5 text-xs rounded-md border transition-colors",
              "duration-[var(--dur-fast)]",
              period === p
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border/60 text-muted-foreground hover:bg-muted/50"
            )}
          >
            {PERIOD_LABELS[p]}
          </button>
        ))}
      </div>

      {/* ── Enrollment trend chart ──────────────────────────────── */}
      <div className="linear-card p-0 overflow-hidden">
        <div className="px-[var(--card-padding)] pt-[var(--card-padding)] pb-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold tracking-tight">
                Enrollment Volume & Completion Rate
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Monthly enrollments (area) vs. completion rate % (dashed line)
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-md shrink-0">
              <Clock className="h-3.5 w-3.5" />
              {period === "7d"
                ? "Last 2 months"
                : period === "30d"
                ? "Last 6 months"
                : "12 months"}
            </div>
          </div>
        </div>
        <div className="px-2 pb-4">
          <EnrollmentChart data={chartData} />
        </div>
      </div>

      {/* ── Course catalog table + overdue alert feed ───────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[var(--grid-gap)]">

        {/* Course catalog table — 2/3 width */}
        <div className="lg:col-span-2 linear-card p-0 overflow-hidden">
          <div className="px-[var(--card-padding)] pt-[var(--card-padding)] pb-3 flex items-center justify-between gap-3 border-b border-border/60">
            <div>
              <h2 className="text-base font-semibold tracking-tight">
                Course Catalog
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Published courses · Completion rate &amp; enrollment status
              </p>
            </div>
            {/* Course status filter */}
            <div className="flex items-center gap-1.5">
              {(["All", "Published", "Draft", "Archived"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setCourseFilter(f)}
                  className={cn(
                    "px-2 py-1 text-xs rounded-md border transition-colors",
                    "duration-[var(--dur-fast)]",
                    courseFilter === f
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border/60 text-muted-foreground hover:bg-muted/50"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60 bg-muted/30">
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">
                    Course Title
                  </th>
                  <th className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground hidden md:table-cell">
                    Type
                  </th>
                  <th className="px-3 py-2.5 text-right text-xs font-semibold text-muted-foreground">
                    Enrolled
                  </th>
                  <th className="px-3 py-2.5 text-right text-xs font-semibold text-muted-foreground">
                    Completion
                  </th>
                  <th className="px-3 py-2.5 text-right text-xs font-semibold text-muted-foreground hidden sm:table-cell">
                    Avg Score
                  </th>
                  <th className="px-3 py-2.5 text-center text-xs font-semibold text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course, i) => (
                  <tr
                    key={course.id}
                    className={cn(
                      "border-b border-border/40 aesthetic-hover transition-colors",
                      i === filteredCourses.length - 1 && "border-b-0"
                    )}
                  >
                    <td className="px-4 py-3 max-w-[200px]">
                      <div className="flex items-start gap-2">
                        <div className="min-w-0">
                          <p className="font-medium text-xs leading-snug line-clamp-2">
                            {course.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {course.category}
                            {course.isCompliance && (
                              <span className="ml-1.5 inline-flex items-center px-1.5 py-0 rounded text-[10px] font-medium bg-warning/10 text-warning border border-warning/20">
                                Compliance
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 hidden md:table-cell">
                      <DeliveryBadge type={course.deliveryType} />
                    </td>
                    <td className="px-3 py-3 text-right">
                      <span className="font-mono text-xs font-medium">
                        {course.enrollmentCount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right">
                      <div className="flex flex-col items-end gap-1">
                        <span
                          className={cn(
                            "font-mono text-xs font-semibold",
                            course.completionRate >= 80
                              ? "text-success"
                              : course.completionRate >= 60
                              ? "text-foreground"
                              : "text-warning"
                          )}
                        >
                          {course.completionRate > 0
                            ? `${course.completionRate.toFixed(1)}%`
                            : "—"}
                        </span>
                        {course.completionRate > 0 && (
                          <div className="w-14 h-1 rounded-full bg-muted overflow-hidden">
                            <div
                              className={cn(
                                "h-full rounded-full",
                                course.completionRate >= 80
                                  ? "bg-success"
                                  : course.completionRate >= 60
                                  ? "bg-primary"
                                  : "bg-warning"
                              )}
                              style={{
                                width: `${course.completionRate}%`,
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-3 text-right hidden sm:table-cell">
                      <span className="font-mono text-xs">
                        {course.avgScore !== null
                          ? `${course.avgScore.toFixed(1)}`
                          : "—"}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <StatusBadge status={course.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-[var(--card-padding)] py-3 border-t border-border/40 flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Showing {filteredCourses.length} of{" "}
              {courseFilter === "All"
                ? courses.filter((c) => c.status === "Published").length
                : courses.filter((c) => c.status === courseFilter).length}{" "}
              courses
            </p>
            <a
              href="/course-catalog"
              className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 transition-colors duration-[var(--dur-fast)]"
            >
              View full catalog
              <ChevronRight className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Overdue Enrollments alert feed — 1/3 width */}
        <div className="linear-card p-0 overflow-hidden">
          <div className="px-[var(--card-padding)] pt-[var(--card-padding)] pb-3 border-b border-border/60 flex items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold tracking-tight">
                  Overdue Enrollments
                </h2>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-white text-[10px] font-bold">
                  {overdueAlerts.length}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Sorted by days past due
              </p>
            </div>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="p-2 space-y-0.5">
            {overdueAlerts.map((alert) => (
              <OverdueRow
                key={alert.enrollmentId}
                alert={alert}
                onSendReminder={handleSendReminder}
                sent={remindersSent.has(alert.enrollmentId)}
              />
            ))}
          </div>
          <div className="px-[var(--card-padding)] py-3 border-t border-border/40">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                {dashboardStats.overdueEnrollments - overdueAlerts.length} more
                overdue
              </p>
              <a
                href="/learner-management"
                className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 transition-colors duration-[var(--dur-fast)]"
              >
                View all
                <ChevronRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Proposal banner ─────────────────────────────────────── */}
      <div className="linear-card p-4 border-primary/15 bg-gradient-to-r from-primary/5 to-transparent flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium">
            This is a live demo built for{" "}
            {APP_CONFIG.clientName ?? APP_CONFIG.projectName}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Humam · Full-Stack Developer · Available now
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="/challenges"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-[var(--dur-fast)]"
          >
            My approach →
          </a>
          <a
            href="/proposal"
            className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:bg-primary/90 transition-colors duration-[var(--dur-fast)]"
          >
            Work with me
          </a>
        </div>
      </div>
    </div>
  );
}
