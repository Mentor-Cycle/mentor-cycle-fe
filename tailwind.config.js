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
        "05": "var(--primary-05)",
        "04": "var(--primary-04)",
        "03": "var(--primary-03)",
        "02": "var(--primary-02)",
        "01": "var(--primary-01)",
      },
      secondary: {
        "05": "var(--secondary-05)",
        "04": "var(--secondary-04)",
        "03": "var(--secondary-03)",
        "02": "var(--secondary-02)",
        "01": "var(--secondary-01)",
      },
      gray: {
        "05": "var(--gray-05)",
        "04": "var(--gray-04)",
        "03": "var(--gray-03)",
        "02": "var(--gray-02)",
        "01": "var(--gray-01)",
      },
      neutral: {
        "05": "var(--neutral-05)",
        "04": "var(--neutral-04)",
        "03": "var(--neutral-03)",
        "02": "var(--neutral-02)",
        "01": "var(--neutral-01)",
      },
      success: {
        "01": "var(--success-01)",
        "02": "var(--success-02)",
        "03": "var(--success-03)",
      },
      danger: {
        "01": "var(--danger-01)",
        "02": "var(--danger-02)",
        "03": "var(--danger-03)",
      },
      info: {
        "01": "var(--info-01)",
        "02": "var(--info-02)",
        "03": "var(--info-03)",
      },
      waiting: {
        "01": "var(--waiting-01)",
        "02": "var(--waiting-02)",
      },
      link: {
        "01": "var(--link-01)",
        "02": "var(--link-02)",
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
