import { useLogout } from "@/use-cases/auth/useLogout";
import { Button } from "./components/ui/button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { useGetProfile } from "@/use-cases/auth/useGetProfile";

export function UserMenu() {
  const { mutate: logout } = useLogout();
  const { profile } = useGetProfile();

  if (!profile) return null;

  const handleLogout = async () => {
   logout();
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
        <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt={profile.firstName}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-lg font-semibold">
                {profile.firstName?.[0]?.toUpperCase() ||
                  profile.email[0].toUpperCase()}
              </span>
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {profile.firstName} {profile.lastName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {profile.email}
            </p>
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${getRoleBadge(
                profile.role
              )}`}
            >
              {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
