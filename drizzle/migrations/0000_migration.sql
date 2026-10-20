CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own roles readable" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- First account ever created becomes the owner/admin
CREATE OR REPLACE FUNCTION public.handle_first_admin()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER on_auth_user_created_admin AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_first_admin();

-- Sell requests
CREATE TABLE public.sell_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 2 AND 100),
  mobile text NOT NULL CHECK (mobile ~ '^[6-9][0-9]{9}$'),
  brand text NOT NULL CHECK (char_length(brand) <= 60),
  model text NOT NULL CHECK (char_length(model) <= 60),
  year int NOT NULL CHECK (year BETWEEN 1980 AND 2100),
  fuel text NOT NULL CHECK (fuel IN ('Petrol','Diesel','CNG','Electric')),
  transmission text NOT NULL CHECK (transmission IN ('Manual','Automatic')),
  km_driven int NOT NULL CHECK (km_driven BETWEEN 0 AND 2000000),
  owners int NOT NULL CHECK (owners BETWEEN 1 AND 10),
  expected_price bigint CHECK (expected_price IS NULL OR expected_price BETWEEN 0 AND 1000000000),
  registration_number text CHECK (registration_number IS NULL OR char_length(registration_number) <= 20),
  condition text NOT NULL CHECK (char_length(condition) <= 500),
  location text NOT NULL CHECK (char_length(location) <= 100),
  photo_paths text[] NOT NULL DEFAULT '{}' CHECK (cardinality(photo_paths) <= 10),
  consent boolean NOT NULL CHECK (consent = true),
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new','contacted','evaluating','offered','purchased','closed')),
  admin_notes text
);
GRANT INSERT ON public.sell_requests TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.sell_requests TO authenticated;
GRANT ALL ON public.sell_requests TO service_role;
ALTER TABLE public.sell_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can submit" ON public.sell_requests FOR INSERT TO anon, authenticated WITH CHECK (status = 'new' AND admin_notes IS NULL);
CREATE POLICY "admin read" ON public.sell_requests FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin update" ON public.sell_requests FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin delete" ON public.sell_requests FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

-- Contact enquiries
CREATE TABLE public.enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
  mobile text NOT NULL CHECK (mobile ~ '^[6-9][0-9]{9}$'),
  message text NOT NULL CHECK (char_length(message) BETWEEN 2 AND 1000),
  listing_id uuid,
  consent boolean NOT NULL CHECK (consent = true),
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new','contacted','closed'))
);
GRANT INSERT ON public.enquiries TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.enquiries TO authenticated;
GRANT ALL ON public.enquiries TO service_role;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can enquire" ON public.enquiries FOR INSERT TO anon, authenticated WITH CHECK (status = 'new');
CREATE POLICY "admin read enq" ON public.enquiries FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin update enq" ON public.enquiries FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin delete enq" ON public.enquiries FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

-- Listings
CREATE TABLE public.listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  brand text NOT NULL,
  model text NOT NULL,
  year int NOT NULL,
  km_driven int NOT NULL DEFAULT 0,
  fuel text NOT NULL,
  transmission text NOT NULL,
  price bigint NOT NULL,
  description text,
  image_urls text[] NOT NULL DEFAULT '{}',
  is_demo boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'available' CHECK (status IN ('available','sold','hidden'))
);
GRANT SELECT ON public.listings TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.listings TO authenticated;
GRANT ALL ON public.listings TO service_role;
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public listings" ON public.listings FOR SELECT TO anon, authenticated USING (status <> 'hidden' OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin insert listings" ON public.listings FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin update listings" ON public.listings FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin delete listings" ON public.listings FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

INSERT INTO public.listings (brand, model, year, km_driven, fuel, transmission, price, description, is_demo) VALUES
('Demo Brand','Sample SUV',2021,32000,'Diesel','Automatic',1450000,'Demo listing — real inventory coming soon.',true),
('Demo Brand','Sample Sedan',2019,48000,'Petrol','Manual',725000,'Demo listing — real inventory coming soon.',true),
('Demo Brand','Sample Hatchback',2022,18000,'Petrol','Automatic',610000,'Demo listing — real inventory coming soon.',true),
('Demo Brand','Sample MPV',2020,56000,'CNG','Manual',890000,'Demo listing — real inventory coming soon.',true);

-- Reviews (only genuine ones added by owner)
CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  customer_name text NOT NULL,
  rating int NOT NULL CHECK (rating BETWEEN 1 AND 5),
  text text NOT NULL,
  published boolean NOT NULL DEFAULT true
);
GRANT SELECT ON public.reviews TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.reviews TO authenticated;
GRANT ALL ON public.reviews TO service_role;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public reviews" ON public.reviews FOR SELECT TO anon, authenticated USING (published OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin ins reviews" ON public.reviews FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin upd reviews" ON public.reviews FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin del reviews" ON public.reviews FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

-- Site settings (single row)
CREATE TABLE public.site_settings (
  id int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  tagline text NOT NULL DEFAULT 'Your Car. Our Best Offer.',
  hero_text text NOT NULL DEFAULT 'Looking to sell your car in Guntur? Connect with Smart Carz for a simple, convenient and transparent car-selling experience.',
  business_hours text NOT NULL DEFAULT 'Mon – Sat: 9:30 AM – 8:00 PM
Sunday: By appointment',
  instagram_url text NOT NULL DEFAULT '',
  facebook_url text NOT NULL DEFAULT '',
  address text NOT NULL DEFAULT 'Guntur, Andhra Pradesh',
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT UPDATE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public settings" ON public.site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admin settings" ON public.site_settings FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin'));
INSERT INTO public.site_settings (id) VALUES (1);