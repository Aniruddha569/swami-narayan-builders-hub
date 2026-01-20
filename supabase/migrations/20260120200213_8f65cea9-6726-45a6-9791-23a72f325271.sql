-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Anyone can view approved reviews" ON public.reviews;

-- Create a permissive policy to allow anyone to view approved reviews
CREATE POLICY "Anyone can view approved reviews"
ON public.reviews
FOR SELECT
USING ((is_approved = true) OR has_role(auth.uid(), 'admin'::app_role));