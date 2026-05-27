export interface ReferenceEntry {
  token: string;
  label: string;
  description: string;
  example: string;
}

export const referenceEntries: ReferenceEntry[] = [
  { token: ".", label: "Dot", description: "Matches any character except newline", example: "a.c matches 'abc', 'a1c'" },
  { token: "\\d", label: "Digit", description: "Matches any digit (0-9)", example: "\\d+ matches '123' in 'abc123'" },
  { token: "\\w", label: "Word char", description: "Matches letter, digit, or underscore", example: "\\w+ matches 'hello_1'" },
  { token: "\\s", label: "Whitespace", description: "Matches space, tab, newline", example: "a\\sb matches 'a b'" },
  { token: "^", label: "Start", description: "Matches the start of string (or line with m flag)", example: "^Hello matches 'Hello world'" },
  { token: "$", label: "End", description: "Matches the end of string (or line with m flag)", example: "world$ matches 'Hello world'" },
  { token: "*", label: "Zero or more", description: "Matches 0 or more of the preceding element", example: "ab*c matches 'ac', 'abc', 'abbc'" },
  { token: "+", label: "One or more", description: "Matches 1 or more of the preceding element", example: "ab+c matches 'abc', 'abbc' but not 'ac'" },
  { token: "?", label: "Optional", description: "Matches 0 or 1 of the preceding element", example: "colou?r matches 'color', 'colour'" },
  { token: "{n}", label: "Exact count", description: "Matches exactly n occurrences", example: "a{3} matches 'aaa'" },
  { token: "[abc]", label: "Char class", description: "Matches any single character in the set", example: "[aeiou] matches any vowel" },
  { token: "(group)", label: "Capture group", description: "Groups and captures the match", example: "(ab)+ matches 'abab'" },
  { token: "(?:...)", label: "Non-capture", description: "Groups without capturing", example: "(?:ab)+ groups but doesn't capture" },
  { token: "(?=...)", label: "Lookahead", description: "Asserts what follows matches the pattern", example: "a(?=b) matches 'a' only before 'b'" },
  { token: "(?<=...)", label: "Lookbehind", description: "Asserts what precedes matches the pattern", example: "(?<=a)b matches 'b' only after 'a'" },
  { token: "\\b", label: "Word boundary", description: "Matches position between word and non-word char", example: "\\bword\\b matches whole 'word'" },
  { token: "|", label: "Alternation", description: "Matches either the left or right expression", example: "cat|dog matches 'cat' or 'dog'" },
];
