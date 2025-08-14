-- Create admin organization and update existing admin user

-- Create admin organization
INSERT INTO organizations (id, name, slug, plan, status, settings)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Autonomous Studios',
  'autonomous-studios',
  'enterprise',
  'active',
  '{"is_admin": true, "unlimited_automations": true}'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  plan = EXCLUDED.plan,
  status = EXCLUDED.status,
  settings = EXCLUDED.settings;

-- Update admin user to be part of admin organization
UPDATE user_profiles 
SET 
  organization_id = '00000000-0000-0000-0000-000000000001',
  role = 'admin',
  permissions = '{"admin": true, "integrations": true, "automations": true, "billing": true}'
WHERE email = 'admin@autonomousstudios.ai';
