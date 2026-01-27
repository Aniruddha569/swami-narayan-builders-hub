-- Create flats table for flat/unit management
CREATE TABLE public.flats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  flat_number TEXT NOT NULL,
  floor_number INTEGER,
  configuration TEXT NOT NULL, -- e.g., "1 BHK", "2 BHK", "3 BHK"
  carpet_area DECIMAL(10,2), -- in sq ft
  price DECIMAL(12,2),
  status TEXT NOT NULL DEFAULT 'available', -- 'available', 'sold', 'reserved'
  amenities TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(project_id, flat_number)
);

-- Enable Row Level Security
ALTER TABLE public.flats ENABLE ROW LEVEL SECURITY;

-- Anyone can view flats (for customer transparency)
CREATE POLICY "Anyone can view flats"
ON public.flats FOR SELECT
USING (true);

-- Only admins can insert flats
CREATE POLICY "Admins can insert flats"
ON public.flats FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Only admins can update flats
CREATE POLICY "Admins can update flats"
ON public.flats FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

-- Only admins can delete flats
CREATE POLICY "Admins can delete flats"
ON public.flats FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- Trigger for automatic updated_at
CREATE TRIGGER update_flats_updated_at
BEFORE UPDATE ON public.flats
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();