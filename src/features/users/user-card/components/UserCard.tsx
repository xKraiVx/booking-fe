import { Button } from "@/common/components/ui/button/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu/dropdown-menu";
import { Avatar } from "@/common/components/ui/avatar/avatar";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import type { User } from "@/lib/api";
import type { UserRole } from "@/repos/user";

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
  onUpdateRole: (userId: string, role: UserRole) => void;
}

const getRoleBadgeClass = (role: string) => {
  switch (role) {
    case "admin":
      return "bg-red-100 text-red-800";
    case "tenant":
      return "bg-blue-100 text-blue-800";
    case "client":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const UserCard = ({
  user,
  onEdit,
  onDelete,
  onUpdateRole,
}: UserCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar
              src={user.avatar}
              alt={`${user.firstName} ${user.lastName}`}
              fallbackText={
                user.firstName?.[0]?.toUpperCase() ||
                user.email[0].toUpperCase()
              }
              size="lg"
            />
            <div>
              <CardTitle className="text-lg">
                {user.firstName} {user.lastName}
              </CardTitle>
              <CardDescription className="text-sm">
                {user.email}
              </CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onEdit(user)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Change Role</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => onUpdateRole(user.id, "admin")}
                disabled={user.role === "admin"}
              >
                Set as Admin
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onUpdateRole(user.id, "tenant")}
                disabled={user.role === "tenant"}
              >
                Set as Tenant
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onUpdateRole(user.id, "client")}
                disabled={user.role === "client"}
              >
                Set as Client
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(user.id)}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Role:</span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeClass(
                user.role
              )}`}
            >
              {user.role}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">User ID:</span>
            <span className="text-xs font-mono">{user.id.slice(0, 8)}...</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
