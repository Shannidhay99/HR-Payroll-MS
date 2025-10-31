import React from 'react';
import { Link } from 'react-router-dom';

export default function Settings() {
  const settingsCategories = [
    {
      title: "Time and Attendance",
      description: "Configure shift schedules, attendance types, and working hours",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      link: "/settings/time-attendance",
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
      iconBg: "bg-blue-100",
      features: ["Shift Management", "Attendance Types", "Working Days", "Grace Periods"]
    },
    {
      title: "Leave Settings",
      description: "Manage leave types, policies, and approval workflows",
      icon: (
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      link: "/settings/leave-settings",
      color: "bg-green-50 border-green-200 hover:bg-green-100",
      iconBg: "bg-green-100",
      features: ["Leave Approvers", "Leave Types", "Leave Days", "Holiday Calendar"]
    },
    {
      title: "Employee Settings",
      description: "Configure employee profiles, departments, and roles",
      icon: (
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      link: "/settings/employee-settings",
      color: "bg-purple-50 border-purple-200 hover:bg-purple-100",
      iconBg: "bg-purple-100",
      features: ["Department Management", "Role Definitions", "Employee Categories", "Profile Fields"]
    }
  ];

  return (
    <section className="px-6 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight font-inter">
              Settings
            </h1>
            <p className="text-gray-600 mt-2">Configure and manage your HR system settings and preferences</p>
          </div>
        </div>
      </div>

      {/* Settings Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {settingsCategories.map((category, index) => (
          <Link
            key={index}
            to={category.link}
            className={`block p-6 rounded-lg border-2 transition-all duration-300 hover:shadow-lg hover:scale-102 ${category.color}`}
          >
            <div className="flex items-start space-x-4">
              {/* Icon */}
              <div className={`w-12 h-12 rounded-lg ${category.iconBg} flex items-center justify-center text-2xl flex-shrink-0`}>
                {category.icon}
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {category.description}
                </p>
                
                {/* Features List */}
                <div className="grid grid-cols-2 gap-2">
                  {category.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-xs text-gray-500">
                      <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Arrow */}
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 hover:shadow-md hover:scale-105 transition-all duration-200 border border-blue-100">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-4">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <div className="text-left">
              <span className="text-sm font-semibold text-gray-800 block">System Preferences</span>
              <span className="text-xs text-gray-600">Configure global settings</span>
            </div>
          </button>
          
          <button className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 hover:shadow-md hover:scale-105 transition-all duration-200 border border-green-100">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-4">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <div className="text-left">
              <span className="text-sm font-semibold text-gray-800 block">Import/Export Data</span>
              <span className="text-xs text-gray-600">Manage data transfer</span>
            </div>
          </button>
          
          <button className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 hover:shadow-md hover:scale-105 transition-all duration-200 border border-purple-100">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-4">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="text-left">
              <span className="text-sm font-semibold text-gray-800 block">Backup Settings</span>
              <span className="text-xs text-gray-600">Save configuration data</span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
