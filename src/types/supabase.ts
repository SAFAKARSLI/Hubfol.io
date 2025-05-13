export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      BrandIcons: {
        Row: {
          brand_name: string
          slug: string
        }
        Insert: {
          brand_name: string
          slug: string
        }
        Update: {
          brand_name?: string
          slug?: string
        }
        Relationships: []
      }
      Employee: {
        Row: {
          createdAt: string
          email: string
          hourlyRate: number | null
          id: number
          location: string | null
          name: string
          phoneNumber: string | null
          status: string
          title: string
          updatedAt: string
          userId: string
          username: string
          uuid: string
        }
        Insert: {
          createdAt?: string
          email: string
          hourlyRate?: number | null
          id?: number
          location?: string | null
          name: string
          phoneNumber?: string | null
          status?: string
          title: string
          updatedAt: string
          userId: string
          username: string
          uuid: string
        }
        Update: {
          createdAt?: string
          email?: string
          hourlyRate?: number | null
          id?: number
          location?: string | null
          name?: string
          phoneNumber?: string | null
          status?: string
          title?: string
          updatedAt?: string
          userId?: string
          username?: string
          uuid?: string
        }
        Relationships: []
      }
      Employer: {
        Row: {
          createdAt: string
          email: string
          id: number
          location: string | null
          name: string
          phoneNumber: string | null
          updatedAt: string
          userId: string
          uuid: string
        }
        Insert: {
          createdAt?: string
          email: string
          id?: number
          location?: string | null
          name: string
          phoneNumber?: string | null
          updatedAt: string
          userId: string
          uuid: string
        }
        Update: {
          createdAt?: string
          email?: string
          id?: number
          location?: string | null
          name?: string
          phoneNumber?: string | null
          updatedAt?: string
          userId?: string
          uuid?: string
        }
        Relationships: []
      }
      EmployersOnEmployees: {
        Row: {
          employeeId: string
          employerId: string
        }
        Insert: {
          employeeId: string
          employerId: string
        }
        Update: {
          employeeId?: string
          employerId?: string
        }
        Relationships: [
          {
            foreignKeyName: "EmployersOnEmployees_employeeId_fkey"
            columns: ["employeeId"]
            isOneToOne: false
            referencedRelation: "Employee"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "EmployersOnEmployees_employerId_fkey"
            columns: ["employerId"]
            isOneToOne: false
            referencedRelation: "Employer"
            referencedColumns: ["uuid"]
          },
        ]
      }
      Project: {
        Row: {
          content: string | null
          createdAt: string
          iconLink: string | null
          id: number
          name: string
          ownerId: string
          slug: string
          tagline: string | null
          type: Database["public"]["Enums"]["PROJECT_CONTENT_TYPE"]
          updatedAt: string
          uuid: string
        }
        Insert: {
          content?: string | null
          createdAt?: string
          iconLink?: string | null
          id?: number
          name: string
          ownerId: string
          slug: string
          tagline?: string | null
          type?: Database["public"]["Enums"]["PROJECT_CONTENT_TYPE"]
          updatedAt: string
          uuid: string
        }
        Update: {
          content?: string | null
          createdAt?: string
          iconLink?: string | null
          id?: number
          name?: string
          ownerId?: string
          slug?: string
          tagline?: string | null
          type?: Database["public"]["Enums"]["PROJECT_CONTENT_TYPE"]
          updatedAt?: string
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "Project_ownerId_fkey"
            columns: ["ownerId"]
            isOneToOne: false
            referencedRelation: "Employee"
            referencedColumns: ["uuid"]
          },
        ]
      }
      Section: {
        Row: {
          content: Json
          contentType: Database["public"]["Enums"]["Content"]
          createdAt: string
          description: string | null
          id: number
          isActive: boolean | null
          projectId: string
          title: string
          updatedAt: string
          uuid: string
        }
        Insert: {
          content: Json
          contentType?: Database["public"]["Enums"]["Content"]
          createdAt?: string
          description?: string | null
          id?: number
          isActive?: boolean | null
          projectId: string
          title: string
          updatedAt: string
          uuid: string
        }
        Update: {
          content?: Json
          contentType?: Database["public"]["Enums"]["Content"]
          createdAt?: string
          description?: string | null
          id?: number
          isActive?: boolean | null
          projectId?: string
          title?: string
          updatedAt?: string
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "Section_projectId_fkey"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "Project"
            referencedColumns: ["uuid"]
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
      Content: "TEXT" | "CAROUSEL" | "VIDEO" | "BRAND_STACK"
      EMPLOYEE_STATUS: "NO_STATUS" | "OPEN_TO_WORK" | "BUSY" | "ON_VACATION"
      PROJECT_CONTENT_TYPE: "URL" | "FILE"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      Content: ["TEXT", "CAROUSEL", "VIDEO", "BRAND_STACK"],
      EMPLOYEE_STATUS: ["NO_STATUS", "OPEN_TO_WORK", "BUSY", "ON_VACATION"],
      PROJECT_CONTENT_TYPE: ["URL", "FILE"],
    },
  },
} as const
