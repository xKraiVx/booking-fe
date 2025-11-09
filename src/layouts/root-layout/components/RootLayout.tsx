import type { PropsWithChildren } from "react";
import RootLayoutNavigation from "@/layouts/root-layout/components/RootLayoutNavigation";
import type { UserData } from "@/repos/user/user.types";

interface RootLayoutProps extends PropsWithChildren {
  profile: UserData | null;
}

export default function RootLayout({ children, profile }: RootLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <RootLayoutNavigation profile={profile} />
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t mt-auto">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          <p>
            © 2025 Booking App. Built with React, TanStack Router, and
            shadcn/ui.
          </p>
        </div>
      </footer>
    </div>
  );
}
