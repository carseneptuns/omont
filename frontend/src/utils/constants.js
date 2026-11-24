// A "page" on the typewriter tops out here — after this, it's time
// for a new page, the same way a real typewriter runs out of paper.
export const MAX_WORDS = 300;

export function countWords(text) {
  const trimmed = (text || "").trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}
