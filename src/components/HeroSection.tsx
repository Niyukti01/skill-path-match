
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-secondary to-background py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Connecting <span className="gradient-text">Students</span> with <span className="gradient-text">Opportunities</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              InternLink bridges the gap between talented students seeking internships and companies looking for fresh perspectives. Find your perfect match today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="font-medium">
                <Link to="/login?register=true&type=student">I'm a Student</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-medium">
                <Link to="/login?register=true&type=company">I'm a Company</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -left-6 -top-6 w-20 h-20 bg-accent/20 rounded-full blur-xl"></div>
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-primary/20 rounded-full blur-xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                alt="Students and mentors collaborating" 
                className="rounded-lg shadow-2xl w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
