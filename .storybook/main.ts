import type { StorybookConfig } from "@storybook/tanstack-react";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: "@storybook/tanstack-react",
  // The Vite builder reuses ../vite.config.ts, so the `@/` alias and the
  // TanStack Router plugin already apply to stories.
};

export default config;
