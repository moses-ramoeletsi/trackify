import { LogOut } from 'lucide-react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
      // Clear user data
      localStorage.removeItem('currentUser');
      localStorage.removeItem('rememberMe');
      
      // Show logout message and redirect to login after delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }, [navigate]);
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
      <div className="flex justify-center mb-4">
        <div className="bg-red-100 p-3 rounded-full">
          <LogOut size={32} className="text-red-600" />
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-4">Logging Out</h1>
      <p className="text-gray-600 mb-6">You have been successfully logged out.</p>
      <div className="animate-pulse">
        <p className="text-sm text-gray-500">Redirecting to login page...</p>
      </div>
    </div>
  </div>

  );
}

export default Logout