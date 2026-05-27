import { useMemo } from "react";

interface ReplacePanelProps {
  regex: RegExp | null;
  testString: string;
  replacement: string;
  onReplacementChange: (v: string) => void;
}

export default function ReplacePanel({ regex, testString, replacement, onReplacementChange }: ReplacePanelProps) {
  const result = useMemo(() => {
    if (!regex || !testString || !replacement) return null;
    try {
      return testString.replace(regex, replacement);
    } catch {
      return null;
    }
  }, [regex, testString, replacement]);

  return (
    <div>
      <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--ink)" }}>
        Replace
      </label>
      <input
        type="text"
        value={replacement}
        onChange={(e) => onReplacementChange(e.target.value)}
        placeholder="Replacement string (supports $1, $2, etc.)"
        className="w-full rounded-lg border px-3 py-2 text-sm font-mono outline-none"
        style={{
          borderColor: "var(--line)",
          background: "var(--panel)",
          color: "var(--ink)",
        }}
        spellCheck={false}
      />
      {result !== null && (
        <div className="mt-2">
          <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>
            Result:
          </span>
          <div
            className="mt-1 rounded-lg border p-3 font-mono text-sm whitespace-pre-wrap break-all"
            style={{
              borderColor: "var(--line)",
              background: "var(--panel)",
              color: "var(--ink)",
            }}
          >
            {result}
          </div>
        </div>
      )}
    </div>
  );
}
