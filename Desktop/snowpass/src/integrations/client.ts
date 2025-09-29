tsx 
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tlhqdwvpklvojqbvdjlo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsaHFkd3Zwa2x2b2pxYnZkamxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMDQ5OTIsImV4cCI6MjA3NDY4MDk5Mn0.LDJew4mwCVGM4__GWbZ0TPA1E0JLHxPA9mYS7LQ_heU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey);