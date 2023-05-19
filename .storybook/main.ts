import type { StorybookConfig } from "@storybook/nextjs";
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/blocks",
    "storybook-addon-designs",
    // "@storybook/addon-mdx-gfm",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: true,
  },
  staticDirs: ["../public"],
};
export default config;
