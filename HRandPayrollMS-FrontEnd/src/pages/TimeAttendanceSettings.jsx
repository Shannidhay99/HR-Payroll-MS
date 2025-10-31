import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Table from "../components/table/Table";
import ShiftSettingsRow from "../components/table/rows/ShiftSettingsRow";
import AttendanceTypeRow from "../components/table/rows/AttendanceTypeRow";

export default function TimeAttendanceSettings() {
  const [activeTab, setActiveTab] = useState('shifts');

  // Sample shift data
  const shiftData = [
    {
      id: 1,
      shiftName: "Morning Shift",
      shiftType: "Day",
      checkInTime: "09:00 AM",
      checkOutTime: "06:00 PM",
      graceTime: "15 minutes",
      workingDays: "Monday - Friday",
      weekends: "Saturday, Sunday",
      status: "Active"
    },
    {
      id: 2,
      shiftName: "Night Shift",
      shiftType: "Night",
      checkInTime: "10:00 PM",
      checkOutTime: "07:00 AM",
      graceTime: "10 minutes",
      workingDays: "Sunday - Thursday",
      weekends: "Friday, Saturday",
      status: "Active"
    },
    {
      id: 3,
      shiftName: "Afternoon Shift",
      shiftType: "Day",
      checkInTime: "02:00 PM",
      checkOutTime: "11:00 PM",
      graceTime: "20 minutes",
      workingDays: "Monday - Friday",
      weekends: "Saturday, Sunday",
      status: "Inactive"
    }
  ];

  // Sample attendance type data (simplified)
  const attendanceTypeData = [
    {
      id: 1,
      typeName: "Office",
      location: "On-site",
      status: "Active"
    },
    {
      id: 2,
      typeName: "Remote",
      location: "Remote",
      status: "Active"
    },
    {
      id: 3,
      typeName: "Hybrid",
      location: "Mixed",
      status: "Active"
    },
    {
      id: 4,
      typeName: "Field",
      location: "External",
      status: "Inactive"
    }
  ];

  const shiftTableLabels = [
    { title: "Shift Name", sort: true },
    { title: "Type", sort: true },
    { title: "Check In", sort: true },
    { title: "Check Out", sort: true },
    { title: "Grace Time", sort: false },
    { title: "Working Days", sort: false },
    { title: "Weekends", sort: false },
    { title: "Status", sort: true },
    { title: "Action", sort: false }
  ];

  const attendanceTypeLabels = [
    { title: "Type Name", sort: true },
    { title: "Location", sort: true },
    { title: "Status", sort: true },
    { title: "Action", sort: false }
  ];

  return (
    <section className="px-6 py-8">
      {/* Page Header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Time & Attendance Settings</h1>
          <p className="text-gray-600 mt-2">Configure shift schedules and attendance types for your organization</p>
        </div>
        <Link to="/settings">
          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
            Back to Settings
          </button>
        </Link>
      </div>

      {/* Action Buttons */}
      <div className="mb-6 flex justify-end space-x-3">
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Shift
        </button>
        <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Attendance Types
        </button>
      </div>

      {/* Time Zone Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-blue-800 font-medium">Time Zone Information</p>
            <p className="text-blue-700 text-sm">
              All times are displayed in <span className="font-semibold">GMT+6 (Bangladesh Standard Time)</span> using 
              <span className="font-semibold"> 12-hour format</span> (AM/PM)
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <nav className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm border border-gray-200">
          <button
            onClick={() => setActiveTab('shifts')}
            className={`flex-1 py-3 px-6 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === 'shifts'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Shift Management</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('attendance-types')}
            className={`flex-1 py-3 px-6 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === 'attendance-types'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Attendance Types</span>
            </div>
          </button>
        </nav>
      </div>

      {/* Shift Management Tab */}
      {activeTab === 'shifts' && (
        <div className="space-y-6">
          {/* Shift Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg shadow p-4 border-l-4 border-blue-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Shifts</p>
                  <p className="text-2xl font-bold text-gray-900">{shiftData.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg shadow p-4 border-l-4 border-green-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Shifts</p>
                  <p className="text-2xl font-bold text-gray-900">{shiftData.filter(shift => shift.status === 'Active').length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 rounded-lg shadow p-4 border-l-4 border-yellow-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Day Shifts</p>
                  <p className="text-2xl font-bold text-gray-900">{shiftData.filter(shift => shift.shiftType === 'Day').length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 rounded-lg shadow p-4 border-l-4 border-purple-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Night Shifts</p>
                  <p className="text-2xl font-bold text-gray-900">{shiftData.filter(shift => shift.shiftType === 'Night').length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <Table
              dataSet={shiftData.length}
              tableLabels={shiftTableLabels}
              itemsPerPage={10}
            >
              {shiftData.map((shift) => (
                <ShiftSettingsRow
                  key={shift.id}
                  data={shift}
                />
              ))}
            </Table>
          </div>
        </div>
      )}

      {/* Attendance Types Tab */}
      {activeTab === 'attendance-types' && (
        <div className="space-y-6">
          {/* Attendance Type Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg shadow p-4 border-l-4 border-blue-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Types</p>
                  <p className="text-2xl font-bold text-gray-900">{attendanceTypeData.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg shadow p-4 border-l-4 border-green-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Types</p>
                  <p className="text-2xl font-bold text-gray-900">{attendanceTypeData.filter(type => type.status === 'Active').length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <Table
              dataSet={attendanceTypeData.length}
              tableLabels={attendanceTypeLabels}
              itemsPerPage={10}
            >
              {attendanceTypeData.map((type) => (
                <AttendanceTypeRow
                  key={type.id}
                  data={type}
                />
              ))}
            </Table>
          </div>
        </div>
      )}
    </section>
  );
}
