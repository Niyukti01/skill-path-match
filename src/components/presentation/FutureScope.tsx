
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Rocket, Brain, Video, Smartphone, BarChart3, Users, MessageSquare, Award } from "lucide-react";

export function FutureScope() {
  const futureFeatures = [
    {
      icon: Brain,
      title: "AI Chat Assistant",
      description: "Intelligent chatbot for automated query resolution and interview scheduling",
      timeline: "Q2 2025",
      impact: "High",
      category: "ai"
    },
    {
      icon: Video,
      title: "Video Interviews",
      description: "Integrated video calling system for remote interviews and meetings",
      timeline: "Q3 2025",
      impact: "High",
      category: "communication"
    },
    {
      icon: Award,
      title: "Skill Assessments",
      description: "Built-in coding tests and skill evaluation tools",
      timeline: "Q2 2025",
      impact: "Medium",
      category: "assessment"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Comprehensive recruitment metrics and performance insights",
      timeline: "Q4 2025",
      impact: "Medium",
      category: "analytics"
    },
    {
      icon: Smartphone,
      title: "Native Mobile Apps",
      description: "iOS and Android applications with native features",
      timeline: "Q3 2025",
      impact: "High",
      category: "mobile"
    },
    {
      icon: Users,
      title: "Mentorship Program",
      description: "Connect students with industry mentors for career guidance",
      timeline: "Q4 2025",
      impact: "Medium",
      category: "community"
    }
  ];

  const integrations = [
    "University Management Systems",
    "HR Platforms (Workday, BambooHR)",
    "Learning Management Systems",
    "Social Media Platforms",
    "Calendar Applications",
    "Email Marketing Tools",
    "CRM Systems",
    "Analytics Platforms"
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Future Scope</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Roadmap for expanding InternLink's capabilities and reach
        </p>
      </div>

      <Tabs defaultValue="features" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="features">Upcoming Features</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="expansion">Market Expansion</TabsTrigger>
        </TabsList>

        <TabsContent value="features" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {futureFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                    <Badge variant={feature.impact === 'High' ? 'default' : 'secondary'}>
                      {feature.impact}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{feature.description}</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline">{feature.timeline}</Badge>
                    <Badge variant="secondary" className="text-xs">
                      {feature.category.charAt(0).toUpperCase() + feature.category.slice(1)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <MessageSquare className="h-6 w-6 text-primary" />
                Planned Integrations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Educational Systems</h4>
                  <div className="space-y-3">
                    {integrations.slice(0, 4).map((integration, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>{integration}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Business Tools</h4>
                  <div className="space-y-3">
                    {integrations.slice(4).map((integration, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span>{integration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-none">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold">Integration Benefits</h3>
                <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                  These integrations will create a seamless ecosystem where InternLink becomes the central hub 
                  for all internship-related activities, connecting with existing tools and workflows used by 
                  universities and companies.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expansion" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Rocket className="h-6 w-6 text-primary" />
                  Geographic Expansion
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h4 className="font-semibold">Phase 1: Regional Growth</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <span>Expand to neighboring states and regions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <span>Partner with regional universities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <span>Localize content and features</span>
                  </li>
                </ul>

                <h4 className="font-semibold pt-4">Phase 2: National Presence</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <span>Launch nationwide marketing campaigns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <span>Establish enterprise partnerships</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <span>Scale infrastructure for high volume</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-accent" />
                  Market Diversification
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h4 className="font-semibold">Target Segments</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <span>Graduate students and PhD candidates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <span>Career changers and bootcamp graduates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <span>International students</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <span>Part-time and remote opportunities</span>
                  </li>
                </ul>

                <h4 className="font-semibold pt-4">Industry Expansion</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <span>Healthcare and biotech</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <span>Non-profit and government</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <span>Creative industries</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Timeline Overview */}
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="text-center">Development Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-3">
              <h4 className="font-bold text-lg text-primary">Q1 2025</h4>
              <p className="text-sm text-muted-foreground">Platform optimization and user feedback integration</p>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-lg text-primary">Q2 2025</h4>
              <p className="text-sm text-muted-foreground">AI features and skill assessment tools</p>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-lg text-primary">Q3 2025</h4>
              <p className="text-sm text-muted-foreground">Video interviews and mobile apps</p>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-lg text-primary">Q4 2025</h4>
              <p className="text-sm text-muted-foreground">Advanced analytics and mentorship program</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
