import { createClient } from '@supabase/supabase-js';

// Supabase URL과 Key를 코드에 직접 삽입 (보안 위험이 있음)
const supabaseUrl = 'https://gpciixncyvljjqorxqea.supabase.co';  // URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwY2lpeG5jeXZsampxb3J4cWVhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDIyMzkwNywiZXhwIjoyMDU5Nzk5OTA3fQ.Jj1JmWWjdERE2lqjyqNhdYPAh3rHqTXcYv1fW3mBp9g';  // Key

// Supabase 클라이언트 생성
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;