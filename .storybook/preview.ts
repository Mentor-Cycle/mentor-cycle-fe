import "../src/styles/globals.css";

export const parameters = {
  layout: "centered",
  backgrounds: { disabled: true },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
