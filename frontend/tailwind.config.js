/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        room: {
          DEFAULT: "#E9E5DF",
          light: "#F1EEE8",
          dark: "#DCD8D1",
        },
        paper: {
          DEFAULT: "#F7F2E8",
          soft: "#F5F0E6",
          ink: "#3A3936",
        },
        typewriter: {
          blue: "#7895A9",
          "blue-dark": "#5E7A8D",
          black: "#252525",
          "black-dark": "#141414",
          brown: "#7A5A45",
          "brown-dark": "#5E4433",
          gray: "#8D9295",
          "gray-dark": "#6D7275",
          pink: "#D8A0A9",
          "pink-dark": "#BD8189",
        },
      },
      fontFamily: {
        type: ['"Special Elite"', "monospace"],
        mono: ['"Courier Prime"', '"IBM Plex Mono"', "monospace"],
      },
      boxShadow: {
        paper: "0 18px 40px -12px rgba(58, 57, 54, 0.35)",
        machine: "0 30px 60px -15px rgba(20, 18, 15, 0.45)",
        key: "0 2px 0 rgba(0,0,0,0.35)",
      },
      transitionDuration: {
        250: "250ms",
      },
      keyframes: {
        jitter: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(1px)" },
        },
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        jitter: "jitter 90ms ease",
        "fade-up": "fade-up 400ms ease",
      },
    },
  },
  plugins: [],
};
