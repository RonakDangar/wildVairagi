/* eslint-disable no-undef */
import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://elhviuubpvhszmairpjb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsaHZpdXVicHZoc3ptYWlycGpiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxODAyODQyNSwiZXhwIjoyMDMzNjA0NDI1fQ.b7oOco0o6ttMIGLnW99qpHuMP5vjG9XeC9qi4OyUNaA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
