import { getUserById } from "@/repos/user";
import { useQuery } from "@tanstack/react-query";
import { getUserByIdQueryKey } from "./queryKeys";

export const useGetUserById = (id: string) => {
    return useQuery({
        queryKey: getUserByIdQueryKey(id),
        queryFn: () => getUserById(id),
        enabled: !!id,
    });
};
