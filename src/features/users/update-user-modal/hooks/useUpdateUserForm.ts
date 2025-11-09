import { useForm } from "@tanstack/react-form";
import { useUpdateUser } from "@/use-cases/user/useUpdateUser";
import type { UpdateUserBody, UserData, UserRole } from "@/repos/user/user.types";

interface UseUpdateUserFormProps {
  user: UserData;
  onSuccess?: () => void;
}

export const useUpdateUserForm = ({ user, onSuccess }: UseUpdateUserFormProps) => {
  const updateUserMutation = useUpdateUser();

  const form = useForm({
    defaultValues: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role as UserRole,
    },
    onSubmit: async ({ value }) => {
      const userData: UpdateUserBody = {
        email: value.email,
        firstName: value.firstName,
        lastName: value.lastName,
        role: value.role,
      };

      updateUserMutation.mutate(
        { id: user.id, userData },
        {
          onSuccess: () => {
            onSuccess?.();
          },
        }
      );
    },
  });

  return {
    form,
    isPending: updateUserMutation.isPending,
    isError: updateUserMutation.isError,
    error: updateUserMutation.error,
  };
};
