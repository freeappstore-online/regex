import type { HistoryEntry } from "../lib/history";

interface HistoryPanelProps {
  history: HistoryEntry[];
  open: boolean;
  onToggle: () => void;
  onUse: (entry: HistoryEntry) => void;
  onClear: () => void;
}

export default function HistoryPanel({ history, open, onToggle, onUse, onClear }: HistoryPanelProps) {
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
        <div className="flex items-center gap-2">
          <span>History</span>
          {history.length > 0 && (
            <span
              className="text-xs px-1.5 py-0.5 rounded-full"
              style={{ background: "var(--line)", color: "var(--muted)" }}
            >
              {history.length}
            </span>
          )}
        </div>
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
          {history.length === 0 ? (
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              No history yet. Your regex patterns will appear here.
            </p>
          ) : (
            <>
              <div className="flex justify-end mb-2">
                <button
                  onClick={onClear}
                  className="text-xs font-medium cursor-pointer"
                  style={{ color: "var(--error)" }}
                >
                  Clear all
                </button>
              </div>
              <div className="space-y-1.5 max-h-[300px] overflow-y-auto">
                {history.map((entry) => (
                  <button
                    key={entry.id}
                    onClick={() => onUse(entry)}
                    className="w-full text-left rounded-lg p-2.5 transition-colors cursor-pointer"
                    style={{ background: "var(--paper)", border: "1px solid var(--line)" }}
                  >
                    <div className="flex items-center gap-2">
                      <code className="font-mono text-xs font-semibold truncate" style={{ color: "var(--accent)" }}>
                        /{entry.pattern}/{entry.flags}
                      </code>
                      <span className="text-xs shrink-0" style={{ color: "var(--muted)" }}>
                        {new Date(entry.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-xs mt-0.5 truncate font-mono" style={{ color: "var(--muted)" }}>
                      {entry.testString}
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
