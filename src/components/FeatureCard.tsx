
import { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="group glass-premium p-10 rounded-3xl hover-lift shadow-soft hover:shadow-elegant transition-all duration-500 border border-primary/10 hover:border-primary/20 relative overflow-hidden">
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        <div className="bg-gradient-to-br from-primary/15 to-accent/15 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 text-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-elegant group-hover:shadow-glow">
          {icon}
        </div>
        <h3 className="text-2xl font-bold mb-6 group-hover:gradient-text transition-all duration-300">{title}</h3>
        <p className="text-muted-foreground leading-relaxed text-lg group-hover:text-foreground/80 transition-colors duration-300">{description}</p>
        
        {/* Enhanced decorative element */}
        <div className="mt-8 w-16 h-1.5 bg-gradient-to-r from-primary via-accent to-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"></div>
      </div>
    </div>
  );
}
