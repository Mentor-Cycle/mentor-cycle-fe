import React from "react";

export type User = {
  firstName: string;
  lastName: string;
  photoUrl: string;
  email: string;
  isMentor: boolean;
  id: string;
  isLogged: boolean;
};

export const initialValue: User = {
  firstName: "",
  lastName: "",
  photoUrl: "",
  email: "",
  isMentor: false,
  id: "",
  isLogged: false,
};

export const UserContext = React.createContext<any>({});
