import { deleteUser } from "@/repos/user.repo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllUsersQueryKey } from "./queryKeys";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getAllUsersQueryKey });
    },
  });
};
