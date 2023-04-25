import React from "react";

export type User = {
  firstName: string;
  lastName: string;
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
  lastName: "",
  photoUrl: "",
  email: "",
  isMentor: false,
  id: "",
  isLogged: false,
  skills: [],
  jobTitle: "",
};

export const UserContext = React.createContext<any>({});
