-- Create social_channels table to store user's connected social media accounts
CREATE TABLE IF NOT EXISTS social_channels (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL,
  username VARCHAR(255) NOT NULL,
  display_name VARCHAR(255),
  access_token TEXT,
  refresh_token TEXT,
  api_key TEXT,
  api_secret TEXT,
  client_id TEXT,
  client_secret TEXT,
  followers INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT FALSE,
  is_connected BOOLEAN DEFAULT FALSE,
  last_sync TIMESTAMP WITH TIME ZONE,
  engagement_rate DECIMAL(5,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_social_channels_user_id ON social_channels(user_id);
CREATE INDEX IF NOT EXISTS idx_social_channels_organization_id ON social_channels(organization_id);
CREATE INDEX IF NOT EXISTS idx_social_channels_platform ON social_channels(platform);

-- Enable RLS
ALTER TABLE social_channels ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own social channels" ON social_channels
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own social channels" ON social_channels
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own social channels" ON social_channels
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own social channels" ON social_channels
  FOR DELETE USING (auth.uid() = user_id);
