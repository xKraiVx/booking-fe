import { useLogout } from "@/use-cases/auth/useLogout";
import { Button } from "../../../common/components/ui/button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../common/components/ui/dropdown-menu/dropdown-menu";
import { Avatar } from "../../../common/components/ui/avatar/avatar";
import { useGetProfile } from "@/use-cases/auth/useGetProfile";
import { ChangePasswordDialog } from "../../../common/ChangePasswordDialog";

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
          <Avatar
            src={profile.avatar}
            alt={profile.firstName}
            fallbackText={
              profile.firstName?.[0]?.toUpperCase() ||
              profile.email[0].toUpperCase()
            }
            size="md"
          />
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
        <ChangePasswordDialog
          trigger={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Change Password
            </DropdownMenuItem>
          }
        />
        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
