
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <Card className="border border-border bg-card hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="bg-secondary/50 w-12 h-12 flex items-center justify-center rounded-full mb-4">
          <div className="text-primary">{icon}</div>
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
