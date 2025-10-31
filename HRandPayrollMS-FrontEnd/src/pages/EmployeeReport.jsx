import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "../components/hooks/useDebounce";
import Table from "../components/table/Table";
import EmployeeReportRow from "../components/table/rows/EmployeeReportRow";
import IconButton from "../components/buttons/IconButton";
import { Users, UserCheck, UserX, TrendingUp } from "lucide-react";

// Table headers for employee report
const tableLabels = [
  { title: "Employee", sort: true },
  { title: "Employee ID", sort: true },
  { title: "Department", sort: true },
  { title: "Designation", sort: true },
  { title: "Status", sort: true },
  { title: "Joining Date", sort: true },
  { title: "Salary", sort: true },
  { title: "Performance", sort: true },
  { title: "Action", sort: false },
];

// Employee data from AllEmployee table with additional report-specific information
const initialReportData = [
  {
    id: 1,
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
    joiningDate: "22-06-2025",
    status: "Active",
    salary: "৳85,000",
    performance: "Excellent",
    attendanceRate: 95,
    projectsCompleted: 12,
    lastReview: "2024-07-15",
  },
  {
    id: 2,
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
    joiningDate: "22-06-2025",
    status: "Active",
    salary: "৳70,000",
    performance: "Good",
    attendanceRate: 88,
    projectsCompleted: 8,
    lastReview: "2024-07-10",
  },
  {
    id: 3,
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
    joiningDate: "22-06-2025",
    status: "Active",
    salary: "৳75,000",
    performance: "Excellent",
    attendanceRate: 98,
    projectsCompleted: 15,
    lastReview: "2024-08-01",
  },
  {
    id: 4,
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
    joiningDate: "22-06-2025",
    status: "Inactive",
    salary: "৳65,000",
    performance: "Average",
    attendanceRate: 75,
    projectsCompleted: 5,
    lastReview: "2024-06-20",
  },
  {
    id: 5,
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
    joiningDate: "20-06-2025",
    status: "Active",
    salary: "৳60,000",
    performance: "Good",
    attendanceRate: 92,
    projectsCompleted: 10,
    lastReview: "2024-07-25",
  },
  {
    id: 6,
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
    joiningDate: "18-06-2025",
    status: "Active",
    salary: "৳55,000",
    performance: "Good",
    attendanceRate: 90,
    projectsCompleted: 7,
    lastReview: "2024-07-05",
  },
];

const EmployeeReport = () => {
  const [tableData] = useState(initialReportData);
  const [filteredData, setFilteredData] = useState(initialReportData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPerformance, setSelectedPerformance] = useState("all");
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

    // Performance filter
    if (selectedPerformance !== "all") {
      filtered = filtered.filter(employee => employee.performance === selectedPerformance);
    }

    // Date range filter
    if (startDate && endDate) {
      filtered = filtered.filter(employee => {
        const joiningDate = new Date(employee.joiningDate.split('-').reverse().join('-'));
        return joiningDate >= new Date(startDate) && joiningDate <= new Date(endDate);
      });
    }

    setFilteredData(filtered);
  }, [tableData, debouncedSearchTerm, selectedDepartment, selectedStatus, selectedPerformance, startDate, endDate]);

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
    total: tableData.length,
    active: tableData.filter(emp => emp.status === "Active").length,
    inactive: tableData.filter(emp => emp.status === "Inactive").length,
    averagePerformance: Math.round(
      tableData.reduce((sum, emp) => {
        const performanceScore = emp.performance === "Excellent" ? 5 : 
                                emp.performance === "Good" ? 4 : 
                                emp.performance === "Average" ? 3 : 2;
        return sum + performanceScore;
      }, 0) / tableData.length * 20
    ),
  };

  // Get unique values for filter dropdowns
  const uniqueDepartments = [...new Set(tableData.map(emp => emp.department))];
  const uniquePerformances = [...new Set(tableData.map(emp => emp.performance))];

  const showBulkActions = select.length > 0;

  return (
    <section className="px-6 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight font-inter">Employee Report</h1>
          <p className="text-gray-600 mt-1">Comprehensive employee performance and analytics report</p>
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
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</h3>
            </div>
            <div className="text-blue-500 text-sm font-medium bg-blue-50 px-2 py-1 rounded-full">
              +5%
            </div>
          </div>
        </div>

        {/* Active Employees */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                  <UserCheck className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600">Active Employees</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.active}</h3>
            </div>
            <div className="text-green-500 text-sm font-medium bg-green-50 px-2 py-1 rounded-full">
              +8%
            </div>
          </div>
        </div>

        {/* Inactive Employees */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <div className="p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors">
                  <UserX className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600">Inactive Employees</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.inactive}</h3>
            </div>
            <div className="text-red-500 text-sm font-medium bg-red-50 px-2 py-1 rounded-full">
              -2%
            </div>
          </div>
        </div>

        {/* Average Performance */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600">Avg Performance</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.averagePerformance}%</h3>
            </div>
            <div className="text-purple-500 text-sm font-medium bg-purple-50 px-2 py-1 rounded-full">
              +3%
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
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

          {/* Performance Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Performance</label>
            <select
              value={selectedPerformance}
              onChange={(e) => setSelectedPerformance(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="all">All Performance</option>
              {uniquePerformances.map((performance) => (
                <option key={performance} value={performance}>{performance}</option>
              ))}
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
              setSelectedPerformance("all");
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
            <EmployeeReportRow
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

export default EmployeeReport;
