
import { useRef, useEffect } from 'react';
import { Shield, Video, Calendar, Lock } from 'lucide-react';
import { features } from '@/lib/data';
import { cn } from '@/lib/utils';

const FeatureIcon = ({ icon }: { icon: string }) => {
  switch (icon) {
    case 'ShieldCheck':
      return <Shield className="h-10 w-10 text-flyp" />;
    case 'Video':
      return <Video className="h-10 w-10 text-flyp" />;
    case 'Calendar':
      return <Calendar className="h-10 w-10 text-flyp" />;
    case 'Lock':
      return <Lock className="h-10 w-10 text-flyp" />;
    default:
      return null;
  }
};

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (sectionRef.current) {
            sectionRef.current.classList.add('animate-fade-in');
            sectionObserver.unobserve(sectionRef.current);
          }
        }
      },
      { threshold: 0.1 }
    );

    const featureObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            featureObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }

    featureRefs.current.forEach((ref) => {
      if (ref) featureObserver.observe(ref);
    });

    return () => {
      if (sectionRef.current) sectionObserver.unobserve(sectionRef.current);
      featureRefs.current.forEach((ref) => {
        if (ref) featureObserver.unobserve(ref);
      });
    };
  }, []);

  return (
    <section id="features" className="section-padding bg-white" ref={sectionRef}>
      <div className="container mx-auto px-6 opacity-0">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-flyp-100 text-flyp-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            How It Works
          </span>
          <h2 className="text-4xl font-bold mb-4">Simple, Secure, and Effective</h2>
          <p className="text-gray-600 text-lg">
            Our platform makes it easy to connect with verified experts and get the guidance you need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              ref={(el) => (featureRefs.current[index] = el)}
              className={cn(
                "opacity-0 p-6 rounded-xl transition-all duration-300",
                "bg-gradient-to-br from-white to-gray-50",
                "border border-gray-100 hover:border-gray-200",
                "shadow-sm hover:shadow-md"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start">
                <div className={cn(
                  "p-3 rounded-xl mr-5",
                  "bg-flyp-50 text-flyp"
                )}>
                  <FeatureIcon icon={feature.icon} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="inline-block relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-flyp to-flyp-400 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
            <button className="relative bg-flyp hover:bg-flyp-600 text-white py-4 px-8 rounded-full font-medium text-lg hover:shadow-lg transition-all transform hover:scale-105">
              Find an Expert Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
