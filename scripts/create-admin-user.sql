-- Create admin user and profile
-- Run this once in your Supabase SQL editor for development

-- First, you'll need to create the user via Supabase Auth UI or API
-- Then run this to set up admin privileges

-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  role TEXT DEFAULT 'user',
  subscription_status TEXT DEFAULT 'inactive',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Insert admin profile (replace with your actual user ID after creating the user)
-- You'll get the user ID from Supabase Auth dashboard
INSERT INTO profiles (id, email, full_name, role, subscription_status)
VALUES (
  'YOUR_USER_ID_HERE', -- Replace with actual UUID from Supabase Auth
  'admin@autonomousstudios.com',
  'Admin User',
  'admin',
  'active'
) ON CONFLICT (id) DO UPDATE SET
  role = 'admin',
  subscription_status = 'active';
