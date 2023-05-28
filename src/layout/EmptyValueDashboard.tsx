import Button from "@components/Button";
import Link from "next/link";
import React from "react";

type Props = {
  statusOptions: any;
  selectedFilter: any;
};

const EmptyValueDashboard = ({ statusOptions, selectedFilter }: Props) => {
  return (
    <div className="min-h-[50vh] flex flex-col justify-center items-center space-y-4">
      <p className="text-secondary-01 text-center text-lg max-w-sm">
        Você não
        {/* Não foram encontradas mentorias com o status{" "}
        {
          statusOptions.find((item) => item.value === selectedFilter)?.label || "selecionado"
        }
        . */}
      </p>
      <div className="max-w-sm">
        <Link href={"/profile"}>
          <Button size="small" className="w-full">
            Adicione sua agenda
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EmptyValueDashboard;
