-- Cleanup Duplicate Data SQL
-- Run this in Supabase SQL Editor to remove duplicates

-- Step 1: Check for duplicates first (optional - just to see what you have)
-- SELECT title, COUNT(*) as count 
-- FROM content 
-- GROUP BY title 
-- HAVING COUNT(*) > 1;

-- Step 2: Delete duplicate content (keeps the oldest one)
-- This deletes content that has the same title
DELETE FROM content
WHERE id NOT IN (
  SELECT MIN(id)
  FROM content
  GROUP BY title
);

-- Step 3: Check for duplicate schedules (optional)
-- SELECT content_id, day, start_time, end_time, COUNT(*) as count
-- FROM schedule
-- GROUP BY content_id, day, start_time, end_time
-- HAVING COUNT(*) > 1;

-- Step 4: Delete duplicate schedules (keeps the oldest one)
-- This deletes schedules that have the same content_id, day, start_time, and end_time
DELETE FROM schedule
WHERE id NOT IN (
  SELECT MIN(id)
  FROM schedule
  GROUP BY content_id, day, start_time, end_time
);

-- Step 5: Verify cleanup
-- SELECT COUNT(*) FROM content; -- Should show unique count
-- SELECT COUNT(*) FROM schedule; -- Should show unique count
