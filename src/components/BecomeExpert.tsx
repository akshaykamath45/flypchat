import { useState } from 'react';
import { cn } from '@/lib/utils';

const BecomeExpert = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleJoinAsExpert = () => {
    setIsSubmitting(true);
    
    // Create the email content
    const recipients = 'flyn@flypchat.com,piyush@flypchat.com,akshay@flypchat.com';
    const subject = 'Interested in Becoming a Flypchat Expert!';
    const body = `Hello Flypchat Team,

I'm interested in joining your platform as an expert. I believe my expertise would be valuable to your users, and I'm excited about the opportunity to provide guidance through your platform.

Please let me know the next steps in the application process and what information you need from me to get started.

Looking forward to hearing from you soon.

Best regards,
Prospective Expert`;
    
    // Encode the email parameters for the mailto URL
    const mailtoUrl = `mailto:${encodeURIComponent(recipients)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Try to detect if user has Gmail
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipients)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Check if the user prefers Gmail (could be expanded with a user preference setting)
    const useGmail = window.confirm('Would you like to open Gmail instead of your default email client?');
    
    if (useGmail) {
      // Open Gmail in a new tab
      window.open(gmailUrl, '_blank');
    } else {
      // Open the default email client
      window.location.href = mailtoUrl;
    }
    
    // Simulate success after a short delay
    setTimeout(() => {
      setIsSuccess(true);
      setIsSubmitting(false);
    }, 1000);
  };


  return (
    <section className="py-16 bg-gradient-to-br from-flyp-50 to-white">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Want to be an Expert?
          </h2>
          
          <p className="text-xl text-gray-600 mb-8">
            Share your expertise, build your brand, and earn by helping others with personalized guidance on your own schedule.
          </p>
          
          {isSuccess ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-green-700 mb-2">Thank You for Your Interest!</h3>
              <p className="text-green-600">
                We've received your request to join as an expert. Our team will review your application and contact you soon.
              </p>
            </div>
          ) : (
            <button 
              onClick={handleJoinAsExpert}
              disabled={isSubmitting}
              className={cn(
                "relative group btn-primary min-w-[250px] py-4 text-lg",
                "before:absolute before:-inset-0.5 before:bg-gradient-to-r before:from-flyp before:to-flyp-400",
                "before:rounded-full before:blur before:opacity-70 before:group-hover:opacity-100 before:transition before:duration-1000",
                "hover:scale-[1.02] transition-all",
                isSubmitting && "opacity-75 cursor-not-allowed"
              )}
            >
              <span className="relative flex items-center justify-center">
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Join as an Expert'
                )}
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default BecomeExpert;