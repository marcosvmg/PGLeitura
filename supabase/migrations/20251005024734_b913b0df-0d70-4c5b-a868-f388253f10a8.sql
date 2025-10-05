-- Create authors table
CREATE TABLE public.authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL CHECK (char_length(name) > 0),
  bio TEXT
);

-- Create books table
CREATE TABLE public.books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  title TEXT NOT NULL CHECK (char_length(title) > 0),
  description TEXT,
  cover_image_url TEXT,
  book_file_url TEXT,
  publication_year INT4,
  genres TEXT[],
  author_id UUID REFERENCES public.authors(id) ON DELETE SET NULL
);

-- Enable RLS on both tables
ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;

-- Create public read policies for authors
CREATE POLICY "Allow public read access" ON public.authors
  FOR SELECT
  USING (true);

-- Create public read policies for books
CREATE POLICY "Allow public read access" ON public.books
  FOR SELECT
  USING (true);

-- Create storage buckets for book covers and files
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('book_covers', 'book_covers', true),
  ('book_files', 'book_files', true);

-- Create storage policies for public read access on book_covers
CREATE POLICY "Allow public read access to book covers"
ON storage.objects FOR SELECT
USING (bucket_id = 'book_covers');

-- Create storage policies for public read access on book_files
CREATE POLICY "Allow public read access to book files"
ON storage.objects FOR SELECT
USING (bucket_id = 'book_files');