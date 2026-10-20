CREATE POLICY "anyone uploads request photos" ON storage.objects FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'car-photos' AND (storage.foldername(name))[1] = 'requests');
CREATE POLICY "admin reads request photos" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'car-photos' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin deletes request photos" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'car-photos' AND public.has_role(auth.uid(),'admin'));

CREATE POLICY "anyone views listing photos" ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'listing-photos');
CREATE POLICY "admin uploads listing photos" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'listing-photos' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin deletes listing photos" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'listing-photos' AND public.has_role(auth.uid(),'admin'));