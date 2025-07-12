
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Palette, Database, Cloud, Shield, Zap } from "lucide-react";

export function TechStack() {
  const techCategories = [
    {
      icon: Code,
      title: "Frontend Technologies",
      color: "primary",
      technologies: [
        { name: "React 18", description: "Modern React with hooks and concurrent features" },
        { name: "TypeScript", description: "Type-safe JavaScript for better development experience" },
        { name: "Vite", description: "Fast build tool for modern web development" },
        { name: "React Router", description: "Declarative routing for React applications" }
      ]
    },
    {
      icon: Palette,
      title: "UI & Styling",
      color: "accent",
      technologies: [
        { name: "Tailwind CSS", description: "Utility-first CSS framework for rapid styling" },
        { name: "Shadcn/UI", description: "Modern component library built on Radix UI" },
        { name: "Lucide React", description: "Beautiful and consistent icon library" },
        { name: "Framer Motion", description: "Production-ready motion library for React" }
      ]
    },
    {
      icon: Database,
      title: "State Management",
      color: "primary",
      technologies: [
        { name: "TanStack Query", description: "Powerful data synchronization for React" },
        { name: "React Hook Form", description: "Performant forms with easy validation" },
        { name: "Zod", description: "TypeScript-first schema validation" },
        { name: "Context API", description: "React's built-in state management" }
      ]
    },
    {
      icon: Cloud,
      title: "Development Tools",
      color: "accent",
      technologies: [
        { name: "ESLint", description: "Code linting for consistent code quality" },
        { name: "Prettier", description: "Code formatting for consistent style" },
        { name: "Husky", description: "Git hooks for automated quality checks" },
        { name: "PostCSS", description: "Tool for transforming CSS with JavaScript" }
      ]
    }
  ];

  const additionalTools = [
    "PWA Support", "Service Workers", "Responsive Design", "Accessibility (ARIA)",
    "SEO Optimization", "Performance Optimization", "Cross-browser Compatibility", "Modern JavaScript (ES2022+)"
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Technology Stack</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Modern, scalable technologies powering InternLink's performance and user experience
        </p>
      </div>

      {/* Tech Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {techCategories.map((category, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${category.color === 'primary' ? 'bg-primary/10' : 'bg-accent/10'}`}>
                  <category.icon className={`h-6 w-6 ${category.color === 'primary' ? 'text-primary' : 'text-accent'}`} />
                </div>
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {category.technologies.map((tech, techIndex) => (
                <div key={techIndex} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {tech.name}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground pl-2 border-l-2 border-muted">
                    {tech.description}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Architecture Principles */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-center justify-center">
            <Zap className="h-6 w-6 text-primary" />
            Architecture Principles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold">Component-Based</h4>
              <p className="text-sm text-muted-foreground">
                Modular, reusable components for maintainable code
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <h4 className="font-semibold">Type-Safe</h4>
              <p className="text-sm text-muted-foreground">
                Full TypeScript integration for better development experience
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold">Performance-First</h4>
              <p className="text-sm text-muted-foreground">
                Optimized for fast loading and smooth interactions
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Features */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Technologies & Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {additionalTools.map((tool, index) => (
              <Badge key={index} variant="outline" className="justify-center p-2">
                {tool}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Why These Technologies */}
      <Card className="bg-muted/30">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">Why These Technologies?</h3>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Our technology choices prioritize developer experience, performance, scalability, 
              and maintainability. This modern stack ensures InternLink can grow with user needs 
              while maintaining excellent performance and reliability.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
