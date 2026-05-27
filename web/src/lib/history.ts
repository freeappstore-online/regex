const STORAGE_KEY = "regex-tester-history";
const MAX_ENTRIES = 20;

export interface HistoryEntry {
  id: string;
  pattern: string;
  flags: string;
  testString: string;
  timestamp: number;
}

export function loadHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as HistoryEntry[];
  } catch {
    return [];
  }
}

export function saveToHistory(pattern: string, flags: string, testString: string): HistoryEntry[] {
  if (!pattern.trim()) return loadHistory();

  const history = loadHistory();

  // Don't add duplicates (same pattern + flags + test string)
  const exists = history.some(
    (e) => e.pattern === pattern && e.flags === flags && e.testString === testString,
  );
  if (exists) return history;

  const entry: HistoryEntry = {
    id: crypto.randomUUID(),
    pattern,
    flags,
    testString,
    timestamp: Date.now(),
  };

  const updated = [entry, ...history].slice(0, MAX_ENTRIES);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function clearHistory(): HistoryEntry[] {
  localStorage.removeItem(STORAGE_KEY);
  return [];
}
