import { useAuthStore } from "../store/authStore";
import { authApi } from "../lib/api";
import { Button } from "./ui/button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useQueryClient } from "@tanstack/react-query";

export function UserMenu() {
  const { user, clearAuth } = useAuthStore();
  const queryClient = useQueryClient();

  if (!user) return null;

  const handleLogout = async () => {
    try {
      await authApi.logout();
      clearAuth();
      queryClient.clear();
    } catch (error) {
      console.error("Logout failed:", error);
      clearAuth();
    }
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      admin: "bg-red-100 text-red-800",
      tenant: "bg-blue-100 text-blue-800",
      client: "bg-green-100 text-green-800",
    };
    return colors[role as keyof typeof colors] || colors.client;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.firstName}
              className="h-10 w-10 rounded-full"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-lg font-semibold">
                {user.firstName?.[0]?.toUpperCase() ||
                  user.email[0].toUpperCase()}
              </span>
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${getRoleBadge(
                user.role
              )}`}
            >
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
