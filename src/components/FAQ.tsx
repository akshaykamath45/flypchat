
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqs } from '@/lib/data';
import { cn } from '@/lib/utils';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (sectionRef.current) {
            sectionRef.current.classList.add('animate-fade-in');
            observer.unobserve(sectionRef.current);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="section-padding bg-gray-50" ref={sectionRef}>
      <div className="container mx-auto px-6 opacity-0">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block bg-flyp-100 text-flyp-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 text-lg">
            Find answers to common questions about our service and how it works.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={cn(
                "mb-4 border border-gray-200 rounded-xl overflow-hidden transition-all duration-300",
                "bg-white hover:shadow-sm",
                activeIndex === index ? "shadow-sm" : ""
              )}
            >
              <button
                className="flex justify-between items-center w-full px-6 py-5 text-left"
                onClick={() => toggleQuestion(index)}
                aria-expanded={activeIndex === index}
              >
                <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                <ChevronDown 
                  size={20} 
                  className={cn(
                    "text-gray-500 transition-transform duration-300",
                    activeIndex === index ? "transform rotate-180" : ""
                  )} 
                />
              </button>
              <div 
                className={cn(
                  "px-6 transition-all duration-300 overflow-hidden",
                  activeIndex === index ? "pb-5 max-h-40" : "max-h-0"
                )}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
