
import { Navbar } from "@/components/Navbar";
import { ProfileForm } from "@/components/ProfileForm";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { differenceInYears } from "date-fns";
import { toast } from "@/components/ui/sonner";
import { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const StudentProfile = () => {
  const navigate = useNavigate();
  const [showApplications, setShowApplications] = useState(false);

  // Mock data for applications
  const applications = [
    { id: 1, company: "Tech Innovations", position: "Frontend Developer Intern", status: "In Review", appliedDate: "2025-04-28" },
    { id: 2, company: "DataViz Corp", position: "Data Science Intern", status: "Interview Scheduled", appliedDate: "2025-04-20" },
    { id: 3, company: "CreativeWorks", position: "UI/UX Design Intern", status: "Applied", appliedDate: "2025-05-05" },
  ];

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

  const toggleApplications = () => {
    setShowApplications(!showApplications);
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
                  <div className="space-x-3">
                    <Button 
                      variant="outline"
                      onClick={toggleApplications}
                      className="border-amber-400 text-amber-700 hover:bg-amber-50"
                    >
                      {showApplications ? "Hide Applications" : "View Applications"}
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
                
                {showApplications && (
                  <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h2 className="text-xl font-semibold text-amber-800 mb-4">Your Applications</h2>
                    
                    {applications.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Company</TableHead>
                            <TableHead>Position</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Applied Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {applications.map((app) => (
                            <TableRow key={app.id}>
                              <TableCell className="font-medium">{app.company}</TableCell>
                              <TableCell>{app.position}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  app.status === "In Review" 
                                    ? "bg-amber-100 text-amber-800" 
                                    : app.status === "Interview Scheduled" 
                                      ? "bg-green-100 text-green-800"
                                      : "bg-gray-100 text-gray-800"
                                }`}>
                                  {app.status}
                                </span>
                              </TableCell>
                              <TableCell>{app.appliedDate}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <p className="text-center text-amber-600 py-4">You haven't submitted any applications yet.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentProfile;
