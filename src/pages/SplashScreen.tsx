
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Download, Package, Apple, Monitor, Smartphone } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const SplashScreen = () => {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
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

  const toggleDownloadOptions = () => {
    setShowDownloadOptions(!showDownloadOptions);
  };

  const handlePlatformInstall = (platform: string) => {
    // This would ideally link to platform-specific app stores or instructions
    // For now, we'll just show toast notifications
    toast(`Download for ${platform}`, {
      description: `InternLink for ${platform} would begin downloading now.`,
      duration: 5000,
    });
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
          
          <Button 
            onClick={toggleDownloadOptions}
            variant="outline" 
            size="lg" 
            className="w-full px-12 text-lg font-medium border-amber-400 hover:bg-amber-50"
          >
            <Download className="mr-2" /> Download App
          </Button>

          {showDownloadOptions && (
            <div className="bg-white rounded-lg shadow-lg p-4 space-y-3 animate-in fade-in-50 slide-in-from-top-5">
              <h3 className="font-medium text-lg text-center mb-2">Choose your platform</h3>
              
              {isInstallable && (
                <Button 
                  onClick={handleInstall}
                  variant="outline" 
                  className="w-full justify-start border-amber-300"
                >
                  <Smartphone className="mr-2 h-5 w-5" /> Install as Web App
                </Button>
              )}
              
              <Button 
                onClick={() => handlePlatformInstall("Android")}
                variant="outline" 
                className="w-full justify-start border-green-300"
              >
                <Smartphone className="mr-2 h-5 w-5" /> Download for Android
              </Button>
              
              <Button 
                onClick={() => handlePlatformInstall("iOS")}
                variant="outline" 
                className="w-full justify-start border-blue-300"
              >
                <Apple className="mr-2 h-5 w-5" /> Download for iOS
              </Button>
              
              <Button 
                onClick={() => handlePlatformInstall("Desktop")}
                variant="outline" 
                className="w-full justify-start border-gray-300"
              >
                <Monitor className="mr-2 h-5 w-5" /> Download for Desktop
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Dialog */}
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
          background: linear-gradient(to right, #f59e0b, #fbbf24);
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
