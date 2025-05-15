import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gpciixncyvljjqorxqea.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwY2lpeG5jeXZsampxb3J4cWVhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDIyMzkwNywiZXhwIjoyMDU5Nzk5OTA3fQ.Jj1JmWWjdERE2lqjyqNhdYPAh3rHqTXcYv1fW3mBp9g';

export const supabase = createClient(supabaseUrl, supabaseKey);