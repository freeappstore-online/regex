import { useState, useMemo, useEffect, useCallback } from "react";
import RegexInput from "./components/RegexInput";
import TestStringInput from "./components/TestStringInput";
import MatchResults from "./components/MatchResults";
import ReplacePanel from "./components/ReplacePanel";
import ExplainPanel from "./components/ExplainPanel";
import ReferencePanel from "./components/ReferencePanel";
import CheatsheetPanel from "./components/CheatsheetPanel";
import HistoryPanel from "./components/HistoryPanel";
import { loadHistory, saveToHistory, clearHistory } from "./lib/history";
import type { HistoryEntry } from "./lib/history";
import { encodeShareURL, decodeShareURL } from "./lib/share";

export default function App() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");
  const [replacement, setReplacement] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>(loadHistory);
  const [copied, setCopied] = useState(false);

  // Collapsible panels
  const [explainOpen, setExplainOpen] = useState(false);
  const [referenceOpen, setReferenceOpen] = useState(false);
  const [cheatsheetOpen, setCheatsheetOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  // Load from share URL on mount
  useEffect(() => {
    const shared = decodeShareURL();
    if (shared) {
      setPattern(shared.pattern);
      setFlags(shared.flags);
      setTestString(shared.testString);
      // Clear hash so it doesn't persist on reload
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  // Compile regex
  const { regex, error } = useMemo(() => {
    if (!pattern) return { regex: null, error: null };
    try {
      const r = new RegExp(pattern, flags);
      return { regex: r, error: null };
    } catch (e) {
      return {
        regex: null,
        error: e instanceof Error ? e.message : "Invalid regex",
      };
    }
  }, [pattern, flags]);

  // Save to history on blur or significant changes
  const handleSaveHistory = useCallback(() => {
    if (pattern.trim() && testString.trim()) {
      const updated = saveToHistory(pattern, flags, testString);
      setHistory(updated);
    }
  }, [pattern, flags, testString]);

  // Save when user stops editing (on blur)
  const handleTestStringChange = useCallback((v: string) => {
    setTestString(v);
  }, []);

  const handlePatternChange = useCallback((v: string) => {
    setPattern(v);
  }, []);

  // Use cheatsheet entry
  const handleUseCheatsheet = useCallback((p: string, t: string) => {
    setPattern(p);
    setTestString(t);
    setFlags("g");
  }, []);

  // Use history entry
  const handleUseHistory = useCallback((entry: HistoryEntry) => {
    setPattern(entry.pattern);
    setFlags(entry.flags);
    setTestString(entry.testString);
  }, []);

  // Clear history
  const handleClearHistory = useCallback(() => {
    setHistory(clearHistory());
  }, []);

  // Share
  const handleShare = useCallback(async () => {
    const url = encodeShareURL(pattern, flags, testString);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [pattern, flags, testString]);

  return (
    <div className="min-h-screen" style={{ background: "var(--paper)" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-10 border-b backdrop-blur-md"
        style={{
          borderColor: "var(--line)",
          background: "var(--glass)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-mono text-sm font-bold"
              style={{ background: "var(--accent)", color: "#fff" }}
            >
              .*
            </div>
            <div>
              <h1 className="text-base font-bold leading-tight" style={{ color: "var(--ink)" }}>
                Regex Tester
              </h1>
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                Test, debug, and learn regular expressions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveHistory}
              className="text-xs font-medium px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
              style={{
                background: "var(--panel)",
                color: "var(--muted)",
                border: "1px solid var(--line)",
              }}
              title="Save to history"
            >
              Save
            </button>
            <button
              onClick={handleShare}
              className="text-xs font-medium px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
              style={{
                background: "var(--accent)",
                color: "#fff",
              }}
            >
              {copied ? "Copied!" : "Share"}
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 py-6 space-y-5">
        {/* Regex input + flags */}
        <RegexInput
          pattern={pattern}
          flags={flags}
          error={error}
          onPatternChange={handlePatternChange}
          onFlagsChange={setFlags}
        />

        {/* Test string with highlights */}
        <TestStringInput
          testString={testString}
          regex={regex}
          onChange={handleTestStringChange}
        />

        {/* Match results */}
        <MatchResults regex={regex} testString={testString} />

        {/* Replace */}
        <ReplacePanel
          regex={regex}
          testString={testString}
          replacement={replacement}
          onReplacementChange={setReplacement}
        />

        {/* Explain mode */}
        <ExplainPanel
          pattern={pattern}
          open={explainOpen}
          onToggle={() => setExplainOpen((o) => !o)}
        />

        {/* Reference */}
        <ReferencePanel
          open={referenceOpen}
          onToggle={() => setReferenceOpen((o) => !o)}
        />

        {/* Cheat sheet */}
        <CheatsheetPanel
          open={cheatsheetOpen}
          onToggle={() => setCheatsheetOpen((o) => !o)}
          onUse={handleUseCheatsheet}
        />

        {/* History */}
        <HistoryPanel
          history={history}
          open={historyOpen}
          onToggle={() => setHistoryOpen((o) => !o)}
          onUse={handleUseHistory}
          onClear={handleClearHistory}
        />

        {/* Footer */}
        <footer className="pt-4 pb-8 text-center">
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            Regex Tester — a{" "}
            <a
              href="https://freeappstore.online"
              className="underline"
              style={{ color: "var(--accent)" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              FreeAppStore
            </a>{" "}
            app
          </p>
        </footer>
      </main>
    </div>
  );
}
