
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Check } from "lucide-react";

interface Section {
  id: string;
  title: string;
  component: React.ComponentType;
}

interface TableOfContentsProps {
  sections: Section[];
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export function TableOfContents({ sections, activeSection, onSectionChange }: TableOfContentsProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <Menu className="h-4 w-4 mr-2" />
          Sections
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Presentation Sections</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-2">
          {sections.map((section, index) => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => onSectionChange(section.id)}
            >
              <span className="mr-2 text-sm text-muted-foreground">
                {(index + 1).toString().padStart(2, '0')}
              </span>
              {section.title}
              {activeSection === section.id && <Check className="h-4 w-4 ml-auto" />}
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
