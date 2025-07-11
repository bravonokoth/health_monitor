
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rqazbfxfugmiyxppqmoj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxYXpiZnhmdWdtaXl4cHBxbW9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxOTQ2NTUsImV4cCI6MjA2Nzc3MDY1NX0.cS0GeS5t6QISZhJvXyRseQxvwfM5JFVtsOUExSN881Q'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type HealthMetric = {
  id: string
  user_id: string
  heart_rate: number
  blood_oxygen: number
  activity_level: number
  temperature: number
  timestamp: string
  anomaly: boolean
}

export type Profile = {
  id: string
  name: string
  email: string
  phone?: string
  location?: string
  created_at: string
}
