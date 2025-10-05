import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBookById } from "@/lib/supabase-queries";
import { Download, BookOpen, AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

const LivroDetalhes = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data: book, isLoading, error } = useQuery({
    queryKey: ["book", id],
    queryFn: () => getBookById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 py-8">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="aspect-[2/3] bg-muted rounded-lg animate-pulse" />
              </div>
              <div className="md:col-span-2 space-y-4">
                <div className="h-10 bg-muted rounded animate-pulse" />
                <div className="h-6 bg-muted rounded w-1/2 animate-pulse" />
                <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 py-8">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="text-center py-16">
              <h1 className="text-4xl font-bold mb-4">Livro não encontrado</h1>
              <p className="text-muted-foreground mb-8">
                O livro que você procura não está disponível.
              </p>
              <Button asChild>
                <Link to="/explorar">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar ao Catálogo
                </Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-8">
        <div className="container max-w-7xl mx-auto px-4">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/explorar">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao Catálogo
            </Link>
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Book Cover */}
            <div className="md:col-span-1">
              {book.cover_image_url ? (
                <img
                  src={book.cover_image_url}
                  alt={`Capa do livro ${book.title}`}
                  className="w-full rounded-lg shadow-lg"
                />
              ) : (
                <div className="aspect-[2/3] flex items-center justify-center bg-muted rounded-lg">
                  <BookOpen className="h-24 w-24 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* Book Details */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-3">{book.title}</h1>
                {book.author && (
                  <Link 
                    to={`/explorar?busca=${encodeURIComponent(book.author.name)}`}
                    className="text-xl text-muted-foreground hover:text-primary transition-colors"
                  >
                    por {book.author.name}
                  </Link>
                )}
              </div>

              {book.publication_year && (
                <p className="text-muted-foreground">
                  Publicado em {book.publication_year}
                </p>
              )}

              {book.genres && book.genres.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {book.genres.map((genre) => (
                    <Badge key={genre} variant="secondary">
                      {genre}
                    </Badge>
                  ))}
                </div>
              )}

              {book.description && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Descrição</h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {book.description}
                  </p>
                </div>
              )}

              {book.book_file_url ? (
                <Button size="lg" className="w-full md:w-auto" asChild>
                  <a href={book.book_file_url} download>
                    <Download className="mr-2 h-5 w-5" />
                    Baixar Livro
                  </a>
                </Button>
              ) : (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    O arquivo deste livro ainda não está disponível para download.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LivroDetalhes;
