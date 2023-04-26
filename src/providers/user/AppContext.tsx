import React from "react";

export type User = {
  jobTitle?: string;
  skills?: string[];
  firstName?: string;
  lastName?: string;
  photoUrl?: string;
  email?: string;
  isMentor?: boolean;
  id?: string;
  isLogged?: boolean;
  availability?: [];
};

export const initialValue: User = {
  firstName: "",
  lastName: "",
  photoUrl: "",
  email: "",
  isMentor: false,
  id: "",
  isLogged: false,
  skills: [],
  jobTitle: "",
  availability: [],
};

export const UserContext = React.createContext<any>({});
