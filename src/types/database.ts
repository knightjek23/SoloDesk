/**
 * Hand-written Supabase types, mirroring supabase/migrations/001_initial.sql.
 *
 * TODO: replace with generated types once you link the project:
 *   npx supabase gen types typescript --project-id YOUR_PROJECT_REF > src/types/database.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          business_name: string | null
          phone: string | null
          address: string | null
          avatar_url: string | null
          subscription_tier: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name: string
          business_name?: string | null
          phone?: string | null
          address?: string | null
          avatar_url?: string | null
          subscription_tier?: string
        }
        Update: Partial<Database['public']['Tables']['users']['Insert']>
        Relationships: []
      }
      clients: {
        Row: {
          id: string
          user_id: string
          name: string
          email: string | null
          phone: string | null
          company: string | null
          address: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          name: string
          email?: string | null
          phone?: string | null
          company?: string | null
          address?: string | null
          notes?: string | null
        }
        Update: Partial<Database['public']['Tables']['clients']['Insert']>
        Relationships: []
      }
      projects: {
        Row: {
          id: string
          user_id: string
          client_id: string
          title: string
          description: string | null
          status: string
          start_date: string | null
          end_date: string | null
          budget: number | null
          progress: number
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          client_id: string
          title: string
          description?: string | null
          status?: string
          start_date?: string | null
          end_date?: string | null
          budget?: number | null
          progress?: number
        }
        Update: Partial<Database['public']['Tables']['projects']['Insert']>
        Relationships: []
      }
      invoices: {
        Row: {
          id: string
          user_id: string
          client_id: string
          project_id: string | null
          invoice_number: string
          status: string
          subtotal: number
          tax: number
          total: number
          due_date: string | null
          paid_at: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          client_id: string
          project_id?: string | null
          invoice_number: string
          status?: string
          subtotal: number
          tax?: number
          total: number
          due_date?: string | null
          notes?: string | null
        }
        Update: Partial<Database['public']['Tables']['invoices']['Insert']>
        Relationships: []
      }
      proposals: {
        Row: {
          id: string
          user_id: string
          client_id: string
          title: string
          status: string
          total: number | null
          intro: string | null
          terms: string | null
          sent_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          client_id: string
          title: string
          status?: string
          total?: number | null
          intro?: string | null
          terms?: string | null
        }
        Update: Partial<Database['public']['Tables']['proposals']['Insert']>
        Relationships: []
      }
      contracts: {
        Row: {
          id: string
          user_id: string
          client_id: string
          project_id: string | null
          title: string
          status: string
          content: string | null
          signed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          client_id: string
          project_id?: string | null
          title: string
          status?: string
          content?: string | null
        }
        Update: Partial<Database['public']['Tables']['contracts']['Insert']>
        Relationships: []
      }
      time_entries: {
        Row: {
          id: string
          user_id: string
          project_id: string
          description: string | null
          hours: number | null
          hourly_rate: number | null
          entry_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          project_id: string
          description?: string | null
          hours?: number | null
          hourly_rate?: number | null
          entry_date?: string | null
        }
        Update: Partial<Database['public']['Tables']['time_entries']['Insert']>
        Relationships: []
      }
      messages: {
        Row: {
          id: string
          user_id: string
          client_id: string
          sender: string | null
          body: string
          read_at: string | null
          created_at: string
        }
        Insert: {
          user_id: string
          client_id: string
          sender?: string | null
          body: string
        }
        Update: Partial<Database['public']['Tables']['messages']['Insert']>
        Relationships: []
      }
    }
    Views: Record<never, never>
    Functions: Record<never, never>
    Enums: Record<never, never>
    CompositeTypes: Record<never, never>
  }
}
