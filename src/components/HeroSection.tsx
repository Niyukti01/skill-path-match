
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Play, CheckCircle, Users, Building2 } from "lucide-react";

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-background via-secondary/20 to-background py-24 relative overflow-hidden">
      {/* Enhanced background decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-l from-accent/15 to-primary/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/5 to-transparent rounded-full"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 backdrop-blur-sm mb-8">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-primary">Live Platform</span>
                </div>
                <div className="w-px h-4 bg-border"></div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">10,000+ Active Users</span>
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              Your Gateway to 
              <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                Dream Internships
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              InternLink connects ambitious students with top companies through intelligent matching. 
              Join thousands who've found their perfect internship opportunity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start">
              <Button asChild size="lg" className="h-14 px-8 font-semibold text-lg shadow-xl hover:shadow-2xl transition-all group bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                <Link to="/login?register=true&type=student">
                  <Users className="mr-2 h-5 w-5" />
                  I'm a Student
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 px-8 font-semibold text-lg border-2 hover:bg-muted/50 transition-all">
                <Link to="/login?register=true&type=company">
                  <Building2 className="mr-2 h-5 w-5" />
                  I'm a Company
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-6 text-center lg:text-left">
              <div className="flex flex-col lg:flex-row items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex-shrink-0"></div>
                <span className="text-sm font-medium">100% Free</span>
              </div>
              <div className="flex flex-col lg:flex-row items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex-shrink-0"></div>
                <span className="text-sm font-medium">Verified Companies</span>
              </div>
              <div className="flex flex-col lg:flex-row items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex-shrink-0"></div>
                <span className="text-sm font-medium">95% Success Rate</span>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="relative">
              {/* Enhanced floating elements */}
              <div className="absolute -left-8 -top-8 w-32 h-32 bg-gradient-to-br from-accent/30 to-primary/30 rounded-full blur-xl animate-float"></div>
              <div className="absolute -right-12 -bottom-12 w-40 h-40 bg-gradient-to-tl from-primary/30 to-accent/30 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
              
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-3 hover:shadow-3xl transition-all duration-700 border">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c" 
                  alt="Students collaborating in modern workspace" 
                  className="rounded-2xl w-full h-[450px] object-cover hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
                
                {/* Enhanced floating success card */}
                <div className="absolute top-8 left-8 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4 border animate-scale-in max-w-[200px]">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="text-green-600 w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900">Perfect Match!</p>
                      <p className="text-xs text-gray-600">Software Engineering at Google</p>
                      <p className="text-xs text-green-600 font-medium">98% compatibility</p>
                    </div>
                  </div>
                </div>

                {/* Additional floating stats card */}
                <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4 border animate-fade-in">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">2,500+</div>
                    <div className="text-xs text-gray-600">Successful Placements</div>
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
