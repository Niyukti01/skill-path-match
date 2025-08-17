
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Play, CheckCircle, Users, Building2, Sparkles, Star } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22hsl(262%2083%25%2058%25)%22%20fill-opacity%3D%220.04%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-accent/15 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-primary/10 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 text-center lg:text-left">
            {/* Premium badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card mb-8 animate-fade-in">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                #1 Platform for Internship Connections
              </span>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="h-3 w-3 fill-primary text-primary" />
                <span className="font-medium">4.9</span>
              </div>
            </div>
            
            {/* Hero headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight animate-slide-up">
              Your Gateway to 
              <span className="block gradient-text">Dream Internships</span>
            </h1>
            
            {/* Subheading */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto lg:mx-0 animate-fade-in text-balance" style={{ animationDelay: '0.2s' }}>
              InternLink connects ambitious students with top companies through intelligent matching. 
              Join thousands who've found their perfect internship opportunity.
            </p>
            
            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <Button asChild size="lg" className="btn-gradient text-lg px-8 py-6 h-auto animate-glow">
                <Link to="/login?register=true&type=student" className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  I'm a Student
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 h-auto glass-card hover-lift">
                <Link to="/login?register=true&type=company" className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  I'm a Company
                </Link>
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="grid grid-cols-3 gap-6 text-center lg:text-left animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="flex flex-col lg:flex-row items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-accent to-accent/80 rounded-full flex-shrink-0"></div>
                <span className="text-sm font-medium">100% Free</span>
              </div>
              <div className="flex flex-col lg:flex-row items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-primary to-primary/80 rounded-full flex-shrink-0"></div>
                <span className="text-sm font-medium">Verified Companies</span>
              </div>
              <div className="flex flex-col lg:flex-row items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-secondary to-muted rounded-full flex-shrink-0"></div>
                <span className="text-sm font-medium">95% Success Rate</span>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 animate-scale-in" style={{ animationDelay: '0.8s' }}>
            <div className="relative">
              {/* Enhanced floating elements */}
              <div className="absolute -left-8 -top-8 w-32 h-32 bg-gradient-to-br from-accent/30 to-primary/30 rounded-full blur-xl animate-float"></div>
              <div className="absolute -right-12 -bottom-12 w-40 h-40 bg-gradient-to-tl from-primary/30 to-accent/30 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
              
              <div className="relative glass-card rounded-3xl p-3 hover-lift shadow-elegant">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c" 
                  alt="Students collaborating in modern workspace" 
                  className="rounded-2xl w-full h-[450px] object-cover hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
                
                {/* Enhanced floating success card */}
                <div className="absolute top-8 left-8 glass-card rounded-xl p-4 animate-scale-in max-w-[200px] shadow-accent">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="text-accent w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Perfect Match!</p>
                      <p className="text-xs text-muted-foreground">Software Engineering at Google</p>
                      <p className="text-xs text-accent font-medium">98% compatibility</p>
                    </div>
                  </div>
                </div>

                {/* Additional floating stats card */}
                <div className="absolute bottom-8 right-8 glass-card rounded-xl p-4 animate-fade-in shadow-accent">
                  <div className="text-center">
                    <div className="text-2xl font-bold gradient-text">2,500+</div>
                    <div className="text-xs text-muted-foreground">Successful Placements</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
}
