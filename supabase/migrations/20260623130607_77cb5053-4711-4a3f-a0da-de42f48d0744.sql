
-- ============ ENUMS ============
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
CREATE TYPE public.review_status AS ENUM ('pending', 'approved', 'rejected');

-- ============ user_roles (canonical pattern) ============
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- ============ colleges ============
CREATE TABLE public.colleges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  short_description TEXT NOT NULL DEFAULT '',
  streams TEXT[] NOT NULL DEFAULT '{}',
  categories TEXT[] NOT NULL DEFAULT '{}',
  popular_courses TEXT[] NOT NULL DEFAULT '{}',
  established TEXT,
  college_type TEXT,
  academics_rating TEXT NOT NULL DEFAULT 'Very Good',
  campus_life_rating TEXT NOT NULL DEFAULT 'Very Good',
  placements_rating TEXT NOT NULL DEFAULT 'Very Good',
  faculty_rating TEXT NOT NULL DEFAULT 'Very Good',
  hero_image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.colleges TO anon, authenticated;
GRANT ALL ON public.colleges TO service_role;
ALTER TABLE public.colleges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read colleges"
  ON public.colleges FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Admins can manage colleges"
  ON public.colleges FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE INDEX colleges_streams_idx ON public.colleges USING gin (streams);
CREATE INDEX colleges_categories_idx ON public.colleges USING gin (categories);

-- ============ reviews ============
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id UUID REFERENCES public.colleges(id) ON DELETE CASCADE,
  college_name TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  course TEXT,
  rating NUMERIC(2,1) NOT NULL CHECK (rating >= 1 AND rating <= 5),
  body TEXT NOT NULL,
  status public.review_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.reviews TO authenticated;
GRANT SELECT ON public.reviews TO anon;
GRANT ALL ON public.reviews TO service_role;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read approved reviews"
  ON public.reviews FOR SELECT TO anon, authenticated
  USING (status = 'approved');

CREATE POLICY "Authors can read their own reviews"
  ON public.reviews FOR SELECT TO authenticated
  USING (auth.uid() = author_user_id);

CREATE POLICY "Authenticated users can submit reviews"
  ON public.reviews FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = author_user_id AND status = 'pending');

CREATE POLICY "Admins can manage reviews"
  ON public.reviews FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE INDEX reviews_college_idx ON public.reviews(college_id, status);

-- ============ mentors ============
CREATE TABLE public.mentors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  college_slug TEXT,
  college_name TEXT,
  course TEXT,
  year TEXT,
  whatsapp TEXT,
  photo_url TEXT,
  bio TEXT,
  verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.mentors TO anon, authenticated;
GRANT ALL ON public.mentors TO service_role;
ALTER TABLE public.mentors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read verified mentors"
  ON public.mentors FOR SELECT TO anon, authenticated USING (verified = true);

CREATE POLICY "Admins can manage mentors"
  ON public.mentors FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============ updated_at trigger for colleges ============
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

CREATE TRIGGER colleges_touch_updated_at
  BEFORE UPDATE ON public.colleges
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
