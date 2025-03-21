import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  Shield,
  Clock,
  Calendar,
  ChevronRight,
  Award,
  Briefcase,
  Bookmark,
  Share2,
} from "lucide-react";
import { getExpertById } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

const ExpertDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState("30");

  const expert = id ? getExpertById(id) : undefined;

  useEffect(() => {
    if (expert) {
      setIsLoading(false);
    } else {
      // Expert not found, redirect to homepage after a short delay
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [expert, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-flyp border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading expert profile...</p>
        </div>
      </div>
    );
  }

  if (!expert) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Expert Not Found</h1>
          <p className="text-gray-600 mb-8">
            The expert you're looking for doesn't exist or has been removed.
          </p>
          <button onClick={() => navigate("/")} className="btn-primary">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-16">
        {/* Breadcrumb navigation */}
        <div className="bg-gray-50 py-4 border-b border-gray-100">
          <div className="container mx-auto px-6">
            <div className="flex items-center text-sm text-gray-500">
              <a href="/" className="hover:text-flyp transition-colors">
                Home
              </a>
              <ChevronRight size={16} className="mx-2" />
              <a href="/#experts" className="hover:text-flyp transition-colors">
                Experts
              </a>
              <ChevronRight size={16} className="mx-2" />
              <span className="text-gray-900 font-medium">{expert.name}</span>
            </div>
          </div>
        </div>

        {/* Expert profile header */}
        <section className="pt-12 pb-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Left column - Expert info */}
              <div className="lg:col-span-2 animate-fade-in">
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden flex-shrink-0">
                    <div
                      className={cn(
                        "absolute inset-0 bg-gray-200",
                        imageLoaded ? "opacity-0" : "animate-pulse"
                      )}
                    />
                    <img
                      src={expert.avatarUrl}
                      alt={expert.name}
                      className={cn(
                        "w-full h-full object-cover image-load-blur",
                        imageLoaded ? "image-loaded" : ""
                      )}
                      onLoad={() => setImageLoaded(true)}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent pt-4 pb-2 px-3">
                      <div className="flex items-center gap-1 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full w-fit">
                        <Shield size={12} className="text-flyp" />
                        <span className="text-xs font-medium">Verified</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl md:text-4xl font-bold">
                        {expert.name}
                      </h1>
                      <div className="flex items-center gap-1 bg-amber-50 text-amber-500 px-2 py-0.5 rounded-full">
                        <Star size={16} fill="currentColor" />
                        <span className="text-sm font-medium">
                          {expert.rating}
                        </span>
                      </div>
                    </div>

                    <p className="text-xl text-gray-700 mb-3">{expert.title}</p>

                    <div className="flex flex-wrap gap-3 mb-4">
                      <span className="inline-block bg-flyp-100 text-flyp-700 px-3 py-1 rounded-full text-sm font-medium">
                        {expert.specialization}
                      </span>
                      <div className="flex items-center gap-1 text-gray-500 text-sm border border-gray-200 px-3 py-1 rounded-full">
                        <Clock size={14} />
                        <span>{expert.reviewCount} sessions</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button className="flex items-center gap-2 text-gray-700 hover:text-flyp transition-colors">
                        <Bookmark size={18} />
                        <span className="text-sm font-medium">Save</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-700 hover:text-flyp transition-colors">
                        <Share2 size={18} />
                        <span className="text-sm font-medium">Share</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="text-2xl font-semibold mb-4">About</h2>
                  <p className="text-gray-700 leading-relaxed mb-8">
                    {expert.bio}
                  </p>

                  <h2 className="text-2xl font-semibold mb-4">
                    Areas of Expertise
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
                    {expert.expertise.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100"
                      >
                        <Award size={18} className="text-flyp" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <h2 className="text-2xl font-semibold mb-4">
                    Experience & Education
                  </h2>
                  <div className="space-y-4 mb-6">
                    <div className="flex gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Briefcase size={20} className="text-gray-700" />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          Senior Advisor at GlobalFinance
                        </h3>
                        <p className="text-gray-500 text-sm">2015 - Present</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Award size={20} className="text-gray-700" />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          Ph.D. in Finance, Stanford University
                        </h3>
                        <p className="text-gray-500 text-sm">2010 - 2014</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column - Booking card */}
              <div className="animate-slide-in-left">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-24">
                  <h2 className="text-2xl font-bold mb-2">Book a Session</h2>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-3xl font-bold text-gray-900">
                        ${expert.price}
                        <span className="text-base font-normal text-gray-500">
                          /hour
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Clock size={16} />
                      <span className="text-sm">Usually responds in 24hrs</span>
                    </div>
                  </div>

                  <div className="mb-6 pb-6 border-b border-gray-100">
                    <h3 className="font-medium mb-2">Choose session length</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <input
                          type="radio"
                          id="duration-30"
                          name="duration"
                          value="30"
                          checked={selectedDuration === "30"}
                          onChange={(e) => setSelectedDuration(e.target.value)}
                          className="peer absolute opacity-0 w-full h-full cursor-pointer z-10"
                        />
                        <label
                          htmlFor="duration-30"
                          className="block text-center p-3 border border-gray-200 rounded-lg peer-checked:border-flyp peer-checked:bg-flyp-50 peer-checked:text-flyp transition-colors cursor-pointer"
                        >
                          <span className="block font-medium">30 min</span>
                          <span className="text-sm">
                            ${(expert.price / 2).toFixed(0)}
                          </span>
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="radio"
                          id="duration-60"
                          name="duration"
                          value="60"
                          checked={selectedDuration === "60"}
                          onChange={(e) => setSelectedDuration(e.target.value)}
                          className="peer absolute opacity-0 w-full h-full cursor-pointer z-10"
                        />
                        <label
                          htmlFor="duration-60"
                          className="block text-center p-3 border border-gray-200 rounded-lg peer-checked:border-flyp peer-checked:bg-flyp-50 peer-checked:text-flyp transition-colors cursor-pointer"
                        >
                          <span className="block font-medium">60 min</span>
                          <span className="text-sm">${expert.price}</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Available dates</h3>
                      {/* <button className="text-flyp text-sm flex items-center gap-1">
                        <Calendar size={14} />
                        <span>View calendar</span>
                      </button> */}
                    </div>

                    <div className="flex overflow-x-auto space-x-2 pb-2">
                      {expert.availability.map((day, index) => (
                        <div
                          key={index}
                          className="min-w-[120px] border border-gray-200 rounded-lg p-3 hover:border-flyp transition-colors cursor-pointer"
                        >
                          <p className="text-center font-medium mb-2">
                            {new Date(day.date).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                          <p className="text-xs text-center text-gray-500">
                            {day.slots.length} slots available
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    className="w-full btn-primary justify-center mb-4"
                    onClick={() =>
                      navigate(
                        `/booking/${expert.id}?duration=${selectedDuration}`
                      )
                    }
                  >
                    Check Availability
                  </button>

                  <div className="text-center text-sm text-gray-500">
                    <p>No charge until you schedule the appointment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ExpertDetail;
