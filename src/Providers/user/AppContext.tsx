import React from "react";

export type User = {
  firstName: string;
  photoUrl: string;
  email: string;
  isMentor: boolean;
  id: string;
  isLogged: boolean;
};

export const initialValue: User = {
  firstName: "",
  photoUrl: "",
  email: "",
  isMentor: false,
  id: "",
  isLogged: false,
};

export const UserContext = React.createContext<any>({});
