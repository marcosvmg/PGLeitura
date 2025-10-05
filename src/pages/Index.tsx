import { useQuery } from "@tanstack/react-query";
import { getRecentBooks } from "@/lib/supabase-queries";
import BookCard from "@/components/BookCard";
import BookCardSkeleton from "@/components/BookCardSkeleton";
import SearchBar from "@/components/SearchBar";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Index = () => {
  const { data: recentBooks, isLoading, error } = useQuery({
    queryKey: ["recent-books"],
    queryFn: () => getRecentBooks(8),
  });

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Sua Biblioteca Digital em Praia Grande
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Acesse milhares de livros gratuitamente. Conhecimento e cultura 
                ao alcance de todos os moradores de Praia Grande - SP.
              </p>
            </div>
            <div className="mt-10">
              <SearchBar />
            </div>
          </div>
        </section>

        {/* Recent Books Section */}
        <section className="py-16">
          <div className="container max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Adicionados Recentemente</h2>
            
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Erro ao carregar os livros. Por favor, tente novamente.
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {isLoading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <BookCardSkeleton key={i} />
                  ))
                : recentBooks?.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
