import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Navbar } from "@/components/Navbar";
import { UserStats } from "@/components/UserStats";
import { LoginActivity } from "@/components/LoginActivity";
import { StudentsList } from "@/components/StudentsList";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, User, Shield } from "lucide-react";

const NewDashboard = () => {
  const { user, profile, loading, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {profile.name}!</h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={profile.user_type === 'student' ? 'default' : 'secondary'}>
                  {profile.user_type === 'student' ? 'Student' : 'Company'}
                </Badge>
                {isAdmin && (
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    Admin
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground mt-1">
                Last login: {profile.last_login_at ? new Date(profile.last_login_at).toLocaleString() : 'First time'}
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate(`/profile/${profile.user_type}`)}>
                <User className="w-4 h-4 mr-2" />
                My Profile
              </Button>
              {isAdmin && (
                <Button variant="outline" size="sm" onClick={() => navigate("/admin")}>
                  <Settings className="w-4 h-4 mr-2" />
                  Admin Panel
                </Button>
              )}
            </div>
          </div>

          {/* Statistics Cards */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Platform Statistics</h2>
            <UserStats />
          </div>

          {/* Activity Overview */}
          <LoginActivity />

          {/* User Profile Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Your Profile Summary</CardTitle>
              <CardDescription>
                Your account information and activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Account Type</p>
                  <p className="text-lg capitalize">{profile.user_type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                  <p className="text-lg">{new Date(profile.created_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Logins</p>
                  <p className="text-lg">{profile.login_count || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Role-specific Information */}
          {profile.user_type === 'company' ? (
            <Card>
              <CardHeader>
                <CardTitle>Available Students</CardTitle>
                <CardDescription>
                  Browse and connect with talented students looking for internship opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StudentsList />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>For Students</CardTitle>
                <CardDescription>
                  View platform statistics and explore internship opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  You can view the total number of students and companies on the platform. Use this information to understand the community size and opportunities available.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default NewDashboard;