
import { useState, useRef, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import ExpertCard from './ExpertCard';
import { experts } from '@/lib/data';
import { cn } from '@/lib/utils';

const ExpertGrid = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
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

  const filteredExperts = experts.filter(expert => {
    const matchesSearch = expert.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         expert.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expert.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = !filter || expert.specialization === filter;
    
    return matchesSearch && matchesFilter;
  });

  const specializations = [...new Set(experts.map(expert => expert.specialization))];

  return (
    <section id="experts" className="section-padding bg-gray-50" ref={sectionRef}>
      <div className="container mx-auto px-6 opacity-0">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block bg-flyp-100 text-flyp-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            Our Experts
          </span>
          <h2 className="text-4xl font-bold mb-4">Connect With Verified Specialists</h2>
          <p className="text-gray-600 text-lg">
            Discover professionals rigorously vetted for their expertise, experience, and commitment to quality guidance.
          </p>
        </div>

        <div className="mb-10 max-w-3xl mx-auto">
          <div className={cn(
            "flex flex-col md:flex-row gap-4 p-2 bg-white rounded-xl shadow-sm",
            "border border-gray-200 focus-within:border-flyp transition-all"
          )}>
            <div className="flex-grow flex items-center px-4 py-2">
              <Search size={20} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search by name, specialization, or title..."
                className="w-full border-none focus:outline-none bg-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="border-t md:border-l md:border-t-0 border-gray-200"></div>
            
            <div className="relative px-4 py-2 flex items-center">
              <Filter size={20} className="text-gray-400 mr-2" />
              <select
                className="appearance-none bg-transparent pr-8 focus:outline-none cursor-pointer"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">All Specializations</option>
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExperts.length > 0 ? (
            filteredExperts.map((expert, index) => (
              <ExpertCard key={expert.id} expert={expert} index={index} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-gray-600">No experts found matching your criteria. Try adjusting your search.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExpertGrid;
