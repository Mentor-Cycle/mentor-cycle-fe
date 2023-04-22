import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { initialValue, UserContext } from "providers/user/AppContext";
import { GET_ME } from "services/apollo/querys";
import client from "services/apollo/apollo-client";
import { PUBLIC_ROUTES } from "config/constants";

type AuthProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProps) => {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    async function getUserMe() {
      const isPublicRoute = PUBLIC_ROUTES.includes(router.pathname);
      if (user.isLogged || isPublicRoute) return;

      try {
        const { data } = await client.query({
          query: GET_ME,
        });
        if (data) {
          setUser({
            firstName: data.me.firstName,
            photoUrl: data.me.photoUrl,
            email: data.me.email,
            isMentor: data.me.isMentor,
            id: data.me.id,
            isLogged: true,
          });
        }
      } catch (e) {
        setUser(initialValue);
        router.replace("/signin");
      }
    }
    getUserMe();
  }, [user.isLogged, setUser, router]);

  return <>{children}</>;
};
