import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginMutation, useGoogleLoginMutation } from "../../features/api/authApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const [googleLogin] = useGoogleLoginMutation();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const response = await googleLogin().unwrap();
      // Google OAuth will handle the redirect
      window.location.href = response.url;
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log("Attempting login with:", { email, password });
      
      const response = await login({ email, password }).unwrap();
      console.log("Login response:", response);
      
      // Store user data and tokens
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("access_token", response.access_token);
      if (response.refresh_token) {
        localStorage.setItem("refresh_token", response.refresh_token);
      }
      
      // Determine user role from response or user data
      const userRole = response.user.role || (response.user.role_id === 2 ? "admin" : "employee");
      localStorage.setItem("userRole", userRole);
      
      // For employee login, also store in employee key for employee components
      if (userRole === "employee") {
        localStorage.setItem("employee", JSON.stringify(response.user));
      }
      
      toast.success(`Login successful as ${userRole}!`, {
        position: "top-right",
        autoClose: 2000,
      });
      
      // Redirect based on role
      if (userRole === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/employee/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      
      // Handle validation errors
      if (error?.data?.message) {
        toast.error(error.data.message, {
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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* HR-themed background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-red-100"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-red-200/30 rounded-full blur-3xl"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-red-300/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-red-100/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 right-10 w-20 h-20 bg-red-200/30 rounded-full blur-xl"></div>
      
      {/* Office-themed icons background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-1/4 text-red-400">
          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
        </div>
        <div className="absolute top-40 right-1/4 text-red-300">
          <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-1c0-1.1.9-2 2-2s2 .9 2 2v1h2v-1c0-2.2-1.8-4-4-4s-4 1.8-4 4v1h2zm8-10c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 1c-2.2 0-4 1.8-4 4v4h2v-4c0-1.1.9-2 2-2s2 .9 2 2v4h2v-4c0-2.2-1.8-4-4-4zm6 2c-1.1 0-2 .9-2 2v4h2v-4c0-.55.45-1 1-1s1 .45 1 1v4h2v-4c0-1.1-.9-2-2-2z"/>
          </svg>
        </div>
        <div className="absolute bottom-32 left-1/3 text-red-200">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
          </svg>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="relative bg-white/95 backdrop-blur-sm w-full max-w-md mx-4 p-8 rounded-2xl shadow-2xl border border-red-100 space-y-6 z-10">
        <div className="text-center mb-8">
          <Link 
            to="/" 
            className="inline-block mb-4 text-red-600 hover:text-red-700 transition-colors"
          >
            ← Back to Home
          </Link>
          <div className="mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Sign in to access your dashboard</p>
          <p className="text-xs text-gray-500 mt-1">Automatically redirects to admin or employee portal based on your account</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 block">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all text-sm"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 block">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all text-sm pr-12"
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
          className="w-full py-3 px-4 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600 focus:ring-red-500"
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

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="w-full flex justify-center items-center gap-2 bg-white py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all disabled:opacity-50"
            >
              <img 
                src="https://www.google.com/favicon.ico" 
                alt="Google" 
                className="w-5 h-5"
              />
              Sign in with Google
            </button>
          </div>
        </div>

        <div className="text-center space-y-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-red-600 hover:text-red-700 font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
