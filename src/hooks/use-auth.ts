import { useAppSelector } from "./redux-hooks.ts";
export function useAuth() {
  const { email, token, id, name } = useAppSelector((state) => state.user);
  return {
    isAuth: !!email,
    email,
    token,
    id,
    name,
  };
}
