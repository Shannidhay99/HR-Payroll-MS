import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Table from "../components/table/Table";
import DepartmentRow from "../components/table/rows/DepartmentRow";
import RoleRow from "../components/table/rows/RoleRow";

export default function EmployeeSettings() {
  const [activeTab, setActiveTab] = useState('departments');

  // Departments data using real employee names as managers
  const departments = [
    {
      id: 1,
      name: "Web Development",
      code: "WD",
      manager: "Rashedul Islam",
      employees: 12,
      status: "Active",
    },
    {
      id: 2,
      name: "Human Resource", 
      code: "HR",
      manager: "Sadia Afrin",
      employees: 8,
      status: "Active",
    },
    {
      id: 3,
      name: "Sales",
      code: "SLS",
      manager: "Shahariar Islam",
      employees: 15,
      status: "Active",
    },
    {
      id: 4,
      name: "Customer Support",
      code: "CS",
      manager: "Lina Rahman",
      employees: 10,
      status: "Active",
    },
    {
      id: 5,
      name: "Marketing",
      code: "MKT",
      manager: "Mazaharul Auntu",
      employees: 6,
      status: "Inactive",
    }
  ];

  // Roles data using real employee departments
  const roles = [
    {
      id: 1,
      title: "Web Developer",
      department: "Web Development",
      level: "Senior",
      employees: 8,
      status: "Active",
    },
    {
      id: 2,
      title: "HR Head",
      department: "Human Resource",
      level: "Manager",
      employees: 3,
      status: "Active",
    },
    {
      id: 3,
      title: "Salesman",
      department: "Sales",
      level: "Junior",
      employees: 12,
      status: "Active",
    },
    {
      id: 4,
      title: "Support Specialist",
      department: "Customer Support",
      level: "Mid",
      employees: 7,
      status: "Active",
    },
    {
      id: 5,
      title: "Marketing Executive",
      department: "Marketing",
      level: "Senior",
      employees: 4,
      status: "Active",
    }
  ];

  // Table headers for departments
  const departmentLabels = [
    { title: "Serial", sort: false },
    { title: "Department Name", sort: true },
    { title: "Code", sort: true },
    { title: "Manager", sort: true },
    { title: "Employees", sort: true },
    { title: "Status", sort: true },
    { title: "Action", sort: false },
  ];

  // Table headers for roles
  const roleLabels = [
    { title: "Serial", sort: false },
    { title: "Role Title", sort: true },
    { title: "Department", sort: true },
    { title: "Level", sort: true },
    { title: "Employees", sort: true },
    { title: "Status", sort: true },
    { title: "Action", sort: false },
  ];

  return (
    <section className="px-6 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight font-inter">
              Employee Settings
            </h1>
            <p className="text-gray-600 mt-2">Manage departments, roles, and employee organizational structure</p>
          </div>
          <div className="flex space-x-3">
            <Link to="/settings">
              <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                Back to Settings
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('departments')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              activeTab === 'departments'
                ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Departments
          </button>
          <button
            onClick={() => setActiveTab('roles')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              activeTab === 'roles'
                ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Roles & Positions
          </button>
        </div>
      </div>

      {/* Departments Tab */}
      {activeTab === 'departments' && (
        <div className="space-y-6">
          {/* Department Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg shadow p-4 border-l-4 border-blue-500">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Departments</p>
                  <p className="text-2xl font-bold text-gray-900">{departments.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg shadow p-4 border-l-4 border-green-500">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Employees</p>
                  <p className="text-2xl font-bold text-gray-900">{departments.reduce((sum, dept) => sum + dept.employees, 0)}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 rounded-lg shadow p-4 border-l-4 border-purple-500">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Department Managers</p>
                  <p className="text-2xl font-bold text-gray-900">{departments.filter(dept => dept.manager).length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-orange-50 rounded-lg shadow p-4 border-l-4 border-orange-500">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Employees/Dept</p>
                  <p className="text-2xl font-bold text-gray-900">{Math.round(departments.reduce((sum, dept) => sum + dept.employees, 0) / departments.length)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Departments Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <Table 
              tableLabels={departmentLabels}
              dataSet={departments.length}
              itemsPerPage={10}
            >
              {departments.map((dept, index) => (
                <DepartmentRow
                  key={dept.id}
                  data={dept}
                  index={index}
                />
              ))}
            </Table>
          </div>
        </div>
      )}

      {/* Roles Tab */}
      {activeTab === 'roles' && (
        <div className="space-y-6">
          {/* Role Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg shadow p-4 border-l-4 border-blue-500">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Roles</p>
                  <p className="text-2xl font-bold text-gray-900">{roles.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg shadow p-4 border-l-4 border-green-500">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Senior Level</p>
                  <p className="text-2xl font-bold text-gray-900">{roles.filter(role => role.level === 'Senior').length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 rounded-lg shadow p-4 border-l-4 border-purple-500">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Manager Level</p>
                  <p className="text-2xl font-bold text-gray-900">{roles.filter(role => role.level === 'Manager').length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-orange-50 rounded-lg shadow p-4 border-l-4 border-orange-500">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Assigned</p>
                  <p className="text-2xl font-bold text-gray-900">{roles.reduce((sum, role) => sum + role.employees, 0)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Roles Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <Table 
              tableLabels={roleLabels}
              dataSet={roles.length}
              itemsPerPage={10}
            >
              {roles.map((role, index) => (
                <RoleRow
                  key={role.id}
                  data={role}
                  index={index}
                />
              ))}
            </Table>
          </div>
        </div>
      )}
    </section>
  );
}
