import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleCallbackMutation } from '../../features/api/authApi';
import { toast } from 'react-toastify';

const GoogleCallback = () => {
  const [handleCallback, { isLoading }] = useGoogleCallbackMutation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        // Get the token from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (!token) {
          throw new Error('No token received from Google');
        }

        const response = await handleCallback({ token }).unwrap();
        
        // Store user data and tokens
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('access_token', response.access_token);
        if (response.refresh_token) {
          localStorage.setItem('refresh_token', response.refresh_token);
        }

        // Determine user role
        const userRole = response.user.role || (response.user.role_id === 2 ? 'admin' : 'employee');
        localStorage.setItem('userRole', userRole);

        // Store employee data if needed
        if (userRole === 'employee') {
          localStorage.setItem('employee', JSON.stringify(response.user));
        }

        toast.success(`Google login successful as ${userRole}!`);

        // Redirect based on role
        navigate(userRole === 'admin' ? '/dashboard' : '/employee/dashboard');
      } catch (error) {
        console.error('Google callback error:', error);
        toast.error('Google login failed. Please try again.');
        navigate('/login');
      }
    };

    handleGoogleCallback();
  }, [handleCallback, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Completing Google sign in...</p>
        </div>
      </div>
    );
  }

  return null;
};

export default GoogleCallback;