import type { LucideIcon } from "lucide-react";

// ─── Sidebar Navigation (template requirement) ────────────────────────────────
export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

// ─── Challenge Visualization (template requirement) ───────────────────────────
export type VisualizationType =
  | "flow"
  | "before-after"
  | "metrics"
  | "architecture"
  | "risk-matrix"
  | "timeline"
  | "dual-kpi"
  | "tech-stack"
  | "decision-flow";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  visualizationType: VisualizationType;
  outcome?: string;
}

// ─── Proposal Types (template requirement) ────────────────────────────────────
export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  approach: { title: string; description: string }[];
  skillCategories: { name: string; skills: string[] }[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
  relevance?: string;
  outcome?: string;
  liveUrl?: string;
}

// ─── Screen definition for frame-based demo formats (template requirement) ────
export interface DemoScreen {
  id: string;
  label: string;
  icon?: LucideIcon;
  href: string;
}

// ─── Conversion element variant types (template requirement) ──────────────────
export type ConversionVariant = "sidebar" | "inline" | "floating" | "banner";

// ═══════════════════════════════════════════════════════════════════════════════
// LMS Domain Types
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Enrollment Statuses ──────────────────────────────────────────────────────
export type EnrollmentStatus =
  | "Not Started"
  | "In Progress"
  | "Completed"
  | "Overdue"
  | "Failed"
  | "Waived"
  | "Withdrawn";

// ─── Course Statuses ──────────────────────────────────────────────────────────
export type CourseStatus = "Published" | "Draft" | "Archived";

// ─── Course Delivery Types ────────────────────────────────────────────────────
export type DeliveryType = "Self-Paced" | "ILT" | "Blended";

// ─── Course Categories ────────────────────────────────────────────────────────
export type CourseCategory =
  | "Compliance & Regulatory"
  | "Onboarding"
  | "Sales Enablement"
  | "IT & Security"
  | "Leadership & Management"
  | "Product Knowledge"
  | "Customer Service"
  | "Professional Skills"
  | "Health & Safety";

// ─── Certification Statuses ───────────────────────────────────────────────────
export type CertificationStatus = "Active" | "Expiring Soon" | "Expired" | "Revoked";

// ─── Assessment Attempt Results ───────────────────────────────────────────────
export type AssessmentResult = "Passed" | "Failed" | "Not Attempted";

// ─── Learner Role ─────────────────────────────────────────────────────────────
export type LearnerRole = "Learner" | "Manager" | "Instructor" | "L&D Admin";

// ─── Course ───────────────────────────────────────────────────────────────────
export interface Course {
  id: string;
  title: string;
  category: CourseCategory;
  deliveryType: DeliveryType;
  status: CourseStatus;
  completionRate: number;
  enrollmentCount: number;
  /** Null when no assessments have been attempted yet */
  avgScore: number | null;
  durationHours: number;
  /** True for OSHA, anti-harassment, GDPR, SOX, and similar mandatory courses */
  isCompliance: boolean;
  instructorId: string;
  moduleCount: number;
  /** Mastery score threshold, 0–100 */
  passingScore: number;
  /** Max allowed assessment retries; null = unlimited */
  maxAttempts: number | null;
  createdAt: string;
  publishedAt: string | null;
  contentType: "SCORM" | "xAPI" | "Video" | "PDF" | "Blended";
}

// ─── Instructor ───────────────────────────────────────────────────────────────
export interface Instructor {
  id: string;
  name: string;
  title: string;
  email: string;
  activeCourses: number;
}

// ─── Learner ──────────────────────────────────────────────────────────────────
export interface Learner {
  id: string;
  name: string;
  email: string;
  department: string;
  /** Named group assignment — e.g., "Sales Team", "Region East" */
  group: string;
  role: LearnerRole;
  activeEnrollments: number;
  completedCourses: number;
  /** Mean score across all graded submissions; null if no assessments taken */
  avgScore: number | null;
  lastActive: string;
  enrolledAt: string;
}

// ─── Enrollment ───────────────────────────────────────────────────────────────
export interface Enrollment {
  id: string;
  learnerId: string;
  courseId: string;
  status: EnrollmentStatus;
  /** 0–100 percentage of modules completed */
  progressPct: number;
  dueDate: string | null;
  enrolledAt: string;
  /** ISO date when learner first accessed course content; null = never started */
  startedAt: string | null;
  completedAt: string | null;
  /** Admin-entered reason; present only when status === "Waived" */
  waiverReason?: string;
  /** Only meaningful when status === "Overdue" */
  daysOverdue?: number;
  lastAccessedAt: string | null;
}

// ─── Certification ────────────────────────────────────────────────────────────
export interface Certification {
  id: string;
  learnerId: string;
  courseId: string;
  certificationName: string;
  issuedDate: string;
  expiryDate: string;
  status: CertificationStatus;
  /** Positive = days remaining; negative = days past expiry */
  daysUntilExpiry: number;
}

// ─── Assessment Attempt ───────────────────────────────────────────────────────
export interface AssessmentAttempt {
  id: string;
  enrollmentId: string;
  learnerId: string;
  courseId: string;
  score: number;
  passingScore: number;
  result: AssessmentResult;
  attemptNumber: number;
  /** True when learner has exhausted all allowed retries */
  maxAttemptsReached: boolean;
  submittedAt: string;
}

// ─── Dashboard KPI Stats ──────────────────────────────────────────────────────
export interface DashboardStats {
  activeLearners: number;
  activeLearnersChange: number;
  courseCompletionRate: number;
  completionRateChange: number;
  certificatesIssuedThisMonth: number;
  certificatesChange: number;
  overdueEnrollments: number;
  overdueEnrollmentsChange: number;
  totalEnrollments: number;
  totalCourses: number;
  publishedCourses: number;
  complianceRate: number;
  avgAssessmentScore: number;
  learningHoursLoggedThisMonth: number;
}

// ─── Chart Data Shapes ────────────────────────────────────────────────────────

/** Monthly enrollment volume with completion rate overlay — 12-month time series */
export interface EnrollmentTrendPoint {
  month: string;
  enrollments: number;
  completions: number;
  completionRate: number;
}

/** Categorical breakdown by course category */
export interface CategoryBreakdownPoint {
  category: string;
  enrolled: number;
  completed: number;
  completionRate: number;
}

/** Overdue enrollment alert item for the live dashboard alert feed */
export interface OverdueAlert {
  enrollmentId: string;
  learnerName: string;
  learnerId: string;
  courseTitle: string;
  courseId: string;
  department: string;
  daysOverdue: number;
  progressPct: number;
  dueDate: string;
}

/** Compliance summary per mandatory course */
export interface ComplianceSummary {
  courseId: string;
  courseTitle: string;
  enrolled: number;
  completed: number;
  complianceRate: number;
  dueDate: string;
}
