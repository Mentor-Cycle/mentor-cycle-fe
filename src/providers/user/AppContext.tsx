import React, { Dispatch, SetStateAction } from "react";
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

export const UserContext = React.createContext<IUserContext>(
  {} as IUserContext
);
