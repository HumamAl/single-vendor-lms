"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  courses,
  instructors,
  getInstructorById,
} from "@/data/mock-data";
import type { CourseStatus, CourseCategory, DeliveryType } from "@/lib/types";
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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  ChevronUp,
  ChevronDown,
  Download,
  PlusCircle,
  ShieldAlert,
} from "lucide-react";

// ── Status badge ────────────────────────────────────────────────────────────

function CourseStatusBadge({ status }: { status: CourseStatus }) {
  const config: Record<CourseStatus, { label: string; colorClass: string }> = {
    Published: {
      label: "Published",
      colorClass:
        "text-[color:var(--success)] bg-[color:var(--success)]/10 border-0",
    },
    Draft: {
      label: "Draft",
      colorClass: "text-muted-foreground bg-muted border-0",
    },
    Archived: {
      label: "Archived",
      colorClass: "text-[color:var(--warning)] bg-[color:var(--warning)]/10 border-0",
    },
  };
  const { label, colorClass } = config[status];
  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium rounded-full px-2 py-0", colorClass)}
    >
      {label}
    </Badge>
  );
}

function DeliveryTypeBadge({ type }: { type: DeliveryType }) {
  const config: Record<DeliveryType, string> = {
    "Self-Paced": "text-primary bg-primary/8 border-0",
    ILT: "text-[color:var(--warning)] bg-[color:var(--warning)]/10 border-0",
    Blended: "text-purple-600 bg-purple-50 border-0",
  };
  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium rounded-full px-2 py-0", config[type])}
    >
      {type}
    </Badge>
  );
}

// ── Sort helper ──────────────────────────────────────────────────────────────

type SortKey =
  | "title"
  | "category"
  | "enrollmentCount"
  | "completionRate"
  | "avgScore";

function sortIndicator(key: SortKey, current: SortKey, dir: "asc" | "desc") {
  if (key !== current) return null;
  return dir === "asc" ? (
    <ChevronUp className="w-3 h-3 inline ml-0.5" />
  ) : (
    <ChevronDown className="w-3 h-3 inline ml-0.5" />
  );
}

// ── Categories list ──────────────────────────────────────────────────────────

