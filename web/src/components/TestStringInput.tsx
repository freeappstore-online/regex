import { useMemo } from "react";

const MATCH_COLORS = [
  "var(--match-1)",
  "var(--match-2)",
  "var(--match-3)",
  "var(--match-4)",
  "var(--match-5)",
  "var(--match-6)",
];

interface TestStringInputProps {
  testString: string;
  regex: RegExp | null;
  onChange: (v: string) => void;
}

interface Segment {
  text: string;
  matchIndex: number | null; // null = no match
}

export default function TestStringInput({ testString, regex, onChange }: TestStringInputProps) {
  const segments = useMemo((): Segment[] => {
    if (!regex || !testString) return [{ text: testString, matchIndex: null }];

    const result: Segment[] = [];
    let lastIndex = 0;
    let matchCount = 0;

    // Use a new regex with global flag to find all matches
    const flags = regex.flags.includes("g") ? regex.flags : regex.flags + "g";
    let searchRegex: RegExp;
    try {
      searchRegex = new RegExp(regex.source, flags);
    } catch {
      return [{ text: testString, matchIndex: null }];
    }

    let match: RegExpExecArray | null;
    let safetyCounter = 0;
    const maxIterations = 10000;

    while ((match = searchRegex.exec(testString)) !== null && safetyCounter < maxIterations) {
      safetyCounter++;

      // Prevent infinite loop on zero-length matches
      if (match[0].length === 0) {
        searchRegex.lastIndex = match.index + 1;
        continue;
      }

      // Text before this match
      if (match.index > lastIndex) {
        result.push({ text: testString.slice(lastIndex, match.index), matchIndex: null });
      }

      result.push({ text: match[0], matchIndex: matchCount });
      matchCount++;
      lastIndex = match.index + match[0].length;
    }

    // Remaining text
    if (lastIndex < testString.length) {
      result.push({ text: testString.slice(lastIndex), matchIndex: null });
    }

    if (result.length === 0) {
      return [{ text: testString, matchIndex: null }];
    }

    return result;
  }, [testString, regex]);

  return (
    <div>
      <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--ink)" }}>
        Test String
      </label>

      {/* Highlighted overlay display */}
      <div className="relative">
        <div
          className="rounded-lg border p-3 font-mono text-sm min-h-[120px] whitespace-pre-wrap break-all"
          style={{
            borderColor: "var(--line)",
            background: "var(--panel)",
            color: "var(--ink)",
          }}
        >
          {segments.map((seg, i) =>
            seg.matchIndex !== null ? (
              <mark
                key={i}
                className="rounded px-0.5"
                style={{
                  background: MATCH_COLORS[seg.matchIndex % MATCH_COLORS.length],
                  color: "inherit",
                }}
              >
                {seg.text}
              </mark>
            ) : (
              <span key={i}>{seg.text}</span>
            ),
          )}
          {!testString && (
            <span style={{ color: "var(--muted)" }}>Enter test string...</span>
          )}
        </div>

        {/* Actual textarea overlaid for editing */}
        <textarea
          value={testString}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 w-full h-full rounded-lg p-3 font-mono text-sm resize-none outline-none bg-transparent"
          style={{ color: "transparent", caretColor: "var(--ink)" }}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
        />
      </div>
    </div>
  );
}
