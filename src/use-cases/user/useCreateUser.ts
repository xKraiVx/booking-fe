import { createUser, type CreateUserDto } from "@/repos/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllUsersQueryKey } from "./queryKeys";

export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["createUser"],
        mutationFn: (userData: CreateUserDto) => createUser(userData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getAllUsersQueryKey });
        },
    });
};
