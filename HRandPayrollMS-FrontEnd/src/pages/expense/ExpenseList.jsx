import { useState, useEffect } from "react";
import Table from "../../components/table/Table";
import ExpenseListRow from "../../components/table/rows/ExpenseListRow";
import IconButton from "../../components/buttons/IconButton";

const tableLabels = [
  { title: "Serial", sort: false },
  { title: "Name", sort: true },
  { title: "Employee ID", sort: true },
  { title: "Expense Amount", sort: true },
  { title: "Expense Category", sort: true },
  { title: "Attachment", sort: false },
  { title: "Status", sort: true },
  { title: "Action", sort: false },
];

const initialExpenseData = [
  {
    id: 1,
    name: "Rashedul Islam",
    employeeId: "EMP-82382",
    expenseAmount: 1250.00,
    expenseCategory: "Travel",
    attachment: "/documents/expense1.pdf",
    status: "Approved",
    image: "/images/profile-photo.jpg",
    visibleCheckbox: true,
    submittedDate: "2025-08-20",
  },
  {
    id: 2,
    name: "Rifat Bandhan",
    employeeId: "EMP-33923",
    expenseAmount: 850.50,
    expenseCategory: "Office Supplies",
    attachment: "/documents/expense2.pdf",
    status: "Pending",
    image: "/images/bandhan-pic.jpg",
    visibleCheckbox: true,
    submittedDate: "2025-08-21",
  },
  {
    id: 3,
    name: "Sadia Afrin",
    employeeId: "EMP-13445",
    expenseAmount: 2100.00,
    expenseCategory: "Equipment",
    attachment: null,
    status: "Declined",
    image: "/images/sadia-pic.jpg",
    visibleCheckbox: true,
    submittedDate: "2025-08-19",
  },
  {
    id: 4,
    name: "Shahariar Islam",
    employeeId: "EMP-42452",
    expenseAmount: 675.25,
    expenseCategory: "Meals",
    attachment: "/documents/expense4.pdf",
    status: "Approved",
    image: "/images/shahriar-pic.jpg",
    visibleCheckbox: true,
    submittedDate: "2025-08-22",
  },
  {
    id: 5,
    name: "Mazaharul Auntu",
    employeeId: "EMP-24422",
    expenseAmount: 1800.75,
    expenseCategory: "Training",
    attachment: "/documents/expense5.pdf",
    status: "Pending",
    image: "/images/auntu-pic.jpg",
    visibleCheckbox: true,
    submittedDate: "2025-08-18",
  },
  {
    id: 6,
    name: "Lina Rahman",
    employeeId: "EMP-42332",
    expenseAmount: 950.00,
    expenseCategory: "Software",
    attachment: null,
    status: "Approved",
    image: "/images/lina-pic.jpg",
    visibleCheckbox: true,
    submittedDate: "2025-08-23",
  },
  {
    id: 7,
    name: "Ahmed Hassan",
    employeeId: "EMP-55521",
    expenseAmount: 1350.00,
    expenseCategory: "Travel",
    attachment: "/documents/expense7.pdf",
    status: "Declined",
    image: "/images/profile-photo.jpg",
    visibleCheckbox: true,
    submittedDate: "2025-08-17",
  },
  {
    id: 8,
    name: "Fatima Khan",
    employeeId: "EMP-66632",
    expenseAmount: 725.50,
    expenseCategory: "Office Supplies",
    attachment: "/documents/expense8.pdf",
    status: "Pending",
    image: "/images/profile-photo.jpg",
    visibleCheckbox: true,
    submittedDate: "2025-08-21",
  },
];

