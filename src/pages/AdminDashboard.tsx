import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Phone, Mail, MessageSquare, Users, Building, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  user_type: "student" | "company";
  user_role: string;
  company_name?: string;
  location?: string;
  bio?: string;
  created_at: string;
}

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    students: 0,
    companies: 0,
    recentSignups: 0
  });

  useEffect(() => {
    if (!isAdmin) return;
    fetchProfiles();
  }, [isAdmin]);

  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setProfiles(data || []);
      
      // Calculate stats
      const totalUsers = data?.length || 0;
      const students = data?.filter(p => p.user_type === 'student').length || 0;
      const companies = data?.filter(p => p.user_type === 'company').length || 0;
      
      // Recent signups in last 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const recentSignups = data?.filter(p => new Date(p.created_at) > sevenDaysAgo).length || 0;
      
      setStats({ totalUsers, students, companies, recentSignups });
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

  const handleCall = (phone?: string) => {
    if (!phone) {
      toast({
        title: "No phone number",
        description: "This user hasn't provided a phone number.",
        variant: "destructive"
      });
      return;
    }
    
    // Open phone dialer on mobile or show number on desktop
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      window.open(`tel:${phone}`);
    } else {
      navigator.clipboard.writeText(phone);
      toast({
        title: "Phone number copied",
        description: `${phone} has been copied to clipboard.`
      });
    }
  };

  const handleSMS = (phone?: string) => {
    if (!phone) {
      toast({
        title: "No phone number",
        description: "This user hasn't provided a phone number.",
        variant: "destructive"
      });
      return;
    }
    
    // Open SMS app
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      window.open(`sms:${phone}`);
    } else {
      toast({
        title: "SMS not available",
        description: "SMS is only available on mobile devices. Phone number copied to clipboard.",
      });
      navigator.clipboard.writeText(phone);
    }
  };

  const handleEmail = (email: string, name: string) => {
    const subject = "Welcome to InternLink Platform";
    const body = `Dear ${name},\n\nThank you for joining InternLink! We're excited to have you on our platform.\n\nBest regards,\nThe InternLink Team`;
    
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl);
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
              <p>You don't have permission to access this page.</p>
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
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <Button onClick={fetchProfiles} disabled={loading}>
              Refresh Data
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
          </div>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>Registered Users</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {profiles.map((profile) => (
                      <TableRow key={profile.id}>
                        <TableCell className="font-medium">
                          {profile.name}
                          {profile.user_role === 'admin' && (
                            <Badge variant="secondary" className="ml-2">Admin</Badge>
                          )}
                        </TableCell>
                        <TableCell>{profile.email}</TableCell>
                        <TableCell>
                          <Badge variant={profile.user_type === 'student' ? 'default' : 'outline'}>
                            {profile.user_type}
                          </Badge>
                        </TableCell>
                        <TableCell>{profile.phone || 'Not provided'}</TableCell>
                        <TableCell>{profile.location || 'Not provided'}</TableCell>
                        <TableCell>
                          {new Date(profile.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleCall(profile.phone)}
                              title="Call"
                            >
                              <Phone className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSMS(profile.phone)}
                              title="SMS"
                            >
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEmail(profile.email, profile.name)}
                              title="Email"
                            >
                              <Mail className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;