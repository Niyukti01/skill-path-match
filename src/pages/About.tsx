import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  CheckCircle, 
  Users, 
  Building2, 
  Search, 
  MessageSquare, 
  Trophy,
  Star,
  Quote,
  TrendingUp,
  Clock,
  Award
} from "lucide-react";

export default function About() {
  const steps = [
    {
      icon: Users,
      title: "Create Your Profile",
      description: "Students showcase their skills, experiences, and career goals. Companies highlight their culture and open positions.",
      color: "from-blue-500/10 to-blue-600/10"
    },
    {
      icon: Search,
      title: "Smart Matching",
      description: "Our AI-powered algorithm analyzes profiles and requirements to find perfect matches based on skills, interests, and company culture.",
      color: "from-primary/10 to-primary/20"
    },
    {
      icon: MessageSquare,
      title: "Direct Communication",
      description: "Matched parties can communicate directly through our secure platform to discuss opportunities and arrange interviews.",
      color: "from-green-500/10 to-green-600/10"
    },
    {
      icon: Trophy,
      title: "Successful Placement",
      description: "Track your progress, manage applications, and celebrate successful internship placements with ongoing support.",
      color: "from-accent/10 to-accent/20"
    }
  ];

  const successStories = [
    {
      name: "Sarah Chen",
      role: "Computer Science Student",
      company: "TechFlow Inc.",
      position: "Software Engineering Intern",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c",
      quote: "InternLink connected me with my dream internship at TechFlow. The matching algorithm perfectly aligned my skills with their requirements, and I landed the position within 2 weeks!",
      result: "Full-time offer after internship",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Marketing Major",
      company: "GrowthLabs",
      position: "Digital Marketing Intern",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      quote: "The platform made it so easy to showcase my creative projects. GrowthLabs found me through InternLink, and it's been an incredible learning experience.",
      result: "Extended internship + mentorship",
      rating: 5
    },
    {
      name: "Emily Watson",
      role: "Data Science Student",
      company: "DataVision Corp",
      position: "Data Analyst Intern",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      quote: "I was struggling to find internships that matched my specialized skills. InternLink's AI matching found DataVision, where I'm now working on cutting-edge ML projects.",
      result: "Research publication opportunity",
      rating: 5
    }
  ];

  const stats = [
    { number: "95%", label: "Success Rate", sublabel: "Students find internships" },
    { number: "48hrs", label: "Average Match Time", sublabel: "From profile to connection" },
    { number: "500+", label: "Partner Companies", sublabel: "From startups to Fortune 500" },
    { number: "10,000+", label: "Active Students", sublabel: "Across all majors" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-24 hero-gradient relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22hsl(262%2083%25%2058%25)%22%20fill-opacity%3D%220.04%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-8 animate-fade-in">
                How <span className="gradient-text">InternLink</span> Works
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up text-balance">
                Discover how we're revolutionizing internship connections through intelligent matching and real success stories from our community.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
                {stats.map((stat, index) => (
                  <div key={index} className="glass-card p-6 rounded-2xl animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.number}</div>
                    <div className="font-semibold text-sm mb-1">{stat.label}</div>
                    <div className="text-xs text-muted-foreground">{stat.sublabel}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 section-gradient">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Simple. Smart. Successful.</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our streamlined process connects the right students with the right companies in just four easy steps.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="glass-card p-8 rounded-3xl hover-lift text-center h-full">
                    <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                      <step.icon className="h-10 w-10 text-primary" />
                    </div>
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                  
                  {/* Arrow connector */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="h-6 w-6 text-primary/50" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Real Stories, Real Success</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                See how InternLink has transformed careers and connected dreams with opportunities.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <div key={index} className="group animate-scale-in" style={{ animationDelay: `${index * 0.15}s` }}>
                  <div className="glass-card p-8 rounded-3xl hover-lift h-full">
                    <div className="flex items-center mb-6">
                      <img 
                        src={story.image} 
                        alt={story.name}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h3 className="font-bold text-lg">{story.name}</h3>
                        <p className="text-sm text-muted-foreground">{story.role}</p>
                        <div className="flex items-center mt-1">
                          {[...Array(story.rating)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <Quote className="h-8 w-8 text-primary/30 mb-3" />
                      <p className="text-muted-foreground italic leading-relaxed">{story.quote}</p>
                    </div>
                    
                    <div className="border-t border-border/50 pt-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-sm text-primary">{story.position}</span>
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="font-medium mb-2">{story.company}</p>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium">
                        <CheckCircle className="h-3 w-3" />
                        {story.result}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-24 bg-gradient-to-r from-primary to-accent text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Proven Results</h2>
              <p className="text-white/80 text-xl max-w-3xl mx-auto">
                Our platform delivers measurable outcomes for both students and companies.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-white/80" />
                <div className="text-4xl font-bold mb-2">300%</div>
                <p className="text-white/70">Faster hiring process</p>
              </div>
              <div className="text-center">
                <Clock className="h-12 w-12 mx-auto mb-4 text-white/80" />
                <div className="text-4xl font-bold mb-2">2 weeks</div>
                <p className="text-white/70">Average time to placement</p>
              </div>
              <div className="text-center">
                <Award className="h-12 w-12 mx-auto mb-4 text-white/80" />
                <div className="text-4xl font-bold mb-2">85%</div>
                <p className="text-white/70">Receive full-time offers</p>
              </div>
              <div className="text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-white/80" />
                <div className="text-4xl font-bold mb-2">98%</div>
                <p className="text-white/70">User satisfaction rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 section-gradient">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Success Story?</h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              Join thousands of students and companies who have found their perfect match through InternLink.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="btn-gradient text-lg px-8 py-6 h-auto">
                <Link to="/login?register=true&type=student" className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Start as a Student
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 h-auto glass-card hover-lift">
                <Link to="/login?register=true&type=company" className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Join as a Company
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}