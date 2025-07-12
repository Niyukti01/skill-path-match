
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, User, MessageSquare, BarChart3, Shield, Smartphone, Brain, Bell } from "lucide-react";

export function Features() {
  const coreFeatures = [
    {
      icon: Brain,
      title: "AI-Powered Matching",
      description: "Smart algorithm analyzes skills, interests, and compatibility for perfect matches",
      details: ["Skill-based matching", "Interest alignment", "Compatibility scoring", "Learning preferences"]
    },
    {
      icon: User,
      title: "Dual Profile System",
      description: "Separate optimized experiences for students and companies",
      details: ["Student portfolios", "Company showcases", "Skill verification", "Cultural fit assessment"]
    },
    {
      icon: MessageSquare,
      title: "Direct Communication",
      description: "Built-in messaging system for seamless interaction",
      details: ["Real-time messaging", "File sharing", "Interview scheduling", "Video call integration"]
    },
    {
      icon: BarChart3,
      title: "Application Tracking",
      description: "Real-time status updates and comprehensive analytics",
      details: ["Application status", "Progress tracking", "Performance metrics", "Success analytics"]
    },
    {
      icon: Shield,
      title: "Verification System",
      description: "Rigorous verification for companies and opportunities",
      details: ["Company verification", "Opportunity validation", "Identity confirmation", "Quality assurance"]
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Responsive design optimized for all devices",
      details: ["PWA support", "Offline capabilities", "Touch-optimized", "Cross-platform"]
    }
  ];

  const additionalFeatures = [
    "Smart notifications and alerts",
    "Advanced search and filtering",
    "Company culture insights",
    "Skill assessment tools",
    "Interview preparation resources",
    "Mentorship matching",
    "Success story sharing",
    "Analytics dashboard"
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Key Features</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Comprehensive tools designed to revolutionize the internship experience
        </p>
      </div>

      <Tabs defaultValue="core" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="core">Core Features</TabsTrigger>
          <TabsTrigger value="additional">Additional Features</TabsTrigger>
        </TabsList>
        
        <TabsContent value="core" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{feature.description}</p>
                  <div className="space-y-2">
                    {feature.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <span className="text-sm">{detail}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="additional" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Bell className="h-6 w-6 text-accent" />
                Additional Features & Enhancements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {additionalFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Feature Highlight */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold">Why These Features Matter</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold">Efficiency</h4>
                <p className="text-sm text-muted-foreground">
                  Reduces time-to-match from weeks to hours through intelligent automation
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                  <User className="h-6 w-6 text-accent" />
                </div>
                <h4 className="font-semibold">Personalization</h4>
                <p className="text-sm text-muted-foreground">
                  Every interaction is tailored to individual needs and preferences
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold">Trust</h4>
                <p className="text-sm text-muted-foreground">
                  Verification systems ensure quality and legitimacy of all opportunities
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
