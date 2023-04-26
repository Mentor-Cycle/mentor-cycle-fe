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
  const { user, setUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    async function getUserMe() {
      if (router.pathname === "/signin" && user.isLogged) {
        router.replace("/dashboard");
      }

      const isPublicRoute =
        PUBLIC_ROUTES.includes(router.pathname) ||
        router.query.public === "true";

      if (user.isLogged || isPublicRoute) return;

      try {
        const { data } = await client.query({
          query: GET_ME,
        });
        if (data) {
          setUser({
            firstName: data.me.firstName,
            lastName: data.me.lastName,
            photoUrl: data.me.photoUrl,
            email: data.me.email,
            jobTitle: data.me.jobTitle,
            skills: data.me.skills,
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
  }, [user.isLogged, setUser, router]);

  return <>{children}</>;
};
