import React from 'react';
import { Link } from 'react-router-dom';

export default function Payroll() {
  const payrollCategories = [
    {
      title: "Salary",
      description: "Configure salary components, percentages, and generate payslips",
      icon: (
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      link: "/payroll/salary-settings",
      color: "bg-green-50 border-green-200 hover:bg-green-100",
      iconBg: "bg-green-100",
      features: ["Salary Components", "Percentage Settings", "Payslip Generation", "Salary Records"]
    },
    {
      title: "Increment",
      description: "Manage employee salary increments and adjustments",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      link: "/payroll/increment",
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
      iconBg: "bg-blue-100",
      features: ["Increment Processing", "Performance Based", "Adjustment Rules", "Approval Workflow"]
    }
  ];

  return (
    <section className="px-6 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight font-inter">
              Payroll Management
            </h1>
            <p className="text-gray-600 mt-2">Manage salary settings, increments, and payroll processing</p>
          </div>
        </div>
      </div>

      {/* Payroll Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {payrollCategories.map((category, index) => (
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
          <button className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 hover:shadow-md hover:scale-105 transition-all duration-200 border border-green-100">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-4">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="text-left">
              <span className="text-sm font-semibold text-gray-800 block">Process Monthly Payroll</span>
              <span className="text-xs text-gray-600">Generate payslips for all employees</span>
            </div>
          </button>
          
          <button className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 hover:shadow-md hover:scale-105 transition-all duration-200 border border-blue-100">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-4">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="text-left">
              <span className="text-sm font-semibold text-gray-800 block">Process Increments</span>
              <span className="text-xs text-gray-600">Apply salary increments</span>
            </div>
          </button>
          
          <button className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 hover:shadow-md hover:scale-105 transition-all duration-200 border border-purple-100">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-4">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="text-left">
              <span className="text-sm font-semibold text-gray-800 block">Payroll Reports</span>
              <span className="text-xs text-gray-600">Generate salary reports</span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
