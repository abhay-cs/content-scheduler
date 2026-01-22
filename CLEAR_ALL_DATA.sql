-- Clear All Data SQL
-- WARNING: This will delete ALL content and schedules!
-- Use this if you want to start fresh

-- Step 1: Delete all schedules first (due to foreign key constraint)
DELETE FROM schedule;

-- Step 2: Delete all content
DELETE FROM content;

-- Step 3: Verify everything is cleared
-- SELECT COUNT(*) FROM content; -- Should be 0
-- SELECT COUNT(*) FROM schedule; -- Should be 0

-- After running this, you can run SEED_DATA.sql to add fresh data
