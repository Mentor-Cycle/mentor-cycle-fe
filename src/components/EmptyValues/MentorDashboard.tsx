import Button from "@components/Button";
import Link from "next/link";
import React from "react";
import { EmptyValueProps } from "./validateEmptyComponent";
import { useUser } from "@hooks/useUser";

const MentorDashboard = ({ data }: EmptyValueProps) => {
  const { user } = useUser();

  return (
    <div className="flex flex-col">
      {!data.findEvents?.length && (
        <p className="text-gray-02 text-base">
          Você ainda não possui mentorias realizadas e marcadas
        </p>
      )}
    </div>
  );
};

export default MentorDashboard;
