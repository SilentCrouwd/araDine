export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      abrechnungsdetails: {
        Row: {
          bewirtung_id: string | null
          id: string
          servicepauschale: number | null
          total_delivered: Json | null
        }
        Insert: {
          bewirtung_id?: string | null
          id?: string
          servicepauschale?: number | null
          total_delivered?: Json | null
        }
        Update: {
          bewirtung_id?: string | null
          id?: string
          servicepauschale?: number | null
          total_delivered?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "abrechnungsdetails_bewirtung_id_fkey"
            columns: ["bewirtung_id"]
            isOneToOne: false
            referencedRelation: "bewirtungen"
            referencedColumns: ["id"]
          },
        ]
      }
      bewirtungen: {
        Row: {
          abteilung: string | null
          anlass: string
          buchungskreis: string | null
          endzeit: string
          id: string
          kostenstelle: string
          kunden_email: string
          kunden_name: string
          mittagsverpflegung: boolean | null
          paket: Database["public"]["Enums"]["paket_enum"]
          personen_zahl: number
          raum_id: string | null
          standort_id: string | null
          startzeit: string
          status: Database["public"]["Enums"]["bewirtungs_status_enum"]
          teilnehmerliste: string | null
        }
        Insert: {
          abteilung?: string | null
          anlass: string
          buchungskreis?: string | null
          endzeit: string
          id?: string
          kostenstelle: string
          kunden_email: string
          kunden_name: string
          mittagsverpflegung?: boolean | null
          paket: Database["public"]["Enums"]["paket_enum"]
          personen_zahl: number
          raum_id?: string | null
          standort_id?: string | null
          startzeit: string
          status: Database["public"]["Enums"]["bewirtungs_status_enum"]
          teilnehmerliste?: string | null
        }
        Update: {
          abteilung?: string | null
          anlass?: string
          buchungskreis?: string | null
          endzeit?: string
          id?: string
          kostenstelle?: string
          kunden_email?: string
          kunden_name?: string
          mittagsverpflegung?: boolean | null
          paket?: Database["public"]["Enums"]["paket_enum"]
          personen_zahl?: number
          raum_id?: string | null
          standort_id?: string | null
          startzeit?: string
          status?: Database["public"]["Enums"]["bewirtungs_status_enum"]
          teilnehmerliste?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bewirtungen_raum_id_fkey"
            columns: ["raum_id"]
            isOneToOne: false
            referencedRelation: "raeume"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bewirtungen_standort_id_fkey"
            columns: ["standort_id"]
            isOneToOne: false
            referencedRelation: "standorte"
            referencedColumns: ["id"]
          },
        ]
      }
      raeume: {
        Row: {
          id: string
          name: string
          standort_id: string | null
        }
        Insert: {
          id?: string
          name: string
          standort_id?: string | null
        }
        Update: {
          id?: string
          name?: string
          standort_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "raeume_standort_id_fkey"
            columns: ["standort_id"]
            isOneToOne: false
            referencedRelation: "standorte"
            referencedColumns: ["id"]
          },
        ]
      }
      standorte: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      zusatzleistungen: {
        Row: {
          bewirtung_id: string | null
          erneuerung: boolean | null
          erneuerung_uhrzeit: string | null
          extras: Json | null
          id: string
        }
        Insert: {
          bewirtung_id?: string | null
          erneuerung?: boolean | null
          erneuerung_uhrzeit?: string | null
          extras?: Json | null
          id?: string
        }
        Update: {
          bewirtung_id?: string | null
          erneuerung?: boolean | null
          erneuerung_uhrzeit?: string | null
          extras?: Json | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "zusatzleistungen_bewirtung_id_fkey"
            columns: ["bewirtung_id"]
            isOneToOne: false
            referencedRelation: "bewirtungen"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      bewirtungs_status_enum:
        | "Ready"
        | "Running"
        | "inPast"
        | "Abrechnungsfaehig"
        | "Abgeschlossen"
      paket_enum: "Paket_1" | "Paket_2" | "Paket_3"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      bewirtungs_status_enum: [
        "Ready",
        "Running",
        "inPast",
        "Abrechnungsfaehig",
        "Abgeschlossen",
      ],
      paket_enum: ["Paket_1", "Paket_2", "Paket_3"],
    },
  },
} as const
