import { limitStates, orderStates } from "SIGNUP_SRC/steps/hooks/useGeoStates/methods";
import { IUseGeoStates, States } from "SIGNUP_SRC/steps/hooks/useGeoStates/types";

export interface GeoStatesMethods {
  order: (sort: IUseGeoStates["order"]) => void;
  limit: (limitAmount: IUseGeoStates["limit"]) => void;
  getStates: () => States;
}

export function createGeoStates(initialStates: States): GeoStatesMethods {
  let newStates = initialStates;

  const limit: GeoStatesMethods["limit"] = (limitAmount) => {
    newStates = limitStates(newStates, limitAmount);
  };
  const order: GeoStatesMethods["order"] = (order) => {
    newStates = orderStates(newStates, order);
  };

  const getStates = () => newStates;

  return {
    limit,
    order: order,
    getStates,
  };
}
