import { User, UserContext } from "providers/user/AppContext";
import { useContext } from "react";
import useLocalStorage from "./useLocalStorage";

export const useUser = () => {
  const [localUser, setLocalUser] = useLocalStorage("user", null);
  const { user, setUser } = useContext(UserContext);

  const updateUserData = (newUserData: User) => {
    setUser({ ...user, ...newUserData });
    setLocalUser({ ...user, ...newUserData });
  };

  return { user, setUser, updateUserData };
};
