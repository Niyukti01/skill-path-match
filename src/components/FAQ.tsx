
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does InternLink's matching algorithm work?",
      answer: "Our algorithm analyzes your skills, interests, academic background, and career goals to match you with relevant internship opportunities. For companies, we match based on requirements, company culture, and candidate preferences."
    },
    {
      question: "Is InternLink free to use?",
      answer: "Yes! InternLink is completely free for students. Companies pay a small fee only when they successfully hire an intern through our platform."
    },
    {
      question: "How do I increase my chances of getting matched?",
      answer: "Complete your profile thoroughly, including skills, projects, and experiences. Upload a professional photo and keep your profile updated. The more information you provide, the better our matching algorithm can work for you."
    },
    {
      question: "What types of internships are available?",
      answer: "We offer internships across all industries including technology, finance, marketing, healthcare, engineering, and more. Both remote and in-person opportunities are available."
    },
    {
      question: "How long does it typically take to find an internship?",
      answer: "Most active students receive their first matches within 48 hours and secure an internship within 2-4 weeks. Success depends on profile completeness and engagement with the platform."
    },
    {
      question: "Can international students use InternLink?",
      answer: "Yes! We welcome international students and have many companies that sponsor work visas. Make sure to specify your work authorization status in your profile."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to know about InternLink. Can't find the answer you're looking for? Contact our support team.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-muted/50 transition-colors"
                >
                  <h3 className="font-semibold text-lg pr-4">{faq.question}</h3>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
