import { supabase } from "@/integrations/supabase/client";

export interface Author {
  id: string;
  name: string;
  bio: string | null;
  created_at: string;
}

export interface Book {
  id: string;
  title: string;
  description: string | null;
  cover_image_url: string | null;
  book_file_url: string | null;
  publication_year: number | null;
  genres: string[] | null;
  author_id: string | null;
  created_at: string;
  author?: Author | null;
}

export interface BookWithAuthor extends Book {
  author: Author | null;
}

export async function getRecentBooks(limit: number = 8) {
  const { data, error } = await supabase
    .from("books")
    .select(`
      *,
      author:authors(*)
    `)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as BookWithAuthor[];
}

export async function getAllBooks() {
  const { data, error } = await supabase
    .from("books")
    .select(`
      *,
      author:authors(*)
    `)
    .order("title", { ascending: true });

  if (error) throw error;
  return data as BookWithAuthor[];
}

export async function getBookById(id: string) {
  const { data, error } = await supabase
    .from("books")
    .select(`
      *,
      author:authors(*)
    `)
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as BookWithAuthor;
}

export async function getAllAuthors() {
  const { data, error } = await supabase
    .from("authors")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw error;
  return data as Author[];
}
