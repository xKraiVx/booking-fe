import { Button } from "@/common/components/ui/button/button";
import { Separator } from "@/common/components/ui/separator/separator";
import { UserMenu } from "@/features/user-menu/components/UserMenu";
import { LoginDialog } from "@/common/LoginDialog";
import { Link } from "@tanstack/react-router";
import type { GetProfileResponse } from "@/repos/auth.repo";

interface RootLayoutNavigationProps {
  profile: GetProfileResponse | null;
}

export default function RootLayoutNavigation({
  profile,
}: RootLayoutNavigationProps) {
  return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link to="/" className="text-2xl font-bold">
          SzybkoB
        </Link>
        <Separator orientation="vertical" className="h-6" />
        <div className="flex gap-2">
          <Link to="/">
            {({ isActive }: { isActive: boolean }) => (
              <Button variant={isActive ? "default" : "ghost"}>Home</Button>
            )}
          </Link>
          {profile?.role === "admin" && (
            <>
              <Link to="/users">
                {({ isActive }: { isActive: boolean }) => (
                  <Button variant={isActive ? "default" : "ghost"}>
                    Users
                  </Button>
                )}
              </Link>
              <Link to="/actions">
                {({ isActive }: { isActive: boolean }) => (
                  <Button variant={isActive ? "default" : "ghost"}>
                    Actions
                  </Button>
                )}
              </Link>
            </>
          )}
          {profile?.role === "tenant" && (
            <Link to="/business-settings">
              {({ isActive }: { isActive: boolean }) => (
                <Button variant={isActive ? "default" : "ghost"}>
                  Business Settings
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
  );
}
