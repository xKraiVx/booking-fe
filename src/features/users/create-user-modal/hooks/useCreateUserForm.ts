import { useForm } from "@tanstack/react-form";
import { useCreateUser } from "@/use-cases/user/useCreateUser";
import type { CreateUserDto, UserRole } from "@/repos/user.repo";

interface UseCreateUserFormProps {
  onSuccess?: () => void;
}

export const useCreateUserForm = ({ onSuccess }: UseCreateUserFormProps) => {
  const createUserMutation = useCreateUser();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      role: "client" as UserRole,
    },
    onSubmit: async ({ value }) => {
      const userData: CreateUserDto = {
        email: value.email,
        password: value.password,
        firstName: value.firstName,
        lastName: value.lastName,
        role: value.role,
        authProvider: "local",
      };

      createUserMutation.mutate(userData, {
        onSuccess: () => {
          onSuccess?.();
        },
      });
    },
  });

  return {
    form,
    isPending: createUserMutation.isPending,
    isError: createUserMutation.isError,
    error: createUserMutation.error,
  };
};
