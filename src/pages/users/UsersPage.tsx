import { useState } from "react";
import { useGetAllUsers } from "@/use-cases/user/useGetAllUsers";
import { useDeleteUser } from "@/use-cases/user/useDeleteUser";
import { useUpdateUserRole } from "@/use-cases/user/useUpdateUserRole";
import { CreateUserModal, UpdateUserModal, UserCard } from "@/features/users";
import { Button } from "@/common/components/ui/button/button";
import { UserPlus } from "lucide-react";
import Loader from "@/common/Loader";
import type { User } from "@/lib/api";
import type { UserRole } from "@/repos/user.repo";

export default function UsersPage() {
  const { data: users, isLoading } = useGetAllUsers();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const deleteUserMutation = useDeleteUser();
  const updateUserRoleMutation = useUpdateUserRole();

  const handleDeleteUser = (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      deleteUserMutation.mutate(userId);
    }
  };

  const handleUpdateRole = (userId: string, role: UserRole) => {
    updateUserRoleMutation.mutate({ userId, role });
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
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users?.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={(user) => {
              setSelectedUser(user);
              setIsEditDialogOpen(true);
            }}
            onDelete={handleDeleteUser}
            onUpdateRole={handleUpdateRole}
          />
        ))}
      </div>

      {/* Create User Dialog */}
      <CreateUserModal
        isOpen={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />

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
