import { Link } from "react-router-dom";
import Table from "../components/table/Table";
import { useState } from "react";
import TimelineRow from "../components/table/rows/TimelineRow";
import IconButton from "../components/buttons/IconButton";

const tableLabels = [
  { title: "#", sort: false },
  { title: "Employee", sort: true },
  { title: "Department", sort: true },
  { title: "Time In", sort: true },
  { title: "Time Out", sort: true },
  { title: "Total Hours", sort: true },
  { title: "Status", sort: true },
  { title: "Location", sort: true },
  { title: "Actions", sort: false },
];

const initialTimelineData = [
  {
    id: 1,
    employee: {
      name: "Rashedul Islam",
      employeeId: "EMP-001",
      designation: "Senior Web Developer",
      image: "/images/profile-photo.jpg"
    },
    department: "Web Development",
    timeIn: "09:00 AM",
    timeOut: "06:00 PM",
    totalHours: "9h 00m",
    status: "Present",
    location: "Office - Floor 3",
    date: "2025-08-26"
  },
  {
    id: 2,
    employee: {
      name: "Abdullah Al Mahmud",
      employeeId: "EMP-002",
      designation: "Frontend Developer",
      image: "/images/bandhan-pic.jpg"
    },
    department: "Web Development",
    timeIn: "09:15 AM",
    timeOut: "06:15 PM",
    totalHours: "9h 00m",
    status: "Late",
    location: "Office - Floor 3",
    date: "2025-08-26"
  },
  {
    id: 3,
    employee: {
      name: "Sadia Afrin",
      employeeId: "EMP-003",
      designation: "HR Manager",
      image: "/images/sadia-pic.jpg"
    },
    department: "Human Resource",
    timeIn: "08:45 AM",
    timeOut: "05:45 PM",
    totalHours: "9h 00m",
    status: "Present",
    location: "Office - Floor 2",
    date: "2025-08-26"
  },
  {
    id: 4,
    employee: {
      name: "Mohammad Karim Uddin",
      employeeId: "EMP-004",
      designation: "Marketing Executive",
      image: "/images/auntu-pic.jpg"
    },
    department: "Marketing",
    timeIn: "--",
    timeOut: "--",
    totalHours: "0h 00m",
    status: "Absent",
    location: "N/A",
    date: "2025-08-26"
  },
  {
    id: 5,
    employee: {
      name: "Shahariar Ahmed",
      employeeId: "EMP-005",
      designation: "Sales Executive",
      image: "/images/shahriar-pic.jpg"
    },
    department: "Sales",
    timeIn: "09:00 AM",
    timeOut: "01:30 PM",
    totalHours: "4h 30m",
    status: "Half Day",
    location: "Office - Floor 1",
    date: "2025-08-26"
  },
  {
    id: 6,
    employee: {
      name: "Lina Rahman",
      employeeId: "EMP-006",
      designation: "Support Specialist",
      image: "/images/lina-pic.jpg"
    },
    department: "Customer Support",
    timeIn: "08:55 AM",
    timeOut: "05:55 PM",
    totalHours: "9h 00m",
    status: "Present",
    location: "Office - Floor 1",
    date: "2025-08-26"
  },
  {
    id: 7,
    employee: {
      name: "Mizanur Rahman",
      employeeId: "EMP-007",
      designation: "Accounts Manager",
      image: "/images/profile-photo.jpg"
    },
    department: "Finance",
    timeIn: "09:30 AM",
    timeOut: "06:30 PM",
    totalHours: "9h 00m",
    status: "Late",
    location: "Office - Floor 2",
    date: "2025-08-26"
  },
  {
    id: 8,
    employee: {
      name: "Fatema Khatun",
      employeeId: "EMP-008",
      designation: "Operations Coordinator",
      image: "/images/sadia-pic.jpg"
    },
    department: "Operations",
    timeIn: "09:00 AM",
    timeOut: "06:00 PM",
    totalHours: "9h 00m",
    status: "Present",
    location: "Office - Floor 1",
    date: "2025-08-26"
  },
  {
    id: 9,
    employee: {
      name: "Habibur Rahman",
      employeeId: "EMP-009",
      designation: "System Administrator",
      image: "/images/bandhan-pic.jpg"
    },
    department: "IT Support",
    timeIn: "--",
    timeOut: "--",
    totalHours: "0h 00m",
    status: "Absent",
    location: "N/A",
    date: "2025-08-26"
  },
  {
    id: 10,
    employee: {
      name: "Ayesha Siddique",
      employeeId: "EMP-010",
      designation: "UI/UX Designer",
      image: "/images/lina-pic.jpg"
    },
    department: "Design",
    timeIn: "09:00 AM",
    timeOut: "01:00 PM",
    totalHours: "4h 00m",
    status: "Half Day",
    location: "Office - Floor 3",
    date: "2025-08-26"
  }
];

