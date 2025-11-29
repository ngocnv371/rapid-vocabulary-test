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

-- orders table to track user orders
CREATE TABLE IF NOT EXISTS public.orders (
  id              BIGSERIAL PRIMARY KEY,
  profile_id      INT NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  product_id      TEXT NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
  credits         INT NOT NULL,
  amount          DECIMAL(10, 2) NOT NULL,
  currency        TEXT NOT NULL DEFAULT 'VND',
  payment_status  TEXT NOT NULL DEFAULT 'completed',
  payment_id      TEXT,
  reference       TEXT,
  description     TEXT,
  checkout_url    TEXT,
  created_at      timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Users can only view their own orders
CREATE POLICY "Users can view own orders"
  ON public.orders
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.id = orders.profile_id
    )
  );

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
