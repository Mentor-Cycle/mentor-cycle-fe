import { IStatusOption } from "pages/dashboard/dashboard";

type NoEventsType = {
  selectedFilter: string;
  statusOptions: IStatusOption[];
};

export const noEventsMessage = ({
  selectedFilter,
  statusOptions,
}: NoEventsType) => {
  return (
    <div className="min-h-[40vh] flex flex-col justify-center items-center max-w-xs m-auto gap-4">
      <p className="text-secondary-01 font-bold text-center text-lg max-w-sm">
        Não há eventos com o status{" "}
        {statusOptions.find((item) => item.value === selectedFilter)?.label ||
          "selecionado"}
        .
      </p>
    </div>
  );
};
