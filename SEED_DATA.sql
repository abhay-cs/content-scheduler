-- Seed Data SQL for StreamFlow Content Scheduler
-- Run this in your Supabase SQL Editor to add sample data

-- Step 1: Insert Content Items
INSERT INTO content (title, description, type, media_url, status) VALUES
('Big Game Highlights', 'Top plays from this week''s games', 'ad', 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800', 'published'),
('Trivia Night Promo', 'Join us every Tuesday for trivia night', 'trivia', 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800', 'scheduled'),
('Summer Sale', '50% off all drinks this weekend', 'promo', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800', 'published'),
('Happy Hour Special', 'Half-price appetizers 5-7 PM daily', 'promo', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800', 'published'),
('Sports Bar Ad', 'Watch all games on our 20+ screens', 'ad', 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800', 'published'),
('Weekend Brunch', 'Saturday & Sunday 10 AM - 2 PM', 'promo', 'https://images.unsplash.com/photo-1528607929212-2636ec44253e?w=800', 'scheduled'),
('Monday Night Football', 'Watch the game with us every Monday', 'ad', 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800', 'published'),
('Loyalty Program', 'Join our rewards program today', 'promo', 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800', 'draft'),
('Game Day Trivia', 'Test your sports knowledge', 'trivia', 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800', 'published'),
('Live Music Friday', 'Live bands every Friday night', 'promo', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800', 'scheduled');

-- Step 2: Get the content IDs (you'll need to replace these with actual IDs from step 1)
-- Run this query first to get the IDs:
-- SELECT id, title FROM content ORDER BY created_at DESC LIMIT 10;

-- Step 3: Insert Schedules (replace content_id values with actual IDs from step 2)
-- Monday schedules
INSERT INTO schedule (content_id, day, start_time, end_time, color) VALUES
((SELECT id FROM content WHERE title = 'Monday Night Football' LIMIT 1), 'monday', '17:00:00', '18:00:00', 'primary'),
((SELECT id FROM content WHERE title = 'Summer Sale' LIMIT 1), 'monday', '18:30:00', '19:00:00', 'emerald'),
((SELECT id FROM content WHERE title = 'Happy Hour Special' LIMIT 1), 'monday', '19:30:00', '20:00:00', 'amber');

-- Tuesday schedules
INSERT INTO schedule (content_id, day, start_time, end_time, color) VALUES
((SELECT id FROM content WHERE title = 'Trivia Night Promo' LIMIT 1), 'tuesday', '17:30:00', '18:30:00', 'primary'),
((SELECT id FROM content WHERE title = 'Big Game Highlights' LIMIT 1), 'tuesday', '19:00:00', '20:00:00', 'emerald');

-- Wednesday schedules
INSERT INTO schedule (content_id, day, start_time, end_time, color) VALUES
((SELECT id FROM content WHERE title = 'Sports Bar Ad' LIMIT 1), 'wednesday', '17:00:00', '17:45:00', 'primary'),
((SELECT id FROM content WHERE title = 'Summer Sale' LIMIT 1), 'wednesday', '18:30:00', '19:30:00', 'emerald');

-- Thursday schedules
INSERT INTO schedule (content_id, day, start_time, end_time, color) VALUES
((SELECT id FROM content WHERE title = 'Happy Hour Special' LIMIT 1), 'thursday', '17:00:00', '18:00:00', 'amber'),
((SELECT id FROM content WHERE title = 'Game Day Trivia' LIMIT 1), 'thursday', '19:00:00', '20:00:00', 'primary');

-- Friday schedules
INSERT INTO schedule (content_id, day, start_time, end_time, color) VALUES
((SELECT id FROM content WHERE title = 'Live Music Friday' LIMIT 1), 'friday', '17:00:00', '18:30:00', 'emerald'),
((SELECT id FROM content WHERE title = 'Big Game Highlights' LIMIT 1), 'friday', '19:00:00', '20:30:00', 'primary');

-- Saturday schedules
INSERT INTO schedule (content_id, day, start_time, end_time, color) VALUES
((SELECT id FROM content WHERE title = 'Weekend Brunch' LIMIT 1), 'saturday', '17:30:00', '18:30:00', 'amber'),
((SELECT id FROM content WHERE title = 'Sports Bar Ad' LIMIT 1), 'saturday', '19:00:00', '20:00:00', 'primary');

-- Sunday schedules
INSERT INTO schedule (content_id, day, start_time, end_time, color) VALUES
((SELECT id FROM content WHERE title = 'Weekend Brunch' LIMIT 1), 'sunday', '17:00:00', '18:00:00', 'amber'),
((SELECT id FROM content WHERE title = 'Summer Sale' LIMIT 1), 'sunday', '18:30:00', '19:30:00', 'emerald'),
((SELECT id FROM content WHERE title = 'Big Game Highlights' LIMIT 1), 'sunday', '20:00:00', '21:00:00', 'primary');

-- Verify the data was inserted:
-- SELECT COUNT(*) FROM content; -- Should show 10+
-- SELECT COUNT(*) FROM schedule; -- Should show 18+
