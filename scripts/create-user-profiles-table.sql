-- Create user_profiles table to extend Supabase auth.users
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  company_name TEXT,
  role TEXT DEFAULT 'user',
  subscription_status TEXT DEFAULT 'trial',
  subscription_plan TEXT,
  monthly_spend INTEGER,
  contract_length INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a trigger to automatically create a profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create admin profile if admin user exists in auth.users
INSERT INTO user_profiles (id, email, full_name, role, subscription_status, subscription_plan, company_name)
SELECT 
  id, 
  email, 
  'Admin User',
  'admin',
  'active',
  'enterprise',
  'Autonomous Studios'
FROM auth.users 
WHERE email = 'admin@autonomousstudios.ai'
ON CONFLICT (id) DO UPDATE SET
  role = 'admin',
  subscription_status = 'active',
  subscription_plan = 'enterprise',
  company_name = 'Autonomous Studios';