export default function Timeline() {
  const [timelineData, setTimelineData] = useState(initialTimelineData);
  const [select, setSelect] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("2025-08-26");
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const resetSelection = () => {
    setSelect([]);
    setShowBulkActions(false);
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

  // Filter timeline data based on search, status, department, and date
  const filteredData = timelineData.filter((record) => {
    const searchLower = searchTerm.toLowerCase();
    
    // Search filter
    const matchesSearch = !searchTerm || (
      record.employee.name.toLowerCase().includes(searchLower) ||
      record.employee.employeeId.toLowerCase().includes(searchLower) ||
      record.employee.designation.toLowerCase().includes(searchLower) ||
      record.department.toLowerCase().includes(searchLower) ||
      record.location.toLowerCase().includes(searchLower)
    );

    // Status filter
    const matchesStatus = statusFilter === "All" || record.status === statusFilter;

    // Department filter
    const matchesDepartment = departmentFilter === "All" || record.department === departmentFilter;

    // Date filter
    const matchesDate = !dateFilter || record.date === dateFilter;

    return matchesSearch && matchesStatus && matchesDepartment && matchesDate;
  });

  const selectAll = (e) => {
    if (e.target.checked) {
      const newSelection = filteredData.map((data) => data.id);
      setSelect(newSelection);
      setShowBulkActions(newSelection.length > 0);
    } else {
      resetSelection();
    }
  };

  // Calculate statistics
  const stats = {
    present: timelineData.filter(record => record.status === "Present").length,
    late: timelineData.filter(record => record.status === "Late").length,
    absent: timelineData.filter(record => record.status === "Absent").length,
    halfDay: timelineData.filter(record => record.status === "Half Day").length,
  };

  // Get unique departments for filter dropdown
  const uniqueDepartments = [...new Set(timelineData.map(record => record.department))];

  // Bulk action handlers
  const handleBulkExport = () => {
    alert(`Exporting ${select.length} selected records!`);
    resetSelection();
  };

  // Function to handle adding new timeline entry
  const handleSubmitTimelineEntry = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Calculate total hours
    const timeIn = formData.get('timeIn');
    const timeOut = formData.get('timeOut');
    let totalHours = "0h 00m";
    
    if (timeIn && timeOut) {
      const inTime = new Date(`2000-01-01 ${timeIn}`);
      const outTime = new Date(`2000-01-01 ${timeOut}`);
      const diffMs = outTime - inTime;
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      totalHours = `${hours}h ${minutes.toString().padStart(2, '0')}m`;
    }

    const newEntry = {
      id: timelineData.length + 1,
      employee: {
        name: formData.get('employeeName'),
        employeeId: formData.get('employeeId'),
        designation: formData.get('designation'),
        image: "/images/profile-photo.jpg"
      },
      department: formData.get('department'),
      timeIn: formData.get('timeIn'),
      timeOut: formData.get('timeOut') || "--",
      totalHours: totalHours,
      status: formData.get('status'),
      location: formData.get('location'),
      date: formData.get('date'),
    };

    setTimelineData([...timelineData, newEntry]);
    setShowAddModal(false);
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${select.length} selected records?`)) {
      setTimelineData(prevData => prevData.filter(record => !select.includes(record.id)));
      alert(`${select.length} records deleted!`);
      resetSelection();
    }
  };

  return (
    <section className="px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight font-inter">Employee Timeline</h1>
          <p className="text-gray-600 mt-1">Track daily attendance, working hours, and employee activity</p>
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
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <img src="/icons/export.svg" alt="Export" className="h-4 w-4" />
            <span>Export Data</span>
          </button>
          <button onClick={() => setShowAddModal(true)}>
            <IconButton
              text="Add Entry"
              color="text-white"
              bg="bg-red-600"
              icon="/icons/plus-Icon.svg"
              className="hover:bg-red-700"
            />
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
              <p className="text-sm font-medium text-gray-600">Present</p>
              <p className="text-2xl font-bold text-gray-900">{stats.present}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 rounded-lg shadow p-4 border-l-4 border-yellow-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Late</p>
              <p className="text-2xl font-bold text-gray-900">{stats.late}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-red-50 rounded-lg shadow p-4 border-l-4 border-red-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Absent</p>
              <p className="text-2xl font-bold text-gray-900">{stats.absent}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg shadow p-4 border-l-4 border-blue-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Half Day</p>
              <p className="text-2xl font-bold text-gray-900">{stats.halfDay}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Date:</label>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
            >
              <option value="All">All Status</option>
              <option value="Present">Present</option>
              <option value="Late">Late</option>
              <option value="Absent">Absent</option>
              <option value="Half Day">Half Day</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Department:</label>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
            >
              <option value="All">All Departments</option>
              {uniqueDepartments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          
          <div className="text-sm text-gray-600">
            Showing {filteredData.length} of {timelineData.length} records
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
              <span className="text-blue-800 font-medium">{select.length} record(s) selected</span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleBulkExport}
                className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export
              </button>
              <button
                onClick={handleBulkDelete}
                className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
              <button
                onClick={resetSelection}
                className="px-4 py-2 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Timeline Records Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <Table
            selectAll={selectAll}
            selectRow={handleSelect}
            selectedData={select}
            dataSet={filteredData.length}
            tableLabels={tableLabels}
            itemsPerPage={10}
            resetSelection={resetSelection}
          >
            {filteredData.map((data, index) => (
              <TimelineRow
                key={data.id}
                data={data}
                index={index}
                selectedData={select}
                selectRow={handleSelect}
              />
            ))}
          </Table>
        </div>
      </div>

      {/* Add Timeline Entry Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Add New Timeline Entry</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmitTimelineEntry} className="space-y-6">
              {/* Row 1: Employee Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee Name *
                  </label>
                  <input
                    type="text"
                    name="employeeName"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter employee name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee ID *
                  </label>
                  <input
                    type="text"
                    name="employeeId"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter employee ID"
                  />
                </div>
              </div>

              {/* Row 2: Department and Designation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department *
                  </label>
                  <select
                    name="department"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Select Department</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Human Resource">Human Resource</option>
                    <option value="Sales">Sales</option>
                    <option value="Customer Support">Customer Support</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Designation *
                  </label>
                  <input
                    type="text"
                    name="designation"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter designation"
                  />
                </div>
              </div>

              {/* Row 3: Time Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time In *
                  </label>
                  <input
                    type="time"
                    name="timeIn"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time Out
                  </label>
                  <input
                    type="time"
                    name="timeOut"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Row 4: Status and Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status *
                  </label>
                  <select
                    name="status"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Select Status</option>
                    <option value="Present">Present</option>
                    <option value="Late">Late</option>
                    <option value="Absent">Absent</option>
                    <option value="Half Day">Half Day</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter location (e.g., Office - Floor 3)"
                  />
                </div>
              </div>

              {/* Row 5: Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  defaultValue="2025-08-26"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Add Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
