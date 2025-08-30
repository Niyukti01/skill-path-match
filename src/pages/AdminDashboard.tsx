import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Users, Building, GraduationCap, Clock, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  id: string;
  email: string;
  user_type: 'student' | 'company';
  user_role: 'user' | 'admin';
  name: string;
  created_at: string;
  last_login_at?: string;
  login_count?: number;
  last_login_ip?: string;
  last_user_agent?: string;
}

interface LoginSession {
  id: string;
  user_id: string;
  login_at: string;
  ip_address?: string;
  user_agent?: string;
  device_info?: any;
}

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [userTypeFilter, setUserTypeFilter] = useState<string>("all");
  const [stats, setStats] = useState({
    totalUsers: 0,
    students: 0,
    companies: 0,
    recentSignups: 0,
    totalLogins: 0
  });

  useEffect(() => {
    if (!isAdmin) return;
    fetchProfiles();
    
    // Set up real-time subscription
    const subscription = supabase
      .channel('profiles-changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'profiles' 
        }, 
        () => {
          fetchProfiles(); // Refresh data on any change
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [isAdmin]);

  useEffect(() => {
    // Filter profiles based on search and filters
    let filtered = profiles;
    
    if (searchTerm) {
      filtered = filtered.filter(profile => 
        profile.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (userTypeFilter !== "all") {
      filtered = filtered.filter(profile => profile.user_type === userTypeFilter);
    }
    
    setFilteredProfiles(filtered);
  }, [profiles, searchTerm, userTypeFilter]);

  const fetchProfiles = async () => {
    try {
      // Fetch auth users with profiles
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        console.error('Auth users fetch error:', authError);
        // Fallback to profiles table only
        return fetchProfilesOnly();
      }

      // Get profiles data
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*');

      if (profilesError) throw profilesError;

      // Combine auth and profile data
      const combinedData: UserProfile[] = authUsers.users.map(authUser => {
        const profile = profilesData?.find(p => p.id === authUser.id);
        return {
          id: authUser.id,
          email: authUser.email || 'No email',
          user_type: (authUser.user_metadata?.user_type || 'student') as 'student' | 'company',
          user_role: (profile?.role || 'user') as 'user' | 'admin',
          name: authUser.user_metadata?.name || profile?.skills || 'Unknown User',
          created_at: authUser.created_at,
          last_login_at: profile?.last_login_at,
          login_count: profile?.login_count || 0,
          last_login_ip: profile?.last_login_ip,
          last_user_agent: profile?.last_user_agent
        };
      });

      setProfiles(combinedData);
      
      // Calculate stats
      const totalUsers = combinedData.length;
      const students = combinedData.filter(p => p.user_type === 'student').length;
      const companies = combinedData.filter(p => p.user_type === 'company').length;
      const totalLogins = combinedData.reduce((sum, p) => sum + (p.login_count || 0), 0);
      
      // Recent signups in last 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const recentSignups = combinedData.filter(p => new Date(p.created_at) > sevenDaysAgo).length;
      
      setStats({ totalUsers, students, companies, recentSignups, totalLogins });
    } catch (error: any) {
      toast({
        title: "Error fetching users",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchProfilesOnly = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const profilesData: UserProfile[] = (data || []).map(profile => ({
        id: profile.id,
        email: 'Email not available',
        user_type: 'student' as const,
        user_role: (profile.role || 'user') as 'user' | 'admin',
        name: profile.skills || 'Unknown User',
        created_at: profile.created_at,
        last_login_at: profile.last_login_at,
        login_count: profile.login_count || 0,
        last_login_ip: profile.last_login_ip,
        last_user_agent: profile.last_user_agent
      }));

      setProfiles(profilesData);
      
      // Calculate stats
      const totalUsers = profilesData.length;
      const totalLogins = profilesData.reduce((sum, p) => sum + (p.login_count || 0), 0);
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const recentSignups = profilesData.filter(p => new Date(p.created_at) > sevenDaysAgo).length;
      
      setStats({ totalUsers, students: 0, companies: 0, recentSignups, totalLogins });
    } catch (error: any) {
      toast({
        title: "Error fetching profiles",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const formatLastLogin = (lastLogin?: string) => {
    if (!lastLogin) return 'Never';
    return new Date(lastLogin).toLocaleString();
  };

  const formatUserAgent = (userAgent?: string) => {
    if (!userAgent) return 'Unknown';
    
    // Extract browser and OS info
    const browserMatch = userAgent.match(/(Chrome|Firefox|Safari|Edge|Opera)\/(\d+)/);
    const osMatch = userAgent.match(/(Windows|Mac|Linux|Android|iOS)/);
    
    const browser = browserMatch ? `${browserMatch[1]} ${browserMatch[2]}` : 'Unknown';
    const os = osMatch ? osMatch[1] : 'Unknown';
    
    return `${browser} on ${os}`;
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Card>
            <CardHeader>
              <CardTitle className="text-destructive">Access Denied</CardTitle>
            </CardHeader>
            <CardContent>
              <p>You don't have permission to access this page. Admin access required.</p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-6 bg-gradient-to-br from-background via-background/95 to-primary/5">
        <div className="container mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage users and monitor platform activity</p>
            </div>
            <Button onClick={fetchProfiles} disabled={loading}>
              Refresh Data
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Students</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.students}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Companies</CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.companies}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recent Signups</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.recentSignups}</div>
                <p className="text-xs text-muted-foreground">Last 7 days</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Logins</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalLogins}</div>
                <p className="text-xs text-muted-foreground">All time</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, email, or user ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={userTypeFilter} onValueChange={setUserTypeFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="student">Students</SelectItem>
                    <SelectItem value="company">Companies</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Account Type</TableHead>
                        <TableHead>Registration Date</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead>Login Count</TableHead>
                        <TableHead>IP Address</TableHead>
                        <TableHead>Device Info</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProfiles.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                            No users found matching your criteria
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredProfiles.map((profile) => (
                          <TableRow key={profile.id}>
                            <TableCell className="font-mono text-xs">
                              {profile.id.substring(0, 8)}...
                            </TableCell>
                            <TableCell className="font-medium">
                              {profile.name}
                              {profile.user_role === 'admin' && (
                                <Badge variant="destructive" className="ml-2 text-xs">Admin</Badge>
                              )}
                            </TableCell>
                            <TableCell>{profile.email}</TableCell>
                            <TableCell>
                              <Badge variant={profile.user_type === 'student' ? 'default' : 'outline'}>
                                {profile.user_type}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {new Date(profile.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              {formatLastLogin(profile.last_login_at)}
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">
                                {profile.login_count || 0}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Globe className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs font-mono">
                                  {profile.last_login_ip || 'Unknown'}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="text-xs" title={profile.last_user_agent}>
                                {formatUserAgent(profile.last_user_agent)}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;