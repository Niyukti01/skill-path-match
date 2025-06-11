
import { TrendingUp, Users, Building2, Briefcase } from "lucide-react";

export function Stats() {
  const stats = [
    {
      icon: Users,
      value: "10,000+",
      label: "Active Students",
      description: "Students actively searching for internships"
    },
    {
      icon: Building2,
      value: "500+",
      label: "Partner Companies",
      description: "Trusted companies offering opportunities"
    },
    {
      icon: Briefcase,
      value: "2,500+",
      label: "Successful Matches",
      description: "Internships secured through our platform"
    },
    {
      icon: TrendingUp,
      value: "95%",
      label: "Success Rate",
      description: "Students who find internships within 30 days"
    }
  ];

  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Impact in Numbers</h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            See how InternLink is transforming the internship landscape for students and companies alike.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white/10 p-4 rounded-full w-fit mx-auto mb-4 group-hover:bg-white/20 transition-colors">
                <stat.icon className="h-8 w-8" />
              </div>
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <h3 className="text-xl font-semibold mb-2">{stat.label}</h3>
              <p className="text-white/70 text-sm">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
