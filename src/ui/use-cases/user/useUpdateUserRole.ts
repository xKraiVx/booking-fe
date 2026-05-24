import { updateUserRole } from "@/ui/repos/user/user.repo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllUsersQueryKey, getUserByIdQueryKey } from "./queryKeys";
import type { UserRole } from "@/ui/repos/user/user.types";

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
