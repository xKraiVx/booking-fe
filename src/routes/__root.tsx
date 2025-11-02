import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { getIsAuthenticated } from "@/common/utils/getIsAuthenticated";
import { getProfile } from "@/repos/auth.repo";
import RootLayout from "@/layouts/root-layout/components/RootLayout";

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
