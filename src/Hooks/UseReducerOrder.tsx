import type { Bewirtungen, NeueBewirtung } from "@/Types/types";

export const initialOrderState: NeueBewirtung[] = [];
export type OrderAction = { type: "ADD_ORDER"; payload: NeueBewirtung }; // Replace `any` with the actual payload type

export function orderReducer(state: NeueBewirtung[], action: OrderAction) {
  switch (action.type) {
    case "ADD_ORDER": {
      const newState = [...state, action.payload];
      console.log(newState);

      return newState;
    }

    default:
      return state;
  }
}
