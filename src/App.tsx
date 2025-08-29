
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
import NotFound from "./pages/NotFound";
import SplashScreen from "./pages/SplashScreen";
import Presentation from "./pages/Presentation";
import About from "./pages/About";

// Initialize the React Query client
const queryClient = new QueryClient();

// Fix: Wrap the entire app with the required providers, ensuring proper nesting
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile/student" element={<StudentProfile />} />
              <Route path="/profile/company" element={<CompanyProfile />} />
              <Route path="/dashboard/:userType" element={<Dashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/presentation" element={<Presentation />} />
              <Route path="/about" element={<About />} />
              <Route path="/splash" element={<SplashScreen />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
