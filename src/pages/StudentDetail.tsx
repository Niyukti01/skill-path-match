import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Mail, 
  Calendar, 
  GraduationCap, 
  Target, 
  Briefcase,
  MapPin,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StudentProfile {
  id: string;
  name: string;
  email: string;
  skills: string;
  goals: string;
  requirements: string;
  industry: string;
  created_at: string;
  last_login_at: string | null;
  login_count: number;
}

const StudentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user, profile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);

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
    if (id) {
      fetchStudentDetail();
    }
  }, [id]);

  const fetchStudentDetail = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .eq('user_type', 'student')
        .single();

      if (error) throw error;

      setStudent(data);
    } catch (error: any) {
      console.error('Error fetching student details:', error);
      toast({
        title: "Error",
        description: "Failed to load student profile. Please try again.",
        variant: "destructive"
      });
      navigate("/students");
    } finally {
      setLoading(false);
    }
  };

  const hasDetails = (student: StudentProfile | null) => {
    if (!student) return false;
    return !!(student.skills || student.goals || student.requirements || student.industry);
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

  if (!student) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/students")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Students
        </Button>

        <div className="space-y-6">
          {/* Header Card */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-3xl">{student.name}</CardTitle>
                    <Badge variant="secondary">Student</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>{student.email}</span>
                  </div>
                </div>
                <GraduationCap className="w-12 h-12 text-primary" />
              </div>
            </CardHeader>
          </Card>

          {!hasDetails(student) ? (
            <Card>
              <CardContent className="py-12 text-center">
                <div className="max-w-md mx-auto space-y-4">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                    <GraduationCap className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">No Details Available</h3>
                  <p className="text-muted-foreground">
                    This student hasn't filled in their profile details yet. Please check back later.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Profile Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Skills */}
                {student.skills && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-primary" />
                        Skills & Expertise
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {student.skills}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Goals */}
                {student.goals && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-primary" />
                        Career Goals
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {student.goals}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Requirements */}
                {student.requirements && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        Requirements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {student.requirements}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Industry */}
                {student.industry && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-primary" />
                        Industry Interest
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {student.industry}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Activity Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Activity Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Member Since</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(student.created_at).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                    
                    {student.last_login_at && (
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Last Active</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(student.last_login_at).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <GraduationCap className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Platform Visits</p>
                        <p className="text-sm text-muted-foreground">
                          {student.login_count || 0} times
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Contact Actions */}
          <Card>
            <CardContent className="py-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  onClick={() => {
                    window.location.href = `mailto:${student.email}`;
                  }}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email Student
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(student.email);
                    toast({
                      title: "Email Copied",
                      description: "Student's email has been copied to clipboard."
                    });
                  }}
                >
                  Copy Email Address
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default StudentDetail;