export default function ExpenseList() {
  const [expenseData, setExpenseData] = useState(initialExpenseData);
  const [filteredData, setFilteredData] = useState(initialExpenseData);
  const [selectedData, setSelectedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);

  // Filter data based on search term
  useEffect(() => {
    const filtered = expenseData.filter(
      (expense) =>
        expense.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.expenseCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, expenseData]);

  // Handle row selection
  const selectRow = (id, e) => {
    if (e.target.checked) {
      setSelectedData([...selectedData, id]);
    } else {
      setSelectedData(selectedData.filter((selectedId) => selectedId !== id));
    }
  };

  // Reset selection
  const resetSelection = () => {
    setSelectedData([]);
  };

  // Function to handle adding new expense
  const handleSubmitExpense = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const newExpense = {
      id: expenseData.length + 1,
      name: formData.get('employeeName'),
      employeeId: formData.get('employeeId'),
      expenseAmount: parseFloat(formData.get('expenseAmount')),
      expenseCategory: formData.get('expenseCategory'),
      attachment: formData.get('attachment')?.name || null,
      status: formData.get('status'),
      image: "/images/profile-photo.jpg",
      visibleCheckbox: true,
      submittedDate: formData.get('submittedDate'),
      approvalDate: formData.get('approvalDate') || null,
    };

    setExpenseData([...expenseData, newExpense]);
    setShowAddModal(false);
  };

  return (
    <section className="px-6 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Expense List
            </h1>
            <p className="text-gray-600 mt-2">
              Manage and track employee expense submissions
            </p>
          </div>
          <div className="flex space-x-3">
            <button onClick={() => setShowAddModal(true)}>
              <IconButton
                text="Add Expense"
                icon="/icons/plus-Icon.svg"
                bg="bg-red-600 hover:bg-red-700"
                color="text-white"
              />
            </button>
            <IconButton
              text="Export"
              icon="/icons/export.svg"
              bg="bg-green-600 hover:bg-green-700"
              color="text-white"
            />
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Entries per page */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Show</label>
              <select
                value={entriesPerPage}
                onChange={(e) => {
                  setEntriesPerPage(Number(e.target.value));
                }}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <label className="text-sm text-gray-600">entries</label>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Search:</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, ID, category..."
                  className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent w-64"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <Table 
          tableLabels={tableLabels}
          dataSet={filteredData.length}
          selectedData={selectedData}
          resetSelection={resetSelection}
          itemsPerPage={entriesPerPage}
        >
          {filteredData.map((expense, index) => (
            <ExpenseListRow
              key={expense.id}
              data={expense}
              index={index}
              selectRow={selectRow}
              selectedData={selectedData}
            />
          ))}
        </Table>
      </div>

      {/* Add Expense Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Add New Expense</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmitExpense} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="employeeName" className="block text-sm font-medium text-gray-700 mb-1">
                    Employee Name *
                  </label>
                  <input
                    type="text"
                    id="employeeName"
                    name="employeeName"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter employee name"
                  />
                </div>
                
                <div>
                  <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-1">
                    Employee ID *
                  </label>
                  <input
                    type="text"
                    id="employeeId"
                    name="employeeId"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter employee ID"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expenseAmount" className="block text-sm font-medium text-gray-700 mb-1">
                    Expense Amount *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    id="expenseAmount"
                    name="expenseAmount"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter expense amount"
                  />
                </div>
                
                <div>
                  <label htmlFor="expenseCategory" className="block text-sm font-medium text-gray-700 mb-1">
                    Expense Category *
                  </label>
                  <select
                    id="expenseCategory"
                    name="expenseCategory"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Select Category</option>
                    <option value="Travel">Travel</option>
                    <option value="Office Supplies">Office Supplies</option>
                    <option value="Equipment">Equipment</option>
                    <option value="Meals">Meals</option>
                    <option value="Training">Training</option>
                    <option value="Software">Software</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="submittedDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Submitted Date *
                  </label>
                  <input
                    type="date"
                    id="submittedDate"
                    name="submittedDate"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                    Status *
                  </label>
                  <select
                    id="status"
                    name="status"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Declined">Declined</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="approvalDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Approval Date
                  </label>
                  <input
                    type="date"
                    id="approvalDate"
                    name="approvalDate"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leave empty for pending expenses
                  </p>
                </div>

                <div>
                  <label htmlFor="attachment" className="block text-sm font-medium text-gray-700 mb-1">
                    Attachment
                  </label>
                  <input
                    type="file"
                    id="attachment"
                    name="attachment"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-red-600 file:text-white hover:file:bg-red-700 file:cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Supported formats: PDF, DOC, DOCX, JPG, JPEG, PNG
                  </p>
                </div>
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
                  Add Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
