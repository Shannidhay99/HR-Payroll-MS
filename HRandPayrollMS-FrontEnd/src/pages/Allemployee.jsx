import Table from "../components/table/Table";
import { useState } from "react";
import AllEmployeeRow from "../components/table/rows/AllEmployeeRow";
import IconButton from "../components/buttons/IconButton";

const tableLabels = [
  { title: "Name", sort: true },
  { title: "Email", sort: true },
  { title: "Employee ID", sort: true },
  { title: "Mobile", sort: true },
  { title: "Department", sort: true },
  { title: "Designation", sort: true },
  { title: "Status", sort: true },
  { title: "Joining Date", sort: true },
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
    email: "rashed@gmail.com",
    employeeId: "EMP-82382",
    mobile: "01934478672",
    department: "Web Development",
    designation: "Web Developer",
    joiningDate: "22-06-2025",
    status: "Active",
  },
  {
    id: 2,
    name: {
      title: "Rifat Bandhan",
      image: "/images/bandhan-pic.jpg",
      visibleCheckbox: true,
    },
    email: "bandhan@gmail.com",
    employeeId: "EMP-33923",
    mobile: "01798674289",
    department: "Web Development",
    designation: "Web Developer",
    joiningDate: "22-06-2025",
    status: "Active",
  },
  {
    id: 3,
    name: {
      title: "Sadia Afrin",
      image: "/images/sadia-pic.jpg",
      visibleCheckbox: true,
    },
    email: "sadia@gmail.com",
    employeeId: "EMP-13445",
    mobile: "01843272377",
    department: "Human Resource",
    designation: "HR Head",
    joiningDate: "22-06-2025",
    status: "Active",
  },
  {
    id: 4,
    name: {
      title: "Mazaharul Auntu",
      image: "/images/auntu-pic.jpg",
      visibleCheckbox: true,
    },
    email: "auntu@gmail.com",
    employeeId: "EMP-24422",
    mobile: "01307842696",
    department: "Web Development",
    designation: "Web Developer",
    joiningDate: "22-06-2025",
    status: "Inactive",
  },
  {
    id: 5,
    name: {
      title: "Shahariar Islam",
      image: "/images/shahriar-pic.jpg",
      visibleCheckbox: true,
    },
    email: "shahriar@gmail.com",
    employeeId: "EMP-42452",
    mobile: "01432344525",
    department: "Sales",
    designation: "Salesman",
    joiningDate: "20-06-2025",
    status: "Active",
  },
  {
    id: 6,
    name: {
      title: "Lina Rahman",
      image: "/images/lina-pic.jpg",
      visibleCheckbox: true,
    },
    email: "lina@gmail.com",
    employeeId: "EMP-42332",
    mobile: "0134949490",
    department: "Customer Support",
    designation: "Supporter",
    joiningDate: "20-06-2025",
    status: "Active",
  },
];

