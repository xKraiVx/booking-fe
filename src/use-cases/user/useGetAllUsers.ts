import { getAllUsers } from "@/repos/user.repo";
import { useQuery } from "@tanstack/react-query";
import { getAllUsersQueryKey } from "./queryKeys";

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: getAllUsersQueryKey,
    queryFn: getAllUsers,
  });
};
