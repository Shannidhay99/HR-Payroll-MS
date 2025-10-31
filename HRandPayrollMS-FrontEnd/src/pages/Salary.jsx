import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Table from "../components/table/Table";
import SalarySettingsRow from "../components/table/rows/SalarySettingsRow";
import SalaryListRow from "../components/table/rows/SalaryListRow";

export default function Salary() {
  const [activeTab, setActiveTab] = useState('settings');
  const [newComponent, setNewComponent] = useState({ name: '', percentage: '' });
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  // Sample salary components data
  const sampleSalarySettings = [
    {
      id: 1,
      name: "Basic Salary",
      percentage: 70,
    },
    {
      id: 2,
      name: "House Rent",
      percentage: 20,
    },
    {
      id: 3,
      name: "Medical Allowance",
      percentage: 5,
    },
    {
      id: 4,
      name: "Transport Allowance",
      percentage: 5,
    }
  ];

  // Sample payslip records
  const samplePayslipRecords = [
    {
      id: 1,
      name: "Rashedul Islam",
      employeeId: "EMP-82382",
      salary: 50000,
      adjustmentAmount: 2000,
      adjustmentReason: "Performance Bonus",
      afterAdjustmentSalary: 52000,
      status: "Approved"
    },
    {
      id: 2,
      name: "Sadia Afrin",
      employeeId: "EMP-13445", 
      salary: 45000,
      adjustmentAmount: -1000,
      adjustmentReason: "Late Deduction",
      afterAdjustmentSalary: 44000,
      status: "Pending"
    },
    {
      id: 3,
      name: "Shahariar Islam",
      employeeId: "EMP-42452",
      salary: 48000,
      adjustmentAmount: 1500,
      adjustmentReason: "Overtime Payment",
      afterAdjustmentSalary: 49500,
      status: "Approved"
    },
    {
      id: 4,
      name: "Lina Rahman",
      employeeId: "EMP-24533",
      salary: 42000,
      adjustmentAmount: 0,
      adjustmentReason: "No Adjustment",
      afterAdjustmentSalary: 42000,
      status: "Rejected"
    }
  ];

  const [salarySettings, setSalarySettings] = useState(sampleSalarySettings);
  const [displayPayslipRecords] = useState(samplePayslipRecords);

  // Table headers for salary settings
  const salarySettingsLabels = [
    { title: "#", sort: false },
    { title: "Name", sort: true },
    { title: "Percentage", sort: true },
    { title: "Action", sort: false },
  ];

  // Table headers for payslip records
  const payslipLabels = [
    { title: "#", sort: false },
    { title: "Name", sort: true },
    { title: "Employee ID", sort: true },
    { title: "Salary", sort: true },
    { title: "Adjustment Amount", sort: true },
    { title: "Adjustment Reason", sort: true },
    { title: "After Adjustment Salary", sort: true },
    { title: "Status", sort: true },
    { title: "Action", sort: false },
  ];

  // Handle adding new salary component
  const handleAddComponent = () => {
    if (newComponent.name && newComponent.percentage) {
      const component = {
        id: salarySettings.length + 1,
        name: newComponent.name,
        percentage: parseFloat(newComponent.percentage)
      };
      setSalarySettings([...salarySettings, component]);
      setNewComponent({ name: '', percentage: '' });
    }
  };

  // Handle generating payslip
  const handleGeneratePayslip = () => {
    if (selectedMonth && selectedYear) {
      console.log(`Generating payslip for ${selectedMonth} ${selectedYear}`);
      // Add your payslip generation logic here
    }
  };

  // Handle showing payslip
  const handleShowPayslip = () => {
    if (selectedMonth && selectedYear) {
      console.log(`Showing payslip for ${selectedMonth} ${selectedYear}`);
      // Add your show payslip logic here
    }
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 10}, (_, i) => currentYear - i);

  return (
    <section className="px-6 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight font-inter">
              Salary Management
            </h1>
            <p className="text-gray-600 mt-2">Manage salary settings, components, and payslip generation</p>
          </div>
          <div className="flex space-x-3">
            <Link to="/payroll">
              <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                Back to Payroll
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              activeTab === 'settings'
                ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Salary Settings
          </button>
          <button
            onClick={() => setActiveTab('payslip')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              activeTab === 'payslip'
                ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Salary List / Payslip
          </button>
        </div>
      </div>

      {/* Salary Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          {/* Add New Component Form */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Add Salary Component</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter component name"
                  value={newComponent.name}
                  onChange={(e) => setNewComponent({...newComponent, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Percentage *
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter percentage"
                  value={newComponent.percentage}
                  onChange={(e) => setNewComponent({...newComponent, percentage: e.target.value})}
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleAddComponent}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center justify-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add More
                </button>
              </div>
            </div>
          </div>

          {/* Salary Settings Table */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Salary Components</h2>
            </div>
            <div className="p-6">
              <Table
                tableLabels={salarySettingsLabels}
                dataSet={salarySettings.length}
                itemsPerPage={10}
                resetSelection={() => {}}
              >
                {salarySettings.map((setting, index) => (
                  <SalarySettingsRow
                    key={setting.id}
                    data={setting}
                    index={index}
                  />
                ))}
              </Table>
            </div>
          </div>
        </div>
      )}

      {/* Salary List / Payslip Tab */}
      {activeTab === 'payslip' && (
        <div className="space-y-6">
          {/* Payslip Generation Form */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Generate Payslip</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Month *
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  <option value="">Select Month</option>
                  {months.map((month) => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Year *
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option value="">Select Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleGeneratePayslip}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Generate Payslip
                </button>
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleShowPayslip}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Show Payslip
                </button>
              </div>
            </div>
          </div>

          {/* Payslip Records Table */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Payslip Records</h2>
            </div>
            <div className="p-6">
              <Table
                tableLabels={payslipLabels}
                dataSet={displayPayslipRecords.length}
                itemsPerPage={10}
                resetSelection={() => {}}
              >
                {displayPayslipRecords.map((record, index) => (
                  <SalaryListRow
                    key={record.id}
                    data={record}
                    index={index}
                  />
                ))}
              </Table>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
