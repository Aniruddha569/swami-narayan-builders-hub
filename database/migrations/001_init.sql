-- Create app_role enum for admin access
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for role management
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (true);

-- Create projects table
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'ongoing' CHECK (status IN ('ongoing', 'completed', 'upcoming')),
    images TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Public can view projects
CREATE POLICY "Anyone can view projects"
ON public.projects FOR SELECT
USING (true);

-- Only admins can insert projects
CREATE POLICY "Admins can insert projects"
ON public.projects FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can update projects"
ON public.projects FOR UPDATE
USING (true);

CREATE POLICY "Admins can delete projects"
ON public.projects FOR DELETE
USING (true);

-- Create reviews table
CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    message TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can submit reviews
CREATE POLICY "Anyone can submit reviews"
ON public.reviews FOR INSERT
WITH CHECK (true);

-- Public can view approved reviews
CREATE POLICY "Anyone can view approved reviews"
ON public.reviews FOR SELECT
USING (true);

CREATE POLICY "Admins can update reviews"
ON public.reviews FOR UPDATE
USING (true);

CREATE POLICY "Admins can delete reviews"
ON public.reviews FOR DELETE
USING (true);

-- Create enquiries table
CREATE TABLE public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on enquiries
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Anyone can submit enquiries
CREATE POLICY "Anyone can submit enquiries"
ON public.enquiries FOR INSERT
WITH CHECK (true);

-- Only admins can view enquiries
CREATE POLICY "Admins can view enquiries"
ON public.enquiries FOR SELECT
USING (true);

CREATE POLICY "Admins can update enquiries"
ON public.enquiries FOR UPDATE
USING (true);

CREATE POLICY "Admins can delete enquiries"
ON public.enquiries FOR DELETE
USING (true);

-- Create flats table
CREATE TABLE public.flats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  flat_number TEXT NOT NULL,
  floor_number INTEGER,
  configuration TEXT NOT NULL,
  carpet_area DECIMAL(10,2),
  price DECIMAL(12,2),
  status TEXT NOT NULL DEFAULT 'available',
  amenities TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(project_id, flat_number)
);

-- Enable Row Level Security on flats
ALTER TABLE public.flats ENABLE ROW LEVEL SECURITY;

-- Anyone can view flats
CREATE POLICY "Anyone can view flats"
ON public.flats FOR SELECT
USING (true);

-- Only admins can insert/update/delete flats
CREATE POLICY "Admins can insert flats"
ON public.flats FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can update flats"
ON public.flats FOR UPDATE
USING (true);

CREATE POLICY "Admins can delete flats"
ON public.flats FOR DELETE
USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for projects
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for flats
CREATE TRIGGER update_flats_updated_at
BEFORE UPDATE ON public.flats
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();