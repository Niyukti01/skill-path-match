
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowRight, Database, Globe, Smartphone, Users, Building2, Zap } from "lucide-react";

export function Architecture() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">System Architecture</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          How InternLink processes user interactions and delivers intelligent matching
        </p>
      </div>

      {/* Architecture Flow Diagram */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-none">
        <CardHeader>
          <CardTitle className="text-center">Application Flow</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-8">
            {/* User Layer */}
            <div className="flex justify-center items-center gap-8">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <p className="font-semibold">Students</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                  <Building2 className="h-8 w-8 text-accent" />
                </div>
                <p className="font-semibold">Companies</p>
              </div>
            </div>

            <div className="flex justify-center">
              <ArrowDown className="h-6 w-6 text-muted-foreground" />
            </div>

            {/* Interface Layer */}
            <div className="flex justify-center items-center gap-8">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <p className="font-semibold">Web App</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                  <Smartphone className="h-8 w-8 text-accent" />
                </div>
                <p className="font-semibold">Mobile PWA</p>
              </div>
            </div>

            <div className="flex justify-center">
              <ArrowDown className="h-6 w-6 text-muted-foreground" />
            </div>

            {/* Processing Layer */}
            <div className="text-center space-y-2">
              <div className="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto">
                <Zap className="h-10 w-10 text-white" />
              </div>
              <p className="font-semibold text-lg">AI Matching Engine</p>
            </div>

            <div className="flex justify-center">
              <ArrowDown className="h-6 w-6 text-muted-foreground" />
            </div>

            {/* Data Layer */}
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto">
                <Database className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="font-semibold">Data Storage</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Process Flow */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
              User Registration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground">Users select their role (Student/Company) and create detailed profiles</p>
            <ul className="text-sm space-y-1">
              <li>• Profile creation</li>
              <li>• Skill assessment</li>
              <li>• Preference setup</li>
              <li>• Verification process</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
              AI Processing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground">Smart algorithm analyzes profiles and generates compatibility scores</p>
            <ul className="text-sm space-y-1">
              <li>• Skill matching</li>
              <li>• Interest alignment</li>
              <li>• Cultural fit</li>
              <li>• Success prediction</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
              Match Delivery
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground">Personalized matches delivered with detailed compatibility insights</p>
            <ul className="text-sm space-y-1">
              <li>• Match recommendations</li>
              <li>• Compatibility scores</li>
              <li>• Detailed insights</li>
              <li>• Action suggestions</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="bg-accent text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
              Communication
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground">Direct messaging system enables seamless interaction between matches</p>
            <ul className="text-sm space-y-1">
              <li>• Real-time messaging</li>
              <li>• File sharing</li>
              <li>• Interview scheduling</li>
              <li>• Progress tracking</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="bg-accent text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">5</span>
              Application Process
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground">Streamlined application workflow with real-time status updates</p>
            <ul className="text-sm space-y-1">
              <li>• Application submission</li>
              <li>• Status tracking</li>
              <li>• Interview coordination</li>
              <li>• Decision notifications</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="bg-accent text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">6</span>
              Analytics & Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground">Comprehensive analytics help users optimize their profiles and strategies</p>
            <ul className="text-sm space-y-1">
              <li>• Performance metrics</li>
              <li>• Match analytics</li>
              <li>• Success insights</li>
              <li>• Improvement suggestions</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Technical Architecture */}
      <Card>
        <CardHeader>
          <CardTitle>Technical Architecture Highlights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Frontend Architecture</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <span>Component-based React architecture</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <span>TypeScript for type safety</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <span>Responsive design system</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <span>Progressive Web App capabilities</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Performance Optimizations</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                  <span>Code splitting and lazy loading</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                  <span>Optimized bundling with Vite</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                  <span>Efficient state management</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                  <span>Caching and offline support</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
