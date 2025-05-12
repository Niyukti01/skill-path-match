
import { Navbar } from "@/components/Navbar";
import { ProfileForm } from "@/components/ProfileForm";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { differenceInYears } from "date-fns";
import { toast } from "@/components/ui/sonner";

const StudentProfile = () => {
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    console.log("Student profile data:", data);
    
    // Check if user is 18+ based on date of birth
    if (data.dob) {
      const age = differenceInYears(new Date(), data.dob);
      if (age < 18) {
        // Show error or handle underage users
        toast.error("You must be at least 18 years old to use InternLink.", {
          description: "This platform is designed for adult students and professionals.",
          duration: 5000,
        });
        return;
      } else {
        toast.success("Profile submitted successfully!", {
          description: "You can now access all InternLink features.",
        });
      }
    }
    
    // In a real app, we would save the data to a backend
    navigate("/dashboard/student");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-yellow-50 to-white">
      <Navbar />
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-amber-100">
              <h1 className="text-3xl font-bold mb-2 text-amber-800">Complete Your Profile</h1>
              <p className="text-amber-600 mb-8">
                Help us match you with the perfect internship opportunities.
              </p>
              
              <div className="space-y-8">
                <ProfileForm userType="student" onSubmit={handleSubmit} />
                
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate("/dashboard/student")}
                    className="border-amber-400 text-amber-700 hover:bg-amber-50"
                  >
                    Skip for Now
                  </Button>
                  <Button 
                    type="submit" 
                    form="profile-form"
                    className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600"
                  >
                    Save and Continue
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentProfile;
