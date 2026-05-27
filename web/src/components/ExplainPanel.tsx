import { useMemo } from "react";
import { explainRegex } from "../lib/explain";

interface ExplainPanelProps {
  pattern: string;
  open: boolean;
  onToggle: () => void;
}

export default function ExplainPanel({ pattern, open, onToggle }: ExplainPanelProps) {
  const tokens = useMemo(() => {
    if (!pattern) return [];
    return explainRegex(pattern);
  }, [pattern]);

  return (
    <div
      className="rounded-lg border"
      style={{ borderColor: "var(--line)", background: "var(--panel)" }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold cursor-pointer"
        style={{ color: "var(--ink)" }}
      >
        <span>Explain Regex</span>
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="px-4 pb-4">
          {tokens.length === 0 ? (
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              Enter a regex pattern to see it explained.
            </p>
          ) : (
            <div className="space-y-1">
              {tokens.map((t, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <code
                    className="font-mono font-semibold shrink-0 px-1.5 py-0.5 rounded min-w-[60px] text-center"
                    style={{ background: "var(--line)", color: "var(--accent)" }}
                  >
                    {t.raw}
                  </code>
                  <span style={{ color: "var(--ink)" }}>{t.description}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
