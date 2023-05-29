import Button from "@components/Button";
import Link from "next/link";
import React from "react";
import { EmptyValueProps } from "./validateEmptyComponent";
import { useUser } from "@hooks/useUser";

const MentorDashboard = ({ data }: EmptyValueProps) => {
  const { user } = useUser();

  return (
    <div className="min-h-[50vh] flex flex-col justify-center items-center space-y-4">
      {user.availability.length === 0 && (
        <>
          <p className="text-secondary-01 font-bold text-center text-lg max-w-sm">
            Você ainda não criou sua agenda
          </p>
          <div className="max-w-sm">
            <Link href={"/profile"}>
              <Button size="small" className="w-full">
                Criar Agenda
              </Button>
            </Link>
          </div>
        </>
      )}
      {!data.findEvents.length && user.availability.length > 0 && (
        <p className="text-secondary-01 font-bold text-center text-lg max-w-sm">
          Não há mentorias marcadas
        </p>
      )}
    </div>
  );
};

export default MentorDashboard;
