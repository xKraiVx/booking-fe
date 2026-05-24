import { getRouteApi } from "@tanstack/react-router";

export const getProfileQueryKey = ["profile"];

const route = getRouteApi("__root__");

export const useGetProfile = () => {
  const { profile } = route.useRouteContext();

  return {
    profile,
  };
};
