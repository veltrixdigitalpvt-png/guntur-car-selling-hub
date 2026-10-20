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
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      enquiries: {
        Row: {
          consent: boolean
          created_at: string
          id: string
          listing_id: string | null
          message: string
          mobile: string
          name: string
          status: string
        }
        Insert: {
          consent: boolean
          created_at?: string
          id?: string
          listing_id?: string | null
          message: string
          mobile: string
          name: string
          status?: string
        }
        Update: {
          consent?: boolean
          created_at?: string
          id?: string
          listing_id?: string | null
          message?: string
          mobile?: string
          name?: string
          status?: string
        }
        Relationships: []
      }
      listings: {
        Row: {
          brand: string
          created_at: string
          description: string | null
          fuel: string
          id: string
          image_urls: string[]
          is_demo: boolean
          km_driven: number
          model: string
          price: number
          status: string
          transmission: string
          year: number
        }
        Insert: {
          brand: string
          created_at?: string
          description?: string | null
          fuel: string
          id?: string
          image_urls?: string[]
          is_demo?: boolean
          km_driven?: number
          model: string
          price: number
          status?: string
          transmission: string
          year: number
        }
        Update: {
          brand?: string
          created_at?: string
          description?: string | null
          fuel?: string
          id?: string
          image_urls?: string[]
          is_demo?: boolean
          km_driven?: number
          model?: string
          price?: number
          status?: string
          transmission?: string
          year?: number
        }
        Relationships: []
      }
      reviews: {
        Row: {
          created_at: string
          customer_name: string
          id: string
          published: boolean
          rating: number
          text: string
        }
        Insert: {
          created_at?: string
          customer_name: string
          id?: string
          published?: boolean
          rating: number
          text: string
        }
        Update: {
          created_at?: string
          customer_name?: string
          id?: string
          published?: boolean
          rating?: number
          text?: string
        }
        Relationships: []
      }
      sell_requests: {
        Row: {
          admin_notes: string | null
          brand: string
          condition: string
          consent: boolean
          created_at: string
          expected_price: number | null
          fuel: string
          full_name: string
          id: string
          km_driven: number
          location: string
          mobile: string
          model: string
          owners: number
          photo_paths: string[]
          registration_number: string | null
          status: string
          transmission: string
          year: number
        }
        Insert: {
          admin_notes?: string | null
          brand: string
          condition: string
          consent: boolean
          created_at?: string
          expected_price?: number | null
          fuel: string
          full_name: string
          id?: string
          km_driven: number
          location: string
          mobile: string
          model: string
          owners: number
          photo_paths?: string[]
          registration_number?: string | null
          status?: string
          transmission: string
          year: number
        }
        Update: {
          admin_notes?: string | null
          brand?: string
          condition?: string
          consent?: boolean
          created_at?: string
          expected_price?: number | null
          fuel?: string
          full_name?: string
          id?: string
          km_driven?: number
          location?: string
          mobile?: string
          model?: string
          owners?: number
          photo_paths?: string[]
          registration_number?: string | null
          status?: string
          transmission?: string
          year?: number
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          address: string
          business_hours: string
          facebook_url: string
          hero_text: string
          id: number
          instagram_url: string
          tagline: string
          updated_at: string
        }
        Insert: {
          address?: string
          business_hours?: string
          facebook_url?: string
          hero_text?: string
          id?: number
          instagram_url?: string
          tagline?: string
          updated_at?: string
        }
        Update: {
          address?: string
          business_hours?: string
          facebook_url?: string
          hero_text?: string
          id?: number
          instagram_url?: string
          tagline?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin"
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
  public: {
    Enums: {
      app_role: ["admin"],
    },
  },
} as const
