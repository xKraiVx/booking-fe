import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { getIsAuthenticated } from "@/ui/common/utils/getIsAuthenticated";
import { getProfile } from "@/ui/repos/auth/auth.repo";
import RootLayout from "@/ui/layouts/root-layout/components/RootLayout";

export const Route = createRootRoute({
  component: RootComponent,
  beforeLoad: async () => {
    const isAuthenticated = getIsAuthenticated();

    if (!isAuthenticated) {
      return { profile: null };
    }

    const profile = await getProfile();

    return { profile };
  },
});

function RootComponent() {
  const { profile } = Route.useRouteContext();

  return (
    <>
      <RootLayout profile={profile}>
        <Outlet />
      </RootLayout>
      <TanStackRouterDevtools />
    </>
  );
}
