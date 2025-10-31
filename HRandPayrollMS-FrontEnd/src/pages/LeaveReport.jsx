import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "../components/hooks/useDebounce";
import Table from "../components/table/Table";
import LeaveReportRow from "../components/table/rows/LeaveReportRow";
import IconButton from "../components/buttons/IconButton";
import { Calendar, CheckCircle, Clock, XCircle } from "lucide-react";

// Table headers for leave report
const tableLabels = [
  { title: "Serial", sort: true },
  { title: "Employee", sort: true },
  { title: "Employee ID", sort: true },
  { title: "Department", sort: true },
  { title: "Designation", sort: true },
  { title: "Leave Type", sort: true },
  { title: "Start Date", sort: true },
  { title: "End Date", sort: true },
  { title: "Duration", sort: true },
  { title: "Leave Reason", sort: true },
  { title: "Status", sort: true },
  { title: "Applied Date", sort: true },
  { title: "Action", sort: false },
];

// Leave report data based on AllEmployee table with leave-specific information
const initialLeaveData = [
  {
    id: 1,
    serial: 1,
    name: {
      title: "Rashedul Islam",
      image: "/images/profile-photo.jpg",
      visibleCheckbox: true,
      id: 1,
    },
    email: "rashed@gmail.com",
    employeeId: "EMP-82382",
    mobile: "01934478672",
    department: "Web Development",
    designation: "Web Developer",
    leaveType: "Annual Leave",
    startDate: "2025-08-20",
    endDate: "2025-08-22",
    duration: 3,
    leaveReason: "Family vacation and personal time off",
    status: "Approved",
    appliedDate: "2025-08-10",
    approvedBy: "HR Manager",
    totalLeaveCount: 12,
  },
  {
    id: 2,
    serial: 2,
    name: {
      title: "Rifat Bandhan",
      image: "/images/bandhan-pic.jpg",
      visibleCheckbox: true,
      id: 2,
    },
    email: "bandhan@gmail.com",
    employeeId: "EMP-33923",
    mobile: "01798674289",
    department: "Web Development",
    designation: "Web Developer",
    leaveType: "Sick Leave",
    startDate: "2025-08-15",
    endDate: "2025-08-17",
    duration: 3,
    leaveReason: "Medical checkup and recovery",
    status: "Approved",
    appliedDate: "2025-08-14",
    approvedBy: "Team Lead",
    totalLeaveCount: 8,
  },
  {
    id: 3,
    serial: 3,
    name: {
      title: "Sadia Afrin",
      image: "/images/sadia-pic.jpg",
      visibleCheckbox: true,
      id: 3,
    },
    email: "sadia@gmail.com",
    employeeId: "EMP-13445",
    mobile: "01843272377",
    department: "Human Resource",
    designation: "HR Head",
    leaveType: "Emergency Leave",
    startDate: "2025-08-25",
    endDate: "2025-08-25",
    duration: 1,
    leaveReason: "Family emergency",
    status: "Pending",
    appliedDate: "2025-08-24",
    approvedBy: "CEO",
    totalLeaveCount: 5,
  },
  {
    id: 4,
    serial: 4,
    name: {
      title: "Mazaharul Auntu",
      image: "/images/auntu-pic.jpg",
      visibleCheckbox: true,
      id: 4,
    },
    email: "auntu@gmail.com",
    employeeId: "EMP-24422",
    mobile: "01307842696",
    department: "Web Development",
    designation: "Web Developer",
    leaveType: "Casual Leave",
    startDate: "2025-08-12",
    endDate: "2025-08-14",
    duration: 3,
    leaveReason: "Personal work and appointments",
    status: "Rejected",
    appliedDate: "2025-08-08",
    approvedBy: "HR Manager",
    totalLeaveCount: 15,
  },
  {
    id: 5,
    serial: 5,
    name: {
      title: "Shahariar Islam",
      image: "/images/shahriar-pic.jpg",
      visibleCheckbox: true,
      id: 5,
    },
    email: "shahriar@gmail.com",
    employeeId: "EMP-42452",
    mobile: "01432344525",
    department: "Sales",
    designation: "Salesman",
    leaveType: "Maternity Leave",
    startDate: "2025-09-01",
    endDate: "2025-11-30",
    duration: 90,
    leaveReason: "Maternity leave for newborn care",
    status: "Approved",
    appliedDate: "2025-08-01",
    approvedBy: "HR Manager",
    totalLeaveCount: 90,
  },
  {
    id: 6,
    serial: 6,
    name: {
      title: "Lina Rahman",
      image: "/images/lina-pic.jpg",
      visibleCheckbox: true,
      id: 6,
    },
    email: "lina@gmail.com",
    employeeId: "EMP-55234",
    mobile: "01534256724",
    department: "Marketing",
    designation: "Marketing Specialist",
    leaveType: "Annual Leave",
    startDate: "2025-08-28",
    endDate: "2025-08-30",
    duration: 3,
    leaveReason: "Wedding ceremony attendance",
    status: "Pending",
    appliedDate: "2025-08-20",
    approvedBy: "Department Head",
    totalLeaveCount: 18,
  },
];

