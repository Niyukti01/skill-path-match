
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { FeatureCard } from "@/components/FeatureCard";
import { TrustBadges } from "@/components/TrustBadges";
import { Stats } from "@/components/Stats";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Newsletter } from "@/components/Newsletter";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, User, Building2, Briefcase, LineChart, Download, ArrowRight, Users } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const Index = () => {
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <TrustBadges />
        
        {/* Download Button */}
        <section className="py-6 bg-accent/10">
          <div className="container mx-auto px-4 flex justify-center">
            <Button 
              onClick={() => setShowDownloadDialog(true)} 
              variant="default" 
              size="lg"
              className="font-medium flex gap-2 items-center shadow-md hover:shadow-lg transition-all"
            >
              <Download size={18} />
              Download App
            </Button>
          </div>
        </section>

        {/* Download Instructions Dialog */}
        <Dialog open={showDownloadDialog} onOpenChange={setShowDownloadDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Download InternLink App</DialogTitle>
              <DialogDescription>
                Follow the steps below to download InternLink on your device.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 mt-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">On Desktop (Chrome, Edge)</h3>
                <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                  <li>Look for the install icon in the address bar (screen with down arrow)</li>
                  <li>Click on the install icon</li>
                  <li>Follow the prompts to install InternLink</li>
                </ol>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">On Android</h3>
                <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                  <li>Open Chrome browser</li>
                  <li>Tap the three-dot menu in the upper right</li>
                  <li>Select "Install app" or "Add to Home screen"</li>
                  <li>Follow the on-screen instructions</li>
                </ol>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">On iOS</h3>
                <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                  <li>Open Safari browser</li>
                  <li>Tap the share button (square with up arrow) at the bottom</li>
                  <li>Scroll down and tap "Add to Home Screen"</li>
                  <li>Tap "Add" in the top right corner</li>
                </ol>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        {/* Features Section */}
        <section className="py-24 section-gradient">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card mb-6">
                <span className="text-sm font-medium gradient-text">How It Works</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Simple. Powerful. Effective.</h2>
              <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
                Our intelligent platform streamlines the connection process between ambitious students and innovative companies, making internship discovery effortless.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <FeatureCard
                icon={<User size={24} />}
                title="Create Your Profile"
                description="Students highlight their skills, experiences and interests. Companies showcase their culture and opportunities."
              />
              <FeatureCard
                icon={<Search size={24} />}
                title="Find Your Match"
                description="Our matching algorithm connects students with companies based on skills, interests, and requirements."
              />
              <FeatureCard
                icon={<Building2 size={24} />}
                title="Connect Directly"
                description="Communicate directly with potential matches to explore opportunities and find the perfect fit."
              />
            </div>
          </div>
        </section>

        <Stats />
        
        {/* For Students Section */}
        <section className="py-24 bg-gradient-to-br from-primary/5 to-accent/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2280%22%20height%3D%2280%22%20viewBox%3D%220%200%2080%2080%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22hsl(262%2083%25%2058%25)%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2240%22%20cy%3D%2240%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <div className="relative">
                  <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-accent/20 rounded-full blur-xl"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" 
                    alt="Students networking" 
                    className="rounded-lg shadow-lg w-full hover:scale-[1.01] transition-transform duration-500 ease-in-out"
                  />
                </div>
              </div>
              <div className="md:w-1/2 md:pl-16">
                <h2 className="text-3xl font-bold mb-6">For Students</h2>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-full mt-1">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Discover Opportunities</h3>
                      <p className="text-muted-foreground">Find internships that match your skills, interests, and career goals.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-full mt-1">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Build Your Profile</h3>
                      <p className="text-muted-foreground">Showcase your skills, projects, and passion to stand out to employers.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-full mt-1">
                      <LineChart className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Track Progress</h3>
                      <p className="text-muted-foreground">Monitor your applications and stay updated on your internship journey.</p>
                    </div>
                  </div>
                </div>
                <Button asChild size="lg" variant="premium" className="group">
                  <Link to="/login?register=true&type=student" className="flex items-center gap-2">
                    Get Started as a Student
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* For Companies Section */}
        <section className="py-24 bg-gradient-to-bl from-accent/5 to-primary/5 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2280%22%20height%3D%2280%22%20viewBox%3D%220%200%2080%2080%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22hsl(275%20100%25%2065%25)%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2240%22%20cy%3D%2240%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-16 order-2 md:order-1">
                <h2 className="text-3xl font-bold mb-6">For Companies</h2>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-2 rounded-full mt-1">
                      <Search className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Find Top Talent</h3>
                      <p className="text-muted-foreground">Connect with motivated students who have the skills you need.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-2 rounded-full mt-1">
                      <Building2 className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Showcase Your Company</h3>
                      <p className="text-muted-foreground">Present your company culture and opportunities to attract the right candidates.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-2 rounded-full mt-1">
                      <Briefcase className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Streamline Recruitment</h3>
                      <p className="text-muted-foreground">Manage internship postings, applications, and communications in one place.</p>
                    </div>
                  </div>
                </div>
                <Button asChild size="lg" variant="outline" className="glass-premium border-2 border-accent/30 hover:border-accent/50 group">
                  <Link to="/login?register=true&type=company" className="flex items-center gap-2">
                    Get Started as a Company
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
              <div className="md:w-1/2 mb-10 md:mb-0 order-1 md:order-2">
                <div className="relative">
                  <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/20 rounded-full blur-xl"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                    alt="Company recruiting" 
                    className="rounded-lg shadow-lg w-full hover:scale-[1.01] transition-transform duration-500 ease-in-out"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <Testimonials />
        <FAQ />
        <Newsletter />
        
        {/* CTA Section */}
        <section className="py-32 bg-gradient-to-br from-primary via-primary/90 to-accent relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22white%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-white/20 mb-8">
              <span className="text-sm font-medium text-white">Join Thousands of Success Stories</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">Ready to Find Your<br />Perfect Match?</h2>
            <p className="text-white/90 max-w-3xl mx-auto mb-12 text-xl leading-relaxed">
              Join InternLink today and take the first step towards your next great opportunity. Connect with the future of talent acquisition.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button asChild size="lg" variant="secondary" className="text-lg px-10 py-6 h-auto shadow-premium hover:shadow-glow group">
                <Link to="/login?register=true&type=student" className="flex items-center gap-3">
                  <Users className="h-5 w-5" />
                  Sign Up as a Student
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-10 py-6 h-auto bg-white/10 text-white border-white/30 hover:bg-white/20 hover:border-white/50 shadow-premium hover:shadow-glow backdrop-blur-sm group">
                <Link to="/login?register=true&type=company" className="flex items-center gap-3">
                  <Building2 className="h-5 w-5" />
                  Sign Up as a Company
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="glass-premium py-16 border-t border-border/30 shadow-soft">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-primary to-accent rounded-xl p-2 shadow-elegant">
                  <span className="text-white font-bold text-sm">IL</span>
                </div>
                <span className="font-bold text-2xl gradient-text">InternLink</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Connecting students with perfect internship opportunities. Build your career, find your passion.
              </p>
              <p className="text-muted-foreground text-sm">© 2025 InternLink. All rights reserved.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">For Students</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/login?register=true&type=student" className="hover:text-primary transition-colors">Create Profile</Link></li>
                <li><Link to="/login" className="hover:text-primary transition-colors">Browse Internships</Link></li>
                <li><Link to="/about" className="hover:text-primary transition-colors">How It Works</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">For Companies</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/login?register=true&type=company" className="hover:text-primary transition-colors">Post Internships</Link></li>
                <li><Link to="/login" className="hover:text-primary transition-colors">Find Talent</Link></li>
                <li><Link to="/about" className="hover:text-primary transition-colors">Success Stories</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
