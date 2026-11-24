// Typewriter color options — muted, aesthetic, no neon.
export const TYPEWRITER_COLORS = {
  blue: { label: "Blue", body: "#7895A9", shade: "#5E7A8D", highlight: "#9DB6C6" },
  black: { label: "Black", body: "#252525", shade: "#141414", highlight: "#3E3E3E" },
  brown: { label: "Brown", body: "#7A5A45", shade: "#5E4433", highlight: "#977254" },
  gray: { label: "Gray", body: "#8D9295", shade: "#6D7275", highlight: "#A9AEB1" },
  pink: { label: "Pink", body: "#D8A0A9", shade: "#BD8189", highlight: "#E7BCC2" },
};

export const COLOR_ORDER = ["blue", "black", "brown", "gray", "pink"];

export function getColor(name) {
  return TYPEWRITER_COLORS[name] || TYPEWRITER_COLORS.blue;
}
