import React from 'react';

// Removed duplicate LeaveApplication component and default export
import Table from "../components/table/Table";
import { useState } from "react";
import AllEmployeeRow from "../components/table/rows/LeaveApplicationRow";

const tableLabels = [
  { title: "Name", sort: true },
  { title: "Employee ID", sort: true },
  { title: "Start Date", sort: true },
  { title: "End Date", sort: true },
  { title: "Count", sort: true },
  { title: "Leave Reason", sort: true },
  { title: "Status", sort: true },
  { title: "Action", sort: false },
];

const initialTableData = [
  {
    id: 1,
    name: {
      title: "Rashedul Islam",
      image: "/images/profile-photo.jpg",
      visibleCheckbox: true,
    },
    employeeId: "EMP-82382",
    startDate: "19-06-2025",
    endDate: "22-06-2025",
    leaveCount: "4",
    leaveReason: "Sick",
    status: "Approved",
  },
  {
    id: 2,
    name: {
      title: "Rifat Bandhan",
      image: "/images/bandhan-pic.jpg",
      visibleCheckbox: true,
    },
    employeeId: "EMP-33923",
    startDate: "21-06-2025",
    endDate: "22-06-2025",
    leaveCount: "2",
    leaveReason: "Family Program",
    status: "Approved",
  },
  {
    id: 3,
    name: {
      title: "Sadia Afrin",
      image: "/images/sadia-pic.jpg",
      visibleCheckbox: true,
    },
    employeeId: "EMP-13445",
    startDate: "22-06-2025",
    endDate: "22-06-2025",
    leaveCount: "1",
    leaveReason: "Family Program",
    status: "Approved",
  },
  {
    id: 4,
    name: {
      title: "Mazaharul Auntu",
      image: "/images/auntu-pic.jpg",
      visibleCheckbox: true,
    },
    employeeId: "EMP-24422",
    startDate: "21-06-2025",
    endDate: "22-06-2025",
    leaveCount: "2",
    leaveReason: "Relationship Issue",
    status: "Declined",
  },
  {
    id: 5,
    name: {
      title: "Shahariar Islam",
      image: "/images/shahriar-pic.jpg",
      visibleCheckbox: true,
    },
    employeeId: "EMP-42452",
    startDate: "18-06-2025",
    endDate: "22-06-2025",
    leaveCount: "5",
    leaveReason: "Casual",
    status: "Pending",
  },
  {
    id: 6,
    name: {
      title: "Lina Rahman",
      image: "/images/lina-pic.jpg",
      visibleCheckbox: true,
    },
    employeeId: "EMP-42332",
    startDate: "21-06-2025",
    endDate: "21-06-2025",
    leaveCount: "1",
    leaveReason: "Casual",
    status: "Declined",
  },
];

export default function LeaveApplication() {
  const [tableData, setTableData] = useState(initialTableData);
  const [select, setSelect] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showBulkActions, setShowBulkActions] = useState(false);

  // Filter table data based on search term and status
  const filteredData = tableData.filter((employee) => {
    const searchLower = searchTerm.toLowerCase();
    
    // Text search filter
    const matchesSearch = !searchTerm || (
      employee.name.title.toLowerCase().includes(searchLower) ||
      employee.employeeId.toLowerCase().includes(searchLower) ||
      employee.leaveReason.toLowerCase().includes(searchLower)
    );

    // Status filter
    const matchesStatus = statusFilter === "All" || employee.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const resetSelection = () => {
    setSelect([]);
    setShowBulkActions(false);
  };

  // Function to update a single record
  const updateRecord = (id, field, value) => {
    setTableData(prevData => 
      prevData.map(record => 
        record.id === id ? { ...record, [field]: value } : record
      )
    );
  };

  // Function to update multiple records
  const updateMultipleRecords = (ids, updates) => {
    setTableData(prevData => 
      prevData.map(record => 
        ids.includes(record.id) ? { ...record, ...updates } : record
      )
    );
  };

  const handleSelect = (item, e) => {
    if (e.target.checked) {
      const newSelection = [...select, item];
      setSelect(newSelection);
      setShowBulkActions(newSelection.length > 0);
    } else {
      const newSelection = select.filter((data) => item !== data);
      setSelect(newSelection);
      setShowBulkActions(newSelection.length > 0);
    }
  };

  const selectAll = (e) => {
    if (e.target.checked) {
      setSelect(filteredData.map((data) => data.id));
      setShowBulkActions(true);
    } else {
      resetSelection();
    }
  };

  const handleBulkApprove = () => {
    updateMultipleRecords(select, { status: "Approved" });
    console.log("Approving selected applications:", select);
    alert(`${select.length} leave applications approved!`);
    resetSelection();
  };

  const handleBulkDecline = () => {
    if (window.confirm(`Are you sure you want to decline ${select.length} selected applications?`)) {
      updateMultipleRecords(select, { status: "Declined" });
      console.log("Declining selected applications:", select);
      alert(`${select.length} leave applications declined!`);
      resetSelection();
    }
  };

  // Calculate statistics
  const stats = {
    total: tableData.length,
    approved: tableData.filter(app => app.status === "Approved").length,
    declined: tableData.filter(app => app.status === "Declined").length,
    pending: tableData.filter(app => app.status === "Pending").length,
    totalDays: tableData.reduce((sum, app) => sum + parseInt(app.leaveCount || 0), 0),
  };

  return (
    <section className="px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight font-inter">Leave Application</h1>
          <p className="text-gray-600 mt-1">Review and manage employee leave requests</p>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none w-64"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <img 
              src="/icons/search-icon.svg" 
              alt="Search" 
              className="h-5 w-5 text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg shadow p-4 border-l-4 border-blue-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg shadow p-4 border-l-4 border-green-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 rounded-lg shadow p-4 border-l-4 border-yellow-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-red-50 rounded-lg shadow p-4 border-l-4 border-red-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Declined</p>
              <p className="text-2xl font-bold text-gray-900">{stats.declined}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 rounded-lg shadow p-4 border-l-4 border-purple-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Days</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalDays}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Status Filter */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Filter by Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
            >
              <option value="All">All Status</option>
              <option value="Approved">Approved</option>
              <option value="Declined">Declined</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          
          <div className="text-sm text-gray-600">
            Showing {filteredData.length} of {stats.total} applications
          </div>
        </div>
      </div>

      {/* Bulk Actions Panel */}
      {showBulkActions && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-blue-800 font-medium">{select.length} application(s) selected</span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleBulkApprove}
                className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Approve Selected
              </button>
              <button
                onClick={handleBulkDecline}
                className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Decline Selected
              </button>
              <button
                onClick={resetSelection}
                className="px-3 py-2 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <Table
          selectAll={selectAll}
          selectRow={handleSelect}
          selectedData={select}
          dataSet={filteredData.length}
          tableLabels={tableLabels}
          itemsPerPage={10}
          resetSelection={resetSelection}
        >
          {filteredData.map((data) => (
            <AllEmployeeRow
              key={data.id}
              data={data}
              selectedData={select}
              selectRow={handleSelect}
              updateRecord={updateRecord}
            />
          ))}
        </Table>
      </div>
    </section>
  );
}

// Removed duplicate default export