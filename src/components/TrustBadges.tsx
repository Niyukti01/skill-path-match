
import { Shield, Award, Users, CheckCircle, Star, Zap, Sparkles } from "lucide-react";

export function TrustBadges() {
  const badges = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption protects your data",
      color: "from-emerald-500/20 to-teal-500/20"
    },
    {
      icon: Award,
      title: "#1 Rated Platform",
      description: "Top choice among students nationwide",
      color: "from-primary/20 to-primary/30"
    },
    {
      icon: Users,
      title: "10,000+ Active Users",
      description: "Growing community of success stories",
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: CheckCircle,
      title: "100% Verified",
      description: "All opportunities thoroughly validated",
      color: "from-purple-500/20 to-pink-500/20"
    }
  ];

  return (
    <section className="py-20 section-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22hsl(262%2083%25%2058%25)%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Trusted by thousands</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Thousands</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join a platform built on trust, security, and proven results
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge, index) => (
            <div key={index} className="group animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="glass-card p-8 rounded-3xl hover-lift text-center shadow-elegant">
                <div className={`w-20 h-20 bg-gradient-to-br ${badge.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <badge.icon className="h-10 w-10 text-primary group-hover:text-accent transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors duration-300">{badge.title}</h3>
                <p className="text-muted-foreground text-sm">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced trust indicators */}
        <div className="mt-16 pt-12 border-t border-border/30">
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-70">
            <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-full">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-semibold text-sm">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-full">
              <Zap className="h-4 w-4 text-accent" />
              <span className="font-semibold text-sm">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-full">
              <Shield className="h-4 w-4 text-green-600" />
              <span className="font-semibold text-sm">SOC 2 Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
