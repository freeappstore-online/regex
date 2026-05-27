export interface CheatsheetEntry {
  label: string;
  pattern: string;
  testString: string;
  description: string;
}

export const cheatsheetEntries: CheatsheetEntry[] = [
  {
    label: "Email",
    pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
    testString: "Contact us at hello@example.com or support@test.org",
    description: "Matches most email addresses",
  },
  {
    label: "URL",
    pattern: "https?://[\\w.-]+(?:\\.[a-z]{2,})(?:/[\\w./-]*)?",
    testString: "Visit https://example.com/page or http://test.org",
    description: "Matches HTTP/HTTPS URLs",
  },
  {
    label: "Phone (US)",
    pattern: "\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}",
    testString: "Call (555) 123-4567 or 555.987.6543",
    description: "Matches US phone numbers",
  },
  {
    label: "IPv4 Address",
    pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b",
    testString: "Server at 192.168.1.1 and 10.0.0.255",
    description: "Matches IPv4 addresses",
  },
  {
    label: "Date (YYYY-MM-DD)",
    pattern: "\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])",
    testString: "Born on 1990-05-15, expires 2026-12-31",
    description: "Matches ISO date format",
  },
  {
    label: "Hex Color",
    pattern: "#(?:[0-9a-fA-F]{3}){1,2}\\b",
    testString: "Colors: #fff, #2563eb, #FF5733, #000",
    description: "Matches 3 or 6 digit hex colors",
  },
  {
    label: "HTML Tag",
    pattern: "<\\/?[a-z][a-z0-9]*(?:\\s[^>]*)?\\/?>",
    testString: '<div class="box"><p>Hello</p></div>',
    description: "Matches opening and closing HTML tags",
  },
  {
    label: "Credit Card",
    pattern: "\\b\\d{4}[- ]?\\d{4}[- ]?\\d{4}[- ]?\\d{4}\\b",
    testString: "Card: 4111-1111-1111-1111 or 5500 0000 0000 0004",
    description: "Matches 16-digit card numbers",
  },
  {
    label: "Username",
    pattern: "\\b[a-zA-Z][a-zA-Z0-9_]{2,15}\\b",
    testString: "Users: alice_99, Bob, john_doe_2026",
    description: "3-16 chars, starts with letter, allows underscores",
  },
  {
    label: "Strong Password",
    pattern: "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}",
    testString: "Weak: abc123 Strong: P@ssw0rd! Better: C0mpl3x!ty",
    description: "Min 8 chars, upper+lower+digit+special",
  },
  {
    label: "Zip Code (US)",
    pattern: "\\b\\d{5}(?:-\\d{4})?\\b",
    testString: "ZIP: 90210, 10001-1234, 30301",
    description: "Matches 5-digit or ZIP+4 format",
  },
  {
    label: "SSN",
    pattern: "\\b\\d{3}-\\d{2}-\\d{4}\\b",
    testString: "SSN: 123-45-6789 and 987-65-4321",
    description: "Matches US Social Security Numbers",
  },
  {
    label: "Time (24h)",
    pattern: "\\b(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d)?\\b",
    testString: "Meeting at 14:30 or 09:15:00",
    description: "Matches 24-hour time format",
  },
  {
    label: "Floating Point",
    pattern: "-?\\d+\\.\\d+",
    testString: "Values: 3.14, -2.5, 100.00, 0.001",
    description: "Matches decimal numbers",
  },
  {
    label: "MAC Address",
    pattern: "(?:[0-9a-fA-F]{2}:){5}[0-9a-fA-F]{2}",
    testString: "MAC: 00:1B:44:11:3A:B7",
    description: "Matches colon-separated MAC addresses",
  },
  {
    label: "Slug",
    pattern: "[a-z0-9]+(?:-[a-z0-9]+)*",
    testString: "URLs: my-blog-post, hello-world, regex-tester",
    description: "Matches URL-friendly slugs",
  },
  {
    label: "Whitespace Trim",
    pattern: "^\\s+|\\s+$",
    testString: "  lots of whitespace here  ",
    description: "Matches leading/trailing whitespace",
  },
  {
    label: "Repeated Words",
    pattern: "\\b(\\w+)\\s+\\1\\b",
    testString: "The the quick brown fox fox jumped",
    description: "Finds duplicate adjacent words",
  },
  {
    label: "Sentence",
    pattern: "[A-Z][^.!?]*[.!?]",
    testString: "Hello world! How are you? I am fine.",
    description: "Matches sentences starting with uppercase",
  },
  {
    label: "UUID",
    pattern: "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}",
    testString: "ID: 550e8400-e29b-41d4-a716-446655440000",
    description: "Matches UUID v4 format",
  },
];
