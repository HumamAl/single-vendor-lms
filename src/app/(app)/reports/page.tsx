"use client";

import dynamic from "next/dynamic";
import { dashboardStats, categoryBreakdown, enrollmentTrend, complianceSummaries } from "@/data/mock-data";

const ReportsCharts = dynamic(
  () => import("@/components/reports/reports-charts"),
  { ssr: false }
);

export default function ProgressReportsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Progress Reports
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Enrollment trends, completion rates, and assessment performance
            across all courses
          </p>
        </div>
      </div>

      <ReportsCharts
        dashboardStats={dashboardStats}
        categoryBreakdown={categoryBreakdown}
        enrollmentTrend={enrollmentTrend}
        complianceSummaries={complianceSummaries}
      />
    </div>
  );
}
