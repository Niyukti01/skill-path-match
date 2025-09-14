import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { UserStats } from "@/components/UserStats";
import { LoginActivity } from "@/components/LoginActivity";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Users, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserData {
  id: string;
  name: string;
  email: string;
  user_type: string;
  role: string;
  created_at: string;
  last_login_at: string;
  login_count: number;
}

interface LoginData {
  id: string;
  user_id: string;
  email: string;
  role: string;
  user_type: string;
  login_time: string;
}

const NewAdminDashboard = () => {
  const { user, profile, loading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [users, setUsers] = useState<UserData[]>([]);
  const [recentLogins, setRecentLogins] = useState<LoginData[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/auth");
    } else if (user && isAdmin) {
      fetchAdminData();
    }
  }, [user, loading, isAdmin, navigate]);

  const fetchAdminData = async () => {
    try {
      setLoadingData(true);
      
      // Fetch all users
      const { data: usersData, error: usersError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (usersError) throw usersError;
      setUsers(usersData || []);

      // Fetch recent logins
      const { data: loginsData, error: loginsError } = await supabase
        .from('user_logins')
        .select('*')
        .order('login_time', { ascending: false })
        .limit(50);
      
      if (loginsError) throw loginsError;
      setRecentLogins(loginsData || []);
      
    } catch (error: any) {
      console.error('Error fetching admin data:', error);
      toast({
        title: "Error loading admin data",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoadingData(false);
    }
  };

  const exportUserData = () => {
    const csvContent = [
      ["Name", "Email", "Type", "Role", "Created At", "Last Login", "Login Count"].join(","),
      ...users.map(user => [
        user.name,
        user.email,
        user.user_type,
        user.role,
        new Date(user.created_at).toLocaleDateString(),
        user.last_login_at ? new Date(user.last_login_at).toLocaleDateString() : 'Never',
        user.login_count || 0
      ].join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `internlink-users-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Export successful",
      description: "User data has been exported to CSV file"
    });
  };

  const exportLoginData = () => {
    const csvContent = [
      ["Email", "User Type", "Role", "Login Time"].join(","),
      ...recentLogins.map(login => [
        login.email,
        login.user_type,
        login.role,
        new Date(login.login_time).toLocaleString()
      ].join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `internlink-logins-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Export successful",
      description: "Login data has been exported to CSV file"
    });
  };

  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
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
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Manage users and monitor platform activity
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate("/")}>
                <Eye className="w-4 h-4 mr-2" />
                View Site
              </Button>
            </div>
          </div>

          {/* Statistics */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Platform Overview</h2>
            <UserStats />
          </div>

          {/* Activity Charts */}
          <LoginActivity />

          {/* Users Management */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>All Users</CardTitle>
                <CardDescription>
                  Manage registered users ({users.length} total)
                </CardDescription>
              </div>
              <Button onClick={exportUserData} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Logins</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.slice(0, 10).map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.user_type === 'student' ? 'default' : 'secondary'}>
                            {user.user_type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.role === 'admin' ? 'destructive' : 'outline'}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          {user.last_login_at 
                            ? new Date(user.last_login_at).toLocaleDateString()
                            : 'Never'
                          }
                        </TableCell>
                        <TableCell>{user.login_count || 0}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {users.length > 10 && (
                <p className="text-sm text-muted-foreground mt-4">
                  Showing 10 of {users.length} users. Export CSV to see all users.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Recent Login Activity */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Recent Login Activity</CardTitle>
                <CardDescription>
                  Latest user login sessions
                </CardDescription>
              </div>
              <Button onClick={exportLoginData} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>User Type</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Login Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentLogins.slice(0, 15).map((login) => (
                      <TableRow key={login.id}>
                        <TableCell className="font-medium">{login.email}</TableCell>
                        <TableCell>
                          <Badge variant={login.user_type === 'student' ? 'default' : 'secondary'}>
                            {login.user_type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={login.role === 'admin' ? 'destructive' : 'outline'}>
                            {login.role}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(login.login_time).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {recentLogins.length > 15 && (
                <p className="text-sm text-muted-foreground mt-4">
                  Showing 15 of {recentLogins.length} login records. Export CSV to see all records.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default NewAdminDashboard;