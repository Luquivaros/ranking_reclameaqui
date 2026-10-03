import { createClient } from '@supabase/supabase-js';

// A URL e a chave anon do Supabase são públicas por design (a segurança é feita via RLS).
// Usa as variáveis de ambiente quando existirem; caso contrário, usa o valor padrão abaixo.
const supabaseUrl =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) ||
  'https://iucogztdvjjhbwhtsmbu.supabase.co';
const supabaseAnonKey =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1Y29nenRkdmpqaGJ3aHRzbWJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA5Njc0MDEsImV4cCI6MjEwNjU0MzQwMX0.J7qAnKYy-XGPshItIoMB-JzL4u9HqFWdYOXEfLyZiFc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
