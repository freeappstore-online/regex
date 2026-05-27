interface Flag {
  key: string;
  label: string;
  tooltip: string;
}

const FLAGS: Flag[] = [
  { key: "g", label: "g", tooltip: "Global: find all matches, not just the first" },
  { key: "i", label: "i", tooltip: "Case-insensitive: ignore upper/lower case" },
  { key: "m", label: "m", tooltip: "Multiline: ^ and $ match line boundaries" },
  { key: "s", label: "s", tooltip: "Dotall: . also matches newline characters" },
  { key: "u", label: "u", tooltip: "Unicode: enable full Unicode support" },
];

interface RegexInputProps {
  pattern: string;
  flags: string;
  error: string | null;
  onPatternChange: (v: string) => void;
  onFlagsChange: (v: string) => void;
}

export default function RegexInput({ pattern, flags, error, onPatternChange, onFlagsChange }: RegexInputProps) {
  function toggleFlag(key: string) {
    if (flags.includes(key)) {
      onFlagsChange(flags.replace(key, ""));
    } else {
      onFlagsChange(flags + key);
    }
  }

  return (
    <div>
      <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--ink)" }}>
        Regular Expression
      </label>
      <div
        className="flex items-center rounded-lg border px-3 py-2 font-mono"
        style={{
          borderColor: error ? "var(--error)" : "var(--line)",
          background: "var(--panel)",
        }}
      >
        <span className="text-sm mr-1 select-none" style={{ color: "var(--muted)" }}>/</span>
        <input
          type="text"
          value={pattern}
          onChange={(e) => onPatternChange(e.target.value)}
          placeholder="Enter regex pattern..."
          className="flex-1 bg-transparent text-sm outline-none font-mono min-w-0"
          style={{ color: "var(--ink)" }}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
        />
        <span className="text-sm mx-1 select-none" style={{ color: "var(--muted)" }}>/</span>
        <span className="text-sm font-mono" style={{ color: "var(--accent)" }}>
          {flags}
        </span>
      </div>

      {error && (
        <p className="text-xs mt-1 font-mono" style={{ color: "var(--error)" }}>
          {error}
        </p>
      )}

      <div className="flex items-center gap-2 mt-2">
        <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>
          Flags:
        </span>
        {FLAGS.map((f) => (
          <button
            key={f.key}
            onClick={() => toggleFlag(f.key)}
            title={f.tooltip}
            className="relative px-2.5 py-1 rounded text-xs font-mono font-semibold transition-colors cursor-pointer"
            style={{
              background: flags.includes(f.key) ? "var(--accent)" : "var(--panel)",
              color: flags.includes(f.key) ? "#fff" : "var(--muted)",
              border: `1px solid ${flags.includes(f.key) ? "var(--accent)" : "var(--line)"}`,
            }}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
