import { Link } from "react-router-dom";
import { BookWithAuthor } from "@/lib/supabase-queries";
import { BookOpen } from "lucide-react";

interface BookCardProps {
  book: BookWithAuthor;
}

const BookCard = ({ book }: BookCardProps) => {
  return (
    <Link 
      to={`/livro/${book.id}`}
      className="group block overflow-hidden rounded-lg border bg-card shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="aspect-[2/3] overflow-hidden bg-muted">
        {book.cover_image_url ? (
          <img
            src={book.cover_image_url}
            alt={`Capa do livro ${book.title}`}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <BookOpen className="h-16 w-16 text-muted-foreground" />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
          {book.title}
        </h3>
        {book.author && (
          <p className="text-sm text-muted-foreground mt-1">
            {book.author.name}
          </p>
        )}
      </div>
    </Link>
  );
};

export default BookCard;
