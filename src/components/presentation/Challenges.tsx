
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Lightbulb, Zap } from "lucide-react";

export function Challenges() {
  const challenges = [
    {
      title: "User Experience Design",
      description: "Creating intuitive interfaces for two different user types with distinct needs",
      solution: "Implemented separate user flows and dashboards optimized for each user type",
      status: "resolved",
      impact: "High"
    },
    {
      title: "Responsive Design Complexity",
      description: "Ensuring consistent experience across all device sizes and orientations",
      solution: "Adopted mobile-first design approach with systematic breakpoint strategy",
      status: "resolved",
      impact: "High"
    },
    {
      title: "State Management",
      description: "Managing complex application state across multiple user interactions",
      solution: "Leveraged TanStack Query for server state and Context API for client state",
      status: "resolved",
      impact: "Medium"
    },
    {
      title: "Performance Optimization",
      description: "Maintaining fast load times while delivering rich functionality",
      solution: "Implemented code splitting, lazy loading, and optimized asset delivery",
      status: "resolved",
      impact: "High"
    },
    {
      title: "TypeScript Integration",
      description: "Ensuring type safety across the entire application without compromising developer experience",
      solution: "Gradual TypeScript adoption with strict type checking and proper tooling",
      status: "resolved",
      impact: "Medium"
    },
    {
      title: "Component Architecture",
      description: "Building a scalable, maintainable component library",
      solution: "Created modular components with clear separation of concerns and reusability",
      status: "resolved",
      impact: "Medium"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Challenges Faced</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Development obstacles encountered and solutions implemented
        </p>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {challenges.map((challenge, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  {challenge.title}
                </CardTitle>
                <div className="flex gap-2">
                  <Badge variant={challenge.impact === 'High' ? 'destructive' : 'secondary'}>
                    {challenge.impact}
                  </Badge>
                  <Badge variant="outline" className="text-green-600">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Resolved
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 text-red-600">Challenge:</h4>
                <p className="text-muted-foreground text-sm">{challenge.description}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-green-600 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Solution:
                </h4>
                <p className="text-muted-foreground text-sm">{challenge.solution}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lessons Learned */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Zap className="h-6 w-6 text-primary" />
            Key Lessons Learned
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Technical Insights</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Mobile-first design significantly reduces development complexity</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>TypeScript investment pays off in long-term maintainability</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Component-based architecture enables rapid feature development</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Performance optimization should be considered from day one</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Development Process</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span>User-centered design prevents major redesigns later</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span>Iterative development allows for better user feedback integration</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span>Code quality tools (ESLint, Prettier) save significant debugging time</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span>Regular testing and validation prevent major issues</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Problem-Solving Approach */}
      <Card className="bg-muted/30">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">Our Problem-Solving Approach</h3>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Each challenge was approached systematically: identify the root cause, research best practices, 
              prototype solutions, test thoroughly, and implement with proper documentation. This methodology 
              ensured that solutions were not just quick fixes but sustainable, scalable improvements.
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <Badge variant="outline" className="p-2">Research-Driven</Badge>
              <Badge variant="outline" className="p-2">Iterative Solutions</Badge>
              <Badge variant="outline" className="p-2">User-Tested</Badge>
              <Badge variant="outline" className="p-2">Well-Documented</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
