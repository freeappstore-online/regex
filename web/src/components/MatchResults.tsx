import { useMemo } from "react";

interface MatchResultsProps {
  regex: RegExp | null;
  testString: string;
}

interface MatchInfo {
  index: number;
  text: string;
  position: number;
  groups: string[];
}

export default function MatchResults({ regex, testString }: MatchResultsProps) {
  const matches = useMemo((): MatchInfo[] => {
    if (!regex || !testString) return [];

    const flags = regex.flags.includes("g") ? regex.flags : regex.flags + "g";
    let searchRegex: RegExp;
    try {
      searchRegex = new RegExp(regex.source, flags);
    } catch {
      return [];
    }

    const results: MatchInfo[] = [];
    let match: RegExpExecArray | null;
    let count = 0;
    const maxMatches = 500;

    while ((match = searchRegex.exec(testString)) !== null && count < maxMatches) {
      if (match[0].length === 0) {
        searchRegex.lastIndex = match.index + 1;
        continue;
      }

      const groups: string[] = [];
      for (let g = 1; g < match.length; g++) {
        const val = match[g];
        if (val !== undefined) {
          groups.push(val);
        }
      }

      results.push({
        index: count,
        text: match[0],
        position: match.index,
        groups,
      });
      count++;
    }

    return results;
  }, [regex, testString]);

  if (!regex || !testString) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
          Matches
        </h3>
        <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: "var(--panel)", color: "var(--muted)" }}>
          {matches.length} {matches.length === 1 ? "match" : "matches"}
        </span>
      </div>

      {matches.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          No matches found.
        </p>
      ) : (
        <div className="space-y-1.5 max-h-[300px] overflow-y-auto">
          {matches.map((m) => (
            <div
              key={m.index}
              className="flex flex-col gap-0.5 rounded-lg p-2 text-xs"
              style={{ background: "var(--panel)", border: "1px solid var(--line)" }}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold shrink-0" style={{ color: "var(--accent)" }}>
                  #{m.index + 1}
                </span>
                <code
                  className="font-mono break-all flex-1"
                  style={{ color: "var(--ink)" }}
                >
                  {m.text}
                </code>
                <span className="shrink-0" style={{ color: "var(--muted)" }}>
                  index {m.position}
                </span>
              </div>
              {m.groups.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-1 ml-7">
                  {m.groups.map((g, gi) => (
                    <span
                      key={gi}
                      className="font-mono px-1.5 py-0.5 rounded"
                      style={{ background: "var(--line)", color: "var(--ink)" }}
                    >
                      ${gi + 1}: {g}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