const LeaveReport = () => {
  const [tableData] = useState(initialLeaveData);
  const [filteredData, setFilteredData] = useState(initialLeaveData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedLeaveType, setSelectedLeaveType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [select, setSelect] = useState([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Filter leaves based on search and filters
  useEffect(() => {
    let filtered = tableData;

    // Search filter
    if (debouncedSearchTerm) {
      filtered = filtered.filter(
        (leave) =>
          leave.name.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          leave.employeeId.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          leave.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          leave.department.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          leave.designation.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          leave.leaveType.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          leave.leaveReason.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }

    // Department filter
    if (selectedDepartment !== "all") {
      filtered = filtered.filter(leave => leave.department === selectedDepartment);
    }

    // Leave type filter
    if (selectedLeaveType !== "all") {
      filtered = filtered.filter(leave => leave.leaveType === selectedLeaveType);
    }

    // Status filter
    if (selectedStatus !== "all") {
      filtered = filtered.filter(leave => leave.status === selectedStatus);
    }

    // Date range filter (placeholder - would integrate with actual date filtering logic)
    if (startDate && endDate) {
      filtered = filtered.filter(leave => {
        const leaveStart = new Date(leave.startDate);
        const filterStart = new Date(startDate);
        const filterEnd = new Date(endDate);
        return leaveStart >= filterStart && leaveStart <= filterEnd;
      });
    }

    setFilteredData(filtered);
  }, [tableData, debouncedSearchTerm, selectedDepartment, selectedLeaveType, selectedStatus, startDate, endDate]);

  // Selection handlers
  const handleSelect = (id, event) => {
    if (event.target.checked) {
      setSelect([...select, id]);
    } else {
      setSelect(select.filter(selectedId => selectedId !== id));
    }
  };

  const selectAll = (checked) => {
    if (checked) {
      setSelect(filteredData.map(leave => leave.id));
    } else {
      setSelect([]);
    }
  };

  const resetSelection = () => {
    setSelect([]);
  };

  // Calculate statistics
  const stats = {
    totalLeaves: tableData.length,
    approvedLeaves: tableData.filter(leave => leave.status === 'Approved').length,
    pendingLeaves: tableData.filter(leave => leave.status === 'Pending').length,
    rejectedLeaves: tableData.filter(leave => leave.status === 'Rejected').length,
  };

  // Get unique values for filter dropdowns
  const uniqueDepartments = [...new Set(tableData.map(leave => leave.department))];
  const uniqueLeaveTypes = [...new Set(tableData.map(leave => leave.leaveType))];

  const showBulkActions = select.length > 0;

  // Date validation helper
  const isDateRangeValid = () => {
    if (!startDate || !endDate) return true;
    return new Date(startDate) <= new Date(endDate);
  };

  // Get current date for max date constraint
  const getCurrentDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  return (
    <section className="px-6 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight font-inter">Leave Report</h1>
          <p className="text-gray-600 mt-1">Comprehensive employee leave tracking and management</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search leaves..."
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
          <IconButton
            text="Export Report"
            color="text-white"
            bg="bg-green-600"
            icon="/icons/export.svg"
            className="hover:bg-green-700"
          />
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Leaves */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600">Total Leaves</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.totalLeaves}</h3>
            </div>
            <div className="text-blue-500 text-sm font-medium bg-blue-50 px-2 py-1 rounded-full">
              +7%
            </div>
          </div>
        </div>

        {/* Approved Leaves */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600">Approved Leaves</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.approvedLeaves}</h3>
            </div>
            <div className="text-green-500 text-sm font-medium bg-green-50 px-2 py-1 rounded-full">
              +12%
            </div>
          </div>
        </div>

        {/* Pending Leaves */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <div className="p-2 bg-yellow-50 rounded-lg group-hover:bg-yellow-100 transition-colors">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600">Pending Leaves</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.pendingLeaves}</h3>
            </div>
            <div className="text-yellow-500 text-sm font-medium bg-yellow-50 px-2 py-1 rounded-full">
              -3%
            </div>
          </div>
        </div>

        {/* Rejected Leaves */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <div className="p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600">Rejected Leaves</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.rejectedLeaves}</h3>
            </div>
            <div className="text-red-500 text-sm font-medium bg-red-50 px-2 py-1 rounded-full">
              -15%
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              max={getCurrentDate()}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              max={getCurrentDate()}
              min={startDate}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                !isDateRangeValid() ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
            {!isDateRangeValid() && (
              <p className="text-red-500 text-xs mt-1">End date must be after start date</p>
            )}
          </div>

          {/* Department Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="all">All Departments</option>
              {uniqueDepartments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          {/* Leave Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Leave Type</label>
            <select
              value={selectedLeaveType}
              onChange={(e) => setSelectedLeaveType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="all">All Leave Types</option>
              {uniqueLeaveTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="all">All Status</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Clear Filters Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedDepartment("all");
              setSelectedLeaveType("all");
              setSelectedStatus("all");
              setStartDate("");
              setEndDate("");
            }}
            className="text-red-600 hover:text-red-800 font-medium text-sm"
          >
            Clear All Filters
          </button>
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
              <span className="text-blue-800 font-medium">{select.length} leave(s) selected</span>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                <img src="/icons/present.svg" alt="Approve" className="w-4 h-4" />
                Approve Selected
              </button>
              <button className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2">
                <img src="/icons/cross.svg" alt="Reject" className="w-4 h-4" />
                Reject Selected
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <img src="/icons/export.svg" alt="Export" className="w-4 h-4" />
                Export Selected
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

      {/* Table */}
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
            <LeaveReportRow
              key={data.id}
              data={data}
              selectedData={select}
              selectRow={handleSelect}
            />
          ))}
        </Table>
      </div>
    </section>
  );
};

export default LeaveReport;
