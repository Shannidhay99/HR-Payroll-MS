import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "../components/hooks/useDebounce";
import Table from "../components/table/Table";
import PayrollReportRow from "../components/table/rows/PayrollReportRow";
import IconButton from "../components/buttons/IconButton";
import { Users, DollarSign, CreditCard, Clock } from "lucide-react";

// Table headers for payroll report
const tableLabels = [
  { title: "Serial", sort: true },
  { title: "Employee", sort: true },
  { title: "Employee ID", sort: true },
  { title: "Department", sort: true },
  { title: "Designation", sort: true },
  { title: "Basic Salary", sort: true },
  { title: "Allowances", sort: true },
  { title: "Overtime", sort: true },
  { title: "Deductions", sort: true },
  { title: "Net Salary", sort: true },
  { title: "Pay Period", sort: true },
  { title: "Payment Status", sort: true },
  { title: "Action", sort: false },
];

// Payroll report data based on AllEmployee table with payroll-specific information
const initialPayrollData = [
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
    basicSalary: 45000,
    allowances: 8000,
    overtime: 2500,
    deductions: 3200,
    netSalary: 52300,
    payPeriod: "August 2025",
    paymentStatus: "Paid",
    paymentDate: "2025-08-31",
    bankAccount: "1234567890",
    taxDeduction: 2200,
    providentFund: 1000,
    bonus: 5000,
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
    basicSalary: 42000,
    allowances: 7500,
    overtime: 1800,
    deductions: 2900,
    netSalary: 48400,
    payPeriod: "August 2025",
    paymentStatus: "Paid",
    paymentDate: "2025-08-31",
    bankAccount: "9876543210",
    taxDeduction: 2000,
    providentFund: 900,
    bonus: 3000,
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
    basicSalary: 60000,
    allowances: 12000,
    overtime: 0,
    deductions: 4500,
    netSalary: 67500,
    payPeriod: "August 2025",
    paymentStatus: "Processing",
    paymentDate: "2025-09-05",
    bankAccount: "1122334455",
    taxDeduction: 3500,
    providentFund: 1000,
    bonus: 8000,
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
    basicSalary: 38000,
    allowances: 6000,
    overtime: 1200,
    deductions: 2400,
    netSalary: 42800,
    payPeriod: "August 2025",
    paymentStatus: "Pending",
    paymentDate: "2025-09-10",
    bankAccount: "5566778899",
    taxDeduction: 1800,
    providentFund: 600,
    bonus: 2000,
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
    basicSalary: 35000,
    allowances: 5500,
    overtime: 2200,
    deductions: 2100,
    netSalary: 40600,
    payPeriod: "August 2025",
    paymentStatus: "Paid",
    paymentDate: "2025-08-28",
    bankAccount: "7788990011",
    taxDeduction: 1600,
    providentFund: 500,
    bonus: 2500,
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
    basicSalary: 48000,
    allowances: 9000,
    overtime: 1500,
    deductions: 3300,
    netSalary: 55200,
    payPeriod: "August 2025",
    paymentStatus: "Paid",
    paymentDate: "2025-08-29",
    bankAccount: "3344556677",
    taxDeduction: 2500,
    providentFund: 800,
    bonus: 4000,
  },
];

