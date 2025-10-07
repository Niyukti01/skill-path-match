import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Mail, Phone, MapPin, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Students = () => {
  const { user, profile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [students, setStudents] = useState<any[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    } else if (!authLoading && profile?.user_type !== 'company' && profile?.role !== 'admin') {
      toast({
        title: "Access Denied",
        description: "Only companies can view student profiles.",
        variant: "destructive"
      });
      navigate("/dashboard");
    }
  }, [user, profile, authLoading, navigate, toast]);

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    const filtered = students.filter(student =>
      student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.skills?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.goals?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchTerm, students]);

  const fetchStudents = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_type', 'student')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setStudents(data || []);
      setFilteredStudents(data || []);
    } catch (error: any) {
      console.error('Error fetching students:', error);
      toast({
        title: "Error",
        description: "Failed to load student profiles. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !profile || (profile.user_type !== 'company' && profile.role !== 'admin')) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Student Profiles</h1>
            <p className="text-muted-foreground mt-1">
              Browse and connect with talented students looking for internship opportunities
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by name, skills, or goals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={fetchStudents} variant="outline">
              Refresh
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            Showing {filteredStudents.length} of {students.length} students
          </div>

          {filteredStudents.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                {searchTerm ? "No students match your search criteria." : "No students registered yet."}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStudents.map((student) => {
                const hasDetails = student.skills || student.goals || student.requirements || student.industry;
                
                return (
                  <Card key={student.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl">{student.name}</CardTitle>
                          <Badge variant="secondary" className="mt-2">
                            Student
                          </Badge>
                        </div>
                        <GraduationCap className="w-8 h-8 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        {student.email && (
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <span className="truncate text-muted-foreground italic">
                              Email available in detail view
                            </span>
                          </div>
                        )}
                        
                        {!hasDetails ? (
                          <div className="py-4 text-center">
                            <p className="text-sm text-muted-foreground italic">
                              No details filled yet
                            </p>
                          </div>
                        ) : (
                          <>
                            {student.skills && (
                              <div>
                                <p className="text-sm font-medium mb-1">Skills</p>
                                <p className="text-sm text-muted-foreground line-clamp-2">{student.skills}</p>
                              </div>
                            )}
                            
                            {student.goals && (
                              <div>
                                <p className="text-sm font-medium mb-1">Goals</p>
                                <p className="text-sm text-muted-foreground line-clamp-2">{student.goals}</p>
                              </div>
                            )}
                          </>
                        )}

                        {student.created_at && (
                          <div className="pt-2 border-t">
                            <p className="text-xs text-muted-foreground">
                              Member since {new Date(student.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        )}
                      </div>

                      <Button 
                        className="w-full" 
                        onClick={() => navigate(`/students/${student.id}`)}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Students;