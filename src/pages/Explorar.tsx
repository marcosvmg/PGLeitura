import { useQuery } from "@tanstack/react-query";
import { getAllBooks } from "@/lib/supabase-queries";
import BookCard from "@/components/BookCard";
import BookCardSkeleton from "@/components/BookCardSkeleton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMemo, useState, useEffect } from "react";
import { BookOpen, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useSearchParams } from "react-router-dom";

const Explorar = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("busca") || "";
  
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedGenre, setSelectedGenre] = useState<string>("all");

  const { data: books, isLoading, error } = useQuery({
    queryKey: ["all-books"],
    queryFn: getAllBooks,
  });

  useEffect(() => {
    const busca = searchParams.get("busca");
    if (busca) {
      setSearchTerm(busca);
    }
  }, [searchParams]);

  const allGenres = useMemo(() => {
    if (!books) return [];
    const genresSet = new Set<string>();
    books.forEach((book) => {
      book.genres?.forEach((genre) => genresSet.add(genre));
    });
    return Array.from(genresSet).sort();
  }, [books]);

  const filteredBooks = useMemo(() => {
    if (!books) return [];
    
    return books.filter((book) => {
      const matchesSearch = 
        !searchTerm ||
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author?.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesGenre = 
        selectedGenre === "all" || 
        book.genres?.includes(selectedGenre);
      
      return matchesSearch && matchesGenre;
    });
  }, [books, searchTerm, selectedGenre]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-8">
        <div className="container max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Catálogo Completo</h1>

          {/* Filters */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Filtrar por título ou autor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full sm:w-48">
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger>
                  <SelectValue placeholder="Gêneros" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os gêneros</SelectItem>
                  {allGenres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-8">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Erro ao carregar os livros. Por favor, tente novamente.
              </AlertDescription>
            </Alert>
          )}

          {/* Books Grid */}
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <BookCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-xl text-muted-foreground">Nenhum livro encontrado.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Explorar;
