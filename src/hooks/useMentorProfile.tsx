import { OperationVariables, QueryHookOptions } from "@apollo/client";
import { IMentor } from "@hooks/useMentorProfile.types";
import { useTypedQuery } from "@hooks/useTypedQuery";
import { DAYS_OF_THE_WEEK } from "config/constants";
import { format, parse } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { useEffect, useState } from "react";
import {
  TGET_MENTOR_BY_ID_queryResponseSchema as TData,
  TGET_MENTOR_BY_ID_variablesSchema as TVariables,
} from "services/apollo/queries/queries-properties";
import { queriesIndex as api } from "services/apollo/queries/queries.index";

type TGroupedAvailability = IMentor["availability"];

export const useMentorProfile = (
  id: string,
  options?: Omit<
    QueryHookOptions<TData, TVariables & OperationVariables>,
    "variables"
  >
) => {
  const [mentor, setMentor] = useState<IMentor | null>(null);

  const { data, loading, error, refetch, client } = useTypedQuery(
    api.GET_MENTOR_BY_ID,
    {
      ...options,
      variables: { id },
      skip: !id || options?.skip,
    }
  );

  useEffect(() => {
    if (data) {
      const { availability: apiAvailability, ...fetchedMentor } =
        data.findOneMentor;
      if (!apiAvailability) return;
      const groupedAvailability: TGroupedAvailability = [];
      apiAvailability.forEach(({ weekDay, startHour }) => {
        const weekDayName = DAYS_OF_THE_WEEK[weekDay];
        const existentAvailability = groupedAvailability.find(
          (item) => item.weekDay === weekDayName
        );

        const parsedStartHour = parse(startHour.toString(), "H:m", new Date());
        const formattedStartHour = format(parsedStartHour, "HH'h'mm", {
          locale: ptBR,
        });

        if (existentAvailability) {
          return existentAvailability.slots.push(formattedStartHour);
        }
        groupedAvailability.push({
          weekDay: weekDayName,
          slots: [formattedStartHour],
        });
      });
      setMentor({ ...fetchedMentor, availability: groupedAvailability });
    }
  }, [data]);

  return {
    mentor,
    // loading: options?.skip ? false : loading,
    loading,
    error,
    refetch,
    client,
  };
};
