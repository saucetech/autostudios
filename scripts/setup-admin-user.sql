-- Script to create admin user for development
-- Email: admin@autonomousstudios.ai
-- Password: admin123
-- 
-- INSTRUCTIONS:
-- 1. First create a user in Supabase Dashboard (Authentication > Users) with:
--    Email: admin@autonomousstudios.ai
--    Password: admin123
-- 2. Copy the user's UUID from the dashboard
-- 3. Replace 'YOUR_USER_ID_HERE' below with the actual UUID
-- 4. Run this script

UPDATE user_profiles 
SET 
  role = 'admin',
  subscription_status = 'active',
  subscription_plan = 'enterprise',
  full_name = 'Admin User',
  company_name = 'Autonomous Studios'
WHERE email = 'admin@autonomousstudios.ai';

-- If the user doesn't exist in user_profiles yet, insert them
-- Replace 'YOUR_USER_ID_HERE' with the actual UUID from Supabase Dashboard
INSERT INTO user_profiles (
  id, 
  email, 
  full_name, 
  company_name, 
  role, 
  subscription_status, 
  subscription_plan
) 
SELECT 
  'YOUR_USER_ID_HERE'::uuid,
  'admin@autonomousstudios.ai',
  'Admin User',
  'Autonomous Studios',
  'admin',
  'active',
  'enterprise'
WHERE NOT EXISTS (
  SELECT 1 FROM user_profiles WHERE email = 'admin@autonomousstudios.ai'
);
