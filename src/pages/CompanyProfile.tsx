
import { Navbar } from "@/components/Navbar";
import { ProfileForm } from "@/components/ProfileForm";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CompanyProfile = () => {
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    console.log("Company profile data:", data);
    // In a real app, we would save the data to a backend
    navigate("/dashboard/company");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Complete Your Company Profile</h1>
            <p className="text-muted-foreground mb-8">
              Help us connect you with talented students who match your needs.
            </p>
            
            <div className="space-y-8">
              <ProfileForm userType="company" onSubmit={handleSubmit} />
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => navigate("/dashboard/company")}>
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

export default CompanyProfile;
