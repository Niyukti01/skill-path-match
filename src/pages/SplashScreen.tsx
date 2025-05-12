
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Download, Package } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const SplashScreen = () => {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
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

    // Check if app is installable
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', (e) => {
        setDeferredPrompt(null);
      });
    };
  }, []);

  const handleProceed = () => {
    navigate('/home');
  };

  const handleInstall = async () => {
    if (!deferredPrompt) {
      toast("This app cannot be installed right now", {
        description: "Try using a supported browser or device",
        duration: 5000,
      });
      return;
    }
    
    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    
    if (choiceResult.outcome === 'accepted') {
      toast("Thank you for installing InternLink!", {
        description: "You can now access the app from your home screen",
        duration: 5000,
      });
      setIsInstallable(false);
    } 
    
    setDeferredPrompt(null);
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
        
        <p className="text-lg text-amber-700 mb-12 text-center max-w-md px-4">
          Connect with the perfect internship opportunities tailored for you
        </p>
        
        <div className="w-full max-w-md px-4 space-y-6">
          <Button 
            onClick={handleProceed} 
            size="lg" 
            className="w-full px-12 text-lg font-medium bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Proceed
          </Button>
          
          {isInstallable && (
            <Button 
              onClick={handleInstall}
              variant="outline" 
              size="lg" 
              className="w-full px-12 text-lg font-medium border-amber-400 hover:bg-amber-50"
            >
              <Download className="mr-2" /> Install App
            </Button>
          )}
        </div>
      </div>

      {/* Age verification dialog - removed as per user request */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Welcome to InternLink</DialogTitle>
            <DialogDescription>
              Please click OK to continue to InternLink.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={() => setShowDialog(false)}>OK</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SplashScreen;
