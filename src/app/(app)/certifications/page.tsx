"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  certifications,
  learners,
  getLearnerById,
} from "@/data/mock-data";
import type { CertificationStatus } from "@/lib/types";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Search,
  Download,
  Award,
  AlertTriangle,
  ShieldOff,
  Clock,
  CheckCircle2,
  ChevronUp,
  ChevronDown,
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

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function expiryLabel(daysUntilExpiry: number): string {
  if (daysUntilExpiry < 0) {
    return `Expired ${Math.abs(daysUntilExpiry)}d ago`;
  }
  if (daysUntilExpiry === 0) return "Expires today";
  if (daysUntilExpiry <= 30)
    return `Expires in ${daysUntilExpiry}d`;
  const months = Math.round(daysUntilExpiry / 30);
  return `Expires in ~${months}mo`;
}

// ── Status badge ──────────────────────────────────────────────────────────────

function CertStatusBadge({ status }: { status: CertificationStatus }) {
  const config: Record<
    CertificationStatus,
    { label: string; icon: React.ElementType; colorClass: string }
  > = {
    Active: {
      label: "Active",
      icon: CheckCircle2,
      colorClass: "text-[color:var(--success)] bg-[color:var(--success)]/10 border-0",
    },
    "Expiring Soon": {
      label: "Expiring Soon",
      icon: Clock,
      colorClass: "text-[color:var(--warning)] bg-[color:var(--warning)]/10 border-0",
    },
    Expired: {
      label: "Expired",
      icon: ShieldOff,
      colorClass: "text-destructive bg-destructive/10 border-0",
    },
    Revoked: {
      label: "Revoked",
      icon: ShieldOff,
      colorClass: "text-muted-foreground bg-muted border-0",
    },
  };
  const { label, icon: Icon, colorClass } = config[status];
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-xs font-medium rounded-full px-2 py-0 gap-1 inline-flex items-center",
        colorClass
      )}
    >
      <Icon className="w-3 h-3" />
      {label}
    </Badge>
  );
}

// ── Sort ──────────────────────────────────────────────────────────────────────

type SortKey = "certificationName" | "issuedDate" | "expiryDate" | "daysUntilExpiry";

