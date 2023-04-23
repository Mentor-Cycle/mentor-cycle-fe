import React from "react";

export type User = {
  firstName: string;
  photoUrl: string;
  email: string;
  isMentor: boolean;
  id: string;
  isLogged: boolean;
  jobTitle: string;
  skills: string[];
};

export const initialValue: User = {
  firstName: "",
  photoUrl: "",
  email: "",
  isMentor: false,
  id: "",
  isLogged: false,
  skills: [],
  jobTitle: "",
};

export const UserContext = React.createContext<any>({});
