-- First, create the admin user in Supabase auth
-- This needs to be done through the Supabase dashboard or using the service role key

-- Create user_profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  company_name TEXT,
  role TEXT DEFAULT 'user',
  subscription_status TEXT DEFAULT 'trial',
  subscription_plan TEXT,
  monthly_spend INTEGER DEFAULT 0,
  contract_length INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for users to see their own profile
CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

-- Create policy for users to update their own profile
CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update admin user profile (run this after creating the user in Supabase dashboard)
-- Replace 'USER_ID_HERE' with the actual UUID from the Supabase dashboard
UPDATE public.user_profiles 
SET 
  role = 'admin',
  subscription_status = 'active',
  subscription_plan = 'enterprise',
  full_name = 'Admin User',
  company_name = 'Autonomous Studios'
WHERE email = 'admin@autonomousstudios.ai';

-- If the profile doesn't exist, insert it manually
INSERT INTO public.user_profiles (id, email, full_name, company_name, role, subscription_status, subscription_plan)
SELECT 
  id, 
  email, 
  'Admin User', 
  'Autonomous Studios', 
  'admin', 
  'active', 
  'enterprise'
FROM auth.users 
WHERE email = 'admin@autonomousstudios.ai'
ON CONFLICT (id) DO UPDATE SET
  role = 'admin',
  subscription_status = 'active',
  subscription_plan = 'enterprise',
  full_name = 'Admin User',
  company_name = 'Autonomous Studios';
