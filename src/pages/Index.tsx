
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { FeatureCard } from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, User, Building2, Briefcase, LineChart } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        
        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How InternLink Works</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Our platform makes it easy for students to find internships and companies to find talented students.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        
        {/* For Students Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <div className="relative">
                  <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-accent/20 rounded-full blur-xl"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" 
                    alt="Students networking" 
                    className="rounded-lg shadow-lg w-full"
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
                <Button asChild size="lg">
                  <Link to="/login?register=true&type=student">Get Started as a Student</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* For Companies Section */}
        <section className="py-20">
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
                <Button asChild size="lg" variant="outline">
                  <Link to="/login?register=true&type=company">Get Started as a Company</Link>
                </Button>
              </div>
              <div className="md:w-1/2 mb-10 md:mb-0 order-1 md:order-2">
                <div className="relative">
                  <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/20 rounded-full blur-xl"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                    alt="Company recruiting" 
                    className="rounded-lg shadow-lg w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Find Your Perfect Match?</h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-10">
              Join InternLink today and take the first step towards your next great opportunity.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link to="/login?register=true&type=student">Sign Up as a Student</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                <Link to="/login?register=true&type=company">Sign Up as a Company</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-muted-foreground">© 2025 InternLink. All rights reserved.</p>
            </div>
            <div className="flex gap-6">
              <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary">About</Link>
              <Link to="/login" className="text-muted-foreground hover:text-primary">Login</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
