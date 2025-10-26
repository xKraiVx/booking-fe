import Cookies from "js-cookie";

export const getIsAuthenticated = (): boolean => {
  const token = Cookies.get("auth_token");
  return !!token;
}