import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createMaster,
  deleteMaster,
  getAllMasters,
  getMasterById,
  updateMaster,
  type CreateMasterBody,
  type UpdateMasterBody,
} from "@/repos/business.repo";

export const masterKeys = {
  all: ["masters"] as const,
  lists: () => [...masterKeys.all, "list"] as const,
  list: (filters: string) => [...masterKeys.lists(), { filters }] as const,
  details: () => [...masterKeys.all, "detail"] as const,
  detail: (id: string) => [...masterKeys.details(), id] as const,
};

export const useGetAllMasters = () => {
  return useQuery({
    queryKey: masterKeys.lists(),
    queryFn: getAllMasters,
  });
};

export const useGetMasterById = (id: string) => {
  return useQuery({
    queryKey: masterKeys.detail(id),
    queryFn: () => getMasterById(id),
    enabled: !!id,
  });
};

export const useCreateMaster = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMasterBody) => createMaster(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: masterKeys.lists() });
    },
  });
};

export const useUpdateMaster = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMasterBody }) =>
      updateMaster(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: masterKeys.all });
    },
  });
};

export const useDeleteMaster = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteMaster(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: masterKeys.lists() });
    },
  });
};
