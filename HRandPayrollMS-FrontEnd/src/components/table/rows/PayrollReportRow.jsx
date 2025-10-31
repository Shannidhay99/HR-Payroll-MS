import React from "react";
import PropTypes from "prop-types";
import AllEmployeeTd from "../td/AllemployeeTd";
import TableData from "../td/TableData";

const PayrollReportRow = ({ data, selectedData, selectRow }) => {
  const {
    serial,
    name,
    employeeId,
    department,
    designation,
    basicSalary,
    allowances,
    overtime,
    deductions,
    netSalary,
    payPeriod,
    paymentStatus,
    paymentDate,
  } = data;

  // Determine payment status color
  const getPaymentStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return "text-green-600 bg-green-100";
      case 'processing':
        return "text-blue-600 bg-blue-100";
      case 'pending':
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0
    }).format(amount).replace('BDT', '৳');
  };

  // Format date for display  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {/* Serial */}
      <TableData className="text-sm font-medium text-gray-900 min-w-[60px]">
        {serial}
      </TableData>

      {/* Employee Name with Image and Checkbox */}
      <TableData className="text-left min-w-[200px]">
        <AllEmployeeTd data={name} selectedData={selectedData} selectRow={selectRow} />
      </TableData>

      {/* Employee ID */}
      <TableData className="text-sm font-mono text-gray-700 min-w-[120px]">
        <span className="px-2 py-1 bg-gray-50 rounded text-gray-600">
          {employeeId}
        </span>
      </TableData>

      {/* Department */}
      <TableData className="text-sm text-gray-700 min-w-[140px]">
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
          {department}
        </span>
      </TableData>

      {/* Designation */}
      <TableData className="text-sm text-gray-700 min-w-[130px]">
        <span className="text-gray-600">{designation}</span>
      </TableData>

      {/* Basic Salary */}
      <TableData className="text-sm font-medium text-right text-gray-900 min-w-[120px]">
        <span className="font-mono text-green-600">
          {formatCurrency(basicSalary)}
        </span>
      </TableData>

      {/* Allowances */}
      <TableData className="text-sm font-medium text-right text-gray-700 min-w-[110px]">
        <span className="font-mono text-blue-600">
          +{formatCurrency(allowances)}
        </span>
      </TableData>

      {/* Overtime */}
      <TableData className="text-sm font-medium text-right text-gray-700 min-w-[100px]">
        <span className="font-mono text-purple-600">
          +{formatCurrency(overtime)}
        </span>
      </TableData>

      {/* Deductions */}
      <TableData className="text-sm font-medium text-right text-gray-700 min-w-[110px]">
        <span className="font-mono text-red-600">
          -{formatCurrency(deductions)}
        </span>
      </TableData>

      {/* Net Salary */}
      <TableData className="text-sm font-bold text-right text-gray-900 min-w-[130px]">
        <span className="px-2 py-1 bg-green-50 border border-green-200 rounded font-mono text-green-700">
          {formatCurrency(netSalary)}
        </span>
      </TableData>

      {/* Pay Period */}
      <TableData className="text-sm text-gray-700 min-w-[120px]">
        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
          {payPeriod}
        </span>
      </TableData>

      {/* Payment Status */}
      <TableData className="text-sm font-medium text-center min-w-[110px]">
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(paymentStatus)}`}>
          {paymentStatus}
        </span>
      </TableData>

      {/* Actions */}
      <TableData className="min-w-[120px]">
        <div className="flex items-center gap-3 justify-center">
          <button className="p-3 hover:bg-gray-100 rounded-full transition-colors" title={`Edit - Last Payment: ${formatDate(paymentDate)}`}>
            <img src="/icons/fi-sr-pencil.svg" alt="Edit" className="w-5 h-5" />
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
};

PayrollReportRow.propTypes = {
  data: PropTypes.shape({
    serial: PropTypes.number.isRequired,
    name: PropTypes.object.isRequired,
    employeeId: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    designation: PropTypes.string.isRequired,
    basicSalary: PropTypes.number.isRequired,
    allowances: PropTypes.number.isRequired,
    overtime: PropTypes.number.isRequired,
    deductions: PropTypes.number.isRequired,
    netSalary: PropTypes.number.isRequired,
    payPeriod: PropTypes.string.isRequired,
    paymentStatus: PropTypes.string.isRequired,
    paymentDate: PropTypes.string.isRequired,
  }).isRequired,
  selectedData: PropTypes.array.isRequired,
  selectRow: PropTypes.func.isRequired,
};

export default PayrollReportRow;
