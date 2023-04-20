import {
  Dispatch,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from "react";

interface IAppContext {
  setUserLoggedData: Dispatch<SetStateAction<UserLoggedData | undefined>>;
  userLoggedData: UserLoggedData | undefined;
  isLogged: boolean;
  setIsLogged: Dispatch<SetStateAction<boolean>>;
}

interface AppContextProvider {
  children: React.ReactNode;
}

interface UserLoggedData {
  me: {
    firstName: string;
    photoUrl: string;
    email: string;
    isMentor: boolean;
    password: string;
  };
}

export const AppContext = createContext({
  setUserLoggedData: () => {},
  userLoggedData: {
    me: {
      firstName: "",
      photoUrl: "",
      email: "",
      isMentor: false,
      password: "",
    },
  },
  isLogged: false,
  setIsLogged: () => false,
} as IAppContext);

export const AppContextProvider = ({ children }: AppContextProvider) => {
  const [userLoggedData, setUserLoggedData] = useState<UserLoggedData>();
  const [isLogged, setIsLogged] = useState(false);

  const value = useMemo(
    () => ({ setUserLoggedData, userLoggedData, isLogged, setIsLogged }),
    [isLogged, userLoggedData]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
