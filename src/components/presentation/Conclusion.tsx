
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Target, Users, Zap, Trophy, ArrowRight } from "lucide-react";

export function Conclusion() {
  const achievements = [
    {
      icon: Users,
      title: "User-Centric Design",
      description: "Created separate optimized experiences for students and companies"
    },
    {
      icon: Zap,
      title: "Modern Technology",
      description: "Built with cutting-edge React, TypeScript, and modern web standards"
    },
    {
      icon: Target,
      title: "Problem-Focused Solution",
      description: "Directly addresses real challenges in the internship matching process"
    },
    {
      icon: Trophy,
      title: "Scalable Architecture",
      description: "Designed for growth and future feature expansion"
    }
  ];

  const impact = [
    { metric: "95%", label: "Match Success Rate", description: "Students finding relevant opportunities" },
    { metric: "48hrs", label: "Average Match Time", description: "From profile creation to first match" },
    { metric: "75%", label: "Time Reduction", description: "In company hiring process" },
    { metric: "10,000+", label: "Target Users", description: "Students and companies to serve" }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Conclusion</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          InternLink's impact on the internship ecosystem and future potential
        </p>
      </div>

      {/* Project Summary */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold">Project Summary</h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              InternLink successfully addresses the critical gap in the internship market by providing 
              a specialized, intelligent platform that connects students with meaningful opportunities. 
              Through modern technology, user-centric design, and AI-powered matching, we've created 
              a solution that benefits both students seeking career growth and companies looking for 
              fresh talent.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Key Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((achievement, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <achievement.icon className="h-6 w-6 text-primary" />
                </div>
                {achievement.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{achievement.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Impact Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">Expected Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impact.map((item, index) => (
              <div key={index} className="text-center space-y-2">
                <h3 className="text-3xl font-bold text-primary">{item.metric}</h3>
                <h4 className="font-semibold">{item.label}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Success Factors */}
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-green-500" />
            Key Success Factors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Technical Excellence</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Modern, scalable technology stack</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Responsive, mobile-first design</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Type-safe development with TypeScript</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Performance-optimized architecture</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">User Experience</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Intuitive, user-friendly interface</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Specialized for internship matching</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Dual-optimized experiences for different user types</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Comprehensive feature set addressing real needs</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Future Vision */}
      <Card className="bg-gradient-to-r from-accent/5 to-primary/5 border-none">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold">Future Vision</h3>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              InternLink is positioned to become the leading platform for internship connections, 
              with plans for AI enhancement, mobile apps, and expanded integrations. Our roadmap 
              focuses on continuous improvement and scaling to serve the growing demand for 
              quality internship opportunities.
            </p>
            <div className="flex items-center justify-center gap-4 pt-4">
              <Badge variant="outline" className="p-3">Market Leader</Badge>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <Badge variant="outline" className="p-3">AI-Powered</Badge>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <Badge variant="outline" className="p-3">Global Platform</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Final Statement */}
      <Card className="bg-primary text-primary-foreground">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">InternLink: Bridging Dreams with Opportunities</h3>
            <p className="text-lg opacity-90 max-w-4xl mx-auto leading-relaxed">
              Through innovative technology, thoughtful design, and a deep understanding of user needs, 
              InternLink transforms the internship discovery process, creating value for students, 
              companies, and the broader professional ecosystem.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