function sortIndicator(key: SortKey, current: SortKey, dir: "asc" | "desc") {
  if (key !== current) return null;
  return dir === "asc" ? (
    <ChevronUp className="w-3 h-3 inline ml-0.5" />
  ) : (
    <ChevronDown className="w-3 h-3 inline ml-0.5" />
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function CertificationsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<CertificationStatus | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>("daysUntilExpiry");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const expiringSoonCount = certifications.filter(
    (c) => c.status === "Expiring Soon"
  ).length;
  const expiredCount = certifications.filter(
    (c) => c.status === "Expired"
  ).length;
  const activeCount = certifications.filter(
    (c) => c.status === "Active"
  ).length;

  const displayed = useMemo(() => {
    return certifications
      .filter((c) => {
        const matchesStatus =
          statusFilter === "all" || c.status === statusFilter;
        const learner = getLearnerById(c.learnerId);
        const q = search.toLowerCase();
        const matchesSearch =
          q === "" ||
          c.certificationName.toLowerCase().includes(q) ||
          (learner?.name ?? "").toLowerCase().includes(q) ||
          (learner?.department ?? "").toLowerCase().includes(q);
        return matchesStatus && matchesSearch;
      })
      .sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        if (typeof av === "string" && typeof bv === "string") {
          return sortDir === "asc"
            ? av.localeCompare(bv)
            : bv.localeCompare(av);
        }
        if (typeof av === "number" && typeof bv === "number") {
          return sortDir === "asc" ? av - bv : bv - av;
        }
        return 0;
      });
  }, [search, statusFilter, sortKey, sortDir]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Certifications</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {certifications.length} certificates issued ·{" "}
            <span className="text-[color:var(--success)] font-medium">
              {activeCount} active
            </span>{" "}
            ·{" "}
            <span className="text-[color:var(--warning)] font-medium">
              {expiringSoonCount} expiring soon
            </span>
            {expiredCount > 0 && (
              <>
                {" "}
                ·{" "}
                <span className="text-destructive font-medium">
                  {expiredCount} expired
                </span>
              </>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="w-3.5 h-3.5" />
            Export
          </Button>
          <Button size="sm" className="gap-1.5">
            <Award className="w-3.5 h-3.5" />
            Issue Certificate
          </Button>
        </div>
      </div>

      {/* Warning stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Active",
            value: activeCount,
            Icon: CheckCircle2,
            colorClass: "text-[color:var(--success)]",
            bgClass: "bg-[color:var(--success)]/8",
          },
          {
            label: "Expiring Soon",
            value: expiringSoonCount,
            Icon: Clock,
            colorClass: "text-[color:var(--warning)]",
            bgClass: "bg-[color:var(--warning)]/8",
          },
          {
            label: "Expired",
            value: expiredCount,
            Icon: ShieldOff,
            colorClass: "text-destructive",
            bgClass: "bg-destructive/8",
          },
          {
            label: "Total Issued",
            value: certifications.length,
            Icon: Award,
            colorClass: "text-primary",
            bgClass: "bg-primary/8",
          },
        ].map((stat) => (
          <Card key={stat.label} className="p-4">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                  stat.bgClass
                )}
              >
                <stat.Icon
                  className={cn("w-4 h-4", stat.colorClass)}
                />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p
                  className={cn(
                    "text-2xl font-bold font-mono tabular-nums",
                    stat.colorClass
                  )}
                >
                  {stat.value}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Expiring soon alert */}
      {expiringSoonCount > 0 && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[color:var(--warning)]/8 border border-[color:var(--warning)]/30 text-sm">
          <AlertTriangle className="w-4 h-4 text-[color:var(--warning)] shrink-0" />
          <span>
            <span className="font-medium text-[color:var(--warning)]">
              {expiringSoonCount} certificate{expiringSoonCount > 1 ? "s" : ""}
            </span>{" "}
            will expire within 30 days. Learners should re-enroll in the
            qualifying course before the expiry date to maintain their
            certification.
          </span>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto text-[color:var(--warning)] border-[color:var(--warning)]/30 hover:bg-[color:var(--warning)]/8 text-xs whitespace-nowrap"
            onClick={() => setStatusFilter("Expiring Soon")}
          >
            View Expiring
          </Button>
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by learner name, certification, department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select
          value={statusFilter}
          onValueChange={(v) =>
            setStatusFilter(v as CertificationStatus | "all")
          }
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Expiring Soon">Expiring Soon</SelectItem>
            <SelectItem value="Expired">Expired</SelectItem>
            <SelectItem value="Revoked">Revoked</SelectItem>
          </SelectContent>
        </Select>

        <span className="text-sm text-muted-foreground shrink-0">
          {displayed.length}{" "}
          {displayed.length === 1 ? "certificate" : "certificates"}
        </span>
      </div>

      {/* Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground">
                  Learner
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors duration-100"
                  onClick={() => handleSort("certificationName")}
                >
                  Certification{" "}
                  {sortIndicator("certificationName", sortKey, sortDir)}
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors duration-100"
                  onClick={() => handleSort("issuedDate")}
                >
                  Issued Date {sortIndicator("issuedDate", sortKey, sortDir)}
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors duration-100"
                  onClick={() => handleSort("expiryDate")}
                >
                  Expiry Date {sortIndicator("expiryDate", sortKey, sortDir)}
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors duration-100"
                  onClick={() => handleSort("daysUntilExpiry")}
                >
                  Time to Expiry{" "}
                  {sortIndicator("daysUntilExpiry", sortKey, sortDir)}
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
                    colSpan={6}
                    className="h-32 text-center text-sm text-muted-foreground"
                  >
                    No certificates match this filter.
                  </TableCell>
                </TableRow>
              ) : (
                displayed.map((cert) => {
                  const learner = getLearnerById(cert.learnerId);
                  const isExpiring = cert.status === "Expiring Soon";
                  const isExpired = cert.status === "Expired";

                  return (
                    <TableRow
                      key={cert.id}
                      className={cn(
                        "hover:bg-[color:var(--surface-hover)] transition-colors duration-100",
                        isExpiring && "bg-[color:var(--warning)]/4",
                        isExpired && "bg-destructive/3"
                      )}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <Avatar className="h-7 w-7">
                            <AvatarFallback className="text-[10px] bg-primary/8 text-primary font-semibold">
                              {learner ? getInitials(learner.name) : "?"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">
                              {learner?.name ?? cert.learnerId}
                            </p>
                            <p className="text-[11px] text-muted-foreground">
                              {learner?.department ?? "—"}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px]">
                        <p className="text-sm font-medium line-clamp-2">
                          {cert.certificationName}
                        </p>
                      </TableCell>
                      <TableCell className="text-sm font-mono tabular-nums text-muted-foreground whitespace-nowrap">
                        {formatDate(cert.issuedDate)}
                      </TableCell>
                      <TableCell
                        className={cn(
                          "text-sm font-mono tabular-nums whitespace-nowrap",
                          isExpired
                            ? "text-destructive"
                            : isExpiring
                            ? "text-[color:var(--warning)]"
                            : "text-muted-foreground"
                        )}
                      >
                        {formatDate(cert.expiryDate)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          {isExpired && (
                            <ShieldOff className="w-3.5 h-3.5 text-destructive shrink-0" />
                          )}
                          {isExpiring && (
                            <Clock className="w-3.5 h-3.5 text-[color:var(--warning)] shrink-0" />
                          )}
                          <span
                            className={cn(
                              "text-xs font-mono tabular-nums",
                              isExpired
                                ? "text-destructive font-medium"
                                : isExpiring
                                ? "text-[color:var(--warning)] font-medium"
                                : "text-muted-foreground"
                            )}
                          >
                            {expiryLabel(cert.daysUntilExpiry)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <CertStatusBadge status={cert.status} />
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
        Certifications sorted by time to expiry by default. Click column headers
        to re-sort. Use the "Expiring Soon" filter to identify learners who need
        to re-enroll before their certification lapses.
      </p>
    </div>
  );
}
