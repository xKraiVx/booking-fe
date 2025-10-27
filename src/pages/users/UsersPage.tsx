import { useState } from "react";
import { useGetAllUsers } from "@/use-cases/user/useGetAllUsers";
import { useCreateUser } from "@/use-cases/user/useCreateUser";
import { useDeleteUser } from "@/use-cases/user/useDeleteUser";
import { useUpdateUserRole } from "@/use-cases/user/useUpdateUserRole";
import { UpdateUserModal } from "@/features/users";
import { Button } from "@/common/components/ui/button/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/ui/dialog";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu";
import { UserPlus, MoreVertical, Pencil, Trash2 } from "lucide-react";
import Loader from "@/common/Loader";
import type { User } from "@/lib/api";
import type { CreateUserDto, UserRole } from "@/repos/user";

export default function UsersPage() {
  const { data: users, isLoading } = useGetAllUsers();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const createUserMutation = useCreateUser();
  const deleteUserMutation = useDeleteUser();
  const updateUserRoleMutation = useUpdateUserRole();

  const handleCreateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData: CreateUserDto = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      role: formData.get("role") as UserRole,
      authProvider: "local",
    };

    createUserMutation.mutate(userData, {
      onSuccess: () => {
        setIsCreateDialogOpen(false);
        (e.target as HTMLFormElement).reset();
      },
    });
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      deleteUserMutation.mutate(userId);
    }
  };

  const handleUpdateRole = (userId: string, role: UserRole) => {
    updateUserRoleMutation.mutate({ userId, role });
  };

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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">Users Management</h1>
            <p className="text-lg text-muted-foreground">
              Manage all users in the system
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleCreateUser}>
                <DialogHeader>
                  <DialogTitle>Create New User</DialogTitle>
                  <DialogDescription>
                    Add a new user to the system. Fill in all required fields.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="user@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="role">Role *</Label>
                    <Select name="role" defaultValue="client" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="tenant">Tenant</SelectItem>
                        <SelectItem value="client">Client</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={createUserMutation.isPending}>
                    {createUserMutation.isPending ? "Creating..." : "Create User"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users?.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-semibold">
                        {user.firstName[0]}
                        {user.lastName[0]}
                      </span>
                    </div>
                  )}
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
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedUser(user);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Change Role</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => handleUpdateRole(user.id, "admin")}
                      disabled={user.role === "admin"}
                    >
                      Set as Admin
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleUpdateRole(user.id, "tenant")}
                      disabled={user.role === "tenant"}
                    >
                      Set as Tenant
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleUpdateRole(user.id, "client")}
                      disabled={user.role === "client"}
                    >
                      Set as Client
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleDeleteUser(user.id)}
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
        ))}
      </div>

      {/* Edit User Dialog */}
      {selectedUser && (
        <UpdateUserModal
          user={selectedUser}
          isOpen={isEditDialogOpen}
          onOpenChange={(open) => {
            setIsEditDialogOpen(open);
            if (!open) {
              setSelectedUser(null);
            }
          }}
        />
      )}
    </div>
  );
}
