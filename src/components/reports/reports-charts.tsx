"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type {
  DashboardStats,
  CategoryBreakdownPoint,
  EnrollmentTrendPoint,
  ComplianceSummary,
} from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
  RadialBarChart,
  RadialBar,
} from "recharts";
import { TrendingUp, TrendingDown, Users, BookOpen, Award, AlertTriangle } from "lucide-react";

// ── Stat card ─────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  change,
  icon: Icon,
  isWarning,
}: {
  label: string;
  value: string;
  sub?: string;
  change?: number;
  icon: React.ElementType;
  isWarning?: boolean;
}) {
  const isPositive = (change ?? 0) >= 0;
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <p className="text-xs text-muted-foreground mb-1">{label}</p>
          <p className={cn("text-2xl font-bold font-mono tabular-nums", isWarning ? "text-destructive" : "text-foreground")}>
            {value}
          </p>
          {change !== undefined && (
            <div
              className={cn(
                "flex items-center gap-1 text-xs mt-1",
                isWarning
                  ? isPositive ? "text-destructive" : "text-[color:var(--success)]"
                  : isPositive ? "text-[color:var(--success)]" : "text-destructive"
              )}
            >
              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span>{isPositive ? "+" : ""}{change?.toFixed(1)}% vs last month</span>
            </div>
          )}
          {sub && <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>}
        </div>
        <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-primary" />
        </div>
      </div>
    </Card>
  );
}

// ── Custom tooltips ───────────────────────────────────────────────────────────

function EnrollmentTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border/60 rounded-lg p-3 shadow-md text-sm">
      <p className="font-medium mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-mono font-medium">{p.value}</span>
        </div>
      ))}
    </div>
  );
}

function CategoryTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border/60 rounded-lg p-3 shadow-md text-sm max-w-[220px]">
      <p className="font-medium mb-2 text-xs leading-snug">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-mono font-medium">{p.value}</span>
        </div>
      ))}
    </div>
  );
}

type TrendView = "enrollments" | "completions" | "both";

// ── Component ─────────────────────────────────────────────────────────────────

interface ReportsChartsProps {
  dashboardStats: DashboardStats;
  categoryBreakdown: CategoryBreakdownPoint[];
  enrollmentTrend: EnrollmentTrendPoint[];
  complianceSummaries: ComplianceSummary[];
}

