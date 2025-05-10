
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Briefcase, Code, Database } from "lucide-react";

interface ProfileFormProps {
  userType: "student" | "company";
  onSubmit: (data: any) => void;
}

const internshipOptions = [
  { value: "marketing", label: "Marketing", icon: <Briefcase className="mr-2" /> },
  { value: "data_science", label: "Data Science", icon: <Database className="mr-2" /> },
  { value: "back_office", label: "Back Office", icon: <Briefcase className="mr-2" /> },
  { value: "data_entry", label: "Data Entry", icon: <Database className="mr-2" /> },
  { value: "web_development", label: "Web Development", icon: <Code className="mr-2" /> },
  { value: "mobile_development", label: "Mobile App Development", icon: <Code className="mr-2" /> },
  { value: "ui_ux_design", label: "UI/UX Design", icon: <Briefcase className="mr-2" /> },
  { value: "software_testing", label: "Software Testing", icon: <Code className="mr-2" /> },
  { value: "cyber_security", label: "Cyber Security", icon: <Database className="mr-2" /> },
  { value: "cloud_computing", label: "Cloud Computing", icon: <Database className="mr-2" /> },
  { value: "artificial_intelligence", label: "Artificial Intelligence", icon: <Database className="mr-2" /> },
  { value: "machine_learning", label: "Machine Learning", icon: <Database className="mr-2" /> }
];

export function ProfileForm({ userType, onSubmit }: ProfileFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    bio: "",
    skills: "",
    website: "",
    phone: "",
    internshipType: "",
  });

  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
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
            
            <div className="space-y-2">
              <Label htmlFor="internshipType">
                {userType === "student" ? "Interested In" : "Looking For"}
              </Label>
              <Select 
                value={formData.internshipType} 
                onValueChange={(value) => handleSelectChange("internshipType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select internship type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {internshipOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center">
                          {option.icon}
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
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
