
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const handleProceed = () => {
    setIsAnimating(true);
    setTimeout(() => {
      navigate('/home');
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-secondary to-background">
      <div className={`flex flex-col items-center transition-all duration-500 ${isAnimating ? 'scale-95 opacity-0' : 'scale-100'}`}>
        <div className="mb-8 relative">
          <div className="absolute -left-6 -top-6 w-20 h-20 bg-accent/20 rounded-full blur-xl"></div>
          <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-primary/20 rounded-full blur-xl"></div>
          <div className="relative bg-white p-6 rounded-2xl shadow-xl">
            <div className="flex items-center justify-center h-32 w-32 md:h-48 md:w-48">
              <div className="bg-primary rounded-xl p-4 text-white text-4xl md:text-6xl font-bold">
                IL
              </div>
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          <span className="gradient-text">InternLink</span>
        </h1>
        
        <p className="text-lg text-gray-600 mb-12 text-center max-w-md px-4">
          Connect with the perfect internship opportunities tailored for you
        </p>
        
        <Button 
          onClick={handleProceed} 
          size="lg" 
          className="px-12 text-lg font-medium"
        >
          Proceed
        </Button>
      </div>
    </div>
  );
};

export default SplashScreen;
