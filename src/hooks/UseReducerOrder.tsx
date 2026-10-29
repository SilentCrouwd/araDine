import type { LocationsWithRooms, NewParticipant } from "@/types/types";
export type OrderState = {
  location: LocationsWithRooms;
  participants: NewParticipant;
};

export const initialOrderState: OrderState = {
  location: [],
  participants: [],
};
export type OrderAction =
  | { type: "GET_LOCATION"; payload: LocationsWithRooms }
  | { type: "SET_PARTICIPANT"; payload: NewParticipant[number] }
  | { type: "DELETE_PARTICIPANT"; payload: number };
export function orderReducer(state: OrderState, action: OrderAction) {
  switch (action.type) {
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
