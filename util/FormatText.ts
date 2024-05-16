export function removeCharacters(question: string) {
  return question
    .replace(/&quot;/g, '"')
    .replace(/&rsquo;/g, "’")
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&shy;/g, "-\n")
    .replace(/&ldquo;/g, "“")
    .replace(/&hellip;/g, "…")
    .replace(/&rdquo;/g, "”");
}