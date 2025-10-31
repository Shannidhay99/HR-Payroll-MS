import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "../components/hooks/useDebounce";
import Table from "../components/table/Table";
import AttendanceReportRow from "../components/table/rows/AttendanceReportRow";
import IconButton from "../components/buttons/IconButton";
import { Users, BarChart3, CheckCircle, Clock } from "lucide-react";

// Table headers for attendance report
const tableLabels = [
  { title: "Serial", sort: true },
  { title: "Employee", sort: true },
  { title: "Employee ID", sort: true },
  { title: "Department", sort: true },
  { title: "Designation", sort: true },
  { title: "Total Working Days", sort: true },
  { title: "Present Days", sort: true },
  { title: "Absent Days", sort: true },
  { title: "On-Time Check In", sort: true },
  { title: "Late Check In", sort: true },
  { title: "On-Time Leave", sort: true },
  { title: "Early Leave", sort: true },
  { title: "Attendance Rate", sort: true },
  { title: "Action", sort: false },
];

// Attendance data based on AllEmployee table with attendance-specific information
const initialAttendanceData = [
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
    totalWorkingDays: 30,
    presentDays: 28,
    absentDays: 2,
    onTimeCheckIn: 25,
    lateCheckIn: 3,
    onTimeLeave: 26,
    earlyLeave: 2,
    attendanceRate: 93.3,
    overtimeHours: 12,
    status: "Active",
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
    totalWorkingDays: 30,
    presentDays: 26,
    absentDays: 4,
    onTimeCheckIn: 22,
    lateCheckIn: 4,
    onTimeLeave: 24,
    earlyLeave: 2,
    attendanceRate: 86.7,
    overtimeHours: 8,
    status: "Active",
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
    totalWorkingDays: 30,
    presentDays: 29,
    absentDays: 1,
    onTimeCheckIn: 28,
    lateCheckIn: 1,
    onTimeLeave: 29,
    earlyLeave: 0,
    attendanceRate: 96.7,
    overtimeHours: 15,
    status: "Active",
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
    totalWorkingDays: 30,
    presentDays: 22,
    absentDays: 8,
    onTimeCheckIn: 18,
    lateCheckIn: 4,
    onTimeLeave: 20,
    earlyLeave: 2,
    attendanceRate: 73.3,
    overtimeHours: 3,
    status: "Inactive",
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
    totalWorkingDays: 30,
    presentDays: 27,
    absentDays: 3,
    onTimeCheckIn: 24,
    lateCheckIn: 3,
    onTimeLeave: 25,
    earlyLeave: 2,
    attendanceRate: 90.0,
    overtimeHours: 10,
    status: "Active",
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
    totalWorkingDays: 30,
    presentDays: 25,
    absentDays: 5,
    onTimeCheckIn: 21,
    lateCheckIn: 4,
    onTimeLeave: 23,
    earlyLeave: 2,
    attendanceRate: 83.3,
    overtimeHours: 6,
    status: "Active",
  },
];

const AttendanceReport = () => {
  const [tableData] = useState(initialAttendanceData);
  const [filteredData, setFilteredData] = useState(initialAttendanceData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [attendanceRange, setAttendanceRange] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [select, setSelect] = useState([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Filter employees based on search and filters
  useEffect(() => {
    let filtered = tableData;

    // Search filter
    if (debouncedSearchTerm) {
      filtered = filtered.filter(
        (employee) =>
          employee.name.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          employee.employeeId.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          employee.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          employee.department.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          employee.designation.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }

    // Department filter
    if (selectedDepartment !== "all") {
      filtered = filtered.filter(employee => employee.department === selectedDepartment);
    }

    // Status filter
    if (selectedStatus !== "all") {
      filtered = filtered.filter(employee => employee.status === selectedStatus);
    }

    // Attendance range filter
    if (attendanceRange !== "all") {
      filtered = filtered.filter(employee => {
        const rate = employee.attendanceRate;
        switch (attendanceRange) {
          case "excellent": return rate >= 95;
          case "good": return rate >= 85 && rate < 95;
          case "average": return rate >= 75 && rate < 85;
          case "poor": return rate < 75;
          default: return true;
        }
      });
    }

    // Date range filter (placeholder - would integrate with actual date filtering logic)
    if (startDate && endDate) {
      // In a real application, this would filter based on actual attendance records
      // For now, it's just a placeholder to show the UI concept
      console.log(`Filtering from ${startDate} to ${endDate}`);
    }

    setFilteredData(filtered);
  }, [tableData, debouncedSearchTerm, selectedDepartment, selectedStatus, attendanceRange, startDate, endDate]);

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
      setSelect(filteredData.map(employee => employee.id));
    } else {
      setSelect([]);
    }
  };

  const resetSelection = () => {
    setSelect([]);
  };

  // Calculate statistics
  const stats = {
    totalEmployees: tableData.length,
    averageAttendance: Math.round(
      tableData.reduce((sum, emp) => sum + emp.attendanceRate, 0) / tableData.length
    ),
    onTimeEmployees: tableData.filter(emp => emp.attendanceRate >= 95).length,
    lateComers: tableData.reduce((sum, emp) => sum + emp.lateCheckIn, 0),
  };

  // Get unique values for filter dropdowns
  const uniqueDepartments = [...new Set(tableData.map(emp => emp.department))];

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
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight font-inter">Attendance Report</h1>
          <p className="text-gray-600 mt-1">Comprehensive employee attendance tracking and analytics</p>
        </div>
        <div className="flex items-center gap-4">
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
        {/* Total Employees */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.totalEmployees}</h3>
            </div>
            <div className="text-blue-500 text-sm font-medium bg-blue-50 px-2 py-1 rounded-full">
              +2%
            </div>
          </div>
        </div>

        {/* Average Attendance */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600">Average Attendance</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.averageAttendance}%</h3>
            </div>
            <div className="text-green-500 text-sm font-medium bg-green-50 px-2 py-1 rounded-full">
              +5%
            </div>
          </div>
        </div>

        {/* Perfect Attendance */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <div className="p-2 bg-orange-50 rounded-lg group-hover:bg-orange-100 transition-colors">
                  <CheckCircle className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600">Perfect Attendance</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.onTimeEmployees}</h3>
            </div>
            <div className="text-orange-500 text-sm font-medium bg-orange-50 px-2 py-1 rounded-full">
              +10%
            </div>
          </div>
        </div>

        {/* Total Late Entries */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <div className="p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors">
                  <Clock className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600">Total Late Entries</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.lateComers}</h3>
            </div>
            <div className="text-red-500 text-sm font-medium bg-red-50 px-2 py-1 rounded-full">
              -8%
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

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Attendance Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Attendance Range</label>
            <select
              value={attendanceRange}
              onChange={(e) => setAttendanceRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="all">All Ranges</option>
              <option value="excellent">Excellent (95%+)</option>
              <option value="good">Good (85-94%)</option>
              <option value="average">Average (75-84%)</option>
              <option value="poor">Poor (&lt;75%)</option>
            </select>
          </div>
        </div>

        {/* Clear Filters Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedDepartment("all");
              setSelectedStatus("all");
              setAttendanceRange("all");
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
              <span className="text-blue-800 font-medium">{select.length} employee(s) selected</span>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                <img src="/icons/export.svg" alt="Export" className="w-4 h-4" />
                Export Selected
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <img src="/icons/reports.svg" alt="Generate Report" className="w-4 h-4" />
                Generate Report
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
            <AttendanceReportRow
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

export default AttendanceReport;
