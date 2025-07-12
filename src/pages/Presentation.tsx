
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PresentationHeader } from "@/components/presentation/PresentationHeader";
import { ProblemStatement } from "@/components/presentation/ProblemStatement";
import { Objective } from "@/components/presentation/Objective";
import { ExistingSolutions } from "@/components/presentation/ExistingSolutions";
import { Features } from "@/components/presentation/Features";
import { TechStack } from "@/components/presentation/TechStack";
import { Architecture } from "@/components/presentation/Architecture";
import { AppScreenshots } from "@/components/presentation/AppScreenshots";
import { Challenges } from "@/components/presentation/Challenges";
import { FutureScope } from "@/components/presentation/FutureScope";
import { Conclusion } from "@/components/presentation/Conclusion";
import { QAndA } from "@/components/presentation/QAndA";
import { TableOfContents } from "@/components/presentation/TableOfContents";

const Presentation = () => {
  const [activeSection, setActiveSection] = useState("introduction");

  const sections = [
    { id: "introduction", title: "Introduction", component: PresentationHeader },
    { id: "problem", title: "Problem Statement", component: ProblemStatement },
    { id: "objective", title: "Objective", component: Objective },
    { id: "existing", title: "Existing Solutions", component: ExistingSolutions },
    { id: "features", title: "Features", component: Features },
    { id: "techstack", title: "Tech Stack", component: TechStack },
    { id: "architecture", title: "Architecture", component: Architecture },
    { id: "screenshots", title: "App Demo", component: AppScreenshots },
    { id: "challenges", title: "Challenges Faced", component: Challenges },
    { id: "future", title: "Future Scope", component: FutureScope },
    { id: "conclusion", title: "Conclusion", component: Conclusion },
    { id: "qa", title: "Q&A", component: QAndA },
  ];

  const ActiveComponent = sections.find(section => section.id === activeSection)?.component || PresentationHeader;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary rounded-md p-2 shadow-sm">
                <span className="text-white font-bold text-lg">IL</span>
              </div>
              <h1 className="text-xl font-bold">InternLink Presentation</h1>
            </div>
            <TableOfContents 
              sections={sections} 
              activeSection={activeSection} 
              onSectionChange={setActiveSection} 
            />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <ActiveComponent />
          
          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t">
            <Button
              variant="outline"
              onClick={() => {
                const currentIndex = sections.findIndex(s => s.id === activeSection);
                if (currentIndex > 0) {
                  setActiveSection(sections[currentIndex - 1].id);
                }
              }}
              disabled={sections.findIndex(s => s.id === activeSection) === 0}
            >
              Previous
            </Button>
            
            <div className="flex gap-2">
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  className={`h-2 w-8 rounded-full transition-colors ${
                    section.id === activeSection ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
            
            <Button
              onClick={() => {
                const currentIndex = sections.findIndex(s => s.id === activeSection);
                if (currentIndex < sections.length - 1) {
                  setActiveSection(sections[currentIndex + 1].id);
                }
              }}
              disabled={sections.findIndex(s => s.id === activeSection) === sections.length - 1}
            >
              Next
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Presentation;
