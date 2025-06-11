
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b bg-white/95 backdrop-blur-sm w-full py-4 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/home" className="font-bold text-xl flex items-center gap-2 hover:opacity-90 transition-opacity">
          <div className="bg-primary rounded-md p-1.5 shadow-sm">
            <span className="text-white font-bold">IL</span>
          </div>
          <span className="hidden sm:inline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            InternLink
          </span>
        </Link>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 hover:bg-muted rounded-md transition-colors" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            <Link to="/home" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              How It Works
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Success Stories
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" className="font-medium">
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild className="font-medium shadow-sm hover:shadow-md transition-shadow">
              <Link to="/login?register=true">Get Started</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t z-50 md:hidden animate-fade-in">
            <div className="container mx-auto px-4 py-6 space-y-4">
              <Link 
                to="/home" 
                className="block py-2 text-muted-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="block py-2 text-muted-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                How It Works
              </Link>
              <Link 
                to="/about" 
                className="block py-2 text-muted-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Success Stories
              </Link>
              <div className="pt-4 space-y-3">
                <Button 
                  asChild 
                  variant="ghost" 
                  className="w-full font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  <Link to="/login">Log in</Link>
                </Button>
                <Button 
                  asChild 
                  className="w-full font-medium shadow-sm"
                  onClick={() => setIsOpen(false)}
                >
                  <Link to="/login?register=true">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
