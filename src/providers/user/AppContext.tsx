import React, { Dispatch, ReactNode, SetStateAction, useMemo, useState } from "react";
import { IUserSession } from "types/user.types";

export interface IUserContext {
  user: IUserSession;
  setUser: Dispatch<SetStateAction<IUserSession>>;
}

export const initialValue: IUserSession = {
  firstName: "",
  lastName: "",
  photoUrl: "",
  email: "",
  isMentor: false,
  id: "",
  isLogged: false,
  skills: [],
  biography: "",
  jobTitle: "",
  github: "",
  linkedin: "",
  availability: [],
  notifications: [],
  yearsOfExperience: 0,
  description: "",
  country: "",
  state: "",
};

export const UserContext = React.createContext<IUserContext>({} as IUserContext);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(initialValue);

  const userContextValue: IUserContext = useMemo(
    () => ({ user, setUser }),
    [user, setUser]
  );

  return <UserContext.Provider value={userContextValue}>{children}</UserContext.Provider>;
}
