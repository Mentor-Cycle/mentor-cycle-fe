import Button from "@components/Button";
import Link from "next/link";
import { EmptyValueProps } from "./validateEmptyComponent";

const StudentDashboard = ({
  selectedFilter,
  statusOptions,
  data,
}: EmptyValueProps) => {
  return (
    <div className="min-h-[40vh] flex flex-col justify-center items-center max-w-xs m-auto gap-4">
      {!data?.findEvents.length && (
        <h3 className="text-secondary-01 font-bold text-center text-lg max-w-sm">
          Não há mentorias marcadas
        </h3>
      )}
      {data?.findEvents?.length === 0 && (
        <Link href={"/mentors"}>
          <Button size="small">Encontrar uma mentoria</Button>
        </Link>
      )}
    </div>
  );
};

export default StudentDashboard;
