
import { Shield, Award, Users, CheckCircle, Star, Zap } from "lucide-react";

export function TrustBadges() {
  const badges = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption protects your data",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Award,
      title: "#1 Rated Platform",
      description: "Top choice among students nationwide",
      gradient: "from-yellow-500 to-yellow-600"
    },
    {
      icon: Users,
      title: "10,000+ Active Users",
      description: "Growing community of success stories",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: CheckCircle,
      title: "100% Verified",
      description: "All opportunities thoroughly validated",
      gradient: "from-green-500 to-green-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Trusted by Thousands</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join a platform built on trust, security, and proven results
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border/50">
                <div className={`w-16 h-16 bg-gradient-to-br ${badge.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <badge.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-center">{badge.title}</h3>
                <p className="text-muted-foreground text-sm text-center leading-relaxed">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 pt-12 border-t border-border/50">
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <span className="font-semibold">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="font-semibold">SOC 2 Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
