
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, differenceInYears } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const SplashScreen = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>();
  const [showDialog, setShowDialog] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);

  const handleProceed = () => {
    if (!date) {
      setShowDialog(true);
      return;
    }

    const age = differenceInYears(new Date(), date);
    
    if (age >= 18) {
      navigate('/home');
    } else {
      setErrorDialog(true);
    }
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
        
        <div className="space-y-6">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full md:w-[280px] pl-3 text-left font-normal flex justify-between",
                  !date && "text-muted-foreground"
                )}
              >
                {date ? format(date, "PPP") : <span>Select your date of birth</span>}
                <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
          
          <Button 
            onClick={handleProceed} 
            size="lg" 
            className="w-full md:w-[280px] px-12 text-lg font-medium"
          >
            Proceed
          </Button>
        </div>
      </div>

      {/* Age verification dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Date of Birth Required</DialogTitle>
            <DialogDescription>
              Please provide your date of birth to continue. You must be 18 years or older to use InternLink.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={() => setShowDialog(false)}>OK</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Age restriction dialog */}
      <Dialog open={errorDialog} onOpenChange={setErrorDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Age Restriction</DialogTitle>
            <DialogDescription>
              Sorry, you must be 18 years or older to use InternLink. Thank you for your interest.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={() => setErrorDialog(false)}>OK</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SplashScreen;