export default function AllEmployee() {
  const [tableData, setTableData] = useState(initialTableData);
  const [select, setSelect] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    employeeId: '',
    mobile: '',
    department: '',
    designation: '',
    joiningDate: '',
    status: 'Active',
    profilePicture: null
  });

  const resetSelection = () => {
    setSelect([]);
    setShowBulkActions(false);
  };

  // Function to update employee status
  const updateEmployeeStatus = (id, newStatus) => {
    setTableData(prevData => 
      prevData.map(employee => 
        employee.id === id ? { ...employee, status: newStatus } : employee
      )
    );
  };

  // Function to update multiple employee statuses
  const updateMultipleEmployeeStatuses = (ids, newStatus) => {
    setTableData(prevData => 
      prevData.map(employee => 
        ids.includes(employee.id) ? { ...employee, status: newStatus } : employee
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

  // Filter employees based on search, status, and department
  const filteredData = tableData.filter((employee) => {
    const searchLower = searchTerm.toLowerCase();
    
    // Search filter
    const matchesSearch = !searchTerm || (
      employee.name.title.toLowerCase().includes(searchLower) ||
      employee.email.toLowerCase().includes(searchLower) ||
      employee.employeeId.toLowerCase().includes(searchLower) ||
      employee.department.toLowerCase().includes(searchLower) ||
      employee.designation.toLowerCase().includes(searchLower)
    );

    // Status filter
    const matchesStatus = statusFilter === "All" || employee.status === statusFilter;

    // Department filter
    const matchesDepartment = departmentFilter === "All" || employee.department === departmentFilter;

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  // Modal functions
  const handleAddEmployee = () => {
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setNewEmployee({
      name: '',
      email: '',
      employeeId: '',
      mobile: '',
      department: '',
      designation: '',
      joiningDate: '',
      status: 'Active',
      profilePicture: null
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewEmployee(prev => ({
      ...prev,
      profilePicture: file
    }));
  };

  const handleSubmitEmployee = (e) => {
    e.preventDefault();
    
    // Generate new employee ID
    const newId = Math.max(...tableData.map(emp => emp.id)) + 1;
    
    // Create new employee object
    const employeeToAdd = {
      id: newId,
      name: {
        title: newEmployee.name,
        image: newEmployee.profilePicture ? URL.createObjectURL(newEmployee.profilePicture) : "/images/profile-photo.jpg",
        visibleCheckbox: true,
      },
      email: newEmployee.email,
      employeeId: newEmployee.employeeId,
      mobile: newEmployee.mobile,
      department: newEmployee.department,
      designation: newEmployee.designation,
      joiningDate: newEmployee.joiningDate,
      status: newEmployee.status,
    };
    
    // Add to table data
    setTableData(prev => [...prev, employeeToAdd]);
    
    // Close modal and reset form
    handleCloseModal();
  };

  const selectAll = (e) => {
    if (e.target.checked) {
      const newSelection = filteredData.map((data) => data.id);
      setSelect(newSelection);
      setShowBulkActions(newSelection.length > 0);
    } else {
      resetSelection();
    }
  };

  // Bulk action handlers
  const handleBulkActivate = () => {
    updateMultipleEmployeeStatuses(select, "Active");
    alert(`${select.length} employees activated!`);
    resetSelection();
  };

  const handleBulkDeactivate = () => {
    if (window.confirm(`Are you sure you want to deactivate ${select.length} selected employees?`)) {
      updateMultipleEmployeeStatuses(select, "Inactive");
      alert(`${select.length} employees deactivated!`);
      resetSelection();
    }
  };

  // Calculate statistics
  const stats = {
    total: tableData.length,
    active: tableData.filter(emp => emp.status === "Active").length,
    inactive: tableData.filter(emp => emp.status === "Inactive").length,
    departments: [...new Set(tableData.map(emp => emp.department))].length,
  };

  // Get unique departments for filter dropdown
  const uniqueDepartments = [...new Set(tableData.map(emp => emp.department))];

  return (
    <section className="px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight font-inter">All Employees</h1>
          <p className="text-gray-600 mt-1">View and manage employee information and status</p>
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
          <button onClick={handleAddEmployee}>
            <IconButton
              text="Add Employee"
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
        <div className="bg-blue-50 rounded-lg shadow p-4 border-l-4 border-blue-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
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
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg shadow p-4 border-l-4 border-gray-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Inactive</p>
              <p className="text-2xl font-bold text-gray-900">{stats.inactive}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 rounded-lg shadow p-4 border-l-4 border-purple-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Departments</p>
              <p className="text-2xl font-bold text-gray-900">{stats.departments}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
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
            Showing {filteredData.length} of {stats.total} employees
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
              <span className="text-blue-800 font-medium">{select.length} employee(s) selected</span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleBulkActivate}
                className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Activate
              </button>
              <button
                onClick={handleBulkDeactivate}
                className="px-4 py-2 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
                Deactivate
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
              updateEmployeeStatus={updateEmployeeStatus}
            />
          ))}
        </Table>
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full m-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Add New Employee</h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmitEmployee} className="space-y-6">
                {/* Row 1: Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newEmployee.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter full name"
                    />
                  </div>

                  {/* Employee ID */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Employee ID *
                    </label>
                    <input
                      type="text"
                      name="employeeId"
                      value={newEmployee.employeeId}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter employee ID (e.g., EMP-12345)"
                    />
                  </div>
                </div>

                {/* Row 2: Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={newEmployee.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter email address"
                    />
                  </div>

                  {/* Mobile */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={newEmployee.mobile}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter mobile number"
                    />
                  </div>
                </div>

                {/* Row 3: Work Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Department */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Department *
                    </label>
                    <select
                      name="department"
                      value={newEmployee.department}
                      onChange={handleInputChange}
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
                    </select>
                  </div>

                  {/* Designation */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Designation *
                    </label>
                    <input
                      type="text"
                      name="designation"
                      value={newEmployee.designation}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter designation"
                    />
                  </div>
                </div>

                {/* Row 4: Employment Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Joining Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Joining Date *
                    </label>
                    <input
                      type="date"
                      name="joiningDate"
                      value={newEmployee.joiningDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status *
                    </label>
                    <select
                      name="status"
                      value={newEmployee.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                {/* Profile Picture */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    name="profilePicture"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-red-600 file:text-white hover:file:bg-red-700 file:cursor-pointer"
                  />
                  <p className="text-sm text-gray-500 mt-1">Upload a profile picture (optional)</p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-6">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-6 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                  >
                    Add Employee
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
