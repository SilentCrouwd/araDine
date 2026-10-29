export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      billing_details: {
        Row: {
          refreshment_id: string | null;
          id: string;
          billing_detail_name: string | null;
          billing_detail_value: string | null;
        };
        Insert: {
          refreshment_id?: string | null;
          id?: string;
          billing_detail_name?: string | null;
          billing_detail_value?: string | null;
        };
        Update: {
          refreshment_id?: string | null;
          id?: string;
          billing_detail_name?: string | null;
          billing_detail_value?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "billing_details_refreshment_id_fkey";
            columns: ["refreshment_id"];
            isOneToOne: false;
            referencedRelation: "refreshments";
            referencedColumns: ["id"];
          },
        ];
      };
      refreshments: {
        Row: {
          department: string | null;
          occasion: string | null;
          company_code: string;
          date: string;
          end_time: string;
          id: string;
          cost_center: string;
          customer_email: string;
          customer_name: string;
          is_customer_refreshment: boolean | null;
          lunch_provided: boolean | null;
          package: Database["public"]["Enums"]["paket_enum"];
          participant_count: number;
          room_id: string | null;
          location_id: string | null;
          start_time: string;
          status: string;
        };
        Insert: {
          department?: string | null;
          occasion?: string | null;
          company_code: string;
          date: string;
          end_time: string;
          id?: string;
          cost_center: string;
          customer_email: string;
          customer_name: string;
          is_customer_refreshment?: boolean | null;
          lunch_provided?: boolean | null;
          package: Database["public"]["Enums"]["paket_enum"];
          participant_count: number;
          room_id?: string | null;
          location_id?: string | null;
          start_time: string;
          status: string;
        };
        Update: {
          department?: string | null;
          occasion?: string | null;
          company_code?: string;
          date?: string;
          end_time?: string;
          id?: string;
          cost_center?: string;
          customer_email?: string;
          customer_name?: string;
          is_customer_refreshment?: boolean | null;
          lunch_provided?: boolean | null;
          package?: Database["public"]["Enums"]["paket_enum"];
          participant_count?: number;
          room_id?: string | null;
          location_id?: string | null;
          start_time?: string;
          status?: string;
        };
        Relationships: [
          {
            foreignKeyName: "refreshments_room_id_fkey";
            columns: ["room_id"];
            isOneToOne: false;
            referencedRelation: "rooms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "refreshments_location_id_fkey";
            columns: ["location_id"];
            isOneToOne: false;
            referencedRelation: "locations";
            referencedColumns: ["id"];
          },
        ];
      };
      rooms: {
        Row: {
          id: string;
          name: string;
          location_id: string | null;
          status: string;
        };
        Insert: {
          id?: string;
          name: string;
          location_id?: string | null;
          status?: string;
        };
        Update: {
          id?: string;
          name?: string;
          location_id?: string | null;
          status?: string;
        };
        Relationships: [
          {
            foreignKeyName: "rooms_location_id_fkey";
            columns: ["location_id"];
            isOneToOne: false;
            referencedRelation: "locations";
            referencedColumns: ["id"];
          },
        ];
      };
      locations: {
        Row: {
          id: string;
          name: string;
        };
        Insert: {
          id?: string;
          name: string;
        };
        Update: {
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
      participants: {
        Row: {
          department: string | null;
          refreshment_id: string | null;
          created_at: string;
          id: string;
          name: string | null;
        };
        Insert: {
          department?: string | null;
          refreshment_id?: string | null;
          created_at?: string;
          id?: string;
          name?: string | null;
        };
        Update: {
          department?: string | null;
          refreshment_id?: string | null;
          created_at?: string;
          id?: string;
          name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "participants_refreshment_id_fkey";
            columns: ["refreshment_id"];
            isOneToOne: false;
            referencedRelation: "refreshments";
            referencedColumns: ["id"];
          },
        ];
      };
      additional_services: {
        Row: {
          refreshment_id: string | null;
          service_name: string | null;
          service_value: string | null;
          id: string;
        };
        Insert: {
          refreshment_id?: string | null;
          service_name?: string | null;
          service_value?: string | null;
          id?: string;
        };
        Update: {
          refreshment_id?: string | null;
          service_name?: string | null;
          service_value?: string | null;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "additional_services_refreshment_id_fkey";
            columns: ["refreshment_id"];
            isOneToOne: false;
            referencedRelation: "refreshments";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      paket_enum: "Paket_1" | "Paket_2" | "Paket_3";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      paket_enum: ["Paket_1", "Paket_2", "Paket_3"],
    },
  },
} as const;
