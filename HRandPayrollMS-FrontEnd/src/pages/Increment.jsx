import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Table from "../components/table/Table";
import IncrementRow from "../components/table/rows/IncrementRow";

export default function Increment() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  // Table headers for increment
  const incrementLabels = [
    { title: "Name", sort: true },
    { title: "Employee ID", sort: true },
    { title: "Email", sort: true },
    { title: "Mobile", sort: true },
    { title: "Joining Date", sort: true },
    { title: "Salary", sort: true },
    { title: "Last Increment Date", sort: true },
    { title: "Action", sort: false },
  ];

  // Sample increment data using real employee information
  const incrementData = [
    {
      id: 1,
      name: "Rashedul Islam",
      employeeId: "EMP-82382",
      email: "rashed@gmail.com",
      mobile: "01934478672",
      joiningDate: "22-06-2025",
      salary: 50000,
      lastIncrementDate: "01-01-2025",
    },
    {
      id: 2,
      name: "Rifat Bandhan",
      employeeId: "EMP-33923",
      email: "bandhan@gmail.com",
      mobile: "01798674289",
      joiningDate: "22-06-2025",
      salary: 45000,
      lastIncrementDate: "15-12-2024",
    },
    {
      id: 3,
      name: "Sadia Afrin",
      employeeId: "EMP-13445",
      email: "sadia@gmail.com",
      mobile: "01843272377",
      joiningDate: "22-06-2025",
      salary: 55000,
      lastIncrementDate: "01-03-2025",
    },
    {
      id: 4,
      name: "Mazaharul Auntu",
      employeeId: "EMP-24422",
      email: "auntu@gmail.com",
      mobile: "01307842696",
      joiningDate: "22-06-2025",
      salary: 42000,
      lastIncrementDate: "10-11-2024",
    },
    {
      id: 5,
      name: "Shahariar Islam",
      employeeId: "EMP-42452",
      email: "shahriar@gmail.com",
      mobile: "01432344525",
      joiningDate: "20-06-2025",
      salary: 48000,
      lastIncrementDate: "20-02-2025",
    },
    {
      id: 6,
      name: "Lina Rahman",
      employeeId: "EMP-24533",
      email: "lina@gmail.com",
      mobile: "01923456789",
      joiningDate: "18-06-2025",
      salary: 46000,
      lastIncrementDate: "05-01-2025",
    },
  ];

  // Filter data based on search term
  const filteredData = incrementData.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle employee selection
  const handleSelectEmployee = (employeeId) => {
    setSelectedEmployees(prev =>
      prev.includes(employeeId)
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedEmployees.length === filteredData.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(filteredData.map(emp => emp.id));
    }
  };

  // Reset selection
  const resetSelection = () => {
    setSelectedEmployees([]);
  };

  return (
    <section className="px-6 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight font-inter">
              Payroll - Increment
            </h1>
            <p className="text-gray-600 mt-2">Manage employee salary increments and adjustments</p>
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

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg shadow p-4 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">{incrementData.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg shadow p-4 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Average Salary</p>
              <p className="text-2xl font-bold text-gray-900">৳{Math.round(incrementData.reduce((sum, emp) => sum + emp.salary, 0) / incrementData.length).toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 rounded-lg shadow p-4 border-l-4 border-purple-500">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-4">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Highest Salary</p>
              <p className="text-2xl font-bold text-gray-900">৳{Math.max(...incrementData.map(emp => emp.salary)).toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-orange-50 rounded-lg shadow p-4 border-l-4 border-orange-500">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-4">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="bg-white rounded-lg shadow mb-6 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <img src="/icons/search-icon.svg" alt="Search" className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search employees..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-red-500 focus:border-red-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">
              {selectedEmployees.length > 0 && `${selectedEmployees.length} selected`}
            </span>
            <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Bulk Increment
            </button>
          </div>
        </div>
      </div>

      {/* Increment Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Employee Increment Management</h2>
          <p className="text-sm text-gray-600 mt-1">
            Showing {filteredData.length} of {incrementData.length} employees
          </p>
        </div>
        <div className="p-6">
          <Table
            tableLabels={incrementLabels}
            dataSet={filteredData.length}
            itemsPerPage={10}
            selectAll={handleSelectAll}
            selectedData={selectedEmployees}
            resetSelection={resetSelection}
          >
            {filteredData.map((employee) => (
              <IncrementRow
                key={employee.id}
                data={employee}
                selectRow={() => handleSelectEmployee(employee.id)}
                selectedData={selectedEmployees}
              />
            ))}
          </Table>
        </div>
      </div>
    </section>
  );
}
