import { updateUser, type UpdateUserDto } from "@/repos/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllUsersQueryKey, getUserByIdQueryKey } from "./queryKeys";

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["updateUser"],
        mutationFn: ({ id, userData }: { id: string; userData: UpdateUserDto }) => 
            updateUser(id, userData),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: getAllUsersQueryKey });
            queryClient.invalidateQueries({ queryKey: getUserByIdQueryKey(variables.id) });
        },
    });
};
