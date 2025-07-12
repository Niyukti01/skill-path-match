
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, ArrowRight, CheckCircle } from "lucide-react";

export function Objective() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Project Objective</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Our mission to transform the internship discovery experience
        </p>
      </div>

      {/* Primary Objective */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Target className="h-8 w-8 text-primary" />
            Primary Objective
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl leading-relaxed mb-6">
            Bridge the gap between talented students seeking internships and companies 
            looking for fresh perspectives through an AI-powered matching system that 
            prioritizes compatibility, efficiency, and meaningful connections.
          </p>
          
          <div className="flex items-center justify-center gap-4 py-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-primary font-bold">Students</span>
              </div>
              <p className="text-sm text-muted-foreground">Seeking Opportunities</p>
            </div>
            
            <ArrowRight className="h-8 w-8 text-primary animate-pulse" />
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold text-sm">InternLink</span>
              </div>
              <p className="text-sm text-muted-foreground">AI Matching</p>
            </div>
            
            <ArrowRight className="h-8 w-8 text-primary animate-pulse" />
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-accent font-bold">Companies</span>
              </div>
              <p className="text-sm text-muted-foreground">Finding Talent</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Secondary Goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">For Students</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Simplify internship discovery process</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Provide personalized opportunity recommendations</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Enable direct communication with companies</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Track application progress efficiently</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">For Companies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Access to pre-qualified, motivated candidates</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Streamline recruitment and screening process</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Showcase company culture effectively</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Manage applications and communications centrally</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Success Metrics */}
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="text-center">Success Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <h3 className="text-3xl font-bold text-primary">95%</h3>
              <p className="text-muted-foreground">Match Success Rate</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-accent">48hrs</h3>
              <p className="text-muted-foreground">Average Match Time</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary">75%</h3>
              <p className="text-muted-foreground">Reduction in Hiring Time</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
