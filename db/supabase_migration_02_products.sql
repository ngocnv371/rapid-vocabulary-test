--  Supabase (PostgreSQL) with RLS

-- products table to store available credit packs
CREATE TABLE IF NOT EXISTS public.products (
  id              TEXT PRIMARY KEY,
  name            TEXT NOT NULL,
  credits         INT NOT NULL,
  bonus_credits   INT NOT NULL DEFAULT 0,
  price           DECIMAL(10, 2) NOT NULL,
  currency        TEXT NOT NULL DEFAULT 'VND',
  active          BOOLEAN NOT NULL DEFAULT true,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Allow public to read active products
CREATE POLICY "Allow public to read active products"
  ON public.products
  FOR SELECT
  TO public
  USING (active = true);

-- Insert default products
INSERT INTO public.products (id, name, credits, bonus_credits, price, currency) VALUES
  ('small_pack', 'Starter Pack', 10, 0, 20000, 'VND'),
  ('medium_pack', 'Value Pack', 25, 5, 40000, 'VND'),
  ('large_pack', 'Power Pack', 50, 15, 70000, 'VND'),
  ('mega_pack', 'Ultimate Pack', 100, 40, 120000, 'VND')
ON CONFLICT (id) DO NOTHING;

-- purchases table to track user purchases
CREATE TABLE IF NOT EXISTS public.purchases (
  id              BIGSERIAL PRIMARY KEY,
  profile_id      INT NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  product_id      TEXT NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
  credits_amount  INT NOT NULL,
  price_paid      DECIMAL(10, 2) NOT NULL,
  currency        TEXT NOT NULL DEFAULT 'VND',
  payment_status  TEXT NOT NULL DEFAULT 'completed',
  payment_id      TEXT,
  purchased_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

-- Users can only view their own purchases
CREATE POLICY "Users can view own purchases"
  ON public.purchases
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.id = purchases.profile_id
    )
  );

-- Function to add credits when a purchase is created
CREATE OR REPLACE FUNCTION public.handle_purchase_created()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER set search_path = ''
AS $$
BEGIN
  -- Only add credits if payment status is completed
  IF NEW.payment_status = 'completed' THEN
    UPDATE public.credits
    SET amount = amount + NEW.credits_amount
    WHERE profile_id = NEW.profile_id;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Trigger to add credits when a purchase is created
DROP TRIGGER IF EXISTS on_purchase_created ON public.purchases;

CREATE TRIGGER on_purchase_created
AFTER INSERT ON public.purchases
FOR EACH ROW
EXECUTE FUNCTION public.handle_purchase_created();

-- Add RPC function to add credits (for backward compatibility and manual operations)
CREATE OR REPLACE FUNCTION public.add_credits(p_profile_id INT, p_amount INT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER set search_path = ''
AS $$
BEGIN
  UPDATE public.credits
  SET amount = amount + p_amount
  WHERE profile_id = p_profile_id;
END;
$$;