const PayrollReport = () => {
  const [tableData] = useState(initialPayrollData);
  const [filteredData, setFilteredData] = useState(initialPayrollData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("all");
  const [salaryRange, setSalaryRange] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [select, setSelect] = useState([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Filter payroll data based on search and filters
  useEffect(() => {
    let filtered = tableData;

    // Search filter
    if (debouncedSearchTerm) {
      filtered = filtered.filter(
        (payroll) =>
          payroll.name.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          payroll.employeeId.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          payroll.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          payroll.department.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          payroll.designation.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          payroll.payPeriod.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }

    // Department filter
    if (selectedDepartment !== "all") {
      filtered = filtered.filter(payroll => payroll.department === selectedDepartment);
    }

    // Payment status filter
    if (selectedPaymentStatus !== "all") {
      filtered = filtered.filter(payroll => payroll.paymentStatus === selectedPaymentStatus);
    }

    // Salary range filter
    if (salaryRange !== "all") {
      filtered = filtered.filter(payroll => {
        const salary = payroll.netSalary;
        switch (salaryRange) {
          case "high": return salary >= 60000;
          case "medium": return salary >= 40000 && salary < 60000;
          case "low": return salary < 40000;
          default: return true;
        }
      });
    }

    // Date range filter for payment dates
    if (startDate && endDate) {
      filtered = filtered.filter(payroll => {
        const paymentDate = new Date(payroll.paymentDate);
        const filterStart = new Date(startDate);
        const filterEnd = new Date(endDate);
        return paymentDate >= filterStart && paymentDate <= filterEnd;
      });
    }

    setFilteredData(filtered);
  }, [tableData, debouncedSearchTerm, selectedDepartment, selectedPaymentStatus, salaryRange, startDate, endDate]);

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
      setSelect(filteredData.map(payroll => payroll.id));
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
    totalPayroll: tableData.reduce((sum, p) => sum + p.netSalary, 0),
    paidEmployees: tableData.filter(p => p.paymentStatus === 'Paid').length,
    pendingPayments: tableData.filter(p => p.paymentStatus === 'Pending' || p.paymentStatus === 'Processing').length,
  };

  // Get unique values for filter dropdowns
  const uniqueDepartments = [...new Set(tableData.map(p => p.department))];

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

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0
    }).format(amount).replace('BDT', '৳');
  };

  return (
    <section className="px-6 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight font-inter">Payroll Report</h1>
          <p className="text-gray-600 mt-1">Comprehensive employee payroll tracking and management</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search payroll..."
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
              +3%
            </div>
          </div>
        </div>

        {/* Total Payroll */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600">Total Payroll</p>
              <h3 className="text-xl font-bold text-gray-900 mt-1">{formatCurrency(stats.totalPayroll)}</h3>
            </div>
            <div className="text-green-500 text-sm font-medium bg-green-50 px-2 py-1 rounded-full">
              +15%
            </div>
          </div>
        </div>

        {/* Paid Employees */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                  <CreditCard className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600">Paid Employees</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.paidEmployees}</h3>
            </div>
            <div className="text-purple-500 text-sm font-medium bg-purple-50 px-2 py-1 rounded-full">
              +20%
            </div>
          </div>
        </div>

        {/* Pending Payments */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <div className="p-2 bg-orange-50 rounded-lg group-hover:bg-orange-100 transition-colors">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600">Pending Payments</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.pendingPayments}</h3>
            </div>
            <div className="text-orange-500 text-sm font-medium bg-orange-50 px-2 py-1 rounded-full">
              -10%
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

          {/* Payment Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Status</label>
            <select
              value={selectedPaymentStatus}
              onChange={(e) => setSelectedPaymentStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="all">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Processing">Processing</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          {/* Salary Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
            <select
              value={salaryRange}
              onChange={(e) => setSalaryRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="all">All Ranges</option>
              <option value="high">High (৳60,000+)</option>
              <option value="medium">Medium (৳40,000-৳60,000)</option>
              <option value="low">Low (&lt;৳40,000)</option>
            </select>
          </div>
        </div>

        {/* Clear Filters Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedDepartment("all");
              setSelectedPaymentStatus("all");
              setSalaryRange("all");
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
              <span className="text-blue-800 font-medium">{select.length} payroll(s) selected</span>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                <img src="/icons/money.svg" alt="Process Payment" className="w-4 h-4" />
                Process Payment
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <img src="/icons/export.svg" alt="Export" className="w-4 h-4" />
                Export Selected
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
                <img src="/icons/reports.svg" alt="Generate Payslip" className="w-4 h-4" />
                Generate Payslips
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
            <PayrollReportRow
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

export default PayrollReport;
