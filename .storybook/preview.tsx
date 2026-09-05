import type { Decorator, Preview } from "@storybook/tanstack-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";

import i18n from "../src/ui/i18n/config";
import "../src/ui/index.css";

/**
 * Components reach the API through React Query hooks (see
 * `src/ui/use-cases/**`). Stories get their own client so nothing is cached
 * between stories and failed requests are not retried for 30s.
 */
const StoryQueryClientProvider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { retry: false, refetchOnWindowFocus: false },
          mutations: { retry: false },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const withQueryClient: Decorator = (Story) => (
  <StoryQueryClientProvider>
    <Story />
  </StoryQueryClientProvider>
);

const StoryLocale = ({
  locale,
  children,
}: {
  locale: string;
  children: ReactNode;
}) => {
  useEffect(() => {
    if (i18n.language !== locale) {
      void i18n.changeLanguage(locale);
    }
  }, [locale]);

  return <>{children}</>;
};

/** Drives i18next from the `locale` toolbar global. */
const withI18n: Decorator = (Story, context) => (
  <StoryLocale locale={context.globals.locale as string}>
    <Story />
  </StoryLocale>
);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // "todo" reports violations in the addon panel and the Vitest run without
      // failing the build. Switch to "error" once the existing violations are
      // cleared.
      test: "todo",
    },
  },
  globalTypes: {
    locale: {
      description: "i18next language",
      toolbar: {
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "uk", title: "Українська" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    locale: "en",
  },
  decorators: [withI18n, withQueryClient],
};

export default preview;
