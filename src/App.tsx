
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
import { supabase } from "@/integrations/supabase/client";

// Initialize the React Query client
const queryClient = new QueryClient();

// Enhanced App component with email confirmation handling
const AppContent = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isEmailConfirmation, setIsEmailConfirmation] = useState(false);

  useEffect(() => {
    // Check if this is an email confirmation redirect
    const fragment = window.location.hash;
    const urlParams = new URLSearchParams(window.location.search);
    
    if (fragment.includes('access_token') || fragment.includes('refresh_token') || urlParams.has('token_hash')) {
      setIsEmailConfirmation(true);
      setShowSplash(false);
      
      // Handle the auth callback
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          // User is confirmed and logged in, redirect to home
          window.location.href = '/home';
        }
      });
    } else {
      // Check if user is already logged in
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          setShowSplash(false);
        }
      });
    }
  }, []);

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

// Fix: Wrap the entire app with the required providers, ensuring proper nesting
const App = () => {
  return (
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
  );
};

export default App;
