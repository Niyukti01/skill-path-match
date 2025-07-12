
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Users, Building, Search } from "lucide-react";

export function ProblemStatement() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Problem Statement</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Understanding the challenges in the current internship landscape
        </p>
      </div>

      {/* Main Problem */}
      <Card className="bg-destructive/5 border-destructive/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-destructive">
            <AlertTriangle className="h-6 w-6" />
            The Core Problem
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg leading-relaxed">
            There's a significant disconnect between students seeking meaningful internship opportunities 
            and companies looking for talented interns. This gap results in missed opportunities, 
            inefficient hiring processes, and frustrated stakeholders on both sides.
          </p>
        </CardContent>
      </Card>

      {/* Specific Challenges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Users className="h-6 w-6 text-primary" />
              Student Challenges
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>Difficulty finding relevant internship opportunities</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>Lack of direct communication with companies</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>Overwhelming and generic job boards</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>No personalized matching based on skills and interests</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>Limited visibility into company culture and expectations</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Building className="h-6 w-6 text-accent" />
              Company Challenges
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                <span>Hard to find qualified and motivated interns</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                <span>Time-consuming recruitment and screening process</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                <span>Limited visibility of student skills and potential</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                <span>Inefficient application tracking and management</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                <span>Lack of tools to showcase company culture effectively</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Market Impact */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-none">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <Search className="h-12 w-12 text-primary mx-auto" />
            <h3 className="text-2xl font-bold">Market Impact</h3>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              These challenges result in a 40% increase in time-to-hire for companies, 
              60% of students applying to irrelevant positions, and missed opportunities 
              that could benefit both parties. The internship market needs a specialized, 
              intelligent solution.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
