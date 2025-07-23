
import { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="group card-float p-8 rounded-2xl hover-lift">
      <div className="bg-gradient-to-br from-primary/10 to-accent/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300 shadow-lg">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">{title}</h3>
      <p className="text-muted-foreground leading-relaxed text-lg">{description}</p>
      
      {/* Decorative element */}
      <div className="mt-6 w-12 h-1 bg-gradient-to-r from-primary to-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}
