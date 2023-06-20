import React from "react";
import { EmptyValueProps } from "./validateEmptyComponent";

const MentorDashboard = ({ data }: EmptyValueProps) => {
  return (
    <div className="flex flex-col">
      {data && !data.findEvents?.length && (
        <p className="text-gray-02 text-base">
          Você ainda não possui mentorias realizadas e marcadas
        </p>
      )}
    </div>
  );
};

export default MentorDashboard;
