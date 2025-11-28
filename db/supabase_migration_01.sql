--  Supabase (PostgreSQL) with RLS

-- credits table to track user credits
CREATE TABLE IF NOT EXISTS public.credits (
  profile_id      serial NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount          INT NOT NULL DEFAULT 0,
  primary key (profile_id)
);
ALTER TABLE public.credits ENABLE ROW LEVEL SECURITY;

-- Users can only view their own credits
CREATE POLICY "Users can view own credits"
  ON public.credits
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.id = credits.profile_id
    )
  );

-- Function to initialize credits for new profiles
CREATE OR REPLACE FUNCTION public.handle_new_profile()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER set search_path = ''
AS $$
BEGIN
  INSERT INTO public.credits (profile_id, amount)
  VALUES (NEW.id, 10);
  
  RETURN NEW;
END;
$$;

-- Trigger to create credits when a new profile is created
DROP TRIGGER IF EXISTS on_profile_created ON public.profiles;

CREATE TRIGGER on_profile_created
AFTER INSERT ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_profile();