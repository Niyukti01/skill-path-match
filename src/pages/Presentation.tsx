import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ExternalLink, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  
  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "Escape") {
        goHome();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    
    // Cleanup event listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentSlide]); // Re-run effect when currentSlide changes
  
  const slides = [
    // Title Slide
    {
      title: "InternLink",
      subtitle: "Connecting Students with Internship Opportunities",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070",
      type: "title"
    },
    // Introduction
    {
      title: "What is InternLink?",
      content: [
        "A platform that bridges the gap between students and companies",
        "Simplifies the internship search and recruitment process",
        "Creates meaningful connections for career growth"
      ],
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070",
      type: "content"
    },
    // How It Works
    {
      title: "How InternLink Works",
      content: [
        "Create Your Profile: Showcase skills and interests",
        "Find Your Match: Our algorithm connects the right students with the right companies",
        "Connect Directly: Direct communication between students and companies"
      ],
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070",
      type: "content"
    },
    // For Students
    {
      title: "For Students",
      content: [
        "Discover Opportunities that match your skills and interests",
        "Build Your Profile to showcase your talents",
        "Track Progress of your applications"
      ],
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070",
      type: "content"
    },
    // For Companies
    {
      title: "For Companies",
      content: [
        "Find Top Talent with the skills you need",
        "Showcase Your Company culture and opportunities",
        "Streamline Recruitment process through our platform"
      ],
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2070",
      type: "content"
    },
    // Benefits
    {
      title: "Benefits of InternLink",
      content: [
        "Time-Saving: Efficient matching algorithm",
        "Quality Connections: Based on skills and interests",
        "User-Friendly: Simple and intuitive interface",
        "Mobile-Friendly: Install as a Progressive Web App"
      ],
      type: "content"
    },
    // Features
    {
      title: "Key Features",
      content: [
        "Smart Matching Algorithm",
        "Customizable Profiles",
        "Application Tracking",
        "Direct Messaging",
        "Installable as a Mobile App"
      ],
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070",
      type: "content"
    },
    // Demo/Screenshots
    {
      title: "Platform Overview",
      content: [
        "Student Profile Dashboard",
        "Company Recruiting Portal",
        "Application Management",
        "Mobile-Friendly Design"
      ],
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070",
      type: "content"
    },
    // Call to Action
    {
      title: "Join InternLink Today",
      content: [
        "For Students: Discover your next career opportunity",
        "For Companies: Find the perfect talent for your team",
        "Sign up now to get started!"
      ],
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070",
      type: "end"
    },
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goHome = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex flex-col">
      {/* Navigation bar */}
      <div className="bg-amber-500 text-white p-4 flex justify-between items-center">
        <div className="font-bold text-xl">InternLink Presentation</div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={goHome} className="text-white hover:bg-amber-600">
            <Home className="mr-2 h-4 w-4" /> Home
          </Button>
        </div>
      </div>
      
      {/* Presentation container */}
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-5xl bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Keyboard navigation hint */}
          <div className="absolute top-20 left-4 bg-black/10 text-black/70 px-3 py-1 rounded-md text-sm backdrop-blur-sm">
            Use ← → keys to navigate slides
          </div>
          
          {/* Slide content */}
          <div className="relative">
            {slides[currentSlide].image && (
              <AspectRatio ratio={16/9}>
                <div 
                  className="w-full h-full bg-cover bg-center opacity-20" 
                  style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
                />
              </AspectRatio>
            )}
            
            <div className="absolute inset-0 flex flex-col p-10">
              {slides[currentSlide].type === "title" ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <h1 className="text-5xl md:text-6xl font-bold mb-4 text-amber-800">
                    {slides[currentSlide].title}
                  </h1>
                  <p className="text-xl md:text-2xl text-amber-600">
                    {slides[currentSlide].subtitle}
                  </p>
                </div>
              ) : (
                <div className="h-full flex flex-col">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-amber-800">
                    {slides[currentSlide].title}
                  </h2>
                  <div className="flex-grow flex items-center">
                    <ul className="list-disc space-y-4 pl-6 text-lg md:text-xl text-amber-700">
                      {slides[currentSlide].content?.map((item, index) => (
                        <li key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {slides[currentSlide].type === "end" && (
                    <div className="flex justify-center mt-8">
                      <Button 
                        size="lg" 
                        onClick={goHome}
                        className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600"
                      >
                        Get Started <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Slide controls */}
          <div className="bg-gradient-to-r from-amber-500 to-yellow-500 p-4 flex justify-between items-center text-white">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={prevSlide} 
              disabled={currentSlide === 0}
              className="text-white hover:bg-amber-600 disabled:opacity-50"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            
            <div className="text-sm">
              Slide {currentSlide + 1} of {slides.length}
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={nextSlide} 
              disabled={currentSlide === slides.length - 1}
              className="text-white hover:bg-amber-600 disabled:opacity-50"
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presentation;
