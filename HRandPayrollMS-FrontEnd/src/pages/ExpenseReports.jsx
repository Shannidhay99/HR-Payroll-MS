import { Link } from "react-router-dom";
import Table from "../components/table/Table";
import { useState } from "react";
import ExpenseReportsRow from "../components/table/rows/ExpenseReportsRow";
import IconButton from "../components/buttons/IconButton";
import { useDebounce } from "../components/hooks/useDebounce";
import { Receipt, DollarSign, CheckCircle, Clock } from "lucide-react";

const tableLabels = [
  { title: "Employee", sort: true },
  { title: "Employee ID", sort: true },
  { title: "Expense Type", sort: true },
  { title: "Amount", sort: true },
  { title: "Department", sort: true },
  { title: "Submitted Date", sort: true },
  { title: "Status", sort: true },
  { title: "Approval Date", sort: true },
  { title: "Description", sort: false },
  { title: "Receipt", sort: false },
  { title: "Action", sort: false },
];

const initialExpenseData = [
  {
    id: 1,
    name: {
      id: 1,
      title: "Rashedul Islam",
      image: "/images/profile-photo.jpg",
      visibleCheckbox: true,
    },
    employeeId: "EMP-82382",
    department: "Web Development",
    expenseType: "Travel",
    amount: 12500.00,
    submittedDate: "2025-08-20",
    approvalDate: "2025-08-22",
    status: "Approved",
    description: "Client meeting transportation costs",
    receiptAttached: true,
    approvedBy: "Manager",
    reimbursementStatus: "Paid",
    currency: "BDT"
  },
  {
    id: 2,
    name: {
      id: 2,
      title: "Rifat Bandhan",
      image: "/images/bandhan-pic.jpg",
      visibleCheckbox: true,
    },
    employeeId: "EMP-33923",
    department: "Marketing",
    expenseType: "Office Supplies",
    amount: 8500.50,
    submittedDate: "2025-08-21",
    approvalDate: null,
    status: "Pending",
    description: "Stationery and printing materials for office use",
    receiptAttached: true,
    approvedBy: null,
    reimbursementStatus: "Pending",
    currency: "BDT"
  },
  {
    id: 3,
    name: {
      id: 3,
      title: "Sadia Afrin",
      image: "/images/sadia-pic.jpg",
      visibleCheckbox: true,
    },
    employeeId: "EMP-13445",
    department: "HR",
    expenseType: "Equipment",
    amount: 21000.00,
    submittedDate: "2025-08-19",
    approvalDate: "2025-08-20",
    status: "Declined",
    description: "New laptop and accessories for workstation",
    receiptAttached: false,
    approvedBy: "Director",
    reimbursementStatus: "N/A",
    currency: "BDT"
  },
  {
    id: 4,
    name: {
      id: 4,
      title: "Shahariar Islam",
      image: "/images/shahriar-pic.jpg",
      visibleCheckbox: true,
    },
    employeeId: "EMP-42452",
    department: "Sales",
    expenseType: "Meals & Entertainment",
    amount: 6750.25,
    submittedDate: "2025-08-22",
    approvalDate: "2025-08-23",
    status: "Approved",
    description: "Client dinner meeting at premium restaurant",
    receiptAttached: true,
    approvedBy: "Manager",
    reimbursementStatus: "Processing",
    currency: "BDT"
  },
  {
    id: 5,
    name: {
      id: 5,
      title: "Mazaharul Auntu",
      image: "/images/auntu-pic.jpg",
      visibleCheckbox: true,
    },
    employeeId: "EMP-24422",
    department: "IT",
    expenseType: "Training",
    amount: 18000.75,
    submittedDate: "2025-08-18",
    approvalDate: null,
    status: "Under Review",
    description: "Advanced software development certification course",
    receiptAttached: true,
    approvedBy: null,
    reimbursementStatus: "Pending",
    currency: "BDT"
  },
  {
    id: 6,
    name: {
      id: 6,
      title: "Lina Rahman",
      image: "/images/lina-pic.jpg",
      visibleCheckbox: true,
    },
    employeeId: "EMP-42332",
    department: "Design",
    expenseType: "Software",
    amount: 9500.00,
    submittedDate: "2025-08-23",
    approvalDate: "2025-08-24",
    status: "Approved",
    description: "Adobe Creative Suite license renewal",
    receiptAttached: true,
    approvedBy: "Manager",
    reimbursementStatus: "Paid",
    currency: "BDT"
  }
];

