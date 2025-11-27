// tailwind.config.mjs
export default {
  content: ["./src/components/animated-scroll/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        scroll: "scroll 700s linear infinite",
      },
    },
  },
};
