import type {
  Zusatzleistungen,
  NeueBewirtung,
  NeueZusatzleistung,
  StandorteMitRaeumen,
  Teilnehmer,
} from "@/Types/types";
export type OrderState = {
  orders: NeueBewirtung[];
  extraServices: NeueZusatzleistung[];
  location: StandorteMitRaeumen;
  participants: Teilnehmer;
};

export const initialOrderState: OrderState = {
  orders: [],
  extraServices: [],
  location: [],
  participants: [],
};
export type OrderAction =
  | { type: "ADD_ORDER"; payload: NeueBewirtung }
  | { type: "ADD_EXTRA_SERVICE"; payload: NeueZusatzleistung }
  | { type: "GET_LOCATION"; payload: StandorteMitRaeumen }
  | { type: "GET_PARTICIPANT"; payload: Teilnehmer }
  | { type: "DELETE_PARTICIPANT"; payload: number };
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
    case "GET_PARTICIPANT":
      return {
        ...state,
        participants: action.payload,
      };
    case "DELETE_PARTICIPANT":
      return {
        ...state,
        participants: state.participants.filter(
          (_, index) => index !== action.payload,
        ),
      };
    default:
      return state;
  }
}
