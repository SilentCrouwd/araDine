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
} from "../hooks/UseReducerOrder";
import { fetchLocations } from "@/hooks/SupaBaseAPI";
import type { LocationsWithRooms } from "@/types/types";

type OrderContextValue = {
  state: typeof initialOrderState;
  dispatch: Dispatch<OrderAction>;
};

const OrderContext = createContext<OrderContextValue | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(orderReducer, initialOrderState);
  useEffect(() => {
    // Standort- und Raumdaten werden zentral geladen, damit alle Views sie nutzen können.
    async function loadStandorte() {
      const locations: LocationsWithRooms = (await fetchLocations()) ?? [];
      dispatch({ type: "GET_LOCATION", payload: locations ?? [] });
    }

    loadStandorte().catch((error) => {
      console.error("Fehler beim Laden der Standorte", error);
    });
  }, []);
  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrderContext() {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error(
      "useOrderContext muss innerhalb von OrderProvider verwendet werden",
    );
  }

  return context;
}
