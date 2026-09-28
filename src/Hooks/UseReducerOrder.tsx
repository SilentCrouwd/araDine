import type { NeueBewirtung, NeueZusatzleistung } from "@/Types/types";
export type OrderState = {
  orders: NeueBewirtung[];
  extraServices: NeueZusatzleistung[];
};

export const initialOrderState: OrderState = {
  orders: [],
  extraServices: [],
};
export type OrderAction =
  | { type: "ADD_ORDER"; payload: NeueBewirtung }
  | { type: "ADD_EXTRA_SERVICE"; payload: NeueZusatzleistung }; // Replace `any` with the actual payload type

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
    default:
      return state;
  }
}
