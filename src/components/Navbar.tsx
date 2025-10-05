import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl hover:text-primary transition-colors">
          <BookOpen className="h-6 w-6 text-primary" />
          <span>PGLeitura</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link 
            to="/explorar" 
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Explorar Livros
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
