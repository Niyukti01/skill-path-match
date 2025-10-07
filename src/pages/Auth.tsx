import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { z } from "zod";

// Input validation schemas
const emailSchema = z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters");

const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

const nameSchema = z.string()
  .trim()
  .min(2, "Name must be at least 2 characters")
  .max(100, "Name must be less than 100 characters")
  .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes");

const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required")
});

const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

const Auth = () => {
  const { signUp, signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState("login");
  const [userType, setUserType] = useState<"student" | "company">("student");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent, type: "login" | "register") => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (type === "register") {
        // Validate registration data using Zod
        const validationResult = registerSchema.safeParse(formData);
        
        if (!validationResult.success) {
          const firstError = validationResult.error.errors[0];
          toast({
            title: "Validation Error",
            description: firstError.message,
            variant: "destructive"
          });
          setIsSubmitting(false);
          return;
        }
        
        const result = await signUp(
          validationResult.data.email,
          validationResult.data.password,
          {
            name: validationResult.data.name,
            userType
          }
        );
        
        if (!result.error) {
          toast({
            title: "Success!",
            description: "Account created successfully. You can now sign in.",
          });
          // Switch to login tab after successful registration
          setActiveTab("login");
          setFormData(prev => ({ ...prev, password: "", confirmPassword: "" }));
        }
      } else {
        // Validate login data using Zod
        const validationResult = loginSchema.safeParse({
          email: formData.email,
          password: formData.password
        });
        
        if (!validationResult.success) {
          const firstError = validationResult.error.errors[0];
          toast({
            title: "Validation Error",
            description: firstError.message,
            variant: "destructive"
          });
          setIsSubmitting(false);
          return;
        }

        const { error } = await signIn(
          validationResult.data.email,
          validationResult.data.password
        );
        
        if (!error) {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-10 bg-gradient-to-br from-background via-background/95 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="shadow-elegant border-border/50">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl font-bold">Welcome to InternLink</CardTitle>
                <CardDescription>
                  Connect students with companies for internship opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Sign In</TabsTrigger>
                    <TabsTrigger value="register">Sign Up</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login" className="space-y-4 mt-6">
                    <form onSubmit={(e) => handleSubmit(e, "login")} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <LoadingSpinner size="sm" className="mr-2" />
                            Signing in...
                          </>
                        ) : (
                          "Sign In"
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="register" className="space-y-4 mt-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">I am a:</Label>
                        <div className="flex gap-2 mt-2">
                          <Button
                            type="button"
                            variant={userType === "student" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setUserType("student")}
                            className="flex-1"
                          >
                            <Badge variant={userType === "student" ? "secondary" : "outline"} className="mr-2">
                              Student
                            </Badge>
                            Looking for internships
                          </Button>
                          <Button
                            type="button"
                            variant={userType === "company" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setUserType("company")}
                            className="flex-1"
                          >
                            <Badge variant={userType === "company" ? "secondary" : "outline"} className="mr-2">
                              Company
                            </Badge>
                            Hiring interns
                          </Button>
                        </div>
                      </div>
                      
                      <form onSubmit={(e) => handleSubmit(e, "register")} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">
                            {userType === "company" ? "Company Name" : "Full Name"}
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder={userType === "company" ? "Enter company name" : "Enter your full name"}
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm Password</Label>
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <>
                              <LoadingSpinner size="sm" className="mr-2" />
                              Creating account...
                            </>
                          ) : (
                            "Create Account"
                          )}
                        </Button>
                      </form>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Auth;