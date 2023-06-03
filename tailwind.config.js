const { violet, blackA, mauve, green } = require("@radix-ui/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    boxShadow: {
      inner2: "inset 0 1px 1px hsla(0,0%,20%)",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      primary: {
        "05": "#580505",
        "04": "#790404",
        "03": "#BA0000",
        "02": "#E43D3D",
        "01": "#F36B6B",
      },
      secondary: {
        "05": "#0B0C0D",
        "04": "#0C0E0F",
        "03": "#171818",
        "02": "#212324",
        "01": "#343434",
      },
      gray: {
        "05": "#3E3E3E",
        "04": "#535353",
        "03": "#7C7C7C",
        "02": "#989898",
        "01": "#CECECE",
      },
      neutral: {
        "05": "#E4E4E4",
        "04": "#F3EEEE",
        "03": "#F3F3F3",
        "02": "#F8F8F8",
        "01": "#FEFEFE",
      },
      success: {
        "01": "#237C00",
        "02": "#3EB80E",
        "03": "#E4F9DA",
      },
      danger: {
        "01": "#EA172E",
        "02": "#EE4B4B",
        "03": "#FCD2D2",
      },
      info: {
        "01": "#1F62A5",
        "02": "#61AEE7",
        "03": "#C7DEEF",
      },
      waiting: {
        "01": "#F8BA1B",
        "02": "#FFD234",
      },
      link: {
        "01": "#3201BE",
        "02": "#2420F9",
      },
    },
    extend: {
      screens: {
        "3xl": "1850px",
        xs: "400px",
      },
      container: {
        center: true,
        padding: "2rem",
        screens: {
          ...defaultTheme.container.screens,
          "2xl": "1280px",
        },
      },
      fontSize: {
        xxs: "0.625rem",
        "4.5xl": "2.5rem",
      },
      lineHeight: {
        11: "2.75rem",
      },
      height: {
        22: "5.5rem",
      },
      width: {
        22: "5.5rem",
      },
      margin: {
        22: "5.5rem",
      },
      backgroundImage: {
        user: "./src/public/user.jpg",
        "header-dashboard": "url('/bg-dashboard.png')",
        "hero-section-lp": "url('/hero-section-lp.png')",
      },
      colors: {
        ...mauve,
        ...violet,
        ...green,
        ...blackA,
      },
      keyframes: {
        slideDown: {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        slideUp: {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentShow: {
          from: { opacity: 0, transform: "translate(-50%, -48%) scale(0.96)" },
          to: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
        },
      },
      animation: {
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideDown: "slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)",
        slideUp: "slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)",
      },
    },
    variants: {
      extend: {
        lineClamp: ["hover"],
      },
    },
  },
  // plugins: [require("@tailwindcss/line-clamp")],
};
