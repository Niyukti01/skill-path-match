
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, MessageCircle, HelpCircle, Users, Building2, Code, Zap } from "lucide-react";

export function QAndA() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqCategories = [
    {
      category: "Platform Features",
      icon: Zap,
      color: "primary",
      questions: [
        {
          question: "How does InternLink's matching algorithm work?",
          answer: "Our AI-powered algorithm analyzes multiple factors including student skills, interests, academic background, career goals, and company requirements. It considers cultural fit, location preferences, and success patterns to generate compatibility scores and provide personalized matches for both students and companies."
        },
        {
          question: "What makes InternLink different from existing platforms?",
          answer: "Unlike general job boards, InternLink is exclusively designed for internships. We offer specialized features like dual-optimized user experiences, AI-powered matching, company verification, direct communication tools, and comprehensive application tracking - all tailored for the internship ecosystem."
        },
        {
          question: "Is the platform free to use?",
          answer: "Yes, basic features are completely free for students, including profile creation, browsing opportunities, and applying to internships. Companies have access to basic posting features with premium options for enhanced visibility, analytics, and advanced matching capabilities."
        }
      ]
    },
    {
      category: "For Students",
      icon: Users,
      color: "accent",
      questions: [
        {
          question: "How do I create an effective profile?",
          answer: "Complete all profile sections including skills, projects, experiences, and career interests. Upload a professional photo, add portfolio links, and keep your information updated. The more comprehensive your profile, the better our matching algorithm can work for you."
        },
        {
          question: "What types of internships are available?",
          answer: "We offer internships across all industries including technology, finance, marketing, healthcare, engineering, and more. Both remote and in-person opportunities are available, with positions ranging from part-time to full-time summer internships."
        },
        {
          question: "How long does it take to find an internship?",
          answer: "Most active students receive their first matches within 48 hours of profile completion. On average, students secure an internship within 2-4 weeks, depending on profile completeness, application activity, and market demand in their field."
        }
      ]
    },
    {
      category: "For Companies",
      icon: Building2,
      color: "primary",
      questions: [
        {
          question: "How do you verify company legitimacy?",
          answer: "We have a rigorous verification process that includes company registration validation, LinkedIn verification, website verification, and manual review. Only legitimate companies with verified internship opportunities are allowed on our platform."
        },
        {
          question: "What are the benefits for companies?",
          answer: "Companies gain access to pre-qualified, motivated candidates, streamlined recruitment processes, reduced time-to-hire, and tools to showcase company culture. Our platform helps identify candidates who are genuinely interested and well-suited for your opportunities."
        },
        {
          question: "How does the application tracking system work?",
          answer: "Our system provides real-time updates on application status, candidate communications, interview scheduling, and decision tracking. Companies can manage their entire recruitment pipeline through our centralized dashboard with analytics and reporting features."
        }
      ]
    },
    {
      category: "Technical",
      icon: Code,
      color: "accent",
      questions: [
        {
          question: "What technologies power InternLink?",
          answer: "InternLink is built with modern web technologies including React 18, TypeScript, Tailwind CSS, and TanStack Query. We use a component-based architecture with PWA capabilities, ensuring excellent performance across all devices and platforms."
        },
        {
          question: "Is the platform mobile-friendly?",
          answer: "Absolutely! InternLink uses a mobile-first design approach with Progressive Web App (PWA) capabilities. Users can install it on their devices for an app-like experience, with offline functionality and push notifications support."
        },
        {
          question: "How do you ensure data security and privacy?",
          answer: "We implement industry-standard security practices including data encryption, secure authentication, regular security audits, and compliance with privacy regulations. User data is protected and never shared without explicit permission."
        }
      ]
    }
  ];

  const toggleFAQ = (categoryIndex: number, questionIndex: number) => {
    const index = categoryIndex * 100 + questionIndex;
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Questions & Answers</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Comprehensive answers to common questions about InternLink
        </p>
      </div>

      {/* Interactive Q&A Section */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-none">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <MessageCircle className="h-16 w-16 text-primary mx-auto" />
            <h2 className="text-2xl font-bold">Ask Questions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              This presentation covers the key aspects of InternLink. Feel free to ask questions 
              about any features, technical decisions, or implementation details.
            </p>
            <Button size="lg" className="mt-4">
              <MessageCircle className="h-5 w-5 mr-2" />
              Start Discussion
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Categories */}
      <div className="space-y-6">
        {faqCategories.map((category, categoryIndex) => (
          <Card key={categoryIndex} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${category.color === 'primary' ? 'bg-primary/10' : 'bg-accent/10'}`}>
                  <category.icon className={`h-6 w-6 ${category.color === 'primary' ? 'text-primary' : 'text-accent'}`} />
                </div>
                {category.category}
                <Badge variant="secondary" className="ml-auto">
                  {category.questions.length} questions
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {category.questions.map((faq, questionIndex) => {
                const index = categoryIndex * 100 + questionIndex;
                const isOpen = openIndex === index;
                
                return (
                  <div key={questionIndex} className="border rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleFAQ(categoryIndex, questionIndex)}
                      className="w-full p-4 text-left flex justify-between items-center hover:bg-muted/50 transition-colors"
                    >
                      <h4 className="font-semibold pr-4">{faq.question}</h4>
                      {isOpen ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 border-t bg-muted/20">
                        <p className="text-muted-foreground leading-relaxed pt-4">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Common Presentation Questions */}
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <HelpCircle className="h-6 w-6 text-primary" />
            Common Presentation Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Technical Questions</h4>
              <ul className="space-y-2 text-sm">
                <li>• Why did you choose React over other frameworks?</li>
                <li>• How do you handle state management?</li>
                <li>• What's your approach to responsive design?</li>
                <li>• How do you ensure code quality?</li>
                <li>• What testing strategies do you use?</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Business Questions</h4>
              <ul className="space-y-2 text-sm">
                <li>• What's your monetization strategy?</li>
                <li>• How do you plan to scale the platform?</li>
                <li>• What are the main competitive advantages?</li>
                <li>• How do you measure success?</li>
                <li>• What are the biggest risks and challenges?</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Thank You Section */}
      <Card className="bg-gradient-to-r from-primary to-accent text-white">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">Thank You!</h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Thank you for your attention during this presentation. InternLink represents our commitment 
              to solving real-world problems through innovative technology and user-centered design.
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <Badge variant="secondary" className="p-2 text-primary">
                Questions Welcome
              </Badge>
              <Badge variant="secondary" className="p-2 text-primary">
                Discussion Encouraged
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
