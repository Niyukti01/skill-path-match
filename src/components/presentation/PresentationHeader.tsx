
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Building2, Target, Zap } from "lucide-react";

export function PresentationHeader() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
            Project Presentation
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-tight">
            InternLink
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Connecting Students with Dream Opportunities through AI-Powered Matching
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <Users className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold">10,000+</h3>
            <p className="text-muted-foreground">Students Registered</p>
          </CardContent>
        </Card>
        
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <Building2 className="h-12 w-12 text-accent mx-auto mb-4" />
            <h3 className="text-2xl font-bold">500+</h3>
            <p className="text-muted-foreground">Partner Companies</p>
          </CardContent>
        </Card>
        
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <Target className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold">95%</h3>
            <p className="text-muted-foreground">Success Rate</p>
          </CardContent>
        </Card>
        
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <Zap className="h-12 w-12 text-accent mx-auto mb-4" />
            <h3 className="text-2xl font-bold">48hrs</h3>
            <p className="text-muted-foreground">Average Match Time</p>
          </CardContent>
        </Card>
      </div>

      {/* Overview */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-none">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Project Overview</h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              InternLink is a modern web application designed to bridge the gap between talented students 
              seeking internships and companies looking for fresh perspectives. Built with cutting-edge 
              technology and user-centric design, it revolutionizes how internship connections are made.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
