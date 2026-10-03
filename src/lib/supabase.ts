import { createClient } from '@supabase/supabase-js';

// A URL e a chave anon do Supabase são públicas por design (a segurança é feita via RLS).
// Usa as variáveis de ambiente quando existirem; caso contrário, usa o valor padrão abaixo.
const supabaseUrl =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) ||
  'https://aiqiivrobdsgeafthcov.supabase.co';
const supabaseAnonKey =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpcWlpdnJvYmRzZ2VhZnRoY292Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA5NjgzMTIsImV4cCI6MjEwNjU0NDMxMn0.JV898RRXc3t8-IQARG_vY4OfLLzq2mXv6beVl0T2qzk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
