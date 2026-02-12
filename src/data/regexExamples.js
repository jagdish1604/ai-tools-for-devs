const regexExamples = [
  // --- 1. CORE VALIDATION (10) ---
  {
    category: "Validation",
    items: [
      { title: "Email Address", pattern: "\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}\\b", flags: "g", description: "Standard email validation", test: "test@example.com" },
      { title: "Gmail Address", pattern: "^[a-zA-Z0-9._%+-]+@gmail\\.com$", flags: "m", description: "Gmail specific", test: "user@gmail.com" },
      { title: "Phone (International)", pattern: "\\+?\\d{1,3}[\\s-]?\\d{6,14}", flags: "g", description: "International format", test: "+91 9876543210" },
      { title: "Username", pattern: "^[a-zA-Z0-9_]{3,16}$", flags: "", description: "Alphanumeric and underscore", test: "dev_user1" },
      { title: "Strong Password", pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$", flags: "", description: "Complex requirements", test: "Admin@1234" },
      { title: "ZIP Code (US)", pattern: "^\\d{5}(-\\d{4})?$", flags: "", description: "5 or 9 digit ZIP", test: "90210-1234" },
      { title: "UK Postcode", pattern: "^[A-Z]{1,2}\\d[A-Z\\d]? ?\\d[A-Z]{2}$", flags: "i", description: "United Kingdom format", test: "SW1A 1AA" },
      { title: "Indian Pincode", pattern: "^[1-9][0-9]{5}$", flags: "", description: "6-digit Indian PIN", test: "380001" },
      { title: "Canada Postal Code", pattern: "^[A-Z]\\d[A-Z] \\d[A-Z]\\d$", flags: "", description: "A1B 2C3 format", test: "K1A 0B1" },
      { title: "Social Security (SSN)", pattern: "^\\d{3}-\\d{2}-\\d{4}$", flags: "", description: "US SSN format", test: "123-45-6789" }
    ]
  },

  // --- 2. FINANCIAL (10) ---
  {
    category: "Financial",
    items: [
      { title: "Visa Card", pattern: "^4[0-9]{12}(?:[0-9]{3})?$", flags: "", description: "Visa credit cards", test: "4111222233334444" },
      { title: "MasterCard", pattern: "^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$", flags: "", description: "MasterCard numbers", test: "5105105105105100" },
      { title: "Amex Card", pattern: "^3[47][0-9]{13}$", flags: "", description: "American Express", test: "341234567890123" },
      { title: "Price (USD)", pattern: "^\\$\\d+(?:\\.\\d{2})?$", flags: "", description: "Currency like $9.99", test: "$19.50" },
      { title: "IBAN", pattern: "[A-Z]{2}\\d{2}[A-Z0-9]{11,30}", flags: "g", description: "International Bank Account", test: "DE89370400440532013000" },
      { title: "Bitcoin Address", pattern: "^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$", flags: "", description: "Legacy BTC address", test: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa" },
      { title: "Credit Card Expiry", pattern: "^(0[1-9]|1[0-2])\\/([0-9]{2})$", flags: "", description: "MM/YY format", test: "12/25" },
      { title: "CVV Code", pattern: "^[0-9]{3,4}$", flags: "", description: "3 or 4 digit security code", test: "123" },
      { title: "Decimal Amount", pattern: "^\\d+\\.\\d{2}$", flags: "", description: "Strict 2 decimal places", test: "150.00" },
      { title: "SWIFT/BIC", pattern: "^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$", flags: "", description: "Bank ID codes", test: "ABCDEFF1" }
    ]
  },

  // --- 3. DATES & TIME (10) ---
  {
    category: "Dates & Time",
    items: [
      { title: "YYYY-MM-DD", pattern: "^\\d{4}-\\d{2}-\\d{2}$", flags: "m", description: "ISO Date", test: "2026-12-31" },
      { title: "DD/MM/YYYY", pattern: "^\\d{2}\\/\\d{2}\\/\\d{4}$", flags: "m", description: "European format", test: "31/12/2026" },
      { title: "MM/DD/YYYY", pattern: "^\\d{2}\\/\\d{2}\\/\\d{4}$", flags: "m", description: "US format", test: "12/31/2026" },
      { title: "24-Hour Time", pattern: "^([01]\\d|2[0-3]):[0-5]\\d$", flags: "", description: "HH:MM format", test: "23:59" },
      { title: "12-Hour (AM/PM)", pattern: "^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$", flags: "i", description: "With AM/PM", test: "11:30 PM" },
      { title: "ISO 8601", pattern: "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$", flags: "", description: "Standard UTC", test: "2026-02-12T22:00:00Z" },
      { title: "Year (1900-2099)", pattern: "^(19|20)\\d{2}$", flags: "", description: "Century validation", test: "2024" },
      { title: "Month Name", pattern: "\\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\\b", flags: "gi", description: "Months only", test: "January" },
      { title: "Time with Seconds", pattern: "^(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d$", flags: "", description: "HH:MM:SS", test: "12:05:30" },
      { title: "Unix Timestamp", pattern: "^\\d{10}$", flags: "", description: "10-digit timestamp", test: "1700000000" }
    ]
  },

  // --- 4. NETWORKING & WEB (10) ---
  {
    category: "Networking",
    items: [
      { title: "IPv4", pattern: "\\b(\\d{1,3}\\.){3}\\d{1,3}\\b", flags: "g", description: "IP addresses", test: "192.168.1.1" },
      { title: "IPv6", pattern: "([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}", flags: "g", description: "Full IPv6", test: "2001:0db8:85a3:0000:0000:8a2e:0370:7334" },
      { title: "MAC Address", pattern: "([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}", flags: "g", description: "Hardware address", test: "00:1A:2B:3C:4D:5E" },
      { title: "URL (Secure)", pattern: "https:\\/\\/[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&'\\(\\)\\*\\+,;=.]+", flags: "g", description: "Complete URL", test: "https://google.com/search?q=test" },
      { title: "Domain", pattern: "^[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", flags: "", description: "Naked domain", test: "example.co.uk" },
      { title: "Port Number", pattern: "\\b(?:[1-9]\\d{0,3}|[1-5]\\d{4}|6[0-4]\\d{3}|65[0-4]\\d{2}|655[0-2]\\d|6553[0-5])\\b", flags: "g", description: "1-65535", test: "8080" },
      { title: "Subdomain", pattern: "^([a-z0-9]+\\.)+[a-z0-9]+\\.[a-z]{2,}$", flags: "i", description: "Matches sub.domain.com", test: "api.v1.site.com" },
      { title: "Slug", pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$", flags: "", description: "URL friendly slug", test: "my-post-title" },
      { title: "FTP URL", pattern: "ftp:\\/\\/[\\w.-]+", flags: "g", description: "FTP links", test: "ftp://files.site.com" },
      { title: "Magnet Link", pattern: "magnet:\\?xt=urn:btih:[a-zA-Z0-9]+", flags: "i", description: "P2P links", test: "magnet:?xt=urn:btih:ABC123..." }
    ]
  },

  // --- 5. TEXT PROCESSING (10) ---
  {
    category: "Text Processing",
    items: [
      { title: "Only Numbers", pattern: "^\\d+$", flags: "", description: "Digits only", test: "12345" },
      { title: "Only Alphabets", pattern: "^[A-Za-z]+$", flags: "", description: "Letters only", test: "Hello" },
      { title: "Alphanumeric", pattern: "^[A-Za-z0-9]+$", flags: "", description: "No symbols", test: "User123" },
      { title: "Multiple Spaces", pattern: "\\s{2,}", flags: "g", description: "Excess whitespace", test: "Word    Word" },
      { title: "Duplicate Words", pattern: "\\b(\\w+)\\s+\\1\\b", flags: "gi", description: "Double words", test: "the the" },
      { title: "Initial Caps", pattern: "\\b[A-Z][a-z]+\\b", flags: "g", description: "Capitalized words", test: "New York" },
      { title: "Extract Hashtags", pattern: "#(\\w+)", flags: "g", description: "Social tags", test: "#coding #dev" },
      { title: "Extract Mentions", pattern: "@(\\w+)", flags: "g", description: "User handles", test: "@elonmusk" },
      { title: "Line Start", pattern: "^[A-Z]", flags: "gm", description: "Start with uppercase", test: "Start of line" },
      { title: "Trim Whitespace", pattern: "^\\s+|\\s+$", flags: "g", description: "Leading/trailing spaces", test: "  hello  " }
    ]
  },

  // --- 6. PROGRAMMING (10) ---
  {
    category: "Programming",
    items: [
      { title: "JS Variable", pattern: "^[a-zA-Z_$][a-zA-Z0-9_$]*$", flags: "", description: "Valid identifier", test: "my_Var1" },
      { title: "Hex Color", pattern: "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$", flags: "", description: "Web colors", test: "#FFFFFF" },
      { title: "UUID v4", pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$", flags: "i", description: "Unique IDs", test: "550e8400-e29b-41d4-a716-446655440000" },
      { title: "JSON Key", pattern: "\"(\\w+)\"(?=\\s*:)", flags: "g", description: "Key extraction", test: "\"id\": 1" },
      { title: "Markdown Link", pattern: "\\[([^\\]]+)\\]\\(([^\\)]+)\\)", flags: "g", description: "Links in MD", test: "[Text](url)" },
      { title: "Git Hash", pattern: "\\b[0-9a-f]{7,40}\\b", flags: "g", description: "Commit SHAs", test: "a1b2c3d" },
      { title: "CSS Comment", pattern: "\\/\\*[\\s\\S]*?\\*\\/", flags: "g", description: "Multi-line comments", test: "/* code */" },
      { title: "Semicolon End", pattern: ";$", flags: "gm", description: "Lines ending in ;", test: "const x = 1;" },
      { title: "RGB Color", pattern: "rgb\\(\\d{1,3},\\s*\\d{1,3},\\s*\\d{1,3}\\)", flags: "i", description: "CSS RGB format", test: "rgb(255, 0, 0)" },
      { title: "HTML Entity", pattern: "&[a-z]+;|&#[0-9]+;", flags: "g", description: "Character codes", test: "&amp; or &#123;" }
    ]
  },

  // --- 7. ADVANCED WEB SCRAPING (10) ---
  {
    category: "Scraping",
    items: [
      { title: "HTML Tag", pattern: "<(\"[^\"]*\"|'[^']*'|[^'\">])*>", flags: "g", description: "Match any tag", test: "<div>" },
      { title: "Image Source", pattern: "<img\\s+[^>]*src=\"([^\"]*)\"", flags: "gi", description: "Extract src", test: "<img src='p.jpg'>" },
      { title: "Anchor Href", pattern: "<a\\s+[^>]*href=\"([^\"]*)\"", flags: "gi", description: "Extract link URLs", test: "<a href='...'>" },
      { title: "Page Title", pattern: "<title>(.*?)<\\/title>", flags: "i", description: "Get <title> content", test: "<title>Home</title>" },
      { title: "Meta Description", pattern: "<meta[^>]*name=\"description\"[^>]*content=\"([^\"]*)\"", flags: "gi", description: "SEO tags", test: "<meta name='description'..." },
      { title: "YouTube ID", pattern: "(?:v=|\\/)([0-9A-Za-z_-]{11}).*", flags: "g", description: "Extract Video ID", test: "watch?v=dQw4w9WgXcQ" },
      { title: "Price Scraper", pattern: "(\\$\\d+\\.\\d{2})", flags: "g", description: "Find prices in text", test: "Buy for $29.99" },
      { title: "Script Tags", pattern: "<script[\\s\\S]*?>[\\s\\S]*?<\\/script>", flags: "gi", description: "Entire JS blocks", test: "<script>...</script>" },
      { title: "Phone Links", pattern: "tel:(\\+?\\d+)", flags: "g", description: "Phone protocols", test: "tel:+1234567" },
      { title: "Data Attributes", pattern: "data-(\\w+)=\"([^\"]*)\"", flags: "g", description: "HTML5 data- attributes", test: "data-id='123'" }
    ]
  },

  // --- 8. SECURITY & LOGS (10) ---
  {
    category: "Security",
    items: [
      { title: "SQL Injection", pattern: "('.*--)|(--)|(\\*)|(DROP|SELECT|UPDATE|DELETE)", flags: "gi", description: "Risky keywords", test: "SELECT * FROM users" },
      { title: "XSS Attempt", pattern: "<script.*?>.*?<\\/script>", flags: "gi", description: "Script injection", test: "<script>alert(1)</script>" },
      { title: "Path Traversal", pattern: "\\.\\.\\/|\\.\\.\\\\", flags: "g", description: "Directory climbing", test: "../../etc/passwd" },
      { title: "Credit Card (Any)", pattern: "\\b(?:\\d{4}[ -]?){3}\\d{4}\\b", flags: "g", description: "Generic CC check", test: "1234-5678-9012-3456" },
      { title: "Log Timestamp", pattern: "^\\[\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}\\]", flags: "m", description: "Common log start", test: "[2026-02-12 10:00:00]" },
      { title: "Error Log", pattern: ".*ERROR.*", flags: "g", description: "Find error lines", test: "FATAL ERROR at..." },
      { title: "Access Token", pattern: "Bearer\\s+[A-Za-z0-9-_=]+\\.[A-Za-z0-9-_=]+\\.?[A-Za-z0-9-_.+/=]*", flags: "g", description: "JWT/Bearer tokens", test: "Bearer eyJhbG..." },
      { title: "SSH Key", pattern: "ssh-rsa\\s+[A-Za-z0-9+/=]+", flags: "g", description: "Public RSA keys", test: "ssh-rsa AAAAB3..." },
      { title: "API Key", pattern: "[a-zA-Z0-9]{32,48}", flags: "g", description: "General API patterns", test: "abcd1234efgh5678..." },
      { title: "Shell Command", pattern: "\\bsudo\\s+\\w+", flags: "g", description: "Privileged commands", test: "sudo apt update" }
    ]
  },

  // --- 9. FILES & PATHS (10) ---
  {
    category: "Files",
    items: [
      { title: "Image Files", pattern: "\\.(jpg|jpeg|png|gif|svg|webp)$", flags: "i", description: "Standard images", test: "photo.png" },
      { title: "Video Files", pattern: "\\.(mp4|mov|avi|mkv|wmv)$", flags: "i", description: "Video formats", test: "movie.mp4" },
      { title: "PDF File", pattern: "\\.pdf$", flags: "i", description: "PDF documents", test: "invoice.pdf" },
      { title: "Compressed", pattern: "\\.(zip|rar|tar\\.gz|7z)$", flags: "i", description: "Archives", test: "data.tar.gz" },
      { title: "Windows Path", pattern: "^[A-Z]:\\\\.*", flags: "i", description: "C:\\ folder path", test: "C:\\Windows\\System32" },
      { title: "Unix Path", pattern: "^\\/.*", flags: "", description: "Root folder path", test: "/var/www/html" },
      { title: "Log File", pattern: "\\.log$", flags: "i", description: "System logs", test: "access.log" },
      { title: "Excel Files", pattern: "\\.(xls|xlsx|csv)$", flags: "i", description: "Spreadsheets", test: "sales.csv" },
      { title: "Hidden Files", pattern: "^\\.[^\\/]+$", flags: "m", description: ".gitignore style", test: ".env" },
      { title: "File Size", pattern: "(\\d+(?:\\.\\d+)?)\\s*(KB|MB|GB|TB)", flags: "i", description: "Extract size strings", test: "Size: 1.5 GB" }
    ]
  },

  // --- 10. MISC / SPECIAL (10) ---
  {
    category: "Miscellaneous",
    items: [
      { title: "Non-ASCII", pattern: "[^\\x00-\\x7F]+", flags: "g", description: "Special characters", test: "Héllö" },
      { title: "Emoji", pattern: "[\\uD83C-\\uDBFF\\uDC00-\\uDFFF]+", flags: "g", description: "Find emojis", test: "Hi! 👋" },
      { title: "Vowels", pattern: "[aeiou]", flags: "gi", description: "All vowels", test: "Education" },
      { title: "Consonants", pattern: "[bcdfghjklmnpqrstvwxyz]", flags: "gi", description: "All consonants", test: "Testing" },
      { title: "Capitalized Word", pattern: "\\b[A-Z]+\\b", flags: "g", description: "Shouting/Acronyms", test: "NASA" },
      { title: "Version Number", pattern: "v?\\d+\\.\\d+\\.\\d+", flags: "", description: "SemVer 1.0.0", test: "v2.4.1" },
      { title: "Hexadecimal", pattern: "0x[0-9a-fA-F]+", flags: "g", description: "Hex values", test: "0x4A" },
      { title: "Coordinate", pattern: "-?\\d+\\.\\d+,\\s*-?\\d+\\.\\d+", flags: "g", description: "Lat/Long", test: "34.05, -118.24" },
      { title: "Morse Code", pattern: "^[.-]{1,5}(?:\\s[.-]{1,5})*$", flags: "m", description: "Dots and dashes", test: "... --- ..." },
      { title: "Words by Length", pattern: "\\b\\w{10,}\\b", flags: "g", description: "Words > 10 chars", test: "Exaggeration" }
    ]
  }
];

export default regexExamples;