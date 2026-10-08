import type {
  Zusatzleistungen,
  NeueBewirtung,
  NeueZusatzleistung,
  StandorteMitRaeumen,
} from "@/Types/types";
export type OrderState = {
  orders: NeueBewirtung[];
  extraServices: NeueZusatzleistung[];
  location: StandorteMitRaeumen;
};

export const initialOrderState: OrderState = {
  orders: [],
  extraServices: [],
  location: [],
};
export type OrderAction =
  | { type: "ADD_ORDER"; payload: NeueBewirtung }
  | { type: "ADD_EXTRA_SERVICE"; payload: NeueZusatzleistung }
  | { type: "GET_LOCATION"; payload: StandorteMitRaeumen };
export function orderReducer(state: OrderState, action: OrderAction) {
  switch (action.type) {
    case "ADD_ORDER":
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };

    case "ADD_EXTRA_SERVICE":
      return {
        ...state,
        extraServices: [...state.extraServices, action.payload],
      };
    case "GET_LOCATION":
      return {
        ...state,
        location: action.payload,
      };

    default:
      return state;
  }
}
