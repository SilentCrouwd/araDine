import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import {
  initialLocationState,
  locationReducer,
  type LocationAction,
} from "../hooks/UseReducerLocation";
import { fetchLocations } from "@/hooks/SupaBaseAPI";
import type { LocationsWithRooms } from "@/types/types";
import { useAuthContext } from "./AuthContetxt";

type LocationContextValue = {
  state: typeof initialLocationState;
  dispatch: Dispatch<LocationAction>;
};

const LocationContext = createContext<LocationContextValue | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(locationReducer, initialLocationState);
  const { user } = useAuthContext();
  useEffect(() => {
    // Standort- und Raumdaten werden zentral geladen, damit alle Views sie nutzen können.
    async function loadStandorte() {
      const locations: LocationsWithRooms = (await fetchLocations()) ?? [];
      dispatch({ type: "GET_LOCATION", payload: locations ?? [] });
    }

    loadStandorte().catch((error) => {
      console.error("Fehler beim Laden der Standorte", error);
    });
  }, [user]);
  return (
    <LocationContext.Provider value={{ state, dispatch }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocationContext() {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error(
      "useLocationContext muss innerhalb von LocationProvider verwendet werden",
    );
  }

  return context;
}
