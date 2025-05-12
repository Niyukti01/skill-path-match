import { Navbar } from "@/components/Navbar";
import { ProfileForm } from "@/components/ProfileForm";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { differenceInYears } from "date-fns";

const StudentProfile = () => {
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    console.log("Student profile data:", data);
    
    // Check if user is 18+ based on date of birth
    if (data.dob) {
      const age = differenceInYears(new Date(), data.dob);
      if (age < 18) {
        // Show error or handle underage users
        alert("You must be at least 18 years old to use InternLink.");
        return;
      }
    }
    
    // In a real app, we would save the data to a backend
    navigate("/dashboard/student");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>
            <p className="text-muted-foreground mb-8">
              Help us match you with the perfect internship opportunities.
            </p>
            
            <div className="space-y-8">
              <ProfileForm userType="student" onSubmit={handleSubmit} />
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => navigate("/dashboard/student")}>
                  Skip for Now
                </Button>
                <Button type="submit" form="profile-form">
                  Save and Continue
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentProfile;
