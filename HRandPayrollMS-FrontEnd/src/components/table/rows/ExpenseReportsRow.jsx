import PropTypes from "prop-types";
import TableData from "../td/TableData";
import ExpenseReportsTd from "../td/ExpenseReportsTd";
import { useState } from "react";

export default function ExpenseReportsRow({ selectRow, selectedData, data, updateExpenseStatus }) {
  const [isEditingStatus, setIsEditingStatus] = useState(false);

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'declined':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'under review':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  // Get expense type color
  const getExpenseTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'travel':
        return "text-blue-700 bg-blue-100";
      case 'office supplies':
        return "text-purple-700 bg-purple-100";
      case 'equipment':
        return "text-indigo-700 bg-indigo-100";
      case 'meals & entertainment':
        return "text-orange-700 bg-orange-100";
      case 'training':
        return "text-green-700 bg-green-100";
      case 'software':
        return "text-cyan-700 bg-cyan-100";
      case 'office rent':
        return "text-red-700 bg-red-100";
      case 'advertising':
        return "text-pink-700 bg-pink-100";
      case 'utilities':
        return "text-yellow-700 bg-yellow-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  // Format currency
  const formatCurrency = (amount, currency = 'BDT') => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(amount).replace('BDT', '৳');
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleStatusChange = (newStatus) => {
    updateExpenseStatus(data.id, newStatus);
    setIsEditingStatus(false);
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {/* Employee Name with Image and Checkbox */}
      <TableData className="text-left min-w-[200px]">
        <ExpenseReportsTd
          data={data.name}
          selectRow={selectRow}
          selectedData={selectedData}
        />
      </TableData>

      {/* Employee ID */}
      <TableData className="text-sm font-mono text-gray-700 min-w-[120px]">
        <span className="px-2 py-1 bg-gray-50 rounded text-gray-600">
          {data.employeeId}
        </span>
      </TableData>

      {/* Expense Type */}
      <TableData className="text-sm text-gray-700 min-w-[140px]">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getExpenseTypeColor(data.expenseType)}`}>
          {data.expenseType}
        </span>
      </TableData>

      {/* Amount */}
      <TableData className="text-sm font-bold text-right text-gray-900 min-w-[120px]">
        <span className="px-3 py-1 bg-green-50 border border-green-200 rounded font-mono text-green-700">
          {formatCurrency(data.amount, data.currency)}
        </span>
      </TableData>

      {/* Department */}
      <TableData className="text-sm text-gray-700 min-w-[130px]">
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
          {data.department}
        </span>
      </TableData>

      {/* Submitted Date */}
      <TableData className="text-sm text-gray-700 min-w-[120px]">
        <span className="text-gray-600">
          {formatDate(data.submittedDate)}
        </span>
      </TableData>

      {/* Status */}
      <TableData className="text-sm font-medium min-w-[130px]">
        {isEditingStatus ? (
          <select
            value={data.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            onBlur={() => setIsEditingStatus(false)}
            className="px-2 py-1 rounded-full text-xs font-semibold border focus:outline-none focus:ring-2 focus:ring-red-500"
            autoFocus
          >
            <option value="Pending">Pending</option>
            <option value="Under Review">Under Review</option>
            <option value="Approved">Approved</option>
            <option value="Declined">Declined</option>
          </select>
        ) : (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold border cursor-pointer ${getStatusColor(data.status)}`}
            onClick={() => setIsEditingStatus(true)}
          >
            {data.status}
          </span>
        )}
      </TableData>

      {/* Approval Date */}
      <TableData className="text-sm text-gray-700 min-w-[120px]">
        <span className="text-gray-600">
          {formatDate(data.approvalDate)}
        </span>
      </TableData>

      {/* Description */}
      <TableData className="text-sm text-gray-700 min-w-[200px] max-w-[200px]">
        <div className="truncate" title={data.description}>
          {data.description}
        </div>
      </TableData>

      {/* Receipt */}
      <TableData className="text-sm text-center min-w-[80px]">
        {data.receiptAttached ? (
          <div className="flex items-center justify-center">
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
              ✓ Yes
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium">
              ✗ No
            </span>
          </div>
        )}
      </TableData>

      {/* Actions */}
      <TableData className="min-w-[120px]">
        <div className="flex items-center gap-3 justify-center">
          <button className="p-3 hover:bg-gray-100 rounded-full transition-colors" title="Edit Expense">
            <img src="/icons/fi-sr-pencil.svg" alt="Edit" className="w-5 h-5" />
          </button>
          <button className="p-3 hover:bg-blue-50 rounded-full transition-colors" title="View Receipt">
            <img src="/icons/download.svg" alt="Receipt" className="w-5 h-5" />
          </button>
          <button className="p-3 hover:bg-red-50 rounded-full transition-colors" title="Delete">
            <img
              src="/icons/fi-sr-trash.svg"
              alt="Delete"
              className="w-5 h-5"
            />
          </button>
        </div>
      </TableData>
    </tr>
  );
}

ExpenseReportsRow.propTypes = {
  selectRow: PropTypes.func.isRequired,
  selectedData: PropTypes.array.isRequired,
  updateExpenseStatus: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.object.isRequired,
    employeeId: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    expenseType: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    submittedDate: PropTypes.string.isRequired,
    approvalDate: PropTypes.string,
    status: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    receiptAttached: PropTypes.bool.isRequired,
    currency: PropTypes.string.isRequired,
  }).isRequired,
};
