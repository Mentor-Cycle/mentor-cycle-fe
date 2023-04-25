import { useUser } from "@hooks/useUser";
import { PUBLIC_ROUTES } from "config/constants";
import { useRouter } from "next/router";
import { UserContext, initialValue } from "providers/user/AppContext";
import React, { useContext, useEffect } from "react";
import client from "services/apollo/apollo-client";
import { GET_ME } from "services/apollo/querys";

type AuthProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProps) => {
  const router = useRouter();
  const { user, setUser, updateUserData } = useUser();

  useEffect(() => {
    async function getUserMe() {
      if (router.pathname === "/signin" && user.isLogged) {
        router.replace("/mentors");
      }

      const isPublicRoute = PUBLIC_ROUTES.includes(router.pathname);

      if (user.isLogged || isPublicRoute) return;

      try {
        const { data } = await client.query({
          query: GET_ME,
        });
        if (data) {
          updateUserData({
            firstName: data.me.firstName,
            lastName: data.me.lastName,
            photoUrl: data.me.photoUrl,
            email: data.me.email,
            isMentor: data.me.isMentor,
            id: data.me.id,
            isLogged: true,
          });
        }
      } catch (e) {
        setUser(initialValue);
        localStorage.removeItem("user");
        router.replace("/signin");
      }
    }
    getUserMe();
  }, [user.isLogged, setUser, router, updateUserData]);

  return <>{children}</>;
};
