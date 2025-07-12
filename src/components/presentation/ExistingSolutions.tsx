
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Zap } from "lucide-react";

export function ExistingSolutions() {
  const competitors = [
    {
      name: "LinkedIn",
      type: "Professional Network",
      pros: ["Large user base", "Professional networking", "Company insights"],
      cons: ["Too generic for internships", "Overwhelming for students", "Poor filtering", "Complex interface"],
      color: "blue"
    },
    {
      name: "Internshala",
      type: "Internship Platform",
      pros: ["Internship focused", "Easy application process", "Decent user base"],
      cons: ["Limited company verification", "Basic matching", "Cluttered interface", "No relationship building"],
      color: "green"
    },
    {
      name: "Indeed/Glassdoor",
      type: "Job Boards",
      pros: ["Large job database", "Company reviews", "Salary insights"],
      cons: ["General job focus", "Poor student experience", "No matching algorithm", "Impersonal"],
      color: "purple"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Existing Solutions</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Analyzing current platforms and identifying opportunities for improvement
        </p>
      </div>

      {/* Competitor Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {competitors.map((competitor, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{competitor.name}</CardTitle>
                <Badge variant="secondary">{competitor.type}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Strengths
                </h4>
                <ul className="space-y-2">
                  {competitor.pros.map((pro, proIndex) => (
                    <li key={proIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-red-600 mb-3 flex items-center gap-2">
                  <XCircle className="h-4 w-4" />
                  Weaknesses
                </h4>
                <ul className="space-y-2">
                  {competitor.cons.map((con, conIndex) => (
                    <li key={conIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Our Advantage */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Zap className="h-8 w-8 text-primary" />
            InternLink's Competitive Advantage
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">What Makes Us Different</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Internship-First Design:</strong> Built specifically for internship matching, not general job searching</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>AI-Powered Matching:</strong> Smart algorithm that considers skills, interests, and compatibility</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Verified Companies:</strong> Rigorous verification process ensures legitimate opportunities</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Direct Communication:</strong> Built-in messaging for seamless interaction</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Key Differentiators</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span><strong>Student-Centric UX:</strong> Interface designed specifically for student needs and behavior</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span><strong>Quality over Quantity:</strong> Focus on meaningful matches rather than mass applications</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span><strong>Relationship Building:</strong> Tools that foster long-term student-company relationships</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span><strong>Modern Technology:</strong> Built with latest web technologies for optimal performance</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Gap */}
      <Card className="bg-muted/30">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">The Market Gap We Fill</h3>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              While existing platforms serve broad professional networking or general job searching needs, 
              none specifically address the unique requirements of internship matching. InternLink fills 
              this gap by providing a specialized, intelligent, and user-friendly platform designed 
              exclusively for the internship ecosystem.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
