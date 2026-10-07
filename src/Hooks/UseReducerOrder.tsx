import type {
  Bewirtungen,
  Zusatzleistungen,
  NeueBewirtung,
  NeueZusatzleistung,
  StandorteMitRaeumen,
} from "@/Types/types";
export type OrderState = {
  orders: NeueBewirtung[];
  extraServices: NeueZusatzleistung[];
  location: StandorteMitRaeumen;
  refreshments: Bewirtungen;
  extra: Zusatzleistungen;
};

export const initialOrderState: OrderState = {
  orders: [],
  extraServices: [],
  location: [],
  refreshments: [],
  extra: [],
};
export type OrderAction =
  | { type: "ADD_ORDER"; payload: NeueBewirtung }
  | { type: "ADD_EXTRA_SERVICE"; payload: NeueZusatzleistung }
  | { type: "GET_LOCATION"; payload: StandorteMitRaeumen }
  | { type: "GET_REFRESHMENT"; payload: Bewirtungen }
  | { type: "GET_EXTRA_SERVICE"; payload: Zusatzleistungen };
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
    case "GET_REFRESHMENT":
      return {
        ...state,
        refreshments: action.payload,
      };
    case "GET_EXTRA_SERVICE":
      return {
        ...state,
        extra: action.payload,
      };
    default:
      return state;
  }
}