const ALL_CATEGORIES: CourseCategory[] = [
  "Compliance & Regulatory",
  "Health & Safety",
  "Onboarding",
  "Sales Enablement",
  "IT & Security",
  "Leadership & Management",
  "Product Knowledge",
  "Customer Service",
  "Professional Skills",
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function CourseCatalogPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<CourseStatus | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<CourseCategory | "all">(
    "all"
  );
  const [sortKey, setSortKey] = useState<SortKey>("enrollmentCount");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const displayed = useMemo(() => {
    return courses
      .filter((c) => {
        const matchesStatus =
          statusFilter === "all" || c.status === statusFilter;
        const matchesCategory =
          categoryFilter === "all" || c.category === categoryFilter;
        const q = search.toLowerCase();
        const matchesSearch =
          q === "" ||
          c.title.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.contentType.toLowerCase().includes(q);
        return matchesStatus && matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        const av = a[sortKey] ?? -1;
        const bv = b[sortKey] ?? -1;
        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
  }, [search, statusFilter, categoryFilter, sortKey, sortDir]);

  const publishedCount = courses.filter((c) => c.status === "Published").length;
  const draftCount = courses.filter((c) => c.status === "Draft").length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Course Catalog</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {publishedCount} published · {draftCount} draft ·{" "}
            {courses.length} total courses
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="w-3.5 h-3.5" />
            Export
          </Button>
          <Button size="sm" className="gap-1.5">
            <PlusCircle className="w-3.5 h-3.5" />
            New Course
          </Button>
        </div>
      </div>

      {/* Summary stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Published",
            value: publishedCount,
            sub: "Active in catalog",
            color: "text-[color:var(--success)]",
          },
          {
            label: "Draft",
            value: draftCount,
            sub: "Pending publish",
            color: "text-muted-foreground",
          },
          {
            label: "Compliance",
            value: courses.filter((c) => c.isCompliance).length,
            sub: "Mandatory courses",
            color: "text-[color:var(--warning)]",
          },
          {
            label: "Avg Completion",
            value: `${(
              courses
                .filter((c) => c.status === "Published")
                .reduce((s, c) => s + c.completionRate, 0) /
              publishedCount
            ).toFixed(1)}%`,
            sub: "Across published",
            color: "text-primary",
          },
        ].map((stat) => (
          <Card key={stat.label} className="p-4">
            <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
            <p className={cn("text-2xl font-bold font-mono tabular-nums", stat.color)}>
              {stat.value}
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              {stat.sub}
            </p>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search courses, categories, content type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as CourseStatus | "all")}
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Published">Published</SelectItem>
            <SelectItem value="Draft">Draft</SelectItem>
            <SelectItem value="Archived">Archived</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={categoryFilter}
          onValueChange={(v) =>
            setCategoryFilter(v as CourseCategory | "all")
          }
        >
          <SelectTrigger className="w-52">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {ALL_CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <span className="text-sm text-muted-foreground shrink-0">
          {displayed.length} {displayed.length === 1 ? "course" : "courses"}
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
                  onClick={() => handleSort("title")}
                >
                  Course Title {sortIndicator("title", sortKey, sortDir)}
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors duration-100"
                  onClick={() => handleSort("category")}
                >
                  Category {sortIndicator("category", sortKey, sortDir)}
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground">
                  Delivery Type
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground cursor-pointer select-none text-right hover:text-foreground transition-colors duration-100"
                  onClick={() => handleSort("enrollmentCount")}
                >
                  Enrolled {sortIndicator("enrollmentCount", sortKey, sortDir)}
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors duration-100 min-w-[140px]"
                  onClick={() => handleSort("completionRate")}
                >
                  Completion Rate{" "}
                  {sortIndicator("completionRate", sortKey, sortDir)}
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground cursor-pointer select-none text-right hover:text-foreground transition-colors duration-100"
                  onClick={() => handleSort("avgScore")}
                >
                  Avg Score {sortIndicator("avgScore", sortKey, sortDir)}
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayed.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-32 text-center text-sm text-muted-foreground"
                  >
                    No courses match this filter.
                  </TableCell>
                </TableRow>
              ) : (
                displayed.map((course) => {
                  const instructor = getInstructorById(course.instructorId);
                  return (
                    <TableRow
                      key={course.id}
                      className="hover:bg-[color:var(--surface-hover)] transition-colors duration-100"
                    >
                      <TableCell className="max-w-[260px]">
                        <div className="flex items-start gap-2">
                          {course.isCompliance && (
                            <ShieldAlert className="w-3.5 h-3.5 text-[color:var(--warning)] mt-0.5 shrink-0" />
                          )}
                          <div>
                            <p className="text-sm font-medium leading-snug line-clamp-2">
                              {course.title}
                            </p>
                            <p className="text-[11px] text-muted-foreground mt-0.5">
                              {course.moduleCount} modules ·{" "}
                              {course.durationHours}h ·{" "}
                              {instructor?.name ?? "—"}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                        {course.category}
                      </TableCell>
                      <TableCell>
                        <DeliveryTypeBadge type={course.deliveryType} />
                      </TableCell>
                      <TableCell className="text-sm font-mono tabular-nums text-right">
                        {course.enrollmentCount}
                      </TableCell>
                      <TableCell className="min-w-[140px]">
                        {course.status === "Draft" || course.enrollmentCount === 0 ? (
                          <span className="text-sm text-muted-foreground">—</span>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Progress
                              value={course.completionRate}
                              className="h-1.5 flex-1"
                            />
                            <span className="text-xs font-mono tabular-nums text-muted-foreground w-10 text-right">
                              {course.completionRate.toFixed(1)}%
                            </span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-sm font-mono tabular-nums text-right">
                        {course.avgScore !== null
                          ? `${course.avgScore.toFixed(1)}`
                          : "—"}
                      </TableCell>
                      <TableCell>
                        <CourseStatusBadge status={course.status} />
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <p className="text-xs text-muted-foreground">
        <ShieldAlert className="w-3 h-3 inline mr-1 text-[color:var(--warning)]" />
        Compliance-mandatory courses are flagged. Completion rate is hidden for
        Draft courses with no enrollments.
      </p>
    </div>
  );
}
