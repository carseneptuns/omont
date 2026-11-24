// Paper color options — soft, muted tones so the vintage paper feel
// stays intact no matter which one is picked. No pure/neon colors.
export const PAPER_COLORS = {
  beige: { label: "Beige / Cream", bg: "#F7F2E8", ink: "#3A3936" },
  white: { label: "White", bg: "#FAF9F6", ink: "#3A3936" },
  orange: { label: "Orange", bg: "#F2D9BE", ink: "#4A362A" },
  pink: { label: "Pink", bg: "#F5DEE2", ink: "#4A3238" },
  blue: { label: "Blue", bg: "#E1EAEE", ink: "#2E3B40" },
  green: { label: "Green", bg: "#E5EBDD", ink: "#333B2A" },
  yellow: { label: "Yellow", bg: "#F5EBC6", ink: "#463F22" },
  purple: { label: "Purple", bg: "#E9DFEA", ink: "#3D3242" },
};

export const PAPER_COLOR_ORDER = [
  "beige",
  "orange",
  "pink",
  "white",
  "blue",
  "green",
  "yellow",
  "purple",
];

export function getPaperColor(name) {
  return PAPER_COLORS[name] || PAPER_COLORS.beige;
}

export function hexToRgba(hex, alpha = 1) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
