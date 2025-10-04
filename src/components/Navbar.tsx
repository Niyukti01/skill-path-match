
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, User, LogOut, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import { LogoutConfirmDialog } from "./LogoutConfirmDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { user, profile, signOut, isAdmin } = useAuth();

  const handleSignOut = async () => {
    setShowLogoutDialog(false);
    setIsOpen(false);
    await signOut();
  };

  return (
    <nav className="border-b border-border/50 glass w-full py-5 sticky top-0 z-50 shadow-soft">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/home" className="font-bold text-xl flex items-center gap-3 hover:scale-105 transition-all duration-300 group">
          <div className="bg-gradient-to-br from-primary to-accent rounded-xl p-2 shadow-elegant group-hover:shadow-glow">
            <span className="text-white font-bold text-sm">IL</span>
          </div>
          <span className="hidden sm:inline gradient-text font-bold text-2xl">
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
            {user && (profile?.user_type === 'company' || isAdmin) && (
              <Link to="/students" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                Students
              </Link>
            )}
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                {isAdmin && (
                  <Button asChild variant="outline" size="sm">
                    <Link to="/admin">
                      <Shield className="h-4 w-4 mr-2" />
                      Admin
                    </Link>
                  </Button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{profile?.name || 'User'}</span>
                      {profile?.user_type && (
                        <Badge variant="secondary" className="text-xs">
                          {profile.user_type}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link 
                        to="/dashboard"
                        className="flex items-center gap-2"
                      >
                        <User className="h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => setShowLogoutDialog(true)}
                      className="flex items-center gap-2 text-destructive"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Button asChild variant="ghost" className="font-medium hover:scale-105">
                  <Link to="/auth">Log in</Link>
                </Button>
                <Button asChild variant="premium" className="font-medium">
                  <Link to="/auth">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 glass-premium shadow-premium border-t border-border/30 z-50 md:hidden animate-fade-in">
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
              {user && (profile?.user_type === 'company' || isAdmin) && (
                <Link 
                  to="/students" 
                  className="block py-2 text-muted-foreground hover:text-primary transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Students
                </Link>
              )}
              <div className="pt-4 space-y-3">
                {user ? (
                  <>
                    {isAdmin && (
                      <Button 
                        asChild 
                        variant="outline" 
                        className="w-full font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        <Link to="/admin">
                          <Shield className="h-4 w-4 mr-2" />
                          Admin Dashboard
                        </Link>
                      </Button>
                    )}
                    <Button 
                      asChild 
                      variant="ghost" 
                      className="w-full font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      <Link to="/dashboard">
                        <User className="h-4 w-4 mr-2" />
                        Dashboard
                      </Link>
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full font-medium text-destructive"
                      onClick={() => setShowLogoutDialog(true)}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      asChild 
                      variant="ghost" 
                      className="w-full font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      <Link to="/auth">Log in</Link>
                    </Button>
                    <Button 
                      asChild 
                      className="w-full font-medium shadow-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      <Link to="/auth">Get Started</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <LogoutConfirmDialog 
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        onConfirm={handleSignOut}
      />
    </nav>
  );
}
