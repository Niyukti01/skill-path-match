
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Monitor, Smartphone, Tablet } from "lucide-react";

export function AppScreenshots() {
  const screenshots = [
    {
      title: "Landing Page",
      description: "Modern hero section with clear value proposition and call-to-action",
      features: ["Professional design", "Trust indicators", "Mobile responsive", "Clear navigation"]
    },
    {
      title: "Student Dashboard",
      description: "Personalized dashboard showing matches, applications, and progress",
      features: ["Match suggestions", "Application tracking", "Progress analytics", "Quick actions"]
    },
    {
      title: "Company Profile",
      description: "Comprehensive company profiles showcasing culture and opportunities",
      features: ["Company showcase", "Opportunity listings", "Culture insights", "Direct contact"]
    },
    {
      title: "Mobile Experience",
      description: "Optimized mobile interface for on-the-go access",
      features: ["Touch-friendly", "PWA support", "Offline capabilities", "Native feel"]
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">App Screenshots & Demo</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          A visual tour of InternLink's user interface and key features
        </p>
      </div>

      <Tabs defaultValue="desktop" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="desktop" className="flex items-center gap-2">
            <Monitor className="h-4 w-4" />
            Desktop
          </TabsTrigger>
          <TabsTrigger value="tablet" className="flex items-center gap-2">
            <Tablet className="h-4 w-4" />
            Tablet
          </TabsTrigger>
          <TabsTrigger value="mobile" className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            Mobile
          </TabsTrigger>
        </TabsList>

        <TabsContent value="desktop" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {screenshots.map((screenshot, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {screenshot.title}
                    <Badge variant="secondary">Desktop</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video bg-gradient-to-br from-primary/10 via-background to-accent/10 rounded-lg border-2 border-dashed border-muted flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <Monitor className="h-12 w-12 text-muted-foreground mx-auto" />
                      <p className="text-sm text-muted-foreground">Screenshot: {screenshot.title}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{screenshot.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Key Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {screenshot.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tablet" className="space-y-6">
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-none">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <Tablet className="h-16 w-16 text-primary mx-auto" />
                <h3 className="text-2xl font-bold">Tablet Experience</h3>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  InternLink adapts seamlessly to tablet devices, providing an optimal balance 
                  between the desktop's feature richness and mobile's touch-friendly interface.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Tablet Features</h4>
                    <ul className="text-sm space-y-2">
                      <li>• Adaptive layout optimization</li>
                      <li>• Touch-friendly controls</li>
                      <li>• Landscape & portrait modes</li>
                      <li>• Gesture navigation</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Use Cases</h4>
                    <ul className="text-sm space-y-2">
                      <li>• Profile management on-the-go</li>
                      <li>• Interview preparation</li>
                      <li>• Application reviews</li>
                      <li>• Company research</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mobile" className="space-y-6">
          <Card className="bg-gradient-to-r from-accent/5 to-primary/5 border-none">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <Smartphone className="h-16 w-16 text-accent mx-auto" />
                <h3 className="text-2xl font-bold">Mobile-First Design</h3>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Recognizing that students are primarily mobile users, InternLink is designed 
                  with a mobile-first approach, ensuring excellent performance on all smartphones.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="space-y-3">
                    <h4 className="font-semibold">PWA Features</h4>
                    <ul className="text-sm space-y-2">
                      <li>• App-like experience</li>
                      <li>• Offline functionality</li>
                      <li>• Push notifications</li>
                      <li>• Home screen installation</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Performance</h4>
                    <ul className="text-sm space-y-2">
                      <li>• Fast loading times</li>
                      <li>• Smooth animations</li>
                      <li>• Optimized images</li>
                      <li>• Efficient caching</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Usability</h4>
                    <ul className="text-sm space-y-2">
                      <li>• Thumb-friendly navigation</li>
                      <li>• Readable typography</li>
                      <li>• Accessible design</li>
                      <li>• Intuitive gestures</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Live Demo Section */}
      <Card className="bg-muted/30">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">Live Demo Available</h3>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Experience InternLink firsthand by navigating through our live application. 
              The actual screenshots and interactive demo showcase the real user interface, 
              demonstrating the seamless user experience across all device types.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Badge variant="outline" className="p-2">Responsive Design</Badge>
              <Badge variant="outline" className="p-2">Real-time Updates</Badge>
              <Badge variant="outline" className="p-2">Interactive Elements</Badge>
              <Badge variant="outline" className="p-2">Modern UI/UX</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
