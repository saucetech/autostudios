-- Create admin account for testing/development
-- Run this after setting up your user tables

-- First, you'll need to create the user in Supabase Auth manually via dashboard
-- Then run this script to give them admin privileges

-- Replace 'your-admin-email@example.com' with your actual admin email
INSERT INTO user_profiles (
  id,
  email,
  full_name,
  role,
  subscription_status,
  subscription_plan, -- Fixed column name from subscription_tier to subscription_plan
  created_at,
  updated_at
) VALUES (
  -- You'll need to get the actual user ID from Supabase Auth after creating the user
  -- This is just a placeholder - replace with actual UUID from auth.users
  '00000000-0000-0000-0000-000000000000',
  'admin@autonomousstudios.com',
  'Admin User',
  'admin',
  'active',
  'enterprise', -- This now goes into subscription_plan column
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  role = 'admin',
  subscription_status = 'active',
  subscription_plan = 'enterprise'; -- Fixed column name here too

-- Grant admin permissions
-- Add any additional admin-specific setup here
