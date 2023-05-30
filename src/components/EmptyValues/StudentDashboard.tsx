import Button from "@components/Button";
import Link from "next/link";
import { EmptyValueProps } from "./validateEmptyComponent";

const StudentDashboard = ({
  selectedFilter,
  statusOptions,
  data,
}: EmptyValueProps) => {
  return (
    <div className=" flex flex-col">
      {!data?.findEvents.length && (
        <h3 className="text-gray-02 text-base">
          Você ainda não possui mentorias realizadas e marcadas
        </h3>
      )}
    </div>
  );
};

export default StudentDashboard;
