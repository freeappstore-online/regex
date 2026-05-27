import { cheatsheetEntries } from "../data/cheatsheet";

interface CheatsheetPanelProps {
  open: boolean;
  onToggle: () => void;
  onUse: (pattern: string, testString: string) => void;
}

export default function CheatsheetPanel({ open, onToggle, onUse }: CheatsheetPanelProps) {
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
        <span>Cheat Sheet</span>
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
          <div className="grid gap-2 sm:grid-cols-2">
            {cheatsheetEntries.map((entry) => (
              <div
                key={entry.label}
                className="rounded-lg p-3 flex flex-col gap-1"
                style={{ background: "var(--paper)", border: "1px solid var(--line)" }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
                    {entry.label}
                  </span>
                  <button
                    onClick={() => onUse(entry.pattern, entry.testString)}
                    className="text-xs font-medium px-2 py-0.5 rounded cursor-pointer transition-colors"
                    style={{ background: "var(--accent)", color: "#fff" }}
                  >
                    Use this
                  </button>
                </div>
                <code
                  className="font-mono text-xs break-all"
                  style={{ color: "var(--accent)" }}
                >
                  {entry.pattern}
                </code>
                <span className="text-xs" style={{ color: "var(--muted)" }}>
                  {entry.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
