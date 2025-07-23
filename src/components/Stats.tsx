
import { TrendingUp, Users, Building2, Briefcase, Target, Clock } from "lucide-react";

export function Stats() {
  const stats = [
    {
      icon: Users,
      value: "10,000+",
      label: "Active Students",
      description: "Talented students actively seeking opportunities",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Building2,
      value: "500+",
      label: "Partner Companies",
      description: "From startups to Fortune 500 companies",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Briefcase,
      value: "2,500+",
      label: "Successful Matches",
      description: "Life-changing internships secured",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: TrendingUp,
      value: "95%",
      label: "Success Rate",
      description: "Students finding internships within 30 days",
      color: "from-yellow-500 to-yellow-600"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-primary via-primary/95 to-accent text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <Target className="h-4 w-4" />
            <span className="text-sm font-medium">Our Impact</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Transforming Careers</h2>
          <p className="text-white/80 text-xl max-w-3xl mx-auto leading-relaxed">
            See how InternLink is revolutionizing the internship landscape and creating opportunities for the next generation
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="group text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105 border border-white/20">
                <div className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <stat.icon className="h-10 w-10 text-white" />
                </div>
                <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <h3 className="text-2xl font-bold mb-3">{stat.label}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional metrics */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="h-5 w-5" />
              <span className="text-3xl font-bold">&lt; 2 min</span>
            </div>
            <p className="text-white/70">Average sign-up time</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Target className="h-5 w-5" />
              <span className="text-3xl font-bold">48 hrs</span>
            </div>
            <p className="text-white/70">Average response time</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5" />
              <span className="text-3xl font-bold">300%</span>
            </div>
            <p className="text-white/70">Year-over-year growth</p>
          </div>
        </div>
      </div>
    </section>
  );
}
