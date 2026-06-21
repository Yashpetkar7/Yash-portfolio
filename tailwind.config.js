/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Primary Accent
        primary: "#b8fd4b",
        "on-primary": "#3d5e00",
        "primary-dim": "#aaee3d",
        "primary-container": "#83c300",
        "on-primary-container": "#223600",
        "primary-fixed": "#b8fd4b",
        "primary-fixed-dim": "#aaee3d",
        "on-primary-fixed": "#304a00",
        "on-primary-fixed-variant": "#456900",

        // Surface
        surface: "#0e0e0e",
        "on-surface": "#ffffff",
        "on-surface-variant": "#ababab",
        "surface-dim": "#0e0e0e",
        "surface-bright": "#2c2c2c",
        "surface-container": "#191919",
        "surface-container-low": "#131313",
        "surface-container-high": "#1f1f1f",
        "surface-container-highest": "#262626",
        "surface-container-lowest": "#000000",
        "surface-variant": "#262626",
        "inverse-surface": "#f9f9f9",

        // Secondary
        secondary: "#e5e2e1",
        "on-secondary": "#525151",
        "secondary-dim": "#d7d4d3",
        "secondary-container": "#474646",
        "on-secondary-container": "#d2d0cf",
        "secondary-fixed": "#e5e2e1",
        "secondary-fixed-dim": "#d7d4d3",
        "on-secondary-fixed": "#403f3f",
        "on-secondary-fixed-variant": "#5c5b5b",

        // Tertiary
        tertiary: "#f2ffd1",
        "on-tertiary": "#556438",
        "tertiary-dim": "#deefb7",
        "tertiary-container": "#e0f2ba",
        "on-tertiary-container": "#4d5c31",
        "tertiary-fixed": "#ecfec5",
        "tertiary-fixed-dim": "#deefb7",
        "on-tertiary-fixed": "#425027",
        "on-tertiary-fixed-variant": "#5e6d41",

        // Error
        error: "#ff7351",
        "error-dim": "#d53d18",
        "error-container": "#b92902",
        "on-error": "#450900",
        "on-error-container": "#ffd2c8",

        // Outlines
        outline: "#757575",
        "outline-variant": "#484848",

        // Background
        background: "#0e0e0e",
        "on-background": "#ffffff",

        // Inverse
        "inverse-primary": "#456900",
        "inverse-on-surface": "#555555",
      },
      fontFamily: {
        headline: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        label: ["Space Grotesk", "sans-serif"],
        mono: ["Syne Mono", "monospace"],
      },
      borderRadius: {
        DEFAULT: "0px",
        lg: "0px",
        xl: "0px",
        full: "9999px",
      },
      animation: {
        "blink": "blink 1s infinite",
        "scanline": "scanline 8s linear infinite",
        "glitch": "glitch 0.2s linear infinite",
        "pulse-primary": "pulse-primary 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "gradient-primary": "gradient-primary 6s ease infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        glitch: {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
          "100%": { transform: "translate(0)" },
        },
        "pulse-primary": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "gradient-primary": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      backgroundImage: {
        grain: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
