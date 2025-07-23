
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";

const SplashScreen = () => {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, color: string}>>([]);

  useEffect(() => {
    // Create decorative floating elements
    const newParticles = [];
    for (let i = 0; i < 15; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 10 + 5,
        color: `rgba(255, 222, ${Math.floor(Math.random() * 100 + 100)}, ${Math.random() * 0.5 + 0.2})`
      });
    }
    setParticles(newParticles);
  }, []);

  const handleProceed = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-secondary to-background overflow-hidden relative">
      {/* Decorative floating elements */}
      {particles.map((particle) => (
        <div 
          key={particle.id}
          className="absolute rounded-full floating-element"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            animationDelay: `${particle.id * 0.3}s`,
          }}
        />
      ))}
      
      <div className="flex flex-col items-center z-10">
        <div className="mb-8 relative">
          <div className="absolute -left-6 -top-6 w-20 h-20 bg-accent/20 rounded-full blur-xl"></div>
          <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-primary/20 rounded-full blur-xl"></div>
          <div className="relative bg-white p-6 rounded-2xl shadow-xl shine-effect">
            <div className="flex items-center justify-center h-32 w-32 md:h-48 md:w-48 hover:scale-105 transition-transform duration-300">
              <div className="bg-primary rounded-xl p-4 text-white text-4xl md:text-6xl font-bold">
                IL
              </div>
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          <span className="gradient-text">InternLink</span>
        </h1>
        
        <p className="text-lg text-primary/80 mb-12 text-center max-w-md px-4">
          Connect with the perfect internship opportunities tailored for you
        </p>
        
        <div className="w-full max-w-md px-4 space-y-6">
          <Button 
            onClick={handleProceed} 
            size="lg" 
            className="w-full px-12 text-lg font-medium btn-gradient transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Proceed
          </Button>
        </div>
      </div>

      <style>
        {`
        @keyframes float {
          0% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
          100% { transform: translateY(0px) translateX(0px); }
        }
        
        .floating-element {
          animation: float 6s ease-in-out infinite;
        }
        
        .gradient-text {
          background: linear-gradient(to right, hsl(262, 83%, 58%), hsl(262, 100%, 75%));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .shine-effect {
          position: relative;
          overflow: hidden;
        }
        
        .shine-effect::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            to bottom right,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.1) 50%,
            rgba(255,255,255,0) 100%
          );
          transform: rotate(30deg);
          animation: shine 3s infinite;
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%) rotate(30deg); }
          100% { transform: translateX(100%) rotate(30deg); }
        }
      `}
      </style>
    </div>
  );
};

export default SplashScreen;
