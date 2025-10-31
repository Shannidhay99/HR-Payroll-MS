import React, { useState } from "react";
import { useRegisterMutation } from "../../features/api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TenantSelect from "../../components/tenant/TenantSelect";

const Registration = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "employee", // default to employee
    tenant_id: null, // for employee registration
  });
  
  const [errors, setErrors] = useState({});
  const [register, { isLoading }] = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters long!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    try {
      // Validate form
      const newErrors = {};
      if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!form.email.trim()) newErrors.email = 'Email is required';
      if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email format';
      if (!form.password) newErrors.password = 'Password is required';
      if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
      if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      if (form.role === 'employee' && !form.tenant_id) newErrors.tenant_id = 'Please select an organization';

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        Object.values(newErrors).forEach(error => {
          toast.error(error, {
            position: "top-right",
            autoClose: 3000,
          });
        });
        return;
      }

      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        password: form.password,
        password_confirmation: form.confirmPassword,
        role: form.role,
      };

      // Add tenant_id for employee registration
      if (form.role === 'employee') {
        payload.tenant_id = form.tenant_id;
      }
      
      console.log("Sending registration payload:", payload);
      const response = await register(payload).unwrap();
      console.log("Registration response:", response);
      
      // Store user data and tokens
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("access_token", response.token);
      if (response.refresh_token) {
        localStorage.setItem("refresh_token", response.refresh_token);
      }
      
      // Store user role
      const userRole = response.role || (response.user.role_id === 2 ? "admin" : "employee");
      localStorage.setItem("userRole", userRole);
      
      // For employee registration, also store in employee key for employee components
      if (userRole === "employee") {
        localStorage.setItem("employee", JSON.stringify(response.user));
      }
      
      toast.success(`Registration successful! Welcome aboard as ${userRole}!`, {
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
      console.error("Registration error:", error);
      
      // Handle validation errors
      if (error?.data?.errors) {
        const firstError = Object.values(error.data.errors)[0][0];
        toast.error(firstError, {
          position: "top-right",
          autoClose: 3000,
        });
      } else if (error?.data?.message) {
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
        toast.error("Registration failed. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-8">
      {/* HR-themed background with red touches */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-blue-50"></div>
      
      {/* Decorative elements with red accents */}
      <div className="absolute top-10 right-10 w-36 h-36 bg-red-200/30 rounded-full blur-3xl"></div>
      <div className="absolute top-60 left-20 w-28 h-28 bg-blue-300/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 right-20 w-44 h-44 bg-red-100/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-60 left-10 w-24 h-24 bg-red-200/30 rounded-full blur-xl"></div>
      
      {/* Business-themed icons background with red touches */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-16 right-1/4 text-red-400">
          <svg className="w-14 h-14" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
          </svg>
        </div>
        <div className="absolute top-32 left-1/3 text-blue-300">
          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
          </svg>
        </div>
        <div className="absolute bottom-40 left-1/4 text-red-300">
          <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2.5-9H19v2h-3V2H8v2H5V2H3.5C2.67 2 2 2.67 2 3.5V20c0 .83.67 1.5 1.5 1.5H19c.83 0 1.5-.67 1.5-1.5V3.5C20.5 2.67 19.83 2 19 2h-.5z"/>
          </svg>
        </div>
        <div className="absolute top-48 right-1/3 text-red-200">
          <svg className="w-11 h-11" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-1c0-1.1.9-2 2-2s2 .9 2 2v1h2v-1c0-2.2-1.8-4-4-4s-4 1.8-4 4v1h2zm8-10c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 1c-2.2 0-4 1.8-4 4v4h2v-4c0-1.1.9-2 2-2s2 .9 2 2v4h2v-4c0-2.2-1.8-4-4-4z"/>
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
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Join Our Team</h2>
          <p className="text-gray-600 mt-2">Create your HR account to get started</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">First Name</label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
              placeholder="First name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
              placeholder="Last name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2 col-span-2">
            <label className="text-sm font-medium text-gray-700 block">Phone</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm"
              disabled={isLoading}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 block">Account Type</label>
          <div className="grid grid-cols-2 gap-3">
            <label className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
              form.role === 'employee' 
                ? 'border-red-500 bg-red-50' 
                : 'border-gray-300 bg-white hover:border-gray-400'
            }`}>
              <input
                type="radio"
                name="role"
                value="employee"
                checked={form.role === 'employee'}
                onChange={handleChange}
                className="sr-only"
                disabled={isLoading}
              />
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  form.role === 'employee' ? 'border-red-500' : 'border-gray-300'
                }`}>
                  {form.role === 'employee' && (
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-900">Employee</div>
                  <div className="text-xs text-gray-500">Access to employee features</div>
                </div>
              </div>
            </label>
            
            <label className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
              form.role === 'admin' 
                ? 'border-red-500 bg-red-50' 
                : 'border-gray-300 bg-white hover:border-gray-400'
            }`}>
              <input
                type="radio"
                name="role"
                value="admin"
                checked={form.role === 'admin'}
                onChange={handleChange}
                className="sr-only"
                disabled={isLoading}
              />
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  form.role === 'admin' ? 'border-red-500' : 'border-gray-300'
                }`}>
                  {form.role === 'admin' && (
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-900">Administrator</div>
                  <div className="text-xs text-gray-500">Full system access</div>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Tenant Selection - Only show for employee role */}
        {form.role === 'employee' && (
          <TenantSelect
            value={form.tenant_id}
            onChange={(value) => setForm(prev => ({ ...prev, tenant_id: value }))}
            error={errors.tenant_id}
          />
        )}
        
        {/* Role Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="text-blue-500 mt-0.5">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-blue-900">
                {form.role === 'admin' ? 'Administrator Account' : 'Employee Account'}
              </h4>
              <p className="text-sm text-blue-700 mt-1">
                {form.role === 'admin' 
                  ? 'You will have full access to manage employees, payroll, reports, and system settings. A new organization will be created for you.'
                  : 'You will have access to view your profile, attendance, payslips, and submit leave requests. You will need to be assigned to an organization by an administrator.'
                }
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 block">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm"
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 block">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm pr-12"
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

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 block">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm pr-12"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              tabIndex={-1}
              disabled={isLoading}
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-3 px-4 rounded-lg font-medium hover:from-red-700 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Account...
            </div>
          ) : (
            "Create Account"
          )}
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-red-600 hover:text-red-700 font-medium">
              Sign In
            </Link>
          </p>
        </div>

        <div className="text-xs text-gray-500 text-center">
          <p>By creating an account, you agree to our Terms of Service and Privacy Policy.</p>
        </div>
      </form>
    </div>
  );
};

export default Registration;
