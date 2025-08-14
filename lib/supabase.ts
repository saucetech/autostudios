import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      organizations: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          created_at?: string
          updated_at?: string
        }
      }
      content_items: {
        Row: {
          id: string
          user_id: string | null
          organization_id: string | null
          title: string
          description: string | null
          content: string | null
          type: "script" | "video" | "image" | "audio" | "post"
          status: "ideas" | "in-progress" | "review" | "published"
          priority: "low" | "medium" | "high" | "urgent"
          assignee_id: string | null
          due_date: string | null
          tags: string[] | null
          viral_hook: string | null
          viral_framework: string | null
          viral_angles: string[] | null
          viral_competitor: string | null
          viral_analysis_score: number | null
          views: number | null
          likes: number | null
          comments: number | null
          shares: number | null
          engagement_rate: number | null
          predicted_engagement: number | null
          optimal_post_time: string | null
          audience_match: number | null
          competitor_comparison: number | null
          publish_date: string | null
          platforms: string[] | null
          timezone: string | null
          is_archived: boolean | null
          is_flagged: boolean | null
          is_starred: boolean | null
          version: number | null
          created_at: string
          updated_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          organization_id?: string | null
          title: string
          description?: string | null
          content?: string | null
          type: "script" | "video" | "image" | "audio" | "post"
          status?: "ideas" | "in-progress" | "review" | "published"
          priority?: "low" | "medium" | "high" | "urgent"
          assignee_id?: string | null
          due_date?: string | null
          tags?: string[] | null
          viral_hook?: string | null
          viral_framework?: string | null
          viral_angles?: string[] | null
          viral_competitor?: string | null
          viral_analysis_score?: number | null
          views?: number | null
          likes?: number | null
          comments?: number | null
          shares?: number | null
          engagement_rate?: number | null
          predicted_engagement?: number | null
          optimal_post_time?: string | null
          audience_match?: number | null
          competitor_comparison?: number | null
          publish_date?: string | null
          platforms?: string[] | null
          timezone?: string | null
          is_archived?: boolean | null
          is_flagged?: boolean | null
          is_starred?: boolean | null
          version?: number | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          organization_id?: string | null
          title?: string
          description?: string | null
          content?: string | null
          type?: "script" | "video" | "image" | "audio" | "post"
          status?: "ideas" | "in-progress" | "review" | "published"
          priority?: "low" | "medium" | "high" | "urgent"
          assignee_id?: string | null
          due_date?: string | null
          tags?: string[] | null
          viral_hook?: string | null
          viral_framework?: string | null
          viral_angles?: string[] | null
          viral_competitor?: string | null
          viral_analysis_score?: number | null
          views?: number | null
          likes?: number | null
          comments?: number | null
          shares?: number | null
          engagement_rate?: number | null
          predicted_engagement?: number | null
          optimal_post_time?: string | null
          audience_match?: number | null
          competitor_comparison?: number | null
          publish_date?: string | null
          platforms?: string[] | null
          timezone?: string | null
          is_archived?: boolean | null
          is_flagged?: boolean | null
          is_starred?: boolean | null
          version?: number | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
      }
      content_attachments: {
        Row: {
          id: string
          content_item_id: string
          name: string
          file_type: string
          file_size: number
          file_url: string
          created_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          content_item_id: string
          name: string
          file_type: string
          file_size: number
          file_url: string
          created_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          content_item_id?: string
          name?: string
          file_type?: string
          file_size?: number
          file_url?: string
          created_at?: string
          created_by?: string | null
        }
      }
      content_comments: {
        Row: {
          id: string
          content_item_id: string
          author_id: string
          content: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          content_item_id: string
          author_id: string
          content: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          content_item_id?: string
          author_id?: string
          content?: string
          created_at?: string
          updated_at?: string
        }
      }
      content_approvals: {
        Row: {
          id: string
          content_item_id: string
          stage: string
          approver_id: string | null
          status: "pending" | "approved" | "rejected"
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          content_item_id: string
          stage: string
          approver_id?: string | null
          status?: "pending" | "approved" | "rejected"
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          content_item_id?: string
          stage?: string
          approver_id?: string | null
          status?: "pending" | "approved" | "rejected"
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      content_activity_log: {
        Row: {
          id: string
          content_item_id: string
          user_id: string
          action: string
          details: any | null
          created_at: string
        }
        Insert: {
          id?: string
          content_item_id: string
          user_id: string
          action: string
          details?: any | null
          created_at?: string
        }
        Update: {
          id?: string
          content_item_id?: string
          user_id?: string
          action?: string
          details?: any | null
          created_at?: string
        }
      }
      content_watchers: {
        Row: {
          content_item_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          content_item_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          content_item_id?: string
          user_id?: string
          created_at?: string
        }
      }
    }
  }
}