export default function ReportsCharts({
  dashboardStats,
  categoryBreakdown,
  enrollmentTrend,
  complianceSummaries,
}: ReportsChartsProps) {
  const [trendView, setTrendView] = useState<TrendView>("both");

  const catData = categoryBreakdown.map((c) => ({
    ...c,
    shortName: c.category.split(" ").slice(0, 2).join(" "),
  }));

  const radialData = [
    { name: "Assessment Pass Rate", value: 78, fill: "oklch(0.55 0.16 200)" },
    { name: "Compliance Rate", value: dashboardStats.complianceRate, fill: "oklch(0.62 0.19 145)" },
  ];

  return (
    <div className="space-y-6">
      {/* KPI summary row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          label="Active Learners"
          value={dashboardStats.activeLearners.toLocaleString()}
          change={dashboardStats.activeLearnersChange}
          icon={Users}
        />
        <StatCard
          label="Completion Rate"
          value={`${dashboardStats.courseCompletionRate}%`}
          change={dashboardStats.completionRateChange}
          icon={BookOpen}
        />
        <StatCard
          label="Certificates Issued"
          value={dashboardStats.certificatesIssuedThisMonth.toLocaleString()}
          sub="This month"
          change={dashboardStats.certificatesChange}
          icon={Award}
        />
        <StatCard
          label="Overdue Enrollments"
          value={dashboardStats.overdueEnrollments.toLocaleString()}
          change={dashboardStats.overdueEnrollmentsChange}
          icon={AlertTriangle}
          isWarning
        />
      </div>

      {/* Enrollment trend chart */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <h2 className="text-base font-semibold">Enrollment Trend</h2>
              <p className="text-xs text-muted-foreground">12-month enrollment and completion volume</p>
            </div>
            <Select value={trendView} onValueChange={(v) => setTrendView(v as TrendView)}>
              <SelectTrigger className="w-48 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="both">Enrollments + Completions</SelectItem>
                <SelectItem value="enrollments">Enrollments Only</SelectItem>
                <SelectItem value="completions">Completions Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={enrollmentTrend} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="enrollGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.55 0.16 200)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="oklch(0.55 0.16 200)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="completionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.62 0.19 145)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="oklch(0.62 0.19 145)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0 0)" strokeOpacity={0.7} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "oklch(0.55 0 0)" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "oklch(0.55 0 0)" }} tickLine={false} axisLine={false} />
              <Tooltip content={<EnrollmentTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11 }} iconType="circle" iconSize={8} />
              {(trendView === "enrollments" || trendView === "both") && (
                <Area
                  type="monotone"
                  dataKey="enrollments"
                  name="Enrollments"
                  stroke="oklch(0.55 0.16 200)"
                  strokeWidth={2}
                  fill="url(#enrollGradient)"
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              )}
              {(trendView === "completions" || trendView === "both") && (
                <Area
                  type="monotone"
                  dataKey="completions"
                  name="Completions"
                  stroke="oklch(0.62 0.19 145)"
                  strokeWidth={2}
                  fill="url(#completionGradient)"
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
          <p className="text-[11px] text-muted-foreground mt-1">
            Dec spike = year-end compliance push · Jan surge = new-hire onboarding cycle
          </p>
        </CardContent>
      </Card>

      {/* Two-column: category bar + compliance progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <h2 className="text-base font-semibold">Completion by Category</h2>
            <p className="text-xs text-muted-foreground">Enrolled vs completed across all course categories</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={catData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }} barSize={14}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0 0)" strokeOpacity={0.7} vertical={false} />
                <XAxis
                  dataKey="shortName"
                  tick={{ fontSize: 10, fill: "oklch(0.55 0 0)" }}
                  tickLine={false}
                  axisLine={false}
                  interval={0}
                  angle={-30}
                  textAnchor="end"
                  height={50}
                />
                <YAxis tick={{ fontSize: 11, fill: "oklch(0.55 0 0)" }} tickLine={false} axisLine={false} />
                <Tooltip content={<CategoryTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11 }} iconType="circle" iconSize={8} />
                <Bar dataKey="enrolled" name="Enrolled" fill="oklch(0.55 0.16 200)" fillOpacity={0.25} radius={[3, 3, 0, 0]} />
                <Bar dataKey="completed" name="Completed" fill="oklch(0.55 0.16 200)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <h2 className="text-base font-semibold">Mandatory Course Compliance</h2>
            <p className="text-xs text-muted-foreground">Compliance rate per required course</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complianceSummaries.map((c) => {
                const isAtRisk = c.complianceRate < 85;
                return (
                  <div key={c.courseId} className="space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-medium leading-snug flex-1 line-clamp-1">{c.courseTitle}</p>
                      <span
                        className={cn(
                          "text-xs font-mono tabular-nums font-semibold shrink-0",
                          isAtRisk
                            ? "text-[color:var(--warning)]"
                            : c.complianceRate >= 90
                            ? "text-[color:var(--success)]"
                            : "text-foreground"
                        )}
                      >
                        {c.complianceRate.toFixed(1)}%
                      </span>
                    </div>
                    <Progress
                      value={c.complianceRate}
                      className={cn(
                        "h-1.5",
                        isAtRisk ? "[&>div]:bg-[color:var(--warning)]" : "[&>div]:bg-[color:var(--success)]"
                      )}
                    />
                    <p className="text-[10px] text-muted-foreground">
                      {c.completed}/{c.enrolled} completed · Due{" "}
                      {new Date(c.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform health */}
      <Card>
        <CardHeader className="pb-2">
          <h2 className="text-base font-semibold">Platform Health Summary</h2>
          <p className="text-xs text-muted-foreground">Assessment pass rate vs compliance rate (this period)</p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="shrink-0">
              <ResponsiveContainer width={180} height={180}>
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius={28}
                  outerRadius={78}
                  data={radialData}
                  startAngle={180}
                  endAngle={-180}
                >
                  <RadialBar dataKey="value" cornerRadius={4} label={false}>
                    {radialData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </RadialBar>
                  <Tooltip formatter={(value) => [`${value != null ? value : ""}%`, ""]} />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3 w-full">
              {[
                { label: "Avg Assessment Score", value: `${dashboardStats.avgAssessmentScore}/100`, cls: "text-primary" },
                { label: "Assessment Pass Rate", value: "78%", cls: "text-primary" },
                { label: "Overall Compliance Rate", value: `${dashboardStats.complianceRate}%`, cls: "text-[color:var(--success)]" },
                { label: "Learning Hours This Month", value: `${dashboardStats.learningHoursLoggedThisMonth.toLocaleString()} hrs`, cls: "text-foreground" },
                { label: "Total Enrollments", value: dashboardStats.totalEnrollments.toLocaleString(), cls: "text-foreground" },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between border-b border-border/40 pb-2.5 last:border-0 last:pb-0">
                  <span className="text-sm text-muted-foreground">{row.label}</span>
                  <span className={cn("text-sm font-mono tabular-nums font-semibold", row.cls)}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
