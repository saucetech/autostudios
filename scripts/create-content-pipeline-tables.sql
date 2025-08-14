-- Create content_items table
CREATE TABLE IF NOT EXISTS content_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    content TEXT,
    type TEXT NOT NULL CHECK (type IN ('script', 'video', 'image', 'audio', 'post')),
    status TEXT NOT NULL DEFAULT 'ideas' CHECK (status IN ('ideas', 'in-progress', 'review', 'published')),
    priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    assignee_id UUID REFERENCES auth.users(id),
    due_date TIMESTAMPTZ,
    tags TEXT[],
    viral_hook TEXT,
    viral_framework TEXT,
    viral_angles TEXT[],
    viral_competitor TEXT,
    viral_analysis_score INTEGER CHECK (viral_analysis_score >= 0 AND viral_analysis_score <= 100),
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0,
    engagement_rate DECIMAL(5,2),
    predicted_engagement DECIMAL(3,1) CHECK (predicted_engagement >= 0 AND predicted_engagement <= 10),
    optimal_post_time TIMESTAMPTZ,
    audience_match INTEGER CHECK (audience_match >= 0 AND audience_match <= 100),
    competitor_comparison INTEGER CHECK (competitor_comparison >= 0 AND competitor_comparison <= 100),
    publish_date TIMESTAMPTZ,
    platforms TEXT[],
    timezone TEXT DEFAULT 'UTC',
    is_archived BOOLEAN DEFAULT FALSE,
    is_flagged BOOLEAN DEFAULT FALSE,
    is_starred BOOLEAN DEFAULT FALSE,
    version INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id)
);

-- Create content_attachments table
CREATE TABLE IF NOT EXISTS content_attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_item_id UUID REFERENCES content_items(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size INTEGER,
    uploaded_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create content_comments table
CREATE TABLE IF NOT EXISTS content_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_item_id UUID REFERENCES content_items(id) ON DELETE CASCADE,
    author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    parent_id UUID REFERENCES content_comments(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create content_approvals table
CREATE TABLE IF NOT EXISTS content_approvals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_item_id UUID REFERENCES content_items(id) ON DELETE CASCADE,
    approver_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')),
    feedback TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create content_watchers table
CREATE TABLE IF NOT EXISTS content_watchers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_item_id UUID REFERENCES content_items(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(content_item_id, user_id)
);

-- Create content_activity_log table
CREATE TABLE IF NOT EXISTS content_activity_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_item_id UUID REFERENCES content_items(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_content_items_user_id ON content_items(user_id);
CREATE INDEX IF NOT EXISTS idx_content_items_organization_id ON content_items(organization_id);
CREATE INDEX IF NOT EXISTS idx_content_items_status ON content_items(status);
CREATE INDEX IF NOT EXISTS idx_content_items_priority ON content_items(priority);
CREATE INDEX IF NOT EXISTS idx_content_items_type ON content_items(type);
CREATE INDEX IF NOT EXISTS idx_content_items_created_at ON content_items(created_at);
CREATE INDEX IF NOT EXISTS idx_content_items_updated_at ON content_items(updated_at);
CREATE INDEX IF NOT EXISTS idx_content_items_tags ON content_items USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_content_items_is_archived ON content_items(is_archived);
CREATE INDEX IF NOT EXISTS idx_content_items_is_starred ON content_items(is_starred);
CREATE INDEX IF NOT EXISTS idx_content_items_is_flagged ON content_items(is_flagged);

CREATE INDEX IF NOT EXISTS idx_content_attachments_content_item_id ON content_attachments(content_item_id);
CREATE INDEX IF NOT EXISTS idx_content_comments_content_item_id ON content_comments(content_item_id);
CREATE INDEX IF NOT EXISTS idx_content_comments_author_id ON content_comments(author_id);
CREATE INDEX IF NOT EXISTS idx_content_approvals_content_item_id ON content_approvals(content_item_id);
CREATE INDEX IF NOT EXISTS idx_content_watchers_content_item_id ON content_watchers(content_item_id);
CREATE INDEX IF NOT EXISTS idx_content_watchers_user_id ON content_watchers(user_id);
CREATE INDEX IF NOT EXISTS idx_content_activity_log_content_item_id ON content_activity_log(content_item_id);
CREATE INDEX IF NOT EXISTS idx_content_activity_log_user_id ON content_activity_log(user_id);

-- Enable Row Level Security
ALTER TABLE content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_watchers ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_activity_log ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for content_items
CREATE POLICY "Users can view content items in their organization" ON content_items
    FOR SELECT USING (
        organization_id IN (
            SELECT organization_id FROM user_profiles WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create content items in their organization" ON content_items
    FOR INSERT WITH CHECK (
        organization_id IN (
            SELECT organization_id FROM user_profiles WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update content items in their organization" ON content_items
    FOR UPDATE USING (
        organization_id IN (
            SELECT organization_id FROM user_profiles WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete content items they created" ON content_items
    FOR DELETE USING (
        user_id = auth.uid() OR 
        organization_id IN (
            SELECT organization_id FROM user_profiles WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

-- Create RLS policies for content_attachments
CREATE POLICY "Users can view attachments for content in their organization" ON content_attachments
    FOR SELECT USING (
        content_item_id IN (
            SELECT id FROM content_items WHERE organization_id IN (
                SELECT organization_id FROM user_profiles WHERE user_id = auth.uid()
            )
        )
    );

CREATE POLICY "Users can create attachments for content in their organization" ON content_attachments
    FOR INSERT WITH CHECK (
        content_item_id IN (
            SELECT id FROM content_items WHERE organization_id IN (
                SELECT organization_id FROM user_profiles WHERE user_id = auth.uid()
            )
        )
    );

-- Create RLS policies for content_comments
CREATE POLICY "Users can view comments for content in their organization" ON content_comments
    FOR SELECT USING (
        content_item_id IN (
            SELECT id FROM content_items WHERE organization_id IN (
                SELECT organization_id FROM user_profiles WHERE user_id = auth.uid()
            )
        )
    );

CREATE POLICY "Users can create comments for content in their organization" ON content_comments
    FOR INSERT WITH CHECK (
        content_item_id IN (
            SELECT id FROM content_items WHERE organization_id IN (
                SELECT organization_id FROM user_profiles WHERE user_id = auth.uid()
            )
        )
    );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_content_items_updated_at BEFORE UPDATE ON content_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_comments_updated_at BEFORE UPDATE ON content_comments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_approvals_updated_at BEFORE UPDATE ON content_approvals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
