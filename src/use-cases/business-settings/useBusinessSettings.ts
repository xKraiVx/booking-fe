import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBusinessSettings,
  deleteBusinessSettings,
  getAllBusinessSettings,
  getBusinessSettingsById,
  updateBusinessSettings,
  type CreateBusinessSettingsBody,
  type UpdateBusinessSettingsBody,
} from "@/repos/business.repo";

export const businessSettingsKeys = {
  all: ["business-settings"] as const,
  lists: () => [...businessSettingsKeys.all, "list"] as const,
  list: (filters: string) =>
    [...businessSettingsKeys.lists(), { filters }] as const,
  details: () => [...businessSettingsKeys.all, "detail"] as const,
  detail: (id: string) => [...businessSettingsKeys.details(), id] as const,
};

export const useGetAllBusinessSettings = () => {
  return useQuery({
    queryKey: businessSettingsKeys.lists(),
    queryFn: getAllBusinessSettings,
  });
};

export const useGetBusinessSettingsById = (id: string) => {
  return useQuery({
    queryKey: businessSettingsKeys.detail(id),
    queryFn: () => getBusinessSettingsById(id),
    enabled: !!id,
  });
};

export const useCreateBusinessSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBusinessSettingsBody) =>
      createBusinessSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: businessSettingsKeys.lists() });
    },
  });
};

export const useUpdateBusinessSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateBusinessSettingsBody;
    }) => updateBusinessSettings(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: businessSettingsKeys.all });
    },
  });
};

export const useDeleteBusinessSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBusinessSettings(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: businessSettingsKeys.lists() });
    },
  });
};
