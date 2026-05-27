export interface ExplainToken {
  raw: string;
  description: string;
}

export function explainRegex(pattern: string): ExplainToken[] {
  const tokens: ExplainToken[] = [];
  let i = 0;

  while (i < pattern.length) {
    const ch = pattern[i];

    // Escaped sequences
    if (ch === "\\") {
      const next = pattern[i + 1];
      if (next === undefined) {
        tokens.push({ raw: "\\", description: "Incomplete escape sequence" });
        i++;
        continue;
      }

      const escapeMap: Record<string, string> = {
        d: "Matches any digit (0-9)",
        D: "Matches any non-digit",
        w: "Matches any word character (letter, digit, underscore)",
        W: "Matches any non-word character",
        s: "Matches any whitespace (space, tab, newline)",
        S: "Matches any non-whitespace",
        b: "Word boundary",
        B: "Non-word boundary",
        n: "Matches a newline",
        r: "Matches a carriage return",
        t: "Matches a tab",
        "0": "Matches a null character",
      };

      const desc = escapeMap[next];
      if (desc) {
        tokens.push({ raw: `\\${next}`, description: desc });
        i += 2;
        continue;
      }

      // Backreference \1-\9
      if (next >= "1" && next <= "9") {
        tokens.push({ raw: `\\${next}`, description: `Backreference to capture group ${next}` });
        i += 2;
        continue;
      }

      // Literal escape
      tokens.push({ raw: `\\${next}`, description: `Literal '${next}'` });
      i += 2;
      continue;
    }

    // Character class [...]
    if (ch === "[") {
      let end = i + 1;
      if (pattern[end] === "^") end++;
      if (pattern[end] === "]") end++; // ] right after [ or [^
      while (end < pattern.length && pattern[end] !== "]") end++;
      const classContent = pattern.slice(i, end + 1);
      const negated = pattern[i + 1] === "^";
      tokens.push({
        raw: classContent,
        description: negated
          ? `Matches any character NOT in: ${classContent.slice(2, -1)}`
          : `Matches any character in: ${classContent.slice(1, -1)}`,
      });
      i = end + 1;
      continue;
    }

    // Groups
    if (ch === "(") {
      // Check for group type
      if (pattern[i + 1] === "?") {
        if (pattern[i + 2] === ":") {
          tokens.push({ raw: "(?:", description: "Start non-capturing group" });
          i += 3;
          continue;
        }
        if (pattern[i + 2] === "=") {
          tokens.push({ raw: "(?=", description: "Start positive lookahead" });
          i += 3;
          continue;
        }
        if (pattern[i + 2] === "!") {
          tokens.push({ raw: "(?!", description: "Start negative lookahead" });
          i += 3;
          continue;
        }
        if (pattern[i + 2] === "<" && pattern[i + 3] === "=") {
          tokens.push({ raw: "(?<=", description: "Start positive lookbehind" });
          i += 4;
          continue;
        }
        if (pattern[i + 2] === "<" && pattern[i + 3] === "!") {
          tokens.push({ raw: "(?<!", description: "Start negative lookbehind" });
          i += 4;
          continue;
        }
        // Named group (?<name>...)
        if (pattern[i + 2] === "<") {
          let nameEnd = i + 3;
          while (nameEnd < pattern.length && pattern[nameEnd] !== ">") nameEnd++;
          const name = pattern.slice(i + 3, nameEnd);
          tokens.push({ raw: pattern.slice(i, nameEnd + 1), description: `Start named capture group '${name}'` });
          i = nameEnd + 1;
          continue;
        }
      }
      tokens.push({ raw: "(", description: "Start capturing group" });
      i++;
      continue;
    }

    if (ch === ")") {
      tokens.push({ raw: ")", description: "End group" });
      i++;
      continue;
    }

    // Quantifiers
    if (ch === "{") {
      let end = i + 1;
      while (end < pattern.length && pattern[end] !== "}") end++;
      const quant = pattern.slice(i, end + 1);
      const inner = quant.slice(1, -1);
      if (inner.includes(",")) {
        const [min, max] = inner.split(",");
        if (max?.trim()) {
          tokens.push({ raw: quant, description: `Match between ${min} and ${max.trim()} times` });
        } else {
          tokens.push({ raw: quant, description: `Match ${min} or more times` });
        }
      } else {
        tokens.push({ raw: quant, description: `Match exactly ${inner} times` });
      }
      i = end + 1;
      // Lazy modifier
      if (pattern[i] === "?") {
        tokens.push({ raw: "?", description: "Lazy (match as few as possible)" });
        i++;
      }
      continue;
    }

    // Simple tokens
    const simpleMap: Record<string, string> = {
      ".": "Matches any character except newline",
      "^": "Matches the start of the string",
      "$": "Matches the end of the string",
      "*": "Match 0 or more of the preceding element",
      "+": "Match 1 or more of the preceding element",
      "?": "Match 0 or 1 of the preceding element (optional)",
      "|": "Alternation: match left or right side",
    };

    if (ch !== undefined && ch in simpleMap) {
      tokens.push({ raw: ch, description: simpleMap[ch]! });
      // Check for lazy modifier after * or +
      if ((ch === "*" || ch === "+" || ch === "?") && pattern[i + 1] === "?") {
        tokens.push({ raw: "?", description: "Lazy (match as few as possible)" });
        i++;
      }
      i++;
      continue;
    }

    // Literal character
    tokens.push({ raw: ch ?? "", description: `Literal '${ch ?? ""}'` });
    i++;
  }

  return tokens;
}
