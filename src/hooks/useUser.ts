import { UserContext } from "providers/user/AppContext";
import { useContext } from "react";

export const useUser = () => {
  const { user, setUser } = useContext(UserContext);
  return { user, setUser };
};
