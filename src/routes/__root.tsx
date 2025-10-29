import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Button } from "@/common/components/ui/button/button";
import { Separator } from "@/common/components/ui/separator/separator";
import { getIsAuthenticated } from "@/common/utils/getIsAuthenticated";
import { getProfile } from "@/repos/auth";
import { UserMenu } from "@/features/user-menu/components/UserMenu";
import { LoginDialog } from "@/common/LoginDialog";

export const Route = createRootRoute({
  component: RootComponent,
  beforeLoad: async () => {
    const isAuthenticated = getIsAuthenticated();

    if (!isAuthenticated) {
      return {profile: null}
    }

    const profile = await getProfile();

    return { profile };
  },
});

function RootComponent() {
  const { profile } = Route.useRouteContext();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link to="/" className="text-2xl font-bold">
                SzybkoB
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex gap-2">
                <Link to="/">
                  {({ isActive }: { isActive: boolean }) => (
                    <Button variant={isActive ? "default" : "ghost"}>
                      Home
                    </Button>
                  )}
                </Link>
                <Link to="/about">
                  {({ isActive }: { isActive: boolean }) => (
                    <Button variant={isActive ? "default" : "ghost"}>
                      About
                    </Button>
                  )}
                </Link>
                {profile?.role === "admin" && (
                  <Link to="/users">
                    {({ isActive }: { isActive: boolean }) => (
                      <Button variant={isActive ? "default" : "ghost"}>
                        Users
                      </Button>
                    )}
                  </Link>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              {profile ? <UserMenu /> : <LoginDialog />}
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t mt-auto">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          <p>
            © 2025 Booking App. Built with React, TanStack Router, and
            shadcn/ui.
          </p>
        </div>
      </footer>

      <TanStackRouterDevtools />
    </div>
  );
}
