"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  learners,
  enrollments,
  getCertificationsByLearner,
  getEnrollmentsByLearner,
} from "@/data/mock-data";
import type { EnrollmentStatus } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Search,
  UserPlus,
  Download,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Trophy,
  AlertCircle,
  Clock,
} from "lucide-react";

// ── Helpers ───────────────────────────────────────────────────────────────────

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatLastActive(iso: string): string {
  const diff = Math.floor(
    (new Date("2026-03-02").getTime() - new Date(iso).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff < 7) return `${diff}d ago`;
  if (diff < 30) return `${Math.floor(diff / 7)}w ago`;
  return `${Math.floor(diff / 30)}mo ago`;
}

type LearnerStatusFilter = "all" | "active" | "overdue" | "inactive";

function getLearnerStatus(learnerId: string): LearnerStatusFilter {
  const learnerEnrollments = enrollments.filter(
    (e) => e.learnerId === learnerId
  );
  if (learnerEnrollments.some((e) => e.status === "Overdue")) return "overdue";
  if (learnerEnrollments.some((e) => e.status === "In Progress"))
    return "active";
  return "inactive";
}

type SortKey = "name" | "activeEnrollments" | "completedCourses" | "avgScore";

function sortIndicator(key: SortKey, current: SortKey, dir: "asc" | "desc") {
  if (key !== current) return null;
  return dir === "asc" ? (
    <ChevronUp className="w-3 h-3 inline ml-0.5" />
  ) : (
    <ChevronDown className="w-3 h-3 inline ml-0.5" />
  );
}

// ── Enrollment status badge ───────────────────────────────────────────────────

function EnrollmentStatusBadge({ status }: { status: EnrollmentStatus }) {
  const config: Record<
    EnrollmentStatus,
    { label: string; colorClass: string }
  > = {
    Completed: {
      label: "Completed",
      colorClass: "text-[color:var(--success)] bg-[color:var(--success)]/10 border-0",
    },
    "In Progress": {
      label: "In Progress",
      colorClass: "text-primary bg-primary/8 border-0",
    },
    "Not Started": {
      label: "Not Started",
      colorClass: "text-muted-foreground bg-muted border-0",
    },
    Overdue: {
      label: "Overdue",
      colorClass: "text-destructive bg-destructive/10 border-0",
    },
    Failed: {
      label: "Failed",
      colorClass: "text-[color:var(--warning)] bg-[color:var(--warning)]/10 border-0",
    },
    Waived: {
      label: "Waived",
      colorClass: "text-muted-foreground bg-muted/80 border-0",
    },
    Withdrawn: {
      label: "Withdrawn",
      colorClass: "text-muted-foreground bg-muted/80 border-0",
    },
  };
  const c = config[status] ?? config["Not Started"];
  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium rounded-full px-2 py-0", c.colorClass)}
    >
      {c.label}
    </Badge>
  );
}

// ── All unique departments ─────────────────────────────────────────────────────

const ALL_DEPARTMENTS = Array.from(
  new Set(learners.map((l) => l.department))
).sort();

// ── Page ─────────────────────────────────────────────────────────────────────

