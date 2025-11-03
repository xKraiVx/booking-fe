import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createIntervention,
  deleteIntervention,
  getAllInterventions,
  getInterventionById,
  updateIntervention,
  type CreateInterventionBody,
  type UpdateInterventionBody,
} from "@/repos/business.repo";

export const interventionKeys = {
  all: ["interventions"] as const,
  lists: () => [...interventionKeys.all, "list"] as const,
  list: (filters: string) =>
    [...interventionKeys.lists(), { filters }] as const,
  details: () => [...interventionKeys.all, "detail"] as const,
  detail: (id: string) => [...interventionKeys.details(), id] as const,
};

export const useGetAllInterventions = () => {
  return useQuery({
    queryKey: interventionKeys.lists(),
    queryFn: getAllInterventions,
  });
};

export const useGetInterventionById = (id: string) => {
  return useQuery({
    queryKey: interventionKeys.detail(id),
    queryFn: () => getInterventionById(id),
    enabled: !!id,
  });
};

export const useCreateIntervention = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateInterventionBody) => createIntervention(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: interventionKeys.lists() });
    },
  });
};

export const useUpdateIntervention = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateInterventionBody }) =>
      updateIntervention(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: interventionKeys.all });
    },
  });
};

export const useDeleteIntervention = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteIntervention(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: interventionKeys.lists() });
    },
  });
};
