
import { useState, useRef, useEffect } from 'react';
import { Star, Shield, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Expert } from '@/lib/data';
import { cn } from '@/lib/utils';

interface ExpertCardProps {
  expert: Expert;
  index: number;
}

const ExpertCard = ({ expert, index }: ExpertCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (cardRef.current) {
            cardRef.current.classList.add('animate-slide-up');
            observer.unobserve(cardRef.current);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <div 
      ref={cardRef}
      className={cn(
        "opacity-0 group",
        "relative bg-white rounded-xl overflow-hidden transition duration-300 shadow-md hover:shadow-xl",
        "transform hover:-translate-y-1"
      )}
      style={{ animationDelay: `${index * 0.1 + 0.1}s` }}
    >
      <Link to={`/expert/${expert.id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <div className={cn(
            "absolute inset-0 bg-gray-200",
            isImageLoaded ? "opacity-0" : "animate-pulse"
          )} />
          <img 
            src={expert.avatarUrl} 
            alt={expert.name} 
            className={cn(
              "w-full h-full object-cover transition-all duration-500 image-load-blur",
              isImageLoaded ? "image-loaded" : ""
            )}
            onLoad={handleImageLoad}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-xs px-2 py-1 rounded-full">
            <Shield size={14} className="text-flyp" />
            <span className="text-xs font-medium">Verified</span>
          </div>
        </div>
        
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-flyp transition-colors">
              {expert.name}
            </h3>
            <div className="flex items-center gap-1 text-amber-500">
              <Star size={16} fill="currentColor" />
              <span className="text-sm font-medium">{expert.rating}</span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-3">{expert.title}</p>
          
          <div className="flex items-center justify-between mb-4">
            <span className="inline-block bg-flyp-100 text-flyp-700 px-2 py-1 rounded-full text-xs">
              {expert.specialization}
            </span>
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <Clock size={14} />
              <span>{expert.reviewCount} sessions</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <span className="text-xl font-bold text-gray-900">
              ${expert.price}
              <span className="text-sm font-normal text-gray-500">/hour</span>
            </span>
            <span className="relative overflow-hidden rounded-full group-hover:before:opacity-100 before:absolute before:inset-0 before:bg-gradient-to-r before:from-flyp before:to-flyp-400 before:opacity-0 before:transition-opacity before:duration-300">
              <span className="relative inline-block px-4 py-2 bg-flyp-50 text-flyp font-medium rounded-full transition-all group-hover:bg-transparent group-hover:text-white">
                Book Now
              </span>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ExpertCard;
