
-- Fix: restrict waitlist insert to only allow inserting with valid email
DROP POLICY IF EXISTS "Anyone can join waitlist" ON public.waitlist;
CREATE POLICY "Anyone can join waitlist" ON public.waitlist FOR INSERT TO anon, authenticated WITH CHECK (email IS NOT NULL AND email <> '');
