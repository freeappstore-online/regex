export function encodeShareURL(pattern: string, flags: string, testString: string): string {
  const data = JSON.stringify({ p: pattern, f: flags, t: testString });
  const encoded = btoa(encodeURIComponent(data));
  return `${window.location.origin}${window.location.pathname}#share=${encoded}`;
}

export function decodeShareURL(): { pattern: string; flags: string; testString: string } | null {
  const hash = window.location.hash;
  if (!hash.startsWith("#share=")) return null;
  try {
    const encoded = hash.slice(7);
    const data = decodeURIComponent(atob(encoded));
    const parsed = JSON.parse(data) as { p?: string; f?: string; t?: string };
    return {
      pattern: parsed.p ?? "",
      flags: parsed.f ?? "",
      testString: parsed.t ?? "",
    };
  } catch {
    return null;
  }
}
