import {
  ClipboardCheck,
  ArrowRight,
  CheckCircle,
  XCircle,
  Award,
  RefreshCw,
  Mail,
} from "lucide-react";

interface FlowNode {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  type: "step" | "pass" | "fail" | "cert";
}

const flowNodes: FlowNode[] = [
  {
    id: "quiz",
    label: "Learner submits quiz",
    sublabel: "All questions answered",
    icon: ClipboardCheck,
    type: "step",
  },
  {
    id: "grade",
    label: "Auto-graded instantly",
    sublabel: "Score vs. passing threshold",
    icon: CheckCircle,
    type: "step",
  },
  {
    id: "pass",
    label: "Score ≥ 70% — Passed",
    sublabel: "Enrollment marked complete",
    icon: CheckCircle,
    type: "pass",
  },
  {
    id: "fail",
    label: "Score < 70% — Failed",
    sublabel: "Retry available if attempts remain",
    icon: XCircle,
    type: "fail",
  },
];

export function CertificationFlowViz() {
  const typeStyles: Record<FlowNode["type"], { bg: string; border: string; iconColor: string }> = {
    step: {
      bg: "color-mix(in oklch, var(--primary) 7%, transparent)",
      border: "color-mix(in oklch, var(--primary) 20%, transparent)",
      iconColor: "var(--primary)",
    },
    pass: {
      bg: "color-mix(in oklch, var(--success) 8%, transparent)",
      border: "color-mix(in oklch, var(--success) 22%, transparent)",
      iconColor: "var(--success)",
    },
    fail: {
      bg: "color-mix(in oklch, var(--destructive) 7%, transparent)",
      border: "color-mix(in oklch, var(--destructive) 18%, transparent)",
      iconColor: "var(--destructive)",
    },
    cert: {
      bg: "color-mix(in oklch, var(--chart-4) 8%, transparent)",
      border: "color-mix(in oklch, var(--chart-4) 20%, transparent)",
      iconColor: "var(--chart-4)",
    },
  };

  return (
    <div className="space-y-4">
      {/* Linear flow — top two steps */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        {flowNodes.slice(0, 2).map((node, i) => {
          const styles = typeStyles[node.type];
          return (
            <div key={node.id} className="flex items-center gap-2 flex-1 sm:flex-none">
              <div
                className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 w-full sm:w-auto"
                style={{
                  backgroundColor: styles.bg,
                  border: `1px solid ${styles.border}`,
                }}
              >
                <node.icon
                  className="w-4 h-4 shrink-0"
                  style={{ color: styles.iconColor }}
                />
                <div>
                  <p className="text-xs font-semibold leading-tight">{node.label}</p>
                  <p className="text-[10px] text-muted-foreground">{node.sublabel}</p>
                </div>
              </div>
              {i < 1 && (
                <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 hidden sm:block" />
              )}
            </div>
          );
        })}
      </div>

      {/* Branch: Pass / Fail */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Pass branch */}
        <div className="space-y-2">
          <div
            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5"
            style={{
              backgroundColor: typeStyles.pass.bg,
              border: `1px solid ${typeStyles.pass.border}`,
            }}
          >
            <CheckCircle
              className="w-4 h-4 shrink-0"
              style={{ color: typeStyles.pass.iconColor }}
            />
            <div>
              <p className="text-xs font-semibold leading-tight">Score ≥ 70% — Passed</p>
              <p className="text-[10px] text-muted-foreground">Enrollment marked complete</p>
            </div>
          </div>
          {/* Certificate issued */}
          <div className="ml-4 flex items-center gap-2">
            <div
              className="w-px self-stretch ml-2"
              style={{ backgroundColor: "var(--border)" }}
            />
            <div
              className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 flex-1"
              style={{
                backgroundColor: "color-mix(in oklch, var(--chart-4) 8%, transparent)",
                border: "1px solid color-mix(in oklch, var(--chart-4) 20%, transparent)",
              }}
            >
              <Award className="w-4 h-4 shrink-0" style={{ color: "var(--chart-4)" }} />
              <div>
                <p className="text-xs font-semibold leading-tight">Certificate auto-issued</p>
                <p className="text-[10px] text-muted-foreground">PDF generated + emailed</p>
              </div>
            </div>
          </div>
          <div className="ml-4 flex items-center gap-2">
            <div
              className="w-px self-stretch ml-2"
              style={{ backgroundColor: "var(--border)" }}
            />
            <div
              className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 flex-1"
              style={{
                backgroundColor: "color-mix(in oklch, var(--primary) 5%, transparent)",
                border: "1px solid color-mix(in oklch, var(--primary) 15%, transparent)",
              }}
            >
              <Mail className="w-4 h-4 shrink-0" style={{ color: "var(--primary)" }} />
              <div>
                <p className="text-xs font-semibold leading-tight">Expiry reminder scheduled</p>
                <p className="text-[10px] text-muted-foreground">30 days before expiry date</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fail branch */}
        <div className="space-y-2">
          <div
            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5"
            style={{
              backgroundColor: typeStyles.fail.bg,
              border: `1px solid ${typeStyles.fail.border}`,
            }}
          >
            <XCircle
              className="w-4 h-4 shrink-0"
              style={{ color: typeStyles.fail.iconColor }}
            />
            <div>
              <p className="text-xs font-semibold leading-tight">Score {"<"} 70% — Failed</p>
              <p className="text-[10px] text-muted-foreground">Attempt recorded in history</p>
            </div>
          </div>
          {/* Retry path */}
          <div className="ml-4 flex items-center gap-2">
            <div
              className="w-px self-stretch ml-2"
              style={{ backgroundColor: "var(--border)" }}
            />
            <div
              className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 flex-1"
              style={{
                backgroundColor: "color-mix(in oklch, var(--warning) 7%, transparent)",
                border: "1px solid color-mix(in oklch, var(--warning) 18%, transparent)",
              }}
            >
              <RefreshCw
                className="w-4 h-4 shrink-0"
                style={{ color: "var(--warning)" }}
              />
              <div>
                <p className="text-xs font-semibold leading-tight">Retry unlocked (if allowed)</p>
                <p className="text-[10px] text-muted-foreground">Configured per-course max attempts</p>
              </div>
            </div>
          </div>
          <div className="ml-4 flex items-center gap-2">
            <div
              className="w-px self-stretch ml-2"
              style={{ backgroundColor: "var(--border)" }}
            />
            <div
              className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 flex-1"
              style={{
                backgroundColor: "color-mix(in oklch, var(--destructive) 5%, transparent)",
                border: "1px solid color-mix(in oklch, var(--destructive) 12%, transparent)",
              }}
            >
              <XCircle
                className="w-4 h-4 shrink-0"
                style={{ color: "var(--destructive)" }}
              />
              <div>
                <p className="text-xs font-semibold leading-tight">Max attempts — admin notified</p>
                <p className="text-[10px] text-muted-foreground">Re-enrollment decision surfaced</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
