import type { PropsWithChildren } from "react";
import type { User } from "@/lib/api";
import RootLayoutNavigation from "@/layouts/root-layout/components/RootLayoutNavigation";

interface RootLayoutProps extends PropsWithChildren {
  profile: User | null;
}

export default function RootLayout({ children, profile }: RootLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
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
