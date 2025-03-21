
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-bold text-flyp mb-4">404</h1>
        <div className="h-1 w-20 bg-flyp mx-auto mb-6"></div>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved. Let us help you find your way back.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="btn-secondary flex items-center gap-2 min-w-[180px]"
          >
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </button>
          <button 
            onClick={() => navigate('/')}
            className="btn-primary flex items-center gap-2 min-w-[180px]"
          >
            <Home size={18} />
            <span>Return Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
