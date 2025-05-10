
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface ProfileFormProps {
  userType: "student" | "company";
  onSubmit: (data: any) => void;
}

export function ProfileForm({ userType, onSubmit }: ProfileFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    bio: "",
    skills: "",
    website: "",
    phone: "",
  });

  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved.",
    });
    onSubmit(formData);
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">{userType === "student" ? "Full Name" : "Company Name"}</Label>
              <Input 
                id="name" 
                name="name"
                placeholder={userType === "student" ? "John Doe" : "Acme Inc."} 
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email"
                type="email" 
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input 
                id="phone" 
                name="phone"
                placeholder="(123) 456-7890" 
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                name="location"
                placeholder="City, Country" 
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            
            {userType === "student" ? (
              <div className="space-y-2">
                <Label htmlFor="skills">Skills (comma separated)</Label>
                <Input 
                  id="skills" 
                  name="skills"
                  placeholder="React, TypeScript, Design..." 
                  value={formData.skills}
                  onChange={handleChange}
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input 
                  id="website" 
                  name="website"
                  placeholder="https://yourcompany.com" 
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>
            )}
            
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="bio">
                {userType === "student" ? "About Me" : "Company Description"}
              </Label>
              <Textarea 
                id="bio" 
                name="bio"
                placeholder={userType === "student" ? 
                  "Tell us about yourself, your studies, and what you're looking for..." : 
                  "Tell us about your company, culture, and what you're looking for in interns..."
                }
                className="min-h-[120px]"
                value={formData.bio}
                onChange={handleChange}
              />
            </div>
          </div>

          <Button type="submit" className="w-full">Save Profile</Button>
        </form>
      </CardContent>
    </Card>
  );
}
