
import { Shield, Award, Users, CheckCircle } from "lucide-react";

export function TrustBadges() {
  const badges = [
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Your data is protected with enterprise-grade security"
    },
    {
      icon: Award,
      title: "Top Rated",
      description: "Rated #1 by students and companies nationwide"
    },
    {
      icon: Users,
      title: "10,000+ Users",
      description: "Join thousands of successful connections"
    },
    {
      icon: CheckCircle,
      title: "Verified Opportunities",
      description: "All internships are verified and legitimate"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="bg-primary/10 p-4 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                <badge.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{badge.title}</h3>
              <p className="text-muted-foreground text-sm">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
