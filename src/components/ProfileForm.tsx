
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Briefcase, Code, Database, Calendar as CalendarLucide, GraduationCap, School } from "lucide-react";
import { cn } from "@/lib/utils";

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

const qualificationOptions = [
  { value: "high_school", label: "High School", icon: <School className="mr-2" /> },
  { value: "associates", label: "Associate's Degree", icon: <GraduationCap className="mr-2" /> },
  { value: "bachelors", label: "Bachelor's Degree", icon: <GraduationCap className="mr-2" /> },
  { value: "masters", label: "Master's Degree", icon: <GraduationCap className="mr-2" /> },
  { value: "phd", label: "PhD", icon: <GraduationCap className="mr-2" /> },
  { value: "certification", label: "Professional Certification", icon: <School className="mr-2" /> },
  { value: "diploma", label: "Diploma", icon: <School className="mr-2" /> },
  { value: "other", label: "Other", icon: <School className="mr-2" /> }
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
    dob: undefined as Date | undefined,
    qualification: ""
  });

  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData(prev => ({ ...prev, dob: date }));
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
        <form id="profile-form" onSubmit={handleSubmit} className="space-y-6">
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
            
            {userType === "student" && (
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="dob"
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal flex justify-between items-center",
                        !formData.dob && "text-muted-foreground"
                      )}
                    >
                      {formData.dob ? format(formData.dob, "PPP") : <span>Select your date of birth</span>}
                      <CalendarIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.dob}
                      onSelect={handleDateChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
            
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
              <>
                <div className="space-y-2">
                  <Label htmlFor="qualification">Last Qualification</Label>
                  <Select 
                    value={formData.qualification} 
                    onValueChange={(value) => handleSelectChange("qualification", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select qualification" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {qualificationOptions.map(option => (
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
              </>
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
