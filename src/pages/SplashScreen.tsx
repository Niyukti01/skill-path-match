
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const SplashScreen = () => {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);

  const handleProceed = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-secondary to-background overflow-hidden relative">
      <div className="flex flex-col items-center">
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
        
        <div className="w-full max-w-md px-4 space-y-6">
          <Button 
            onClick={handleProceed} 
            size="lg" 
            className="w-full px-12 text-lg font-medium"
          >
            Proceed
          </Button>
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
