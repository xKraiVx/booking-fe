import { useQuery } from "@tanstack/react-query";
import { getActions } from "@/repos/actions/actions.repo";

export const useGetActions = () => {
  return useQuery({
    queryKey: ["actions"],
    queryFn: getActions,
  });
};
