
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-secondary via-background to-muted py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary font-medium mb-6">
                🚀 Trusted by 10,000+ Students
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Connecting <span className="gradient-text">Students</span> with <span className="gradient-text">Dream Opportunities</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
              InternLink bridges the gap between talented students seeking internships and companies looking for fresh perspectives. Find your perfect match today with our AI-powered matching system.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button asChild size="lg" className="font-medium shadow-md hover:shadow-lg transition-all group">
                <Link to="/login?register=true&type=student">
                  I'm a Student
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-medium shadow-sm hover:shadow-md transition-all">
                <Link to="/login?register=true&type=company">I'm a Company</Link>
              </Button>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Free to use</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Verified companies</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>95% success rate</span>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute -left-6 -top-6 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              
              <div className="relative bg-white rounded-2xl shadow-2xl p-2 hover:shadow-3xl transition-shadow duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c" 
                  alt="Students collaborating in modern workspace" 
                  className="rounded-xl w-full h-[400px] object-cover hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
                
                {/* Floating card overlay */}
                <div className="absolute top-8 left-8 bg-white rounded-lg shadow-lg p-4 border animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Match Found!</p>
                      <p className="text-xs text-muted-foreground">Tech Internship at Google</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
