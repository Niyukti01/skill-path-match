
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [searchParams] = useSearchParams();
  const registerParam = searchParams.get("register");
  const userTypeParam = searchParams.get("type");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState(registerParam === "true" ? "register" : "login");
  const [userType, setUserType] = useState<"student" | "company">(
    userTypeParam === "company" ? "company" : "student"
  );

  const handleSubmit = (e: React.FormEvent, type: "login" | "register") => {
    e.preventDefault();
    
    if (type === "login") {
      toast({
        title: "Success",
        description: `Logged in as a ${userType}!`,
      });
      navigate(`/dashboard/${userType}`);
    } else {
      toast({
        title: "Account created",
        description: `Your ${userType} account has been created successfully!`,
      });
      navigate(`/profile/${userType}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h1 className="text-2xl font-bold text-center mb-6">
                {activeTab === "login" ? "Welcome Back" : "Create an Account"}
              </h1>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="login">Log In</TabsTrigger>
                  <TabsTrigger value="register">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={(e) => handleSubmit(e, "login")} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input id="login-email" type="email" placeholder="you@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="login-password">Password</Label>
                        <a href="#" className="text-sm text-primary hover:underline">
                          Forgot password?
                        </a>
                      </div>
                      <Input id="login-password" type="password" required />
                    </div>

                    <div className="space-y-2">
                      <Label>I am a:</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <Button
                          type="button"
                          variant={userType === "student" ? "default" : "outline"}
                          onClick={() => setUserType("student")}
                          className="w-full"
                        >
                          Student
                        </Button>
                        <Button
                          type="button"
                          variant={userType === "company" ? "default" : "outline"}
                          onClick={() => setUserType("company")}
                          className="w-full"
                        >
                          Company
                        </Button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full">Log In</Button>
                  </form>
                </TabsContent>

                <TabsContent value="register">
                  <form onSubmit={(e) => handleSubmit(e, "register")} className="space-y-4">
                    <div className="space-y-2">
                      <Label>I am a:</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <Button
                          type="button"
                          variant={userType === "student" ? "default" : "outline"}
                          onClick={() => setUserType("student")}
                          className="w-full"
                        >
                          Student
                        </Button>
                        <Button
                          type="button"
                          variant={userType === "company" ? "default" : "outline"}
                          onClick={() => setUserType("company")}
                          className="w-full"
                        >
                          Company
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-name">
                        {userType === "student" ? "Full Name" : "Company Name"}
                      </Label>
                      <Input 
                        id="register-name" 
                        placeholder={userType === "student" ? "John Doe" : "Acme Inc."} 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input id="register-email" type="email" placeholder="you@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <Input id="register-password" type="password" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-confirm-password">Confirm Password</Label>
                      <Input id="register-confirm-password" type="password" required />
                    </div>

                    <Button type="submit" className="w-full">Create Account</Button>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
