import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ArrowLeft, Save } from "lucide-react";

const ProfileEdit = () => {
  const { user, profile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    skills: "",
    goals: "",
    requirements: "",
    industry: "",
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        skills: profile.skills || "",
        goals: profile.goals || "",
        requirements: profile.requirements || "",
        industry: profile.industry || "",
      });
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    // Validate required fields
    if (!formData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Name is required",
        variant: "destructive"
      });
      return;
    }

    setSaving(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: formData.name.trim(),
          skills: formData.skills.trim(),
          goals: formData.goals.trim(),
          requirements: formData.requirements.trim(),
          industry: formData.industry.trim(),
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your profile has been updated successfully",
      });

      // Navigate back to dashboard
      navigate("/dashboard");
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
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
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
              <CardDescription>
                Update your profile information. Email cannot be changed for security reasons.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">
                    Email address cannot be changed
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">
                    {profile.user_type === 'company' ? 'Company Name' : 'Full Name'} *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your name"
                  />
                </div>

                {profile.user_type === 'student' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="skills">Skills</Label>
                      <Textarea
                        id="skills"
                        name="skills"
                        value={formData.skills}
                        onChange={handleInputChange}
                        placeholder="List your skills (e.g., JavaScript, Python, React)"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="goals">Career Goals</Label>
                      <Textarea
                        id="goals"
                        name="goals"
                        value={formData.goals}
                        onChange={handleInputChange}
                        placeholder="Describe your career goals and aspirations"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="requirements">Internship Requirements</Label>
                      <Textarea
                        id="requirements"
                        name="requirements"
                        value={formData.requirements}
                        onChange={handleInputChange}
                        placeholder="What are you looking for in an internship?"
                        rows={3}
                      />
                    </div>
                  </>
                )}

                {profile.user_type === 'company' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Input
                        id="industry"
                        name="industry"
                        type="text"
                        value={formData.industry}
                        onChange={handleInputChange}
                        placeholder="e.g., Technology, Healthcare, Finance"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="requirements">Company Requirements</Label>
                      <Textarea
                        id="requirements"
                        name="requirements"
                        value={formData.requirements}
                        onChange={handleInputChange}
                        placeholder="What qualities do you look for in interns?"
                        rows={3}
                      />
                    </div>
                  </>
                )}

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    disabled={saving}
                    className="flex-1"
                  >
                    {saving ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/dashboard")}
                    disabled={saving}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ProfileEdit;
