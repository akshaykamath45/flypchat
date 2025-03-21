
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { getExpertById, durations } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';

const Booking = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const expert = id ? getExpertById(id) : undefined;
  
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState(durations[1].value);
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  
  const daysInWeek = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));
  
  // Generate time slots
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00'
  ];
  
  useEffect(() => {
    if (!expert) {
      navigate('/');
    }
  }, [expert, navigate]);
  
  const goToPreviousWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, -7));
  };
  
  const goToNextWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, 7));
  };
  
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };
  
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };
  
  const handleContinue = () => {
    if (selectedTime && expert) {
      navigate(`/confirmation/${expert.id}?date=${format(selectedDate, 'yyyy-MM-dd')}&time=${selectedTime}&duration=${selectedDuration}`);
    }
  };
  
  if (!expert) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-flyp border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16 pb-20">
        <div className="container mx-auto px-6 py-12">
          <button 
            onClick={() => navigate(`/expert/${expert.id}`)}
            className="flex items-center gap-2 text-gray-700 hover:text-flyp mb-8 transition-colors"
          >
            <ChevronLeft size={20} />
            <span>Back to Expert Profile</span>
          </button>
          
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Book a Session with {expert.name}</h1>
              <p className="text-xl text-gray-600">Select your preferred date, time, and duration</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Step 1: Select Duration */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-flyp-100 text-flyp w-8 h-8 rounded-full flex items-center justify-center font-bold">1</div>
                  <h2 className="text-xl font-semibold">Select Duration</h2>
                </div>
                
                <div className="space-y-3">
                  {durations.map((duration) => (
                    <div key={duration.value} className="relative">
                      <input 
                        type="radio" 
                        id={`duration-${duration.value}`} 
                        name="duration" 
                        value={duration.value}
                        checked={selectedDuration === duration.value}
                        onChange={() => setSelectedDuration(duration.value)}
                        className="peer absolute opacity-0 w-full h-full cursor-pointer z-10"
                      />
                      <label 
                        htmlFor={`duration-${duration.value}`} 
                        className={cn(
                          "flex items-center justify-between p-3 border rounded-lg transition-all",
                          "peer-checked:border-flyp peer-checked:bg-flyp-50",
                          "cursor-pointer hover:border-flyp-300"
                        )}
                      >
                        <span>{duration.label}</span>
                        <span className="font-medium">${(expert.price * duration.price / 3).toFixed(0)}</span>
                      </label>
                      <div className={cn(
                        "absolute top-1/2 right-3 -translate-y-1/2 w-5 h-5 border rounded-full",
                        "flex items-center justify-center transition-all",
                        "peer-checked:border-flyp peer-checked:bg-flyp text-white"
                      )}>
                        {selectedDuration === duration.value && <Check size={12} />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Step 2: Select Date */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-flyp-100 text-flyp w-8 h-8 rounded-full flex items-center justify-center font-bold">2</div>
                  <h2 className="text-xl font-semibold">Select Date</h2>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <button 
                    onClick={goToPreviousWeek}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <div className="text-sm font-medium">
                    {format(currentWeekStart, 'MMMM yyyy')}
                  </div>
                  <button 
                    onClick={goToNextWeek}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                    <div key={i} className="text-center text-sm font-medium text-gray-500 mb-1">
                      {day}
                    </div>
                  ))}
                  
                  {daysInWeek.map((date, i) => (
                    <button
                      key={i}
                      onClick={() => handleDateSelect(date)}
                      className={cn(
                        "py-2 rounded-lg text-center text-sm transition-all",
                        isSameDay(date, selectedDate) 
                          ? "bg-flyp text-white" 
                          : "hover:bg-gray-100"
                      )}
                    >
                      {format(date, 'd')}
                    </button>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <CalendarIcon size={16} />
                    <span>Selected: {format(selectedDate, 'EEEE, MMMM d, yyyy')}</span>
                  </div>
                </div>
              </div>
              
              {/* Step 3: Select Time */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-flyp-100 text-flyp w-8 h-8 rounded-full flex items-center justify-center font-bold">3</div>
                  <h2 className="text-xl font-semibold">Select Time</h2>
                </div>
                
                <div className="h-[250px] overflow-y-auto pr-2 space-y-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      className={cn(
                        "flex items-center w-full p-3 border rounded-lg transition-all",
                        time === selectedTime 
                          ? "border-flyp bg-flyp-50 text-flyp" 
                          : "hover:border-flyp-300"
                      )}
                    >
                      <Clock size={16} className="mr-2" />
                      <span>{time}</span>
                      {time === selectedTime && (
                        <Check size={16} className="ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Summary and Continue */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Expert</p>
                  <p className="font-medium">{expert.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Date & Time</p>
                  <p className="font-medium">
                    {format(selectedDate, 'MMM d, yyyy')} {selectedTime ? `at ${selectedTime}` : '(No time selected)'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Duration & Price</p>
                  <p className="font-medium">
                    {durations.find(d => d.value === selectedDuration)?.label} - 
                    ${(expert.price * (durations.find(d => d.value === selectedDuration)?.price || 1) / 3).toFixed(0)}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button 
                  onClick={handleContinue}
                  disabled={!selectedTime}
                  className={cn(
                    "btn-primary",
                    !selectedTime && "opacity-50 cursor-not-allowed"
                  )}
                >
                  Continue to Confirmation
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Booking;
