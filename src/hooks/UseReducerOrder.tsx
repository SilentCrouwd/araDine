import type {
  NewRefreshment,
  NewAdditionalService,
  LocationsWithRooms,
  NewParticipant,
} from "@/types/types";
export type OrderState = {
  orders: NewRefreshment[];
  extraServices: NewAdditionalService[];
  location: LocationsWithRooms;
  participants: NewParticipant;
};

export const initialOrderState: OrderState = {
  orders: [],
  extraServices: [],
  location: [],
  participants: [],
};
export type OrderAction =
  | { type: "ADD_ORDER"; payload: NewRefreshment }
  | { type: "ADD_EXTRA_SERVICE"; payload: NewAdditionalService }
  | { type: "GET_LOCATION"; payload: LocationsWithRooms }
  | { type: "SET_PARTICIPANT"; payload: NewParticipant[number] }
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
    case "SET_PARTICIPANT":
      return {
        ...state,
        participants: [...state.participants, action.payload],
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
