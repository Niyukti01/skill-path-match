
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b bg-white w-full py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="font-bold text-xl flex items-center gap-2">
          <div className="bg-primary rounded-md p-1">
            <span className="text-white">SPM</span>
          </div>
          <span className="hidden sm:inline">SkillPathMatch</span>
        </Link>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-600 hover:text-primary">Home</Link>
          <Link to="/about" className="text-gray-600 hover:text-primary">How It Works</Link>
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" className="font-medium">
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild className="font-medium">
              <Link to="/login?register=true">Sign up</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white shadow-md z-50 p-4 md:hidden flex flex-col gap-4">
            <Link 
              to="/" 
              className="block py-2 text-gray-600 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="block py-2 text-gray-600 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              How It Works
            </Link>
            <Button 
              asChild 
              variant="outline" 
              className="w-full font-medium"
              onClick={() => setIsOpen(false)}
            >
              <Link to="/login">Log in</Link>
            </Button>
            <Button 
              asChild 
              className="w-full font-medium"
              onClick={() => setIsOpen(false)}
            >
              <Link to="/login?register=true">Sign up</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