export default function ExpenseReports() {
  const [expenseData, setExpenseData] = useState(initialExpenseData);
  const [selectedData, setSelectedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [expenseTypeFilter, setExpenseTypeFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);

  // Debounce search term
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Get unique values for filters
  const departments = [...new Set(expenseData.map(item => item.department))];
  const expenseTypes = [...new Set(expenseData.map(item => item.expenseType))];
  const statuses = [...new Set(expenseData.map(item => item.status))];

  // Filter data based on search and filters
  const filteredData = expenseData.filter(expense => {
    const matchesSearch = 
      expense.name.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      expense.employeeId.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      expense.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      expense.expenseType.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || expense.status === statusFilter;
    const matchesDepartment = departmentFilter === "all" || expense.department === departmentFilter;
    const matchesExpenseType = expenseTypeFilter === "all" || expense.expenseType === expenseTypeFilter;

    return matchesSearch && matchesStatus && matchesDepartment && matchesExpenseType;
  });

  // Calculate statistics
  const totalExpenses = filteredData.length;
  const totalAmount = filteredData.reduce((sum, expense) => sum + expense.amount, 0);
  const approvedExpenses = filteredData.filter(expense => expense.status === "Approved").length;
  const pendingExpenses = filteredData.filter(expense => expense.status === "Pending").length;

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0
    }).format(amount).replace('BDT', '৳');
  };

  // Handle row selection
  const selectRow = (id, e) => {
    if (e.target.checked) {
      setSelectedData((prev) => [...prev, id]);
    } else {
      setSelectedData((prev) => prev.filter((item) => item !== id));
    }
  };

  // Handle select all
  const selectAll = (e) => {
    if (e.target.checked) {
      setSelectedData(filteredData.map(expense => expense.id));
    } else {
      setSelectedData([]);
    }
  };

  // Reset selection
  const resetSelection = () => {
    setSelectedData([]);
  };

  // Update expense status
  const updateExpenseStatus = (id, newStatus) => {
    setExpenseData(prev => 
      prev.map(expense => 
        expense.id === id 
          ? { 
              ...expense, 
              status: newStatus, 
              approvalDate: newStatus !== "Pending" ? new Date().toISOString().split('T')[0] : null 
            }
          : expense
      )
    );
  };

  // Handle bulk actions
  const handleBulkApprove = () => {
    setExpenseData(prev => 
      prev.map(expense => 
        selectedData.includes(expense.id) 
          ? { ...expense, status: "Approved", approvalDate: new Date().toISOString().split('T')[0] }
          : expense
      )
    );
    setSelectedData([]);
  };

  const handleBulkReject = () => {
    setExpenseData(prev => 
      prev.map(expense => 
        selectedData.includes(expense.id) 
          ? { ...expense, status: "Declined", approvalDate: new Date().toISOString().split('T')[0] }
          : expense
      )
    );
    setSelectedData([]);
  };

  const handleBulkDelete = () => {
    setExpenseData(prev => prev.filter(expense => !selectedData.includes(expense.id)));
    setSelectedData([]);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setDepartmentFilter("all");
    setExpenseTypeFilter("all");
  };

  // Function to handle adding new expense report
  const handleSubmitExpenseReport = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const status = formData.get('status');
    const providedApprovalDate = formData.get('approvalDate');
    
    // Auto-set approval date if status is approved/declined and no date provided
    let approvalDate = providedApprovalDate || null;
    if ((status === 'Approved' || status === 'Declined') && !approvalDate) {
      approvalDate = new Date().toISOString().split('T')[0];
    }
    
    const newExpense = {
      id: expenseData.length + 1,
      name: {
        id: expenseData.length + 1,
        title: formData.get('employeeName'),
        image: "/images/profile-photo.jpg",
        visibleCheckbox: true,
      },
      employeeId: formData.get('employeeId'),
      department: formData.get('department'),
      expenseType: formData.get('expenseType'),
      amount: parseFloat(formData.get('amount')),
      submittedDate: formData.get('submittedDate'),
      approvalDate: approvalDate,
      status: status,
      description: formData.get('description'),
      receiptAttached: formData.get('receipt') ? true : false,
      approvedBy: status === 'Approved' ? "Manager" : null,
      reimbursementStatus: status === 'Approved' ? "Pending" : "N/A",
      currency: "BDT"
    };

    setExpenseData([...expenseData, newExpense]);
    setShowAddModal(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <Link to="/dashboard" className="hover:text-red-600 transition-colors">
            Dashboard
          </Link>
          <span>/</span>
          <Link to="/reports" className="hover:text-red-600 transition-colors">
            Reports
          </Link>
          <span>/</span>
          <span className="text-red-600 font-medium">Expense Reports</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Expense Reports</h1>
        <p className="text-gray-600 mt-1">
          Comprehensive expense tracking and management system
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Expenses */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <div className="p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors">
                  <Receipt className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600">Total Expenses</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{totalExpenses}</h3>
            </div>
            <div className="text-red-500 text-sm font-medium bg-red-50 px-2 py-1 rounded-full">
              +12%
            </div>
          </div>
        </div>

        {/* Total Amount */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600">Total Amount</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(totalAmount)}</h3>
            </div>
            <div className="text-green-500 text-sm font-medium bg-green-50 px-2 py-1 rounded-full">
              +8%
            </div>
          </div>
        </div>

        {/* Approved */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{approvedExpenses}</h3>
            </div>
            <div className="text-blue-500 text-sm font-medium bg-blue-50 px-2 py-1 rounded-full">
              +15%
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <div className="p-2 bg-orange-50 rounded-lg group-hover:bg-orange-100 transition-colors">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{pendingExpenses}</h3>
            </div>
            <div className="text-orange-500 text-sm font-medium bg-orange-50 px-2 py-1 rounded-full">
              -5%
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Expenses
            </label>
            <div className="relative">
              <img 
                src="/icons/search-icon.svg" 
                alt="Search" 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search by employee, ID, description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          {/* Department Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          {/* Expense Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expense Type
            </label>
            <select
              value={expenseTypeFilter}
              onChange={(e) => setExpenseTypeFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              {expenseTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Clear Filters Button */}
        <div className="mt-4">
          <button
            onClick={clearFilters}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors font-medium"
          >
            Clear All Filters
          </button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedData.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              {selectedData.length} expense(s) selected
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleBulkApprove}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Approve Selected
              </button>
              <button
                onClick={handleBulkReject}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Reject Selected
              </button>
              <button
                onClick={handleBulkDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Delete Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-900">
            All Expenses ({filteredData.length})
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <IconButton 
            bg="bg-green-600 hover:bg-green-700"
            color="text-white"
            icon="/icons/export.svg"
            text="Export Data"
          />
          <button onClick={() => setShowAddModal(true)}>
            <IconButton 
              bg="bg-red-600 hover:bg-red-700"
              color="text-white"
              icon="/icons/plus-Icon.svg"
              text="Add New Expense"
            />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="min-w-[1400px]">
          <Table 
            selectAll={selectAll}
            selectRow={selectRow}
            selectedData={selectedData}
            dataSet={filteredData.length}
            tableLabels={tableLabels}
            itemsPerPage={10}
            resetSelection={resetSelection}
          >
            {filteredData.map((expense) => (
              <ExpenseReportsRow
                key={expense.id}
                data={expense}
                selectRow={selectRow}
                selectedData={selectedData}
                updateExpenseStatus={updateExpenseStatus}
              />
            ))}
          </Table>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <img 
              src="/icons/expense.svg" 
              alt="No expenses" 
              className="w-16 h-16 mx-auto mb-4 opacity-50 filter grayscale"
            />
            <p className="text-gray-500 text-lg font-medium">No expenses found</p>
            <p className="text-gray-400 text-sm mt-1">
              Try adjusting your filters or search criteria
            </p>
          </div>
        )}
      </div>

      {/* Add Expense Report Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Add New Expense Report</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmitExpenseReport} className="space-y-6">
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

              {/* Row 2: Department and Expense Type */}
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
                    Expense Type *
                  </label>
                  <select
                    name="expenseType"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Select Expense Type</option>
                    <option value="Travel">Travel</option>
                    <option value="Meals">Meals</option>
                    <option value="Office Supplies">Office Supplies</option>
                    <option value="Equipment">Equipment</option>
                    <option value="Training">Training</option>
                    <option value="Software">Software</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Amount and Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount (BDT) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    name="amount"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter amount"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Submitted Date *
                  </label>
                  <input
                    type="date"
                    name="submittedDate"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Row 4: Status and Approval Date */}
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
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Declined">Declined</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Approval Date
                  </label>
                  <input
                    type="date"
                    name="approvalDate"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Auto-set if status is approved/declined
                  </p>
                </div>
              </div>

              {/* Row 5: Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter expense description..."
                />
              </div>

              {/* Row 6: Receipt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Receipt Attachment
                </label>
                <input
                  type="file"
                  name="receipt"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-red-600 file:text-white hover:file:bg-red-700 file:cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Supported formats: PDF, DOC, DOCX, JPG, JPEG, PNG
                </p>
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
                  Add Expense Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
