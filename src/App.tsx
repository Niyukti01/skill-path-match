
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import StudentProfile from "./pages/StudentProfile";
import CompanyProfile from "./pages/CompanyProfile";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NewDashboard from "./pages/NewDashboard";
import NewAdminDashboard from "./pages/NewAdminDashboard";
import Students from "./pages/Students";
import StudentDetail from "./pages/StudentDetail";
import ProfileEdit from "./pages/ProfileEdit";
import NotFound from "./pages/NotFound";
import SplashScreen from "./pages/SplashScreen";
import Presentation from "./pages/Presentation";
import About from "./pages/About";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Initialize the React Query client
const queryClient = new QueryClient();

// Enhanced App component with email confirmation handling and proper session management
const AppContent = () => {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);
  const [isEmailConfirmation, setIsEmailConfirmation] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    let mounted = true;

    const initializeSession = async () => {
      try {
        // Check if this is an email confirmation redirect
        const fragment = window.location.hash;
        const urlParams = new URLSearchParams(window.location.search);
        
        if (fragment.includes('access_token') || fragment.includes('refresh_token') || urlParams.has('token_hash')) {
          setIsEmailConfirmation(true);
          setShowSplash(false);
          
          // Handle the auth callback
          const { data: { session } } = await supabase.auth.getSession();
          if (session && mounted) {
            // Use navigate instead of window.location.href to prevent full page reload
            setTimeout(() => navigate('/home', { replace: true }), 500);
          }
        } else {
          // Check if user is already logged in
          const { data: { session } } = await supabase.auth.getSession();
          if (mounted) {
            if (session) {
              setShowSplash(false);
            }
            setIsInitialized(true);
          }
        }
      } catch (error) {
        console.error('Session initialization error:', error);
        if (mounted) {
          setShowSplash(false);
          setIsInitialized(true);
        }
      }
    };

    // Add a timeout to hide splash screen if initialization takes too long
    const splashTimeout = setTimeout(() => {
      if (mounted) {
        setShowSplash(false);
        setIsInitialized(true);
      }
    }, 3000);

    initializeSession();

    return () => {
      mounted = false;
      clearTimeout(splashTimeout);
    };
  }, [navigate]);

  if (isEmailConfirmation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Confirming your email...</h2>
          <p className="text-muted-foreground">Please wait while we verify your account.</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={showSplash ? <SplashScreen /> : <Index />} />
      <Route path="/home" element={<Index />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/dashboard" element={<NewDashboard />} />
      <Route path="/students" element={<Students />} />
      <Route path="/students/:id" element={<StudentDetail />} />
      <Route path="/profile/student" element={<StudentProfile />} />
      <Route path="/profile/company" element={<CompanyProfile />} />
      <Route path="/dashboard/:userType" element={<Dashboard />} />
      <Route path="/profile/edit" element={<ProfileEdit />} />
      <Route path="/admin" element={<NewAdminDashboard />} />
      <Route path="/presentation" element={<Presentation />} />
      <Route path="/about" element={<About />} />
      <Route path="/splash" element={<SplashScreen />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

// Wrap the entire app with error boundary and required providers
const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
