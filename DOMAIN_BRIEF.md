# Domain Knowledge Brief — Single Vendor Corporate LMS

## Sub-Domain Classification

**Single-vendor corporate Learning Management System (LMS)** — an internally operated training platform where one organization (the vendor/company) authors, manages, and delivers all learning content to their own learners (employees, customers, or partners). Not a marketplace with external instructors. Think: a company deploying mandatory compliance training, new-hire onboarding paths, and continuing professional development all from one admin-controlled portal. Scale: 200–5,000 active learners, 50–300 courses, single L&D team managing content. Closest real-world references: TalentLMS (as a self-managed install), Docebo Enterprise, LearnUpon, Absorb LMS.

---

## Job Analyst Vocabulary — Confirmed and Extended

No Job Analyst brief was received before this research. Vocabulary below is built directly from industry research.

### Confirmed Primary Entity Names

These are the terms that must appear verbatim in every UI label — sidebar nav, table headers, KPI card titles, status badges, search placeholders.

- **Primary record type**: "Course" (not "product", not "class") — the top-level unit of learning content
- **Secondary record**: "Module" (sub-unit within a course), "Lesson" (atomic content unit within a module)
- **Learning progression**: "Learning Path" (a curated sequence of courses assigned as a bundle)
- **Learner record**: "Enrollment" (the record linking a learner to a course), not "registration" or "subscription"
- **Assessment record**: "Quiz" or "Assessment" (both used; Quiz = formative, Assessment = summative)
- **Completion credential**: "Certificate" (what learners earn), "Certification" (the credential type/template)
- **People roles**:
  - "Learner" (the person taking courses — NOT "student", "user", or "participant" in B2B LMS context)
  - "Instructor" (the person who delivers ILT sessions or is listed as course author)
  - "Admin" / "L&D Admin" (the person managing the platform)
  - "Manager" (a supervisor who can view their team's progress reports)
- **Organizational grouping**: "Group" (a named set of learners, e.g., "Sales Team", "Region East") — NOT "cohort" in corporate LMS; "Branch" is used in TalentLMS/Docebo for org-hierarchy sub-groups
- **Content standards**: "SCORM" (the most common content format), "xAPI / Tin Can" (modern activity tracking), "AICC" (legacy, rarely used post-2020)
- **Live session type**: "ILT" (Instructor-Led Training) — the term for a live/classroom session tracked in the LMS
- **Seat**: one learner's access to one course instance — important for license-based billing
- **Due date**: "Due Date" on an enrollment — course must be completed by this date

### Expanded KPI Vocabulary

| KPI Name | What It Measures | Typical Format |
|---|---|---|
| Course Completion Rate | % of enrolled learners who completed the course | % (e.g., 74%) |
| Enrollment Count | Total learner-course enrollment records in the period | Count (e.g., 1,247) |
| Active Learners | Learners who logged in and accessed content in last 30 days | Count (e.g., 483) |
| Assessment Pass Rate | % of assessment attempts that result in a passing score | % (e.g., 81%) |
| Avg Assessment Score | Mean score across all graded submissions | Score (e.g., 78/100) |
| Overdue Enrollments | Learner-course pairs where due date has passed without completion | Count (e.g., 34) |
| Certificates Issued | Certificates issued in the selected period | Count (e.g., 218) |
| Avg Time to Complete | Mean time learners take to finish a course from first access to completion | Hours/Days (e.g., 4.2 hrs) |
| Learning Hours Logged | Total hours of content consumed by all learners in period | Hours (e.g., 1,840 hrs) |
| Learner Satisfaction Score | Avg rating on post-course feedback survey (1–5 scale) | Score (e.g., 4.3/5) |
| Compliance Rate | % of learners who completed mandatory/compliance-tagged courses | % (e.g., 94%) |
| Expiring Certifications | Certifications that will expire within next 30 or 60 days | Count (e.g., 47) |

### Status Label Vocabulary

**Enrollment statuses** (these go directly into table badges and filter dropdowns):
- Active states: "In Progress", "Not Started", "Enrolled"
- Completion states: "Completed", "Passed", "Failed"
- Problem states: "Overdue", "Expired", "Incomplete"
- Administrative states: "Waived", "Withdrawn"

**Course statuses**:
- Active states: "Published", "Active"
- Inactive states: "Draft", "Archived", "Inactive"
- Delivery states: "Self-Paced", "ILT", "Blended"

**Assessment attempt statuses**:
- "Not Attempted", "In Progress", "Submitted", "Passed", "Failed", "Graded"

**Certification statuses**:
- "Active", "Expiring Soon", "Expired", "Revoked"

### Workflow and Action Vocabulary

**Primary actions (button labels, action menus)**:
- "Enroll" / "Enroll Learners" (add learners to a course)
- "Assign" (assign a learning path or course to a group)
- "Publish" (make a draft course visible to learners)
- "Archive" (remove a course from active catalog without deleting)
- "Issue Certificate" (manually trigger certificate generation)
- "Send Reminder" (email learners with incomplete/overdue status)
- "Import Users" (bulk-add learners via CSV)
- "Reset Attempt" (clear a failed assessment attempt)

**Secondary actions**:
- "Clone Course" (duplicate for a new cohort or version)
- "Unenroll" (remove a learner from a course enrollment)
- "Waive" (mark as complete without requiring the learner to finish)
- "Reassign" (move enrollment to a different group or deadline)
- "Export Report" (download enrollment/completion data as CSV/Excel)

### Sidebar Navigation Candidates

These use domain vocabulary — not generic labels. Use exactly these wordings.

1. **Course Catalog** (all courses available to learners; admin's list view of all courses)
2. **Learner Management** (user roster, group assignments, enrollment status overview)
3. **Learning Paths** (bundled course sequences and their assignment rules)
4. **Reports & Analytics** (completion rates, time-on-platform, compliance dashboards)
5. **Certifications** (certificate templates, issued certificates, expiry tracking)
6. **Assignments** (enrollment rules, bulk assignments, due-date management)
7. **Content Library** (SCORM packages, video assets, documents, reusable media)

---

## Design Context — Visual Language of This Industry

### What "Premium" Looks Like in This Domain

The corporate LMS space has two distinct visual languages. The admin portal (what this job is building) looks like a clean B2B SaaS dashboard: sidebar navigation, stat cards at the top, data tables as the primary content surface, subtle color coding for status badges, and clear typographic hierarchy. Practitioners who use TalentLMS, Docebo, or Absorb LMS every day have internalized a specific aesthetic: nothing flashy, generous whitespace, blue or teal as the primary color, and tables that display enrollment data efficiently. The "good" admin portals feel like a well-organized spreadsheet elevated into software — not like a consumer app.

The key visual signals of credibility in this domain: (1) status badges with distinct colors for "Completed" (green), "In Progress" (blue), "Overdue" (red/amber), and "Not Started" (gray); (2) progress bars in learner rows showing % completion; (3) a compliance-oriented color for mandatory course assignments (amber warning tone); (4) tabular numbers right-aligned in all numeric columns. Admin practitioners notice immediately when progress indicators are missing from an LMS admin table — it signals that the developer doesn't understand the core tracking function of the platform.

The learner-facing view (if shown) tends toward warmer, more approachable design: course cards with cover images, prominent progress rings, and friendly typography. But the admin/dashboard view — which is what this demo should focus on since it's a full-stack development job — leans solidly SaaS Modern: structured, data-forward, and precise.

### Real-World Apps Clients Would Recognize as "Premium"

1. **TalentLMS** — The reference point for mid-market corporate LMS. Clean sidebar navigation, stat cards on the admin home page, blue primary color, enrollment tables with completion % column, and inline status badges. Their 2024 redesign moved toward more whitespace and a lighter feel. Course cards use a tile-grid layout in the learner view. Practitioners consider it the "reliable standard."

2. **Docebo** — Enterprise-tier LMS with a more polished, modern UI. Dark sidebar, card-based dashboards, customizable widget layouts. Their reporting section is praised: funnel charts for enrollment-to-completion, heatmaps for time-of-day engagement. Practitioners who've used Docebo recognize data density as a quality signal.

3. **LearnUpon** — Mid-market, slightly more traditional. Tab-based navigation within course management, clean modals for enrollment management, progress rings on learner profiles. Their certification management UI is frequently cited as best-in-class: expiry timelines, batch renewal, auto-reminder configuration.

### Aesthetic Validation

- **Job Analyst's context**: Education (B2B) sub-domain. Industry routing table says: SaaS Modern (primary), Linear/Minimal (secondary).
- **Domain validation**: Confirmed — SaaS Modern is correct for a corporate single-vendor LMS admin portal. This is a B2B ops tool used by L&D admins and department managers, not a consumer learning app. The reference apps (TalentLMS, Docebo, LearnUpon) all use clean SaaS Modern patterns: medium border radius, subtle shadows, card-based stat displays, blue/teal primary.
- **Color nuance**: Lean toward a teal-to-cyan primary (oklch ~0.55-0.60 chroma, ~195-210 hue) rather than a saturated blue. TalentLMS uses `#27b1f5` (light blue); Docebo uses a deeper teal. This reads as "educational technology" rather than generic enterprise SaaS.
- **One adjustment**: Slightly increase card shadow vs. the default SaaS Modern spec — LMS admin portals use `shadow-sm` on stat cards to give depth without heaviness. This distinguishes the card surface from the page background.

### Format Validation

- **Recommended format**: `dashboard-app` — this is an admin management tool with multiple operational sections (courses, learners, reports, certifications). A sidebar with navigable feature pages is the natural format. The job is explicitly about building a full LMS system, not a mobile app or landing page.
- **Format-specific design notes for Demo Screen Builder**: The main dashboard should show: (1) 4 KPI stat cards — Active Learners, Course Completion Rate, Certificates Issued This Month, Overdue Enrollments; (2) an area chart showing enrollment volume over the last 12 months with a completion rate overlay line; (3) a course table below with Completion Rate column, enrollment count, and status badge; (4) a "Recently Active Learners" panel or "Overdue Enrollments" alert feed. This mirrors exactly what TalentLMS and Docebo admin home pages show.

### Density and Layout Expectations

**Standard density** is appropriate — not compact, not spacious. LMS admin tools display more data than a simple SaaS app but are not as dense as DevOps monitoring tools. A typical LMS admin screen has: stat card row (4 cards), one chart, and one data table — all visible without scrolling on a 1080p monitor.

**Layout pattern**: mixed — stat cards + chart (spacious treatment), then list-heavy below (tables for enrollments, courses). The course catalog uses a hybrid: optional card grid for browsing, table for admin management. Learner management is always a table. Reports are chart-heavy.

---

## Entity Names (10+ realistic names)

### Companies / Organizations (single-vendor LMS clients)

These are the organizations that would be deploying this LMS for their employees or customers:

1. Meridian Compliance Group
2. Apex Industrial Solutions
3. Crestwood Financial Services
4. Harbor Health Systems
5. Brightfield Consulting LLC
6. NorthStar Logistics Corp
7. Vantage Technology Partners
8. Clearview Property Management
9. Summit Manufacturing Group
10. Redwood Professional Services
11. Ironbridge Engineering Inc.
12. Pacific Coast Distribution

### People Names (role-appropriate: L&D admins, managers, learners across industries)

**L&D Admins / Instructors:**
- Sarah Okonkwo (L&D Manager)
- James Whitfield (Training Coordinator)
- Priya Ramachandran (Instructional Designer)
- Marcus Chen (HR Training Specialist)

**Managers (can view team progress):**
- Derek Sullivan (Regional Sales Manager)
- Anita Bhatt (Operations Director)
- Tom Kravitz (Compliance Officer)

**Learners (varied roles at the client org):**
- Carlos Reyes
- Michelle Park
- Kevin Ndlovu
- Lindsey Hartmann
- Obi Nwosu
- Fatima Al-Rashid
- Ryan Kowalski
- Diane Moreau

### Courses / Learning Paths (realistic LMS course titles)

1. "OSHA Safety Fundamentals — Warehouse Operations"
2. "Anti-Harassment and Workplace Conduct (Annual)"
3. "Data Privacy & GDPR Compliance"
4. "New Employee Onboarding — Week 1 Essentials"
5. "Sales Methodology: Consultative Approach"
6. "Product Knowledge: Q1 2025 Release"
7. "Customer Service Excellence Program"
8. "Project Management Foundations (PMP Prep)"
9. "Microsoft Office 365 Power User Certification"
10. "Leadership Development: Managing Remote Teams"
11. "Financial Controls & SOX Compliance"
12. "Diversity, Equity & Inclusion — Foundation Course"
13. "Software Security Awareness Training"
14. "Forklift Operator Certification — Recertification"
15. "Advanced Excel for Finance Teams"

**Learning Paths (bundles):**
- "New Hire Onboarding Track" (4 courses, 8 hrs)
- "Compliance Essentials Bundle" (3 courses, mandatory, annual)
- "People Manager Certification Path" (5 courses, 12 hrs)
- "Sales Readiness Program" (6 courses, 16 hrs)

---

## Realistic Metric Ranges

| Metric | Low | Typical | High | Notes |
|--------|-----|---------|------|-------|
| Course Completion Rate | 28% | 67% | 94% | Mandatory courses 85-98%; elective 25-45%. Source: continu.com research, 2025 |
| Active Learners (monthly) | 42 | 380 | 2,400 | Depends on org size; for 500-person org, expect 250-400 active/month |
| Enrollment Count (monthly) | 80 | 620 | 3,500 | Spikes in Jan (new year), Sept (compliance season) |
| Avg Assessment Score | 62 | 79 | 91 | Corporate compliance tests set pass threshold at 70-80% |
| Assessment Pass Rate | 55% | 78% | 96% | Mandatory compliance: target 90%+ |
| Avg Time to Complete (course) | 0.5 hrs | 3.8 hrs | 22 hrs | Short microlearning: 10-30 min; full cert programs: 8-40 hrs |
| Certificates Issued (monthly) | 12 | 143 | 890 | Varies by org size and course portfolio |
| Overdue Enrollments | 3 | 47 | 320 | Spikes before compliance deadlines |
| Learner Satisfaction Score | 2.8 | 4.1 | 4.8 | On 1-5 scale; <3.5 triggers content review |
| Courses in Catalog | 8 | 74 | 400 | Single-vendor org; all content internal |
| Compliance Rate (mandatory) | 62% | 88% | 100% | Target is 95%+ for regulated industries |
| Training Cost per Learner | $28 | $112 | $580 | Includes platform cost + content development amortized |

---

## Industry Terminology Glossary (15+ terms)

| Term | Definition | Usage Context |
|------|-----------|---------------|
| LMS | Learning Management System — the platform itself | Used in admin UI headers, reports, system settings |
| SCORM | Sharable Content Object Reference Model — the packaging standard for eLearning content files | Course upload, content type badges |
| xAPI (Tin Can) | Experience API — modern standard that tracks learning activities beyond the LMS | Content settings, tracking configuration |
| ILT | Instructor-Led Training — a live session (in-person or webinar) tracked inside the LMS | Course type badges, session scheduling |
| Learning Path | A curated, sequential bundle of courses assigned together | Sidebar nav, assignment workflows |
| Enrollment | The record linking one learner to one course; has a status and optional due date | Primary entity in tables and reports |
| Completion | The status of an enrollment when all required activities are finished | Status badge, KPI metric |
| Mastery Score | The minimum passing score on an assessment (e.g., 70%) | Assessment configuration, results display |
| Certification | A named credential that a learner earns upon completing specific requirements | Certifications feature page |
| Certificate | The actual document/badge issued to a learner when they earn a certification | Issued certificates table |
| L&D | Learning & Development — the team/function managing the LMS | Role labels, report filters |
| CLO | Chief Learning Officer — the executive sponsor of the L&D function | Report recipients, org hierarchy |
| SME | Subject Matter Expert — the domain specialist who authors or reviews course content | Course attribution field |
| Compliance Training | Mandatory courses required by regulation or policy with a fixed due date | Course type tag, compliance rate KPI |
| Blended Learning | A course combining self-paced online modules with live ILT sessions | Delivery type tag in course catalog |
| Cohort | A named group of learners who start and progress through content together (used in academic LMS more than corporate, but appears in learning path context) | Group/cohort assignment UI |
| Due Date | The deadline by which an enrollment must reach "Completed" status | Enrollment table column, overdue alerts |
| Waived | Admin-granted exemption from completing a required course | Enrollment status badge |
| Branching | A content delivery setting where learner responses determine the next lesson shown | Course authoring settings |
| LRS | Learning Record Store — an external system that stores xAPI learning activity statements | Integrations page |

---

## Common Workflows

### Workflow 1: Course Creation and Publishing

1. L&D Admin creates a new course record (title, description, category, delivery type)
2. Admin uploads SCORM package or adds modules (video, document, quiz)
3. Admin configures assessment: sets mastery score threshold (e.g., 70%), max attempts
4. Admin creates or links a certificate template to the course
5. Admin sets course to "Draft" → internal review by SME or compliance officer
6. After approval, Admin clicks "Publish" → course becomes visible in catalog
7. Admin optionally creates enrollment rules to auto-assign the course to specific groups

### Workflow 2: Learner Enrollment and Completion Tracking

1. Learner is enrolled in a course (via admin manual enrollment, enrollment rule, or self-enrollment from catalog)
2. Enrollment record created with status "Enrolled" / "Not Started"
3. Learner accesses course from their portal → status changes to "In Progress"
4. Learner completes all required modules → takes assessment
5. If assessment score >= mastery score: status → "Completed" / "Passed"; certificate issued
6. If score < mastery score: status → "Failed"; learner may retry (if attempts allow)
7. If due date passes before completion: status → "Overdue"; manager and learner receive auto-reminder
8. Admin tracks completion via Reports dashboard; exports CSV for compliance audit

### Workflow 3: Certification Management and Renewal

1. Admin creates a Certification with expiry period (e.g., "valid for 12 months")
2. Learner completes the qualifying course → Certificate issued, expiry date set
3. System sends auto-reminder to learner (and manager) 30 days before expiry
4. Learner re-enrolls in refresher course and completes it → Certificate renewed, new expiry date set
5. If certificate expires without renewal: status → "Expired"; compliance report flags it
6. Compliance Officer reviews "Expiring Soon" and "Expired" lists during audits

---

## Common Edge Cases

These become edge-case records in the mock data to make it feel authentic and real:

1. **Overdue enrollment** — a learner with status "Overdue", due date 2+ weeks in the past, completion at 0%
2. **Partially completed course** — enrollment "In Progress", completion at 45%, last accessed 3 weeks ago (disengaged learner)
3. **Failed assessment, max attempts reached** — status "Failed", 0 remaining attempts, learner cannot retry without admin reset
4. **Expiring certification** — certificate expiry date within next 14 days, learner has not started the renewal course
5. **Draft course with enrollments** — a course accidentally published before content upload was complete, then reverted to Draft while active enrollments existed (edge case: enrollments still exist but course is invisible to learner)
6. **Waived mandatory course** — a learner with an admin-granted waiver for a compliance course (appears in reports as "Waived", not "Completed"; may affect compliance rate calculation)
7. **Zero-enrollment published course** — a course that was published but has never been assigned or self-enrolled; appears in catalog reports with 0 enrollments and 0% completion
8. **High-performer outlier** — a learner who has completed 24 courses this quarter with a 97% average score (visible in leaderboard, creates a realistic distribution outlier)
9. **Manager report access** — a manager who can see their team's enrollments but accidentally sees another team's data (access control edge case)

---

## What Would Impress a Domain Expert

1. **SCORM status tracking** — showing "SCORM completion status" as a distinct field from LMS-level completion. SCORM sends its own "complete/incomplete" signal that can conflict with the LMS's own completion rules. Showing this distinction (or a "SCORM: Completed" badge alongside "Enrollment: Completed") signals deep technical knowledge of how LMSes actually work.

2. **Seat-based vs. open enrollment distinction** — real corporate LMSes often have "seat limits" on ILT sessions (a webinar with 25 seats). Showing a course with "Seats: 18/25 filled" and a waitlist queue is an insider detail that casual LMS developers miss.

3. **Compliance training deadline patterns** — mandatory compliance courses (OSHA, anti-harassment, data privacy) spike in Q4 (Oct-Dec) as organizations push for calendar-year completion. An enrollment trend chart that shows a spike in December completions signals that the developer understands the real operating rhythm.

4. **Certificate expiry and "gap to compliance" calculation** — a compliance dashboard that shows not just current compliance rate but "will be compliant by [date] if [X] learners complete before [deadline]" — this is how real compliance officers think about their risk exposure.

5. **Group/Branch hierarchy in reporting** — corporate LMSes almost always have organizational hierarchy (department > team > individual). Reports that can be filtered by "Branch" or "Group" and show rollup metrics at each level are expected by L&D admins in organizations of any size. A report that only shows individual-level data is considered incomplete.

---

## Common Systems & Tools Used

1. **TalentLMS** — Most widely adopted mid-market LMS; reference point for admin UX patterns
2. **Docebo** — Enterprise-tier; known for AI-driven skill matching and deep reporting
3. **LearnUpon** — Strong in customer/partner training use cases; certification management praised
4. **Absorb LMS** — Compliance-heavy sectors (healthcare, finance); strong audit trail features
5. **Cornerstone OnDemand** — Large enterprise; integrated with HRIS/HCM systems
6. **Articulate Storyline / Rise 360** — The dominant tool for creating SCORM content; every LMS admin has heard of it
7. **iSpring Suite** — Popular SCORM authoring tool, especially for PowerPoint-based content
8. **HRIS integrations** — Workday, BambooHR, ADP (learner data synced via SFTP or API)
9. **Zoom / Teams integration** — Used to schedule and track ILT webinar sessions inside the LMS
10. **Salesforce integration** — Common in sales enablement LMS use cases (track training alongside CRM pipeline)

---

## Geographic / Cultural Considerations

The job posting does not specify a region. Default assumptions:
- **Currency**: USD
- **Date format**: MM/DD/YYYY (US convention)
- **Compliance references**: US-context (OSHA, HIPAA, SOX, GDPR for data privacy) — include a mix so it works globally
- **Time zones**: Enrollment due dates should show timezone context (e.g., "Due Mar 31, 2025 11:59 PM ET")
- **Language**: English only; no multi-language UI required for the demo

---

## Data Architect Notes

**Entity names to use:**
- Primary table: `enrollments` — the key entity (learner + course + status + progress)
- `courses` — with fields: id, title, category, deliveryType ("Self-Paced" | "ILT" | "Blended"), status ("Published" | "Draft" | "Archived"), completionRate, enrollmentCount, avgScore, durationHours, isCompliance (boolean)
- `learners` — with fields: id, name, email, department, group, activeEnrollments, completedCourses, avgScore, lastActive
- `certifications` — with fields: id, learnerId, certificationName, issuedDate, expiryDate, status ("Active" | "Expiring Soon" | "Expired" | "Revoked")
- `assessmentAttempts` — with fields: id, enrollmentId, learnerId, courseId, score, passingScore, result ("Passed" | "Failed"), attemptNumber, submittedAt

**Metrics to use as field values:**
- `completionRate`: 28–94% (most courses cluster 60–80%; compliance courses 85–98%; elective courses 28–55%)
- `enrollmentCount` per course: 8–240 learners
- `avgScore` per course: 62–91 (most 72–84)
- `durationHours`: 0.3–18.0 (microlearning: 0.3–0.8; standard: 1.5–4; certification: 6–18)
- learner `avgScore`: 60–97 (most learners cluster 72–86; a few outliers at 95+ and 60-65)

**Status labels to use (exact strings):**
- Enrollment: "Not Started", "In Progress", "Completed", "Overdue", "Failed", "Waived"
- Course: "Published", "Draft", "Archived"
- Certification: "Active", "Expiring Soon", "Expired"
- Assessment: "Passed", "Failed", "Not Attempted"

**Edge cases to include as specific records:**
- At least 3 enrollments with status "Overdue" (due dates in the past)
- At least 2 certifications with status "Expiring Soon" (expiry within 30 days from today)
- At least 1 certification with status "Expired"
- At least 2 courses with 0 enrollments (unpopular or new courses)
- At least 1 learner with 0% progress on a course they enrolled in 45+ days ago
- At least 1 "Waived" enrollment for a compliance course
- One high-performer learner: 15+ completed courses, avg score 93+

**Date patterns:**
- Chart time-series: 12 months of monthly enrollment data with a visible spike in December (compliance push) and secondary spike in January (new year onboarding)
- Enrollment due dates: mix of past (overdue), near-future (this week), and end-of-quarter
- Certificate issuedDate: spread across last 12 months; expiryDate = issuedDate + 12 months

---

## Layout Builder Notes

**Recommended density**: Standard — not compact. LMS admin tools like TalentLMS use generous spacing in headers and stat cards, then transition to tighter table rows. Apply `--content-padding: 1.5rem`, `--card-padding: 1.5rem`.

**Sidebar width**: Standard (16rem). Course and feature names are not long in LMS nav (contrast: legal or logistics where labels are multi-word). "Course Catalog", "Learner Management", "Certifications" all fit at 16rem.

**Domain-specific visual patterns the Layout Builder must know**:
- **Completion percentage column**: every course table row must have a progress indicator. Either a numeric "74%" with a thin progress bar inline, or a colored badge. This is the single most recognizable LMS visual pattern — its absence signals the developer doesn't understand the domain.
- **Status badge color conventions**: Completed = green, In Progress = blue, Overdue = red/destructive, Not Started = gray/muted, Failed = amber/warning. These are industry-standard and LMS practitioners expect them.
- **Compliance flag**: courses tagged as compliance training often have a distinct label or colored border (amber/orange) to distinguish them from optional courses.
- **Certificate expiry timeline**: in the certifications view, a timeline or progress bar showing "expires in X days" is expected by practitioners.

**Color nuance**: For SaaS Modern in EdTech, use a teal-leaning primary. Suggested: `oklch(0.55 0.16 200)` (cyan-teal) or `oklch(0.52 0.18 208)`. Avoid the saturated blue of generic SaaS — teal signals "educational technology" to practitioners.

**Typography**: SaaS Modern default (Inter or system sans) is correct. No font override needed unless the Job Analyst specifies otherwise. Use `font-mono tabular-nums` for all numeric columns (scores, counts, percentages).

---

## Demo Screen Builder Notes

**Single most important metric (hero stat card)**: "Active Learners" — displayed as a count with a trend delta ("vs. last month"). This is the primary health indicator L&D admins check daily. Size it prominently.

**Four KPI cards for the dashboard header**:
1. Active Learners (count + trend arrow)
2. Course Completion Rate (% + trend)
3. Certificates Issued This Month (count)
4. Overdue Enrollments (count + red warning treatment — this is the urgent item)

**Chart type**: Area chart (enrollment volume over 12 months) with a secondary line (completion rate %). This is the exact chart type that TalentLMS and Docebo show on their admin home page. The area shows enrollment growth; the line shows whether quality is keeping pace. Y-axis left: enrollment count; Y-axis right: completion % (0-100). Most meaningful month: December spike.

**Domain-specific panel that would impress a practitioner**: "Overdue Enrollments" alert feed in the bottom-right of the dashboard — a list of learners with overdue courses sorted by how many days past due, with an inline "Send Reminder" button per row. This is a real operational task LMS admins perform daily, and showing it as a live panel (with clickable reminder action) signals operational understanding.

**Course table columns** (in the main dashboard or Course Catalog page):
`Course Title | Category | Type | Enrolled | Completion Rate | Avg Score | Status`

**Learner table columns** (in Learner Management page):
`Learner Name | Department | Active Courses | Completed | Avg Score | Last Active | Status`

**For the course detail page** (if Feature Builder builds it): show a progress funnel — Enrolled → Started → Completed — as a three-step funnel chart with counts and drop-off percentages. This is a power-user view that immediately signals LMS expertise.
