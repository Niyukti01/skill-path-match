
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { useParams, Link } from "react-router-dom";
import { Search, User, Building2, Briefcase, Bell } from "lucide-react";

const Dashboard = () => {
  const { userType } = useParams<{ userType: string }>();
  const isStudent = userType === "student";

  // Mock data - in a real app, this would come from an API
  const studentDashboardData = {
    recentMatches: [
      { id: 1, company: "Tech Innovations", position: "Frontend Developer Intern", location: "San Francisco, CA", match: "85%" },
      { id: 2, company: "DataViz Corp", position: "Data Science Intern", location: "Remote", match: "78%" },
      { id: 3, company: "CreativeWorks", position: "UI/UX Design Intern", location: "New York, NY", match: "72%" },
    ],
    notifications: [
      { id: 1, message: "Tech Innovations viewed your profile", time: "2 hours ago" },
      { id: 2, message: "New internship matches are available", time: "Yesterday" },
      { id: 3, message: "Your application has been reviewed", time: "3 days ago" },
    ]
  };

  const companyDashboardData = {
    recentApplicants: [
      { id: 1, name: "Alex Johnson", position: "Frontend Developer Intern", university: "MIT", match: "92%" },
      { id: 2, name: "Sam Wilson", position: "Data Science Intern", university: "Stanford", match: "86%" },
      { id: 3, name: "Jordan Smith", position: "UI/UX Design Intern", university: "RISD", match: "79%" },
    ],
    activeListings: [
      { id: 1, position: "Frontend Developer Intern", applicants: 12, posted: "5 days ago" },
      { id: 2, position: "Data Science Intern", applicants: 8, posted: "1 week ago" },
      { id: 3, position: "UI/UX Design Intern", applicants: 15, posted: "3 days ago" },
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">
              {isStudent ? "Student Dashboard" : "Company Dashboard"}
            </h1>
            <p className="text-muted-foreground">
              {isStudent 
                ? "Find your perfect internship match" 
                : "Connect with talented students for your internship positions"
              }
            </p>
          </header>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">
                      {isStudent ? "Matching Score" : "Active Positions"}
                    </p>
                    <h3 className="text-2xl font-bold">
                      {isStudent ? "78%" : "3"}
                    </h3>
                  </div>
                  <div className="bg-primary-foreground/20 p-2 rounded-full">
                    {isStudent ? <Search className="h-5 w-5" /> : <Briefcase className="h-5 w-5" />}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {isStudent ? "Profile Views" : "Profile Views"}
                    </p>
                    <h3 className="text-2xl font-bold">
                      {isStudent ? "24" : "47"}
                    </h3>
                  </div>
                  <div className="bg-secondary p-2 rounded-full">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {isStudent ? "Applications" : "Total Applicants"}
                    </p>
                    <h3 className="text-2xl font-bold">
                      {isStudent ? "5" : "35"}
                    </h3>
                  </div>
                  <div className="bg-secondary p-2 rounded-full">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Notifications
                    </p>
                    <h3 className="text-2xl font-bold">
                      {isStudent ? "3" : "7"}
                    </h3>
                  </div>
                  <div className="bg-secondary p-2 rounded-full">
                    <Bell className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>{isStudent ? "Recommended Matches" : "Recent Applicants"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {isStudent ? (
                      studentDashboardData.recentMatches.map((match) => (
                        <div key={match.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                          <div>
                            <h4 className="font-medium">{match.company}</h4>
                            <p className="text-sm text-muted-foreground">{match.position}</p>
                            <p className="text-xs text-muted-foreground">{match.location}</p>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-sm font-medium text-primary">{match.match} match</span>
                            <Button size="sm" className="mt-2">Apply Now</Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      companyDashboardData.recentApplicants.map((applicant) => (
                        <div key={applicant.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                          <div>
                            <h4 className="font-medium">{applicant.name}</h4>
                            <p className="text-sm text-muted-foreground">{applicant.position}</p>
                            <p className="text-xs text-muted-foreground">{applicant.university}</p>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-sm font-medium text-primary">{applicant.match} match</span>
                            <Button size="sm" className="mt-2">View Profile</Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="mt-4 text-center">
                    <Link to="#" className="text-primary hover:underline">
                      {isStudent ? "View all matches" : "View all applicants"}
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>
                    {isStudent ? "Recent Notifications" : "Active Listings"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isStudent ? (
                    <div className="space-y-4">
                      {studentDashboardData.notifications.map((notification) => (
                        <div key={notification.id} className="p-3 border-b last:border-0">
                          <p className="text-sm">{notification.message}</p>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                      ))}
                      <div className="pt-2 text-center">
                        <Link to="#" className="text-primary hover:underline text-sm">
                          View all notifications
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {companyDashboardData.activeListings.map((listing) => (
                        <div key={listing.id} className="p-3 border-b last:border-0">
                          <p className="font-medium">{listing.position}</p>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{listing.applicants} applicants</span>
                            <span>Posted {listing.posted}</span>
                          </div>
                        </div>
                      ))}
                      <div className="pt-2">
                        <Button className="w-full">
                          Post New Position
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Complete Your Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {isStudent 
                        ? "Add more details to your profile to increase your match rate with companies."
                        : "Complete your company profile to attract the best candidates for your positions."
                      }
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full w-3/4"></div>
                    </div>
                    <p className="text-sm text-muted-foreground">Profile completion: 75%</p>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to={`/profile/${userType}`}>
                        Complete Profile
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
