import { updateUserRole, type UserRole } from "@/repos/user.repo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllUsersQueryKey, getUserByIdQueryKey } from "./queryKeys";

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateUserRole"],
    mutationFn: ({ userId, role }: { userId: string; role: UserRole }) =>
      updateUserRole(userId, role),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: getAllUsersQueryKey });
      queryClient.invalidateQueries({
        queryKey: getUserByIdQueryKey(variables.userId),
      });
    },
  });
};
