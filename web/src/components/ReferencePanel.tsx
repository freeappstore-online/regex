import { referenceEntries } from "../data/reference";

interface ReferencePanelProps {
  open: boolean;
  onToggle: () => void;
}

export default function ReferencePanel({ open, onToggle }: ReferencePanelProps) {
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
        <span>Regex Reference</span>
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
          <div className="grid gap-2">
            {referenceEntries.map((entry) => (
              <div
                key={entry.token}
                className="flex items-start gap-3 text-sm rounded-lg p-2"
                style={{ background: "var(--paper)" }}
              >
                <code
                  className="font-mono font-bold shrink-0 px-2 py-0.5 rounded text-center min-w-[80px]"
                  style={{ background: "var(--line)", color: "var(--accent)" }}
                >
                  {entry.token}
                </code>
                <div className="flex-1 min-w-0">
                  <div className="font-medium" style={{ color: "var(--ink)" }}>
                    {entry.label}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                    {entry.description}
                  </div>
                  <div className="text-xs font-mono mt-0.5" style={{ color: "var(--muted)" }}>
                    {entry.example}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
