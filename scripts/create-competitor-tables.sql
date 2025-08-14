-- Create competitors table
CREATE TABLE IF NOT EXISTS competitors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    platform TEXT NOT NULL CHECK (platform IN ('youtube', 'instagram', 'twitter', 'linkedin', 'tiktok')),
    username TEXT NOT NULL,
    display_name TEXT,
    followers INTEGER DEFAULT 0,
    engagement_rate DECIMAL(5,2) DEFAULT 0,
    is_verified BOOLEAN DEFAULT FALSE,
    profile_image_url TEXT,
    bio TEXT,
    website_url TEXT,
    location TEXT,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'analyzing', 'error', 'pending', 'inactive')),
    last_analyzed TIMESTAMPTZ,
    is_auto_discovered BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    UNIQUE(organization_id, platform, username)
);

-- Create competitor_videos table
CREATE TABLE IF NOT EXISTS competitor_videos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    competitor_id UUID REFERENCES competitors(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    thumbnail_url TEXT,
    video_url TEXT NOT NULL,
    platform_video_id TEXT NOT NULL,
    duration INTEGER, -- in seconds
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0,
    engagement_rate DECIMAL(5,2) DEFAULT 0,
    published_date TIMESTAMPTZ,
    scraped_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- AI Analysis fields
    hook_analysis TEXT,
    viral_framework TEXT,
    viral_score INTEGER CHECK (viral_score >= 0 AND viral_score <= 100),
    content_category TEXT,
    target_audience TEXT,
    key_topics TEXT[],
    sentiment_score DECIMAL(3,2), -- -1 to 1
    
    -- Performance metrics
    view_velocity INTEGER DEFAULT 0, -- views per hour in first 24h
    peak_engagement_time TIMESTAMPTZ,
    audience_retention_rate DECIMAL(5,2),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(competitor_id, platform_video_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_competitors_organization_id ON competitors(organization_id);
CREATE INDEX IF NOT EXISTS idx_competitors_platform ON competitors(platform);
CREATE INDEX IF NOT EXISTS idx_competitors_status ON competitors(status);
CREATE INDEX IF NOT EXISTS idx_competitors_last_analyzed ON competitors(last_analyzed);

CREATE INDEX IF NOT EXISTS idx_competitor_videos_competitor_id ON competitor_videos(competitor_id);
CREATE INDEX IF NOT EXISTS idx_competitor_videos_organization_id ON competitor_videos(organization_id);
CREATE INDEX IF NOT EXISTS idx_competitor_videos_published_date ON competitor_videos(published_date);
CREATE INDEX IF NOT EXISTS idx_competitor_videos_views ON competitor_videos(views);
CREATE INDEX IF NOT EXISTS idx_competitor_videos_engagement_rate ON competitor_videos(engagement_rate);
CREATE INDEX IF NOT EXISTS idx_competitor_videos_viral_score ON competitor_videos(viral_score);

-- Enable Row Level Security
ALTER TABLE competitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitor_videos ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for competitors
CREATE POLICY "Users can view competitors in their organization" ON competitors
    FOR SELECT USING (
        organization_id IN (
            SELECT organization_id FROM user_profiles WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create competitors in their organization" ON competitors
    FOR INSERT WITH CHECK (
        organization_id IN (
            SELECT organization_id FROM user_profiles WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update competitors in their organization" ON competitors
    FOR UPDATE USING (
        organization_id IN (
            SELECT organization_id FROM user_profiles WHERE user_id = auth.uid()
        )
    );

-- Create RLS policies for competitor_videos
CREATE POLICY "Users can view competitor videos in their organization" ON competitor_videos
    FOR SELECT USING (
        organization_id IN (
            SELECT organization_id FROM user_profiles WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create competitor videos in their organization" ON competitor_videos
    FOR INSERT WITH CHECK (
        organization_id IN (
            SELECT organization_id FROM user_profiles WHERE user_id = auth.uid()
        )
    );

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_competitors_updated_at BEFORE UPDATE ON competitors
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_competitor_videos_updated_at BEFORE UPDATE ON competitor_videos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
