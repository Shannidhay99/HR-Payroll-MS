import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../features/api/authApi";

export default function EmployeeLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log("Attempting employee login with:", { email: formData.email, password: formData.password });
      
      const response = await login({ 
        email: formData.email, 
        password: formData.password 
      }).unwrap();
      
      console.log("Employee login response:", response);
      
      // Store user data and tokens
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("access_token", response.access_token);
      if (response.refresh_token) {
        localStorage.setItem("refresh_token", response.refresh_token);
      }
      
      // Determine user role from response
      const userRole = response.user.role || (response.user.role_id === 2 ? "admin" : "employee");
      localStorage.setItem("userRole", userRole);
      
      // Store employee data for employee components
      localStorage.setItem("employee", JSON.stringify(response.user));
      
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 2000,
      });
      
      // Always redirect to employee dashboard from employee login
      navigate("/employee/dashboard");
      
    } catch (error) {
      console.error("Employee login error:", error);
      
      // Handle validation errors
      if (error?.data?.message) {
        toast.error(error.data.message, {
          position: "top-right",
          autoClose: 3000,
        });
      } else if (error?.data?.errors) {
        const firstError = Object.values(error.data.errors)[0][0];
        toast.error(firstError, {
          position: "top-right",
          autoClose: 3000,
        });
      } else if (error?.message) {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error("Login failed. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <img 
            src="/images/smarthrlogo.png" 
            alt="SmartHR Logo" 
            className="h-16 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-900">Employee Portal</h1>
          <p className="text-gray-600 mt-1">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-3 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                tabIndex={-1}
                disabled={isLoading}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Forgot your password?{" "}
            <a href="#" className="text-red-600 hover:text-red-700 font-medium">
              Contact IT Support
            </a>
          </p>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Need admin access?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Admin Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