export default function LearnerManagementPage() {
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [statusFilter, setStatusFilter] =
    useState<LearnerStatusFilter>("all");
  const [sortKey, setSortKey] = useState<SortKey>("completedCourses");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const displayed = useMemo(() => {
    return learners
      .filter((l) => {
        const q = search.toLowerCase();
        const matchesSearch =
          q === "" ||
          l.name.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          l.department.toLowerCase().includes(q) ||
          l.group.toLowerCase().includes(q);
        const matchesDept = deptFilter === "all" || l.department === deptFilter;
        const ls = getLearnerStatus(l.id);
        const matchesStatus =
          statusFilter === "all" || ls === statusFilter;
        return matchesSearch && matchesDept && matchesStatus;
      })
      .sort((a, b) => {
        const av = a[sortKey] ?? -1;
        const bv = b[sortKey] ?? -1;
        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
  }, [search, deptFilter, statusFilter, sortKey, sortDir]);

  const overdueCount = learners.filter(
    (l) => getLearnerStatus(l.id) === "overdue"
  ).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Learner Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {learners.length} enrolled learners ·{" "}
            <span className="text-destructive font-medium">
              {overdueCount} with overdue enrollments
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="w-3.5 h-3.5" />
            Export
          </Button>
          <Button size="sm" className="gap-1.5">
            <UserPlus className="w-3.5 h-3.5" />
            Import Learners
          </Button>
        </div>
      </div>

      {/* Alert banner if overdue */}
      {overdueCount > 0 && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-destructive/6 border border-destructive/20 text-sm">
          <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
          <span>
            <span className="font-medium text-destructive">
              {overdueCount} learners
            </span>{" "}
            have overdue enrollments. Use the filter below to view them and send
            reminders.
          </span>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto text-destructive border-destructive/30 hover:bg-destructive/8 text-xs"
            onClick={() => setStatusFilter("overdue")}
          >
            View Overdue
          </Button>
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by learner name, email, department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select value={deptFilter} onValueChange={setDeptFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All departments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {ALL_DEPARTMENTS.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={statusFilter}
          onValueChange={(v) =>
            setStatusFilter(v as LearnerStatusFilter)
          }
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Learners</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="overdue">Has Overdue</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>

        <span className="text-sm text-muted-foreground shrink-0">
          {displayed.length} {displayed.length === 1 ? "learner" : "learners"}
        </span>
      </div>

      {/* Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors duration-100"
                  onClick={() => handleSort("name")}
                >
                  Learner {sortIndicator("name", sortKey, sortDir)}
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground">
                  Department
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground cursor-pointer select-none text-right hover:text-foreground transition-colors duration-100"
                  onClick={() => handleSort("activeEnrollments")}
                >
                  Active Enrollments{" "}
                  {sortIndicator("activeEnrollments", sortKey, sortDir)}
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground cursor-pointer select-none text-right hover:text-foreground transition-colors duration-100"
                  onClick={() => handleSort("completedCourses")}
                >
                  Completed {sortIndicator("completedCourses", sortKey, sortDir)}
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground cursor-pointer select-none text-right hover:text-foreground transition-colors duration-100"
                  onClick={() => handleSort("avgScore")}
                >
                  Avg Score {sortIndicator("avgScore", sortKey, sortDir)}
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground">
                  Last Active
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground w-8" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayed.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-32 text-center text-sm text-muted-foreground"
                  >
                    No learners match this filter.
                  </TableCell>
                </TableRow>
              ) : (
                displayed.map((learner) => {
                  const isExpanded = expandedId === learner.id;
                  const learnerEnrollments = getEnrollmentsByLearner(learner.id);
                  const certs = getCertificationsByLearner(learner.id);
                  const hasOverdue = learnerEnrollments.some(
                    (e) => e.status === "Overdue"
                  );
                  const isHighPerformer =
                    learner.completedCourses >= 15 &&
                    (learner.avgScore ?? 0) >= 93;

                  return (
                    <>
                      <TableRow
                        key={learner.id}
                        className={cn(
                          "cursor-pointer hover:bg-[color:var(--surface-hover)] transition-colors duration-100",
                          isExpanded && "bg-[color:var(--surface-hover)]"
                        )}
                        onClick={() =>
                          setExpandedId(isExpanded ? null : learner.id)
                        }
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs bg-primary/8 text-primary font-semibold">
                                {getInitials(learner.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-sm font-medium">
                                  {learner.name}
                                </span>
                                {isHighPerformer && (
                                  <Trophy className="w-3 h-3 text-[color:var(--warning)]" />
                                )}
                                {hasOverdue && (
                                  <AlertCircle className="w-3 h-3 text-destructive" />
                                )}
                              </div>
                              <p className="text-[11px] text-muted-foreground">
                                {learner.role} · {learner.group}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {learner.department}
                        </TableCell>
                        <TableCell className="text-sm font-mono tabular-nums text-right">
                          {learner.activeEnrollments}
                        </TableCell>
                        <TableCell className="text-sm font-mono tabular-nums text-right">
                          {learner.completedCourses}
                        </TableCell>
                        <TableCell className="text-right">
                          {learner.avgScore !== null ? (
                            <span
                              className={cn(
                                "text-sm font-mono tabular-nums",
                                (learner.avgScore ?? 0) >= 90
                                  ? "text-[color:var(--success)]"
                                  : (learner.avgScore ?? 0) < 70
                                  ? "text-destructive"
                                  : "text-foreground"
                              )}
                            >
                              {learner.avgScore.toFixed(1)}
                            </span>
                          ) : (
                            <span className="text-sm text-muted-foreground">
                              —
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {formatLastActive(learner.lastActive)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <ChevronRight
                            className={cn(
                              "w-4 h-4 text-muted-foreground transition-transform duration-150",
                              isExpanded && "rotate-90"
                            )}
                          />
                        </TableCell>
                      </TableRow>

                      {isExpanded && (
                        <TableRow key={`${learner.id}-expanded`}>
                          <TableCell
                            colSpan={7}
                            className="bg-muted/30 p-4"
                          >
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                                  Enrollment Details
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {certs.length} certificate
                                  {certs.length !== 1 ? "s" : ""} issued
                                </p>
                              </div>

                              {learnerEnrollments.length === 0 ? (
                                <p className="text-sm text-muted-foreground">
                                  No enrollment records found.
                                </p>
                              ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {learnerEnrollments.map((enr) => {
                                    const courseName =
                                      enr.courseId
                                        .replace("crs_", "")
                                        .slice(0, 4) + "...";
                                    return (
                                      <div
                                        key={enr.id}
                                        className="flex items-center gap-3 bg-background rounded-md p-3 border border-border/40"
                                      >
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center justify-between gap-2 mb-1">
                                            <span className="text-xs font-medium truncate">
                                              {enr.courseId}
                                            </span>
                                            <EnrollmentStatusBadge
                                              status={enr.status}
                                            />
                                          </div>
                                          {enr.status !== "Not Started" &&
                                            enr.status !== "Waived" &&
                                            enr.status !== "Withdrawn" && (
                                              <div className="flex items-center gap-2">
                                                <Progress
                                                  value={enr.progressPct}
                                                  className="h-1 flex-1"
                                                />
                                                <span className="text-[11px] font-mono text-muted-foreground">
                                                  {enr.progressPct}%
                                                </span>
                                              </div>
                                            )}
                                          {enr.dueDate && (
                                            <p className="text-[11px] text-muted-foreground mt-0.5">
                                              Due{" "}
                                              {new Date(
                                                enr.dueDate
                                              ).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                              })}
                                              {enr.daysOverdue && (
                                                <span className="text-destructive ml-1">
                                                  · {enr.daysOverdue}d overdue
                                                </span>
                                              )}
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <p className="text-xs text-muted-foreground">
        Click any learner row to expand enrollment details. Trophy icon indicates
        high-performers (15+ completions, 93+ avg score).
      </p>
    </div>
  );
}
