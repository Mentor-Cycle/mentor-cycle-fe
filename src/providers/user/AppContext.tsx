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
  yearsOfExperience: number;
  description: string;
  country: string;
  state: string;
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
  yearsOfExperience: 0,
  description: "",
  country: "",
  state: "",
};

export const UserContext = React.createContext<any>({});
