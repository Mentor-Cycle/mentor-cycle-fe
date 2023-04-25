import { User, UserContext } from "providers/user/AppContext";
import { useContext } from "react";
import useLocalStorage from "./useLocalStorage";

export const useUser = () => {
  const [localUser, setLocalUser] = useLocalStorage("user", null);
  const { user: contextUser, setUser } = useContext(UserContext);

  const updateUserData = (newUserData: User) => {
    setUser({ ...contextUser, ...newUserData });
    setLocalUser({ ...localUser, ...newUserData });
  };

  return { user: { ...contextUser, ...localUser }, setUser, updateUserData };
};
