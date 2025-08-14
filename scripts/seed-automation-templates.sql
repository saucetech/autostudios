-- Seed the database with productized automation templates

INSERT INTO automation_templates (name, display_name, description, category, icon, required_integrations, config_schema) VALUES
(
  'lead-capture-nurture',
  'Lead Capture & Nurture',
  'Automatically capture leads from forms and nurture them with personalized email sequences',
  'lead-generation',
  'Users',
  ARRAY['typeform', 'mailchimp'],
  '{
    "type": "object",
    "properties": {
      "nurture_sequence_days": {"type": "number", "default": 7},
      "personalization_fields": {"type": "array", "items": {"type": "string"}},
      "follow_up_triggers": {"type": "array", "items": {"type": "string"}}
    }
  }'
),
(
  'social-media-content-research',
  'Social Media Content Research',
  'Research trending topics and generate content ideas for social media platforms',
  'social-media',
  'Hash',
  ARRAY['twitter', 'linkedin'],
  '{
    "type": "object",
    "properties": {
      "platforms": {"type": "array", "items": {"type": "string"}},
      "content_types": {"type": "array", "items": {"type": "string"}},
      "posting_schedule": {"type": "string"}
    }
  }'
),
(
  'customer-support-triage',
  'Customer Support Triage',
  'Automatically categorize and route customer support tickets based on content and urgency',
  'customer-support',
  'MessageCircle',
  ARRAY['zendesk', 'slack'],
  '{
    "type": "object",
    "properties": {
      "priority_keywords": {"type": "array", "items": {"type": "string"}},
      "routing_rules": {"type": "object"},
      "escalation_threshold": {"type": "number", "default": 24}
    }
  }'
),
(
  'invoice-payment-tracking',
  'Invoice & Payment Tracking',
  'Track invoice status and automate payment reminders and follow-ups',
  'finance',
  'DollarSign',
  ARRAY['stripe', 'quickbooks'],
  '{
    "type": "object",
    "properties": {
      "reminder_schedule": {"type": "array", "items": {"type": "number"}},
      "late_fee_rules": {"type": "object"},
      "payment_methods": {"type": "array", "items": {"type": "string"}}
    }
  }'
),
(
  'meeting-scheduler-optimizer',
  'Meeting Scheduler & Optimizer',
  'Automatically schedule meetings and optimize calendar based on preferences and availability',
  'productivity',
  'Calendar',
  ARRAY['calendly', 'google-calendar'],
  '{
    "type": "object",
    "properties": {
      "meeting_types": {"type": "array", "items": {"type": "string"}},
      "buffer_time": {"type": "number", "default": 15},
      "working_hours": {"type": "object"}
    }
  }'
),
(
  'inventory-reorder-automation',
  'Inventory Reorder Automation',
  'Monitor inventory levels and automatically create purchase orders when stock is low',
  'operations',
  'Package',
  ARRAY['shopify', 'quickbooks'],
  '{
    "type": "object",
    "properties": {
      "reorder_threshold": {"type": "number", "default": 10},
      "preferred_suppliers": {"type": "array", "items": {"type": "string"}},
      "seasonal_adjustments": {"type": "boolean", "default": false}
    }
  }'
);
