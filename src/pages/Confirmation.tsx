
import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Clock, CheckCircle, AlertCircle, Briefcase, CreditCard, ChevronLeft } from 'lucide-react';
import { getExpertById, durations } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

const Confirmation = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const date = queryParams.get('date');
  const time = queryParams.get('time');
  const duration = queryParams.get('duration');
  
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const expert = id ? getExpertById(id) : undefined;
  const selectedDuration = durations.find(d => d.value === duration);
  
  const parsedDate = date ? new Date(date) : null;
  const formattedDate = parsedDate ? parsedDate.toLocaleDateString('en-US', { 
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : '';
  
  useEffect(() => {
    if (!expert || !date || !time || !duration) {
      navigate('/');
    }
  }, [expert, date, time, duration, navigate]);
  
  const handleConfirmBooking = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsConfirmed(true);
      
      // Scroll to top to show confirmation message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };
  
  if (!expert || !date || !time || !duration) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-flyp border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading confirmation details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16 pb-20">
        <div className="container mx-auto px-6 py-12">
          {!isConfirmed ? (
            <>
              <button 
                onClick={() => navigate(`/booking/${expert.id}`)}
                className="flex items-center gap-2 text-gray-700 hover:text-flyp mb-8 transition-colors"
                disabled={isLoading}
              >
                <ChevronLeft size={20} />
                <span>Back to Booking</span>
              </button>
              
              <div className="max-w-3xl mx-auto">
                <div className="mb-8 text-center">
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">Confirm Your Booking</h1>
                  <p className="text-xl text-gray-600">Review and confirm your session details</p>
                </div>
                
                <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm mb-8">
                  <h2 className="text-2xl font-semibold mb-6 pb-4 border-b border-gray-100">Booking Summary</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Expert Details</h3>
                      <div className="flex gap-4">
                        <img 
                          src={expert.avatarUrl} 
                          alt={expert.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-semibold text-lg">{expert.name}</p>
                          <p className="text-gray-600">{expert.title}</p>
                          <p className="text-sm text-gray-500 mt-1">{expert.specialization}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Session Details</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <Calendar size={20} className="text-flyp mt-0.5" />
                          <div>
                            <p className="font-medium">Date</p>
                            <p className="text-gray-600">{formattedDate}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Clock size={20} className="text-flyp mt-0.5" />
                          <div>
                            <p className="font-medium">Time</p>
                            <p className="text-gray-600">{time}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Briefcase size={20} className="text-flyp mt-0.5" />
                          <div>
                            <p className="font-medium">Duration</p>
                            <p className="text-gray-600">{selectedDuration?.label}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-b border-gray-100 py-4 my-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg">Session fee</span>
                      <span className="text-lg font-semibold">
                        ${(expert.price * (selectedDuration?.price || 1) / 3).toFixed(0)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-medium mb-4">Payment Method</h3>
                    <div className="border border-gray-200 rounded-lg p-4 flex items-center gap-3">
                      <CreditCard size={24} className="text-gray-500" />
                      <div>
                        <p className="font-medium">Credit Card</p>
                        <p className="text-sm text-gray-500">You'll be charged after confirming the booking</p>
                      </div>
                    </div>
                  </div>
                  
                  {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 flex items-center gap-3">
                      <AlertCircle size={20} />
                      <p>{error}</p>
                    </div>
                  )}
                  
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <button 
                      onClick={() => navigate(`/booking/${expert.id}`)}
                      className="btn-secondary"
                      disabled={isLoading}
                    >
                      Back
                    </button>
                    <button 
                      onClick={handleConfirmBooking}
                      className={cn(
                        "btn-primary flex items-center justify-center",
                        isLoading && "opacity-80"
                      )}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        "Confirm Booking"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="max-w-3xl mx-auto text-center">
              <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-md">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} className="text-green-600" />
                </div>
                
                <h1 className="text-3xl font-bold mb-4">Booking Confirmed!</h1>
                <p className="text-xl text-gray-600 mb-8">
                  Your session with {expert.name} has been successfully scheduled.
                </p>
                
                <div className="bg-gray-50 p-6 rounded-xl mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-gray-500 mb-1">Expert</p>
                      <p className="font-semibold">{expert.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Date & Time</p>
                      <p className="font-semibold">{formattedDate} at {time}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Duration</p>
                      <p className="font-semibold">{selectedDuration?.label}</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">
                  We've sent a confirmation email with all the details and instructions for your session.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button 
                    onClick={() => navigate('/')}
                    className="btn-secondary"
                  >
                    Return to Home
                  </button>
                  <button 
                    onClick={() => navigate(`/expert/${expert.id}`)}
                    className="btn-primary"
                  >
                    View Expert Profile
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Confirmation;
