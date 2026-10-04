import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import {
  initialOrderState,
  orderReducer,
  type OrderAction,
} from "../Hooks/UseReducerOrder";
import { fetchStandorte } from "@/Hooks/SupaBaseAPI";
import type { StandorteMitRaeumen } from "@/Types/types";

type OrderContextValue = {
  state: typeof initialOrderState;
  dispatch: Dispatch<OrderAction>;
};

const OrderContext = createContext<OrderContextValue | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(orderReducer, initialOrderState);
  useEffect(() => {
    async function loadStandorte() {
      const standorte: StandorteMitRaeumen = (await fetchStandorte()) ?? [];
      dispatch({ type: "GET_LOCATION", payload: standorte ?? [] });
    }
    loadStandorte();
  }, []);
  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
}

// unterhalb von OrderContext:
export function useOrderContext() {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error(
      "useOrderContext muss innerhalb von OrderProvider verwendet werden",
    );
  }

  return context;
}
